const validateEmail = require('email-validator');
const randomstring = require('randomstring');
const NodeStl = require('node-stl');
const userExists = require('./includes/userExists.js');
const itemExists = require('./includes/itemExists.js');
const calcPrice = require('./includes/calcPrice.js');
const makeInline = require('./includes/makeInline.js');
const validateParams = require('./includes/validateParams.js');
const validateLitParams = require('./includes/validateLitParams.js');
const constants = require('./includes/constants.js');
const parseCookies = require('./includes/parseCookies.js');
const parseTime = require('./includes/parseTime.js');
const sendEmail = require('./includes/sendEmail.js');
const userLogin = require('./loginLogic.js');
const userRegister = require('./registerLogic.js');
const formatOrderId = require('./includes/formatOrderId.js');
const sendOwnerEmails = require('./includes/sendOwnerEmails.js');
const handlePaylike = require('./includes/handlePaylike.js');
const shouldAllowSLA = require('./includes/allowSLA.js');
const calcSLAPrice = require('./includes/calcSLAPrice.js');
const calcLitPrice = require('./includes/calcLitPrice.js');
const validatePrices = require('./includes/validatePrices.js');
const getFPVolume = require('./includes/getFPVolume.js');
const getPackageDimensions = require('./includes/getPackageDimensions.js');
const getMaterials = require('./includes/getMaterials.js');
const shipping = require('./includes/shippingConstants.js');
const path = require('path');
const ExcelJS = require('exceljs');
const sliceModel = require('./includes/slice.js');
const generateInvoice = require('./includes/generateInvoice.js');

const COUNTRIES = constants.countries;
const FREE_SHIPPING_LIMIT = shipping.freeShippingLimit;
const MONEY_HANDLE = shipping.moneyHandle;
const getIDs = shipping.getIDs;
const SHIPPING_OBJ = shipping.shippingObj;
const DELIVERY_TO_MONEY_R = shipping.deliveryToMoneyR;
const DELIVERY_TYPES = getIDs(SHIPPING_OBJ, 'radioID');
const PACKET_POINT_TYPES_R = shipping.packetPointTypesR;
const DISCOUNT = constants.discount;

const BA_NUM = constants.baNum;
const BA_NAME = constants.baName;

