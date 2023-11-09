<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getConfianca':
        getConfianca();
        break;
    case 'updateConfianca':
        updateConfianca();
        break;
    case 'getConfiancaTopicos':
        getConfiancaTopicos();
        break;
    case 'getAllTopicosByIdTopico':
        getAllTopicosByIdTopico();
        break;
    case 'saveTopico':
        saveTopico();
        break;
    case 'deleteTopico':
        deleteTopico();
        break;
    case 'saveOrderConfiancaTopicos':
        saveOrderConfiancaTopicos();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getConfianca()
{
    $sqlCmd = " SELECT * from sobre_confianca_apresentacao";
    $sobre_confianca_apresentacao = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($sobre_confianca_apresentacao[0]);
}

function updateConfianca()
{
    $title = $_REQUEST['title'];
    $text = $_REQUEST['text'];

    $sql_update = "UPDATE sobre_confianca_apresentacao
    SET title = '" . $title . "',
    text = '" . $text . "'";

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

function getConfiancaTopicos()
{
    $sqlCmd = " SELECT * from sobre_confianca_topicos
    order by display_order asc";
    $sobre_confianca_topicos = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($sobre_confianca_topicos);
}

function getAllTopicosByIdTopico()
{
    $sqlCmd = " SELECT * from sobre_confianca_topicos
    WHERE id = " . $_REQUEST['id_topico'];
    $slide = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($slide);
}

function saveTopico()
{
    $id = $_REQUEST['id'];
    $title = $_REQUEST['title'];
    $text = $_REQUEST['text'];

    if ($id == '') {
        if (isset($_FILES['filesConf'])) {
            $errors = [];
            $path = $_SERVER['DOCUMENT_ROOT']. '/uploads/servicos/'; //to BO online path
            $path1 = explode('backoffice', $_SERVER['DOCUMENT_ROOT'])[0] . 'httpdocs/uploads/servicos/'; //to website online path

            // $path = $_SERVER['DOCUMENT_ROOT'] . '/uploads/servicos/'; //to BO local path
            // $path1 = explode('/acp-bo',$_SERVER['DOCUMENT_ROOT'])[0] . '/acp/uploads/servicos/'; //to website local path
            $extensions = ['jpg', 'jpeg', 'png', 'gif'];

            $all_files = count($_FILES['filesConf']['tmp_name']);

            for ($i = 0; $i < $all_files; $i++) {
                $file_name = $_FILES['filesConf']['name'][$i];
                $file_tmp = $_FILES['filesConf']['tmp_name'][$i];
                $file_type = $_FILES['filesConf']['type'][$i];
                $file_size = $_FILES['filesConf']['size'][$i];
                $file_ext = explode('.', $_FILES['filesConf']['name'][$i]);
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
                        $lastRecordSql = 'SELECT MAX(display_order) 
                        FROM sobre_confianca_topicos';
                        $lastRecord = execQueryMySQL($lastRecordSql);

                        if ($lastRecord[0] == NULL) {
                            $sql_insert = "INSERT INTO sobre_confianca_topicos 
                                (title,
                                text,
                                img_src,
                                display_order) 
                                VALUES
                                ('" . $title . "',
                                '" . $text . "',
                                '" . $file . "',
                                '0');";
                        } else {
                            $sql_insert = "INSERT INTO sobre_confianca_topicos 
                                (title,
                                text,
                                img_src,
                                display_order) 
                                VALUES
                                ('" . $title . "',
                                '" . $text . "',
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
                FROM sobre_confianca_topicos';
            $lastRecord = execQueryMySQL($lastRecordSql);

            if ($lastRecord[0] == NULL) {
                $sql_insert = "INSERT INTO sobre_confianca_topicos 
                    (title,
                    text,
                    display_order) 
                    VALUES
                    ('" . $title . "',
                    '" . $text . "',
                    '0');";
            } else {
                $sql_insert = "INSERT INTO sobre_confianca_topicos 
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
        }
    } else {
        if (isset($_FILES['filesConf'])) {
            $errors = [];
            $path = $_SERVER['DOCUMENT_ROOT']. '/uploads/servicos/'; //to BO online path
            $path1 = explode('backoffice', $_SERVER['DOCUMENT_ROOT'])[0] . 'httpdocs/uploads/servicos/'; //to website online path

            // $path = $_SERVER['DOCUMENT_ROOT'] . '/uploads/servicos/'; //to BO local path
            // $path1 = explode('/acp-bo',$_SERVER['DOCUMENT_ROOT'])[0] . '/acp/uploads/servicos/'; //to website local path
            $extensions = ['jpg', 'jpeg', 'png', 'gif'];

            $all_files = count($_FILES['filesConf']['tmp_name']);

            for ($i = 0; $i < $all_files; $i++) {
                $file_name = $_FILES['filesConf']['name'][$i];
                $file_tmp = $_FILES['filesConf']['tmp_name'][$i];
                $file_type = $_FILES['filesConf']['type'][$i];
                $file_size = $_FILES['filesConf']['size'][$i];
                $file_ext = explode('.', $_FILES['filesConf']['name'][$i]);
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
                        $sql_update = "UPDATE sobre_confianca_topicos
                        SET title = '" . $title . "',
                        text = '" . $text . "',
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
            $sql_update = "UPDATE sobre_confianca_topicos
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
                echo "false||Erro na inserção dos dados.";
            }
        }
    }
}

function deleteTopico()
{
    $sql_delete = "DELETE from sobre_confianca_topicos 
    where id='" . $_REQUEST["id"] . "'";
    execIUQueryMySQL($sql_delete);

    echo "true||Tópico apagado com sucesso.";
}

function saveOrderConfiancaTopicos()
{
    $i = 0;
    foreach ($_REQUEST['topico'] as $value) {
        $sql = "UPDATE sobre_confianca_topicos SET display_order = $i WHERE id = $value";
        execIUQueryMySQL($sql);
        $i++;
    }
}
