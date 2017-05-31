<?php
require_once 'include/common.inc.php';
dbSelect(MYSQL_DATABASE);
$data = dbQueryGetResult("SELECT * FROM list_items WHERE id = 1");
$list = '';
if ($data && $data[0] && $data[0]['item_value'])
{
    $json = $data[0]['item_value'];
    $decode = json_decode($json);
    for ($i = 0; $i < count($decode->value); $i++)
    {
        $list .= "<li class='item'><label><input type='checkbox'>{$decode->value[$i]}</label></li>";
    }
}

$vars =
[
    '[[$list]]' => $list
];
loadTemplate('layout.tpl', $vars);
