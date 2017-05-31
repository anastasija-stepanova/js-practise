<?php
function dbConnect()
{
    $connection = mysqli_connect(MYSQL_HOST, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_PORT);
    return $connection;
}

function dbQuery($query)
{
    $connection = dbConnect();
    $result = mysqli_query($connection, $query);
    mysqli_close($connection);
    return $result;
}

function dbQueryGetResult($query)
{
    $connection = dbConnect();
    $data = [];
    $result = mysqli_query($connection, $query);
    if ($result)
    {
        while ($row = mysqli_fetch_assoc($result))
        {
            array_push($data, $row);
        }
        mysqli_free_result($result);
    }
    mysqli_close($connection);
    return $data;
}

function dbSelect($dbName)
{
    $connection = dbConnect();
    mysqli_select_db($connection, $dbName);
    mysqli_close($connection);
}