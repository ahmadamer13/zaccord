const PACKETA_API_KEY = '5a2b7d86fd0b5ae5';
let packetaArr = null;

function isChecked(ids) {
  for (let id of ids) {
    if (_(id).checked) {
      return id;
    } 
  }
  return 0;
}

function getPPAttr(attr, type) {
  if (attr == 'id') {
    return type == 'gls' ? infoArr.pclshopid : packetaArr.id;
  } else if (attr == 'name') {
    return type == 'gls' ? infoArr.name : packetaArr.place;
  } else if (attr == 'zip') {
    return type == 'gls' ? infoArr.zipcode : packetaArr.zip;
  } else if (attr == 'city') {
    return type == 'gls' ? infoArr.city : packetaArr.city;
  } else if (attr == 'address') {
    return type == 'gls' ? infoArr.address : packetaArr.street;
  } else if (attr == 'contact') {
    return type == 'gls' ? infoArr.contact : '';
  } else if (attr == 'phone') {
    return type == 'gls' ? infoArr.phone : '';
  } else if (attr == 'email') {
    return type == 'gls' ? infoArr.email : '';
  } else if (attr == 'lat') {
    return type == 'gls' ? infoArr.geolat : packetaArr.gps.lat;
  } else if (attr == 'lon') {
    return type == 'gls' ? infoArr.geolon : packetaArr.gps.lon;
  }
}

// Countries for billing
let countries = ["Albánia", "Andorra", "Argentína", "Ausztrália", "Ausztria", "Azerbajdzsán",
    "Belgium", "Bosznia-Hercegovina", "Brazília", "Bulgária", "Kanada", "Chile", "Kína",
    "Horvátország", "Kuba", "Ciprus", "Cseh köztársaság", "Dánia", "Egyiptom", "Észtország",
    "Faroe-szigetek", "Finnország", "Franciaország", "Grúzia", "Németország", "Gibraltár",
    "Görögország", "Hong Kong", "Magyarország", "Izland", "India", "Indonézia", "Irán", "Irak",
    "Írország", "Izrael", "Olaszország", "Japán", "Kazahsztán", "Dél-Koreai Köztársaság",
    "Kuwait",
    "Lettország", "Liechtenstein", "Litvánia", "Luxemburg", "Makedónia", "Malajzia", "Málta",
    "Mexikó", "Monaco", "Marokkó", "Hollandia", "Új-Zéland", "Norvégia", "Paraguay",
    "Fülöp-szigetek", "Lengyelország", "Portugália", "Katar", "Románia", "Oroszország",
    "San Marino", "Szaud-Arábia", "Szlovákia", "Szlovénia", "Dél-afrikai Köztársaság",
    "Spanyolország", "Svédország", "Svájc", "Thaiföld", "Tunézia", "Törökország",
    "Türkmenisztán",
    "Ukrajna", "Egyesült Arab Emirátusok", "Egyesült Királyság", "Amerikai Egyesült Államok",
    "Uruguay", "Üzbégisztán", "Vatikáni városállam", "Venezuela", "Vietnám", "Szerbia",
    "Koszovó",
    "Montenegró"];
let transactionID = null;

function getBillingFields() {
  let billingName = _('billingName').value;
  let billingPcode = _('billingPcode').value;
  let billingCity = _('billingCity').value;
  let billingAddress = _('billingAddress').value;
  let billingCountry = _('billingCountry').value;
  let billingCompname, billingCompnum;
  billingCompname = billingCompnum = null;
  if (_('buyAsComp').checked) {
    billingCompname = _('billingCompname').value;
    billingCompnum = _('billingCompnum').value;
  }
  return [billingName, Number(billingPcode), billingCountry, billingCity, billingAddress,
    billingCompname, billingCompnum];
}

function resetSubmitBtn() {
  _('submitBtnCont').innerHTML = `
    <button class="fillBtn btnCommon centerBtn" style="margin-top: 20px;"
      onclick="submitOrder()" id="submitBtn">
      Place order
    </button>
  `;
}

