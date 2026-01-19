
// src/routes/v1.js
const express = require("express");
const router = express.Router();

// GET /v1/ping
router.get("/ping", (req, res) => {
  console.log("[V1] /ping hit");
  res.json({ ok: true, route: "/v1/ping", ts: new Date().toISOString() });
});

// Example endpoint: GET /v1/matches/score/:id
router.get("/matches/score/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    // TODO: implement actual logic (ensure any HTTP calls have timeouts)
    res.json({ id, score: "demo" });
  } catch (err) {
    next(err);
  }
});

// 404 under /v1 (optional)
router.use((req, res) => res.status(404).json({ error: "Not Found (v1)" }));

module.exports = router;
