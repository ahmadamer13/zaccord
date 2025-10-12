// Implement the logic of the image showcase on the custom print page
const mq = window.matchMedia('(max-width: 1000px)');
if (mq.matches) {
  _('lit_0').src = '/images/printShowcase/jungle_lit.jpg';
  _('lit_1').src = '/images/printShowcase/litSecondMob.jpg';
}

class ImageSegment {
  constructor(leftBtn, rightBtn, currentIndex, titleSources, textSources) {
    this.leftBtn = leftBtn;
    this.rightBtn = rightBtn;
    this.currentIndex = currentIndex;
    this.titleSources = titleSources;
    this.textSources = textSources;
  }

  attachHandlers(mod, showBox, id, titleBox, textBox) {
    this.leftBtn.addEventListener('click', (e) => {
      this.currentIndex = changeIndex('left', this.currentIndex, mod);
      advanceImage(showBox, id, titleBox, textBox, this.currentIndex, this.titleSources,
        this.textSources);
    });

    this.rightBtn.addEventListener('click', (e) => {
      this.currentIndex = changeIndex('right', this.currentIndex, mod + 1);
      advanceImage(showBox, id, titleBox, textBox, this.currentIndex, this.titleSources,
        this.textSources);
    });
  }
}

function changeClass(id, opcode) {
  _(id).classList[opcode]('animate__animated');
  _(id).classList[opcode]('animate__fadeIn');
}

function handleFade(cn) {
  changeClass(cn, 'add');
  setTimeout(() => {
    changeClass(cn, 'remove');
  }, 1000);
}

function hideOtherImgs(imgID, l, except) {
  for (let i = 0; i < l; i++) {
    if (i != except) {
      _(imgID + '_' + i).style.opacity = '0';
    } 
  }
}

function advanceImage(bgHolder, imgID, title, text, index, titSource, txtSource) {
  hideOtherImgs(imgID, titSource.length, index);
  _(imgID + '_' + index).style.opacity = '1';
  _(title).innerText = titSource[index];
  handleFade(title);
  _(text).innerText = txtSource[index];
  handleFade(text);
}

function changeIndex(type, index, mod) {
  if (type == 'left') {
    if (index < 1) {
      index = mod;
    } else {
      index--;
    }
  } else {
    index++;
    index %= mod;
  }
  return index;
}

// Custom print
let titleSources = ['Gyors prototípusgyártás FDM nyomtatással',
  'Tipikus felhasználási területek', 'Intelligens algoritmus, kényelmes vásárlás',
  'Kisszériás prototípusgyártás, egyedi rendelések'];
let textSources = [
  `A technológia kiváló választás lehet nullsorozatok gyártására a kész termék piacra dobása előtt. Így rengeteg időt és pénzt lehet megspórolni, ha még a termékfejlesztés korai szakaszában feltárulnak az esetleges hibák.`,
  `Gyakori felhasználási terület lehet épületek látványtervének a kinyomtatása vagy telefontokok, hétköznapi használati eszközök és alkatrészek prototípusának a gyors elkészítése. Kisszériás prototípusgyártás esetén így lehetőség nyílik a leendő felhasználók kezébe nyújtani egy tesztterméket.`,
  `Nincs szükség kapcsolatfelvételre, sem egyedi árajánlatra, ehelyett egyeszerűen csak töltsd fel a kinyomtatni kívánt STL fájlokat és igény szerint állítsd be a paramétereket. Az algoritmus azonnal ad egy árajánlatot, így feleslegessé téve a hosszas egyeztetést.`,
 `Kisszériás prototípusgyártás vagy egyedi megrendelés esetén lehetőség van a Prototípusgyártás oldalon a kapcsolatfelvételre és a további egyeztetésre.`
];

let cpSegment = new ImageSegment(_('cpLeftButton'), _('cpRightButton'), 0, titleSources, textSources);
cpSegment.attachHandlers(3, 'cpShow', 'cp', 'capTitle', 'scText');

// Lithophane
let titleSourcesLit = ['Kinyomtatott litofán és az eredeti kép', 'Hogyan működik?'];
let textSourcesLit = [
  `A kész litofán alapesetben egy nehezen kivehető, dombornyomott képed ad. Háttérvilágítással viszont kristálytisztán előtűnik maga a kép. A feltöltött digitális képből a 3D nyomtató készít egy valódi, tapintható litofánt, ami a technológiának köszönhetően valósághűen ábrázolja az eredeti képet.`,
  `A különböző vastagságú rétegek különböző mértékben engedik át a fényt és ezért tűnnek bizonyos részek sötétnek, mások pedig világosnak. A 3D nyomtató pontosságának köszönhetően a kinyomtatott litofánia élethűen adja vissza az eredeti képet.`,
];

