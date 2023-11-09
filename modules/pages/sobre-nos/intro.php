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
            <h1 class="h1 mb-0 text-gray-800">Sobre Nós</h1>
          </div>

          <div class="row">
            <div class="col-lg-12 mb-4">
              <!-- História -->
              <div id="historia" class="card shadow mb-4">
                <div class="card-header py-3">
                  <h3 class="m-0 font-weight-bold text-primary">História</h3>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="form-group col-lg-6">
                      <label for="historia-text1">Parágrafo 1:</label>
                        <div id="historia-text1"></div>
                        <span class="characters historia-text1">caracteres: <span>300</span></span>
                      <span class="historia-text1-erro erro"></span>
                    </div>
                    <div class="form-group col-lg-6">
                      <label for="historia-text2">Parágrafo 2:</label>
                        <div id="historia-text2"></div>
                        <span class="characters historia-text2">caracteres: <span>300</span></span>
                      <span class="historia-text2-erro erro"></span>
                    </div>
                  </div>
                  <div class="row" style="justify-content: flex-end;">
                    <div class="col-lg-12">
                      <a id="saveHistoria" class="btn btn-success btn-icon-split float-right">
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
  <script src="js/intro.js"></script>

</body>

</html>