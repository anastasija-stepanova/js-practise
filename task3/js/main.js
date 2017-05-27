(function () {
  include('js/ajax.js');
  let feedbackForm = document.getElementById('feedbackForm');
  feedbackForm.addEventListener('submit', function (event) {
    event.preventDefault();

    let textBox = document.getElementById('textBox');
    let userName = textBox.value;
    let nameParam = '?name=' + userName;
    let xhr = new XMLHttpRequest();
    ajax.open(xhr, 'GET', 'include/users.php', nameParam);
    ajax.send(xhr);
    ajax.getResponse(xhr);
  });
})();

function include(url) {
  let script = document.createElement('script');
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
}

function showResponse(xhr) {
  let textBox = document.getElementById('textBox');
  textBox.value = '';
  document.getElementById('result').innerHTML = xhr.responseText;
}
