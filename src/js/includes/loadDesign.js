const fs = require('fs');
const path = require('path');

function safeParse(jsonStr) {
  try {
    if (!jsonStr || !jsonStr.trim()) return {};
    return JSON.parse(jsonStr);
  } catch (e) {
    return {};
  }
}

function loadDesign() {
  // Try repo root design.json first
  const rootPath = path.resolve(__dirname, '../../../design.json');
  let raw = '';
  try {
    raw = fs.readFileSync(rootPath, 'utf8');
  } catch (e) {
    // not found, fall back to empty
    return {};
  }
  return safeParse(raw) || {};
}

module.exports = loadDesign;

