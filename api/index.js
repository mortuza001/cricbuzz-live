
const serverless = require("serverless-http");
const app = require("../src/app");  // import your Express app

module.exports = serverless(app);
