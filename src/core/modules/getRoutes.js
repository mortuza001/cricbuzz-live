
const fs = require('fs');
const path = require('path');

// Optional-color import to avoid crashes if colorette is absent
let color = { green: (s) => s };
try { color = require('colorette'); } catch (_) {}

function getRoutes({ baseDir, router }) {
  if (!fs.existsSync(baseDir)) {
    console.warn(`[routes] baseDir not found: ${baseDir}`);
    return;
  }

  const entries = fs.readdirSync(baseDir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(baseDir, entry.name);

    if (entry.isDirectory()) {
      getRoutes({ baseDir: full, router });
      continue;
    }

    if (!entry.isFile() || !entry.name.toLowerCase().endsWith('.js')) continue;

    try {
      const attach = require(full);         // controller must export (router) => void
      if (typeof attach === 'function') {
        attach(router);
        console.log(`${color.green('routes')}: registered ${color.green(entry.name)}`);
      } else {
        console.warn(`[routes] ${entry.name} did not export a function(router)`);
      }
    } catch (err) {
      console.error(`[routes] failed to load ${full}`, err);
    }
  }
}

module.exports = { getRoutes };