let litSegment = new ImageSegment(_('litLeftButton'), _('litRightButton'), 0, titleSourcesLit, textSourcesLit);
litSegment.attachHandlers(1, 'litShow', 'lit', 'capTitleLit', 'scTextLit');

// FDM printer
let leftBtnFdm = _('fdmLeftButton');
let rightBtnFdm = _('fdmRightButton');
let currentIndexFdm = 0;
let titleSourcesFdm = ['FDM printer', ' Filament needed for FDM printing'];
let textSourcesFdm = [
  `FDM printers precisely build the desired model from melted filament layer by layer from a digital file. The print head moves along all three axes (X, Y, Z), so it can create almost any shape.`,
  `FDM printers use filament for printing, a material that melts at high temperatures (200–250 °C). The printer builds the model from the molten filament, which is ready to use after cooling. On Zaccord, in addition to standard filaments, we can also print with flexible TPU.`,
  `SLA printers produce the desired product from a light‑curing resin that solidifies where exposed and thus builds up the result layer by layer. This technology can print much more precise parts (50 microns or below), but it is more expensive and slower than FDM printing.`
];

let fdmSegment = new ImageSegment(_('fdmLeftButton'), _('fdmRightButton'), 0, titleSourcesFdm, textSourcesFdm);
fdmSegment.attachHandlers(1, 'fdmShow', 'fdm', 'capTitleFdm', 'scTextFdm');

// Filament materials
let titleSourcesMat = ['PLA filament', 'ABS filament', 'PETG filament', 'TPU filament'];
let textSourcesMat = [
  `PLA is a starch‑based biopolymer produced from renewable raw materials such as corn or sugarcane, making it environmentally friendly. It has high tensile strength and surface quality, making it suitable for both home and office environments. It enables the creation of household tools, prototypes, toys, display pieces, architectural models, and replacement parts.`,
  `ABS filament is a strong material that is more flexible and less brittle than PLA. It is easy to sand and machine, and it dissolves in acetone, allowing two parts to be bonded or a glossy surface to be created by dipping the model in acetone or exposing it to acetone vapor (fine details may be lost).`,
  `PETG is a strong and versatile material, a modified version of traditional PET bottle plastic. It combines PLA’s ease of use with ABS’s strength, heat resistance and durability. PETG is suitable for printing large objects due to minimal warping and is an industrial‑grade filament with many great properties.`,
  `Flexible filaments based on TPU are thermoplastic polyurethanes. In 3D printing, ABS and PLA were the standard plastics used for filaments. However, these two filaments lack a fundamental physical property — flexibility. Many prototypes or 3D prints need to be bendable while retaining their original form factor.`
];

let matSegment = new ImageSegment(_('matLeftButton'), _('matRightButton'), 0, titleSourcesMat, textSourcesMat);
matSegment.attachHandlers(2, 'matShow', 'mat', 'capTitleMat', 'scTextMat');

// SLA printer
let titleSourcesSLA = ['SLA printing', 'How does it work?', 'Why choose SLA?'];
let textSourcesSLA = [
  `Stereolithography is a 3D printing process used to produce concept models, cosmetic parts, rapid prototypes, and complex components with intricate geometry in as little as one day. Parts can be made from a wide range of materials, enabling extremely high‑resolution details and quality surfaces.`,
  `The machine begins the 3D printing process by drawing the support structures and then the part itself with an ultraviolet laser directed onto the surface of a liquid, curable resin. After a layer is imaged on the resin surface, the build platform moves down/up, allowing the next layer of resin to be applied. The process repeats layer by layer until the build is complete.`,
  `SLA is an excellent choice for rapid prototyping and for projects that require highly accurate parts with fine detail. It’s ideal for display parts that validate concept ideas and enable ergonomic testing.`
];

let slaSegment = new ImageSegment(_('slaLeftButton'), _('slaRightButton'), 0, titleSourcesSLA, textSourcesSLA);
slaSegment.attachHandlers(2, 'slaShow', 'sla', 'capTitleSla', 'scTextSla');
