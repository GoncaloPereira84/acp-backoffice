<?php
// include $_SERVER['DOCUMENT_ROOT'] . '/functions/mysql_funcs.php';

date_default_timezone_set('EUROPE/LISBON');

function generatePassword($length = 8)
{
    $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $count = mb_strlen($chars);
    for ($i = 0, $result = ''; $i < $length; $i++) {
        $index = rand(0, $count - 1);
        $result .= mb_substr($chars, $index, 1);
    }
    return $result;
}
function PassEncoder($value)
{
    return password_hash($value, PASSWORD_DEFAULT);
}

function cleanVariable($var)
{
    global $connection;
    return utf8_decode(strip_tags($connection->real_escape_string($var)));
}

function getRecuperarPass($code)
{
    $html = '';
    if ($code == '') {
        $html .= '<div class="text-center">';
        $html .= '<h1 class="h4 text-gray-900 mb-2">Esqueceu a password?</h1>';
        $html .= '<p class="mb-4">Para recuperar a sua password, basta preencher o campo abaixo. Receberá no seu e-mail um link para proceder à mudança da password.</p>';
        $html .= '</div>';
        $html .= '<form class="user">';
        $html .= '<div class="form-group">';
        $html .= '<input type="email" class="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Introduza o e-mail...">';
        $html .= '</div>';
        $html .= '<a href="login.php" class="btn btn-primary btn-user btn-block">';
        $html .= 'Recuperar Password';
        $html .= '</a>';
        $html .= '</form>';
    } else {
        $userpass = " SELECT * from password_change_requests
            WHERE code = '" . $code . "'";
        $password_change_requests = execQueryMySQL($userpass);

        echo $password_change_requests;

        $html .= '<div class="text-center">';
        $html .= '<h1 class="h4 text-gray-900 mb-2">Alterar password</h1>';
        $html .= '<p class="mb-4">Altere a sua password no formulário abaixo.</p>';
        $html .= '</div>';
        $html .= '<form class="user">';
        $html .= '<div class="form-group">';
        $html .= '<input type="password" class="form-control form-control-user" id="newPw" aria-describedby="newPwHelp" placeholder="Introduza a nova password...">';
        $html .= '</div>';
        $html .= '<div class="form-group">';
        $html .= '<input type="password" class="form-control form-control-user" id="newPwConf" aria-describedby="newPwConfHelp" placeholder="Confirme a password...">';
        $html .= '</div>';
        $html .= '<a href="login.php" class="btn btn-primary btn-user btn-block">';
        $html .= 'Alterar Password';
        $html .= '</a>';
        $html .= '</form>';
    }

    return $html;
}


// $fieldValues["ref"] = isset($fieldValues["title"]) ? CleanToRef($fieldValues["title"]) : CleanToRef($fieldValues["nome"]);

function CleanToRef($str, $replace=array(), $delimiter='-') {
    setlocale(LC_ALL, 'en_US.UTF8');
    if( !empty($replace) ) {
        $str = str_replace((array)$replace, ' ', $str);
    }
    $str = (trim(TruncateRef(strip_tags($str))));
    $clean = iconv('UTF-8', 'ASCII//TRANSLIT', $str);
    $clean = preg_replace("/[^a-zA-Z0-9\/_|+ -]/", '', $clean);
    $clean = strtolower(trim($clean, '-'));
    $clean = preg_replace("/[\/_|+ -]+/", $delimiter, $clean);

    return $clean;
}


function TruncateRef($string, $limit=100, $break=".", $pad="...")
{
  // return with no change if string is shorter than $limit
  if(strlen($string) <= $limit) return $string;

  // is $break present between $limit and the end of the string?
  if(false !== ($breakpoint = strpos($string, $break, $limit))) {
    if($breakpoint < strlen($string) - 1) {
      $string = substr($string, 0, $breakpoint) . $pad;
    }
  }

  return $string;
}