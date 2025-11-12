const COLOR_NAME_MAP = {
  'fehér': 'White',
  'feher': 'White',
  'white': 'White',
  'pearl white': 'White',
  'fekete': 'Black',
  'black': 'Black',
  'matte black': 'Black',
  'kék': 'Blue',
  'kek': 'Blue',
  'royal blue': 'Blue',
  'sötétkék': 'Dark Blue',
  'sotetkek': 'Dark Blue',
  'világoskék': 'Light Blue',
  'vilagoskek': 'Light Blue',
  'zöld': 'Green',
  'zold': 'Green',
  'emerald green': 'Green',
  'sötétzöld': 'Dark Green',
  'sotetzold': 'Dark Green',
  'piros': 'Red',
  'crimson red': 'Red',
  'sötétszürke': 'Dark Gray',
  'sotetszurke': 'Dark Gray',
  'szürke': 'Gray',
  'szurke': 'Gray',
  'gunmetal gray': 'Gray',
  'átlátszó': 'Transparent',
  'atlatszo': 'Transparent',
  'transparent (clear)': 'Transparent',
  'arany': 'Gold',
  'gold': 'Gold',
  'ezüst': 'Silver',
  'ezust': 'Silver',
  'silver': 'Silver',
  'barna': 'Brown',
  'copper bronze': 'Bronze',
  'neon narancssárga': 'Neon Orange',
  'narancssárga': 'Orange',
  'neon orange': 'Neon Orange',
  'lila': 'Purple',
  'deep purple': 'Purple',
  'gyanta (resin)': 'Resin'
};

function decodeColor(value) {
  if (value === undefined || value === null) return '';
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch (_) {
    decoded = value;
  }
  return decoded.toString().trim();
}

function normalizeColorLabel(value) {
  const decoded = decodeColor(value);
  if (!decoded) return '';
  const lookup = decoded.toLowerCase();
  return COLOR_NAME_MAP[lookup] || decoded;
}

function isStandardColor(value) {
  const normalized = normalizeColorLabel(value).toLowerCase();
  return normalized === 'white' || normalized === 'black';
}

module.exports = {
  normalizeColorLabel,
  isStandardColor,
  decodeColor
};
