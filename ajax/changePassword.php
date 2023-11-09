<?php
require_once('../tools/tools.php');
// require_once('../tools/password.php');

$response = array();
$html = "";

if (!isset($_SESSION)) session_start();
if (!isset($_SESSION["login"])) $_SESSION["login"] = false;

if ($_POST) {
    // $user = MySqlSelectSingle("users","*",array('id'=>$_SESSION['user_id']));
    $userpass = " SELECT * from users
    WHERE id = '" . $_SESSION['user_id'] . "'";
    $user = execQueryMySQL($userpass);

    #verificar se os campos de alterar password estão vazios.
    if ($_POST['old'] != '' && $_POST['new'] != '' && $_POST['newC'] != '') {
        global $connection;
        $password = mysqli_real_escape_string($connection, $_POST['old']);
        $hashedpwd = password_hash($password, PASSWORD_DEFAULT);
        $check_password = password_verify($password, $user[0]["password"]);

        $passworNew = $connection->real_escape_string($_POST["new"]);
        $check_passworNew = password_verify($passworNew, $user[0]["password"]);

        if ($check_password == false) {
            #verificar se o campo da password antiga é igual à password actual
            $erro = 'A password inserida não corresponde à atual.';

            $response['result'] = $erro;
            $response["error_pw"] = true;
        } else {
            #verificar se a nova password é diferente da actual.
            if ($check_passworNew == true) {
                $erro = 'A nova password deve ser diferente da atual.';

                $response['result'] = $erro;
                $response["error_nova_pw"] = true;
            } else {
                $pass_old = $_POST['old'];
                $pass_new = cleanVariable($_POST['new']);
                $pass_newCon = $_POST['newC'];
                #verificar se a nova password tem menos de 6 caracteres.
                if (strlen($pass_new) < 6) {
                    $erro = 'A nova password deve ter, pelo menos, 6 caracteres.';

                    $response['result'] = $erro;
                    $response["error_nova_pw_6"] = true;
                } else {
                    #verificar se a nova password e a confirmação são diferentes.
                    if ($pass_new != $pass_newCon) {
                        $erro = 'As passwords não correspondem.';

                        $response['result'] = $erro;
                        $response["error_nova_pw_c"] = true;
                    } else {
                        #se os passos anteriores estão bem, então a password é actualizada.
                        // $updateUser = MySqlUpdate("users", array('password' => PassEncoder($pass_new)), array('id' => $_SESSION['user_id']));
                        $update = " UPDATE users
                        SET password = '" . PassEncoder($pass_new) . "'
                        WHERE id = '" . $_SESSION['user_id'] . "'";
                        // $userUpdate = execIUQueryMySQL($update);

                        include_once('../connection/class.connection.php');
                        $db = Database::getInstance();
                        $connection = $db->getConnection();

                        if ($result = $connection->query($update)) {
                            $db->commitAndClose();
                        } else {
                            $db->rollbackAndClose();
                        }

                        if ($result) {
                            $erro = 'Password alterada com sucesso.';

                            $response['result'] = $erro;
                            $response["success"] = true;
                        } else {
                            $erro = 'Ocorreu um erro na atualização da password.';

                            $response['result'] = $erro;
                            $response["error"] = true;
                        }
                    }
                }
            }
        }
    }
}
echo json_encode($response);
