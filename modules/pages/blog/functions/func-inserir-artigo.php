<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/tools/tools.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getBlogCats':
        getBlogCats();
        break;
    case 'savePost':
        savePost();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getBlogCats()
{
    $sqlCmd = "SELECT * from blog_posts_categorias";
    $blog_posts = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($blog_posts);
}

function savePost()
{
    $title = $_REQUEST['title'];
    $date = date("Y-m-d");
    $text = $_REQUEST['text'];
    $video = $_REQUEST['video'];
    $slug = CleanToRef($title);
    $cat_id = $_REQUEST['cat_id'];

    if (isset($_FILES['filesPost'])) {
        $errors = [];
        $path = $_SERVER['DOCUMENT_ROOT']. '/uploads/blog/'; //to BO online path
        $path1 = explode('backoffice', $_SERVER['DOCUMENT_ROOT'])[0] . 'httpdocs/uploads/blog/'; //to website online path
        // $path1 = explode('backoffice.anacarolinapereira.pt', $_SERVER['DOCUMENT_ROOT'])[0] . '/uploads/blog/'; //to website online path
        // $path = $_SERVER['DOCUMENT_ROOT'] . '/uploads/blog/'; //to BO local path
        // $path1 = explode('/acp-bo',$_SERVER['DOCUMENT_ROOT'])[0] . '/acp/uploads/blog/'; //to website local path
        $extensions = ['jpg', 'jpeg', 'png', 'gif'];

        $all_files = count($_FILES['filesPost']['tmp_name']);

        for ($i = 0; $i < $all_files; $i++) {
            $file_name = $_FILES['filesPost']['name'][$i];
            $file_tmp = $_FILES['filesPost']['tmp_name'][$i];
            $file_type = $_FILES['filesPost']['type'][$i];
            $file_size = $_FILES['filesPost']['size'][$i];
            $file_ext = explode('.', $_FILES['filesPost']['name'][$i]);
            $ext = end($file_ext);

            $file = $path . $file_name;
            $file1 = $path1 . $file_name;

            // print_r(explode('backoffice', $file)[1]);

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

                    $sql_insert = "INSERT INTO blog_posts 
                        (title,
                        date,
                        text,
                        categoria_id,
                        img_src,
                        url_code) 
                        VALUES
                        ('" . $title . "',
                        '" . $date . "',
                        '" . $text . "',
                        '" . $cat_id . "',
                        'https://www.anacarolinapereira.pt" . explode('backoffice', $file)[1] . "',
                        '" . $slug . "');";

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
        $sql_insert = "INSERT INTO blog_posts 
            (title,
            date,
            text,
            catgoria_id,
            url_code,
            video_src) 
            VALUES
            ('" . $title . "',
            '" . $date . "',
            '" . $text . "',
            '" . $cat_id . "',
            '" . $slug . "',
            '" . $video . "');";

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
}