// User submits order, process their request
function submitOrder() {
  _('submitBtnCont').innerHTML = `
    <img src="/images/icons/loader.gif" width="24" style="margin: 0 auto; display: block;"
      class="animate__animated animate__fadeIn">
  `;

  // Gather form values (payment/delivery options removed)
  let name = _('name').value;
  // ZIP/Postal code removed from checkout
  let pcode = 0;
  let city = _('city').value;
  let address = _('address').value;
  let mobile = _('mobile').value;
  let isCompNormal = _('compNormal').checked;
  let comment = _('comment').value;

  let buyAsComp = _('buyAsComp') ? _('buyAsComp').checked : null;
  if (_('billingName')) {
    var [billingName, billingPcode, billingCountry, billingCity, billingAddress,
      billingCompname, billingCompnum] = getBillingFields();
  }
  
  let isLoggedIn = _('nlEmail') ? false : true;
  let nlEmail = _('nlEmail') ? _('nlEmail').value : null;

  // Company data if customer buys product as a company
  if (isCompNormal) {
    var normalCompnum = _('normalCompnum').value;
    var normalCompname = _('normalCompname').value;
  }

  _('errStatus').innerHTML = '';
  _('succStatus').innerHTML = '';

  // Make sure payment option is selected & delivery data is filled in
  let billingType = 'same';
  let isAgree = _('agree').checked;
  let isAgree2 = _('agree2').checked;
  let eInvoice = _('einvoice').checked;
  // Payment and delivery method checks removed
  if (!name || !city || !address || !mobile) {
    statusFill('errStatus', 'Please fill in the delivery details');
    resetSubmitBtn();
    return;
  // Skip strict postal code validation on client; accept any value provided
  } else if (!isAgree || !isAgree2) {
    // Did not accept the terms & policy
    statusFill('errStatus', 'Please accept the Terms and the Privacy Policy');
    resetSubmitBtn();
    return;
  } else if (_('billingName') && (billingName || billingPcode.value || billingCity ||
    billingAddress || _('billingCompname') && (billingCompname || billingCompnum))) {
    let isComp = false;
    let isCompNormal = false;
    if (_('billingCompname') && (billingCompname || billingCompnum || buyAsComp)) {
      isComp = true;
    } else if (isCompNormal && (!normalCompnum || !normalCompname)) {
      statusFill('errStatus', 'Please provide all company details');
    resetSubmitBtn();
      return;
    } else if (normalCompnum && normalCompname && isCompNormal) {
      isCompNormal = true;
    }

    if (!validateComp(isComp)) return;
    else if (!isComp) billingType = 'diffNo';
    else billingType = 'diffYes';
  }
  

  // Handle delivery to address & delivery to packet point
  data[0].delivery = '';

  /*
   Add payment & delivery data + login/registration credentials to the 1st element of the
   array
 */
  data[0].payment = 'transfer';
  data[0].isLoggedIn = isLoggedIn;
  data[0].name = name;
  data[0].pcode = pcode;
  data[0].city = city;
  data[0].address = address;
  data[0].mobile = mobile;
  data[0].billingType = billingType;
  data[0].billingName = _('billingName') ? billingName : '';
  data[0].billingCountry = _('billingCountry') ? billingCountry : '';
  data[0].billingPcode = _('billingPcode') ? billingPcode : '';
  data[0].billingCity = _('billingCity') ? billingCity : '';
  data[0].billingAddress = _('billingAddress') ? billingAddress : '';
  data[0].billingCompname = _('billingCompname') ? billingCompname : '';
  data[0].billingCompnum = _('billingCompname') ? billingCompnum : '';
  data[0].emailOutput = _('emlHolder').innerHTML;
  data[0].emailTotPrice = _('finalPrice').innerHTML;
  data[0].nlEmail = nlEmail;
  data[0].transactionID = transactionID;

  data[0].normalCompname = normalCompname;
  data[0].normalCompnum = normalCompnum;
  data[0].comment = comment;

  data[0].eInvoice = eInvoice;

  if (typeof isLit !== 'undefined') {
    data[0].isLit = true;
  } else {
    data[0].isLit = false;
  }

  // Default payment method
  data[0].payment = 'transfer';
  console.log(data);

  // Send data to server for further validation
  fetch('/validateOrder', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
      if (data.success) {
        // On successful order remove items from the cookies (if order was not a single item)
        let price = Number(_('fPrice').innerHTML);
        recordConversion(undefined, price, 'I_w4CK-q6-ABEMDJxZMC');
        window.scrollTo(0, 0);
        if (isFromCart && !isFromCP) setCookie('cartItems', '', 365);

        // Remove custom printed product / lithophane from cart (cookies)
        let kvPairs = window.location.href.split('?')[1].split('&');
        if (kvPairs[0].split('=')[1] == 'lit') {
          var cpLitId = kvPairs[kvPairs.length - 2].split('=')[1]
        } else {
          var cpLitId = kvPairs[kvPairs.length - 1].split('=')[1]
        }

        cpLitId = cpLitId.replace(/\.(jpg|jpeg|png)/g, '');
        let cookieItems = JSON.parse(getCookie('cartItems') || '{}');
        delete cookieItems['content_' + cpLitId];
        setCookie('cartItems', JSON.stringify(cookieItems));

        _('main').classList = 'flexDiv';
        _('main').style.flexDirection = 'column';
        _('main').style.alignItems = 'center';
        _('main').innerHTML = `
          <img src="/images/icons/deliver.png" width="100">

          <p class="gotham font24" style="color: #4285f4;">Order placed successfully!</p>
          <p class="align dgray lh">
            Your items will be delivered within 10 business days from the order date.<br>
            Thank you for choosing Jordan3DPrint!
          </p>
          <button class="btnCommon fillBtn" style="margin: 20px auto;"
          onclick="window.location.href='/'">
            Back to home
          </button>
        `;
        updateCartNum();
        window.history.replaceState('home', 'Jordan3DPrint - 3D Printing', '/');
        // fbq('track', 'AddPaymentInfo');
        /*
        fbq('track', 'Purchase', {
          value: (data[0].finalPrice + data[0].shippingPrice), currency: 'HUF'
        });
        */
    } else {
      _('errStatus').innerHTML = '<p>An unexpected error occurred, please try again</p>';
      resetSubmitBtn();
    }
  }).catch(err => {
    console.log(err);
    _('errStatus').innerHTML = '<p>An unexpected error occurred, please try again</p>';
    resetSubmitBtn();
  });
}

