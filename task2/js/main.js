window.onload = function() {
  let list = document.getElementById('list');
  let input = document.getElementById('input');
  let arrayItems = document.getElementsByClassName('item');

  for (let i = 0; i < arrayItems.length; i++) {
    arrayItems[i].addEventListener('click', function() {
      showElement(document.getElementById('removeItemButton'));
    });
  }

  addElementByButton(list, arrayItems);
  cleanListByButton();
  addElementByEnter(list, input);
  removeElementByButton(list);
  saveListByButton();
};

let ajaxPost = function(path, param) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', path, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(param);
  const doneState = 4;
  xhr.onreadystatechange = function() {
    if (xhr.readyState == doneState) {
      if (xhr.responseText) {
        showResponse(xhr);
      }
    }
  }
};

function getArrayValues(arrayItems) {
  let arrayValueItem = [];
  for (let i = 0; i < arrayItems.length; i++) {
    arrayValueItem.push(arrayItems[i]['innerText']);
  }
  return arrayValueItem;
}

function addElementByButton(list, arrayItems) {
  let elementsCount = arrayItems.length + 1;
  let addItemButton = document.getElementById('addItemButton');
  addItemButton.addEventListener('click', function(event) {
    event.preventDefault();
    //noinspection JSUnresolvedVariable
    addListItem(list, input.value, elementsCount);
    elementsCount++;
    //noinspection JSUnresolvedVariable
    input.value = '';
  });
}

function cleanListByButton() {
  let clearListButton = document.getElementById('clearListButton');
  clearListButton.addEventListener('click', function(event) {
    event.preventDefault();
    //noinspection JSUnresolvedVariable
    clearElement(list);
  });
}

function addElementByEnter(list, input) {
  if (input != '') {
    input.addEventListener('keydown', function(event) {
      if (event.keyCode == 13) {    // Enter
        event.preventDefault();
        addListItem(list, input.value);
        input.value = '';
      }
    });
  }
}

function removeElementByButton(list) {
  let removeItemButton = document.getElementById('removeItemButton');
  removeItemButton.addEventListener('click', function(event) {
    event.preventDefault();
    removeChecked(list);
    hideElement(removeItemButton);
  });
}

function saveListByButton() {
  let saveListButton = document.getElementById('saveListButton');
  saveListButton.addEventListener('click', function(event) {
    event.preventDefault();
    let keyValue = {
      'value': getArrayValues()
    };
    let jsonString = 'items_values=' + JSON.stringify(keyValue);
    ajaxPost('include/save_list.php', jsonString);
  });
}

function showResponse(xhr) {
  JSON.parse(xhr.responseText)['value'].forEach(function(item) {
    //noinspection JSUnresolvedVariable
    addListItem(list, item);
  });
}

function addListItem(list, inputValue, itemsCount) {
  let newLi = document.createElement('li');
  newLi.classList.add('item');
  newLi.innerHTML = (inputValue) ? itemTemplate(inputValue) : itemTemplate('Item ' + itemsCount);
  let valueItem = (inputValue) ? inputValue : 'Item ' + itemsCount;

  getArrayValues().push(valueItem);
  newLi.addEventListener('click', function() {
    showElement(document.getElementById('removeItemButton'));
  });
  list.appendChild(newLi);
}

function itemTemplate(inner) {
  return '<label><input type="checkbox">' + inner + '</label>';
}

function clearElement(element) {
  element.innerHTML = '';
}

function removeChecked(list) {
  let items = list.getElementsByClassName('item');
  let checkedArray = [];

  for (let i = 0; i < items.length; i++) {
    let input = items[i].getElementsByTagName('input')[0];
    if (input.checked) {
      items[i].classList.add('checked');
      checkedArray[i] = 'checked';
    }
  }

  for (let i = getArrayValues().length; i >= 0; i--) {
    if (checkedArray[i] == 'checked') {
      getArrayValues().splice(i, 1);
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