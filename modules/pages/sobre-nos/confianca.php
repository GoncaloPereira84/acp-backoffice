<!DOCTYPE html>
<html lang="en">

<?php
include '../../includes/header.php'
?>

<body id="page-top">

  <!-- Page Wrapper -->
  <div id="wrapper">

    <!-- Sidebar -->
    <?php
    include '../../components/sidebar.php'
    ?>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">

      <!-- Main Content -->
      <div id="content">

        <!-- Topbar -->
        <?php
        include '../../includes/topbar.php'
        ?>
        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid">

          <!-- Page Heading -->
          <div class="d-sm-flex align-items-center justify-content-between mb-4" style="flex-direction: column; align-items: flex-start !important;">
            <h1 class="h1 mb-0 text-gray-800">Confiança</h1>
          </div>

          <div class="row">
            <div class="col-lg-12 mb-4">
              <!-- Confiança Apresentação -->
              <div id="confianca-apresentacao" class="card shadow mb-4">
                <div class="card-body">
                  <div class="row">
                    <div class="form-group col-lg-12">
                      <label for="conf-title">Título:</label>
                      <input id="conf-title" class="form-control" type="text">
                      <span class="conf-title-erro erro"></span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-lg-12">
                      <label for="conf-text">Texto:</label>
                      <div id="conf-text"></div>
                      <span class="characters conf-text">caracteres: <span>400</span></span>
                      <span class="conf-text-erro erro"></span>
                    </div>
                  </div>
                  <div class="row" style="justify-content: flex-end;">
                    <div class="col-lg-12">
                      <a id="saveConfiancaApr" class="btn btn-success btn-icon-split float-right">
                        <span class="icon text-white-50">
                          <i class="fas fa-check"></i>
                        </span>
                        <span class="text" style="color: #fff;">Guardar</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Confiança Tópicos -->
              <div id="confianca-topicos" class="card shadow mb-4">
                <div class="card-header py-3">
                  <h3 class="m-0 font-weight-bold text-primary">Tópicos</h3>
                </div>
                <div class="card-body">
                  <div id="header" class="row">
                    <div class="col-lg-12" style="display: flex;">
                      <div class="col-lg-3">Título</div>
                      <div class="col-lg-3">Texto</div>
                      <div class="col-lg-3">Imagem</div>
                    </div>
                  </div>
                  <div id="confiancaList" class="row">
                  </div>

                  <div class="confiancaInfo row" style="display:none;">
                    <div class="col-lg-12">
                      <h4 style="margin-top: 30px;">Informação do Tópico</h4>
                    </div>
                  </div>
                  <div id="confiancaInfo" class="row" style="display:none;">
                    <div class="col-lg-12" style="display: flex;">
                      <div class="form-group col-lg-12">
                        <label for="conf-topico-title">Título:</label>
                        <input id="conf-topico-title" class="form-control" type="text">
                        <span class="conf-topico-title-erro erro"></span>
                      </div>
                    </div>
                    <div class="col-lg-12" style="display: flex;">
                      <div class="form-group col-lg-12">
                        <label for="conf-topico-text">Texto:</label>
                        <div id="conf-topico-text"></div>
                        <span class="characters conf-topico-text">caracteres: <span>200</span></span>
                        <span class="conf-topico-text-erro erro"></span>
                      </div>
                    </div>
                    <div class="col-lg-12" style="display: flex;">
                      <div class="form-group col-lg-12">
                        <label for="conf-topico-img">Imagem:</label>
                        <input id="conf-topico-img" class="form-control" name="filesConf[]" type="file">
                        <span class="conf-topico-img-erro erro"></span>
                      </div>
                    </div>
                  </div>

                  <div class="row" style="justify-content: flex-end;">
                    <div class="col-auto">
                      <a id="deleteConfTopico" class="btn btn-danger btn-icon-split float-right">
                        <span class="icon text-white-50">
                          <i class="fas fa-trash"></i>
                        </span>
                      </a>
                    </div>
                    <div class="col-auto">
                      <a id="saveConfTopico" class="btn btn-success btn-icon-split float-right">
                        <span class="icon text-white-50">
                          <i class="fas fa-check"></i>
                        </span>
                        <span class="text" style="color: #fff;">Guardar</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <!-- /.container-fluid -->

      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <?php
      include '../../includes/footer.php'
      ?>
      <!-- End of Footer -->

    </div>
    <!-- End of Content Wrapper -->

  </div>
  <!-- End of Page Wrapper -->

  <!-- Scroll to Top Button-->
  <?php
  include '../../components/scroll-to-top-btn.php'
  ?>

  <!-- Logout Modal-->
  <?php
  include '../../components/logout-modal.php'
  ?>

  <?php
  include '../../includes/js-includes.php'
  ?>
  <script src="js/confianca.js"></script>

</body>

</html>