<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getAreas':
        getAreas();
        break;
    case 'getAllAreasByIdArea':
        getAllAreasByIdArea();
        break;
    case 'saveArea':
        saveArea();
        break;
    case 'deleteArea':
        deleteArea();
        break;
    case 'saveOrderAreas':
        saveOrderAreas();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}
function getAreas()
{
    $sqlCmd = " SELECT * from sobre_areas
    order by display_order asc";
    $sobre_areas = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($sobre_areas);
}

function getAllAreasByIdArea()
{
    $sqlCmd = " SELECT * from sobre_areas
    WHERE id = " . $_REQUEST['id_area'];
    $slide = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($slide);
}

function saveArea()
{
    $id = $_REQUEST['id'];
    $title = $_REQUEST['title'];
    $text = $_REQUEST['text'];

    if ($id == '') {
        $lastRecordSql = 'SELECT MAX(display_order) 
                FROM sobre_areas';
        $lastRecord = execQueryMySQL($lastRecordSql);

        if ($lastRecord[0] == NULL) {
            $sql_insert = "INSERT INTO sobre_areas 
                (title,
                text,
                display_order) 
                VALUES
                ('" . $title . "',
                '" . $text . "',
                '0');";
        } else {
            $sql_insert = "INSERT INTO sobre_areas 
                (title,
                text,
                display_order) 
                VALUES
                ('" . $title . "',
                '" . $text . "',
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
        $sql_update = "UPDATE sobre_areas
        SET title = '" . $title . "',
        text = '" . $text . "'
        WHERE id = " . $id;

        include_once($_SERVER['DOCUMENT_ROOT'] . '/connection/class.connection.php');
        $db = Database::getInstance();
        $connection = $db->getConnection();

        if ($result = $connection->query($sql_update)) {
            $db->commitAndClose();
            echo "true||" . json_encode($result);
        } else {
            // $db->rollbackAndClose();
            echo "false||Erro na actualização dos dados.";
        }
    }
}

function deleteArea()
{
    $sql_delete = "DELETE from sobre_areas 
    where id='" . $_REQUEST["id"] . "'";
    execIUQueryMySQL($sql_delete);

    echo "true||Área apagada com sucesso.";
}

function saveOrderAreas()
{
    $i = 0;
    foreach ($_REQUEST['area'] as $value) {
        $sql = "UPDATE sobre_areas SET display_order = $i WHERE id = $value";
        execIUQueryMySQL($sql);
        $i++;
    }
}