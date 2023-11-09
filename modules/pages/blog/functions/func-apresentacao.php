<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/tools/tools.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getApresentacao':
        getApresentacao();
        break;
    case 'updateApresentacao':
        updateApresentacao();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getApresentacao()
{
    $sqlCmd = " SELECT * from blog_apresentacao";
    $blog_apr = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($blog_apr[0]);
}

function updateApresentacao()
{
    $text = $_REQUEST['text'];

    $sql_update = "UPDATE blog_apresentacao
    SET text = '" . $text . "'";

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