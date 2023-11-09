<?php 
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

$response = array();

if(isset($_GET['recover_code'])){
  $sqlCode = "SELECT * from password_change_requests
  where code = '" . $_GET["code"] . "'";
  $code = execQueryMySQL($sqlCode);

  if($code){
    $sqlUser = "SELECT * from users
    where id = '" . $code[0]['users_id'] . "'";
    $user = execQueryMySQL($sqlUser);

    if($user){
      $success = "Password alterada com sucesso.";
      $error = "Erro na alteração da password.";

      $sql_update = "UPDATE users
      SET password = '" . PassEncoder($_POST['newpassrecover']) . "'
      WHERE id = " . $user[0]['id'];

      include_once($_SERVER['DOCUMENT_ROOT'] . '/connection/class.connection.php');
      $db = Database::getInstance();
      $connection = $db->getConnection();

      if ($result = $connection->query($sql_update)) {
          $db->commitAndClose();
          // echo "true||" . json_encode($result);

          $response["result"] = 'Sucesso - update.';
          $response["success_update_pw"] = true;
      } else {
          // $db->rollbackAndClose();
          // echo "false||Erro na inserção dos dados.";

          $response["result"] = 'Erro na inserção dos dados - update.';
          $response["error_update_pw"] = true;
      }
    }
  }
}

?>