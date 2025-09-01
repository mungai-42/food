const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  try {
    console.log('🔍 Testing MongoDB connection...');
    console.log('🔍 Environment:', process.env.NODE_ENV);
    console.log('🔍 Connection string:', process.env.MONGODB_URI ? 'Present' : 'Missing');
    
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI is not set');
      return;
    }
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });
    
    console.log('✅ MongoDB connection successful!');
    console.log('✅ Database name:', mongoose.connection.name);
    console.log('✅ Host:', mongoose.connection.host);
    console.log('✅ Port:', mongoose.connection.port);
    
    // Test creating a simple document
    const TestModel = mongoose.model('Test', new mongoose.Schema({ name: String }));
    const testDoc = new TestModel({ name: 'test' });
    await testDoc.save();
    console.log('✅ Write test successful');
    
    await testDoc.deleteOne();
    console.log('✅ Delete test successful');
    
    await mongoose.disconnect();
    console.log('✅ Disconnected successfully');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('❌ Error details:', {
      name: error.name,
      code: error.code,
      message: error.message
    });
  }
};

testConnection();
