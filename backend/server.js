const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Load environment variables and Vercel configuration
require('./vercel-env');

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const serviceRoutes = require('./routes/services');
const inquiryRoutes = require('./routes/inquiries');
const adminRoutes = require('./routes/admin');

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS - Updated for Vercel deployment
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://digi-farm-frontend.vercel.app', 'https://digifarmfrontend.vercel.app', 'https://digifarm-nine.vercel.app'] // Your actual frontend URLs
    : ['http://localhost:3000'],
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files - Only serve in development
if (process.env.NODE_ENV !== 'production') {
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({ 
      status: 'OK', 
      message: 'Digi-Farm API is running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: dbStatus,
      mongodb_uri: process.env.MONGODB_URI ? 'configured' : 'missing'
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Health check failed',
      error: error.message
    });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Digi-Farm API',
    status: 'running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      products: '/api/products',
      services: '/api/services',
      inquiries: '/api/inquiries',
      admin: '/api/admin'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

// Debug environment variables
console.log('🔍 Environment variables loaded:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Loaded' : '❌ Not loaded');
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('PORT:', process.env.PORT || 5000);
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Loaded' : '❌ Not loaded');

// Set default environment variables if not present
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}
if (!process.env.PORT) {
  process.env.PORT = 5000;
}

// Database connection function
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI environment variable is not set');
      return false;
    }
    
    console.log('🔍 Attempting to connect to MongoDB...');
    console.log('🔍 Connection string:', process.env.MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 1,
    });
    
    console.log('✅ Connected to MongoDB successfully');
    return true;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('❌ Error details:', {
      name: err.name,
      code: err.code,
      message: err.message
    });
    return false;
  }
};

// Connect to database
connectDB();

// For Vercel serverless functions, export the app
module.exports = app;
