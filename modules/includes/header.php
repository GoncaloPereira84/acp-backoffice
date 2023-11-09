<?php
$splitURI = explode('/', $_SERVER['REQUEST_URI']);
// var_dump($splitURI);

$path = '';
if (!isset($_SESSION)) session_start();
if (!isset($_SESSION["login"])) $_SESSION["login"] = false;

// if ($_SERVER['CONTEXT_DOCUMENT_ROOT'] == '/var/www/vhosts/anacarolinapereira.pt/backoffice') {
  if (isset($splitURI[1])) {
    $path = '';
  }

  if (isset($splitURI[2])) {
    $path = '';
  }

  if (isset($splitURI[3])) {
    $path = '../../';
  }

  if (isset($splitURI[4])) {
    $path = '../../../';
  }

  if (!isset($_SESSION["user_id"]) && $_SESSION["login"] == false) {
    // if ($splitURI[1] == '' || isset($splitURI[3]) || isset($splitURI[4])) {
    if ($splitURI[1] == '') {
      header('location: /login.php');
    }
  }
// } else {
//   if (isset($splitURI[1])) {
//     $path = '';
//   }

//   if (isset($splitURI[2])) {
//     $path = '';
//   }

//   if (isset($splitURI[4])) {
//     $path = '../../';
//   }

//   if (isset($splitURI[5])) {
//     $path = '../../../';
//   }

//   // if (!isset($_SESSION["user_id"]) && $_SESSION["login"] == false && !isset($_SESSION["session_user"])) {
//   //   if ($splitURI[2] == '' || isset($splitURI[4]) || isset($splitURI[5])) {
//   //     header('location: /login.php');
//   //   }
//   // }
// }

include $path . 'tools/tools.php';
// require_once($_SERVER['DOCUMENT_ROOT'] . "/tools/tools.php");
?>

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>Ana Carolina Pereira - Gestão de Conteúdos</title>

  <!-- Custom fonts for this template-->
  <link href="<?php echo $path ?>vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

  <!-- Custom styles for this template-->
  <link href="<?php echo $path ?>css/sb-admin-2.css" rel="stylesheet">
  <link href="<?php echo $path ?>css/main.css" rel="stylesheet">
  <link href="<?php echo $path ?>css/homepage.css" rel="stylesheet">

  <link href="<?php echo $path ?>vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet">

  <link rel="stylesheet" href="<?php echo $path ?>dist/dist/summernote-bs4.css" />
  <link rel="stylesheet" href="<?php echo $path ?>dist/dist/summernote.css" />
  <link rel="stylesheet" href="<?php echo $path ?>dist/dist/summernote-lite.css" />
</head>