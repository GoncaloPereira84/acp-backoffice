/* eslint-disable */
window.addEventListener('load', function (e) {
    getFormacoes();
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

/* get Formações info */
function getFormacoes(last, idFormacao) {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                printFormacaoEntries(JSON.parse(resp[1]), last, idFormacao);
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro ao aceder à informação das Formações");
            }
        }
    };
    xhttp.open("GET", "functions/func-formacoes.php?cmdEval=getFormacoes");
    xhttp.send();
}

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

/* print formacoes */
function printFormacaoEntries(formacoes, last, idForm) {
    formacoesArea = document.querySelector("#formacoesList");
    document.querySelector("#formacoesList").innerHTML = "";
    arrayStatus = [];
    formacoesArea.innerHTML = "";
    for (const i in formacoes) {
        if (formacoes.hasOwnProperty(i)) {
            const formacao = formacoes[i];
            linha = document.createElement("div");
            linha.id = "form-" + formacao.form_id;
            linha.classList.add("col-lg-12");
            linha.classList.add("valueLine");
            linha.style.display = 'flex';
            linha.style.cursor = 'pointer';

            var imagem;
            if (formacao.img_src == null || formacao.img_src == '') {
                imagem = 'Não tem imagem.'
            } else {
                var splitSrc = formacao.img_src.split('uploads');
                imagem = '<img style="height: 100%;" src="../../../uploads' + splitSrc[1] + '" />'
            }

            html = `
                <div class="col-lg-3">${formacao.title}</div>
                <div class="col-lg-3">${formacao.name}</div>
                <div class="col-lg-3">${formacao.text}</div>
                <div class="col-lg-3">
                    ${imagem}
                </div>
            `;
            linha.innerHTML = html;
            linha.addEventListener("click", function () {
                selectFormacao("form-" + formacao.form_id);
            });
            formacoesArea.append(linha);
        }
    }

    $('#formacoesList').sortable({
        items: '> .valueLine',
        start: function (event, ui) {
            // Create a temporary attribute on the element with the old index
            $('#formacoesList').attr('data-currentindex', ui.item.index());
        },
        update: function (event, ui) {
            var data = $(this).sortable('serialize');

            // Reset the current index
            $(this).removeAttr('data-currentindex');

            // Post to the server to handle the changes
            $.ajax({
                type: "GET",
                url: "functions/func-formacoes.php?cmdEval=saveOrderFormacoes",
                data: data,
                beforeSend: function () {
                    // Disable dragging
                    $('#formacoesList').sortable('disable');
                },
                success: function (html) {
                    // Re-enable dragging
                    $('#formacoesList').sortable('enable');
                    getFormacoesHomepage(null, null);
                }
            });
        }
    });

    if (last != null) {
        document.querySelector("#formacoesList .row:first-child").classList.add("active");
    }
    if (idForm != null) {
        document.querySelector("#formacoesList #form-" + idForm).classList.add("active");
    }
}

/* select formacao */
function selectFormacao(id) {
    linhaFormacao = document.getElementById(id);

    /**
     * events triggered by selection and deselection
     * this code block only concerns the new/edit modal inputs
     */
    if (linhaFormacao.classList.contains("active")) {
        linhaFormacao.classList.remove("active");

        document.getElementById('formacao-sim-full').checked = false;
        document.getElementById('formacao-nao-full').checked = false;
        document.getElementById('formacao-sim-vagas').checked = false;
        document.getElementById('formacao-nao-vagas').checked = false;
        document.getElementById('formacao-sim-visible').checked = false;
        document.getElementById('formacao-nao-visible').checked = false;

        var inputs = document.getElementById('formacaoInfo').getElementsByTagName('input');

        for (index = 0; index < inputs.length; ++index) {
            if (inputs[index].type == "text")
                inputs[index].value = '';
            if (inputs[index].type == "date")
                inputs[index].value = '';
        }
        // document.getElementById('form-id').value = '';

        $('#formacao-text').next().find('.note-editable').html('');
        $('.formacao-text span').text('300');

        document.getElementById('deleteFormacao').setAttribute('data-id-form', '');

        $formArea = document.getElementById('formacaoInfo');
        $formArea.setAttribute('data-id-form', '');

        $('#formacaoInfo').css({ 'display': 'none' });
        $('.formacaoInfo').css({ 'display': 'none' });

    } else {
        $("#formacoesList .valueLine").removeClass("active");
        linhaFormacao.classList.add("active");

        //load data into the inputs in the page
        getFormacaoById(id.replace("form-", ""));
    }
}

/* get formacao info by selected */
function getFormacaoById(idForm) {
    idForm = idForm.replace("form-", "");
    listaFormacoes = document.querySelector('#formacoesList');

    document.getElementById('deleteFormacao').setAttribute('data-id-form', idForm);

    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getAllDataByFormacao(JSON.parse(resp[1]));
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro para aceder à informação das Formações.");
            }
        }
    };
    xhttp.open("GET", "functions/func-formacoes.php?cmdEval=getAllFormacoesByIdFormacao&id_formacao=" + idForm);
    xhttp.send();
}

