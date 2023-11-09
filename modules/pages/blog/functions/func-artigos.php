<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/tools/tools.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getBlogCats':
        getBlogCats();
        break;
    case 'getBlogPosts':
        getBlogPosts();
        break;
    case 'getAllPostsByIdPost':
        getAllPostsByIdPost();
        break;
    case 'savePost':
        savePost();
        break;
    case 'deletePost':
        deletePost();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getBlogCats()
{
    $sqlCmd = "SELECT * from blog_posts_categorias
    order by valor asc";
    $formacao_details = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($formacao_details);
}

function getBlogPosts()
{
    $sqlCmd = "SELECT * from blog_posts
    order by date desc";
    $blog_posts = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($blog_posts);
}

function getAllPostsByIdPost()
{
    $sqlCmd = " SELECT * from blog_posts
    WHERE id = " . $_REQUEST['id_post'];
    $post = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($post);
}

function savePost()
{
    $id = $_REQUEST['id'];
    $title = $_REQUEST['title'];
    $text = $_REQUEST['text'];
    $video = $_REQUEST['video'];
    $slug = CleanToRef($title);
    $cat_id = $_REQUEST['cat_id'];

    if ($id == '') {
        echo 'false||Para inserir um novo artigo terá de aceder a Blog > Inserir Artigo.';
    } else {
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
                        $sql_update = "UPDATE blog_posts
                            SET title = '" . $title . "',
                            text = '" . $text . "',
                            img_src = 'https://www.anacarolinapereira.pt" . explode('backoffice', $file)[1] . "',
                            url_code = '" . $slug . "',
                            categoria_id = '" . $cat_id . "'
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
            $sql_update = "UPDATE blog_posts
                SET title = '" . $title . "',
                text = '" . $text . "',
                video_src = '" . $video . "',
                url_code = '" . $slug . "',
                categoria_id = '" . $cat_id . "'
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

function deletePost()
{
    $sql_delete = "DELETE from blog_posts 
    where id='" . $_REQUEST["id"] . "'";
    execIUQueryMySQL($sql_delete);

    echo "true||Post apagado com sucesso.";
}