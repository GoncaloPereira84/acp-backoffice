<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/tools/tools.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getFormacoesIntro':
        getFormacoesIntro();
        break;
    case 'updateFormacoesIntro':
        updateFormacoesIntro();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getFormacoesIntro()
{
    $sqlCmd = " SELECT * from formacoes_intro";
    $home_about = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($home_about[0]);
}

function updateFormacoesIntro()
{
    $text = $_REQUEST['text'];

    $sql_update = "UPDATE formacoes_intro
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