// Validate parameters if user has a different billing address
function validateComp(isComp) {
  let [billingName, billingPcode, billingCountry, billingCity, billingAddress,
    billingCompname] = getBillingFields();
  if (!billingName || !billingCountry || !billingPcode || !billingCity || !billingAddress) {
    statusFill('errStatus', 'Please fill in all billing details'); 
    return false;
  } else if (!Number.isInteger(billingPcode)) {
    statusFill('errStatus', 'Please enter a valid ZIP/postal code'); 
    return false;
  }

  if (!isComp) {
    return true;
  } else {
    if (!billingCompname || !billingCompnum) {
      statusFill('errStatus', 'Please provide all company billing details'); 
      return false; 
    }
    return true;
  }
}

let compAdded = false;

// Toggle 'different billing address' form
_('diffBilling').addEventListener('click', function toggleForm(e) { 
  if (this.getAttribute('data-status') != 'close') {
    console.log('up')
    _('diffBilling').innerText = 'Same billing address';
    _('billingForm').style.display = 'flex';
    if (_('bac')) _('bac').style.display = 'block';
    _('diffBilling').classList = `
      btnCommon fillBtn pad centr animate__animated animate__fadeIn
    `;

    _('billingForm').innerHTML = `
      <input type="text" class="dFormField" id="billingName" placeholder="Name"> 
    `; 

    _('billingHolder').classList = `animate__animated animate__fadeIn`;

    let res = '<select id="billingCountry" class="dFormField" style="margin-top: 0;">';
    for (let i = 0; i < countries.length; i++) {
      let selected = '';
      if (countries[i] === 'Magyarország' || countries[i] === 'Hungary') selected = 'selected';
      res += `<option value="${countries[i]}" ${selected}>${countries[i]}</option>`;
    }

    res += '</section>';
    res += `
      <input type="text" class="dFormField" id="billingPcode" placeholder="ZIP/Postal code"> 
      <input type="text" class="dFormField" id="billingCity" placeholder="City"> 
      <input type="text" class="dFormField" id="billingAddress"
      placeholder="Address (house no., floor, door)"> 
    `;

    if (!compAdded) {
      _('billingHolder').innerHTML += `
        <div class="align" style="margin: 10px 0 20px 0;" id="bac">
          <label class="chCont">Buy as a company
            <input type="checkbox" id="buyAsComp"
              onchange="companyBilling('billingCompname', 'billingCompnum', 'billing',
                'billingForm')">
            <span class="cbMark"></span>
          </label>
        </div>
      `;
      compAdded = true;
    }

    _('billingForm').innerHTML += res;
    _('billingForm').classList = 'animate__animated animate__fadeIn';
    this.setAttribute('data-status', 'close');
  } else {
    _('diffBilling').innerText = 'Different billing address';
    _('billingHolder').classList = `animate__animated animate__fadeOut`;
    _('diffBilling').classList = `
      btnCommon fillBtn pad centr animate__animated animate__fadeIn
    `;
    _('billingForm').classList = 'animate__animated animate__fadeOut';
    _('billingForm').addEventListener('animationend', () => {
      if (_('billingForm').getAttribute('data-status') === 'close'
        && _('diffBilling').innerText[0] === 'E') {
        _('billingForm').style.display = 'none';
        if (_('bac')) {
          _('bac').style.display = 'none';
          _('buyAsComp').checked = false;
          toggleStates['billing'] = false;
        }
      }
    });
    this.setAttribute('data-status', 'open');
  }
});

