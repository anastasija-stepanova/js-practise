<?php
require_once 'common.inc.php';
if (isset($_POST['items_values']))
{
    $connection = dbConnect();
    $itemsValues = $_POST['items_values'];
    $result = dbQueryGetResult("SELECT * FROM list_items WHERE id = 1");
    if ($result)
    {
        dbQuery("UPDATE list_items SET item_value='{$itemsValues}' WHERE id = 1");
    }
    else
    {
        dbQuery("INSERT INTO list_items (item_value, id) VALUES ('{$itemsValues}', 1)");
    }
}