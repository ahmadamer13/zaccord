const constants = require('./constants.js');
const MIN_PRICE = constants.minPrice;
const smoothPrice = constants.smoothPrice;

// Calculate the final price of a product, given its initial price + parameters
function calcPrice(PRINT_MULTS, price, rvasVal, surusegVal, scaleVal, fvasVal, filamentMaterial = false, colorVal = null) {
  // Convert degrees to radians
  rvasVal *= Math.PI / 180
  surusegVal *= Math.PI / 180
  fvasVal *= Math.PI / 180

  // Formula for calculating the price with the given params
  // Parameters values in the formula are degrees (converted to rads)
  let nPrice = (price * scaleVal *
    ((1 / (Math.sin(rvasVal) * 140 + 0.51130880187)) +
    (Math.sin(surusegVal) / 1.3 + 0.73690758206) +
    (Math.sin(fvasVal) * 8 + 0.83246064094) - 2));
  
  // For custom print: scale base price by selected infill and wall thickness relative to baseline
  if (filamentMaterial) {
    const baseInfill = 20.0; // baseline infill used in server mass calc
    const baseWall = 1.2;    // baseline wall thickness (mm)
    const infillFactor = Math.max(0.05, surusegVal * 180 / Math.PI / baseInfill);
    const wallFactor = Math.max(0.25, fvasVal * 180 / Math.PI / baseWall);
    const massFactor = 0.7 * infillFactor + 0.3 * wallFactor;
    const mult = PRINT_MULTS[filamentMaterial.toLowerCase()];
    // Color surcharge: Black/White (Hungarian or English) are standard; others +15%
    let colorMultiplier = 1.0;
    if (colorVal && !['Fehér', 'Fekete', 'White', 'Black'].includes(colorVal)) {
      colorMultiplier = 1.15;
    }
    let fp = smoothPrice(Math.round(price * scaleVal * massFactor * mult * colorMultiplier));
    return fp < MIN_PRICE ? MIN_PRICE : fp;
  }

  let fp = smoothPrice(Math.round(nPrice)); 
  return fp < MIN_PRICE ? MIN_PRICE : fp;
}

module.exports = calcPrice;