/* get formacao info */
function getAllDataByFormacao(formacao) {
    $formacoesArea = document.getElementById('formacaoInfo');
    $formacoesArea.setAttribute('data-id-form', 'form-' + formacao[0].id);

    $('#formacaoInfo').css({ 'display': 'flex' });
    $('.formacaoInfo').css({ 'display': 'flex' });

    var $input_title = $('#formacaoInfo #formacao-title');
    var $input_text = $('#formacaoInfo #formacao-text');
    var $input_link = $('#formacaoInfo #formacao-link');
    var $select_cat = $('#formacaoInfo #formacao-categoria');

    var $input_about = $('#formacaoInfo #formacao-about');
    var $input_why = $('#formacaoInfo #formacao-why');
    var $input_date_start = $('#formacaoInfo #formacao-date-start');
    var $input_date_end = $('#formacaoInfo #formacao-date-end');
    var $input_date_fim_insc = $('#formacaoInfo #formacao-date-fim-insc');
    var $input_date_aviso = $('#formacaoInfo #formacao-date-aviso');

    var $input_sim_full = $('#formacaoInfo #formacao-sim-full');
    var $input_nao_full = $('#formacaoInfo #formacao-nao-full');
    var $input_sim_vagas = $('#formacaoInfo #formacao-sim-vagas');
    var $input_nao_vagas = $('#formacaoInfo #formacao-nao-vagas');
    var $input_sim_visible = $('#formacaoInfo #formacao-sim-visible');
    var $input_nao_visible = $('#formacaoInfo #formacao-nao-visible');

    $input_title.val(formacao[0].title);
    $input_text.next().find('.note-editable').html(formacao[0].text);
    $('.formacao-text span').text(300 - formacao[0].text.replace(/(<([^>]+)>)/ig, "").length);
    $input_link.val(formacao[0].link);
    $select_cat.val(formacao[0].categoria_id);

    $input_about.next().find('.note-editable').html(formacao[0].about);
    $('.formacao-about span').text(300 - formacao[0].about.replace(/(<([^>]+)>)/ig, "").length);
    $input_why.next().find('.note-editable').html(formacao[0].why);
    $('.formacao-why span').text(300 - formacao[0].why.replace(/(<([^>]+)>)/ig, "").length);
    $input_date_start.val(formacao[0].date_start == '0001-01-01' ? '' : formacao[0].date_start);
    $input_date_end.val(formacao[0].date_end == '0001-01-01' ? '' : formacao[0].date_end);
    $input_date_fim_insc.val(formacao[0].date_fim_insc == '0001-01-01' ? '' : formacao[0].date_fim_insc);
    $input_date_aviso.val(formacao[0].date_aviso == '0001-01-01' ? '' : formacao[0].date_aviso);

    if (formacao[0].is_full == 0) {
        $input_nao_full.prop('checked', true);
    } else {
        $input_sim_full.prop('checked', true);
    }

    if (formacao[0].last_vagas == 0) {
        $input_nao_vagas.prop('checked', true);
    } else {
        $input_sim_vagas.prop('checked', true);
    }

    if (formacao[0].is_visible == 0) {
        $input_nao_visible.prop('checked', true);
    } else {
        $input_sim_visible.prop('checked', true);
    }
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

    $formArea = document.getElementById('formacaoInfo');
    var form_id = $formArea.getAttribute('data-id-form');

    if (form_id != null)
        form_id = form_id.replace("form-", "");
    else
        form_id = ''

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
        formacao.append("id", form_id);
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

                    linhaForm = document.getElementById('form-' + form_id);

                    var inputs = document.getElementById('formacaoInfo').getElementsByTagName('input');

                    for (index = 0; index < inputs.length; ++index) {
                        if (inputs[index].type == "text")
                            inputs[index].value = '';
                        if (inputs[index].type == "date")
                            inputs[index].value = '';
                    }

                    document.getElementById('formacao-sim-full').checked = false;
                    document.getElementById('formacao-nao-full').checked = false;
                    document.getElementById('formacao-sim-vagas').checked = false;
                    document.getElementById('formacao-nao-vagas').checked = false;
                    document.getElementById('formacao-sim-visible').checked = false;
                    document.getElementById('formacao-nao-visible').checked = false;

                    document.getElementById('formacao-categoria').value = 'null';

                    $('#formacaoInfo #formacao-text').next().find('.note-editable').html('');
        
                    $('#formacaoInfo').css({ 'display': 'none' });
                    $('.formacaoInfo').css({ 'display': 'none' });

                    if ($formArea) {
                        if (form_id == '')
                            getFormacoes(null, null);
                        else
                            getFormacoes(null, form_id);
                        $formArea = document.getElementById('formacaoInfo');
                        $formArea.setAttribute('data-id-form', '');
                    } else {
                        getFormacoes("last", null);
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
        }

        xhttp.open("POST", "functions/func-formacoes.php", true);
        xhttp.send(formacao);
    }
});

/**
 * delete formaçao
 */
var $deleteFormacaoBtn = $('#deleteFormacao');
$deleteFormacaoBtn.click(function (id) {
    id = document.getElementById('deleteFormacao').getAttribute('data-id-form');
    xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getFormacoes()
                $.notify("Formação apagada com sucesso.", "success");

                var inputs = document.getElementById('formacaoInfo').getElementsByTagName('input');

                document.getElementById('formacao-categoria').value = 'null';

                document.getElementById('formacao-sim-full').checked = false;
                document.getElementById('formacao-nao-full').checked = false;
                document.getElementById('formacao-sim-vagas').checked = false;
                document.getElementById('formacao-nao-vagas').checked = false;
                document.getElementById('formacao-sim-visible').checked = false;
                document.getElementById('formacao-nao-visible').checked = false;

                $('#formacaoInfo #formacao-text').next().find('.note-editable').html('');
        
                $('#formacaoInfo').css({ 'display': 'none' });
                $('.formacaoInfo').css({ 'display': 'none' });

                for (index = 0; index < inputs.length; ++index) {
                    if (inputs[index].type == "text")
                        inputs[index].value = '';
                    if (inputs[index].type == "date")
                        inputs[index].value = '';
                }
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Não foi possível apagar a formação.");
            }
        }
    }
    xhttp.open("GET", "functions/func-formacoes.php?cmdEval=deleteFormacao&id=" + id);
    xhttp.send();
});