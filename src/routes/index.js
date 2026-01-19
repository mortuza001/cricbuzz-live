
const express = require("express");
const v1Routes = require("./v1");
const HttpResponse = require("../core/response/httpResponse");
const { env } = require("../config/env");

const route = express.Router();

// Root
route.get("/", (req, res) => {
  const responseData = {
    message: "CricBuzz Live API",
    maintainer: "ekamid <ebrahimkha71@gmail.com>",
    source: "https://github.com/ekamid/cricbuzz-live",
    docs: `${env.APP_BASE_URL}/v1/api-docs`,
  };
  const httpResponse = HttpResponse.get(responseData);
  res.status(200).json(httpResponse);
});

// Health
route.get("/health", (req, res) => {
  const startUsage = process.cpuUsage();
  const status = {
    uptime: process.uptime(),
    message: "Ok",
    timezone: "ID",
    date: new Date().toISOString(),
    node: process.version,
    memory: process.memoryUsage(),
    platform: process.platform,
    cpu_usage: process.cpuUsage(startUsage),
  };
  const httpResponse = HttpResponse.get({
    message: "Server Uptime",
    data: status,
  });
  res.status(200).json(httpResponse);
});

// ❌ REMOVE THIS — It blocks all /v1/* routes
// route.get("/v1", ...);

// ✔️ USE THIS — Let Express route /v1/* normally
route.use("/v1", v1Routes);

module.exports = route;
