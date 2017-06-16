<?php
require_once 'Calculator.php';
if (isset($_GET['arg1']) && isset($_GET['arg2']) && isset($_GET['op']))
{
    $calc = new Calculator();
    $arg1 = $_GET['arg1'];
    $arg2 = $_GET['arg2'];
    $op = $_GET['op'];
    if ($calc->calculate($arg1, $arg2, $op) == 'div0')
    {
        echo 'Попытка деления на 0';
    }
    elseif ($calc->calculate($arg1, $arg2, $op) == 'undefinedOp')
    {
        echo 'Неизвестная операция';
    }
    elseif (!(is_numeric($arg1)) || !(is_numeric($arg2)))
    {
        echo 'arg1 и/или arg2 не число';
    }
    else
    {
        echo $calc->calculate($arg1, $arg2, $op);
    }
}
else
{
    echo 'Переданы не все параметры!';
}