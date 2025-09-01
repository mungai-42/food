// Load environment variables for Vercel
require('dotenv').config({ path: '../config.env' });

// Set default environment variables for Vercel deployment
if (!process.env.MONGODB_URI) {
  process.env.MONGODB_URI = 'mongodb+srv://mungaisamuel624_db_user:XblLkU7hu9q6Xa9x@cluster0.kclxcyt.mongodb.net/digifarm?retryWrites=true&w=majority&appName=Cluster0';
  console.log('🔧 Set default MONGODB_URI');
}
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
  console.log('🔧 Set default NODE_ENV: production');
}
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'digifarm_secure_jwt_secret_key_2024_production';
  console.log('🔧 Set default JWT_SECRET');
}
if (!process.env.JWT_EXPIRE) {
  process.env.JWT_EXPIRE = '24h';
  console.log('🔧 Set default JWT_EXPIRE: 24h');
}

const app = require('../server');

// Export the Express app for Vercel
module.exports = app;
