<?php
require_once('../tools/tools.php');
require_once('../tools/password.php');

$response = array();

if (isset($_SESSION["user_id"])) {
    unset($_SESSION["user_id"]);
    setcookie(session_name(), '', 100);
    unset($_SESSION);
    session_unset();
    session_destroy();
}
$response["success"] = true;

echo json_encode($response);
