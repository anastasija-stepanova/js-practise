<!DOCTYPE>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body class="main">
    <div class="app_container">
      <h1 class="app_title">TODO List</h1>
      <ul id="list" class="list">
        [[$list]]
      </ul>
      <input class="textbox" type="text" name="text" id="input" placeholder="Введите Ваш текст...">
      <div class="button_container">
        <button class="button add_new_button" id="addItemButton">
            Add
        </button>
        <button class="button clear_list_button" id="clearListButton">
            Clean
        </button>
        <button class="button save_list_button" id="saveListButton">
            Save
        </button>
        <button class="button remove_item_button hidden" id="removeItemButton">
            Remove
        </button>
      </div>
    </div>
  </body>
  <script src="js/main.js"></script>
</html>