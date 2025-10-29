// Display-only translator for Hungarian color names -> English.
function translateColor(name) {
  if (!name) return name;
  const s = String(name).trim();
  const lower = s.toLowerCase();
  const base = {
    'fekete':'Black','fehér':'White','kék':'Blue','zöld':'Green','sárga':'Yellow','citromsárga':'Lemon Yellow',
    'narancssárga':'Orange','piros':'Red','rózsaszín':'Pink','lila':'Purple','barna':'Brown','ezüst':'Silver','arany':'Gold','bronz':'Bronze',
    'szürke':'Gray','sötétszürke':'Dark Gray','világosszürke':'Light Gray','világoskék':'Light Blue','sötétkék':'Dark Blue',
    'világoszöld':'Light Green','sötétzöld':'Dark Green','átlátszó':'Transparent',
    'neon narancssárga':'Neon Orange','neon sárga':'Neon Yellow','neon zöld':'Neon Green',
    'pasztellrózsaszín':'Pastel Pink','pasztellzöld':'Pastel Green'
  };
  if (base[lower]) return base[lower];
  const pref = { 'sötét':'Dark', 'világos':'Light', 'neon':'Neon', 'pasztell':'Pastel', 'átlátszó':'Transparent' };
  for (const p in pref) {
    if (lower.startsWith(p)) {
      const tail = lower.slice(p.length).trim();
      if (base[tail]) return `${pref[p]} ${base[tail]}`;
      if (tail) return `${pref[p]} ${tail.charAt(0).toUpperCase()}${tail.slice(1)}`;
    }
  }
  return s.replace(/\w\S*/g, w => w.charAt(0).toUpperCase()+w.slice(1));
}

module.exports = translateColor;
