document.addEventListener('DOMContentLoaded', function () {

  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
      const url = new URL(tab[0].url);
      const loader = document.getElementById('loaderContainer');
      const result = document.getElementById('result');
      loader.classList.remove('hide');
      checkPageButton.classList.add('hide');
      result.classList.add('hide');
      result.innerText = '';
      try {
        fetch(`https://desenmascara.me/api/official/${url.hostname}`, {
          mode: 'no-cors'
        }).then(response => {
          loader.classList.add('hide');
          result.classList.remove('hide');
          if (response.status !== 200) {
            result.innerText = 'Looks like there was a problem. Status Code: ' + response.status;
            result.classList.remove('hide');
            checkPageButton.classList.remove('hide');
            checkPageButton.innerText = 'Try Again';
            return;
          }
          response.json().then(function (data) {
            result.innerText = data.result;
            switch (data.result) {
              case 'FAKE':
                result.classList.add('fake');
                break;
              case 'Not flagged':
                result.classList.add('notFlagged');
                break;
              default:
                result.classList.remove('notFlagged');
                break;
            }
          });
        }).catch(function (error) {
          result.innerText = 'Something went wrong.';
          checkPageButton.innerText = 'Try Again';
          checkPageButton.classList.remove('hide');
        });
      } catch (error) {
        result.innerText = 'Something went wrong.';
        checkPageButton.innerText = 'Try Again';
        checkPageButton.classList.remove('hide');
      }

    });
  }, false);
}, false);

