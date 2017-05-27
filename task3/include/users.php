<?php
$message = 'Hello ';
if (isset($_GET['name']))
{
    if (ctype_space($_GET['name']) or ($_GET['name']) == '')
    {
        $name = 'World';
    } else
    {
        $name = $_GET['name'];
    }
    echo "{$message}, {$name} !";
}
else
{
    echo 'GET параметр не был передан!';
}