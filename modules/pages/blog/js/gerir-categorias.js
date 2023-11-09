/* eslint-disable */
window.addEventListener("load", function (e) {
    getCategorias();
  });
  
  /* get categorias info */
  function getCategorias(last, idCategoria) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resp = this.responseText.split("||");
        if (resp[0] == "true") {
          printCategorias(JSON.parse(resp[1]), last, idCategoria);
        } else if (resp[0] == "false") {
          $.notify(resp[1]);
        } else if (resp[0] == "warn") {
          $.notify(resp[1], "warn");
        } else if (resp[0] == "session_expired") {
          window.location = "login.php";
        } else {
          $.notify("Erro ao aceder à informação das Categorias");
        }
      }
    };
  
    xhttp.open(
      "GET",
      "functions/func-gerir-categorias.php?cmdEval=getCategorias"
    );
    xhttp.send();
    xhttp.getResponseHeader("Content-Type", "application/xml");
  }
  
  /* print categorias */
  function printCategorias(categorias, last, idCategoria) {
    categoriasArea = document.querySelector("#categorias");
    document.querySelector("#categorias").innerHTML = "";
    arrayStatus = [];
    categoriasArea.innerHTML = "";
    for (const i in categorias) {
      if (categorias.hasOwnProperty(i)) {
        const categoria = categorias[i];
        linha = document.createElement("div");
        linha.id = "categoria-" + categoria.id;
        linha.classList.add("col-lg-12");
        linha.classList.add("valueLine");
        linha.style.display = "flex";
        linha.style.cursor = "pointer";
  
        html = `
              <div class="col-lg-4">${categoria.valor}</div>
          `;
        linha.innerHTML = html;
        linha.addEventListener("click", function () {
          selectCategoria("categoria-" + categoria.id);
        });
        categoriasArea.append(linha);
      }
    }
  
    if (last != null) {
      document.querySelector("#categorias .row:first-child").classList.add("active");
    }
    if (idCategoria != null) {
      document
        .querySelector("#categorias #categoria-" + idCategoria)
        .classList.add("active");
    }
  }
  
  /* select categoria */
  function selectCategoria(id) {
    linhaCategoria = document.getElementById(id);
  
    /**
     * events triggered by selection and deselection
     * this code block only concerns the new/edit modal inputs
     */
    if (linhaCategoria.classList.contains("active")) {
        linhaCategoria.classList.remove("active");
      var inputs = document
        .getElementById("categoriaInfo")
        .getElementsByTagName("input");
  
      for (index = 0; index < inputs.length; ++index) {
        if (inputs[index].type == "text") inputs[index].value = "";
      }
  
      $categoriasArea = document.getElementById("categoriaInfo");
      $categoriasArea.setAttribute("data-id-categoria", "");
    } else {
      $("#categorias .valueLine").removeClass("active");
      linhaCategoria.classList.add("active");
  
      //load data into the inputs in the page
      getCategoriaById(id.replace("categoria-", ""));
    }
  }
  
  /* get categoria info by selected */
  function getCategoriaById(idCategoria) {
    idCategoria = idCategoria.replace("categoria-", "");
    listaCategorias = document.querySelector("#categorias");
  
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resp = this.responseText.split("||");
        if (resp[0] == "true") {
            getAllDataByCategoria(JSON.parse(resp[1]));
        } else if (resp[0] == "false") {
          $.notify(resp[1]);
        } else if (resp[0] == "warn") {
          $.notify(resp[1], "warn");
        } else if (resp[0] == "session_expired") {
          window.location = "login.php";
        } else {
          $.notify("Erro para aceder à informação das Categorias.");
        }
      }
    };
    xhttp.open(
      "GET",
      "functions/func-gerir-categorias.php?cmdEval=getAllCategoriasByIdCategoria&id_categoria=" +
      idCategoria
    );
    xhttp.send();
  }
  
  /* get categoria info */
  function getAllDataByCategoria(categoria) {
    $categoriasArea = document.getElementById("categoriaInfo");
    $categoriasArea.setAttribute("data-id-categoria", "categoria-" + categoria[0].id);
  
    var $input_title_pt = $("#categoriaInfo #titulo-pt");
  
    $input_title_pt.val(categoria[0].valor);
  
    $("#saveCat").attr("data-id-categoria", categoria[0].id);
    $("#deleteCat").attr("data-id-categoria", categoria[0].id);
  }
  
  /* update categoria */
  var $updateAreasEspecializacaoBtn = $("#saveCat");
  $updateAreasEspecializacaoBtn.click(function () {
    var id = $("#saveCat").attr("data-id-categoria");
    var titlePT = $("#titulo-pt");
  
    $categoriasArea = document.getElementById("categoriaInfo");
    var categoria_id = $categoriasArea.getAttribute("data-id-categoria");
  
    if (categoria_id != null) categoria_id = categoria_id.replace("categoria-", "");
    else categoria_id = "";
  
    var dataCategoria = {
      id: id,
      titlePT: titlePT.val()
    };
  
    if (dataCategoria.titlePT == "") {
      $(".titulo-pt.erro").text("Por favor, inserir o título.");
    } else {
      $(".titulo-pt.erro").text("");
    }
  
    var categoria = new FormData();
  
    if (dataCategoria.titlePT != "") {
        categoria.append("cmdEval", "saveCat");
        categoria.append("id", dataCategoria.id);
        categoria.append("titlePT", dataCategoria.titlePT);
  
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          resp = this.responseText.split("||");
          if (resp[0] == "true") {
            $.notify("Categoria guardada com sucesso!", "success");
  
            var inputs = document
              .getElementById("categoriaInfo")
              .getElementsByTagName("input");
  
            for (index = 0; index < inputs.length; ++index) {
              if (inputs[index].type == "text") inputs[index].value = "";
            }
  
            if ($categoriasArea) {
              if (categoria_id == "") getCategorias(null, null);
              else getCategorias(null, categoria_id);
  
              $categoriasArea = document.getElementById("categoriaInfo");
              $categoriasArea.setAttribute("data-id-categoria", "");
            } else {
              getCategorias("last", null);
            }
          } else if (resp[0] == "false") {
            $.notify(resp[1]);
          } else if (resp[0] == "warn") {
            $.notify(resp[1], "warn");
          } else if (resp[0] == "session_expired") {
            window.location = "login.php";
          } else {
            $.notify("Erro ao carregar.");
          }
        }
      };
  
      xhttp.open("POST", "functions/func-gerir-categorias.php", true);
      xhttp.send(categoria);
    }
  });
  
  /**
 * delete categoria
 */
var $deleteCatBtn = $('#deleteCat');
$deleteCatBtn.click(function (id) {
    id = document.getElementById('deleteCat').getAttribute('data-id-categoria');
    xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getCategorias()
                $.notify("Categoria apagada com sucesso.", "success");

                var inputs = document.getElementById('categoriaInfo').getElementsByTagName('input');

                for (index = 0; index < inputs.length; ++index) {
                    if (inputs[index].type == "text")
                        inputs[index].value = '';
                }
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Não foi possível apagar a categoria.");
            }
        }
    }
    xhttp.open("GET", "functions/func-gerir-categorias.php?cmdEval=deleteCategoria&id=" + id);
    xhttp.send();
});