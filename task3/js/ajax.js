let ajax = {};
ajax.open = function (xhr, method, path, param) {
  if (param === undefined) {
    xhr.open(method, path, true);
  } else {
    xhr.open(method, path + param, true);
  }
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
};
ajax.send = function (xhr, body) {
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
        showResponse(xhr);
      }
    }
  }
};


