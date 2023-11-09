<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getEquipa':
        getEquipa();
        break;
    case 'getAllMembrosByIdMembro':
        getAllMembrosByIdMembro();
        break;
    case 'saveEquipa':
        saveEquipa();
        break;
    case 'deleteEquipa':
        deleteEquipa();
        break;
    case 'saveOrderEquipa':
        saveOrderEquipa();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getEquipa()
{
    $sqlCmd = " SELECT * from sobre_equipa
    order by display_order asc";
    $sobre_equipa = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($sobre_equipa);
}

function getAllMembrosByIdMembro()
{
    $sqlCmd = " SELECT * from sobre_equipa
    WHERE id = " . $_REQUEST['id_membro'];
    $slide = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($slide);
}

function saveEquipa()
{
    $id = $_REQUEST['id'];
    $name = $_REQUEST['name'];
    $cargo = $_REQUEST['cargo'];
    $description = $_REQUEST['description'];
    // $quote = $_REQUEST['quote'];

    if ($id == '') {
        if (isset($_FILES['filesEquipa'])) {
            $errors = [];
            $path = $_SERVER['DOCUMENT_ROOT']. '/uploads/equipa/'; //to BO online path
            // $path1 = $_SERVER['HOME'] . '/uploads/equipa/'; //to website online path
            $path1 = explode('backoffice', $_SERVER['DOCUMENT_ROOT'])[0] . 'httpdocs/uploads/equipa/'; //to website online path

            // print_r($path1);

            // $path = $_SERVER['DOCUMENT_ROOT'] . '/uploads/equipa/'; //to BO local path
            // $path1 = explode('/acp-bo',$_SERVER['DOCUMENT_ROOT'])[0] . '/acp/uploads/equipa/'; //to website local path
            $extensions = ['jpg', 'jpeg', 'png', 'gif', 'PNG', 'JPG'];

            $all_files = count($_FILES['filesEquipa']['tmp_name']);

            for ($i = 0; $i < $all_files; $i++) {
                $file_name = $_FILES['filesEquipa']['name'][$i];
                $file_tmp = $_FILES['filesEquipa']['tmp_name'][$i];
                $file_type = $_FILES['filesEquipa']['type'][$i];
                $file_size = $_FILES['filesEquipa']['size'][$i];
                $file_ext = explode('.', $_FILES['filesEquipa']['name'][$i]);
                $ext = end($file_ext);

                $file = $path . $file_name;
                $file1 = $path1 . $file_name;

                // print_r('<pre>'.$file.'</pre>');
                // print_r('<pre>'.$file1.'</pre>');
                // print_r('<pre>'.__DIR__.'</pre>');

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
                        $lastRecordSql = 'SELECT MAX(display_order) 
                        FROM sobre_equipa';
                        $lastRecord = execQueryMySQL($lastRecordSql);

                        if ($lastRecord[0] == NULL) {
                            $sql_insert = "INSERT INTO sobre_equipa 
                                (name,
                                cargo,
                                description,
                                img_src,
                                display_order) 
                                VALUES
                                ('" . $name . "',
                                '" . $cargo . "',
                                '" . $description . "',
                                '" . $file . "',
                                '0');";
                        } else {
                            $sql_insert = "INSERT INTO sobre_equipa 
                                (name,
                                cargo,
                                description,
                                img_src,
                                display_order) 
                                VALUES
                                ('" . $name . "',
                                '" . $cargo . "',
                                '" . $description . "',
                                '" . $file . "',
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
                } else {
                    echo 'false||' . $errors[0];
                }
            }
        } else {
            $lastRecordSql = 'SELECT MAX(display_order) 
                FROM home_slideshow';
            $lastRecord = execQueryMySQL($lastRecordSql);

            if ($lastRecord[0] == NULL) {
                $sql_insert = "INSERT INTO sobre_equipa 
                    (name,
                    cargo,
                    description,
                    display_order) 
                    VALUES
                    ('" . $name . "',
                    '" . $cargo . "',
                    '" . $description . "',
                    '0');";
            } else {
                $sql_insert = "INSERT INTO sobre_equipa 
                    (name,
                    cargo,
                    description,
                    display_order) 
                    VALUES
                    ('" . $name . "',
                    '" . $cargo . "',
                    '" . $description . "',
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
    } else {
        if (isset($_FILES['filesEquipa'])) {
            $errors = [];
            $path = $_SERVER['DOCUMENT_ROOT']. '/uploads/equipa/'; //to BO online path
            // $path1 = explode('backoffice.anacarolinapereira.pt', $_SERVER['DOCUMENT_ROOT'])[0] . '/uploads/equipa/'; //to website online path
            $path1 = explode('backoffice', $_SERVER['DOCUMENT_ROOT'])[0] . 'httpdocs/uploads/equipa/';

            // $path = $_SERVER['DOCUMENT_ROOT'] . '/uploads/equipa/'; //to BO local path
            // $path1 = explode('/acp-bo',$_SERVER['DOCUMENT_ROOT'])[0] . '/acp/uploads/equipa/'; //to website local path
            $extensions = ['jpg', 'jpeg', 'png', 'gif', 'PNG', 'JPG'];

            $all_files = count($_FILES['filesEquipa']['tmp_name']);

            for ($i = 0; $i < $all_files; $i++) {
                $file_name = $_FILES['filesEquipa']['name'][$i];
                $file_tmp = $_FILES['filesEquipa']['tmp_name'][$i];
                $file_type = $_FILES['filesEquipa']['type'][$i];
                $file_size = $_FILES['filesEquipa']['size'][$i];
                $file_ext = explode('.', $_FILES['filesEquipa']['name'][$i]);
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
                        $sql_update = "UPDATE sobre_equipa
                        SET name = '" . $name . "',
                        cargo = '" . $cargo . "',
                        description = '" . $description . "',
                        img_src = '" . $file . "'
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
                } else {
                    echo 'false||' . $errors[0];
                }
            }
        } else {
            $sql_update = "UPDATE sobre_equipa
                SET name = '" . $name . "',
                cargo = '" . $cargo . "',
                description = '" . $description . "'
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
}

function deleteEquipa()
{
    $sql_delete = "DELETE from sobre_equipa 
    where id='" . $_REQUEST["id"] . "'";
    execIUQueryMySQL($sql_delete);

    echo "true||Membro da equipa apagado com sucesso.";
}

function saveOrderEquipa()
{
    $i = 0;
    foreach ($_REQUEST['membro'] as $value) {
        $sql = "UPDATE sobre_equipa SET display_order = $i WHERE id = $value";
        execIUQueryMySQL($sql);
        $i++;
    }
}