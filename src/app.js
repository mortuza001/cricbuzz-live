
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.json({ message: "Cricbuzz Live API running" });
});

// import your real routes here
// const v1Routes = require("./routes/v1");
// app.use("/v1", v1Routes);

module.exports = app;
