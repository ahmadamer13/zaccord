const randomstring = require('randomstring');
const genItem = require('./includes/genItem.js');
const genDelivery = require('./includes/genDelivery.js');
const calcPrice = require('./includes/calcPrice.js');
const calcLitPrice = require('./includes/calcLitPrice.js');
const validateParams = require('./includes/validateParams.js');
const validateLitParams = require('./includes/validateLitParams.js');
const parseCookies = require('./includes/parseCookies.js');
const formatOrderId = require('./includes/formatOrderId.js');
const constants = require('./includes/constants.js');
const shouldAllowSLA = require('./includes/allowSLA.js');
const calcSLAPrice = require('./includes/calcSLAPrice.js');
const getMaterials = require('./includes/getMaterials.js');
const NodeStl = require('node-stl');
const fs = require('fs');
const path = require('path');

// Shipping and money handle prices constants are used throughout the page
const shipping = require('./includes/shippingConstants.js');
const SHIPPING_OBJ = shipping.shippingObj;
const FREE_SHIPPING_LIMIT = shipping.freeShippingLimit;
const MONEY_HANDLE = shipping.moneyHandle;
const getIDs = shipping.getIDs;
const DELIVERY_TO_MONEY = shipping.deliveryToMoney;
const PACKET_POINT_TYPES_R = shipping.packetPointTypesR;

const calcCPPrice = constants.calcCPPrice;
const getCoords = constants.getCoords;
const SLA_MULTIPLIER = constants.slaMultiplier;
const DISCOUNT = constants.discount;

const BA_NUM = constants.baNum;
const BA_NAME = constants.baName;

let DEFAULT_SHIPPING_PRICE;
for (let key of Object.keys(SHIPPING_OBJ)) {
  if (SHIPPING_OBJ[key]['prior'] == 1) {
    DEFAULT_SHIPPING_PRICE = SHIPPING_OBJ[key]['actualPrice'];
  }
}

