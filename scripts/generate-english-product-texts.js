const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'product_texts.json');
const outputPath = path.join(__dirname, '..', 'product_texts.en.json');

const categoryMap = {
  'Praktikus': 'Practical',
  'Mechanikus Tárgyak': 'Mechanical Objects',
  'Litofánok': 'Lithophanes',
  'Szobrok & Figurák': 'Sculptures & Figures',
  'Épületek': 'Buildings',
  'Testrészek': 'Body Parts',
  'Telefontartók': 'Phone Holders',
  'Tartók, Rendszerezők': 'Holders & Organizers',
  'Flexibilis Tárgyak': 'Flexible Objects',
  'Fürdőszobai Kiegészítők': 'Bathroom Accessories',
  'Szakeszközök': 'Tools',
  'Egyéb': 'Other',
  'Kulcstartók': 'Keychains',
  'Vázák': 'Vases'
};

const nameReplacements = [
  ['COVID-19 Ajtókinyitó', 'COVID-19 Door Opener'],
  ['Szájmaszk Pánt', 'Face Mask Strap'],
  ['Spirál Lépcső Litofán', 'Spiral Staircase Lithophane'],
  ['Vidám Groot', 'Happy Groot'],
  ['Karácsonyi Hegy', 'Christmas Mountain'],
  ['Ijesztő Kéz', 'Scary Hand'],
  ['Csavart Torony', 'Twisted Tower'],
  ['Minimalista Telefontartó', 'Minimalist Phone Stand'],
  ['Középkori Kastély', 'Medieval Castle'],
  ['Fogaskerék Kocka', 'Gear Cube'],
  ['Flexibilis Unikornis', 'Flexible Unicorn'],
  ['Ujjas Markoló', 'Finger Grabber'],
  ['Rövid Kígyós Olló', 'Short Snake Scissors'],
  ['Könyv, Füzet Állvány', 'Book, Notebook Stand'],
  ['Többállású Telefontartó', 'Multi-Position Phone Stand'],
  ['Kígyós Olló', 'Snake Scissors'],
  ['Flexibilis Rák', 'Flexible Crab'],
  ['Lehetetlen Illúzió', 'Impossible Illusion'],
  ['Gyűrt Váza', 'Crumpled Vase'],
  ['Flexibilis Sas', 'Flexible Eagle'],
  ['Világítótorony', 'Lighthouse'],
  ['Spirál Tolltartó', 'Spiral Pen Holder'],
  ['Flexibilis Csontváz', 'Flexible Skeleton'],
  ['Koponyák', 'Skulls'],
  ['Rózsa Váza', 'Rose Vase'],
  ['Dzsungel Litofán', 'Jungle Lithophane'],
  ['Virágcserép', 'Flower Pot'],
  ['Flexibilis Dinoszaurusz', 'Flexible Dinosaur'],
  ['Elon Musk Litofán', 'Elon Musk Lithophane'],
  ['Flexibilis Víziló', 'Flexible Hippo'],
  ['Célzóka', 'Aiming Funnel'],
  ['Flexibilis Raptor', 'Flexible Raptor'],
  ['Micro SD Kártya Tároló', 'Micro SD Card Holder'],
  ['Titkos Falirekesz', 'Secret Wall Compartment'],
  ['Pendrive, SD Kártya Tároló', 'USB Drive & SD Card Holder'],
  ['Kábel Menet (20db)', 'Cable Guide (20 pcs)'],
  ['AAA Elemtároló (2db)', 'AAA Battery Holder (2 pcs)'],
  ['AA Elemtároló (2db)', 'AA Battery Holder (2 pcs)'],
  ['9V-os Elemtároló (2db)', '9V Battery Holder (2 pcs)'],
  ['Körből Négyzet Illúzió', 'Circle-to-Square Illusion'],
  ['Törölközőszárító Akasztó (4db)', 'Radiator Towel Hook (4 pcs)'],
  ['Fogkrémkinyomó Kulcs', 'Toothpaste Squeezer Key'],
  ['Gyémántos Pénzcsipesz (6db)', 'Diamond Money Clip (6 pcs)'],
  ['Arc-Váza Illúzió', 'Face-Vase Illusion'],
  ['Delfines Telefontartó', 'Dolphin Phone Stand'],
  ['Flexibilis Cica', 'Flexible Cat'],
  ['Kanál Állvány', 'Spoon Rest'],
  ['Fagylalt Tartó', 'Ice Cream Holder'],
  ['Csontvázas Kulcstartó', 'Skeleton Keychain'],
  ['Telefonkitámasztó Kulcstartó', 'Phone Stand Keychain'],
  ['Ecsettartó', 'Brush Holder'],
  ['Gekko Kulcstartó', 'Gecko Keychain'],
  ['Macskás Telefontartó', 'Cat Phone Stand'],
  ['2D-s Rugó', '2D Spring'],
  ['Pteranodon Kulcstartó', 'Pteranodon Keychain'],
  ['Hylaeosaurus Kulcstartó', 'Hylaeosaurus Keychain'],
  ['Triceratops Kulcstartó', 'Triceratops Keychain'],
  ['Psittacosaurus Kulcstartó', 'Psittacosaurus Keychain'],
  ['Tyrannosaurus Kulcstartó', 'Tyrannosaurus Keychain'],
  ['Hosszú Ecsettartó', 'Long Brush Holder'],
  ['Egyujjas Könyvlaptartó', 'One-Finger Page Holder'],
  ['Hátizsák Pánt Összefogó', 'Backpack Strap Clip'],
  ['Egyszerű Fogkrémkinyomó', 'Simple Toothpaste Squeezer'],
  ['Medvés Fogkrémkinyomó', 'Bear Toothpaste Squeezer'],
  ['Vízilovas Fogkrémkinyomó', 'Hippo Toothpaste Squeezer'],
  ['Sas Litofán', 'Eagle Lithophane'],
  ['Steampunk Kulcsok', 'Steampunk Keys'],
  ['Karácsonyi Város', 'Christmas Town'],
  ['1/4" Bittartó (6db)', '1/4" Bit Holder (6 pcs)'],
  ['Kutya Litofán', 'Dog Lithophane'],
  ['Komoly Groot', 'Serious Groot'],
  ['Tasak Csipesz', 'Bag Clip'],
  ['Minecraftos Kulcstartók', 'Minecraft Keychains'],
  ['Szappantartó', 'Soap Dish'],
  ['Evőpálcika Összefogó', 'Chopstick Helper'],
  ['Emberi Állkapocs', 'Human Jaw'],
  ['Öreg Mikulás', 'Old Santa'],
  ['Harmadik Kéz', 'Third Hand'],
  ['Pókok', 'Spiders'],
  ['Halloween Fa', 'Halloween Tree'],
  ['Spirál Váza', 'Spiral Vase'],
  ['Kézfej', 'Hand'],
  ['Hengeres Váza', 'Cylindrical Vase'],
  ['Háromszög Alapú Váza', 'Triangle-Based Vase'],
  ['Gonosz Kéz', 'Evil Hand'],
  ['Kör Alapú Váza', 'Circle-Based Vase'],
  ['Egyszerű Váza', 'Simple Vase'],
  ['Csavart Váza', 'Twisted Vase'],
  ['Exoskeleton', 'Exoskeleton'],
  ['Mechanikus Kéz', 'Mechanical Hand'],
  ['Hosszú Ujj', 'Long Finger']
];

