/* eslint-disable */
window.addEventListener('load', function (e) {
    getCategoria();

    $('#formacao-text').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']]
        ],
        callbacks: {
            onKeydown: function (e) {
                var t = e.currentTarget.innerText;
                if (t.trim().length >= 450) {
                //delete keys, arrow keys, copy, cut, select all
                if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
                    e.preventDefault();
                }
            },
            onKeyup: function (e) {
                var t = e.currentTarget.innerText;
                $('.formacao-text span').text(450 - t.trim().length);
            },
            onPaste: function (e) {
                var t = e.currentTarget.innerText;
                var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                e.preventDefault();
                var maxPaste = bufferText.length;
                if (t.length + bufferText.length > 450) {
                maxPaste = 450 - t.length;
                }
                if (maxPaste > 0) {
                document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
                }
                $('.formacao-text span').text(450 - t.length);
            }
        }
    });

    $('#formacao-about').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']]
        ]
    });

    $('#formacao-why').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']]
        ]
    });
});

$("#formacao-text").on("keypress", function () {
    var limiteCaracteres = 400;
    var caracteres = $(this).text();
    var totalCaracteres = caracteres.length;
  
    //Update Count value
    $(".formacao-text").text(totalCaracteres);
  
    //Check and Limit Charaters
    if (totalCaracteres >= limiteCaracteres) {
      return false;
    }
});

/* get categorias */
function getCategoria() {
    xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                selectCat = document.querySelector("#formacao-categoria");
                cats = JSON.parse(resp[1]);
                cats.forEach(function (cat) {
                    option = document.createElement("option");
                    option.value = cat.id;
                    option.innerText = cat.name;
                    selectCat.append(option);
                })
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("não foi possível carregar as categorias, entre novamente na página.");
            }
        }
    }
    xhttp.open("GET", "functions/func-formacoes.php?cmdEval=getCategoria");
    xhttp.send();
}

/* save/update formacao */
var $saveFormBtn = $('#saveFormacao');
$saveFormBtn.click(function () {
    var formacao = new FormData;

    var $input_title = $('#formacaoInfo #formacao-title').val();
    var $input_text = $('#formacaoInfo #formacao-text').next().find('.note-editable').html();
    var $input_img = $('#formacaoInfo #formacao-imagem').val();
    var $select_cat = $('#formacaoInfo #formacao-categoria').val();
    var $input_about = $('#formacaoInfo #formacao-about').next().find('.note-editable').html();
    var $input_why = $('#formacaoInfo #formacao-why').next().find('.note-editable').html();
    var $input_date_start = $('#formacaoInfo #formacao-date-start').val();
    var $input_date_end = $('#formacaoInfo #formacao-date-end').val();
    var $input_date_fim_insc = $('#formacaoInfo #formacao-date-fim-insc').val();
    var $input_date_aviso = $('#formacaoInfo #formacao-date-aviso').val();

    if (document.getElementById("formacao-sim-full").checked == true) {
        formacao.append("is_full", document.getElementById("formacao-sim-full").value);
    }
    else {
        formacao.append("is_full", document.getElementById("formacao-nao-full").value);
    }

    if (document.getElementById("formacao-sim-vagas").checked == true) {
        formacao.append("last_vagas", document.getElementById("formacao-sim-vagas").value);
    }
    else {
        formacao.append("last_vagas", document.getElementById("formacao-nao-vagas").value);
    }

    if (document.getElementById("formacao-sim-visible").checked == true) {
        formacao.append("is_visible", document.getElementById("formacao-sim-visible").value);
    }
    else {
        formacao.append("is_visible", document.getElementById("formacao-nao-visible").value);
    }

    const files = document.querySelector('#formacao-imagem').files;

    if ($input_text.replace(/(<([^>]+)>)/ig, '').length == 0) {
        $(".formacao-text-erro.erro").text("Por favor, inserir o texto.");
    } else {
        if ($input_text.replace(/(<([^>]+)>)/ig, '').length > 300) {
            $(".formacao-text-erro.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
        } else {
            $(".formacao-text-erro.erro").text("");
        }
    }

    if ($select_cat == 'null') {
        $(".formacao-categoria-erro.erro").text("Por favor, escolher categoria.");
    } else {
        $(".formacao-categoria-erro.erro").text("");
    }

    if ($input_title == "") {
        $(".formacao-title-erro.erro").text("Por favor, inserir o título.");
    } else {
        $(".formacao-title-erro.erro").text("");
    }

    if ($input_title != '' && $select_cat != 'null' && $input_text != '') {
        formacao.append('cmdEval', 'saveFormacao');
        formacao.append("title", $input_title);
        formacao.append("text", $input_text);
        formacao.append("about", $input_about);
        formacao.append("why", $input_why);
        formacao.append("date_start", $input_date_start == '' ? '0001-01-01' : $input_date_start);
        formacao.append("date_end", $input_date_end == '' ? '0001-01-01' : $input_date_end);
        formacao.append("date_fim_insc", $input_date_fim_insc == '' ? '0001-01-01' : $input_date_fim_insc);
        formacao.append("date_aviso", $input_date_aviso == '' ? '0001-01-01' : $input_date_aviso);
        formacao.append("categoria_id", $select_cat);

        if (files.length > 0) {
            formacao.append("img", $input_img);
            for (let i = 0; i < files.length; i++) {
                let file = files[i]
                formacao.append('filesFormacoes[]', file)
            }
        }

        var xhttp = new XMLHttpRequest;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    $.notify("Formação guardada com sucesso!", "success");

                    setTimeout(() => {
                        window.location.href = "https://backoffice.anacarolinapereira.pt/modules/pages/formacoes/formacoes.php";
                    }, 1000);
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
        }

        xhttp.open("POST", "functions/func-inserir-formacao.php", true);
        xhttp.send(formacao);
    }
});