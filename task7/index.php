<?php
require_once 'include/common.inc.php';
$tvSet = new Tv(50);
$tvSet->switchOn();
$tvSet->switchChannel(48);
$tvSet->showState();
$tvSet->switchOff();
$tvSet->showState();
$tvSet->switchOn();
$tvSet->showState();
$tvSet = new Tv(20);
$tvSet->switchChannel(-1);
$tvSet->showState();
$tvSet = new Tv(20);
$tvSet->switchOn();
$tvSet->switchChannel(21);
$tvSet->showState();