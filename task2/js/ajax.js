let ajax = {};
ajax.open = function (xhr, method, path, param) {
  if (param) {
    xhr.open(method, path + param, true);
  } else {
    xhr.open(method, path, true);
  }
};
ajax.send = function (xhr, body) {
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(body);
};
ajax.getResponse = function (xhr) {
  const doneState = 4;
  const statusOk = 200;
  xhr.onreadystatechange = function () {
    if (xhr.readyState == doneState) {
      if (this.status != statusOk) {
        console.log('ошибка: ' + (this.status ? this.statusText : 'запрос не удался'));
      } else {
        console.log('200 OK');
      }
      if (xhr.responseText) {
        console.log(xhr.responseText);
        showResponse(xhr);
      }
    }
  }
};
