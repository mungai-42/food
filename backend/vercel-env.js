// Vercel environment configuration
// This file ensures environment variables are properly loaded in Vercel deployment

const path = require('path');

// Try to load config.env file
try {
  require('dotenv').config({ path: path.join(__dirname, 'config.env') });
  console.log('✅ Loaded config.env file');
} catch (error) {
  console.log('⚠️ Could not load config.env file, using Vercel environment variables');
}

// Set default values for required environment variables
const requiredEnvVars = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://mungaisamuel624_db_user:XblLkU7hu9q6Xa9x@cluster0.kclxcyt.mongodb.net/digifarm?retryWrites=true&w=majority&appName=Cluster0',
  NODE_ENV: process.env.NODE_ENV || 'production',
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || 'digifarm_secure_jwt_secret_key_2024_production',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '24h',
  UPLOAD_PATH: process.env.UPLOAD_PATH || './uploads/',
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE || 5242880
};

// Set environment variables
Object.keys(requiredEnvVars).forEach(key => {
  if (!process.env[key]) {
    process.env[key] = requiredEnvVars[key];
    console.log(`🔧 Set default ${key}: ${key === 'MONGODB_URI' ? '***' : requiredEnvVars[key]}`);
  }
});

console.log('🔍 Environment check complete');
console.log('🔍 NODE_ENV:', process.env.NODE_ENV);
console.log('🔍 MONGODB_URI:', process.env.MONGODB_URI ? 'Configured' : 'Missing');
console.log('🔍 JWT_SECRET:', process.env.JWT_SECRET ? 'Configured' : 'Missing');

module.exports = requiredEnvVars;