// Validate order on server side & push to db
const buyItem = (conn, dDataArr, req, res, userSession) => {
  return new Promise((resolve, reject) => {
    console.log(dDataArr);
    // Extract data from form data obj
    let UID = req.user.id ? req.user.id : null;
    let name = dDataArr[0].name;
    let city = dDataArr[0].city;
    let address = dDataArr[0].address;
    let mobile = dDataArr[0].mobile;
    // ZIP/Postal code optional in checkout; default to 0
    let pcode = Number(dDataArr[0].pcode || 0);
    let payment = dDataArr[0].payment;
    let transactionID = dDataArr[0].transactionID;
    let promises = [];
    let localFinalPrice = 0;
    let finalPrice = dDataArr[0].finalPrice;
    let shippingPrice = dDataArr[0].shippingPrice;
    let isLoggedIn = dDataArr[0].isLoggedIn;
    let isLit = dDataArr[0].isLit;
    let emailTotPrice = dDataArr[0].emailTotPrice;
    let emailOutput = dDataArr[0].emailOutput;
    let nlEmail = dDataArr[0].nlEmail;
    let comment = dDataArr[0].comment;
    let itemVolumes = [];
    let itemSizes = [];
    let fixProdPromises = [];
    let stlToSlice = [];

    // Replace classes & ids with inline CSS for emails
    emailOutput = makeInline(emailOutput);

    let uniqueID = Math.round(Math.random() * Math.pow(10, 12));

    // Fields about packet points
    let deliveryType = dDataArr[0].delivery;
    let packetID = dDataArr[0].ppID;
    let packetName = dDataArr[0].ppName;
    let packetZipcode = dDataArr[0].ppZipcode;
    let packetCity = dDataArr[0].ppCity;
    let packetAddress = dDataArr[0].ppAddress;
    let packetContact = dDataArr[0].ppContact;
    let packetPhone = dDataArr[0].ppPhone;
    let packetEmail = dDataArr[0].ppEmail;
    let packetLat = dDataArr[0].ppLat;
    let packetLon = dDataArr[0].ppLon;
    let isPP = PACKET_POINT_TYPES_R.indexOf(deliveryType) > -1;

    // Because of async queries a track variable is needed for packet point checking in db
    let ppUpdated = false;

    // Allow flows without an explicit delivery type (no shipping/payment UI)
    const SHIPPING_PRICE = DELIVERY_TO_MONEY_R[deliveryType] || 0;

    // Validate billing info & credentials
    let billingType = dDataArr[0].billingType;
    let billingName = dDataArr[0].billingName;
    let billingCountry = dDataArr[0].billingCountry;
    let billingPcode = dDataArr[0].billingPcode ? Number(dDataArr[0].billingPcode) : 0;
    let billingCity = dDataArr[0].billingCity;
    let billingAddress = dDataArr[0].billingAddress;
    let billingCompname = dDataArr[0].billingCompname;
    let billingCompnum = dDataArr[0].billingCompnum;

    // Buy as a company but not with a different invoice address
    let normalCompname = dDataArr[0].normalCompname;
    let normalCompnum = dDataArr[0].normalCompnum;

    let eInvoice = dDataArr[0].eInvoice;

    // Make sure both fields are set and valid
    if ((!normalCompname && normalCompnum) || (normalCompname && !normalCompnum)) {
      reject('Please provide both company name and tax number');
      return;
    }

    let billingEmail = 'Same as shipping address';
    if (billingType !== 'same') {
      billingEmail = `
        <div><b>Name: </b>${billingName}</div>
        <div><b>Ország: </b>${billingCountry}</div>
        <div><b>Address: </b>${billingPcode} ${billingCity}, ${billingAddress}</div>
      `;    

      if (billingCompname) {
        billingEmail += `
          <div><b>Cégnév: </b>${billingCompname}</div>
          <div><b>Adószám: </b>${billingCompnum}</div>
        `;
      }
    }

    let compInfo = '';
    if (normalCompname) {
      compInfo = `
        <div><b>Cégnév: </b>${normalCompname}</div>
        <div><b>Adószám: </b>${normalCompnum}</div>
      `;
    }

    if (billingType != 'same') {      
      if (!billingName || !billingCountry || !billingPcode || !billingCity || !billingAddress) {
        reject('Please fill out all billing details');
        return;
      } else if (COUNTRIES.indexOf(billingCountry) < 0) {
        // Make sure the country is in the list of supported countries
        reject('Please select a valid country');
        return;
      }
      
      if (billingType == 'diffYes') {
        if (!billingCompname || !billingCompnum) {
          reject('Please fill out all company billing details');
          return;
        }
      }
    }

    /*
      Common date for all items in order to indicate that all those items belongs to the same
      order
    */

    function runPurchase(PRINT_MULTS) {
      movePurchase(PRINT_MULTS).then(data => {
        resolve('success');
      }).catch(err => {
        reject(err);
        return;
      });
    }
    
    getMaterials(conn).then(mults => {
      const PRINT_MULTS = mults;
      runPurchase(PRINT_MULTS);
    });

    function movePurchase(PRINT_MULTS) {
      return new Promise((resolve, reject) => {
        let commonDate = new Date().toMysqlFormat();
        
        // Validate prices
        for (let d of dDataArr) {
          if (!validatePrices(PRINT_MULTS, d)) {
            return reject('Invalid price');
          }
          let p = d.price;
          localFinalPrice += p * d.quantity;
        }

        let discount = DISCOUNT;
        if (localFinalPrice < FREE_SHIPPING_LIMIT) discount = 1;

        // Make sure the final price is valid
        if (Math.round(finalPrice) != Math.round(localFinalPrice * discount)) {
          reject('Invalid total amount');
          return;
        }

        let priceWithoutDiscount = localFinalPrice; 

        if (!name || !city || !address || !mobile || !payment) {
          reject('Missing shipping information'); 
          return;
        } else if (payment == 'credit' && !transactionID) {
          reject('Please add your bank card to proceed with payment'); 
        // Skip strict postal code validation on server
        // Validate shipping only when a delivery type is provided
        } else if (deliveryType) {
          if ((priceWithoutDiscount <= FREE_SHIPPING_LIMIT && shippingPrice != SHIPPING_PRICE)
            || (priceWithoutDiscount > FREE_SHIPPING_LIMIT && shippingPrice != 0)) {
            console.log(shippingPrice, SHIPPING_PRICE);
            reject('Invalid shipping price');
            return;
          } else if (DELIVERY_TYPES.indexOf(deliveryType) < 0) {
            reject('Please select a shipping method');
            return;
          } else if (isPP
            && (!packetID || !packetName || !packetZipcode || !packetCity || !packetAddress)) {
            reject('Missing pickup point details');
            return; 
          }
        }

        console.log('huuuu');
        
        let cnt = 0;
        for (let formData of dDataArr) {
          let itemID = formData.itemID;
          let price = formData.price;
          let rvas = formData.rvas ? formData.rvas : 0.2;
          let suruseg = formData.suruseg ? formData.suruseg : 20;
          let scale = formData.scale ? formData.scale : 1;
          let fvas = formData.fvas ? formData.fvas : 1.2;
          let color = formData.color;
          let printMat = formData.printMat ? formData.printMat : null;
          let quantity = formData.quantity;
          var orderID = formData.orderID;
          let fixProduct = Number(Boolean(formData.fixProduct));
          let printSize = formData.printSize ? formData.printSize : null;
          let printTech = formData.tech;
          let prodType = formData.prodType;
          let isProdLit = prodType == 'lit';

          // Order id formatting is currently not used: See js/buyLogic.js why
          // formatOrderId(orderID)
          var orderIDDisplay = orderID;

          // Lithophane parameters
          let sphere = formData.sphere ? formData.sphere : '';
          let size = formData.size ? formData.size : '';
          let file = formData.file ? formData.file : '';
          
          if (prodType == 'lit') {
            let sizeArr = size.split('x').map(x => Number(x));
            itemVolumes.push(sizeArr.reduce((x, y) => x * y) * quantity);
            itemSizes.push(sizeArr); 
          } else if (prodType == 'cp') {
            let pathCP = path.join(__dirname.replace(path.join('src', 'js'), ''),
              'printUploads', itemID + '.stl');
            let stlObj = {
              'filename': pathCP,
              'layerHeight': rvas,
              'infill': suruseg,
              'scale': scale,
              'wallWidth': fvas,
              'material': printMat,
              'fname': itemID
            };
            if (printTech != 'SLA' && printMat.toLowerCase() == 'pla') {
              stlToSlice.push(stlObj);
            }
            let stl = new NodeStl(pathCP, {density: 1.27}); // PLA has 1.27 g/mm^3 density
            itemVolumes.push(stl.boundingBox.reduce((x, y) => x * y) * scale * quantity);
            itemSizes.push(stl.boundingBox); 
          } else if (prodType == 'fp') {
            fixProdPromises.push(new Promise((resolve, reject) => {
              getFPVolume(conn, itemID).then(v => {
                resolve([v[0] * scale * quantity, v[1]]);
              }).catch(err => {
                console.log(err);
                reject('Error while fetching fixed product volume', err);
                return;
              });
            }));
          }

          // Check the validity of parameters
          console.log(formData)
          let normalValidate = !isProdLit ? validateParams(conn, formData) : null;
          let litValidate = isProdLit ? validateLitParams(conn, formData) : null;
          Promise.all([normalValidate, litValidate]).then(vals => {
            let [validNormal, validLit] = vals;
            if (!isProdLit && !validNormal && prodType != 'zprod') {
              reject('Invalid parameters');
              return;
            }

            if (payment != 'uvet' && payment != 'transfer' && payment != 'credit') {
              reject('Invalid payment method');
              return;
            // Check validity of order ID
            } else if (orderID.length !== 4) {
              reject('Invalid transfer reference');
              return;
            // Make sure SLA printing can be only applied to smaller models
            } else if (!fixProduct && printTech == 'SLA' &&
              !shouldAllowSLA(path.join(__dirname.replace(path.join('src', 'js'), ''),
              'printUploads', formData.itemID + '.stl'))) {
              reject('For SLA printing the maximum size is 115mm x 65mm x 150mm');
              return;
            // Validate lithophane parameters
            } else if (isProdLit) {
              let paramObj = {
                'sphere': sphere,
                'color': color,
                'quantity': quantity,
                'size': size,
                'file': file
              };

              if (!validLit) {
                reject('Invalid parameter value');
                return;
              }
            }

            // Make sure item exists with the given ID  
            let process = new Promise((resolve, reject) => {
              // When ordering a custom print we do not check the existance of item in db
              let handler = itemExists(conn, itemID, true);
              if (fixProduct) {
                handler = itemExists(conn, itemID);
              }

              handler.then(data => {
                if (data != 'success') {
                  let originalPrice = data[0].price;
                  if (calcPrice(PRINT_MULTS, originalPrice, rvas, suruseg, scale, fvas) != price) {
                    // Check if price is correct with the given parameters
                    reject('Invalid price'); 
                    return;
                  }
                }

                // Request is valid, push data to db
                let isTrans = payment == 'transfer' ? 1 : 0;
                let transID = isTrans ? orderID : '';

                // If cash on delivery add extra price
                if (payment == 'uvet') {
                  shippingPrice += MONEY_HANDLE;
                }

                let iQuery = `
                  INSERT INTO orders (uid, item_id, price, rvas, suruseg, scale, color, printMat,
                    printTech, fvas,
                    lit_sphere, lit_size, lit_fname,
                    quantity, is_transfer, transfer_id, transaction_id, is_fix_prod, status, shipping_price,
                    cp_fname, is_cash_on_del, packet_id, unique_id, same_billing_addr, 
                    normal_compname, normal_compnum,
                    billing_name, billing_country, billing_city,
                    billing_pcode, billing_address, billing_compname, billing_comp_tax_num,
                    comment, del_type, e_invoice, order_time)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;

                // Decide if product is a custom print (attach filename) or fixed product
                if (!fixProduct) {
                  itemID = 0;
                  var cpFname = formData.itemID;
                } else {
                  var cpFname = '';
                }
              
                price *= discount;
                let sameBillingAddr = billingType == 'same' ? 1 : 0;
                let isCashOnDel = payment == 'uvet';
                let packetDbID = isPP ? packetID : '';

                let valueArr = [
                  UID, itemID, price, String(rvas), String(suruseg),
                  String(scale), color, printMat, printTech, String(fvas), sphere, size, file, quantity, isTrans, 
                  transID, transactionID, fixProduct, 0,
                  Number(shippingPrice), cpFname, isCashOnDel, packetDbID, uniqueID,
                  sameBillingAddr, normalCompname, normalCompnum, billingName, billingCountry,
                  billingCity, billingPcode, billingAddress, billingCompname, billingCompnum,
                  comment, deliveryType, eInvoice, commonDate
                ];
                
                if (payment == 'uvet') {
                  shippingPrice -= MONEY_HANDLE;
                }

                conn.query(iQuery, valueArr, (err, result, field) => {
                  if (err) {
                    console.log(err, 'asd');
                    reject('An unexpected error occurred, please try again');
                    return;
                  }

                  // If delivery type if packet point insert contact info to db
                  if (isPP) {
                    // First check if the packet point is already in the db
                    // If it is, just update the existing row
                    // Otherwise insert the packet point as a new row

                    let mQuery = `
                      SELECT id FROM packet_points WHERE packet_id = ? LIMIT 1
                    `;

                    conn.query(mQuery, [packetID], (err, result, fields) => {
                      if (err) {
                        reject('An unexpected error occurred, please try again');
                        return;
                      } 

                      // Check existance in db
                      if (result.length > 0) {
                        // Update data in db
                        let updateQuery = `
                          UPDATE packet_points SET name = ?, zipcode = ?,
                          city = ?, contact = ?, phone = ?, email = ?, lat = ?, lon = ?
                          WHERE packet_id = ?
                        `;

                        let updateParams = [
                          packetName, packetZipcode, packetCity, packetContact, packetPhone,
                          packetEmail, packetLat, packetLon, packetID
                        ];

                        conn.query(updateQuery, updateParams, (err, result, fields) => {
                          if (err) {
                            reject('An unexpected error occurred, please try again');
                            return;
                          }                    

                          resolve('success');
                        });

                      // Only insert to db for the 1st time (because of async)
                      } else if (!ppUpdated) {
                        let pQuery = `
                          INSERT INTO packet_points (
                            packet_id, name, zipcode, city, contact, phone, email, lat, lon
                          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                        `;

                        // Insert packet point data as a new row
                        let pValues = [
                          packetID, packetName, Number(packetZipcode), packetCity,
                          packetContact,
                          packetPhone, packetEmail, packetLat, packetLon
                        ];

                        ppUpdated = true;
                        conn.query(pQuery, pValues, function packetInsert(err, result, field) {
                          if (err) {
                            reject('An unexpected error occurred, please try again');
                            return;
                          }                    
                          
                          resolve('success');
                        });
                      } else {
                        // Packet point is being inserted asynchronously into the db
                        resolve('success');
                      }
                    });
                  } else {
                    resolve('success');
                  }
                });
              });
            }).catch(err => {
              console.log(err);
              reject('No such product');
            });

            promises.push(process);
          }).catch(err => {
            console.log(err);
            reject('No such product'); 
          });
        }

        Promise.all(promises).then(data => {
          // Also update delivery info in db if needed
          if (isLoggedIn) {
            var dQuery = `
              UPDATE delivery_data
              SET name = ?, postal_code = ?, city = ?, address = ?, mobile = ?, nl_email = NULL,
              order_id = NULL, date = NOW() WHERE uid = ?
            `;
            var deliveryArr = [name, pcode, city, address, mobile, UID];
          } else {
            var dQuery = `
              INSERT INTO delivery_data (uid, name, postal_code, city, address, mobile,
              nl_email, order_id, date)
              VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, NOW())
            `;
            var deliveryArr = [name, pcode, city, address, mobile, nlEmail, uniqueID];
          }

          conn.query(dQuery, deliveryArr, (err, result, field) => {
            if (err) {
              console.log(err);
              reject('An unexpected error occurred, please try again');
              return;
            }
           
            // Last step is to validate credit card
            let isEmpty = payment == 'credit' ? false : true
            handlePaylike(transactionID, finalPrice + SHIPPING_PRICE, isEmpty).then(data => {
              let eQuery = 'SELECT email FROM users WHERE id = ? LIMIT 1';
              conn.query(eQuery, [UID], (err, result, field) => {
                // On successful ordering, send customer a notification email
                // If query result is null then user is not in db -> get email from form field
                let email = result[0] ? result[0].email : nlEmail;
                let emailContent = `
                  <p style="font-size: 24px;">We have received your order!</p>
                  <p style="font-size: 16px;">
                    If you have a 3DJordanPrint account, you can track your order status there.
                    <br>We will also notify you by email when your package is handed over to the courier service.<br>
                    Thank you for choosing 3DJordanPrint!
                  </p>

                  <hr style="border: 0;
                    height: 0;
                    border-top: 1px solid rgba(0, 0, 0, 0.1);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
                  ">

                  <div style="text-align: center; line-height: 1.7; width: 50%; float: left;">
                    <p style="font-weight: bold; font-size: 16px;">
                      Personal \& Shipping Information
                    </p>
                    <div style="font-size: 14px;">
                      <div><b>Name: </b>${name}</div>
                      <div><b>Address: </b>${city}, ${address}</div>
                      <div><b>Phone number: </b>${mobile}</div>
                      <div>
                        <b>Payment method: </b>
                        ${payment == 'transfer' ? 'bank transfer' : (payment == 'credit' ? 'card payment' : 'cash on delivery')}
                        ${
                          payment == 'transfer' ? `<div>
                                                      <div><b>Bank account:</b> ${BA_NUM}</div>
                                                      <div>
                                                        <b>Beneficiary name:</b> ${BA_NAME}
                                                      </div>
                                                      <div>
                                                        <b>
                                                          Identifier to include in transfer note:
                                                        </b> ${orderIDDisplay}
                                                      </div>
                                                   </div>
                                                   `
                                                 : ''
                        }
                      </div>
                      <div>
                        <b>Delivery: </b> ${!isPP ? 'home delivery' : 'pickup point'}
                      </div>
                      ${compInfo}
                    </div>
                  </div>

                  <div style="text-align: center; width: 50%; float: left; line-height: 1.7;">
                    <p style="font-weight: bold; font-size: 16px;">Billing Information</p>
                    <div style="font-size: 14px;">
                      ${billingEmail}
                    </div>
                  </div>
                  <div style="clear: both;"></div>
                  <br>
                  <p style="font-size: 14px; text-align: center;">
                    You can track your order in your 3DJordanPrint account with the following identifier:
                    <span style="color: #4285f4;">${uniqueID}</span>
                  </p>

                  <div style="font-size: 14px;">
                    ${emailOutput}
                  </div>
                  <b style="font-size: 16px;">${emailTotPrice}</b>
                  <p style="color: #7d7d7d; font-size: 14px;">
                    Prices shown on the site include VAT!
                  </p>
                  <p style="color: #7d7d7d; font-size: 14px;">
                    
                  </p>
                `;

                let subject = 'We received your order! - ID: ' + uniqueID;
                
                // If customer selects the e-invoice option generate the invoice first
                // Then download it from the server and send it as an attachment
                // E-invoice is saved under /e-invoices/{order id}.pdf
                if (eInvoice) {
                  let formData = {
                    uniqueID: uniqueID,
                    shippingPrice: SHIPPING_PRICE,
                    isElectronic: true
                  };

                  generateInvoice(conn, formData).then(resp => {
                    console.log(resp);
                    let attachmentOptions = {
                      filename: `E-invoice - 3DJordanPrint (${uniqueID}).pdf`,
                      path: path.join(__dirname, '..', '..', 'e-invoices', uniqueID + '.pdf')
                    };
                    sendEmail('info@jordan3dprint.store', emailContent, email, subject, attachmentOptions);
                  }).catch(err => {
                    console.log(err);
                    reject('An unexpected error occurred, please try again');
                  }); 
                } else {
                  sendEmail('info@jordan3dprint.store', emailContent, email, subject);
                }

                // Send a notification email to us about every new order
                let sj = 'New order received! - ID: ' + uniqueID;
                let cnt = '<p style="font-size: 18px;">New order received!</p>';
                sendOwnerEmails(sj, cnt);

                // Also record user & order credentials in an excel spreadsheet
                if (dDataArr[0].prodType != 'zprod') {
                  Promise.all(fixProdPromises).then(v => {
                    for (let el of v) {
                      itemVolumes.push(el[0]);
                      itemSizes.push(el[1]);
                    }

                    const workbook = new ExcelJS.Workbook();
                    workbook.creator = '3DJordanPrint';
                    workbook.lastModifiedBy = 'Jordan3DPrint';
                    workbook.modified = new Date();
                    workbook.xlsx.readFile(path.resolve('./src/spreadsheets/shippingCredentials.xlsx')).then(w => {
                      let packageDimensions = getPackageDimensions(itemVolumes, itemSizes);
                      let amount;
                      if (payment == 'uvet' && priceWithoutDiscount > FREE_SHIPPING_LIMIT) {
                        amount = finalPrice + MONEY_HANDLE;
                      } else if (payment == 'uvet') {
                        amount = finalPrice + SHIPPING_PRICE + MONEY_HANDLE;
                      } else {
                        amount = 0;
                      }
                      let rowContent = [
                        name, normalCompname, pcode, city, address, mobile, email, 'Parts',
                        ...packageDimensions, 0.5, '', amount
                      ];
                      let worksheet = workbook.getWorksheet('Shipping');
                      worksheet.addRow(rowContent, 'i');
                      return workbook.xlsx.writeFile(path.resolve('./src/spreadsheets/shippingCredentials.xlsx'));
                    });
                  }).catch(err => {
                    console.log(err);
                    reject('An error occurred, please try again');
                    return;
                  });
                }

                // Lastly, try to generate the gcode of the ordered STL files
                // It's irrelevant whether the gcode generation succeeds or not
                // Since it may take minutes thus making the client-side wait for a long time
                // Most of the gcodes are manually checked anyways

                for (let stlObj of stlToSlice) {
                  let layerHeight = stlObj.layerHeight;
                  let infill = stlObj.infill;
                  let scale = stlObj.scale;
                  let wallWidth = stlObj.wallWidth;
                  let material = stlObj.material;
                  let fname = stlObj.fname;
                  sliceModel(layerHeight, infill, scale, wallWidth, material, fname);
                }

                console.log('last part')
                
                resolve('success');
              }); 
            }).catch(err => {
              console.log(err);
              reject(err);
            });
          });
        });
      }).catch(err => {
        console.log(err);
        reject(err);
      });
    }
  }).catch(err => {
    console.log(err);
    return false;
  });
}

module.exports = buyItem;
