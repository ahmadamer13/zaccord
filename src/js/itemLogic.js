const genSpecs = require('./includes/genSpecs.js');
const escapeVars = require('./includes/escapeVars.js');
const getColors = require('./includes/getColors.js');
const { translateRow, translateRows } = require('./includes/productTranslations.js');

// Build page for a specific item
const buildItemSection = (conn, itemId, req) => {
  return new Promise((resolve, reject) => {
    // Select the item from db & make sure it exists
    itemId = Number(escapeVars(itemId));
    conn.query("SELECT * FROM fix_products WHERE id = ? LIMIT 1", [itemId],
    function (err, result, fields) {
      if (err) {
        reject('An unexpected error occurred, please try again')
        return;
      }

      // Invalid item id
      if (result.length === 0) {
        reject('No such product');
        return;
      }

      // Create html output 
      let output = `
        <div class="overlay" id="overlay"></div>
        <img src="/images/icons/moreClose.svg" class="exitBtn trans" id="exitBtn"
          onclick="viewIn3D()">
        <div class="item3DViewer" id="viewBox">
          <img src="/images/icons/loader.gif" id="stlLoader" /> 
        </div>
        <section class="keepBottom animate__animated animate__fadeIn">
      `;

      // Apply product-level translations if available
      const tr = translateRow(result[0]);

      // Get properties of item (translated values if present)
      let id = tr.id;
      let url = tr.url;
      let imgUrl = tr.img_url;
      let productName = tr.name;
      let category = tr.category;
      let price = tr.price;
      let size = tr.size.replace(/x/g, 'mm x ');
      size += 'mm';
      size = size.replace(/\smm/g, 'mm');
      let description = tr.description.replace('<!--DATE-->', new Date().getFullYear());
      let gbtn = `
        <svg class="contSvg blue" style="margin-top: 0; margin-left: 3px;">
          <svg>
            <path d="M9,1.5C4.8,1.5,1.5,4.8,1.5,9s3.3,7.5,7.5,7.5s7.5-3.3,7.5-7.5S13.2,1.5,9,1.5z M9,14.5l-1-1 l3.8-3.8H3.5V8.3h8.4L8.1,4.5L9,3.5L14.5,9L9,14.5z"></path>
          </svg>
        </svg>
      `;
      description = description.replace('<!--GBTN-->', gbtn);

      // Clean repetitive boilerplate from descriptions for a cleaner product page
      // 1) Remove Eco-friendly packaging list item
      description = description.replace(/<li>\s*Eco-friendly packaging\s*<\/li>/gi, '');
      // 2) Remove size line inside features list (we already show size separately)
      description = description.replace(/<li>\s*\d+\s*mm\s*x\s*\d+\s*mm\s*x\s*\d+\s*mm\s*<\/li>/gi, '');
      // 3) Remove license + view/modify paragraph (EN)
      description = description.replace(/The product is available under a free <a [^>]+>license<\/a>[\s\S]*?modify it as you like\./gi, '');
      // 4) Remove print-on-demand sentence
      description = description.replace(/If you would like to print your own model, use the <a [^>]+>print-on-demand<\/a> function\./gi, '');
      // 5) Remove product author/rights notice (EN)
      description = description.replace(/Product by <a [^>]+>[^<]+<\/a>[\s\S]*?All rights reserved\./gi, '');
      // 6) Remove Hungarian boilerplate license/links blocks (HU)
      description = description.replace(/A term[é|e]k szabad <a [^>]+>licensszel<\/a>[\s\S]*?m[óo]dos[ií]thatod\.?/gi, '');
      description = description.replace(/van forgalomban, [\s\S]*?m[óo]dos[ií]thatod\.?/gi, '');
      description = description.replace(/Abban az esetben, [\s\S]*?<a [^>]+>b[é|e]rnyomtat[áa]s<\/a> funkci[óo]t\.?/gi, '');
      description = description.replace(/A term[é|e]ket <a [^>]+>[^<]+<\/a>[\s\S]*?(Minden jog fenntartva\.|All rights reserved\.)/gi, '');
      // 7) Remove stray Hungarian list items mentioning packaging with diacritics
      description = description.replace(/<li>\s*K[öo]rnyezetbar[áa]t csomagol[áa]s\s*<\/li>/gi, '');
      // 6) Remove empty feature lists if they became empty
      description = description.replace(/<ul class=\"dul\">\s*<\/ul>/gi, '');
      // 7) Tidy excess breaks
      description = description.replace(/(\s*<br>\s*){3,}/gi, '<br><br>');
      let stlPath = tr.stl_path;
      let showcaseImgs = tr.img_showcase.split(',');
      let firstImage = tr.img_url;
      let showcase = `<img src="/${firstImage}" style="height: 0;">`;
      let isBest = tr.is_best;
      for (let img of showcaseImgs) {
        showcase += `<img src="/images/${img}" style="height: 0;">`;
      }
      
      let stlPaths = [];
      let pathList = stlPath.replace(/\s/g, '').split(',');
      for (let i = 0; i < pathList.length; i++) {
        stlPaths.push({
          'id': i,
          'filename': '/fixedStl/' + pathList[i] + '.stl',
          'color': '#999999',
          'x': i * 150
        });
      }

      let pathArg = JSON.stringify(stlPaths);

      let popularTxt = '';
      if (isBest) {
        popularTxt = `
          <p class="gotham ddgray">Popular product</p>
        `;
      } else {
        popularTxt = `
          <p class="gotham ddgray">Category: ${category}</p>
        `;
      }
      
      output += `
        <div class="centerBox">
          <div class="leftAlignBox">
            <div class="galleria" id="galleria">
              ${showcase}
            </div>

            <p class="prodName hideSeek align lh" id="pname">${productName}</p>
            <div class="itemInfo">
              <p class="prodName hideText">${productName}</p>
              <p class="itemPrice">
                <span id="priceHolder">${price}</span> JD
              </p>
              <p class="gotham">
                <span id="sizeHolder">${size}</span>
              </p>
              ${popularTxt}
              <p class="gotham font14 qty" style="margin-bottom: 0;">
                Quantity
              </p> 
              <div class="quantity buttons_added">
                <input type="button" value="-" class="minus" id="minus">
                <input type="number" step="1" min="1" max="100" name="quantity" value="1"
                  title="Qty"
                  class="input-text qty text" size="4" pattern="" inputmode="" id="quantity"
                  >
                  <input type="button" value="+" class="plus" id="plus">
              </div>

              <div class="broHolder" id="broHolder">
                <button class="btnCommon bros btn--secondary" onclick="buyItem(${id})" aria-label="Buy now">
                  Buy now
                </button>
                <button class="btnCommon bros btn--primary" onclick="addToCart(${id})" aria-label="Add to cart">
                  Add to cart
                </button>
                <button class="btnCommon bros bros--icon btn--ghost" id="view3D" aria-label="View in 3D">
                  3D
                </button>
              </div>

              <div id="status" class="errorBox"></div>
              <div id="succBox" class="successBox"></div>
              <div id="info" class="infoBox"></div>
            </div>
          </div>
          <div class="clear"></div>

          <div class="contHolder flexDiv gotham">
            <div class="contTitle" id="descTitle">
              <div>
                Description            
              </div>
              <div class="hoverItem" id="descTitle_anim" style="display: block;"></div>
            </div>
            <div class="contTitle" id="specsTitle">
              <div>
                Specifications
              </div>
              <div class="hoverItem animate__animated animate__fadeOut" id="specsTitle_anim">
              </div>
            </div>
          </div>
          <hr class="hrStyle">
          <div id="descHS" class="descHS trans">
            <p>
              ${description}
            </p>
            <p class="ddgray">
              Except for live photos, product images are for illustration only!
              The product is made with a 3D printer!
            </p>
          </div>
          <div id="specsHS" class="specsHS trans">
      `;  

      let specsPromise = genSpecs(conn, price, size);
      let colorPromise = getColors(conn);

      Promise.all([specsPromise, colorPromise]).then(vals => {
        let specs = vals[0];
        const PCOLORS = vals[1][0];
        output += specs;
        output += `
          <div class="clear"></div> 

          <p class="align">
            <a href="/mitjelent" class="blueLink">Specification help</a>
          </p>

          <p class="align note ddgray">
            Changing specifications may affect the price!
          </p>

          <p class="align note ddgray">
            If you don’t want to fuss with parameters, leave the defaults!
          </p>
        </div>
        `;

        // Give product suggestion from the same category
        let sQuery = `SELECT * FROM fix_products WHERE category = ? AND id != ? ORDER BY RAND()
          LIMIT 6`;
        conn.query(sQuery, [category, itemId], (err, result, fields) => {
          if (err) {
            reject('An unexpected error occurred, please try again');
            return;
          }

          // If there are no more items in the category do not display suggestions at all
          if (result.length === 0) {
            output += `
              </section>
            `;
          } else {
            // Provide suggestions
            output += `
              <hr class="hrStyle">
                <p id="spec" class="align gotham" style="font-weight: 500;">
                  You may also like
                </p>
                <div class="flexDiv" style="flex-wrap: wrap;">   
            `;

            // Translate suggestion rows too
            const trows = translateRows(result);
            for (let i = 0; i < trows.length; i++) {
              let url = trows[i].url;
              let imgUrl = trows[i].img_url;

              output += `
                <div class="cartImgHolder bgCommon suggItem" 
                  style="background-image: url('/${imgUrl}')"
                  onclick="window.location.href='/${url}'">
                </div>
              `;           
            }

            output += `
                </div>
              </section>
            `;
          }

          output += `
            <script type="text/javascript">
              let isLoggedIn = ${req.user.id ? true : false};
              _('galleria').style.height = _('galleria').clientWidth + 'px';
              window.onresize = function resizeShowcase() {
                _('galleria').style.height = _('galleria').clientWidth + 'px';
              }

              _('view3D').addEventListener('click', function showModels(e) {
                viewIn3D(${pathArg});
              });

              const PCOLORS = ${JSON.stringify(PCOLORS)};
            </script>
          `;
          let descToTag = description.split('Tulajdons')[0].replace(/(\r\n|\n|\r)/gm, '')
          descToTag = descToTag.replace(/<a .*?>/, '').replace(/<\/a>/, '')
            .replace(/<br>/g, '');
          resolve([output, productName, descToTag]);
        });  
      });    
    });
  });
}

module.exports = buildItemSection;
