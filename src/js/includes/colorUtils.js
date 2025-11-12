const COLOR_NAME_MAP = {
  'fehér': 'White',
  'feher': 'White',
  'white': 'White',
  'fekete': 'Black',
  'black': 'Black',
  'kék': 'Blue',
  'kek': 'Blue',
  'sötétkék': 'Dark Blue',
  'sotetkek': 'Dark Blue',
  'világoskék': 'Light Blue',
  'vilagoskek': 'Light Blue',
  'zöld': 'Green',
  'zold': 'Green',
  'sötétzöld': 'Dark Green',
  'sotetzold': 'Dark Green',
  'piros': 'Red',
  'sötétszürke': 'Dark Gray',
  'sotetszurke': 'Dark Gray',
  'szürke': 'Gray',
  'szurke': 'Gray',
  'átlátszó': 'Transparent',
  'atlatszo': 'Transparent',
  'arany': 'Gold',
  'ezüst': 'Silver',
  'ezust': 'Silver',
  'barna': 'Brown',
  'neon narancssárga': 'Neon Orange',
  'narancssárga': 'Orange',
  'lila': 'Purple',
  'gyanta (resin)': 'Resin',
  'pearl white': 'Pearl White',
  'matte black': 'Matte Black',
  'emerald green': 'Emerald Green',
  'royal blue': 'Royal Blue',
  'crimson red': 'Crimson Red',
  'gunmetal gray': 'Gunmetal Gray',
  'transparent (clear)': 'Transparent (Clear)',
  'gold': 'Gold',
  'silver': 'Silver',
  'copper bronze': 'Copper Bronze',
  'neon orange': 'Neon Orange',
  'sky blue': 'Sky Blue',
  'deep purple': 'Deep Purple'
};

function normalizeColorLabel(value) {
  if (value === undefined || value === null) return '';
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch (_) {
    decoded = value;
  }
  const trimmed = decoded.toString().trim();
  if (!trimmed) return '';
  const lookup = trimmed.toLowerCase();
  return COLOR_NAME_MAP[lookup] || trimmed;
}

module.exports = {
  normalizeColorLabel,
  COLOR_NAME_MAP
};