function translateName(nameHu) {
  for (const [hu, en] of nameReplacements) {
    if (nameHu === hu) return en;
  }
  // Fallback word-wise replacements to improve names not in the list
  return nameHu
    .replace(/Flexibilis/gi, 'Flexible')
    .replace(/Kulcstartó/gi, 'Keychain')
    .replace(/Telefontartó/gi, 'Phone Stand')
    .replace(/Váza/gi, 'Vase')
    .replace(/Kéz/gi, 'Hand')
    .replace(/Hegy/gi, 'Mountain')
    .replace(/Torony/gi, 'Tower')
    .replace(/Kastély/gi, 'Castle');
}

function translateCategory(catHu) {
  return categoryMap[catHu] || catHu;
}

function translateDescription(descHu) {
  let d = descHu;
  // Intro paragraphs and common sentences (unique parts)
  d = d.replace(/Érintés nélküli kilincsfogó[\s\S]*?így óvva másokat is\./g,
    'Contactless door-handle opener for the COVID-19 period. Immediate disinfection after touching isn\'t always possible (especially in institutions and hospitals), so a touchless grip is a good choice during the pandemic. It lets you open doors without touching the handle, helping protect others.');
  d = d.replace(/Az exoskeleton olyan vázszerkezet[^.]*\. A termék tartalmazza az összeszereléshez szükséges csavarokat és a 3D nyomtatott vázat\./g,
    'An exoskeleton is a frame attached to the human body that replaces muscle work and serves as a support. The product includes the screws required for assembly and the 3D-printed frame.');
  d = d.replace(/Mechanikus, ujjpercenként mozgatható kéz\./g,
    'Mechanical hand with individually articulated finger segments.');
  d = d.replace(/Ideális választás lehet modellezésre vagy díszként\./g,
    'An ideal choice for modeling or as decor.');
  d = d.replace(/Ideális választás lehet gyerekek számára vagy díszként a lakásba\./g,
    'An ideal choice for children or as home decor.');
  d = d.replace(/Mechanikusan mozgatható hosszú ujj\./g,
    'Mechanically movable long finger.');
  d = d.replace(/Beledughatod az egyik ujjad és mint egy hosszú karom tudod mozgatni\./g,
    'Insert one finger and move it like a long claw.');
  d = d.replace(/Sok mindenre nem használható, de legalább jól néz ki\./g,
    'Not very practical, but it looks great.');
  d = d.replace(/A csomag tartalmazza az összeszereléshez szükséges csavarokat és minden egyéb kelléket\./g,
    'The package includes the screws and all other accessories needed for assembly.');
  d = d.replace(/Szájmaszk pánt a COVID-19 járvány idejére\./g,
    'Face mask strap for the COVID-19 period.');
  d = d.replace(/Hasznos termék lehet minden egészségügyi dolgozó vagy átlagember számára\./g,
    'Useful for healthcare workers and everyday users.');
  d = d.replace(/A termék leveszi a terhet a használó füléről, így kényelmessé teszi a hosszabb ideig tartó maszkviselést is\./g,
    'It relieves pressure from the ears, making prolonged mask use more comfortable.');
  d = d.replace(/Több fokozatban állítható a pánt, így szinte minden nagyságú és formájú fejhez illik\./g,
    'The strap is adjustable in multiple positions to fit most head sizes and shapes.');

  // Generic flexible figure opener and joint movement
  d = d.replace(/Flexibilis műanyag [^\.]* figura mozgatható részekkel\./g,
    'Flexible plastic figure with movable parts.');
  d = d.replace(/Az illesztések mentén kis mértékben mozgatható/g,
    'Slightly movable along the joints.');

  // Lithophane openings and explanation
  d = d.replace(/([A-ZÁÉÍÓÖŐÚÜŰa-záéíóöőúüű][^\.]*?) litofán\./g, (m, subj) => {
    // Normalize a few common subjects
    const normalized = subj
      .replace(/Spirál lépcsőt ábrázoló/i, 'a spiral staircase')
      .replace(/Dzsungelt ábrázoló/i, 'a jungle')
      .replace(/Labrador kutyát ábrázoló/i, 'a Labrador dog')
      .replace(/Sas|Fehérfejű .*sast ábrázoló/i, 'an eagle')
      .replace(/Elon Muskot ábrázoló/i, 'Elon Musk');
    return `Lithophane depicting ${normalized}.`;
  });
  d = d.replace(/A litofán egy olyan 3D nyomtatással készült termék, ami alapesetben egy dombornyomott képed ad, viszont háttérfénnyel megvilágítva tisztán előtűnik maga a kép\.[\s\S]*?Ezért tűnnek bizonyos részek világosnak, mások pedig sötétebbnek\./g,
    'A lithophane is a 3D-printed item that looks like a relief image, but when backlit, the picture becomes clear. The printer builds layers of varying thickness, letting different amounts of light through — that\'s why some areas appear lighter and others darker.');
  // Headings
  d = d.replace(/Tulajdonságok:/g, 'Features:');
  // Common bullets
  d = d.replace(
    /3DJAKE ecoPLA filament \(környezetbarát, biológiai úton lebomló anyag\)/g,
    '3DJake ecoPLA filament (eco-friendly, biodegradable material)'
  );
  d = d.replace(/Környezetbarát csomagolás/g, 'Eco-friendly packaging');

  // License paragraph
  d = d.replace(
    /A termék szabad <a ([^>]+)>licensszel<\/a>\r?\nvan forgalomban, így te is <a ([^>]+)>megtekintheted<\/a>\r?\nés kedved szerint módosíthatod\./g,
    'The product is available under a free <a $1>license</a>, so you can <a $2>view it</a> and modify it as you like.'
  );
  d = d.replace(
    /Abban az esetben, ha a szeretnéd a saját modelledet kinyomtatni használd a\r?\n<a ([^>]+)>bérnyomtatás<\/a> funkciót\./g,
    'If you would like to print your own model, use the <a $1>print-on-demand</a> function.'
  );
  d = d.replace(
    /A terméket <a ([^>]+)>([^<]+)<\/a> készítette\. &#169; <!--DATE--> ([^\.]+)\. Minden jog fenntartva\./g,
    'Product by <a $1>$2</a>. &#169; <!--DATE--> $3. All rights reserved.'
  );
  d = d.replace(
    /A terméket a <a ([^>]+)>([^<]+)<\/a> készítette\. &#169; <!--DATE--> ([^\.]+)\. Minden jog fenntartva\./g,
    'Product by <a $1>$2</a>. &#169; <!--DATE--> $3. All rights reserved.'
  );
  // Lithophane help link text
  d = d.replace(/További információ a litofánokról/g, 'More information about lithophanes');
  // Some recurring sentences
  d = d.replace(/Kiváló választás lehet ajándéknak vagy díszként a lakásba\./g,
    'A great choice as a gift or as home decor.');
  d = d.replace(/Nagyszerű választás lehet díszként a lakásba\./g,
    'A great choice as home decor.');
  d = d.replace(/Nagyszerű választás lehet gyerekeknek vagy lelkes markolósofőröknek otthonra\./g,
    'A great choice for kids or enthusiastic excavator operators at home.');
  d = d.replace(/Kőből kirakott szigeten álló régimódi világítótorony\./g,
    'Old-style lighthouse standing on a stone-covered island.');
  d = d.replace(/Elegáns, minimalista kinézetű telefontartó\./g,
    'Elegant, minimalist phone stand.');
  d = d.replace(/Könnyen kezelhető [^\.]* telefontartó\./g,
    (m) => m.replace('Könnyen kezelhető', 'Easy-to-use').replace(' telefontartó.', ' phone stand.'));
  d = d.replace(/Stabilan tartja a telefont állítva és fektetve[^\.]*\./g,
    'Holds the phone securely both upright and on its side.');
  d = d.replace(/A további stabilitás elérése érdekében ajánljuk az x1\.3-as méretezést beállítani a specifikációknál\./g,
    'For extra stability, we recommend setting the scale to x1.3 in the specifications.');
  d = d.replace(/Ujjakkal mozgatható mini játékmarkoló\./g,
    'Mini toy excavator operated with your fingers.');
  d = d.replace(/Kígyó formájú mechanikus játékolló\.[\s\S]*?Valódi vágásra nem alkalmas\./g,
    'Snake-shaped mechanical toy scissors. When cutting, the scissor extends forward and the snake\'s mouth closes. Not suitable for real cutting.');
  d = d.replace(/Korhű középkori kastély egy magas sziklán\./g,
    'Historically accurate medieval castle on a high rock.');
  d = d.replace(/Csavart, spirállépcsővel ellátott régi torony\./g,
    'Twisted old tower with a spiral staircase.');
  d = d.replace(/Különböző arckifejezésű koponyák\./g,
    'Skulls with various facial expressions.');
  d = d.replace(/Ideális választás lehet díszként a lakásba\./g,
    'An ideal choice as home decor.');
  d = d.replace(/Ideális választás lehet díszként a lakásba vagy Halloweenra\./g,
    'An ideal choice as home decor or for Halloween.');
  d = d.replace(/Ideális választás lehet szakemberek számára, de otthon a lakásban is kiválóan használható\./g,
    'Ideal for professionals, but also very useful at home.');
  d = d.replace(/Praktikus és szép formatervezésű fagylalttartó\./g,
    'Practical and nicely designed ice-cream holder.');
  d = d.replace(/A tölcsért és a benne lévő fagylaltot meglehetősen stabilan tartja, kisebb lökésekre sem dől el\./g,
    'Keeps the cone and ice cream very stable and won\'t tip over with small bumps.');
  d = d.replace(/Ideális választás lehet otthonra különböző összejövetelekre vagy akár üzletekbe, éttermekbe is\./g,
    'An ideal choice for home gatherings or even for shops and restaurants.');
  d = d.replace(/Könnyen kezelhető többállású telefontartó\./g,
    'Easy-to-use multi-position phone stand.');
  d = d.replace(/Stabil tartást biztosít a telefonnak, emellett a csúszkával a kívánt dőlésszög is egyszerűen beállítható\./g,
    'Provides stable support for your phone, and the slider makes it easy to set the desired tilt angle.');
  d = d.replace(/Lehetetlennek tűnő háromszög illúzió, érdekes optikai csalódás\./g,
    'Seemingly impossible triangle illusion, an interesting optical trick.');
  d = d.replace(/Hófödte karácsonyi hegy kis házakkal és fenyőkkel\./g,
    'Snowy Christmas mountain with small houses and pines.');
  d = d.replace(/Ijesztő és élethű kéz modell\./g,
    'Scary and lifelike hand model.');
  d = d.replace(/Kőből kirakott szigeten álló régimódi világítótorony\./g,
    'Old-style lighthouse standing on a stone-covered island.');
  d = d.replace(/Korhű viktoriánus serleg arc illúzióval\.[\s\S]*?két oldalán két arc rajzolódik ki szimmetrikusan\./g,
    'Victorian-era goblet with a face illusion. Besides being a usable cup, when viewed horizontally against a plain background, two faces appear symmetrically on the sides.');
  d = d.replace(/Különleges ötszög alapú virágcserép kis lépcsővel és víztartóval\.[\s\S]*?könnyen magára vonja a figyelmet\./g,
    'Unique pentagonal flower pot with a small step and water tray. Its uniqueness easily draws attention.');
  d = d.replace(/Festés közbeni ecsettartó a munka megkönnyítése érdekében\.[\s\S]*?lecsöpögését is\./g,
    'Brush holder to make painting easier. It gives a perfect place for brushes you\'re not using and prevents paint from dripping onto the table.');
  d = d.replace(/Falra szerelhető titkos falirekesz és tároló\.[\s\S]*?könnyen falra rögzíthető\./g,
    'Wall-mountable hidden wall compartment and storage. It\'s hard to notice that the top section slides open to reveal storage space. Three holes on the back make wall mounting easy.');
  d = d.replace(/Alkalmas különböző vastagságú kábelek megvezetésére\.[\s\S]*?kívánt felületre ragasztható\./g,
    'Suitable for routing cables of different thicknesses. Easy to use, and the adhesive back lets you attach it to the desired surface.');
  d = d.replace(/Praktikus tároló AAA típusú elemekhez\.[\s\S]*?stabilan összeilleszthetők\./g,
    'Practical holder for AAA batteries. Holds up to 8 AAA cells at once; ordering more than one lets the units interlock securely.');
  d = d.replace(/Praktikus tároló AA típusú elemekhez\.[\s\S]*?stabilan összeilleszthetők\./g,
    'Practical holder for AA batteries. Holds up to 6 AA cells at once; ordering more than one lets the units interlock securely.');
  d = d.replace(/Praktikus tároló 9V-os elemekhez\.[\s\S]*?stabilan összeilleszthetők\./g,
    'Practical holder for 9V batteries. Holds up to 3 cells at once; ordering more than one lets the units interlock securely.');
  d = d.replace(/Kényelmes radiátorra szerelhető törölköző- és ruhaakasztó\.[\s\S]*?4db törölközőszárító akasztó\./g,
    'Convenient towel and clothes hook for radiators. Easy to mount and simple to move. The package contains 4 hooks.');
  d = d.replace(/Segítségével könnyen kinyomhatóvá válik a különböző tubusokban és tárolókban lévő maradék fogkrém, festék vagy kenőanyag\./g,
    'Helps easily squeeze out the remaining toothpaste, paint, or ointment from various tubes and containers.');
  d = d.replace(/A terméken található hosszanti résbe kell befogatni a tubus végét, majd a kulcs-szerű részénél elkezdeni tekerni\./g,
    'Insert the end of the tube into the long slot, then start turning the key-like part.');
  d = d.replace(/A tetején található lyukak segítségével könnyen és kényelmesen tárolható vagy akasztható\./g,
    'The holes at the top make it easy to store or hang.');
  d = d.replace(/Nem ázsiai emberek számára nagy nehézséget okozhat az evőpálcikával való evés\.[\s\S]*?bármilyen előzőleges gyakorlat nélkül tudjunk evőpálcikával enni\./g,
    'Using chopsticks can be difficult for beginners. This helper lets you eat with chopsticks without prior practice.');
  d = d.replace(/Az evőpálcikákat a két vájatba kell befogatni és ezután a tetejénél összenyomni, hogy felvegyük a falatot\./g,
    'Insert the chopsticks into the two grooves, then pinch at the top to pick up food.');
  d = d.replace(/Az anyag minimális rugalmasságának köszönhetően a pálcikák elengedés után visszaállnak eredeti pozíciójukba\./g,
    'Thanks to the slight flexibility of the material, the sticks return to their original position after releasing.');
  d = d.replace(/Hangulatos és meghitt karácsonyi város\./g,
    'Cozy and intimate Christmas town.');
  d = d.replace(/Igényes és modern szappantartó\./g,
    'Refined and modern soap dish.');
  d = d.replace(/A vízelvezető cső biztosítja, hogy a mosás utáni felesleges folyadék elvezetődjön\./g,
    'The drain tube ensures excess water is carried away after use.');
  d = d.replace(/11mm x 15mm x 1mm-es microSD kártyák tárolására alkalmas eszköz\.[\s\S]*?annak fedelét is\./g,
    'Holder for 11 x 15 x 1 mm microSD cards. Capacity: 18 cards, arranged in 2 rows of 9. Keeps your media organized and protected from damage. Includes the tray and its lid.');

  return d;
}

function main() {
  const raw = fs.readFileSync(inputPath, 'utf8');
  const items = JSON.parse(raw);

  const out = items.map((it) => ({
    id: it.id,
    name: translateName(it.name),
    description: translateDescription(it.description),
    size: it.size,
    category: translateCategory(it.category),
    price: it.price,
    img_url: it.img_url,
    img_showcase: it.img_showcase
  }));

  fs.writeFileSync(outputPath, JSON.stringify(out, null, 2));
  console.log('English product texts written to', outputPath);
}

main();
