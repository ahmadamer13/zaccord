// Validate emails with regex
function validateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

function regVal(email, pass, passConf, statName, btn) {
  let errStatus = document.getElementById(statName);
  if (!email || !pass || !passConf) {
    errStatus.innerHTML = '<p>Please fill out all fields</p>';
    _(btn).disabled = false;
    return false;
  } else if (!validateEmail(email)) {
    errStatus.innerHTML = '<p>Please enter a valid email</p>';
    _(btn).disabled = false;
    return false;
  } else if (pass.length < 6) {
    errStatus.innerHTML = '<p>Password must be at least 6 characters</p>';
    _(btn).disabled = false;
    return false;
  } else if (pass != passConf) {
    errStatus.innerHTML = '<p>Passwords do not match</p>';
    _(btn).disabled = false;
    return false;
  }
  return true;
}
