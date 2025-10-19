// Generate an html box for an item
function genItem(isOrderTime = false, isStat = false, isPaymentOption = false, data,
  isLit = false, isUID = false, isCP = false, isZprod = false) {
  let printTech = data.tech;
  let output = `
    <div class="cartItemHolder">
      <div class="itemLeftCenter">
        <a href="/${data.prodURL}">
          <div class="cartImgHolder bgCommon" style="background-image: url(/${data.imgURL})">
          </div>
        </a>
        <div style="padding: 10px;" class="hideText">
          <p>
            <a href="/${data.prodURL}" class="linkTitle">${data.name}</a>
          </p>
        </div>
      </div>

      <div class="flexDiv prodInfo ordersSoFar">
      `;
  
  if (isZprod) {
    output += `
      <div>
        <p style="text-align: center;">
          Infill, layer height, wall thickness and other parameters will be set optimally to
          achieve the best results.
        </p>
      </div>
    `;
  } else {
    output += `
      <div>
        <p>Unit price: ${data.price} JD</p>
      </div>
    `;

    if (!isLit) {
      let postfix = '%';
      if (printTech == 'SLA') postfix = '';
      output += `
        <div>
          <p>Layer height: ${data.rvas}mm</p>
        </div>
        <div>
          <p>Infill: ${data.suruseg}${postfix}</p>
        </div>
      `;
    }

    output += `
      <div>
        <p>Color: ${decodeURIComponent(data.color)}</p>
      </div>
    `;

    if (isCP) {
      output += `
        <div>
          <p>Material: ${data.printMat}</p>
        </div>
      `;
    }

    if (isCP) {
      output += `
        <div>
          <p>Technology: ${data.tech}</p>
        </div>
      `;
    }

    if (!isLit) {
      output += `
        <div>
          <p>Scale: x${data.scale}</p>
        </div>
      `;

      if (printTech != 'SLA') {
        output += `
          <div>
            <p>Wall thickness: ${data.fvas}mm</p>
          </div>
        `;
      }
    } else {
      output += `
        <div>
          <p>Shape: ${data.sphere}</p>
        </div>
        <div>
          <p>Size: ${data.size.split('x').map(v => Number(v).toFixed(2)).join('x')
            .replace(/x/g, 'mm x ') + 'mm'}</p>
        </div>
      `; 
    }

    output += `
      <div>
        <p>Quantity: ${data.quantity}</p>
      </div>
    `;

    if (isStat) {
      let className = data.stat ? 'delivered' : 'inProgress';
      let text = data.stat ? 'printed' : 'in progress';
      output += `
        <div>
          <p>Status: <span class="${className}">${text}</span></p>
        </div>
      `;
    }

    if (data.finalPO) {
      output += `
        <div>
          <p>Payment method: ${data.finalPO}</p>
        </div>
      `;
    }

    if (isOrderTime) {
      output += `
        <div>
          <p>Rendelési idő: ${data.orderTime}</p>
        </div>
      `;
    }

    if (isUID) {
      output += `
        <div>
          <p>Azonosító: <span class="blue">${data.uid}</span></p>
        </div>
      `;
    }
  }

  output += `
        <div>
          <p class="bold">Total: ${data.quantity * data.price} JD</p>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  `;

  return output;
}

module.exports = genItem;
