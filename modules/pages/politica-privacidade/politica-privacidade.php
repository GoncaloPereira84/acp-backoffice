<!DOCTYPE html>
<html lang="en">

<?php
include '../../includes/header.php';
error_reporting(E_ALL);
ini_set('display_errors', '1');
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
            <h1 class="h1 mb-0 text-gray-800">Política de Privacidade e Protecção de Dados</h1>
          </div>

          <div class="row">
            <div class="col-lg-12 mb-4">

              <!-- Política de Privacidade -->
              <div id="pp" class="card shadow mb-4">
                <div class="card-body">
                  <div id="header" class="row">
                    <div class="col-lg-12" style="display: flex;">
                      <div class="col-lg-6">Título</div>
                    </div>
                  </div>
                  <div id="ppList" class="row">
                  </div>

                  <div class="row ppInfo" style="display:none;">
                    <div class="col-lg-12">
                      <h4 style="margin-top: 30px;">Informação do tópico</h4>
                    </div>
                  </div>
                  <div id="ppInfo" class="row" style="display:none;">
                    <div class="col-lg-12" style="display: flex; flex-direction: column;">
                      <div class="form-group col-lg-12" style="flex:0;">
                        <label for="pp-title">Título:</label>
                        <input id="pp-title" class="form-control" type="text">
                        <span class="pp-title-erro erro"></span>
                      </div>
                      <div class="form-group col-lg-12">
                        <label for="pp-text">Texto:</label>
                        <div id="pp-text"></div>
                        <span class="pp-text-erro erro"></span>
                      </div>
                    </div>
                  </div>

                  <div class="row" style="justify-content: flex-end;">
                    <div class="col-auto">
                      <a id="deletePP" class="btn btn-danger btn-icon-split float-right">
                        <span class="icon text-white-50">
                          <i class="fas fa-trash"></i>
                        </span>
                      </a>
                    </div>
                    <div class="col-auto">
                      <a id="savePP" class="btn btn-success btn-icon-split float-right">
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
  <script src="js/politica-privacidade.js"></script>

</body>

</html>