// Load environment configuration first
require('../vercel-env');

const app = require('../server');

// Export the Express app for Vercel
module.exports = app;
