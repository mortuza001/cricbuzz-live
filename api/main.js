

// api/main.js
const serverless = require('serverless-http');
const app = require('../src/app');

// Small log so we see the runtime path in Vercel “Functions → Logs”
const handler = serverless(app);
module.exports = (req, res) => {
  console.log('[ENTRY]', req.method, req.url);
  return handler(req, res);
};
