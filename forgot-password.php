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
                    <h1 class="h4 text-gray-900 mb-4">Recuperar password</h1>
                  </div>
                  <form class="user" id="recover-password" method="post">
                    <div class="form-group">
                      <input type="email" class="form-control form-control-user" id="email" aria-describedby="emailHelp" placeholder="E-mail">
                    </div>
                    <div class="form-group">
                      <input class="btn btn-primary btn-user btn-block" type="submit" value="Enviar e-mail de recuperação" form="recover-password">
                    </div>
                    <label id="formError" for="recover-password"></label>
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

    $("#recover-password").on("submit", function(e){
      e.preventDefault();
      var data = {
        email : $("#email").val()
      };
      if(data['email'] == ''){
        erro = 'Introduza o seu e-mail.';
        $('#formError').text(erro);
      }else{
        verifyEmail = checkEmail(data['email']);
        if(!verifyEmail){
          erro = 'O e-mail inserido não é valido.';
          $('#formError').text(erro);
        }else{
          $('#formError').text('');
          $.ajax({
            url : '/ajax/recover-password.php',
            type: "POST",
            data : {email:data['email']},
            dataType:"json",
            success:function(response){
              if(response.success_sent){
                $("#formError").text(response.result);
              }else if(response.error_sent){
                $('#formError').html(response.result);
              }else{
                erro = 'Erro no envio do e-mail.';
                $("#formError").text(erro);
              }
            }
          });
        }
      }
    });
  </script>

</body>

</html>