<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getEquipaHomepage':
        getEquipaHomepage();
        break;
    case 'updateEquipaHomepage':
        updateEquipaHomepage();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getEquipaHomepage()
{
    $sqlCmd = " SELECT * from home_equipa";
    $home_equipa = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($home_equipa[0]);
}

function updateEquipaHomepage()
{
    $name = $_REQUEST['name'];
    $cargo = $_REQUEST['cargo'];
    $title = $_REQUEST['title'];
    $content = $_REQUEST['content'];
    $cta = $_REQUEST['cta'];
    $link = $_REQUEST['link'];

    if (isset($_FILES['files'])) {
        $errors = [];
        $path = $_SERVER['DOCUMENT_ROOT']. '/uploads/equipa/'; //to BO online path
        $path1 = explode('backoffice.anacarolinapereira.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'uploads/equipa/'; //to website online path

        // $path = $_SERVER['DOCUMENT_ROOT'] . '/uploads/equipa/'; //to BO local path
        // $path1 = explode('/acp-bo',$_SERVER['DOCUMENT_ROOT'])[0] . '/acp/uploads/equipa/'; //to website local path
        $extensions = ['jpg', 'jpeg', 'png', 'gif'];

        $all_files = count($_FILES['files']['tmp_name']);

        for ($i = 0; $i < $all_files; $i++) {
            $file_name = $_FILES['files']['name'][$i];
            $file_tmp = $_FILES['files']['tmp_name'][$i];
            $file_type = $_FILES['files']['type'][$i];
            $file_size = $_FILES['files']['size'][$i];
            $file_ext = explode('.', $_FILES['files']['name'][$i]);
            $ext = end($file_ext);

            $file = $path . $file_name;
            $file1 = $path1 . $file_name;

            if (!in_array($ext, $extensions)) {
                $errors[] = 'Extensão de ficheiro não permitida: ' . $file_name . ' ' . $file_type;
            }

            if ($file_size > 2097152) {
                $errors[] = 'O tamanho do ficheiro excede o limite de 2MB: ' . $file_name . ' ' . $file_type;
            }

            if ($file_size == 0) {
                $errors[] = 'Não é possível ler o ficheiro: ' . $file_name . ' ' . $file_type;
            }

            if (empty($errors)) {
                move_uploaded_file($file_tmp, $file);
                copy($file, $file1);
                if ($file) {
                    $sql_update = "UPDATE home_equipa
                    SET name = '" . $name . "',
                    cargo = '" . $cargo . "',
                    img = '" . $file . "',
                    title = '" . $title . "',
                    text = '" . $content . "',
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
                        echo "false||Erro na inserção dos dados.";
                    }
                }
            } else {
                echo 'false||' . $errors[0];
            }
        }
    } else {

        $sql_update = "UPDATE home_equipa
                    SET name = '" . $name . "',
                    cargo = '" . $cargo . "',
                    title = '" . $title . "',
                    text = '" . $content . "',
                    cta_txt = '" . $cta . "',
                    link = '" . $link . "'";

        include_once('../connection/class.connection.php');
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