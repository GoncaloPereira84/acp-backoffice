<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getHistoria':
        getHistoria();
        break;
    case 'updateHistoria':
        updateHistoria();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getHistoria()
{
    $sqlCmd = " SELECT * from sobre_historia";
    $sobre_historia = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($sobre_historia[0]);
}

function updateHistoria()
{
    $text1 = $_REQUEST['text'];
    $text2 = $_REQUEST['text2'];

    $sql_update = "UPDATE sobre_historia
    SET text = '" . $text1 . "',
    text2 = '" . $text2 . "'";

    include_once($_SERVER['DOCUMENT_ROOT'] . '/connection/class.connection.php');
    $db = Database::getInstance();
    $connection = $db->getConnection();

    if ($result = $connection->query($sql_update)) {
        $db->commitAndClose();
        echo "true||" . json_encode($result);
    } else {
        // $db->rollbackAndClose();
        echo "false||Erro na inserção dos dados";
    }
}