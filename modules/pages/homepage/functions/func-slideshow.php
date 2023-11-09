<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getSlideshowHomepage':
        getSlideshowHomepage();
        break;
    case 'getAllSlidesByIdSlide':
        getAllSlidesByIdSlide();
        break;
    case 'saveSlide':
        saveSlide();
        break;
    case 'saveNewSlide':
        saveNewSlide();
        break;
    case 'deleteSlide':
        deleteSlide();
        break;
    case 'saveOrderSlide':
        saveOrderSlide();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getSlideshowHomepage()
{
    $sqlCmd = " SELECT * from home_slideshow
    order by display_order asc";
    $home_slideshow = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($home_slideshow);
}

function getAllSlidesByIdSlide()
{
    $sqlCmd = " SELECT * from home_slideshow
    WHERE id = " . $_REQUEST['id_slide'];
    $slide = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($slide);
}

function saveSlide()
{
    $id = $_REQUEST['id'];
    $title = $_REQUEST['title'];
    $content = $_REQUEST['content'];
    $cta = $_REQUEST['cta_txt'];
    $link = $_REQUEST['link'];
    $img = $_REQUEST['img'];
    $is_external = $_REQUEST['is_external'];

    // var_dump($is_external);

    if ($id == '') {
        if (isset($_FILES['files'])) {
            $errors = [];
            $path = $_SERVER['DOCUMENT_ROOT']. '/uploads/slideshow/'; //to BO online path
            $path1 = explode('backoffice', $_SERVER['DOCUMENT_ROOT'])[0] . 'httpdocs/uploads/slideshow/'; //to website online path
            // $path1 = 'https://backoffice.anacarolinapereira.pt/uploads/slideshow/'; //to website online path

            // $path = $_SERVER['DOCUMENT_ROOT'] . '/uploads/slideshow/'; //to BO local path
            // $path1 = explode('/acp-bo',$_SERVER['DOCUMENT_ROOT'])[0] . '/acp/uploads/slideshow/'; //to website local path
            $extensions = ['jpg', 'jpeg', 'png', 'gif', 'JPG', 'JPEG', 'PNG'];

            $file_name = $_FILES['files']['name'];
            $file_tmp = $_FILES['files']['tmp_name'];
            $file_type = $_FILES['files']['type'];
            $file_size = $_FILES['files']['size'];
            $file_ext = explode('.', $_FILES['files']['name']);
            $ext = end($file_ext);

            $file = $path . $file_name;
            $file1 = $path1 . $file_name;

            if(isset($_FILES['files_mobile'])){
                $file_name_mb = $_FILES['files_mobile']['name'];
                $file_tmp_mb = $_FILES['files_mobile']['tmp_name'];
                $file_type_mb = $_FILES['files_mobile']['type'];
                $file_size_mb = $_FILES['files_mobile']['size'];
                $file_ext_mb = explode('.', $_FILES['files_mobile']['name']);
                $ext_mb = end($file_ext_mb);

                $file_mb = $path . $file_name_mb;
                $file1_mb = $path1 . $file_name_mb;
            } else {
                $file1_mb = '';
            }

            

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

                if(isset($_FILES['files_mobile'])){
                    move_uploaded_file($file_tmp_mb, $file_mb);
                    copy($file_mb, $file1_mb);
                }                
                if ($file) {
                    $lastRecordSql = 'SELECT MAX(display_order) 
                        FROM home_slideshow';
                    $lastRecord = execQueryMySQL($lastRecordSql);

                    if ($lastRecord[0] == NULL) {
                        $sql_insert = "INSERT INTO home_slideshow 
                                (title,
                                text,
                                cta_txt,
                                link,
                                img,
                                static_img,
                                img_mobile,
                                display_order,
                                is_external) 
                                VALUES
                                ('" . $title . "',
                                '" . $content . "',
                                '" . $cta . "',
                                '" . $link . "',
                                '" . $img . "',
                                '" . $file . "',
                                '" . $file_mb . "',
                                '0',
                                ' . $is_external . ');";
                    } else {
                        $sql_insert = "INSERT INTO home_slideshow 
                                (title,
                                text,
                                cta_txt,
                                link,
                                img,
                                static_img,
                                img_mobile,
                                display_order,
                                is_external) 
                                VALUES
                                ('" . $title . "',
                                '" . $content . "',
                                '" . $cta . "',
                                '" . $link . "',
                                '" . $img . "',
                                '" . $file . "',
                                '" . $file_mb . "',
                                " . $lastRecord[0]["MAX(display_order)"] . " + 1,
                                ' . $is_external . ');";
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
            // }
        } else {
            $lastRecordSql = 'SELECT MAX(display_order) 
                FROM home_slideshow';
            $lastRecord = execQueryMySQL($lastRecordSql);

            if ($lastRecord[0] == NULL) {
                $sql_insert = "INSERT INTO home_slideshow 
                    (title,
                    text,
                    cta_txt,
                    link,
                    img,
                    display_order,
                    is_external) 
                    VALUES
                    ('" . $title . "',
                    '" . $content . "',
                    '" . $cta . "',
                    '" . $link . "',
                    '" . $img . "',
                    '0',
                    ' . $is_external . ');";
            } else {
                $sql_insert = "INSERT INTO home_slideshow 
                    (title,
                    text,
                    cta_txt,
                    link,
                    img,
                    display_order,
                    is_external) 
                    VALUES
                    ('" . $title . "',
                    '" . $content . "',
                    '" . $cta . "',
                    '" . $link . "',
                    '" . $img . "',
                    " . $lastRecord[0]["MAX(display_order)"] . " + 1,
                    ' . $is_external . ');";
            }

            include_once('../connection/class.connection.php');
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
        if (isset($_FILES['files'])) {
            $errors = [];
            
            $path = $_SERVER['DOCUMENT_ROOT']. '/uploads/slideshow/'; //to BO online path
            $path1 = explode('backoffice', $_SERVER['DOCUMENT_ROOT'])[0] . 'httpdocs/uploads/slideshow/'; //to website online path

            // $path = $_SERVER['DOCUMENT_ROOT'] . '/uploads/slideshow/'; //to BO local path
            // $path1 = explode('/acp-bo',$_SERVER['DOCUMENT_ROOT'])[0] . '/acp/uploads/slideshow/'; //to website local path

            $extensions = ['jpg', 'jpeg', 'png', 'gif', 'JPG', 'JPEG', 'PNG'];

            $file_name = $_FILES['files']['name'];
            $file_tmp = $_FILES['files']['tmp_name'];
            $file_type = $_FILES['files']['type'];
            $file_size = $_FILES['files']['size'];
            $file_ext = explode('.', $_FILES['files']['name']);
            $ext = end($file_ext);

            $file = $path . $file_name;
            $file1 = $path1 . $file_name;

            if(isset($_FILES['files_mobile'])){
                $file_name_mb = $_FILES['files_mobile']['name'];
                $file_tmp_mb = $_FILES['files_mobile']['tmp_name'];
                $file_type_mb = $_FILES['files_mobile']['type'];
                $file_size_mb = $_FILES['files_mobile']['size'];
                $file_ext_mb = explode('.', $_FILES['files_mobile']['name']);
                $ext_mb = end($file_ext_mb);

                $file_mb = $path . $file_name_mb;
                $file1_mb = $path1 . $file_name_mb;
            } else {
                $file1_mb = '';
            }

            if (!in_array($ext, $extensions)) {
                $errors[] = 'Extensão de ficheiro não permitida: ' . $file_name . ' ' . $file_type;
            }

            if ($file_size > 2097152) {
                $errors[] = 'O tamanho do ficheiro excede o limite de 2MB: ' . $file_name . ' ' . $file_size;
            }

            if ($file_size == 0) {
                $errors[] = 'Não é possível ler o ficheiro: ' . $file_name . ' ' . $file_type;
            }

            if (empty($errors)) {
                move_uploaded_file($file_tmp, $file);
                copy($file, $file1);

                if(isset($_FILES['files_mobile'])){
                    move_uploaded_file($file_tmp_mb, $file_mb);
                    copy($file_mb, $file1_mb);
                } else {
                    $file1_mb = '';
                }

                
                if ($file) {
                    $sql_update = "UPDATE home_slideshow
                            SET title = '" . $title . "',
                            text = '" . $content . "',
                            cta_txt = '" . $cta . "',
                            link = '" . $link . "',
                            img = '" . $img . "',
                            static_img = '" . $file . "',
                            img_mobile = '" . $file_mb . "',
                            is_external = " . $is_external . "
                            WHERE id = " . $id;

                            // print_r($sql_update);

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
            // }
        } else {
            $sql_update = "UPDATE home_slideshow
                SET title = '" . $title . "',
                text = '" . $content . "',
                cta_txt = '" . $cta . "',
                link = '" . $link . "',
                img = '" . $img . "',
                is_external = ' . $is_external . '
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

function deleteSlide()
{
    $sql_delete = "DELETE from home_slideshow 
    where id='" . $_REQUEST["id"] . "'";
    execIUQueryMySQL($sql_delete);

    echo "true||Slide apagado com sucesso.";
}

function saveOrderSlide()
{
    $i = 0;
    foreach ($_REQUEST['slide'] as $value) {
        $sql = "UPDATE home_slideshow SET display_order = $i WHERE id = $value";
        execIUQueryMySQL($sql);
        $i++;
    }
}

function saveNewSlide()
{
    $id = $_REQUEST['id'];
    $title = $_REQUEST['title'];
    $content = $_REQUEST['content'];
    $cta = $_REQUEST['cta_txt'];
    $link = $_REQUEST['link'];
    $img = $_REQUEST['img'];
    $is_external = $_REQUEST['is_external'];

    if (isset($_FILES['files'])) {
        $errors = [];
        $path = $_SERVER['DOCUMENT_ROOT']. '/uploads/slideshow/'; //to BO online path
        $path1 = explode('backoffice', $_SERVER['DOCUMENT_ROOT'])[0] . 'httpdocs/uploads/slideshow/'; //to website online path

        $extensions = ['jpg', 'jpeg', 'png', 'gif', 'JPG', 'JPEG', 'PNG'];

        $file_name = $_FILES['files']['name'];
        $file_tmp = $_FILES['files']['tmp_name'];
        $file_type = $_FILES['files']['type'];
        $file_size = $_FILES['files']['size'];
        $file_ext = explode('.', $_FILES['files']['name']);
        $ext = end($file_ext);

        $file = $path . $file_name;
        $file1 = $path1 . $file_name;

        if(isset($_FILES['files_mobile'])){
            $file_name_mb = $_FILES['files_mobile']['name'];
            $file_tmp_mb = $_FILES['files_mobile']['tmp_name'];
            $file_type_mb = $_FILES['files_mobile']['type'];
            $file_size_mb = $_FILES['files_mobile']['size'];
            $file_ext_mb = explode('.', $_FILES['files_mobile']['name']);
            $ext_mb = end($file_ext_mb);

            $file_mb = $path . $file_name_mb;
            $file1_mb = $path1 . $file_name_mb;
        } else {
            $file1_mb = '';
        }


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

            if(isset($_FILES['files_mobile'])){
                move_uploaded_file($file_tmp_mb, $file_mb);
                copy($file_mb, $file1_mb);
            }                
            if ($file) {
                $lastRecordSql = 'SELECT MAX(display_order) 
                    FROM home_slideshow';
                $lastRecord = execQueryMySQL($lastRecordSql);

                if ($lastRecord[0] == NULL) {
                    $sql_insert = "INSERT INTO home_slideshow 
                            (title,
                            text,
                            cta_txt,
                            link,
                            img,
                            static_img,
                            img_mobile,
                            display_order,
                            is_external) 
                            VALUES
                            ('" . $title . "',
                            '" . $content . "',
                            '" . $cta . "',
                            '" . $link . "',
                            '" . $img . "',
                            '" . $file . "',
                            '" . $file_mb . "',
                            '0',
                            ' . $is_external . ');";
                } else {
                    $sql_insert = "INSERT INTO home_slideshow 
                            (title,
                            text,
                            cta_txt,
                            link,
                            img,
                            static_img,
                            img_mobile,
                            display_order,
                            is_external) 
                            VALUES
                            ('" . $title . "',
                            '" . $content . "',
                            '" . $cta . "',
                            '" . $link . "',
                            '" . $img . "',
                            '" . $file . "',
                            '" . $file_mb . "',
                            " . $lastRecord[0]["MAX(display_order)"] . " + 1,
                            ' . $is_external . ');";
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
    } else {
        $lastRecordSql = 'SELECT MAX(display_order) 
            FROM home_slideshow';
        $lastRecord = execQueryMySQL($lastRecordSql);

        if ($lastRecord[0] == NULL) {
            $sql_insert = "INSERT INTO home_slideshow 
                (title,
                text,
                cta_txt,
                link,
                img,
                display_order,
                is_external) 
                VALUES
                ('" . $title . "',
                '" . $content . "',
                '" . $cta . "',
                '" . $link . "',
                '" . $img . "',
                '0',
                ' . $is_external . ');";
        } else {
            $sql_insert = "INSERT INTO home_slideshow 
                (title,
                text,
                cta_txt,
                link,
                img,
                display_order,
                is_external) 
                VALUES
                ('" . $title . "',
                '" . $content . "',
                '" . $cta . "',
                '" . $link . "',
                '" . $img . "',
                " . $lastRecord[0]["MAX(display_order)"] . " + 1,
                ' . $is_external . ');";
        }

        include_once('../connection/class.connection.php');
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