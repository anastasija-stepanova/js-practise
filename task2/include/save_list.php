<?php
require_once 'common.inc.php';
dbConnect();
if (isset($_POST['items_values']))
{
    $tempUserId = 1;
    $userList = $_POST['items_values'];
    $result = mysqli_query($connect, "SELECT * FROM list_items WHERE user_id = '{$tempUserId}'");
    $row = mysqli_fetch_row($result);
    if (array_key_exists(0, $row) && $row[0])
    {
        dbQuery("UPDATE list_items SET item_value='{$userList}' WHERE user_id = '{$tempUserId}'");
    } else
    {
        dbQuery("INSERT INTO list_items (item_value, user_id) VALUES ('{$userList}', '{$tempUserId}')");
    }
}