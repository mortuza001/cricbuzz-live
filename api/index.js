
const serverless = require("serverless-http");
const app = require("../src/app");  // your express app

module.exports = serverless(app);
