let elementsCount = 1;
(function () {
  let list = document.getElementById('list');
  let input = document.getElementById('input');

  window.onload = function () {
    let param = 'action=get';
    let xhr = new XMLHttpRequest();
    ajax.open(xhr, 'POST', 'include/index.php');
    ajax.send(xhr, param);
    ajax.getResponse(xhr);
  };
  clickAddButton(list);
  clickCleanButton();
  addElementByEnter(list, input);
  clickRemoveButton(list);
  saveList();
})();

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
        showResponse(xhr);
      }
    }
  }
};

function clickAddButton(list) {
  let addItemButton = document.getElementById('addItemButton');
  addItemButton.addEventListener('click', function (event) {
    event.preventDefault();
    //noinspection JSUnresolvedVariable
    addListItem(list, input.value);
    //noinspection JSUnresolvedVariable
    input.value = '';
  });
}

function clickCleanButton() {
  let clearListButton = document.getElementById('clearListButton');
  clearListButton.addEventListener('click', function (event) {
    event.preventDefault();
    //noinspection JSUnresolvedVariable
    clearElement(list);
    elementsCount = 1;
  });
}

function addElementByEnter(list, input) {
  input.addEventListener('keydown', function (event) {
    if (event.keyCode == 13) {    // Enter
      event.preventDefault();
      addListItem(list, input.value);
      input.value = '';
    }
  });
}

function clickRemoveButton(list) {
  let removeItemButton = document.getElementById('removeItemButton');
  removeItemButton.addEventListener('click', function (event) {
    event.preventDefault();
    removeChecked(list);
    hideElement(removeItemButton);
  });
}

function saveList() {
  let saveListButton = document.getElementById('saveListButton');
  saveListButton.addEventListener('click', function (event) {
    event.preventDefault();
    let keyValue = {
      'value': arrayValueItem
    };
    let jsonString = 'items_values=' + JSON.stringify(keyValue);
    let xhr = new XMLHttpRequest();
    ajax.open(xhr, 'POST', 'include/index.php');
    ajax.send(xhr, jsonString);
    ajax.getResponse(xhr);
  });
}

function showResponse(xhr) {
  JSON.parse(xhr.responseText)['value'].forEach(function (item) {
    //noinspection JSUnresolvedVariable
    addListItem(list, item);
  });
}

let arrayValueItem = [];

function addListItem(list, inputValue) {
  let newLi = document.createElement('li');
  newLi.classList.add('item');
  let itemsCount = elementsCount++;

  newLi.innerHTML = (inputValue) ? itemTemplate(inputValue) : itemTemplate('Item ' + itemsCount);

  let valueItem;
  if (inputValue) {
    valueItem = inputValue
  } else {
    valueItem = 'Item ' + itemsCount
  }

  arrayValueItem.push(valueItem);

  newLi.addEventListener('click', function () {
    showElement(document.getElementById('removeItemButton'));
  });

  list.appendChild(newLi);
}

function itemTemplate(inner) {
  return '<label><input type="checkbox">' + inner + '</label>';
}

function clearElement(element) {
  element.innerHTML = '';
  arrayValueItem = [];
}

function removeChecked(list) {
  let items = list.getElementsByClassName('item');
  let arr = [];

  for (let i = 0; i < items.length; i++) {
    let input = items[i].getElementsByTagName('input')[0];
    if (input.checked) {
      items[i].classList.add('checked');
      arr[i] = 'checked';
    }
  }

  for (let i = arrayValueItem.length; i >= 0; i--) {
    if (arr[i] == 'checked') {
      arrayValueItem.splice(i, 1);
    }
  }

  let checkedItem = list.getElementsByClassName('checked');
  while (checkedItem.length) {
    checkedItem[0].parentNode.removeChild(checkedItem[0]);
  }
}

function showElement(element) {
  if (element) {
    element.classList.remove('hidden');
  }
}

function hideElement(element) {
  if (element) {
    element.classList.add('hidden');
  }
}
