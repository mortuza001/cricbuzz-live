
// src/core/modules/getRoutes.js
const fs = require('fs');
const path = require('path');

// Optional color helper (avoids crash if colorette isn't installed)
let color = { green: (s) => s };
try {
  color = require('colorette');
} catch (_) {
  // no-op: keep plain output in production
}

function isJsFile(name) {
  return name.toLowerCase().endsWith('.js');
}

/**
 * Recursively load controllers and attach their routes onto the provided router.
 * Each controller must export a function of the form: module.exports = (router) => { ... }
 *
 * @param {{ baseDir: string, router: import('express').Router }} opts
 */
function getRoutes({ baseDir, router }) {
  if (!fs.existsSync(baseDir)) {
    console.warn(`[routes] baseDir does not exist: ${baseDir}`);
    return;
  }

  const entries = fs.readdirSync(baseDir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(baseDir, entry.name);

    if (entry.isDirectory()) {
      // Recurse into subdirectories
      getRoutes({ baseDir: full, router });
      continue;
    }

    if (!entry.isFile() || !isJsFile(entry.name)) continue;

    try {
      const attach = require(full); // controller must export a function(router)
      if (typeof attach === 'function') {
        attach(router);
        console.log(`${color.green('routes')}: controller ${color.green(entry.name)} registered`);
      } else {
        console.warn(`[routes] ${entry.name} did not export a function(router)`);
      }
    } catch (err) {
      console.error(`[routes] Failed to load controller: ${full}`, err);
    }
  }
}

module.exports = { getRoutes };
