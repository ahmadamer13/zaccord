// User can change their delivery infos
_('cDel').addEventListener('click', function changeDelInfo(e) {
  // Gather values 
  let name = _('name').value;
  let pcode = Number(_('pcode').value);
  let city = _('city').value;
  let address = _('address').value;
  let mobile = _('mobile').value;

  _('succStatusDel').innerHTML = '';
  _('errStatusDel').innerHTML = '';

  // Only postal code validation can be performed; other params are too ambiguous
  if (!Number.isInteger(pcode) || pcode < 1000 || pcode > 9985) {
    statusFill('errStatusDel', 'Please provide a valid ZIP code');
    return;
  } else {
    // Send data to server for further validation
    let data = {
      'name': name,
      'pcode': pcode,
      'city': city,
      'address': address,
      'mobile': mobile
    };

    fetch('/delValidation', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    }).then(response => {
      return response.json();
    }).then(data => {
      if (data.success) { 
        statusFill('succStatusDel', 'Delivery information updated successfully');
      } else if (data.error) {
        _('errStatusDel').innerHTML = data.error;
      } else {
        statusFill('errStatusDel', 'An unexpected error occurred, please try again');
      }
    }).catch(err => {
      statusFill('errStatusDel', 'An unexpected error occurred, please try again');
    });
  }
});

// Change password
_('cPass').addEventListener('click', function changePassword(e) {
  let cpass = _('cpass').value;
  let npass = _('pass').value;
  let rpass = _('rpass').value;

  _('errStatusPass').innerHTML = '';
  _('succStatusPass').innerHTML = '';

  // Make sure new password is at least 6 characters long
  if (npass.length < 6) {
    statusFill('errStatusPass', 'Password must be at least 6 characters long');
    return;
  } else {
    // Send data to server for further validation
    let data = {
      'cpass': cpass,
      'npass': npass,
      'rpass': rpass
    };

    fetch('/passValidate', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    }).then(response => {
      return response.json();
    }).then(data => {
      if (data.error) {
        _('errStatusPass').innerHTML = data.error;
        return;
      }
      statusFill('succStatusPass', 'Password changed successfully');
    }).catch(err => {
      statusFill('errStatusPass', 'An unexpected error occurred, please try again');
    });
  }
});

// Show more orders when user clicks btn
if (_('moreOrders')) {
  _('moreOrders').addEventListener('click', function showMore(e) {
    _('moreHolder').innerHTML = '<img src="/images/icons/loader.gif" width="24">';

    // Send a request to server for more orders
    fetch('/moreOrders', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(response => {
      return response.text();
    }).then(data => {
      _('moreHolder').style.display = 'none';
      _('allOrders').classList = 'animate__animated animate__fadeIn';
      _('allOrders').innerHTML += data;
    }).catch(err => {
      _('moreHolder').innerHTML = '<p>An error occurred, please try again</p>';
    });
  });
}
