const produceShowcaseOutput = require('./includes/itemGenerator.js');
const buildCategory = require('./buildCategory.js');

const CONTACT_FORM = `
  <div class="mtsix" style="width: calc(100% - 40px); max-width: 1300px; margin: 0 auto;">
    <hr class="hrStyle">
    <h2 class="gotham font26 align fontNorm" id="getQuote">
      Contact
    </h2>
    <h2 class="align font18 lh fontNorm gothamNormal">
      For custom printing, questions, or special requests, feel free to contact us!
    </h2>
    <div class="flexDiv" style="flex-wrap: wrap;" id="normalDiv">
      <input type="text" class="dFormField" id="name" placeholder="Name" value="">
      <input type="email" class="dFormField" id="email" placeholder="Email">
      <input type="text" class="dFormField protmob" id="mobile"
        placeholder="Phone number" value="">
      <textarea placeholder="CAD model URL, expectations: material, color, technology, etc."
        id="message" class="dFormField" style="width: 100%; height: 100px;"></textarea>
    </div>
    <button class="fillBtn btnCommon" id="submitBtn" style="display: block; margin: 0 auto;">
      Send
    </button>
    <div id="pstatus" class="align errorBox gothamNormal lh" style="margin-top: 20px;"></div>
    <div id="succstat" class="align successBox gothamNormal lh" style="margin-top: 20px;"></div>
  </div>
`;

