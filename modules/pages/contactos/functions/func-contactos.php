<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getContactos':
        getContactos();
        break;
    case 'updateContactos':
        updateContactos();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getContactos()
{
    $sqlCmd = " SELECT * from home_contactos";
    $home_contactos = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($home_contactos[0]);
}

function updateContactos()
{
    $tlf1 = $_REQUEST['tlf1'];
    $tlf2 = $_REQUEST['tlf2'];
    $email1 = $_REQUEST['email1'];
    $email2 = $_REQUEST['email2'];
    $address = $_REQUEST['address'];
    $horario = $_REQUEST['horario'];
    $fb = $_REQUEST['facebook'];
    $ig = $_REQUEST['instagram'];
    $blog = $_REQUEST['blog'];
    $api = $_REQUEST['api_code'];

    $sql_update = "UPDATE home_contactos
    SET tlf_1 = '" . $tlf1 . "',
    tlf_2 = '" . $tlf2 . "',
    email_1 = '" . $email1 . "',
    email_2 = '" . $email2 . "',
    address = '" . $address . "',
    horario = '" . $horario . "',
    facebook = '" . $fb . "',
    instagram = '" . $ig . "',
    blog = '" . $blog . "',
    google_maps_code = '" . $api . "'";

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
