<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getFaqs':
        getFaqs();
        break;
    case 'getAllInfoByIdFaq':
        getAllInfoByIdFaq();
        break;
    case 'saveFaq':
        saveFaq();
        break;
    case 'deleteFaq':
        deleteFaq();
        break;
    case 'saveOrderFaqs':
        saveOrderFaqs();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getFaqs()
{
    $sqlCmd = "SELECT * from faqs_perguntas
    order by faqs_perguntas.display_order asc";
    $pp = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($pp);
}

function getAllInfoByIdFaq()
{
    $sqlCmd = "SELECT * from faqs_perguntas
    WHERE faq_id = " . $_REQUEST['id_faqs'];
    $slide = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($slide);
}

function saveFaq()
{
    $id = $_REQUEST['id'];
    $pergunta = $_REQUEST['pergunta'];
    $resposta = $_REQUEST['resposta'];

    if ($id == '') {
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
    } else {
        $sql_update = "UPDATE faqs_perguntas
            SET pergunta = '" . $pergunta . "',
            resposta = '" . $resposta . "'
            WHERE faq_id = " . $id;

        include_once($_SERVER['DOCUMENT_ROOT'] . '/connection/class.connection.php');
        $db = Database::getInstance();
        $connection = $db->getConnection();

        if ($result = $connection->query($sql_update)) {
            $db->commitAndClose();
            echo "true||" . json_encode($result);
        } else {
            $db->rollbackAndClose();
            echo "false||Erro na inserção dos dados.";
        }
    }
}

function deleteFaq()
{
    $sql_delete = "DELETE from faqs_perguntas 
    where faq_id='" . $_REQUEST["id"] . "'";
    $deleted = execIUQueryMySQL($sql_delete);

    if ($deleted)
        echo "true||Tópico apagado com sucesso.";
    else
        echo "false||Não foi possível apagar o tópico. Tente novamente mais tarde.";
}

function saveOrderFaqs()
{
    $i = 0;
    foreach ($_REQUEST['faqs'] as $value) {
        $sql = "UPDATE faqs_perguntas SET display_order = $i WHERE faq_id = $value";
        execIUQueryMySQL($sql);
        $i++;
    }
}
