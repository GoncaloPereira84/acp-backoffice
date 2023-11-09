<!DOCTYPE html>
<html lang="en">

<?php
include 'modules/includes/header.php'
?>

<body class="bg-gradient-primary">

  <div class="container">

    <!-- Outer Row -->
    <div class="row justify-content-center">

      <div class="col-xl-10 col-lg-12 col-md-9">

        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Mudar password</h1>
                  </div>
                  <form class="user" id="recuperar-form-r" method="post">
                    <div class="form-group">
                      <input type="email" class="form-control form-control-user" id="recover_password_email" placeholder="E-mail">
                      <label class='nova-email erro'></label>
                    </div>
                    <div class="form-group">
                      <input type="password" class="form-control form-control-user" id="recover_password" placeholder="Password nova">
                      <label class='pw-nova erro'></label>
                    </div>
                    <div class="form-group">
                      <input type="password" class="form-control form-control-user" id="recover_password_confirm" placeholder="Confirmar password nova">
                      <label class='pw-nova-conf erro'></label>
                    </div>
                    <div class="form-group">
                      <input class="btn btn-primary btn-user btn-block" type="submit" value="Alterar password" form="recuperar-form-r">
                    </div>
                    <label id="formError" for="recuperar-form-r"></label>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>

  <?php
  include 'modules/includes/js-includes.php'
  ?>

  <script>
    function checkEmail($email) {
      var filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
      return filter.test($email);
    }

    $("#recuperar-form-r").on("submit", function(e){
      e.preventDefault();
      var myParam = location.search.split('recover_code=')[1];
      var data = {
          emailrecover : $("#recover_password_email").val(),
          newpassrecover : $("#recover_password").val(),
          confirmnewpassrecover : $("#recover_password_confirm").val(),
          code : myParam
      };

      var verifyEmail = false;
      var confirm_pw = false;
        if(data["newpassrecover"] != ''){
          $("label.pw-nova").text('');
          if(data["newpassrecover"].length < 6){
            $("input#recover_password").focus();
            erro = 'A nova password deve ter, pelo menos, 6 caracteres.';
            $("label.pw-nova").text(erro);
            $("input#recover_password").val('');
            $("input#recover_password_confirm").val('');
          }else{
            $("label.pw-nova").text("");
            if(data["newpassrecover"] == data["confirmnewpassrecover"]){
              confirm_pw = true;
              $("label.pw-nova-conf").text("");
            }else if(data["newpassrecover"] != data["confirmnewpassrecover"] && data["confirm"] != ""){
              $("input#recover_password").focus();
              erro = 'As palavras-passe não correspondem.';
              $("label.pw-nova-conf").text(erro);
              $("input#recover_password").val('');
              $("input#recover_password_confirm").val('');
            }else if(data["confirmnewpassrecover"] == ""){
              $("input#recover_password_confirm").focus();
              erro = 'Confirme a password nova.';
              $("label.pw-nova-conf").text(erro);
            }
          }
        }else{
          $("input#recover_password").focus();
          erro = 'Introduza a password nova.';
          $("label.pw-nova").text(erro);
        }
        
          if(data['emailrecover'] != ''){
            verifyEmail = checkEmail(data['emailrecover']);
            if(!verifyEmail){
                erro = 'O e-mail inserido não é valido.';
                $('label.nova-email').text(erro);
            }
          }else{
            $("input#recover_password_email").focus();
            erro = 'Introduza o seu e-mail.';
            $('label.nova-email').text(erro);
          }
          
          if(confirm_pw == true && verifyEmail == true){
          $.ajax({
              url : '/ajax/recover-password.php',
              type: "POST",
              data : data,
              dataType: "json",
              success: function (response){
                if(response.error_update_pw){
                  $("label#formError").text(response.result);
                }else if(response.success_update_pw){
                  $('label#formError').text(response.result);

                  setTimeout(() => {
                    window.location.href = "https://backoffice.anacarolinapereira.pt/login.php";
                  }, 1000);
                }else{
                  erro = 'Erro na actualização da palavra-passe.';
                  $("label#formError").text(erro);
                }
              }
          });
          }
      });
  </script>

</body>

</html>