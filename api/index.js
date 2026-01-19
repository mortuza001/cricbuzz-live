
// api/index.js
const serverless = require("serverless-http");
const app = require("../src/app");

// Create the handler once
const handler = serverless(app);

// Export a function signature Vercel invokes
module.exports = (req, res) => handler(req, res);
