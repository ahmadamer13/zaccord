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

        // Create html output (Modern hero + compact category strip)
        let output = `
          <section class="hero animate__animated animate__fadeIn">
            <video class="hero__video" autoplay muted loop playsinline poster="/images/serviceImages/fdmInfo.jpg">
              <source src="/Untitled%20design%20(1).mp4" type="video/mp4">
            </video>
            <div class="hero__bg" aria-hidden="true"></div>
            <div class="hero__content">
              <h1 class="hero__title fancyTitle">Custom 3D Printing in Jordan</h1>
              <p class="hero__sub">Instant pricing, fast turnaround, and expert support. Professional makers, trusted in Jordan. Upload your STL to get a quote or chat for help. FDM and SLA available.</p>
              <div class="hero__cta" style="display:flex; flex-direction:column; align-items:center; gap:10px;">
                <button class="btn btn-primary" onclick="redirect('/print')">Print Now — اطبع الان</button>
                <a class="btn btn-whatsapp" href="https://wa.me/message/KQRSOE7ZSWJBK1" target="_blank" rel="noreferrer">Chat on WhatsApp — تواصل واتساب</a>
              </div>
            </div>
          </section>

          <!-- Sticky instant quote bar (Craftcloud-like) -->
          <div class="quoteBar">
            <div class="quoteInner">
              <div class="quoteTitle">Get an instant quote • احصل على سعر فوري</div>
              <a class="quoteCTA" href="/print">
                <img src="/images/icons/whatsapp.svg" alt="Upload" style="display:none">
                Upload STL & Get Price • ارفع STL واحصل على السعر
              </a>
              <div class="quoteHint">FDM & SLA • Multiple materials • Jordan‑wide delivery</div>
            </div>
          </div>

          <!-- Combined Bilingual Special Offer Banner with subtle animation -->
          <style>
            @keyframes promoPulse { from { transform: translateY(0); opacity: 0.96; }
                                    to   { transform: translateY(-2px); opacity: 1; } }
          </style>
          <section class="promo-offer animate__animated animate__fadeIn"
            style="box-sizing:border-box; width:100%; background:linear-gradient(90deg,#0ea5e9,#22c55e); color:#fff; padding:18px 12px; animation: promoPulse 1.6s ease-in-out infinite alternate;">
            <div style="max-width:1200px; margin:0 auto; display:flex; align-items:center; gap:16px; flex-wrap:wrap; justify-content:center;">
              <div style="display:flex; align-items:center; gap:10px;">
                <span class="gotham" style="font-size:28px; font-weight:800; letter-spacing:0.3px;">Special Offer</span>
              </div>
              <div class="gothamNormal" style="font-size:20px; line-height:1.2; text-align:center;">
                FDM Printing at <strong style="font-size:32px; color:#111827;">0.07 JD</strong> per gram — limited time!
              </div>
            </div>
            <div dir="rtl" lang="ar" style="max-width:1200px; margin:8px auto 0; display:flex; align-items:center; gap:12px; flex-wrap:wrap; justify-content:center;">
              <div style="display:flex; align-items:center; gap:10px;">
                <span class="gotham" style="font-size:24px; font-weight:800;">عرض خاص</span>
              </div>
              <div class="gothamNormal" style="font-size:18px; line-height:1.8; text-align:center;">
                ✨ عرض خاص!<br>
                طباعة مجسّمات ثلاثية الأبعاد بسعر يبدأ من <strong>0.07 قرش للغرام</strong><br>
                ابدأ الآن في طباعة أحلامك إلى واقع ملموس!
              </div>
            </div>
          </section>

          <!-- How it works (3 steps) -->
          <section class="stepsBand animate__animated animate__fadeIn">
            <div class="stepsInner">
              <div class="stepCard">
                <div class="stepNum">1</div>
                <div class="stepText">
                  <h4>Upload STL • ارفع ملف STL</h4>
                  <p>Drag & drop or browse. يدعم ملفات STL فقط للطباعة.</p>
                </div>
              </div>
              <div class="stepCard">
                <div class="stepNum">2</div>
                <div class="stepText">
                  <h4>Configure • إعداد الخيارات</h4>
                  <p>Choose material and quality. اختر المادة والجودة.</p>
                </div>
              </div>
              <div class="stepCard">
                <div class="stepNum">3</div>
                <div class="stepText">
                  <h4>Instant price • سعر فوري</h4>
                  <p>Checkout and we print & ship. الدفع والطباعة والتوصيل.</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Trusted by section -->
          <section class="home-section animate__animated animate__fadeIn" style="margin-top:28px;">
            <h2 class="home-sub" style="margin-bottom:12px;">Trusted by makers and SMEs across Jordan • موثوق من قبل المبدعين والشركات في الأردن</h2>
            <div class="trustedBar">
              <div class="trustBadge">Fast Turnaround</div>
              <div class="trustBadge">Bambu Lab Printers</div>
              <div class="trustBadge">FDM & SLA</div>
              <div class="trustBadge">Expert Support</div>
              <div class="trustBadge">Jordan‑wide Delivery</div>
            </div>
          </section>

          <section class="home-section">
            <h2 class="home-title">Why 3DJordanPrint</h2>
            <p class="home-sub">Reliable local service with transparent pricing. From prototypes to small-batch production, we help you move from idea to part quickly.</p>
            <div class="features">
              <div class="feature-card">
                <img class="feature-ico" src="/images/icons/loader.svg" alt="Fast" />
                <p class="feature-title">Fast Turnaround</p>
                <p class="feature-desc">Typical jobs in 1–3 days.</p>
              </div>
              <div class="feature-card">
                <img class="feature-ico" src="/images/icons/printer.svg" alt="Pricing" />
                <p class="feature-title">Instant Pricing</p>
                <p class="feature-desc">Upload STL, see price immediately.</p>
              </div>
              <div class="feature-card">
                <img class="feature-ico" src="/images/icons/custom_print.svg" alt="Materials" />
                <p class="feature-title">Materials</p>
                <p class="feature-desc">PLA, PETG, ABS, resin (SLA).</p>
              </div>
              <div class="feature-card">
                <img class="feature-ico" src="/images/icons/deliver.png" alt="Delivery" />
                <p class="feature-title">Nationwide Delivery</p>
                <p class="feature-desc">Jordan-wide delivery options.</p>
              </div>
              <div class="feature-card">
                <img class="feature-ico" src="/images/icons/whatsapp.svg" alt="Support" />
                <p class="feature-title">Local Support</p>
                <p class="feature-desc">English and Arabic guidance.</p>
              </div>
              <div class="feature-card">
                <img class="feature-ico" src="/images/icons/protBlack.svg" alt="Prototyping" />
                <p class="feature-title">Prototyping</p>
                <p class="feature-desc">Pilot runs and design help.</p>
              </div>
            </div>
          </section>

          <section class="home-section" style="margin-top: 24px;">
            <h2 class="home-title" style="margin-bottom:12px;">How It Works</h2>
            <div class="process">
              <div class="step"><div class="badge">1</div><div><h4>Upload your model</h4><p>STL for FDM or image for lithophane.</p></div></div>
              <div class="step"><div class="badge">2</div><div><h4>Configure options</h4><p>Choose material, color, and quality.</p></div></div>
              <div class="step"><div class="badge">3</div><div><h4>See price instantly</h4><p>Transparent, instant quotes — no emails needed.</p></div></div>
              <div class="step"><div class="badge">4</div><div><h4>We print and ship</h4><p>Pickup or nationwide delivery.</p></div></div>
            </div>
          </section>

          <div class="topHolder" style="margin-top: 10px;">
            <div class="topShrink">
              <div class="topInner">
                <input type="text" autocomplete="off" class="searchBox" placeholder="Search products..." onkeyup="searchForItem()" id="sfi" />
                <div class="categoryImg" onclick="toggleCategory()" id="categoryImg">
                  <img src="/images/icons/vmenu.svg" alt="Categories">
                </div>
              </div>
              <div class="cbCont flexDiv trans" id="cbCont">
                <div class="arrows trans" id="larr" onclick="scrollHor('left')">
                  <img src="/images/larr.png" width="25" height="25" alt="Left">
                </div>
                <div class="catBox" id="catBox">
        `;

        for (let i = 0; i < res.length; i++) {
          // Build table for getting the respective number value for a category
          catToNum[res[i].category] = (i + 1);

          output += `
            <a href="/?cat=${res[i].category}" class="pseudoLink" rel="nofollow">
              <div onclick="sortByCat('${res[i].category}', ${i + 1})" class="scat">
                ${res[i].category}
              </div>
            </a>
          `; 
        }

        output += `
                  <a href="/?cat=All" class="pseudoLink" rel="nofollow"><div onclick="sortByCat('All', ${res.length + 1})" class="scat">All</div></a>
                </div>
                <div class="arrows trans" id="rarr" onclick="scrollHor('right')">
                  <img src="/images/rarr.png" width="25" height="25" alt="Right">
                </div>
              </div>
            </div>
          </div>
          <div class="clear"></div>
        `;

        // Only further products on a category page
        // Only display the top of the landing page on the index page
        let popProdsStyle = 'display: none;';
        let catToggle = 'display: none;';
        let moreShow = 'diplay: none;';
        if (cat) {
          popProdsStyle = 'display: none;';
          catToggle = 'display: block';
          moreShow = 'display: flex;';
        } 
        
        output += `
          <p class="gotham align font34" style="margin-top: 60px; margin-bottom: 0; ${popProdsStyle}"
            id="popProds">
            Most Popular Products
          </p>
        `;

        output += `
          <section class="mainShowcase keepBottom animate__animated animate__fadeIn" id="ms" style="display:none;">
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
