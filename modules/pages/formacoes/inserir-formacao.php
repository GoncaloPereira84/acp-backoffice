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
                        <h1 class="h1 mb-0 text-gray-800">Formações</h1>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 mb-4">
                            <!-- Tópicos -->
                            <div id="formacoes" class="card shadow mb-4">
                                <div class="card-body">
                                    <div id="formacaoInfo" class="row">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="formacao-title">Título:</label>
                                                <input type="text" id="formacao-title" class="form-control">
                                                <span class="formacao-title-erro erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="formacao-categoria">Categoria:</label>
                                                <select id="formacao-categoria" class="form-control">
                                                    <option value="null">Seleccione...</option>
                                                </select>
                                                <span class="formacao-categoria-erro erro"></span>
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="formacao-text">Resumo:</label>
                                                <div id="formacao-text"></div>
                                                <span class="characters formacao-text">caracteres: <span>300</span></span>
                                                <span class="formacao-text-erro erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="formacao-imagem">Imagem:</label>
                                                <input id="formacao-imagem" class="form-control" name="filesFormacoes[]" type="file">
                                                <span class="formacao-imagem-erro erro"></span>
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-12">
                                                <label for="formacao-about">Sobre a formação:</label>
                                                <div id="formacao-about"></div>
                                                <span class="formacao-about-erro erro"></span>
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-12">
                                                <label for="formacao-why">Programa:</label>
                                                <div id="formacao-why"></div>
                                                <span class="formacao-why-erro erro"></span>
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-3">
                                                <label for="formacao-date-start">Data início:</label>
                                                <input id="formacao-date-start" class="form-control" type="date">
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="formacao-date-end">Data fim:</label>
                                                <input id="formacao-date-end" class="form-control" type="date">
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="formacao-date-fim-insc">Data limite para inscrições:</label>
                                                <input id="formacao-date-fim-insc" class="form-control" type="date">
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="formacao-date-aviso">Data limite de contacto:</label>
                                                <input id="formacao-date-aviso" class="form-control" type="date">
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-4" style="display: flex; flex-direction: column;">
                                                <label for="formacao-is-full" style="margin-right: 10px;">Vagas preenchidas?</label>
                                                <div style="margin-right: 10px;">
                                                    <label for="formacao-sim-full">Sim</label>
                                                    <input id="formacao-sim-full" name="destaque" value="1" type="radio">
                                                </div>
                                                <div style="margin-right: 10px;">
                                                    <label for="formacao-nao-full">Não</label>
                                                    <input id="formacao-nao-full" name="destaque" value="0" type="radio">
                                                </div>
                                            </div>
                                            <div class="form-group col-lg-4" style="display: flex; flex-direction: column;">
                                                <label for="formacao-last-vagas" style="margin-right: 10px;">Últimas vagas?</label>
                                                <div style="margin-right: 10px;">
                                                    <label for="formacao-sim-vagas">Sim</label>
                                                    <input id="formacao-sim-vagas" name="destaque1" value="1" type="radio">
                                                </div>
                                                <div style="margin-right: 10px;">
                                                    <label for="formacao-nao-vagas">Não</label>
                                                    <input id="formacao-nao-vagas" name="destaque1" value="0" type="radio">
                                                </div>
                                            </div>
                                            <div class="form-group col-lg-4" style="display: flex; flex-direction: column;">
                                                <label for="formacao-visible" style="margin-right: 10px;">Visível?</label>
                                                <div style="margin-right: 10px;">
                                                    <label for="formacao-sim-visible">Sim</label>
                                                    <input id="formacao-sim-visible" name="destaque2" value="1" type="radio">
                                                </div>
                                                <div style="margin-right: 10px;">
                                                    <label for="formacao-nao-visible">Não</label>
                                                    <input id="formacao-nao-visible" name="destaque2" value="0" type="radio">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row" style="justify-content: flex-end;">
                                        <div class="col-auto">
                                            <a id="saveFormacao" class="btn btn-success btn-icon-split float-right">
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

    <script src="js/inserir-formacao.js"></script>

</body>

</html>