_('diffBilling').addEventListener('animationend', () => {
  _('diffBilling').classList = `btnCommon fillBtn pad centr`;
});

// Remove an element from DOM
function removeElement(id) {
  var elem = document.getElementById(id);
  if (!elem) return;
  return elem.parentNode.removeChild(elem);
}

function createInput(id, ph) {
  let inp = document.createElement('input');
  inp.type = 'text';
  inp.className = 'dFormField';
  inp.id = id;
  inp.placeholder = ph;
  return inp; 
}

// Toggle display company billing info
let toggleStates = {
  'billing': false,
  'normals': false
};

function companyBilling(nameID, numID, id, container) {
  if (!toggleStates[id]) {
    let compName = createInput(nameID, 'Company name');
    let compNum = createInput(numID, 'Tax number');
    _(container).appendChild(compName); 
    _(container).appendChild(compNum); 
    toggleStates[id] = true;
  } else {
    removeElement(nameID); 
    removeElement(numID); 
    toggleStates[id] = false;
  }
}

let isUvetAdded = false;
// If payment option is not transfer then count an extra price
function handleUvet(e, isUvet) {
  // Avoid click propagation on label
  if (isUvet && !isUvetAdded) {
    _('fPrice').innerHTML = Number(_('fPrice').innerHTML) + MONEY_HANDLE;
    isUvetAdded = true;
  } else if (isUvetAdded && !isUvet) {
    _('fPrice').innerHTML = Number(_('fPrice').innerHTML) - MONEY_HANDLE;
    isUvetAdded = false;
  }
}

function calcWH() {
  const width  = window.innerWidth || document.documentElement.clientWidth || 
    document.body.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight || 
    document.body.clientHeight;
  return [width, height];
}

function updateHorizontalPos(cont) {
  let [width, height] = calcWH(); 
  let boxWidth = _(cont).offsetWidth;
  let boxHeight = _(cont).offsetHeight;

  _(cont).style.left = Math.round((width / 2) - (boxWidth / 2)) + 'px';
}

function resizeGlsBox() {
  let [width, height] = calcWH();
  let boxWidth = _('glsBigBox').offsetWidth;
  let boxHeight = _('glsBigBox').offsetHeight;
  updateHorizontalPos('glsBigBox');
  _('glsBigBox').style.height = '80vh';
  if (width <= 500) {
    _('glsBigBox').style.height = '85vh';
  }
}

