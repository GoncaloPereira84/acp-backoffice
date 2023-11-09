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
    include '../../components/sidebar.php';
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
            <h1 class="h1 mb-0 text-gray-800">Homepage - Slideshow</h1>
          </div>

          <div class="row">
            <div class="col-lg-12 mb-4">
              <!-- Slideshow -->
              <div id="slideshow" class="card shadow mb-4">
                <div class="card-body">
                  <div id="header" class="row">
                    <div class="col-lg-12" style="display: flex;">
                      <div class="col-lg-1">Título</div>
                      <div class="col-lg-2">Texto</div>
                      <div class="col-lg-2">Botão</div>
                      <div class="col-lg-2">Link</div>
                      <div class="col-lg-2">Link externo?</div>
                      <div class="col-lg-1">Animação SVG</div>
                      <div class="col-lg-2">Imagem estática</div>
                    </div>
                  </div>
                  <div id="slides" class="row">
                  </div>

                  <div class="slideInfo row" style="display: none;">
                    <div class="col-lg-12">
                      <h4 style="margin-top: 30px;">Informação do Slide</h4>
                    </div>
                  </div>

                  <div id="slideInfo" class="row" style="display: none;">
                    <div class="col-lg-12" style="display: flex;">
                      <div class="form-group col-lg-6">
                        <label for="slideshow-title">Título:</label>
                        <input id="slideshow-title" class="form-control" type="text">
                      </div>
                      <div class="form-group col-lg-6">
                        <label for="slideshow-text">Texto:</label>
                        <div id="slideshow-text"></div>
                        <span class="characters slideshow-text">caracteres: <span>150</span></span>
                        <span class="slideshow-text-erro erro"></span>
                      </div>
                    </div>
                    <div class="col-lg-12" style="display: flex;">
                      <div class="form-group col-lg-6">
                        <label for="slideshow-cta">Texto do Botão:</label>
                        <input id="slideshow-cta" class="form-control" type="text">
                      </div>
                      <div class="form-group col-lg-6">
                        <label for="slideshow-link">Link (https://www.exemplo.com):</label>
                        <input id="slideshow-link" class="form-control" type="text">
                        <span class="slideshow-link-erro erro"></span>
                      </div>
                    </div>
                    <div class="col-lg-12" style="display: flex;align-items: center;">
                      <label class="col-lg-2" style="margin: 0;">É um link externo?</label>
                      <div class="form-group col-lg-1" style="margin: 0;padding:0;">
                        <input id="external-link-yes" value="1" type="radio" name="slideshow-l">
                        <label for="external-link-yes" style="margin: 0;">Sim</label>
                      </div>
                      <div class="form-group col-lg-1" style="margin: 0;padding:0;">
                        <input id="external-link-no" value="0" type="radio" name="slideshow-l">
                        <label for="external-link-no" style="margin: 0;">Não</label>
                      </div>
                      
                      <span class="external-link-erro erro"></span>
                    </div>
                    <div class="col-lg-12" style="display: flex;align-items: center;">
                        <label class="col-lg-2" style="margin: 0;" for="slideshow-img">Animação</label>
                        <div class="form-group col-lg-1" style="margin: 0;padding:0;">
                            <input id="slideshow-img-0" value="none" type="radio" name="slideshow-img">
                            <label for="slideshow-img-0" style="margin: 0;">Nenhum</label>
                        </div>
                        <div class="form-group col-lg-1" style="margin: 0;padding:0;">
                            <input id="slideshow-img-1" value="chair" type="radio" name="slideshow-img">
                            <label for="slideshow-img-1" style="margin: 0;">Cadeira</label>
                        </div>
                        <div class="form-group col-lg-1" style="margin: 0;padding:0;">
                            <input id="slideshow-img-2" value="children" type="radio" name="slideshow-img">
                            <label for="slideshow-img-2" style="margin: 0;">Crianças</label>
                        </div>
                        <div class="form-group col-lg-1" style="margin: 0;padding:0;">
                            <input id="slideshow-img-3" value="moon" type="radio" name="slideshow-img">
                            <label for="slideshow-img-3" style="margin: 0;">Lua</label>
                        </div>
                        <div class="form-group col-lg-1" style="margin: 0;padding:0;">
                            <input id="slideshow-img-4" value="frame" type="radio" name="slideshow-img">
                            <label for="slideshow-img-4" style="margin: 0;">Quadro</label>
                        </div>
                        
                        <span class="slideshow-img-erro erro"></span>
                    </div>
                    <div class="col-lg-6" style="display: flex;">
                      <div class="form-group col-lg-12">
                        <label for="slideshow-static-img">Imagem desktop:</label>
                        <input id="slideshow-static-img" class="form-control" name="files" type="file">
                      </div>
                    </div>
                    <div class="col-lg-6" style="display: flex;">
                      <div class="form-group col-lg-12">
                        <label for="slideshow-static-img-mobile">Imagem mobile:</label>
                        <input id="slideshow-static-img-mobile" class="form-control" name="files_mobile" type="file">
                        <span class="slideshow-static-img-mobile erro"></span>
                      </div>
                    </div>

                    <div class="row" style="width: 100%; justify-content: flex-end;">
                        <div class="col-auto">
                            <a id="deleteSlide" class="btn btn-danger btn-icon-split float-right">
                                <span class="icon text-white-50">
                                    <i class="fas fa-trash"></i>
                                </span>
                            </a>
                        </div>
                        <div class="col-auto">
                            <a id="saveSlide" class="btn btn-success btn-icon-split float-right">
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

          <div class="d-sm-flex align-items-center justify-content-between mb-4" style="flex-direction: column; align-items: flex-start !important;">
              <h1 class="h1 mb-0 text-gray-800">Inserir novo slide</h1>
          </div>

          <div id="slideNovoInfo" class="row">
            <div class="col-lg-12" style="display: flex;">
              <div class="form-group col-lg-6">
                <label for="slide-novo-title">Título:</label>
                <input id="slide-novo-title" class="form-control" type="text">
              </div>
              <div class="form-group col-lg-6">
                <label for="slide-novo-text">Texto:</label>
                <div id="slide-novo-text"></div>
                <span class="characters slide-novo-text">caracteres: <span>150</span></span>
                <span class="slide-novo-text-erro erro"></span>
              </div>
            </div>
            <div class="col-lg-12" style="display: flex;">
              <div class="form-group col-lg-6">
                <label for="slide-novo-cta">Texto do Botão:</label>
                <input id="slide-novo-cta" class="form-control" type="text">
              </div>
              <div class="form-group col-lg-6">
                <label for="slide-novo-link">Link (https://www.exemplo.com):</label>
                <input id="slide-novo-link" class="form-control" type="text">
                <span class="slide-novo-link-erro erro"></span>
              </div>
            </div>
            <div class="col-lg-12" style="display: flex;align-items: center;">
              <label class="col-lg-2" style="margin: 0;">É um link externo?</label>
              <div class="form-group col-lg-1" style="margin: 0;padding:0;">
                <input id="external-link-yes" value="1" type="radio" name="slide-novo-l">
                <label for="external-link-yes" style="margin: 0;">Sim</label>
              </div>
              <div class="form-group col-lg-1" style="margin: 0;padding:0;">
                <input id="external-link-no" value="0" type="radio" name="slide-novo-l">
                <label for="external-link-no" style="margin: 0;">Não</label>
              </div>
              
              <span class="external-link-erro erro"></span>
            </div>
            <div class="col-lg-12" style="display: flex;align-items: center;">
                <label class="col-lg-2" style="margin: 0;" for="slide-novo-img">Animação</label>
                <div class="form-group col-lg-1" style="margin: 0;padding:0;">
                    <input id="slide-novo-img-0" value="none" type="radio" name="slide-novo-img">
                    <label for="slide-novo-img-0" style="margin: 0;">Nenhum</label>
                </div>
                <div class="form-group col-lg-1" style="margin: 0;padding:0;">
                    <input id="slide-novo-img-1" value="chair" type="radio" name="slide-novo-img">
                    <label for="slide-novo-img-1" style="margin: 0;">Cadeira</label>
                </div>
                <div class="form-group col-lg-1" style="margin: 0;padding:0;">
                    <input id="slide-novo-img-2" value="children" type="radio" name="slide-novo-img">
                    <label for="slide-novo-img-2" style="margin: 0;">Crianças</label>
                </div>
                <div class="form-group col-lg-1" style="margin: 0;padding:0;">
                    <input id="slide-novo-img-3" value="moon" type="radio" name="slide-novo-img">
                    <label for="slide-novo-img-3" style="margin: 0;">Lua</label>
                </div>
                <div class="form-group col-lg-1" style="margin: 0;padding:0;">
                    <input id="slide-novo-img-4" value="frame" type="radio" name="slide-novo-img">
                    <label for="slide-novo-img-4" style="margin: 0;">Quadro</label>
                </div>
                
                <span class="slide-novo-img-erro erro"></span>
            </div>
            <div class="col-lg-6" style="display: flex;">
              <div class="form-group col-lg-12">
                <label for="slide-novo-static-img">Imagem desktop:</label>
                <input id="slide-novo-static-img" class="form-control" name="files" type="file">
              </div>
            </div>
            <div class="col-lg-6" style="display: flex;">
              <div class="form-group col-lg-12">
                <label for="slide-novo-static-img-mobile">Imagem mobile:</label>
                <input id="slide-novo-static-img-mobile" class="form-control" name="files_mobile" type="file">
                <span class="slide-novo-static-img-mobile erro"></span>
              </div>
            </div>

            <div class="row" style="width: 100%; justify-content: flex-end;">
                <div class="col-auto">
                    <a id="saveNewSlide" class="btn btn-success btn-icon-split float-right">
                        <span class="icon text-white-50">
                        <i class="fas fa-check"></i>
                        </span>
                        <span class="text" style="color: #fff;">Guardar</span>
                    </a>
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
    <script src="js/slideshow.js"></script>

</body>

</html>