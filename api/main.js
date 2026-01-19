
// api/main.js
const serverless = require('serverless-http');
const app = require('../src/app');

const handler = serverless(app);
module.exports = (req, res) => {
  console.log('[ENTRY]', req.method, req.url);
  return handler(req, res);
};