// Build the index page from fixed products 
// TODO: use an async library to reduce the callback hell and better deal w. async queries
const buildMainSection = (conn, cat) => {
  return new Promise((resolve, reject) => {
    // Check if used in search query
    let isDefault = true;
    let sQuery = 'SELECT * FROM fix_products WHERE is_best = 1 ORDER BY priority ASC';

    let catToNum = {};
    
    // Build category slider
    let catQuery = 'SELECT DISTINCT category FROM fix_products ORDER BY category ASC';
    conn.query(catQuery, (e, res, f) => {
      if (e) {
        reject('An unexpected error occurred, please try again 1', e);
        return;
      }

      conn.query(sQuery, function (err, result, fields) {
        if (err) {
          reject('An unexpected error occurred, please try again 2');
          return;
        }

        // Create html output 
        let output = `
          <div class="topHolder">
            <div class="topShrink">
              <div class="topInner">
                <input type="text" autocomplete="off" class="searchBox"
                  placeholder="What are you looking for?"
                  onkeyup="searchForItem()" id="sfi" />
                <div class="categoryImg" onclick="toggleCategory()" id="categoryImg">
                  <img src="/images/icons/vmenu.svg">
                </div>
              </div>
              <div class="cbCont flexDiv trans" id="cbCont">
                <div class="arrows trans" id="larr" onclick="scrollHor('left')">
                  <img src="/images/larr.png" width="25" height="25">
                </div>
                <div class="catBox" id="catBox">
                  <a href="/?cat=Most%20Popular" class="pseudoLink">
                    <div onclick="sortByCat('Most Popular', 0)" class="scat"
                      style="background-color: #ececec; color: #4285f4; border-color: #4285f4;">
                      Most Popular
                    </div>
                  </a>
        `;

        for (let i = 0; i < res.length; i++) {
          // Build table for getting the respective number value for a category
          catToNum[res[i].category] = (i + 1);

          output += `
            <a href="/?cat=${res[i].category}" class="pseudoLink">
              <div onclick="sortByCat('${res[i].category}', ${i + 1})" class="scat">
                ${res[i].category}
              </div>
            </a>
          `; 
        }

        output += `
                  <a href="/?cat=All" class="pseudoLink">
                    <div onclick="sortByCat('All', ${res.length + 1})" class="scat">
                      All
                    </div>
                  </a>
                </div>
                <div class="arrows trans" id="rarr" onclick="scrollHor('right')">
                  <img src="/images/rarr.png" width="25" height="25">
                </div>
              </div>
            </div>
          </div>
          <div class="clear"></div>
        `;

        // Only further products on a category page
        // Only display the top of the landing page on the index page
        let popProdsStyle = 'display: inline-block;';
        let catToggle = 'display: none;';
        let moreShow = 'diplay: none;';
        let furtherShow = 'display: flex;';
        let showcaseStyle = 'display: block';
        if (cat) {
          popProdsStyle = 'display: none;';
          catToggle = 'display: block';
          moreShow = 'display: flex;';
          furtherShow = 'display: none;';
          showcaseStyle = 'height: 0px; visibility: hidden;';
        } 

        output += `
          <div class="wideShowcase" id="wideShowcase" style="${showcaseStyle}">
            <div class="bgShowcase bgCommon">
              <div class="darken"></div>
              <div class="textCenter">
                <h1 class="mainText lh gotham align fontNorm" style="padding: 10px;">
                  Precise 3D printing at Jordan3DPrint
                  <br>
                  <span class="gothamNormal font18" style="display:inline-block; margin-top:6px;">
                    We are proud to print your models on Bamboo Lab printers.
                  </span>
                  <button class="fillBtn instantQuote gotham" onclick="location.href = '/print'">
                    Instant quotation
                  </button>
                </h1>
              </div>
            </div>
          </div>

          <div class="flexProtCont" style="margin-top: 20px; ${furtherShow}">
            <div class="bgService bgCommon" id="cprintService">
              <div class="darken keepRounded"></div>
              <div class="textCenter pad lh">
                <h2 class="serviceTxt align font34 gotham servMain servMain fontNorm">Contract Printing</h2>
                <h3 class="serviceTxt align gotham fontNorm font16">
                  FDM and SLA printing with many colors and materials. Instant pricing lets you order
                  uploaded items immediately.
                </h3>
                <div class="flexDiv btnAlign">
                  <button class="whiteBtn gotham font18 trans" onclick="redirect('/print')">Learn more</button>
                  <button class="whiteBtn gotham font18 trans" onclick="redirect('/printHelp')">Help</button>
                </div>
              </div>
            </div>

            <div class="bgService bgCommon" id="protService">
              <div class="darken keepRounded"></div>
              <div class="textCenter pad lh">
                <h2 class="serviceTxt align font34 gotham servMain fontNorm">Prototyping</h2>
                <h3 class="serviceTxt align gotham fontNorm font16">
                  Small‑batch 3D‑printed prototyping is a faster, more cost‑effective way to build pilot
                  runs. For custom orders, feel free to contact us.
                </h3>
                <div class="flexDiv btnAlign">
                  <button class="whiteBtn gotham font18 trans" onclick="redirect('/prototype')">
                    Learn more
                  </button>
                  <button class="whiteBtn gotham font18 trans" onclick="redirect('/prototype#getInCont')">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="flexProtCont" style="${furtherShow}">
            <div class="bgService bgCommon" style="background-image: url('/images/a1.jpg'); background-size: cover; background-position: center; min-height: 220px; border-radius: 12px;">
              <div class="darken keepRounded"></div>
              <div class="textCenter pad lh">
                <h2 class="serviceTxt align font26 gotham fontNorm">Printed on Bambu Lab A1 Combo</h2>
                <h3 class="serviceTxt align gotham fontNorm font16">
                  High quality, speed and reliability thanks to our Bamboo Lab printers.
                </h3>
              </div>
            </div>
          </div>

          <h2 class="gotham align font34 printTech fontNorm" id="printTech" style="${popProdsStyle}">
            Printing Technologies
          </h2>

          <div class="flexProtCont" style="${furtherShow}">
            <div class="bgService bgCommon" id="fdmService">
              <div class="darken keepRounded"></div>
              <div class="textCenter pad lh">
                <h2 class="serviceTxt align font34 gotham servMain fontNorm">FDM</h2>
                <h3 class="serviceTxt align gotham fontNorm font16">
                  Great for rapid prototyping and cost‑effective models. The printer extrudes molten
                  filament layer by layer.
                </h3>
                <div class="flexDiv btnAlign">
                  <button class="whiteBtn gotham font18 trans" onclick="redirect('/mitjelent')">Learn more</button>
                </div>
              </div>
            </div>
            <div class="bgService bgCommon" id="slaService">
              <div class="darken keepRounded"></div>
              <div class="textCenter pad lh">
                <h2 class="serviceTxt align font34 gotham servMain fontNorm">SLA</h2>
                <h3 class="serviceTxt align gotham fontNorm font16">
                  Excellent for small parts or high precision; quality rivals injection‑molded plastic.
                  The printer cures liquid resin; parts are UV post‑cured.
                </h3>
                <div class="flexDiv btnAlign">
                  <button class="whiteBtn gotham font18 trans" onclick="redirect('/mitjelent')">Learn more</button>
                </div>
              </div>
            </div>

            <div class="greyBoxCont">
              <div class="indexGreyBox">
                <p class="gotham boxTitle">Contract Printing</p>
                <div class="greyBoxText">
                  <p class="gothamNormal lh">
                    If you need prints but don’t have a 3D printer, use our fully automated
                    <a class="blueLink" href="/print">contract printing</a> service.
                  </p>
                  <br>
                  <p class="gothamNormal lh">
                    Upload your model’s STL and order immediately. Personalize from color to layer height.
                  </p>
                  <br>
                  <p class="gothamNormal lh">
                    No waiting days for quotes — our algorithm shows instant pricing so you can decide on the spot.
                  </p>
                </div>
              </div>
              <div class="greyBoxImg bgCommon" id="gbi_1"></div>
            </div>

            <div class="greyBoxCont">
              <div class="indexGreyBoxLeft">
                <p class="gotham boxTitleLeft">Modeling</p>
                <div class="greyBoxTextLeft">
                  <p class="gothamNormal lh">
                    If you have an idea but no model, our 3D designers can help bring it to life.
                  </p>
                  <br>
                  <p class="gothamNormal lh">
                    We can work from drawings, photos, descriptions — or just an idea — after a short consultation.
                  </p>
                  <br>
                  <p class="gothamNormal lh">
                    Common requests include modeling broken parts from photos and measurements, then printing and shipping replacements.
                  </p>
                </div>
              </div>
              <div class="greyBoxImgLeft bgCommon" id="gbi_2"></div>
            </div>

            <div class="greyBoxCont">
              <div class="indexGreyBox">
                <p class="gotham boxTitle">Manufacturing</p>
                <div class="greyBoxText">
                  <p class="gothamNormal lh">
                    For product development, <a href="/prototype" class="blueLink">prototyping and short‑run production</a>, rely on our experienced team.
                  </p>
                  <br>
                  <p class="gothamNormal lh">
                    Before launch, building prototypes — even short pilot runs — is crucial.
                  </p>
                  <br>
                  <p class="gothamNormal lh">
                    3D printing excels here for speed and cost. Getting something tangible into customers’ hands early is key.
                  </p>
                </div>
              </div>
              <div class="greyBoxImg bgCommon" id="gbi_5"></div>
            </div>

            <div class="greyBoxCont">
              <div class="indexGreyBoxLeft">
                <p class="gotham boxTitleLeft">Products</p>
                <div class="greyBoxTextLeft">
                  <p class="gothamNormal lh">
                    Browse many pre‑printed products across categories — often items you won’t find elsewhere or at higher prices.
                  </p>
                  <br>
                  <p class="gothamNormal lh">
                    We print in biodegradable PLA filament to reduce environmental impact.
                  </p>
                  <br>
                  <p class="gothamNormal lh">
                    From statues and vases to soap dishes — everything is designed by individual modelers, so your purchase supports their work.
                  </p>
                </div>
              </div>
              <div class="greyBoxImgLeft bgCommon" id="gbi_4"></div>
            </div>


            <div class="greyBoxCont">
              <div class="indexGreyBox">
                <p class="gotham boxTitle">Lithophane</p>
                <div class="greyBoxText">
                  <p class="gothamNormal lh">
                    A <a href="/print" class="blueLink">lithophane</a> is a perfect personal gift for almost any
                    occasion. Surprise loved ones with a unique relief image you can order instantly.
                  </p>
                  <br>
                  <p class="gothamNormal lh">
                    The printer creates a relief image on a flat or curved surface that becomes clear when backlit.
                  </p>
                  <br>
                  <p class="gothamNormal lh">
                    Often used as lamp shades: varying thickness lets through different light levels, revealing a
                    monochrome image.
                  </p>
                </div>
              </div>
              <div class="greyBoxImg bgCommon" id="gbi_3"></div>
            </div>
          </div>
          
          <p class="gotham align font34" style="margin-top: 60px; margin-bottom: 0; ${popProdsStyle}"
            id="popProds">
            Most Popular Products
          </p>
        `;

        output += `
          <section class="mainShowcase keepBottom animate__animated animate__fadeIn" id="ms">
            <div class="dynamicShowcase" id="dynamicShowcase">
        `;
         
        if (!cat) {
          var prodElements = new Promise((resolve, reject) => {
            let collectItems = '';
            // Loop through all fixed items in the db
            for (let i = 0; i < result.length; i++) {
              collectItems += produceShowcaseOutput(result, isDefault, i, false, true);
            }
            resolve(collectItems);
          });
        } else {
          // If URL is a simple category only display products in that category
          var prodElements = new Promise((resolve, reject) => {
            let collectItems = '';
            buildCategory(conn, cat).then(data => {
              collectItems += data;
              resolve(collectItems);
            }).catch(err => {
              reject('Hiba');
            });
          }); 
        }

        prodElements.then(data => {
          output += data;

          // Add the 4 newest products after most popular ones
          let newestQuery = 'SELECT * FROM fix_products ORDER BY date_added DESC LIMIT 4';
          conn.query(newestQuery, function displayNewItems(err, newRes, fields) {
            if (err) {
              reject('An unexpected error occurred, please try again 3');
              return;
            }
            
            output += `
              </div>
              <section class="mainShowcase" id="toggleLower" style="${catToggle}">
                <hr class="hrStyle" style="margin-top: 0;">
                <p class="mainTitle" style="margin-top: 20px;">New Arrivals</p>
                <div class="dynamicShowcase newies">
            `;

            for (let i = 0; i < newRes.length; i++) {
              let url = newRes[i].url;
              let imgUrl = newRes[i].img_url;
              let prodName = newRes[i].name;
              let price = newRes[i].price;

              output += `
                <a href="/${url}">
                  <div class="cartImgHolder bgCommon newProds lazy" data-bg="/${imgUrl}"
                    style="background-color: rgb(53, 54, 58);"
                    onclick="window.location.href = '/${url}'">
                  </div>
                  <span class="gotham align">
                    <p>${prodName}</p>
                    <p>${price} JD</p>
                  </span>
                </a>
              `;
            }

            output += '</div>';

            // Finally, select products from other categories 
            output += `
              <hr class="hrStyle" style="${catToggle}">
              <p class="mainTitle" style="margin-top: 20px; ${catToggle}">More Products</p>
              <div class="dynamicShowcase" style="${moreShow}">
            `;
       
            let uniqueCategories = `SELECT DISTINCT category FROM fix_products ORDER BY RAND()`;
            let promises = [];
            let catRes = conn.query(uniqueCategories, (err, catRes, fields) => {
              for (let i = 0; i < catRes.length; i++) {
                if (err) {
                  reject('An unexpected error occurred, please try again 4');
                  return;
                }
                
                let currentCat = catRes[i].category;
                let moreQuery = `
                  SELECT * FROM fix_products WHERE category = ? ORDER BY RAND() LIMIT 4
                `;

                let innerRes = new Promise((resolve, reject) => {
                  conn.query(moreQuery, [currentCat], (err, innerRes, fields) => {
                    if (err) {
                      reject('An unexpected error occurred, please try again 5');
                      return;
                    }
                   
                    let output = '';
                    if (!innerRes.length) {
                      resolve('');
                    }

                    output += `
                      <div style="width: 100%; justify-content: center; margin-bottom: 10px;"
                        class="flexDiv">
                        <div class="gotham font22 align" style="margin-top: 0;">
                          ${currentCat}
                        </div>
                        <div class="seeMore trans"
                          onclick="sortByCat('${currentCat}', ${catToNum[currentCat]}, true)">
                          <img src="/images/icons/eye.svg" width="24" height="24"
                            alt="More products in category ${currentCat}">
                        </div>
                      </div>
                    `;

                    for (let i = 0; i < innerRes.length; i++) {
                      output += produceShowcaseOutput(innerRes, isDefault, i, true);
                    }

                    resolve(output);
                  });
                });
                promises.push(innerRes);
              }

              Promise.all(promises).then(data => {
                for (let d of data) {
                  output += d;
                }
                output += `
                      </div>
                    </section>
                  </section>
                `;

                output += CONTACT_FORM;

                // Add lazy load of images
                output += `
                  <script src="/js/includes/lazyLoad.js"></script>
                  <script type="text/javascript">
                    var ll = new LazyLoad({
                      elements_selector: ".lazy",
                      callback_loaded: (el) => el.style.backgroundColor = 'white'
                    });

                    for (let el of Array.from(document.getElementsByClassName('pseudoLink'))) {
                      el.addEventListener('click', (e) => {
                        e.preventDefault();
                      });
                    }
                  </script>
                `;

                resolve(output);
              });
            });
          });
        });
      });
    });
  });
}

module.exports = buildMainSection;