// Build page where the customer can buy the products/custom print
const buildBuySection = (conn, paramObj, req) => {
  return new Promise((resolve, reject) => {
    // Generate random 8-char order ID
    let orderID = randomstring.generate({
      length: 4,
      charset: 'numeric'
    });

    let userID = req.user.id;

    // Order ID in a more readable form: formatOrderId(orderID)
    // Currently not used, if more orders come in we may need to format a longer sequence
    let orderIDDisplay = orderID;

    // Build html output
    let output = `
      <script type="text/javascript"></script>
      <section class="keepBottom">
        <span id="main">
          <p class="blueHead" style="font-size: 24px; margin-top: 0;">1. Products</p>
          <div id="emlHolder">
    `;

    // Calc parameters in connection with final price, discount, shipping...
    function calcPrices(price) {
      let discount = 1;
      let discountText = '';

      if (price > FREE_SHIPPING_LIMIT) {
        discount = DISCOUNT;
        discountText = `(${Math.round((1 - DISCOUNT) * 100)}% discount)`;
      }

      let actualShippingPrice = (price > FREE_SHIPPING_LIMIT) ? 0 : DEFAULT_SHIPPING_PRICE;
      return [discount, discountText, actualShippingPrice];
    }

    // Reusable promise for generating a single item for output
    function buildItemOutput(PRINT_MULTS, isCrt, userID, orderID, product, rvas, suruseg, color, scale, fvas, quantity) {
      return new Promise((resolve, reject) => {
        // Get the product with that id from database & validate parameters
        let cQuery = 'SELECT * FROM fix_products WHERE id = ? LIMIT 1'; 
        conn.query(cQuery, [product], (err, result, field) => {
          if (err) {
            reject('An unexpected error occurred, please try again');
            return;
          }

          // Product does not exist
          if (result.length < 1) {
            reject('No such product');
            return;
          }

          // Product exists, now validate params
          validateParams(conn, paramObj).then(res => {
            if (!res) {
              reject('Invalid parameter value');
              return;
            }

            let prodURL = result[0]['url'];
            let itemID = result[0]['id'];
            let imgURL = result[0]['img_url'];
            let price = result[0]['price'];
            let name = result[0]['name'];

            let data = {
              'orderID': orderID,
              'itemID': itemID,
              'prodURL': prodURL,
              'imgURL': imgURL,
              'price': calcPrice(PRINT_MULTS, price, rvas, suruseg, scale, fvas),
              'name': name,
              'rvas': rvas,
              'suruseg': suruseg,
              'scale': scale,
              'color': color,
              'fvas': fvas,
              'printMat': 'PLA',
              'quantity': quantity,
              'basePrice': price,
              'prodType': 'fp',
              'tech': 'FDM',
              'fixProduct': true
            };

            // Calculate shipping price & final price
            let total = data.price * quantity;
            let discount, discountText, shippingPrice;
            [discount, discountText, shippingPrice] = calcPrices(total);

            let finalPrice = data.price * quantity * discount;
            if (isCrt) {
              finalPrice *= 1 / discount
            }

            // Generate html output
            let output = genItem(false, false, false, data);
            
            if (!isCrt) {
              resolve([output, data, finalPrice, discountText, shippingPrice]);
            } else {
              resolve([output, data, finalPrice]);
            }
          });
        });
      });
    }

    function buildCPOutput(PRINT_MULTS, rvas, suruseg, color, scale, fvas, quantity, printMat, printSize, tech, isFromCrt = false, fname = false) {
      return new Promise((resolve, reject) => {
        // Validate params
        validateParams(conn, paramObj).then(res => {
          if (!res) {
            reject('Invalid parameter value');
            return;
          }
          
          // Validate files
          if (!isFromCrt) {
            var files = paramObj.files.split(',');
          } else {
            var files = [fname];
          }

          let finalPrice = 0;
          let output = '';
          let dataAll = [];

          for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let uid = Number(file.split('_')[0]);

            // Now make sure that file & its thumbnail exist in directory if prefix is uid
            let filePath = path.join(__dirname.replace(path.join('src', 'js'), ''),
              'printUploads', file + '.stl');
            let thPath = path.join(__dirname.replace(path.join('src', 'js'), ''),
              'printUploads', 'thumbnails', file + '.png');
            if (!fs.existsSync(filePath) || !fs.existsSync(thPath)) {
              reject('File not found');
              return;
            }

            // If model is printed with SLA make sure that it's not too large
            if (tech == 'SLA' && !shouldAllowSLA(filePath, scale)) {
              reject('The STL file is too large for SLA printing'); 
              return;
            }

            // Get volume to calculate price
            let [vol, area] = getCoords(filePath);
            let basePrice = calcCPPrice(vol, area);
            let price;
            if (tech == 'SLA') {
              price = calcSLAPrice(basePrice * SLA_MULTIPLIER, rvas, suruseg, scale); 
            } else {
              price = calcPrice(PRINT_MULTS, basePrice, rvas, suruseg, scale, fvas, printMat);
            }
            finalPrice += price * quantity;

            // Build image path for thumbnail
            thPath = thPath.split('/');
            thPath = (thPath[thPath.length - 3] + '/' + thPath[thPath.length - 2] + '/' +
                thPath[thPath.length - 1]); 

            let pName = 'Custom printed item #' + (i + 1);
            if (isFromCrt) pName = 'Custom printed item';

            var data = {
              'orderID': orderID,
              'itemID': file,
              'prodURL': 'uploadPrint?file=' + file,
              'imgURL': thPath,
              'price': price,
              'name': pName,
              'rvas': rvas,
              'suruseg': suruseg,
              'scale': scale,
              'color': color,
              'fvas': fvas,
              'quantity': quantity,
              'printMat': tech != 'SLA' ? printMat : 'Gyanta (Resin)',
              'tech': tech,
              'printSize': printSize,
              'basePrice': basePrice,
              'prodType': 'cp',
              'fixProduct': false
            };

            output += genItem(false, false, false, data, false, false, true);
            dataAll.push(data);
          }
          if (isFromCrt) dataAll = data;
          resolve([output, finalPrice, dataAll]);
        });
      });
    }

    // Build output for lithophanes
    function buildLitOutput(sphere, color, size, quantity, file) {
      return new Promise((resolve, reject) => {
        let output = '';
        let params = {
        'sphere': sphere,
        'color': color,
        'size': size,
        'quantity': quantity,
        'file': file
        };
        
        validateLitParams(conn, params).then(res => {
          if (!res) {
            reject('Invalid parameter value');
            return;
          }

          let prodURL = '';
          let imgURL = 'printUploads/lithophanes/' + file;
          let price = calcLitPrice(size);
          let name = 'Lithophane'

          let data = {
            'orderID': orderID,
            'prodURL': 'uploadPrint?image=' + file.replace(/.png|.jpg|.jpeg/, ''),
            'imgURL': imgURL,
            'price': price,
            'name': name,
            'color': color,
            'size': size,
            'sphere': sphere,
            'file': file,
            'quantity': quantity,
            'prodType': 'lit',
            'tech': 'FDM',
            'fixProduct': false
          };

          let finalPrice = price * quantity;
          output += genItem(false, false, false, data, true);

          resolve([output, finalPrice, data]);
        });
      }).catch(err => {
        console.log(err);
        reject('An unexpected error occurred, please try again');
        return;
      });
    }

    function buildZprodOutput(price, quantity) {
      return new Promise((resolve, reject) => {
        let data = {
          prodURL: '#',
          imgURL: 'images/defaultStl.png',
          name: '3D printed products',
          price,
          quantity: 1,
          prodType: 'zprod',
          orderID,
          color: '-',
          quantity: 1,
          rvas: 0.20,
          suruseg: 20,
          scale: 1,
          color: '-',
          fvas: 1.2,
          tech: 'FDM',
          printMat: 'PLA',
          fixProduct: false
        };

        let output = genItem(false, false, false, data, false, false, false, true);
        resolve([output, price, data]);
      });
    }

    // Build the delivery info section
    function buildLastSection(userID, finalPrice, discountText) {
      return new Promise((resolve, reject) => {
        // Delivery method removed; proceed directly to shipping/billing info
        let output = `
          </div>
          <p class="blueHead" style="font-size: 24px;">2. Shipping & Billing Information</p>
        `;

        // No shipping method or extra charge
        let charge = 0;

        genDelivery(conn, userID, !!userID).then(result => {
          output += result;

          // Provide 'different billing address' form
          output += `
            <div class="align" style="margin: 10px 0 20px 0;" id="normalBac">
          <label class="chCont">Buy as a company
                <input type="checkbox" id="compNormal"
                  onchange="companyBilling('normalCompname', 'normalCompnum', 'normal',
                    'normalDiv')">
                <span class="cbMark"></span>
              </label>
            </div>
 
            <button class="btnCommon fillBtn pad centr" id="diffBilling">
            Different billing address
            </button>
            <div id="billingHolder">
              <div id="billingForm" class="flexDiv"
                style="margin-top: 10px; flex-wrap: wrap; justify-content: space-evenly;"
                data-status="close">
              </div>
            </div>

            <textarea placeholder="Order note (optional)" id="comment" class="dFormField"></textarea>
            
            <p class="align" style="color: #676767">
              To track your order status, please <a href="/register" class="blueLink font16">create an account</a>.
              Otherwise, we will notify you via email about your package.
            </p>

            <!-- Payment method removed -->
          `;

          output += `
              <p class="align">
                <label class="chCont note ddgray"
                  style="font-family: 'Roboto', sans-serif; font-size: 14px;">
                  I have read and accept the
                  <a href="/aszf" class="blueLink font14">General Terms and Conditions</a>
                  <input type="checkbox" id="agree">
                  <span class="cbMark"></span>
                </label>
              </p>
              <p class="align">
                <label class="chCont note ddgray"
                  style="font-family: 'Roboto', sans-serif; font-size: 14px;">
                  I have read and accept the
                  <a href="/nyilatkozat" class="blueLink font14">Privacy Policy</a>
                  <input type="checkbox" id="agree2">
                  <span class="cbMark"></span>
                </label>
              </p>
              <p class="align">
                <label class="chCont note ddgray"
                  style="font-family: 'Roboto', sans-serif; font-size: 14px;">
                  I request an electronic invoice
                  <input type="checkbox" id="einvoice" checked>
                  <span class="cbMark"></span>
                </label>
              </p>
              <p class="align bold" id="finalPrice">
                <span style="color: #4285f4;">
                  Total:
                </span>
                <span id="fPrice">${Math.round(finalPrice + charge)}</span>
                JD ${discountText}
              </p>
              <div id="submitBtnCont">
                <button class="fillBtn btnCommon centerBtn" style="margin-top: 20px;"
                  onclick="submitOrder()" id="submitBtn">
                  Place order
                </button>
              </div>
            </span>
            <div class="errorBox" id="errStatus"></div>
            <div class="successBox" id="succStatus"></div>
          `;
          resolve(output);
        }).catch(err => {
          console.log(err);
          reject('An unexpected error occurred, please try again');
          return;
        });
      });
    }

    // User buys a single product from items page or orders a custom print / lithophane
    getMaterials(conn).then(mults => {
      const PRINT_MULTS = mults;
      if (Number.isInteger(Number(paramObj.product)) ||
        ['cp', 'lit'].indexOf(paramObj.product) > -1) {
        let product = Number.isInteger(paramObj.product) ? Number(paramObj.product) :
          paramObj.product;
        if (product != 'lit') {
          var tech = paramObj.tech;
          var rvas = Number(paramObj.rvas);
          var suruseg = tech != 'SLA' ? Number(paramObj.suruseg) : paramObj.suruseg;
          var color = paramObj.color;
          var scale = Number(paramObj.scale);
          var fvas = Number(paramObj.fvas);
          var quantity = Number(paramObj.q);
          var printMat = paramObj.printMat;
          var printSize = paramObj.size.split(',').map(x => Number(x));
          var paramArr = [
            rvas, suruseg, color, scale, fvas, quantity, printMat, printSize, tech
          ];
        } else {
          var sphere = paramObj.sphere;
          var color = paramObj.color;
          var size = paramObj.size;
          var quantity = paramObj.q;
          var file = paramObj.file;
          var paramArr = [sphere, color, size, quantity, file];
        }

        if (product === 'cp') {
          // Build product output
          buildCPOutput(PRINT_MULTS, ...paramArr).then(data => {
            output += data[0];
            let finalPrice = data[1];
            let discount, discountText, shippingPrice;
            [discount, discountText, shippingPrice] = calcPrices(finalPrice);

            // Check if customer gets a discount 
            if (finalPrice > FREE_SHIPPING_LIMIT) {
              finalPrice *= DISCOUNT;
            } 

            buildLastSection(userID, finalPrice, discountText).then(lastOutput => {
              output += lastOutput;

              output += `
                </section>
                <script type="text/javascript">
                  let data = ${JSON.stringify(data[2])};
                  data[0].finalPrice = Math.round(${finalPrice});
                  data[0].shippingPrice = 0;
                  let isFromCart = true;
                  let isFromCP = true;
                  let isLoggedIn = ${userID ? true : false};
                </script>
              `;
              resolve(output);
            }).catch(err => {
              console.log(err);
              reject('An unexpected error occurred, please try again');
              return;
            });
          }).catch(err => {
            console.log(err);
            reject('An unexpected error occurred, please try again');
            return;
          });
          return;
        }
       
        if (product != 'lit') {
          paramArr = [product, rvas, suruseg, color, scale, fvas, quantity];
          buildItemOutput(PRINT_MULTS, false, userID, orderID, ...paramArr).then(data => {
            output += data[0]; 
            buildLastSection(userID, data[2], data[3], data[4]).then(lastOutput => {
              output += lastOutput;
              let finalPrice = data[2];

              output += `
                </section>
                <script type="text/javascript">
                  let data = [${JSON.stringify(data[1])}];
                  data[0].finalPrice = Math.round(${finalPrice});
                  data[0].shippingPrice = 0;
                  let isFromCart = false;
                  let isFromCP = false;
                  let isLoggedIn = ${userID ? true : false};
                </script>
              `;
              resolve(output);
            }).catch(err => {
              console.log(err);
              reject('An unexpected error occurred, please try again');
              return;
            });
          }).catch(err => {
            console.log(err);
            reject('An unexpected error occurred, please try again');
            return;
          });
        } else {
          buildLitOutput(...paramArr).then(data => {
            output += data[0];
            let finalPrice = data[1];

            let discount, discountText, shippingPrice;
            [discount, discountText, shippingPrice] = calcPrices(finalPrice);

            // Check if customer gets a discount 
            if (finalPrice > FREE_SHIPPING_LIMIT) {
              finalPrice *= DISCOUNT;
            } 

            buildLastSection(userID, finalPrice, discountText).then(lastOutput => {
              output += lastOutput;
              output += `
                <script type="text/javascript">
                  let data = [${JSON.stringify(data[2])}];
                  data[0].finalPrice = Math.round(${finalPrice});
                  data[0].shippingPrice = 0;
                  let isFromCart = false;
                  let isFromCP = false;
                  let isLit = true;
                  let isLoggedIn = ${userID ? true : false};
                </script>
              `;
              output += '</section>';
              resolve(output);
            }).catch(err => {
              reject('An unexpected error occurred, please try again');
              return;
            });
          }).catch(err => {
            reject('An unexpected error occurred, please try again');
            return;
          });        
        }

      // Second case is when user buys the whole cart and data is fetched from cookies
      } else {
        // Make sure cookie is not empty
        let cItems = parseCookies(req).cartItems;
        let isZprod = paramObj.product == 'zprod';

        if (!cItems || isZprod) {
          cItems = '{}';
        }

        if (!Object.keys(JSON.parse(cItems)).length && !isZprod) {
          reject('Your cart is empty');
          return;
        }

        // Get data from cookies and validate on server side
        let cartItems = JSON.parse(cItems);

        // Iterate over all items & build a promise array
        let promises = [];
        let isfcp = false;
        for (let key of Object.keys(cartItems).filter(el => el[0] != 'i')) {
          let currentItem = cartItems[key];
          var id = key.replace('content_', '');
          let itemID = Number(id.split('_')[1]);

          if (currentItem['sphere_' + id]) {
            var isLit = true;
            var sphere = currentItem['sphere_' + id];
            var size = currentItem['size_' + id];
            var file = currentItem['file_' + id];
          } else {
            var isLit = false;
            var tech = currentItem['tech_' + id];
            var rvas = Number(currentItem['rvas_' + id]);
            var suruseg = tech != 'SLA' ? Number(currentItem['suruseg_' + id]) : currentItem['suruseg_' + id];
            var scale = Number(currentItem['scale_' + id]);
            var fvas = Number(currentItem['fvas_' + id]);
            var printMat = currentItem['printMat_' + id];
            var printSize = currentItem['printMat_' + id].split(',').map(x => Number(x));
          }

          let color = decodeURIComponent(currentItem['color_' + id]);
          let quantity = Number(currentItem['quantity_' + id]);

          // Check if current item in cart is a custom printed or a fixed product or a lithophane
          let paramArr = [itemID, rvas, suruseg, color, scale, fvas, quantity];
          if (id.split('_').length > 2 && !isLit) {
            isfcp = true;
            let paramArr = [rvas, suruseg, color, scale, fvas, quantity, printMat, printSize,
              tech];
            var itemQuery = buildCPOutput(PRINT_MULTS, ...paramArr, true, id);
          } else if (isLit) {
            let paramArr = [sphere, color, size, quantity, file];
            var itemQuery = buildLitOutput(...paramArr);
          } else {
            let paramArr = [itemID, rvas, suruseg, color, scale, fvas, quantity];
            var itemQuery = buildItemOutput(PRINT_MULTS, true, userID, orderID, ...paramArr);
          }
          promises.push(itemQuery);
        }

        if (isZprod) promises = [buildZprodOutput(paramObj.price)];

        // Implement a gate and wait for all promises to finish
        Promise.all(promises).then(values => {
          let finalPrice = 0;
          let pData = [];
          for (let v of values) {
            output += v[0];
            if (typeof v[2] === 'object') {
              finalPrice += v[1];
              pData.push(v[2]);
            } else {
              finalPrice += v[2];
              pData.push(v[1]);
            }
          }

          // Get shipping price & build delivery section
          let discount, dText, shipPrice;
          
          let actualShippingPrice = (finalPrice > FREE_SHIPPING_LIMIT) ? 0 : DEFAULT_SHIPPING_PRICE;

          [discount, dText, shipPrice] = calcPrices(finalPrice);

          if (finalPrice > FREE_SHIPPING_LIMIT) {
            finalPrice *= DISCOUNT;
          }

          buildLastSection(userID, finalPrice, dText).then(lastOutput => {
            output += lastOutput;

            output += `
              </section>
              <script type="text/javascript">
                let data = ${JSON.stringify(pData)};
                console.log(data)
                data[0].finalPrice = Math.round(${finalPrice});
                data[0].shippingPrice = 0;
                let isFromCart = true;
                let isFromCP = false;
                let isLoggedIn = ${userID ? true : false};
              </script>
            `;
            resolve(output);
          }).catch(err => {
            console.log(err);
            reject('An unexpected error occurred, please try again');
            return;
          });
        }).catch(err => {
          console.log(err);
          reject('An unexpected error occurred, please try again');
          return;
        });
      }
    });
  });
}

module.exports = buildBuySection;
