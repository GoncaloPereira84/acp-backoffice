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
            <h1 class="h1 mb-0 text-gray-800">Equipa</h1>
          </div>

          <div class="row">
            <div class="col-lg-12 mb-4">
              <!-- Equipa -->
              <div id="equipa" class="card shadow mb-4">
                <div class="card-body">
                  <div id="header" class="row">
                    <div class="col-lg-12" style="display: flex;">
                      <div class="col-lg-1">Nome</div>
                      <div class="col-lg-1">Cargo</div>
                      <div class="col-lg-3">Texto</div>
                      <div class="col-lg-3">Imagem</div>
                    </div>
                  </div>
                  <div id="equipaList" class="row">
                  </div>

                  <div class="equipaInfo row" style="display:none;">
                    <div class="col-lg-12">
                      <h4 style="margin-top: 30px;">Informação do membro da Equipa</h4>
                    </div>
                  </div>
                  <div id="equipaInfo" class="row" style="display:none;">
                    <div class="col-lg-12" style="display: flex;">
                      <div class="form-group col-lg-6">
                        <label for="equipa-name">Nome:</label>
                        <input id="equipa-name" class="form-control" type="text">
                      <span class="equipa-name-erro erro"></span>
                      </div>
                      <div class="form-group col-lg-6">
                        <label for="equipa-cargo">Cargo:</label>
                        <input id="equipa-cargo" class="form-control" type="text">
                      <span class="equipa-cargo-erro erro"></span>
                      </div>
                    </div>
                    <div class="col-lg-12" style="display: flex;">
                      <div class="form-group col-lg-12">
                        <label for="equipa-text">Texto:</label>
                        <div id="equipa-text"></div>
                        <span class="characters equipa-text">caracteres: <span>1600</span></span>
                      <span class="equipa-text-erro erro"></span>
                      </div>
                    </div>
                    <div class="col-lg-12" style="display: flex;">
                      <div class="form-group col-lg-12">
                        <label for="equipa-img">Imagem:</label>
                        <input id="equipa-img" class="form-control" name="filesEquipa[]" type="file">
                      </div>
                    </div>
                  </div>

                  <div class="row" style="justify-content: flex-end;">
                    <div class="col-auto">
                      <a id="addEquipa" class="btn btn-primary btn-icon-split float-right">
                        <span class="icon text-white-50">
                          <i class="fas fa-plus"></i>
                        </span>
                      </a>
                    </div>
                    <div class="col-auto">
                      <a id="deleteEquipa" class="btn btn-danger btn-icon-split float-right">
                        <span class="icon text-white-50">
                          <i class="fas fa-trash"></i>
                        </span>
                      </a>
                    </div>
                    <div class="col-auto">
                      <a id="saveEquipa" class="btn btn-success btn-icon-split float-right">
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
  <script src="js/equipa.js"></script>

</body>

</html>