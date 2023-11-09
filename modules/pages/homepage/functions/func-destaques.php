<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getListaCatsDestaques':
        getListaCatsDestaques();
        break;
    case 'getDestaques':
        getDestaques();
        break;
    case 'getCategoria':
        getCategoria();
        break;
    case 'getFormacoes':
        getFormacoes();
        break;
    case 'getBlogPosts':
        getBlogPosts();
        break;
    case 'getAllDestaquesByIdDestaque':
        getAllDestaquesByIdDestaque();
        break;
    case 'saveDestaque':
        saveDestaque();
        break;
    case 'deleteDestaque':
        deleteDestaque();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getListaCatsDestaques()
{
    $sqlCmd = "SELECT * from destaques_categorias
    order by name asc";
    $formacao_details = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($formacao_details);
}

function getCategoria()
{
    $sqlCmd = "SELECT * from formacoes_categorias";
    $cats = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($cats);
}

function getDestaques()
{
    $sqlCmd = "SELECT * from destaques_homepage";
    $blog_posts = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($blog_posts);
}

function getFormacoes()
{
    $sqlCmd = "SELECT *,
    formacoes_topicos.id as tps_id,
    formacoes_topicos.title as tps_title,
    formacao_details.id as tp_id,
    formacao_details.title as tp_title
    from formacoes_topicos
    inner join home_formacoes on home_formacoes.id = formacoes_topicos.formacao_id
    inner join formacao_details on formacao_details.topico_id = formacoes_topicos.id
    inner join formacoes_categorias on formacoes_categorias.id = home_formacoes.categoria_id";
    $cats = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($cats);
}

function getBlogPosts()
{
    $sqlCmd = "SELECT *
    from blog_posts
    order by date desc";
    $cats = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($cats);
}

function getAllDestaquesByIdDestaque()
{
    $sqlCmd = " SELECT * from destaques_homepage
    WHERE id = " . $_REQUEST['id_destaque'];
    $post = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($post);
}

function saveDestaque()
{
    $cat_id = $_REQUEST['cat_id'];
    $formacao_title = $_REQUEST['formacao_title'];
    $formacao_text = $_REQUEST['formacao_text'];
    $formacao_categoria = $_REQUEST['formacao_categoria'];
    $date_start = $_REQUEST['date_start'];
    $date_end = $_REQUEST['date_end'];
    $is_full = $_REQUEST['is_full'];
    $last_vagas = $_REQUEST['last_vagas'];
    $formacao_img = $_REQUEST['formacao_img'];
    $formacao_url = $_REQUEST['formacao_url'];
    $blog_title = $_REQUEST['blog_title'];
    $blog_text = $_REQUEST['blog_text'];
    $blog_img = $_REQUEST['blog_img'];
    $blog_url = $_REQUEST['blog_url'];
    
    if($formacao_title != 'null') {
        $title = $formacao_title;
        $text = $formacao_text;
        $cat_form = $formacao_categoria;
        $ds = $date_start == 0000-00-00 ? '1970-01-01' : $date_start;
        $de = $date_end == 0000-00-00 ? '1970-01-01' : $date_end;
        $if = $is_full;
        $lv = $last_vagas;
        $img = $formacao_img;
        $url = $formacao_url;
    }

    if($blog_title != 'null') {
        $title = $blog_title;
        $text = $blog_text;
        $cat_form = 'null';
        $ds = '0000-00-00';
        $de = '0000-00-00';
        $if = 'null';
        $lv = 'null';
        $img = $blog_img;
        $url = $blog_url;
    }

    $text_strip = strip_tags($text);
    $text_short = substr($text_strip,0,160);

    $lastRecordSql = 'SELECT MAX(display_order) 
        FROM destaques_homepage';
    $lastRecord = execQueryMySQL($lastRecordSql);

    if ($lastRecord[0]["MAX(display_order)"] == NULL) {
        $sql_insert = "INSERT INTO destaques_homepage 
            (title,
            text,
            categoria_destaque_id,
            img_src,
            url_code,
            formacao_categoria_id,
            date_start,
            date_end,
            is_full,
            last_vagas,
            display_order) 
            VALUES
            ('" . $title . "',
            '" . $text_short . "',
            '" . $cat_id . "',
            '" . $img . "',
            '" . $url . "',
            " . $cat_form . ",
            '" . $ds . "',
            '" . $de . "',
            " . $if . ",
            " . $lv . ",
            0);";
    } else {
        $sql_insert = "INSERT INTO destaques_homepage 
            (title,
            text,
            categoria_destaque_id,
            img_src,
            url_code,
            formacao_categoria_id,
            date_start,
            date_end,
            is_full,
            last_vagas,
            display_order) 
            VALUES
            ('" . $title . "',
            '" . $text_short . "',
            '" . $cat_id . "',
            '" . $img . "',
            '" . $url . "',
            " . $cat_form . ",
            '" . $ds . "',
            '" . $de . "',
            " . $if . ",
            " . $lv . ",
            " . $lastRecord[0]["MAX(display_order)"] . " + 1);";

            // var_dump($sql_insert);
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

function deleteDestaque()
{
    $sql_delete = "DELETE from destaques_homepage 
    where id='" . $_REQUEST["id"] . "'";
    execIUQueryMySQL($sql_delete);

    echo "true||Destaque apagado com sucesso.";
}
