(function () {
  let userLogin = prompt('Введите Ваш логин, пожалуйста', '');

  if (userLogin == null || '') {
    alert('Вход отменен');
  } else {
    if (userLogin.toLowerCase() != 'админ') {
      alert('Я Вас не знаю');
    } else {
      let userPassword = prompt('Введите Ваш пароль, пожалуйста', '');

      if (userPassword == null || '') {
        alert('Вход отменен');
      } else if (userPassword.toLowerCase() == 'черный властелин') {
        alert('Добро пожаловать!');
      } else {
        alert('Пароль неверен');
      }
    }
  }
})();
