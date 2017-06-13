<?php
require_once 'Calculator.php';
$calc = new Calculator();
if (isset($_GET['arg1']) && isset($_GET['arg2']) && isset($_GET['op']))
{
    $arg1 = $_GET['arg1'];
    $arg2 = $_GET['arg2'];
    $op = $_GET['op'];
    if ($op == 'div' && $arg2 === 0)
    {
        echo 'Попытка деления на 0';
    }
    elseif (!(is_numeric($arg1)) || !(is_numeric($arg2)))
    {
        echo 'arg1 и/или arg2 не число';
    }
    else
    {
        $result = $calc->getResult($arg1, $arg2, $op);
        echo $result;
    }
}
else
{
    echo 'Переданы не все параметры!';
}

