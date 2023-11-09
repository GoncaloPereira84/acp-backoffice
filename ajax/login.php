<?php
// require_once($_SERVER['DOCUMENT_ROOT'] . "/tools/tools.php");
include $_SERVER['DOCUMENT_ROOT'] . '/functions/mysql_funcs.php';
// require_once('tools/tools.php');

$response = array();

if (isset($_POST['email']) && isset($_POST['password'])) {
    // global $mysqli;
    $userEmail = $connection->real_escape_string($_POST['email']);
    $userPwd = $connection->real_escape_string($_POST['password']);

    $userpass = " SELECT * from users
    WHERE email = '" . $userEmail . "'";
    $check_email = execQueryMySQL($userpass);

    $check_pw = password_verify($userPwd, $check_email[0]["password"]);

    if (!$check_email) {
        $erro = 'Este e-mail não se encontra registado.';
        $response['result'] = $erro;
        $response['error'] = true;
    } else {
        if ($check_pw == false) {
            $erro = 'Os dados não estão corretos.';
            $response['result'] = $erro;
            $response['error'] = true;
        } else {
            session_start();
            $_SESSION["login"] = true;
            $_SESSION["user_id"] = $check_email[0]["id"];
            $_SESSION["username"] = $check_email[0]["username"];
            $_SESSION["webmaster"] = $check_email[0]["webmaster"];
            $response['result'] = "Login Sucesso.";
            $response["success"] = true;
        }
    }
} else {
    $erro = 'Preencha o campo email e o campo password.';
    $response['result'] = $erro;
    $response['error'] = true;
}
echo json_encode($response);
