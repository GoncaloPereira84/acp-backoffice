<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getAboutHomepage':
        getAboutHomepage();
        break;
    case 'updateAboutHomepage':
        updateAboutHomepage();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getAboutHomepage()
{
    $sqlCmd = " SELECT * from home_about";
    $home_about = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($home_about[0]);
}

function updateAboutHomepage()
{
    $title = $_REQUEST['title'];
    $content = $_REQUEST['content'];
    $cta = $_REQUEST['cta'];
    $link = $_REQUEST['link'];

    $sql_update = "UPDATE home_about
    SET title = '" . $title . "',
    content = '" . $content . "',
    cta_txt = '" . $cta . "',
    link = '" . $link . "'";

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