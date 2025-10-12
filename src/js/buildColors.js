const buildColors = (conn) => {
  const furtherInfo = `
    For more details see <a class="blueLink font16" href="/materialHelp">Printing Materials</a> and our
    <a class="blueLink font16" href="https://www.3djake.hu">supplier</a>.
  `;

  const desc = [
    `Popular, versatile standard FDM material available in many colors and textures.`,
    `Easy to use, stronger and more heat‑resistant than PLA.`,
    `Easy to sand and post‑process; can be acetone‑smoothed for a glossy finish.`,
    `Flexible and strong material that keeps its shape.`,
    `Similar to ABS with improved surface finish and UV resistance.`,
    'PLA blended with wood particles for a realistic wood look.',
    'PLA blended with metal particles for a metallic effect.',
    'PLA blended with stone particles for a stone‑like appearance.',
    'Gradient/multicolor PLA allowing multiple hues within one model.',
    'Standard resin material for SLA printers.',
    'Flexible and strong material that keeps its shape.',
    'Flexible and strong material that keeps its shape.',
    'Magas olvadáspontú, nagy szakítószilárdságú és erős anyag ipari alkalmazásra, funkcionális alkatrészekhez.',
    'Szénszálas, erős és tartós anyag ipari alkalmazásra.'
  ];

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
        let currentDesc = desc[i] + furtherInfo;
        let promise = new Promise((resolve, reject) => {
          let matQuery = 'SELECT * FROM colors WHERE material = ? ORDER BY color';
          conn.query(matQuery, [currentMaterial], (err, result, field) => {
            if (err) {
              reject(err);
              return;
            } else {
              let filamentsText = currentMaterial == 'gyanta (resin)' ? '' : 'Filaments';
              let filamentText = currentMaterial == 'gyanta (resin)' ? '' : 'Filament';
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
                      <p class="gotham">${colorName} ${currentMaterial.toUpperCase()} ${filamentText}</p>
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
