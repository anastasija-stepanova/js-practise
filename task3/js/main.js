(function() {
  let feedbackForm = document.getElementById('feedbackForm');
  feedbackForm.addEventListener('submit', function(event) {
    event.preventDefault();

    let textBox = document.getElementById('textBox');
    let userName = textBox.value;
    let nameParam = '?name=' + userName;
    ajaxGet('include/users.php', nameParam);
  });
})();

let ajaxGet = function(path, param) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', path + param, true);
  xhr.send();
  const doneState = 4;
  xhr.onreadystatechange = function() {
    if (xhr.readyState == doneState) {
      if (xhr.responseText) {
        showResponse(xhr);
      }
    }
  }
};

function showResponse(xhr) {
  let textBox = document.getElementById('textBox');
  textBox.value = '';
  document.getElementById('result').innerHTML = xhr.responseText;
}


