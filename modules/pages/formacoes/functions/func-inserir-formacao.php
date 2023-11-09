<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/tools/tools.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getCategoria':
        getCategoria();
        break;
    case 'saveFormacao':
        saveFormacao();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getCategoria()
{
    $sqlCmd = "SELECT * from formacoes_categorias";
    $cats = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($cats);
}

function saveFormacao()
{
    $title = $_REQUEST['title'];
    $text = $_REQUEST['text'];
    $about = $_REQUEST['about'];
    $why = $_REQUEST['why'];
    $date_start	= $_REQUEST['date_start'];
    $date_end = $_REQUEST['date_end'];
    $date_fim_insc = $_REQUEST['date_fim_insc'];
    $date_aviso = $_REQUEST['date_aviso'];
    $is_full = $_REQUEST['is_full'];
    $last_vagas = $_REQUEST['last_vagas'];
    $is_visible = $_REQUEST['is_visible'];
    $categoria_id = $_REQUEST['categoria_id'];
    $slug = CleanToRef($title);

    if (isset($_FILES['filesFormacoes'])) {
        $errors = [];
        $path = $_SERVER['DOCUMENT_ROOT']. '/uploads/formacoes/'; //to BO online path

        $path1 = explode('backoffice', $_SERVER['DOCUMENT_ROOT'])[0] . 'httpdocs/uploads/formacoes/'; //to website online path
        // $path1 = explode('backoffice.anacarolinapereira.pt', $_SERVER['DOCUMENT_ROOT'])[0] . '/uploads/formacoes/'; //to website online path

        // $path = $_SERVER['DOCUMENT_ROOT'] . '/uploads/formacoes/'; //to BO local path
        // $path1 = explode('/acp-bo',$_SERVER['DOCUMENT_ROOT'])[0] . '/acp/uploads/formacoes/'; //to website local path
        $extensions = ['jpg', 'jpeg', 'png', 'gif'];

        $all_files = count($_FILES['filesFormacoes']['tmp_name']);

        for ($i = 0; $i < $all_files; $i++) {
            $file_name = $_FILES['filesFormacoes']['name'][$i];
            $file_tmp = $_FILES['filesFormacoes']['tmp_name'][$i];
            $file_type = $_FILES['filesFormacoes']['type'][$i];
            $file_size = $_FILES['filesFormacoes']['size'][$i];
            $file_ext = explode('.', $_FILES['filesFormacoes']['name'][$i]);
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
                    FROM formacoes';
                    $lastRecord = execQueryMySQL($lastRecordSql);

                    if ($lastRecord[0] == NULL) {
                        $sql_insert = "INSERT INTO formacoes 
                            (title,
                            text,
                            about,
                            why,
                            date_start,
                            date_end,
                            date_fim_insc,
                            date_aviso,
                            img_src,
                            is_full,
                            last_vagas,
                            is_visible,
                            categoria_id,
                            slug,
                            display_order) 
                            VALUES
                            ('" . $title . "',
                            '" . $text . "',
                            '" . $about . "',
                            '" . $why . "',
                            '" . $date_start . "',
                            '" . $date_end . "',
                            '" . $date_fim_insc . "',
                            '" . $date_aviso . "',
                            '" . $file . "',
                            '" . $is_full . "',
                            '" . $last_vagas . "',
                            '" . $is_visible . "',
                            '" . $categoria_id . "',
                            '" . $slug . "',
                            '0');";
                    } else {
                        $sql_insert = "INSERT INTO formacoes 
                            (title,
                            text,
                            about,
                            why,
                            date_start,
                            date_end,
                            date_fim_insc,
                            date_aviso,
                            img_src,
                            is_full,
                            last_vagas,
                            is_visible,
                            categoria_id,
                            slug,
                            display_order) 
                            VALUES
                            ('" . $title . "',
                            '" . $text . "',
                            '" . $about . "',
                            '" . $why . "',
                            '" . $date_start . "',
                            '" . $date_end . "',
                            '" . $date_fim_insc . "',
                            '" . $date_aviso . "',
                            '" . $file . "',
                            '" . $is_full . "',
                            '" . $last_vagas . "',
                            '" . $is_visible . "',
                            '" . $categoria_id . "',
                            '" . $slug . "',
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
            FROM formacoes';
        $lastRecord = execQueryMySQL($lastRecordSql);

        if ($lastRecord[0] == NULL) {
            $sql_insert = "INSERT INTO formacoes 
                (title,
                text,
                about,
                why,
                date_start,
                date_end,
                date_fim_insc,
                date_aviso,
                is_full,
                last_vagas,
                is_visible,
                categoria_id,
                slug,
                display_order) 
                VALUES
                ('" . $title . "',
                '" . $text . "',
                '" . $about . "',
                '" . $why . "',
                '" . $date_start . "',
                '" . $date_end . "',
                '" . $date_fim_insc . "',
                '" . $date_aviso . "',
                '" . $is_full . "',
                '" . $last_vagas . "',
                '" . $is_visible . "',
                '" . $categoria_id . "',
                '" . $slug . "',
                '0');";
        } else {
            $sql_insert = "INSERT INTO formacoes 
                (title,
                text,
                about,
                why,
                date_start,
                date_end,
                date_fim_insc,
                date_aviso,
                is_full,
                last_vagas,
                is_visible,
                categoria_id,
                slug,
                display_order) 
                VALUES
                ('" . $title . "',
                '" . $text . "',
                '" . $about . "',
                '" . $why . "',
                '" . $date_start . "',
                '" . $date_end . "',
                '" . $date_fim_insc . "',
                '" . $date_aviso . "',
                '" . $is_full . "',
                '" . $last_vagas . "',
                '" . $is_visible . "',
                '" . $categoria_id . "',
                '" . $slug . "',
                " . $lastRecord[0]["MAX(display_order)"] . " + 1);";
        }

        include_once($_SERVER['DOCUMENT_ROOT'] . '/connection/class.connection.php');;
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
}