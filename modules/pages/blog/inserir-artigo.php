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
                        <h1 class="h1 mb-0 text-gray-800">Blog - Inserir Artigo</h1>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 mb-4">
                            <!-- Blog posts -->
                            <div id="blog-posts" class="card shadow mb-4">
                                <div class="card-body">
                                    <div id="postInfo" class="row">
                                        <div class="col-lg-6" style="display: flex;">
                                            <div class="form-group col-lg-12">
                                                <label for="post-title">Título:</label>
                                                <input id="post-title" class="form-control" type="text">
                                            </div>
                                        </div>
                                        <div class="col-lg-6" style="display: flex;">
                                            <div class="form-group col-lg-12">
                                                <label for="cats-id">Categoria:</label>
                                                <select id="cats-id" class="form-control">
                                                    <option value="null">Escolher categoria...</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-12">
                                                <label for="post-text">Texto:</label>
                                                <div id="post-text"></div>
                                                <span class="post-text-erro erro"></span>
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="post-img">Imagem:</label>
                                                <input id="post-img" class="form-control" name="filesPost[]" type="file">
                                                <span class="post-img-erro erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="post-video">Vídeo (se aplicável):</label>
                                                <input id="video" class="form-control" type="text">
                                                <span>Basta copiar o link do vídeo do YouTube para esta caixa.</span>
                                                <br>
                                                <span>Exemplo: https://www.youtube.com/watch?v=iech2x3V1OQ</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row" style="justify-content: flex-end;">
                                        <div class="col-auto">
                                            <a id="savePost" class="btn btn-success btn-icon-split float-right">
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
    <script src="js/inserir-artigo.js"></script>

</body>

</html>