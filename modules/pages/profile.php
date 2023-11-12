<!DOCTYPE html>
<html lang="en">

<?php
include '../includes/header.php';
error_reporting(E_ALL);
ini_set('display_errors', '1');

include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

$userInfo = " SELECT * from users
WHERE id = '" . $_SESSION['user_id'] . "'";
$info = execQueryMySQL($userInfo);
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
                        <h1 class="h1 mb-0 text-gray-800">Perfil de utilizador</h1>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 mb-4">
                            <!-- Detalhes -->
                            <div id="details" class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h4 class="m-0 font-weight-bold text-primary">Detalhes da conta</h4>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="form-group col-lg-4">
                                            <label for="details-name">Nome:</label>
                                            <input id="details-name" class="form-control" type="text" value="<?php echo $info[0]['name']; ?>">
                                        </div>
                                        <div class="form-group col-lg-4">
                                            <label for="details-surname">Apelido:</label>
                                            <input id="details-surname" class="form-control" type="text" value="<?php echo $info[0]['surname']; ?>">
                                        </div>
                                        <div class="form-group col-lg-4">
                                            <label for="details-email">E-mail:</label>
                                            <input id="details-email" class="form-control" type="email" value="<?php echo $info[0]['email']; ?>">
                                        </div>
                                    </div>
                                    <div class="row" style="justify-content: flex-end;">
                                        <div class="col-lg-12">
                                            <a id="saveDetails" class="btn btn-success btn-icon-split float-right">
                                                <span class="icon text-white-50">
                                                    <i class="fas fa-check"></i>
                                                </span>
                                                <span class="text" style="color: #fff;">Guardar</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Mudar a password -->
                            <div id="change-password" class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h3 class="m-0 font-weight-bold text-primary">Mudar a password</h3>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="form-group col-lg-4">
                                            <label for="password-old">Password actual:</label>
                                            <input id="password-old" class="form-control" type="password" value="">
                                            <span id="pw-old-error"></span>
                                        </div>
                                        <div class="form-group col-lg-4">
                                            <label for="password-new">Password nova:</label>
                                            <input id="password-new" class="form-control" type="password" value="">
                                            <span id="pw-new-error"></span>
                                        </div>
                                        <div class="form-group col-lg-4">
                                            <label for="password-new-conf">Confirmar password nova:</label>
                                            <input id="password-new-conf" class="form-control" type="password" value="">
                                            <span id="pw-new-conf-error"></span>
                                        </div>
                                    </div>
                                    <div class="row" style="justify-content: flex-end;">
                                        <div class="col-lg-12">
                                            <a id="savePassword" class="btn btn-success btn-icon-split float-right">
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