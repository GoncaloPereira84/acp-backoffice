<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion col-lg-2" id="accordionSidebar">

    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="<?php echo $path ?>index.php">
        <div class="sidebar-brand-icon" style="height: 100%;">
            <img src="<?php echo $path ?>img/logo-branco.png" alt="" style="height: 100%;">
        </div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0">

    <!-- Nav Item - Dashboard -->
    <li class="nav-item active">
        <a class="nav-link" href="<?php echo $path ?>index.php">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span></a>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider">

    <!-- Heading -->
    <div class="sidebar-heading">
        Gestão de conteúdos
    </div>

    <!-- Nav Item - Pages Collapse Menu -->
    <!-- HOMEPAGE -->
    <li class="nav-item">
        <?php
        if(isset(explode('pages/', $_SERVER['REQUEST_URI'])[1])){
            $page_acp_aux = explode('pages/', $_SERVER['REQUEST_URI'])[1];
            $page_acp = explode('/', $page_acp_aux)[0];
            $collapsed = $page_acp == 'homepage' ? '' : 'collapsed';
            $show = $page_acp == 'homepage' ? 'show' : '';

            if($page_acp != 'profile.php'){
                $page_acp_subpage = explode('/', $page_acp_aux)[1];

                $active_slideshow = '';
                $active_sobre = '';
                $active_formacoes = '';
                $active_destaques = '';
                $active_equipa = '';
                $active_popup = '';

                switch($page_acp_subpage){
                    case 'slideshow.php':
                        $active_slideshow = 'active';
                        break;
                    case 'sobre-nos.php':
                        $active_sobre = 'active';
                        break;
                    case 'formacoes.php':
                        $active_formacoes = 'active';
                        break;
                    case 'destaques.php':
                        $active_destaques = 'active';
                        break;
                    case 'equipa.php':
                        $active_equipa = 'active';
                        break;
                    case 'popup.php':
                        $active_popup = 'active';
                        break;
                    default:
                        break;
                }
            }
        
        ?>
        <a class="nav-link <?php echo $collapsed; ?>" href="#" data-toggle="collapse" data-target="#collapseHP" aria-expanded="true" aria-controls="collapseHP">
            <i class="fas fa-fw fa-folder"></i>
            <span>Homepage</span>
        </a>
        <div id="collapseHP" class="collapse <?php echo $show; ?>" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item <?php echo $active_slideshow; ?>" href="<?php echo $path ?>modules/pages/homepage/slideshow.php">Slideshow</a>
                <a class="collapse-item <?php echo $active_sobre; ?>" href="<?php echo $path ?>modules/pages/homepage/sobre-nos.php">Sobre Nós</a>
                <a class="collapse-item <?php echo $active_formacoes; ?>" href="<?php echo $path ?>modules/pages/homepage/formacoes.php">Formações</a>
                <a class="collapse-item <?php echo $active_destaques; ?>" href="<?php echo $path ?>modules/pages/homepage/destaques.php">Destaques</a>
                <a class="collapse-item <?php echo $active_equipa; ?>" href="<?php echo $path ?>modules/pages/homepage/equipa.php">Equipa</a>
                <a class="collapse-item <?php echo $active_popup; ?>" href="<?php echo $path ?>modules/pages/homepage/popup.php">Pop-up</a>
            </div>
        </div>
        <?php 
        } else {
            ?>
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseHP" aria-expanded="true" aria-controls="collapseHP">
            <i class="fas fa-fw fa-folder"></i>
            <span>Homepage</span>
        </a>
        <div id="collapseHP" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item" href="<?php echo $path ?>modules/pages/homepage/slideshow.php">Slideshow</a>
                <a class="collapse-item" href="<?php echo $path ?>modules/pages/homepage/sobre-nos.php">Sobre Nós</a>
                <a class="collapse-item" href="<?php echo $path ?>modules/pages/homepage/formacoes.php">Formações</a>
                <a class="collapse-item" href="<?php echo $path ?>modules/pages/homepage/destaques.php">Destaques</a>
                <a class="collapse-item" href="<?php echo $path ?>modules/pages/homepage/equipa.php">Equipa</a>
                <a class="collapse-item" href="<?php echo $path ?>modules/pages/homepage/popup.php">Pop-up</a>
            </div>
        </div>
            <?php
        }
        ?>
    </li>
    
    <!-- SOBRE NÓS -->
    <li class="nav-item">
        <?php
        if(isset(explode('pages/', $_SERVER['REQUEST_URI'])[1])){
            $page_acp_aux = explode('pages/', $_SERVER['REQUEST_URI'])[1];
            $page_acp = explode('/', $page_acp_aux)[0];
            $collapsed = $page_acp == 'sobre-nos' ? '' : 'collapsed';
            $show = $page_acp == 'sobre-nos' ? 'show' : '';

            if($page_acp != 'profile.php'){
                $page_acp_subpage = explode('/', $page_acp_aux)[1];

                $active_intro = '';
                $active_areas = '';
                $active_equipa = '';
                $active_confianca = '';

                switch($page_acp_subpage){
                    case 'intro.php':
                        $active_intro = 'active';
                        break;
                    case 'areas.php':
                        $active_areas = 'active';
                        break;
                    case 'equipa.php':
                        $active_equipa = 'active';
                        break;
                    case 'confianca.php':
                        $active_confianca = 'active';
                        break;
                    default:
                        break;
                }
            }

            
        ?>
        <a class="nav-link <?php echo $collapsed; ?>" href="#" data-toggle="collapse" data-target="#collapseAbout" aria-expanded="true" aria-controls="collapseAbout">
            <i class="fas fa-fw fa-folder"></i>
            <span>Sobre Nós</span>
        </a>
        <div id="collapseAbout" class="collapse <?php echo $show; ?>" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item <?php echo $active_intro; ?>" href="<?php echo $path ?>modules/pages/sobre-nos/intro.php">Introdução</a>
                <a class="collapse-item <?php echo $active_areas; ?>" href="<?php echo $path ?>modules/pages/sobre-nos/areas.php">Áreas</a>
                <a class="collapse-item <?php echo $active_equipa; ?>" href="<?php echo $path ?>modules/pages/sobre-nos/equipa.php">Equipa</a>
                <a class="collapse-item <?php echo $active_confianca; ?>" href="<?php echo $path ?>modules/pages/sobre-nos/confianca.php">Confiança</a>
            </div>
        </div>
        <?php
        } else {
            ?>

        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseAbout" aria-expanded="true" aria-controls="collapseAbout">
            <i class="fas fa-fw fa-folder"></i>
            <span>Sobre Nós</span>
        </a>
        <div id="collapseAbout" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item" href="<?php echo $path ?>modules/pages/sobre-nos/intro.php">Introdução</a>
                <a class="collapse-item" href="<?php echo $path ?>modules/pages/sobre-nos/areas.php">Áreas</a>
                <a class="collapse-item" href="<?php echo $path ?>modules/pages/sobre-nos/equipa.php">Equipa</a>
                <a class="collapse-item" href="<?php echo $path ?>modules/pages/sobre-nos/confianca.php">Confiança</a>
            </div>
        </div>

            <?php
        }
        ?>
    </li>

    <!-- SERVIÇOS -->
    <li class="nav-item">
        <?php
        if(isset(explode('pages/', $_SERVER['REQUEST_URI'])[1])){
            $page_acp_aux = explode('pages/', $_SERVER['REQUEST_URI'])[1];
            $page_acp = explode('/', $page_acp_aux)[0];
            $collapsed = $page_acp == 'servicos' ? '' : 'collapsed';
            $show = $page_acp == 'servicos' ? 'show' : '';

            if($page_acp != 'profile.php'){
                $page_acp_subpage = explode('/', $page_acp_aux)[1];

                $active_iservicos = '';
                $active_servicos = '';

                switch($page_acp_subpage){
                    case 'inserir-servico.php':
                        $active_iservicos = 'active';
                        break;
                    case 'servicos.php':
                        $active_servicos = 'active';
                        break;
                    default:
                        break;
                }
            }

            
        ?>
        <a class="nav-link <?php echo $collapsed; ?>" href="#" data-toggle="collapse" data-target="#collapseServices" aria-expanded="true" aria-controls="collapseServices">
            <i class="fas fa-fw fa-folder"></i>
            <span>Serviços</span>
        </a>
        <div id="collapseServices" class="collapse <?php echo $show; ?>" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item <?php echo $active_iservicos; ?>" href="<?php echo $path ?>modules/pages/servicos/inserir-servico.php">Inserir Novo</a>
                <a class="collapse-item <?php echo $active_servicos; ?>" href="<?php echo $path ?>modules/pages/servicos/servicos.php">Todos os Serviços</a>
            </div>
        </div>
        <?php 
        } else {
            ?>
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseServices" aria-expanded="true" aria-controls="collapseServices">
            <i class="fas fa-fw fa-folder"></i>
            <span>Serviços</span>
        </a>
        <div id="collapseServices" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item" href="<?php echo $path ?>modules/pages/servicos/inserir-servico.php">Inserir Novo</a>
                <a class="collapse-item" href="<?php echo $path ?>modules/pages/servicos/servicos.php">Todos os Serviços</a>
            </div>
        </div>
            <?php
        }
        ?>
    </li>

    <!-- FORMAÇÕES -->
    <li class="nav-item">
        <?php
        if(isset(explode('pages/', $_SERVER['REQUEST_URI'])[1])){
            $page_acp_aux = explode('pages/', $_SERVER['REQUEST_URI'])[1];
            $page_acp = explode('/', $page_acp_aux)[0];
            $collapsed = $page_acp == 'formacoes' ? '' : 'collapsed';
            $show = $page_acp == 'formacoes' ? 'show' : '';

            if($page_acp != 'profile.php'){
                $page_acp_subpage = explode('/', $page_acp_aux)[1];

                $active_apr_f = '';
                $active_iformacoes = '';
                $active_formacoes = '';

                switch($page_acp_subpage){
                    case 'apresentacao.php':
                        $active_apr_f = 'active';
                        break;
                    case 'inserir-formacao.php':
                        $active_iformacoes = 'active';
                        break;
                    case 'formacoes.php':
                        $active_formacoes = 'active';
                        break;
                    default:
                        break;
                }
            }

            
        ?>
        <a class="nav-link <?php echo $collapsed; ?>" href="#" data-toggle="collapse" data-target="#collapseAcademy" aria-expanded="true" aria-controls="collapseAcademy">
            <i class="fas fa-fw fa-folder"></i>
            <span>Formações</span>
        </a>
        <div id="collapseAcademy" class="collapse <?php echo $show; ?>" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item <?php echo $active_apr_f; ?>" href="<?php echo $path ?>modules/pages/formacoes/apresentacao.php">Apresentação</a>
                <a class="collapse-item <?php echo $active_iformacoes; ?>" href="<?php echo $path ?>modules/pages/formacoes/inserir-formacao.php">Inserir Formação</a>
                <a class="collapse-item <?php echo $active_formacoes; ?>" href="<?php echo $path ?>modules/pages/formacoes/formacoes.php">Todas as Formações</a>
            </div>
        </div>
        <?php 
        } else {
            ?>
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseAcademy" aria-expanded="true" aria-controls="collapseAcademy">
            <i class="fas fa-fw fa-folder"></i>
            <span>Formações</span>
        </a>
        <div id="collapseAcademy" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item" href="<?php echo $path ?>modules/pages/formacoes/apresentacao.php">Apresentação</a>
                <a class="collapse-item" href="<?php echo $path ?>modules/pages/formacoes/inserir-formacao.php">Inserir Formação</a>
                <a class="collapse-item" href="<?php echo $path ?>modules/pages/formacoes/formacoes.php">Todas as Formações</a>
            </div>
        </div>
            <?php
        }
        ?>
    </li>

    <!-- BLOG -->
    <li class="nav-item">
        <?php
        if(isset(explode('pages/', $_SERVER['REQUEST_URI'])[1])){
            $page_acp_aux = explode('pages/', $_SERVER['REQUEST_URI'])[1];
            $page_acp = explode('/', $page_acp_aux)[0];
            $collapsed = $page_acp == 'blog' ? '' : 'collapsed';
            $show = $page_acp == 'blog' ? 'show' : '';

            if($page_acp != 'profile.php'){
                $page_acp_subpage = explode('/', $page_acp_aux)[1];

                $active_apr = '';
                $active_ia = '';
                $active_a = '';
                $active_gc = '';

                switch($page_acp_subpage){
                    case 'apresentacao.php':
                        $active_apr = 'active';
                        break;
                    case 'inserir-artigo.php':
                        $active_ia = 'active';
                        break;
                    case 'artigos.php':
                        $active_a = 'active';
                        break;
                    case 'gerir-categorias.php':
                        $active_gc = 'active';
                        break;
                    default:
                        break;
                }
            }

            
        ?>
        <a class="nav-link <?php echo $collapsed; ?>" href="#" data-toggle="collapse" data-target="#collapseBlog" aria-expanded="true" aria-controls="collapseBlog">
            <i class="fas fa-fw fa-folder"></i>
            <span>Blog</span>
        </a>
        <div id="collapseBlog" class="collapse <?php echo $show; ?>" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item <?php echo $active_apr; ?>" href="<?php echo $path ?>modules/pages/blog/apresentacao.php">Apresentação</a>
                <a class="collapse-item <?php echo $active_ia; ?>" href="<?php echo $path ?>modules/pages/blog/inserir-artigo.php">Inserir Artigo</a>
                <a class="collapse-item <?php echo $active_a; ?>" href="<?php echo $path ?>modules/pages/blog/artigos.php">Todos os Artigos</a>
                <a class="collapse-item <?php echo $active_gc; ?>" href="<?php echo $path ?>modules/pages/blog/gerir-categorias.php">Gerir Categorias</a>
            </div>
        </div>
        <?php 
        } else {
            ?>
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseBlog" aria-expanded="true" aria-controls="collapseBlog">
            <i class="fas fa-fw fa-folder"></i>
            <span>Blog</span>
        </a>
        <div id="collapseBlog" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item" href="<?php echo $path ?>modules/pages/blog/apresentacao.php">Apresentação</a>
                <a class="collapse-item" href="<?php echo $path ?>modules/pages/blog/inserir-artigo.php">Inserir Artigo</a>
                <a class="collapse-item" href="<?php echo $path ?>modules/pages/blog/artigos.php">Todos os Artigos</a>
                <a class="collapse-item" href="<?php echo $path ?>modules/pages/blog/gerir-categorias.php">Gerir Categorias</a>
            </div>
        </div>
            <?php
        }
        ?>
    </li>

    <!-- PERGUNTAS FREQUENTES -->
    <li class="nav-item">
        <?php
        if(isset(explode('pages/', $_SERVER['REQUEST_URI'])[1])){
            $page_acp_aux = explode('pages/', $_SERVER['REQUEST_URI'])[1];
            $page_acp = explode('/', $page_acp_aux)[0];
            $collapsed = $page_acp == 'perguntas-frequentes' ? '' : 'collapsed';
            $show = $page_acp == 'perguntas-frequentes' ? 'show' : '';

            if($page_acp != 'profile.php'){
                $page_acp_subpage = explode('/', $page_acp_aux)[1];

                $active_faqs = '';
                $active_add_faq = '';

                switch($page_acp_subpage){
                    case 'adicionar-pergunta.php':
                        $active_add_faq = 'active';
                        break;
                    case 'perguntas-frequentes.php':
                        $active_faqs = 'active';
                        break;
                    default:
                        break;
                }
            }

            
        ?>
        <a class="nav-link <?php echo $collapsed; ?>" href="#" data-toggle="collapse" data-target="#collapseFAQS" aria-expanded="true" aria-controls="collapseFAQS">
            <i class="fas fa-fw fa-folder"></i>
            <span>Perguntas Frequentes</span>
        </a>
        <div id="collapseFAQS" class="collapse <?php echo $show; ?>" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item <?php echo $active_add_faq; ?>" href="<?php echo $path ?>modules/pages/perguntas-frequentes/adicionar-pergunta.php">Adicionar Pergunta</a>
                <a class="collapse-item <?php echo $active_faqs; ?>" href="<?php echo $path ?>modules/pages/perguntas-frequentes/perguntas-frequentes.php">Todas as Perguntas</a>
            </div>
        </div>
        <?php 
        } else {
            ?>
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseFAQS" aria-expanded="true" aria-controls="collapseFAQS">
            <i class="fas fa-fw fa-folder"></i>
            <span>Perguntas Frequentes</span>
        </a>
        <div id="collapseFAQS" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item" href="<?php echo $path ?>modules/pages/perguntas-frequentes/adicionar-pergunta.php">Adicionar Pergunta</a>
                <a class="collapse-item" href="<?php echo $path ?>modules/pages/perguntas-frequentes/perguntas-frequentes.php">Todas as Perguntas</a>
            </div>
        </div>
            <?php
        }
        ?>
    </li>

    <!-- CONTACTOS -->
    <li class="nav-item">
        <?php
        if(isset(explode('pages/', $_SERVER['REQUEST_URI'])[1])){
            $page_acp_aux = explode('pages/', $_SERVER['REQUEST_URI'])[1];
            $page_acp = explode('/', $page_acp_aux)[0];
            $collapsed = $page_acp == 'contactos' ? '' : 'collapsed';
            $show = $page_acp == 'contactos' ? 'show' : '';

            if($page_acp != 'profile.php'){
                $page_acp_subpage = explode('/', $page_acp_aux)[1];

                $active_contactos = '';

                switch($page_acp_subpage){
                    case 'contactos.php':
                        $active_contactos = 'active';
                        break;
                    default:
                        break;
                }
            }

            
        ?>
        <a class="nav-link <?php echo $collapsed; ?>" href="#" data-toggle="collapse" data-target="#collapseConts" aria-expanded="true" aria-controls="collapseConts">
            <i class="fas fa-fw fa-folder"></i>
            <span>Contactos</span>
        </a>
        <div id="collapseConts" class="collapse <?php echo $show; ?>" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item <?php echo $active_contactos; ?>" href="<?php echo $path ?>modules/pages/contactos/contactos.php">Gerir</a>
            </div>
        </div>
        <?php 
        } else {
            ?>
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseConts" aria-expanded="true" aria-controls="collapseConts">
            <i class="fas fa-fw fa-folder"></i>
            <span>Contactos</span>
        </a>
        <div id="collapseConts" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item" href="<?php echo $path ?>modules/pages/contactos/contactos.php">Gerir</a>
            </div>
        </div>
            <?php
        }
        ?>
    </li>

    <!-- POLÍTICA DE PRIVACIDADE -->
    <li class="nav-item">
        <?php
        if(isset(explode('pages/', $_SERVER['REQUEST_URI'])[1])){
            $page_acp_aux = explode('pages/', $_SERVER['REQUEST_URI'])[1];
            $page_acp = explode('/', $page_acp_aux)[0];
            $collapsed = $page_acp == 'politica-privacidade' ? '' : 'collapsed';
            $show = $page_acp == 'politica-privacidade' ? 'show' : '';

            if($page_acp != 'profile.php'){
                $page_acp_subpage = explode('/', $page_acp_aux)[1];

                $active_pp = '';
                $active_ipp = '';

                switch($page_acp_subpage){
                    case 'inserir-topico.php':
                        $active_ipp = 'active';
                        break;
                    case 'politica-privacidade.php':
                        $active_pp = 'active';
                        break;
                    default:
                        break;
                }
            }

            
        ?>
        <a class="nav-link <?php echo $collapsed; ?>" href="#" data-toggle="collapse" data-target="#collapsePP" aria-expanded="true" aria-controls="collapsePP">
            <i class="fas fa-fw fa-folder"></i>
            <span>Política de Privacidade</span>
        </a>
        <div id="collapsePP" class="collapse <?php echo $show; ?>" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item <?php echo $active_ipp; ?>" href="<?php echo $path ?>modules/pages/politica-privacidade/inserir-topico.php">Inserir Tópico</a>
                <a class="collapse-item <?php echo $active_pp; ?>" href="<?php echo $path ?>modules/pages/politica-privacidade/politica-privacidade.php">Todos os Tópicos</a>
            </div>
        </div>
        <?php 
        } else {
            ?>
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePP" aria-expanded="true" aria-controls="collapsePP">
            <i class="fas fa-fw fa-folder"></i>
            <span>Política de Privacidade</span>
        </a>
        <div id="collapsePP" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item" href="<?php echo $path ?>modules/pages/politica-privacidade/inserir-topico.php">Inserir Tópico</a>
                <a class="collapse-item" href="<?php echo $path ?>modules/pages/politica-privacidade/politica-privacidade.php">Todos os Tópicos</a>
            </div>
        </div>
            <?php
        }
        ?>
    </li>

    <?php
    // $sqlCmd = " SELECT * from users where webmaster = 1";
    // $users = execQueryMySQL($sqlCmd);

    // if ($_SESSION['webmaster'] == 1) {
    ?>

        <!-- <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUsers" aria-expanded="true" aria-controls="collapseUsers">
                <i class="fas fa-fw fa-folder"></i>
                <span>Gestão</span>
            </a>
            <div id="collapseUsers" class="collapse" aria-labelledby="headingUSers" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h3 class="collapse-header">Utilizadores:</h3>
                    <a class="collapse-item" href="<?php echo $path ?>modules/pages/utilizadores.php">Gerir</a>
                    <div class="collapse-divider"></div>
                </div>
            </div>
        </li> -->

    <?php
    // }
    ?>

    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block">

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline">
        <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>

</ul>