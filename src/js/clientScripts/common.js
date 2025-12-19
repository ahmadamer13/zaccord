// Update quantity UI
function updateQtyUI() {
  _('minus').style.opacity = '1';
  _('minus').style.cursor = 'pointer';

  if (_('quantity').value == MAX_QUANTITY) {
    _('plus').style.opacity = '0.4';
    _('plus').style.cursor = 'not-allowed';
  } else if (_('quantity').value == MIN_QUANTITY) {
    _('minus').style.opacity = '0.4';
    _('minus').style.cursor = 'not-allowed';
  }
  //if (typeof fbq !== 'undefined') fbq('track', 'CustomizeProduct');
}

// Whatever value the user changes in connection with the model save them to cookies
function updateCookie(param, qty = null, cookieID = null) {
  let soFar = JSON.parse(getCookie('cartItems'));
  let cachedIDs = localStorage.getItem('refresh').split('|||');
  for (let i = 0; i < arr.length; i++) {
    let a = arr[i];
    let id = a.split('/')[2].replace('.stl', '').replace('.jpg', '').replace('.jpeg', '')
      .replace('.png', '');

    // If id is not found look for the refreshed ID
    if (!soFar['content_' + id]) {
      id = cachedIDs[i];
    }

    // Value incrementation is delayed since the function is in item.js
    // So manual updating of the quantity needs to be implemented here
    if (param == 'quantity') {
      if (Number(_(param).value) + qty < MIN_QUANTITY || Number(_(param).value) + qty > MAX_QUANTITY) return;
      let v = encodeURIComponent(Number(_(param).value) + qty);
      soFar['content_' + id][param + '_' + id] = v;
    } else {
      let cid = cookieID ? cookieID : param;
      soFar['content_' + id][cid + '_' + id] = encodeURIComponent(_(param).value);
    }
  }
  setCookie('cartItems', JSON.stringify(soFar), 365);
  updateCartNum();
  //fbq('track', 'CustomizeProduct');
}

function updateOPrice(price, hasColorSurcharge = false) {
  const label = hasColorSurcharge ? 'Price (incl. +15% color surcharge)' : 'Price';
  for (let el of document.getElementsByClassName('otherPrice')) {
    el.innerText = `${label}: ${Math.round(price)} JD`;
  }
}

function smoothPrice(price) {
  if (price <= 8000) {
    return Math.round(price);
  } else {
    return Math.round(price);
    //return Math.round(Math.sqrt(price) * 110);
  }
}

// Helper function for selecting elements
const _ = (id) => document.getElementById(id);

// Toggle more items menu btn
function toggleMoreMenu() {
  let cont = _('mmContainer');
  if (!cont) return;

  // Ensure jQuery is available, otherwise fallback to vanilla JS
  if (typeof $ !== 'undefined') {
    if (cont.dataset.status == 'closed') {
      $("#mmOverlay").fadeIn(200);
      document.body.style.overflow = 'hidden';
      cont.dataset.status = 'opened';
    } else {
      $("#mmOverlay").fadeOut(200);
      document.body.style.overflow = 'auto';
      cont.dataset.status = 'closed';
    }
    $("#mmContainer").animate({ width: 'toggle' }, 200);
  } else {
    // Vanilla JS fallback
    if (cont.dataset.status == 'closed') {
      _('mmOverlay').style.display = 'block';
      document.body.style.overflow = 'hidden';
      cont.dataset.status = 'opened';
      cont.style.display = 'block'; // Assuming toggle means display block/none or width
      cont.style.width = '280px'; // Approximate width
    } else {
      _('mmOverlay').style.display = 'none';
      document.body.style.overflow = 'auto';
      cont.dataset.status = 'closed';
      cont.style.display = 'none';
      cont.style.width = '0';
    }
  }
}

// Initialize More Menu listeners
document.addEventListener('DOMContentLoaded', () => {
  if (_('moreMenu')) {
    _('moreMenu').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMoreMenu();
    });
  }

  if (_('mmOverlay')) {
    _('mmOverlay').addEventListener('click', () => {
      if (_('mmContainer').dataset.status == 'opened') {
        toggleMoreMenu();
      }
    });
  }

  if (_('mmClose')) {
    _('mmClose').addEventListener('click', () => {
      _('mmContainer').dataset.status = 'opened'; // Ensure it closes
      toggleMoreMenu();
    });
  }
});
