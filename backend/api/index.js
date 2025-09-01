// Force set environment variables for Vercel deployment
process.env.MONGODB_URI = 'mongodb+srv://mungaisamuel624_db_user:XblLkU7hu9q6Xa9x@cluster0.kclxcyt.mongodb.net/digifarm?retryWrites=true&w=majority&appName=Cluster0';
process.env.NODE_ENV = 'production';
process.env.JWT_SECRET = 'digifarm_secure_jwt_secret_key_2024_production';
process.env.JWT_EXPIRE = '24h';
process.env.PORT = 5000;

console.log('🔧 Environment variables set for Vercel deployment (api/index.js)');
console.log('🔧 MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
console.log('🔧 NODE_ENV:', process.env.NODE_ENV);
console.log('🔧 JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set');

const app = require('../server');

// Export the Express app for Vercel
module.exports = app;
