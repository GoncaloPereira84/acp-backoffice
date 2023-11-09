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
                        <h1 class="h1 mb-0 text-gray-800">Serviços</h1>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 mb-4">
                            <!-- Tópicos -->
                            <div id="servicos" class="card shadow mb-4">
                                <div class="card-body">
                                    <div id="header" class="row">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="col-lg-4">Título</div>
                                            <div class="col-lg-4">Resumo</div>
                                            <div class="col-lg-4">Ícone</div>
                                        </div>
                                    </div>
                                    <div id="servicosList" class="row">
                                    </div>

                                    <div class="servicoInfo row" style="display:none;">
                                        <div class="col-lg-12">
                                            <h4 style="margin-top: 30px;">Informação do Serviço</h4>
                                        </div>
                                    </div>
                                    <div id="servicoInfo" class="row" style="display:none;">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="servico-titulo">Título:</label>
                                                <input type="text" id="servico-titulo"class="form-control">
                                                <span class="servico-titulo-erro erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="servico-sigla">Sigla:</label>
                                                <input type="text" id="servico-sigla"class="form-control">
                                                <span class="servico-sigla-erro erro"></span>
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="servico-resumo">Resumo:</label>
                                                <div id="servico-resumo"></div>
                                                <span class="characters servico-resumo">caracteres: <span>300</span></span>
                                                <span class="servico-resumo-erro erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="servico-icone">Ícone:</label>
                                                <input id="servico-icone" class="form-control" name="filesServices[]" type="file">
                                                <span class="servico-icone-erro erro"></span>
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="servico-about">Sobre:</label>
                                                <div id="servico-about"></div>
                                                <span class="servico-about-erro erro"></span>
                                            </div>

                                            <div class="form-group col-lg-6">
                                                <label for="servico-why">Porquê:</label>
                                                <div id="servico-why"></div>
                                                <span class="servico-why-erro erro"></span>
                                            </div>
                                        </div>
                                        
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-12">
                                                <label for="servico-share">Queríamos muito partilhar consigo:</label>
                                                <div id="servico-share"></div>
                                                <span class="servico-share-erro erro"></span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row" style="justify-content: flex-end;">
                                        <div class="col-auto">
                                            <a id="deleteServico" class="btn btn-danger btn-icon-split float-right">
                                                <span class="icon text-white-50">
                                                    <i class="fas fa-trash"></i>
                                                </span>
                                            </a>
                                        </div>
                                        <div class="col-auto">
                                            <a id="saveServico" class="btn btn-success btn-icon-split float-right">
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

    <script src="js/servicos.js"></script>

</body>

</html>