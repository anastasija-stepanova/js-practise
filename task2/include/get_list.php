<?php
require_once 'common.inc.php';
dbConnect();
if (isset($_POST['action']))
{
    $tempUserId = 1;
    dbSelect(MYSQL_DATABASE);
    $data = dbQueryGetResult("SELECT * FROM list_items WHERE user_id = '{$tempUserId}'");
    echo $data[0]['item_value'];
}