window.addEventListener('resize', e => {
  if (_('glsBigBox').style.opacity === '1') {
    resizeGlsBox();
  }
});

_('packetaPoint').addEventListener('click', (e) => {
  Packeta.Widget.pick(PACKETA_API_KEY, packetaSelectPoint,
    {
      webUrl: 'jordan3dprint.store',
      country: 'hu', 
      language: 'hu'
    }, 
  null);
});

function packetaSelectPoint(point) {
  if (point && point.error !== null) {
    _('selectedPacketaPoint').style.display = 'block';
    _('selectedPacketaPoint').style.color = 'red';
    _('selectedPacketaPoint').innerHTML = 'Ez a csomagpont jelenleg nem elérhető';  
  } else if (point !== null) {
    _('selectedPacketaPoint').style.display = 'block';
    _('selectedPacketaPoint').innerHTML = point.place;
    _('selectedPacketaPoint').innerHTML += '<br>' + point.name;
    packetaArr = point;
  }
}

let isInit = false;
function showMap(e) {
  _('overlay').style.opacity = '1';
  _('overlay').style.height = document.body.scrollHeight + "px";
  _('glsBigBox').style.opacity = '1';
  _('exitBtn').setAttribute('onclick', 'exitCont("glsBigBox")');

  resizeGlsBox();
  
  _('exitBtn').style.display = 'block';
  document.body.style.overflow = 'hidden';
  if (!isInit) {
    glsMap.init('HU', 'glsBigBox', '1116,Budapest,HU', 1);
    _('searchinput').classList = 'glsSearchInput';
    _('searchinput').placeholder = 'Search pickup point...';

    var target = document.querySelector('#psitems-canvas')

    var observer = new MutationObserver(function(mutations) {
      // Attach an onclick event for every packet point div to get data from GLS
      let allDivs = document.querySelectorAll("#psitems-canvas > div");
      for (let i = 0; i < allDivs.length; i++) {
        if (allDivs[i].id) {
          allDivs[i].addEventListener('click', (e) => selectPacketPoint(e, allDivs[i]));
        }
      }
    });

    var config = { attributes: true, childList: true, characterData: true };

    observer.observe(target, config);
  }
  isInit = true;
}

let ajaxURL = '//online.gls-hungary.com/psmap/psmap_getdata.php?ctrcode=HU&action=getList&dropoff=true';
let allPackets;
$.ajax({
  url: ajaxURL,
  cache: false,
  dataType: 'json',
  type: 'GET',
  async: false, 
  success: function (data, success) {
    allPackets = data;
  }
});

let infoArr;
function selectPacketPoint(e, pel) {
  exitCont('glsBigBox'); 
  _('selectedPP').style.display = 'block';
  _('selectedPP').innerHTML = pel.innerHTML;

  for (let i = 0; i < allPackets.length; i++) {
    if (allPackets[i].pclshopid == pel.id) {
      infoArr = allPackets[i];
      break;
    }
  }
}

function glsPSMap_OnSelected_Handler(data) {
   console.log(data);
}

function exitCont(cont) {
  _(cont).style.opacity = '0';
  _(cont).style.left = '-2000px';
  _('overlay').style.opacity = '0';
  _('exitBtn').style.display = 'none';
  setTimeout(function removeOverlay() {
    _('overlay').style.height = '0';
    _(cont).style.height = '0';
  }, 500);
  document.body.style.overflow = 'auto';
}

// Payment and delivery method UI removed; no event listeners needed

// The following functions are used for selecting a packet point by GLS
var glsMap;
function initGLSPSMap() {
  glsMap = new GLSPSMap();
  google.maps.event.trigger(glsMap, 'resize');
}

$(document).ready(initGLSPSMap);

function glsPSMap_OnSelected_Handler(data) {
  $('#ajaxresult').html(data.pclshopid);
}

function testclick(obj) {
  glsMap.initAddress($('#testinput').val());
}

// Shipping price and label highlight logic removed
