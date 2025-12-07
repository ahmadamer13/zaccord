const buildColors = (conn) => {
  const furtherInfo = `
    For more details see <a class="blueLink font16" href="/materialHelp">Printing Materials</a> and our
    <a class="blueLink font16" href="https://www.3djake.hu">supplier</a>.
  `;

  const descMap = {
    'plain': `Popular, versatile standard FDM material available in many colors and textures.`,
    'petg': `Easy to use, stronger and more heat‑resistant than PLA.`,
    'abs': `Easy to sand and post‑process; can be acetone‑smoothed for a glossy finish.`,
    'TPU (HARD - A95)': `Flexible and strong material that keeps its shape.`,
    'ASA': `Similar to ABS with improved surface finish and UV resistance.`,
    'Wood': 'PLA blended with wood particles for a realistic wood look.',
    'metal': 'PLA blended with metal particles for a metallic effect.',
    'stone': 'PLA blended with stone particles for a stone‑like appearance.',
    'magic': 'Gradient/multicolor PLA allowing multiple hues within one model.',
    'Resin': 'Standard resin material for SLA printers.',
    'TPU (Medium - A85)': 'Flexible and strong material that keeps its shape.',
    'TPU (Soft - A70)': 'Flexible and strong material that keeps its shape.',
    'nylon': 'High melting point, high tensile strength, strong material for industrial applications and functional parts.',
    'Carbon Fiber': 'Carbon‑fiber reinforced, strong and durable material for industrial applications.',
    // Fallback for old name if DB wasn't updated
    'resin (resin)': 'Standard resin material for SLA printers.'
  };

  const translateColor = require('./includes/translateColor.js');
  return new Promise((resolve, reject) => {
    let colorQuery = 'SELECT DISTINCT material FROM colors';
    let promises = [];
    let content = `<section class="keepBottom lh" style="overflow: visible;">`;
    conn.query(colorQuery, [], (err, result, field) => {
      if (err) {
        reject(err);
        return;
      }

      let materials = [];
      for (let i = 0; i < result.length; i++) {
        materials.push(result[i].material);
      }

      for (let i = 0; i < materials.length; i++) {
        let currentMaterial = materials[i];
        let description = descMap[currentMaterial] || 'High quality 3D printing material.';
        let currentDesc = description + furtherInfo;

        let promise = new Promise((resolve, reject) => {
          let matQuery = 'SELECT * FROM colors WHERE material = ? ORDER BY color';
          conn.query(matQuery, [currentMaterial], (err, result, field) => {
            if (err) {
              reject(err);
              return;
            } else {
              let isResin = currentMaterial.toLowerCase().includes('resin');
              let filamentsText = isResin ? '' : 'Filaments';
              let filamentText = isResin ? '' : 'Filament';
              let output = `
                <h2 class="fontNorm gotham ${i == 0 ? 'mtz' : 'mtf'}">
                  ${currentMaterial.toUpperCase()} ${filamentsText}
                </h2>
                <p>${currentDesc}</p>
                <div class="flexDiv flexWrap">
              `;

              for (let i = 0; i < result.length; i++) {
                let imgPath = result[i].images.split(',')[0];
                let colorName = result[i].color;
                let colorLabel = translateColor(colorName);
                let inStock = result[i].in_stock;
                let info = result[i].info;
                let stockClass = inStock ? 'inStock' : 'notInStock';
                let stockText = inStock ? 'In stock' : 'Out of stock';
                output += `
                  <span id="${colorName}_${currentMaterial.toUpperCase()}"></span>
                  <div class="colorBox trans">
                    <div>
                      <img src="/images/colors/${imgPath}">
                    </div>
                    
                    <div>
                      <p class="gotham">${colorLabel} ${currentMaterial.toUpperCase()} ${filamentText}</p>
                      <p class="gothamNormal">${info}</p>
                      <p class="${stockClass} gothamNormal">${stockText}</p>
                    </div>
                  </div>
                `;
              }
              output += '</div>';
              resolve(output);
            }
          });
        });
        promises.push(promise);
      }

      Promise.all(promises).then(values => {
        for (let v of values) {
          content += v;
        }

        content += `
          </section>
        `;

        resolve(content);
      });
    });
  });
}

module.exports = buildColors;
