<?php
global $db;
global $connection;

//instancia ligacao a BD
include_once($_SERVER['DOCUMENT_ROOT'] . '/connection/class.connection.php');
$db = Database::getInstance();
$connection = $db->getConnection();

function execQueryMySQL($sqlCmd)
{
    global $db;
    global $connection;
    if ($result = $connection->query($sqlCmd)) {
        $rows = array();
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
    } else {
        $db->rollback();
    }
    return $rows;
}

function execIUQueryMySQL($sqlCmd)
{
    global $db;
    global $connection;
    if ($result = $connection->query($sqlCmd)) {
        $db->commit();
    } else {
        $db->rollback();
    }
    return $result;
}
