
// api/index.js
const serverless = require('serverless-http');
const app = require('../src/app');

// Create the handler once.
const handler = serverless(app);

// Export a function that Vercel will invoke.
// (This shape avoids ambiguity with various bundlers/runtimes.)
module.exports = (req, res) => {
  return handler(req, res);
};
