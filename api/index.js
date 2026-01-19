
// api/index.js (or api/main.js)
const serverless = require('serverless-http');
const app = require('../src/app');

const handler = serverless(app);
module.exports = (req, res) => {
  console.log('[ENTRY]', req.method, req.url, {
    xMatchedPath: req.headers['x-matched-path'],
    xNowRoute: req.headers['x-now-route'],
  });
  return handler(req, res);
};
