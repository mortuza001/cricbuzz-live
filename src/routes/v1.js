
const express = require('express');
const path = require('path');
const { getRoutes } = require('../core/modules/getRoutes');

const router = express.Router();
const baseRoutes = path.resolve(__dirname, '../controllers');

// Attach all controllers in /src/controllers onto this router
getRoutes({ baseDir: baseRoutes, router });

// Sanity route to verify v1 is alive (optional but handy)
router.get('/ping', (req, res) => {
  console.log('[V1] /ping hit');
  res.json({ ok: true, route: '/v1/ping', ts: new Date().toISOString() });
});

// Keep 404 LAST
router.use((req, res) => res.status(404).json({ error: 'Not Found (v1)' }));

module.exports = router;
