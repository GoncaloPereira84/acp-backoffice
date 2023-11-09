<!DOCTYPE html>
<html lang="en">

<?php
include 'modules/includes/header.php'
?>

<body id="page-top">

  <!-- Page Wrapper -->
  <div id="wrapper">

    <!-- Sidebar -->
    <?php
    include 'modules/components/sidebar.php'
    ?>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">

      <!-- Main Content -->
      <div id="content">

        <!-- Topbar -->
        <?php
        include 'modules/includes/topbar.php'
        ?>
        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid">

          <!-- Page Heading -->
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
            <!-- <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-download fa-sm text-white-50"></i> Generate Report</a> -->
          </div>

          <!-- Content Row -->

          <div class="row">
            <div class="col-xl-12 col-lg-12">
              <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Autorização</h6>
                </div>
                <div class="card-body" style="min-height: 100px;">
                  <section id="auth-button"></section>
                  <section id="view-selector"></section>
                </div>
              </div>
            </div>

            <!-- <div class="col-xl-12 col-lg-12">
              <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Dados em tempo real</h6>
                </div>
                <div class="card-body" style="min-height: 100px;">
                  <section id="realtime-selector"></section>
                </div>
              </div>
            </div> -->

            <div class="col-xl-12 col-lg-12">
              <div class="card shadow mb-4" style="overflow: auto; max-height: 25rem;">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Visualizações</h6>
                </div>
                <div class="card-body" style="min-height: 340px;">
                  <section id="sessions-timeline"></section>
                </div>
              </div>
            </div>

            <div class="col-xl-6 col-lg-6">
              <div class="card shadow mb-4" style="overflow: auto; max-height: 25rem;">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Visitantes</h6>
                </div>
                <div class="card-body" style="min-height: 340px;">
                  <section id="users-timeline"></section>
                </div>
              </div>
            </div>

            <div class="col-xl-6 col-lg-6">
              <div class="card shadow mb-4" style="overflow: auto; max-height: 25rem;">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Taxa de rejeição</h6>
                </div>
                <div class="card-body" style="min-height: 340px;">
                  <section id="bouncerate-timeline"></section>
                </div>
              </div>
            </div>

            <div class="col-xl-6 col-lg-6">
              <div class="card shadow mb-4" style="overflow: auto; max-height: 25rem;">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Origem</h6>
                </div>
                <div class="card-body" style="min-height: 340px;">
                  <section id="origin-timeline"></section>
                </div>
              </div>
            </div>

            <div class="col-xl-6 col-lg-6">
              <div class="card shadow mb-4" style="overflow: auto; max-height: 25rem;">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Plataforma/Dispositivo</h6>
                </div>
                <div class="card-body" style="min-height: 340px; display: flex;">
                  <div class="col-xl-6">
                    <section id="platform-timeline"></section>
                  </div>
                  <div class="col-xl-6">
                    <section id="device-timeline"></section>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-6 col-lg-6">
              <div class="card shadow mb-4" style="overflow: auto; max-height: 25rem;">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Localização por cidade</h6>
                </div>
                <div class="card-body" style="min-height: 340px;">
                  <section id="location-timeline"></section>
                </div>
              </div>
            </div>

            <div class="col-xl-6 col-lg-6">
              <div class="card shadow mb-4" style="overflow: auto; max-height: 25rem;">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Idade</h6>
                </div>
                <div class="card-body" style="min-height: 340px;">
                  <section id="age-timeline"></section>
                </div>
              </div>
            </div>

            <div class="col-xl-6 col-lg-6">
              <div class="card shadow mb-4" style="overflow: auto; max-height: 25rem;">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Género</h6>
                </div>
                <div class="card-body" style="min-height: 340px;">
                  <section id="gender-timeline"></section>
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
      include 'modules/includes/footer.php'
      ?>
      <!-- End of Footer -->

    </div>
    <!-- End of Content Wrapper -->
  </div>

  <!-- Scroll to Top Button-->
  <?php
  include 'modules/components/scroll-to-top-btn.php'
  ?>

  <!-- Logout Modal-->
  <?php
  include 'modules/components/logout-modal.php'
  ?>

  <?php
  include 'modules/includes/js-includes.php'
  ?>

  <script>
    (function(w, d, s, g, js, fjs) {
      g = w.gapi || (w.gapi = {});
      g.analytics = {
        q: [],
        ready: function(cb) {
          this.q.push(cb)
        }
      };
      js = d.createElement(s);
      fjs = d.getElementsByTagName(s)[0];
      js.src = 'https://apis.google.com/js/platform.js';
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = function() {
        g.load('analytics')
      };
    }(window, document, 'script'));
  </script>

  <script>
    
    gapi.analytics.ready(function() {

      // Step 3: Authorize the user.
      var CLIENT_ID = '383138485789-gevg0h2imllp1nrmig8a2tt92bitanbk.apps.googleusercontent.com';

      gapi.analytics.auth.authorize({
        container: 'auth-button',
        clientid: CLIENT_ID,
        // access_token: 'XXXXXX'
      });

      // gapi.analytics.auth.on('signIn', function() {
      //   console.log(gapi.analytics.auth.getUserProfile());
      // });

      var viewSelector = new gapi.analytics.ViewSelector({
        container: 'view-selector'
      });

      var timelineSessions = new gapi.analytics.googleCharts.DataChart({
        reportType: 'ga',
        query: {
          'dimensions': 'ga:pagePathLevel1',
          'metrics': 'ga:pageviews',
          'start-date': '30daysAgo',
          'end-date': 'yesterday',
        },
        chart: {
          type: 'TABLE',
          container: 'sessions-timeline',
          options: {
            title: 'Visualização de páginas nos últimos 30 dias',
            fontSize: 12,
            width: '100%'
          }
        }
      });

      var timelineUsers = new gapi.analytics.googleCharts.DataChart({
        reportType: 'ga',
        query: {
          'dimensions': 'ga:userType',
          'metrics': 'ga:users, ga:newUsers',
          'start-date': '30daysAgo',
          'end-date': 'yesterday',
        },
        chart: {
          type: 'PIE',
          container: 'users-timeline',
          options: {
            width: '100%'
          }
        }
      });

      var timelineBounce = new gapi.analytics.googleCharts.DataChart({
        reportType: 'ga',
        query: {
          'dimensions': 'ga:userDefinedValue',
          'metrics': 'ga:bounceRate',
          'start-date': '30daysAgo',
          'end-date': 'yesterday',
        },
        chart: {
          type: 'LINE',
          container: 'bouncerate-timeline',
          options: {
            width: '100%'
          }
        }
      });

      var timelineOrigin = new gapi.analytics.googleCharts.DataChart({
        reportType: 'ga',
        query: {
          'dimensions': 'ga:source',
          'metrics': 'ga:sessions',
          'start-date': '30daysAgo',
          'end-date': 'yesterday',
        },
        chart: {
          type: 'TABLE',
          container: 'origin-timeline',
          options: {
            width: '100%'
          }
        }
      });

      var timelinePlatform = new gapi.analytics.googleCharts.DataChart({
        reportType: 'ga',
        query: {
          'dimensions': 'ga:browser',
          'metrics': 'ga:sessions',
          'start-date': '30daysAgo',
          'end-date': 'yesterday',
        },
        chart: {
          type: 'COLUMN',
          container: 'platform-timeline',
          options: {
            width: '100%'
          }
        }
      });

      var timelineDevice = new gapi.analytics.googleCharts.DataChart({
        reportType: 'ga',
        query: {
          'dimensions': 'ga:deviceCategory',
          'metrics': 'ga:sessions',
          'start-date': '30daysAgo',
          'end-date': 'yesterday',
        },
        chart: {
          type: 'COLUMN',
          container: 'device-timeline',
          options: {
            width: '100%'
          }
        }
      });

      var timelineLocation = new gapi.analytics.googleCharts.DataChart({
        reportType: 'ga',
        query: {
          'dimensions': 'ga:city',
          'metrics': 'ga:sessions',
          'start-date': '30daysAgo',
          'end-date': 'yesterday',
        },
        chart: {
          type: 'PIE',
          container: 'location-timeline',
          options: {
            width: '100%'
          }
        }
      });

      var timelineAge = new gapi.analytics.googleCharts.DataChart({
        reportType: 'ga',
        query: {
          'dimensions': 'ga:userAgeBracket',
          'metrics': 'ga:users',
          'start-date': '30daysAgo',
          'end-date': 'yesterday',
        },
        chart: {
          type: 'COLUMN',
          container: 'age-timeline',
          options: {
            width: '100%'
          }
        }
      });

      var timelineGender = new gapi.analytics.googleCharts.DataChart({
        reportType: 'ga',
        query: {
          'dimensions': 'ga:userGender',
          'metrics': 'ga:users',
          'start-date': '30daysAgo',
          'end-date': 'yesterday',
        },
        chart: {
          type: 'PIE',
          container: 'gender-timeline',
          options: {
            width: '100%'
          }
        }
      });

      gapi.analytics.auth.on('success', function(response) {
        viewSelector.execute();
      });

      viewSelector.on('change', function(ids) {
        var newIds = {
          query: {
            ids: ids
          }
        }
        timelineSessions.set(newIds).execute();
        timelineUsers.set(newIds).execute();
        timelineBounce.set(newIds).execute();
        timelineOrigin.set(newIds).execute();
        timelinePlatform.set(newIds).execute();
        timelineDevice.set(newIds).execute();
        timelineLocation.set(newIds).execute();
        timelineAge.set(newIds).execute();
        timelineGender.set(newIds).execute();
      });
    });
  </script>

</body>

</html>