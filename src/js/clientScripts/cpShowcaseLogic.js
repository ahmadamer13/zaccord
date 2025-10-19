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
let titleSources = [
  'Fast prototyping with FDM printing',
  'Typical use cases',
  'Smart pricing, seamless ordering',
  'Small‑batch prototyping and custom orders'
];
let textSources = [
  `This technology is an excellent choice for small runs before launching a final product. Catching potential issues early saves significant time and money during product development.`,
  `Common applications include printing architectural models, phone cases, everyday tools, and component prototypes. For small‑series prototyping, you can hand a test product to users early for feedback.`,
  `No need for back‑and‑forth or manual quotes — just upload your STL files and adjust parameters as needed. Our algorithm instantly calculates pricing, streamlining the process.`,
  `For small‑batch prototyping or entirely custom requests, use the Prototyping page to get in touch and coordinate the details.`
];

let cpSegment = new ImageSegment(_('cpLeftButton'), _('cpRightButton'), 0, titleSources, textSources);
cpSegment.attachHandlers(3, 'cpShow', 'cp', 'capTitle', 'scText');

// Lithophane
let titleSourcesLit = ['Printed lithophane next to the original photo', 'How does it work?'];
let textSourcesLit = [
  `A lithophane looks like a faint, embossed image in normal light, but reveals a crisp picture when backlit. From your digital image, the 3D printer creates a tangible lithophane that faithfully represents the original photo.`,
  `Layers of different thickness let different amounts of light through, which is why some parts appear darker and others lighter. Thanks to printing precision, the resulting lithophane closely reproduces the original image.`,
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
