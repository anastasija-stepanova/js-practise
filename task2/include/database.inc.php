<?php
$connect = null;
function dbConnect()
{
    global $connect;
    $connect = mysqli_connect(MYSQL_HOST, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_PORT);
    $error = mysqli_connect_error();
    if ($error)
    {
        die('Unable to connect to database');
    }
}

function dbQuery($query)
{
    global $connect;
    $result = mysqli_query($connect, $query);
    return ($result != false);
}

function dbQueryGetResult($query)
{
    global $connect;
    $data = array();
    $result = mysqli_query($connect, $query);
    if ($result)
    {
        while ($row = mysqli_fetch_assoc($result))
        {
            array_push($data, $row);
        }
        mysqli_free_result($result);
    }
    return $data;
}

function dbSelect($dbName)
{
    global $connect;
    mysqli_select_db($connect, $dbName);
}