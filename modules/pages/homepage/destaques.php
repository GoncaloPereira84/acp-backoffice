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
                        <h1 class="h1 mb-0 text-gray-800">Homepage - Destaques</h1>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 mb-4">
                            <!-- Destaques -->
                            <div id="destaques" class="card shadow mb-4">
                                <div class="card-body">
                                    <div id="header" class="row">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="col-lg-2">Título</div>
                                            <div class="col-lg-1">Categoria</div>
                                            <div class="col-lg-2">Imagem</div>
                                        </div>
                                    </div>
                                    <div id="destaquesList" class="row">
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-12">
                                            <h4 style="margin-top: 30px;">Adicionar Destaque</h4>
                                        </div>
                                    </div>
                                    <div id="destaqueInfo" class="row">
                                        <div class="col-lg-6" style="display: flex;">
                                            <div class="form-group col-lg-12">
                                                <label for="destaque-id">Categoria:</label>
                                                <select id="destaque-id" class="form-control">
                                                    <option value="null">Escolher categoria...</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div id="formacoes" class="col-lg-6" style="display: none;">
                                            <div class="form-group col-lg-12">
                                                <label for="destaque-form-id">Formação:</label>
                                                <select id="destaque-form-id" class="form-control">
                                                    <option value="null">Escolher formação...</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div id="blogPosts" class="col-lg-6" style="display: none;">
                                            <div class="form-group col-lg-12">
                                                <label for="destaque-blog-id">Artigo:</label>
                                                <select id="destaque-blog-id" class="form-control">
                                                    <option value="null">Escolher artigo...</option>
                                                </select>
                                            </div>
                                        </div>

                                        <input id="destaque-blog-title" type="hidden">
                                        <input id="destaque-blog-text" type="hidden">
                                        <input id="destaque-blog-img" type="hidden">
                                        <input id="destaque-blog-url" type="hidden">
                                        
                                        <input id="destaque-formacao-title" type="hidden">
                                        <input id="destaque-formacao-text" type="hidden">
                                        <input id="destaque-formacao-categoria" type="hidden">
                                        <input id="destaque-formacao-date-start" type="hidden">
                                        <input id="destaque-formacao-date-end" type="hidden">
                                        <input id="destaque-formacao-full" type="hidden">
                                        <input id="destaque-formacao-vagas" type="hidden">
                                        <input id="destaque-formacao-img" type="hidden">
                                        <input id="destaque-formacao-url" type="hidden">
                                    </div>

                                    <div class="row" style="justify-content: flex-end;">
                                        <div class="col-auto">
                                            <a id="deleteDestaque" class="btn btn-danger btn-icon-split float-right">
                                                <span class="icon text-white-50">
                                                    <i class="fas fa-trash"></i>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="col-auto">
                                            <a id="saveDestaque" class="btn btn-success btn-icon-split float-right">
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
    <script src="js/destaques.js"></script>

</body>

</html>