
const express = require("express");
const router = express.Router();

// Sanity route: GET /api/v1/ping
router.get("/ping", (req, res) => {
  res.json({ ok: true, route: "/v1/ping", ts: new Date().toISOString() });
});

// Example real endpoint: GET /api/v1/matches/score/:id
// Replace with your scraping/service logic. Add timeouts for any HTTP.
router.get("/matches/score/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    // TODO: call your service/controller here with timeouts
    res.json({ id, score: "demo" });
  } catch (err) {
    next(err);
  }
});

// 404 under /v1 (optional)
router.use((req, res) => res.status(404).json({ error: "Not Found" }));

module.exports = router;
