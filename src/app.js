
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

// --- Global middleware ---
app.use(cors());
app.use(helmet());
app.use(express.json());

// --- Health ---
app.get("/", (req, res) => {
  console.log("Health /api/ hit at", new Date().toISOString());
  res.json({ message: "Cricbuzz Live API running" });
});

// --- v1 routes ---
const v1Routes = require("./routes/v1");
app.use("/v1", v1Routes);

module.exports = app;
