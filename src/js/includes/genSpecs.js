const constants = require('./specParams.js');
const LAYER_WIDTH_VALUES = constants.layerHeight;
const INFILL_VALUES = constants.infill;
const SCALE_VALUES = constants.scale;
const WALL_WIDTH_VALUES = constants.wallWidth;
const LAYER_WIDTH_VALUES_SLA = constants.layerHeightSLA;
const INFILL_VALUES_SLA = constants.infillSLA;
const getColors = require('./getColors.js');

// Generate a form where the user can change the item's parameters
function genSpecs(conn, price, size, isLit = false, isCP = false) {
  return new Promise((resolve, reject) => {
    getColors(conn).then(([colors, hex_codes]) => {
      const PRINT_COLORS = colors;
      const limitedMap = {
        'petg': ['White', 'Black']
      };
      const enforceLimited = (mat) => {
        if (!mat) return;
        const lower = mat.toLowerCase();
        const base = limitedMap[lower];
        if (!base) return;
        let list = Array.isArray(PRINT_COLORS[mat]) ? PRINT_COLORS[mat].slice() : [];
        list = list.filter(c => base.indexOf(c) > -1);
        if (!list.length) list = base.slice();
        PRINT_COLORS[mat] = list;
      };

      enforceLimited('petg');
      // Limit materials to PLA and PETG only
      const MAT_KEYS = Object.keys(colors);
      const ALLOWED_MATS = [];
      if (MAT_KEYS.includes('pla')) ALLOWED_MATS.push('PLA');
      if (MAT_KEYS.includes('petg')) ALLOWED_MATS.push('PETG');
      const PRINT_MATERIALS = ALLOWED_MATS;
      const COLOR_LABELS = {
        'White': 'Pearl White',
        'Black': 'Matte Black',
        'Blue': 'Royal Blue',
        'Dark Blue': 'Royal Blue',
        'Light Blue': 'Sky Blue',
        'Green': 'Emerald Green',
        'Dark Green': 'Emerald Green',
        'Red': 'Crimson Red',
        'Dark Gray': 'Gunmetal Gray',
        'Gray': 'Gunmetal Gray',
        'Transparent': 'Transparent (Clear)',
        'Gold': 'Gold',
        'Silver': 'Silver',
        'Brown': 'Copper Bronze',
        'Neon Orange': 'Neon Orange',
        'Purple': 'Deep Purple'
      };
      const ALLOWED_COLOR_EN = new Set([
        'Matte Black',
        'Black',
        'Pearl White',
        'White',
        'Royal Blue',
        'Crimson Red',
        'Emerald Green',
        'Gunmetal Gray',
        'Transparent (Clear)',
        'Gold Metallic',
        'Silver Metallic',
        'Copper Bronze',
        'Neon Orange',
        'Sky Blue',
        'Beige Sandstone',
        'Deep Purple',
        'Glow-in-the-Dark Green'
      ]);
      let output = '';
      if (!isLit) {
        output += `
          <hr class="hrStyle">
            <div class="itemSpecifications animate__animated" id="toggleDiv">
              <div class="specBox gotham">
                <div id="rvasFDMBox">
                  <div class="specTitle">Layer Height</div>
                  <select class="specSelect" id="rvas" onchange="updateSpecs(this, ${price}, false,
                    false, ${isCP})">
        `;

        for (let lw of LAYER_WIDTH_VALUES) {
          let selected = lw == 0.2 ? 'selected' : '';
          output += `
            <option value="${lw.toFixed(2)}" ${selected}>${lw.toFixed(2)}mm</option>
          `;
        }

        output += `
                  </select>
                </div>
                <div class="SLASpecs" id="rvasSLABox">
                  <div class="specTitle">Layer Height</div>
                    <select class="specSelect" id="rvasSLA"
                      onchange="updateSLASpecs('rvasSLA', 'rvas')">
        `;

        for (let lw of LAYER_WIDTH_VALUES_SLA) {
          let selected = lw == 0.05 ? 'selected' : '';
          output += `
            <option value="${lw.toFixed(2)}" ${selected}>${lw.toFixed(2)}mm</option>
          `;
        }

        output += `
                  </select>
                </div>
                <div class="SLASpecs" id="infillSLABox">
                  <div class="specTitle">Infill</div>
                    <select class="specSelect" id="infillSLA"
                      onchange="updateSLASpecs('infillSLA', 'suruseg')">
        `;

        for (let infill of INFILL_VALUES_SLA) {
          let selected = infill == 'Solid' ? 'selected' : '';
          output += `
            <option value="${infill}" ${selected}>${infill}</option>
          `;
        }

        output += `
                  </select>
                </div>
                <div id="surusegFDMBox">
                  <div class="specTitle trans">Infill</div>
                    <select class="specSelect" id="suruseg" onchange="updateSpecs(this, ${price},
                    false, false, ${isCP})">
        `;

        for (let infill of INFILL_VALUES) {
          let selected = infill == 20 ? 'selected' : '';
          output += `
            <option value="${infill}" ${selected}>${infill}%</option>
          `;
        }

        output += `
                  </select>
                </div>
                
                <div>
                  <div class="specTitle">
                    <a href="/colors" class="trans colorLink">Color</a>
                    <img src="/images/icons/external.png" id="goToColor">
                  </div>
                  <select class="specSelect" id="color">
        `;

        for (let c of PRINT_COLORS['pla']) {
          let label = COLOR_LABELS[c] || c;
          if (!ALLOWED_COLOR_EN.has(label)) continue;
          let selected = (c == 'White') ? 'selected' : '';
          output += `
            <option value="${c}" ${selected}>${label}</option>
          `;
        }

        output += `          
                  </select>
                </div>

                <div>
                  <div class="specTitle">Scale</div>
                  <select class="specSelect" id="scale"
                    onchange="updateScale(this, ${price}, '${size}')">
        `;

        for (let scale of SCALE_VALUES) {
          let selected = scale == 1 ? 'selected' : '';
          output += `
            <option value="${scale.toFixed(1)}" ${selected}>x${scale.toFixed(1)}</option>
          `;
        }

        output += `
                  </select>
                </div>

                <div id="fvasFDMBox">
                  <div class="specTitle">Wall Thickness</div>
                  <select class="specSelect" id="fvas" onchange="updateSpecs(this, ${price}, false,
                  false, ${isCP})">
        `;

        for (let ww of WALL_WIDTH_VALUES) {
          let selected = ww.toFixed(2) == 1.2 ? 'selected' : '';
          output += `
            <option value="${ww.toFixed(1)}" ${selected}>${ww.toFixed(1)}mm</option>
          `;
        }

        output += `
                </select>
              </div>
        `;

        if (isCP) {
          output += `
            <div id="printMatBox">
              <div class="specTitle">Material</div>
              <select class="specSelect" id="printMat" onchange="updateSpecs(this, ${price}, false,
                false, ${isCP})">
          `;

          for (let pm of PRINT_MATERIALS) {
            // Display name cleanup: show TPU instead of TPU_MEDIUM or other variant
            const disp = pm.startsWith('TPU') ? 'TPU' : pm;
            output += `<option value="${pm}">${disp}</option>`;
          }

          output += `
              </select>
            </div>
          `;
        }

        output += `
            </div>
          </div>
          `;

      } else {
        output += `
          <hr class="hrStyle">
          <div class="itemSpecifications">
          <div class="specBox gotham">
          <div>
          <div class="specTitle">Shape</div>
          <select class="specSelect" id="sphere">
            <option value="Convex" selected>Convex</option>
            <option value="Concave">Concave</option>
            <option value="Flat">Flat</option>
          </select>
          </div>

          <div>
            <div class="specTitle">Size</div>
            <select class="specSelect" id="size" onchange="updateLit()">
            </select>
          </div>
          <div>
            <div class="specTitle">Color</div>
            <select class="specSelect" id="color">
        `;

        for (let c of PRINT_COLORS['pla']) {
          let selected = (c == 'White') ? 'selected' : '';
          output += `
            <option value="${c}" ${selected}>${c}</option>
          `;
        }

        output += `
                  </select>
                </div>
              </div>
            </div>
          </div>
        `;

      }

      resolve(output);
    });
  });
}

module.exports = genSpecs;
