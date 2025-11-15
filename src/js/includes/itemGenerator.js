// Produce general html output for a single item based on db results
function produceShowcaseOutput(result, isDefault, i, isUneven = false, isBest = false, priceOverride = null) {
  let id = result[i].id;
  let url = result[i].url;
  let productName = result[i].name;
  let price = result[i].price;
  if (priceOverride !== null && priceOverride !== undefined) {
    price = priceOverride;
  }
  let size = result[i].size.replace(/x/g, 'mm x ') + 'mm';
  let desc = result[i].description.split('.')[0];
  if (desc.search('<a') > -1) {
desc = result[i].description.split('Tulajdonságok')[0]
      .replace(/<a.*?>/, '').replace('</a>', '');
  }
  let imgUrl = result[i].img_url;
  if (!imgUrl || !imgUrl.trim()) {
    imgUrl = 'images/defaultStl.png';
  }
  if (isDefault) {
    var bgStyle = `style="background-color: rgb(53, 54, 58);" data-bg="/${imgUrl}"`;
  } else {
    var bgStyle = `style="background-image: url('/${imgUrl}')"`;
  }

  let tagID = id;
  if (isBest) {
    tagID = 'best_' + id;
  }

  let output = `
    <a href="/${url}" class="align">
      <div class="productItem bgCommon lazy" id="pi_${tagID}"
        ${bgStyle}
        onmouseenter="animateElement('priceTag_${tagID}', 'fadeIn', 'fadeOut', 0.3, true)"
        onmouseleave="animateElement('priceTag_${tagID}', 'fadeIn', 'fadeOut', 0.3, false)">

        <div class="priceShow animate__animated gothamNormal" id="priceTag_${tagID}">
          <p>${size}</p>
          <p class="oflow">${desc}</p>
        </div>
      </div>
      <span class="gotham">
        <p>${productName}</p>
        <p>${price} JD</p>
      </span>
    </a>
  `;

  return output;
}

module.exports = produceShowcaseOutput;
