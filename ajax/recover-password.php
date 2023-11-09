<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

$response = array();

function random_string($length = 10){

    $characters = '0123456789abcdefghijklmnopqrstuvwxyz';
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }

    $sqlCmd = "SELECT * from password_change_requests
    where code = " . $randomString;
    $code = execQueryMySQL($sqlCmd);

    if(empty($code)){
    	return $randomString;
    } else{
    	return random_string();
    }
}

function PassEncoder($value){
	return password_hash($value,PASSWORD_DEFAULT);
}

if(isset($_POST['email'])){
  $sqlUser = "SELECT * from users
  where email = '" . $_POST["email"] . "'";
  $user = execQueryMySQL($sqlUser);

  $nome = $user[0]['name']." ".$user[0]['surname'];
	if(empty($user)){
      $subject = "Recuperação de password - Backoffice - Ana Carolina Pereira.";
      $message = "<p>Apesar deste e-mail não estar registado no Backoffice - Ana Carolina Pereira foi solicitado um pedido de recuperação de palavra-passe desta conta.<br>
         		Se continuar a receber e-mails semelhantes a este por favor entre em contacto através do e-mail de <a href='mailto:suporte@twobecreative.pt'>suporte</a>.<p>";
	}else{
    $data_request = date("'Y-m-d H:i:s'");
		$random_code = random_string(15);
		$ip = $_SERVER['REMOTE_ADDR'];

    $sql_insert = "INSERT INTO password_change_requests
      (users_id,
      code,
      ip,
      time)
      VALUES
      ('" . $user[0]["id"] . "',
      '" . $random_code . "',
      '" . $_SERVER['REMOTE_ADDR'] . "',
      " . $data_request . ");";

    include_once($_SERVER['DOCUMENT_ROOT'] . '/connection/class.connection.php');
    $db = Database::getInstance();
    $connection = $db->getConnection();

    if ($result = $connection->query($sql_insert)) {
        $db->commitAndClose();

        $subject = "Recuperação de password - Backoffice - Ana Carolina Pereira";
        $message = "<html>
            <head>
            </head>
            <body>
              Olá ".$nome."</br>
              <p>Solicitou a recuperação da password para acesso ao Backoffice - Ana Carolina Pereira. Por favor, clique no link em baixo ou copie-o para o seu browser e siga as instruções.</p></br>
              http://backoffice.anacarolinapereira.pt/change-password.php?recover_code=".$random_code."
              </br>
              <p>Se não solicitou a alteração da password, por motivos de segurança, aconselhamos que o faça porque alguém pode ter tentado aceder à sua conta.</p>
              </br>
              <p>Este e-mail foi enviado automaticamente, por favor não responda.</p></br>
              </br>
              <p>Obrigado,</p>
              <p>Backoffice - Ana Carolina Pereira</p>
            </body>
        </html>";

        require_once ($_SERVER['DOCUMENT_ROOT']."/tools/PHPMailer/PHPMailerAutoload.php");
        $mail = new PHPMailer(true);
        $mail->CharSet = "utf8";

        $mail->Host = 'anacarolinapereira.pt';
        $mail->Encoding = 'base64';
        $mail->CharSet = 'UTF-8';
        $mail->SMTPAuth = false;
        $mail->Port = 8080;
        $mail->setFrom("no-reply@anacarolinapereira.pt","No Reply - Ana Carolina Pereira");
        $mail->addAddress($user[0]['email']);
        $mail->isHTML(true);

        $mail->Subject = $subject;
        $mail->Body    = $message;

        if(!$mail->send()) {
          $erro = "Erro no envio do e-mail de recuperação. Contacte o Administrador do Site.";

          $response["result"] = $erro;
          $response["error_sent"] = true;
        }else{
          $erro = "E-mail de recuperação enviado.";

          $response["result"] = $erro;
          $response["success_sent"] = true;
        }
    } else {
        $db->rollbackAndClose();
        $response["result"] = 'Erro na inserção dos dados - connect.';
        $response["error_connect"] = true;
    }
	}
}else if(isset($_POST['emailrecover']) && isset($_POST['newpassrecover']) && isset($_POST['confirmnewpassrecover']) && isset($_POST['code'])){
  $sqlCode = "SELECT * from password_change_requests
  where code = '" . $_POST["code"] . "'";
  $code = execQueryMySQL($sqlCode);

  // print_r($code);

  if($code){
    $sqlUser = "SELECT * from users
    where id = " . $code[0]['users_id'] . "
    and email = '" . $_POST['emailrecover'] . "'";
    $user = execQueryMySQL($sqlUser);

    // print_r($sqlUser);

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
          $response["result"] = $success;
          $response["success_update_pw"] = true;
      } else {
          $response["result"] = $error;
          $response["error_update_pw"] = true;
      }
    }
  }
}else{
  $response["result"] = 'Ocorreu um erro, tente novamente.';
	$response["error"] = true;
}

echo json_encode($response);
?>