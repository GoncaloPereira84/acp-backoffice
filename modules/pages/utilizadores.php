<!DOCTYPE html>
<html lang="en">

<?php
include '../includes/header.php';
error_reporting(E_ALL);
ini_set('display_errors', '1');
?>

<body id="page-top">

    <!-- Page Wrapper -->
    <div id="wrapper">

        <!-- Sidebar -->
        <?php
        include '../components/sidebar.php'
        ?>
        <!-- End of Sidebar -->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <!-- Topbar -->
                <?php
                include '../includes/topbar.php'
                ?>
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <div class="container-fluid">

                    <!-- Page Heading -->
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h1 mb-0 text-gray-800">Utilizadores</h1>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 mb-4">
                            <!-- Slideshow -->
                            <!-- <div id="slideshow" class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h4 class="m-0 font-weight-bold text-primary">Slideshow</h4>
                                </div>
                                <div class="card-body">
                                    <div id="header" class="row">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="col-lg-2">ID</div>
                                            <div class="col-lg-2">Título</div>
                                            <div class="col-lg-2">Texto</div>
                                            <div class="col-lg-2">CTA</div>
                                            <div class="col-lg-2">Link</div>
                                            <div class="col-lg-2">Imagem</div>
                                        </div>
                                    </div>
                                    <div id="slides" class="row">
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-12">
                                            <h4 style="margin-top: 30px;">Informação do Slide</h4>
                                        </div>
                                    </div>
                                    <div id="slideInfo" class="row">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-4">
                                                <label for="slideshow-title">Título:</label>
                                                <input id="slideshow-title" class="form-control" type="text">
                                            </div>
                                            <div class="form-group col-lg-8">
                                                <label for="slideshow-text">Texto:</label>
                                                <input id="slideshow-text" class="form-control" type="text">
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="slideshow-cta">Texto do CTA:</label>
                                                <input id="slideshow-cta" class="form-control" type="text">
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="slideshow-link">Link:</label>
                                                <input id="slideshow-link" class="form-control" type="text">
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-12">
                                                <label for="slideshow-img">Imagem</label>
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-1">
                                                <input id="slideshow-img-1" value="chair" type="radio" name="slideshow-img">
                                                <label for="slideshow-img-1">Cadeira</label>
                                            </div>
                                            <div class="form-group col-lg-1">
                                                <input id="slideshow-img-2" value="children" type="radio" name="slideshow-img">
                                                <label for="slideshow-img-2">Crianças</label>
                                            </div>
                                            <div class="form-group col-lg-1">
                                                <input id="slideshow-img-3" value="moon" type="radio" name="slideshow-img">
                                                <label for="slideshow-img-3">Lua</label>
                                            </div>
                                            <div class="form-group col-lg-1">
                                                <input id="slideshow-img-4" value="frame" type="radio" name="slideshow-img">
                                                <label for="slideshow-img-4">Quadro</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row" style="justify-content: flex-end;">
                                        <div class="col-lg-12">
                                            <a id="saveSlide" class="btn btn-success btn-icon-split float-right">
                                                <span class="icon text-white-50">
                                                    <i class="fas fa-check"></i>
                                                </span>
                                                <span class="text" style="color: #fff;">Guardar</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </div>

                </div>
                <!-- /.container-fluid -->

            </div>
            <!-- End of Main Content -->

            <!-- Footer -->
            <?php
            include '../includes/footer.php'
            ?>
            <!-- End of Footer -->

        </div>
        <!-- End of Content Wrapper -->

    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <?php
    include '../components/scroll-to-top-btn.php'
    ?>

    <!-- Logout Modal-->
    <?php
    include '../components/logout-modal.php'
    ?>

    <?php
    include '../includes/js-includes.php'
    ?>
    <!-- <script src="../../js-pages/homepage.js"></script> -->

</body>

</html>