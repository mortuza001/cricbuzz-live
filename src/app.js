
// src/app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

// Log every request that reaches Express
app.use((req, res, next) => {
  console.log('[APP]', req.method, req.originalUrl);
  next();
});

app.use(cors());
app.use(helmet());
app.use(express.json());

// Health (used when hitting /api/ via main.js or your earlier index)
app.get("/", (req, res) => {
  res.json({ message: "Cricbuzz Live API running" });
});

// IMPORTANT: Mount v1 directly here.
// Do not also use routes/index.js for now—let's isolate v1.
const v1Routes = require("./routes/v1");
app.use("/v1", v1Routes);

// Optional: global 404
app.use((req, res) => res.status(404).json({ error: "Not Found" }));

module.exports = app;
