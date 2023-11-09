<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getPoliticaPrivacidade':
        getPoliticaPrivacidade();
        break;
    case 'getAllInfoByIdTopic':
        getAllInfoByIdTopic();
        break;
    case 'saveTopic':
        saveTopic();
        break;
    case 'deletePP':
        deletePP();
        break;
    case 'saveOrderTopics':
        saveOrderTopics();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getPoliticaPrivacidade()
{
    $sqlCmd = " SELECT * from politica_privacidade
    order by display_order asc";
    $pp = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($pp);
}

function getAllInfoByIdTopic()
{
    $sqlCmd = " SELECT * from politica_privacidade
    WHERE id = " . $_REQUEST['id_pp'];
    $slide = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($slide);
}

function saveTopic()
{
    $id = $_REQUEST['id'];
    $title = $_REQUEST['title'];
    $content = $_REQUEST['content'];

    if ($id == '') {
        $lastRecordSql = 'SELECT MAX(display_order) 
        FROM politica_privacidade';

        $lastRecord = execQueryMySQL($lastRecordSql);

        if ($lastRecord[0] == NULL) {
            $sql_insert = "INSERT INTO politica_privacidade 
                        (title,
                        content,
                        display_order) 
                        VALUES
                        ('" . $title . "',
                        '" . $content . "',
                        '0');";
        } else {
            $sql_insert = "INSERT INTO politica_privacidade 
                        (title,
                        content,
                        display_order) 
                        VALUES
                        ('" . $title . "',
                        '" . $content . "',
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
        $sql_update = "UPDATE politica_privacidade
                        SET title = '" . $title . "',
                        content = '" . $content . "'
                        WHERE id = " . $id;

        include_once($_SERVER['DOCUMENT_ROOT'] . '/connection/class.connection.php');
        $db = Database::getInstance();
        $connection = $db->getConnection();

        if ($result = $connection->query($sql_update)) {
            $db->commitAndClose();
            echo "true||" . json_encode($result);
        } else {
            // $db->rollbackAndClose();
            echo "false||Erro na inserção dos dados.";
        }
    }
}

function deletePP()
{
    $sql_delete = "DELETE from politica_privacidade 
    where id='" . $_REQUEST["id"] . "'";
    $deleted = execIUQueryMySQL($sql_delete);

    if ($deleted)
        echo "true||Tópico apagado com sucesso.";
    else
        echo "false||Não foi possível apagar o tópico. Tente novamente mais tarde.";
}

function saveOrderTopics()
{
    $i = 0;
    foreach ($_REQUEST['pp'] as $value) {
        $sql = "UPDATE politica_privacidade SET display_order = $i WHERE id = $value";
        execIUQueryMySQL($sql);
        $i++;
    }
}