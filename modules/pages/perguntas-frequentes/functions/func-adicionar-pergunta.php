<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'saveFaq':
        saveFaq();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function saveFaq()
{
    $pergunta = $_REQUEST['pergunta'];
    $resposta = $_REQUEST['resposta'];

    $lastRecordSql = 'SELECT MAX(display_order) 
    FROM faqs_perguntas';

    $lastRecord = execQueryMySQL($lastRecordSql);

    if ($lastRecord[0] == NULL) {
        $sql_insert = "INSERT INTO faqs_perguntas 
            (pergunta,
            resposta,
            display_order) 
            VALUES
            ('" . $pergunta . "',
            '" . $resposta . "',
            '0');";
    } else {
        $sql_insert = "INSERT INTO faqs_perguntas 
            (pergunta,
            resposta,
            display_order) 
            VALUES
            ('" . $pergunta . "',
            '" . $resposta . "',
            " . $lastRecord[0]["MAX(display_order)"] . " + 1);";
    }

    include_once($_SERVER['DOCUMENT_ROOT'] . '/connection/class.connection.php');
    $db = Database::getInstance();
    $connection = $db->getConnection();
    if ($result = $connection->query($sql_insert)) {
        $db->commitAndClose();
        echo "true||" . json_encode($result);
    } else {
        // $db->rollbackAndClose();
        echo "false||Erro na inserção dos dados.";
    }
}