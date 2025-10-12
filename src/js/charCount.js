_('opinionBox').addEventListener('keyup', countCharacters);
_('opinionBox').addEventListener('keydown', countCharacters);

function countCharacters(e) {
  let liveCnt = Number(_('opContent').innerText.replace(/(\r|\s)/g, '').length);
  _('liveCount').innerText = liveCnt;

  if (liveCnt > 1000) {
    _('br').classList.add('redbar');
  } else {
    _('br').classList.remove('redbar');
  }
}

_('sendOpinion').addEventListener('click', function sendOpinion(e) {
  // Make sure charaters do not exceed 1,000 & is not empty
  if (Number(_('opContent').innerText.replace(/(\r|\s)/g, '').length) < 1) {
    _('status').innerHTML = '<p>Your opinion is empty</p>';
    return;
  } else if (Number(_('opContent').innerText.replace(/(\r|\s)/g, '').length) > 1000) {
    _('status').innerHTML = '<p>Your opinion exceeded 1,000 characters</p>';
    return;
  } else {
    let data = {
      'opinion': _('opContent').innerText
    };

    fetch('/sendOpinion', {
      headers : {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    }).then(response => {
      return response.text();
    }).then(data => {
      if (JSON.parse(data).error) {
        _('status').innerHTML = '<p>' + error + '</p>';
      } else {
        _('succBox').innerHTML = '<p>Your opinion has been sent successfully</p>';
      }
    });
  }
});
