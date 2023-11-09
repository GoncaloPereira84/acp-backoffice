/* eslint-disable */
window.addEventListener('load', function (e) {
    getServicos();

    $('#servico-resumo').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']]
        ],
        callbacks: {
            onKeydown: function (e) {
                var t = e.currentTarget.innerText;
                if (t.trim().length >= 300) {
                //delete keys, arrow keys, copy, cut, select all
                if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
                    e.preventDefault();
                }
            },
            onKeyup: function (e) {
                var t = e.currentTarget.innerText;
                $('servico-resumo span').text(300 - t.trim().length);
            },
            onPaste: function (e) {
                var t = e.currentTarget.innerText;
                var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                e.preventDefault();
                var maxPaste = bufferText.length;
                if (t.length + bufferText.length > 300) {
                maxPaste = 300 - t.length;
                }
                if (maxPaste > 0) {
                document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
                }
                $('.servico-resumo span').text(300 - t.length);
            }
        }
    });

    $('#servico-about').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']]
        ]
    });

    $('#servico-why').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']]
        ]
    });

    $('#servico-share').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']]
        ]
    });
});

$("#servico-resumo").on("keypress", function () {
    var limiteCaracteres = 300;
    var caracteres = $(this).text();
    var totalCaracteres = caracteres.length;
  
    //Update Count value
    $(".servico-resumo span").text(totalCaracteres);
  
    //Check and Limit Charaters
    if (totalCaracteres >= limiteCaracteres) {
      return false;
    }
});

/* get sevicos info */
function getServicos(last, idServico) {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                printServicos(JSON.parse(resp[1]), last, idServico);
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro ao aceder à informação dos Serviços");
            }
        }
    };
    xhttp.open("GET", "functions/func-servicos.php?cmdEval=getServicos");
    xhttp.send();
}

/* print servicos */
function printServicos(servicos, last, idServico) {
    servicosArea = document.querySelector("#servicosList");
    document.querySelector("#servicosList").innerHTML = "";
    arrayStatus = [];
    servicosArea.innerHTML = "";
    for (const i in servicos) {
        if (servicos.hasOwnProperty(i)) {
            const servico = servicos[i];
            linha = document.createElement("div");
            linha.id = "servico-" + servico.id;
            linha.classList.add("col-lg-12");
            linha.classList.add("valueLine");
            linha.style.display = 'flex';
            linha.style.cursor = 'pointer';

            var imagem;
            if (servico.img_src == null || servico.img_src == '') {
                imagem = 'Não tem imagem.'
            } else {
                var splitSrc = servico.img_src.split('uploads');
                imagem = '<img style="width: 20%;" src="../../../uploads' + splitSrc[1] + '" />'
            }

            html = `
                <div class="col-lg-4">${servico.title}</div>
                <div class="col-lg-4">${servico.short_description}</div>
                <div class="col-lg-4">
                    ${imagem}
                </div>
            `;
            linha.innerHTML = html;
            linha.addEventListener("click", function () {
                selectServico("servico-" + servico.id);
            });
            servicosArea.append(linha);
        }
    }

    $('#servicosList').sortable({
        items: '> .valueLine',
        start: function (event, ui) {
            // Create a temporary attribute on the element with the old index
            $('#servicosList').attr('data-currentindex', ui.item.index());
        },
        update: function (event, ui) {
            var data = $(this).sortable('serialize');

            // Reset the current index
            $(this).removeAttr('data-currentindex');

            // Post to the server to handle the changes
            $.ajax({
                type: "GET",
                url: "functions/func-servicos.php?cmdEval=saveOrderServicos",
                data: data,
                beforeSend: function () {
                    // Disable dragging
                    $('#servicosList').sortable('disable');
                },
                success: function (html) {
                    // Re-enable dragging
                    $('#servicosList').sortable('enable');
                    getServicos(null, null);
                }
            });
        }
    });

    if (last != null) {
        document.querySelector("#servicosList .row:first-child").classList.add("active");
    }
    if (idServico != null) {
        document.querySelector("#servicosList #servico-" + idServico).classList.add("active");
    }
}

/* select servico */
function selectServico(id) {
    linhaServico = document.getElementById(id);

    /**
     * events triggered by selection and deselection
     * this code block only concerns the new/edit modal inputs
     */
    if (linhaServico.classList.contains("active")) {
        linhaServico.classList.remove("active");
        var inputs = document.getElementById('servicoInfo').getElementsByTagName('input');

        for (index = 0; index < inputs.length; ++index) {
            if (inputs[index].type == "text")
                inputs[index].value = '';
        }

        $('#servico-resumo').next().find('.note-editable').html('');
        $('.servico-resumo span').text('300');

        $('#servico-about').next().find('.note-editable').html('');

        $('#servico-why').next().find('.note-editable').html('');

        $('#servico-share').next().find('.note-editable').html('');

        document.getElementById('deleteServico').setAttribute('data-id-servico', '');

        $topicoArea = document.getElementById('servicoInfo');
        $topicoArea.setAttribute('data-id-servico', '');

        $('#servicoInfo').css({ 'display': 'none' });
        $('.servicoInfo').css({ 'display': 'none' });

    } else {
        $("#servicosList .valueLine").removeClass("active");
        linhaServico.classList.add("active");

        //load data into the inputs in the page
        getServicoById(id.replace("servico-", ""));
    }
}

/* get topico info by selected */
function getServicoById(idServico) {
    idServico = idServico.replace("servico-", "");
    listaServicos = document.querySelector('#servicosList');

    document.getElementById('deleteServico').setAttribute('data-id-servico', idServico);

    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getAllDataByServico(JSON.parse(resp[1]));
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro para aceder à informação dos Serviços.");
            }
        }
    };
    xhttp.open("GET", "functions/func-servicos.php?cmdEval=getAllServicosByIdServico&id_servico=" + idServico);
    xhttp.send();
}

/* get servico info */
function getAllDataByServico(servico) {
    $servicoArea = document.getElementById('servicoInfo');
    $servicoArea.setAttribute('data-id-servico', 'servico-' + servico[0].id);

    $('#servicoInfo').css({ 'display': 'flex' });
    $('.servicoInfo').css({ 'display': 'flex' });

    var $input_title = $('#servicoInfo #servico-titulo');
    var $input_sigla = $('#servicoInfo #servico-sigla');
    var $input_resumo = $('#servicoInfo #servico-resumo');
    var $input_about = $('#servicoInfo #servico-about');
    var $input_why = $('#servicoInfo #servico-why');
    var $input_share = $('#servicoInfo #servico-share');
    var $input_img = $('#servicoInfo #servico-icone');

    $input_title.val(servico[0].title);
    $input_sigla.val(servico[0].sigla);
    $input_resumo.next().find('.note-editable').html(servico[0].short_description);
    $('.servico-resumo span').text(300 - servico[0].short_description.replace(/(<([^>]+)>)/ig, "").length);
    
    $input_about.next().find('.note-editable').html(servico[0].about);
    
    $input_why.next().find('.note-editable').html(servico[0].why);
    
    $input_share.next().find('.note-editable').html(servico[0].sharing);

    // $input_img.val(servico[0].img_src);
}

/* save/update servico */
var $saveServicoBtn = $('#saveServico');
$saveServicoBtn.click(function () {
    var servico = new FormData;

    var $input_title = $('#servicoInfo #servico-titulo').val();
    var $input_sigla = $('#servicoInfo #servico-sigla').val();
    var $input_resumo = $('#servicoInfo #servico-resumo').next().find('.note-editable').html();
    var $input_about = $('#servicoInfo #servico-about').next().find('.note-editable').html();
    var $input_why = $('#servicoInfo #servico-why').next().find('.note-editable').html();
    var $input_share = $('#servicoInfo #servico-share').next().find('.note-editable').html();
    var $input_img = $('#servicoInfo #servico-icone').val();

    const files = document.querySelector('#servico-icone').files;

    $servicoArea = document.getElementById('servicoInfo');
    var servico_id = $servicoArea.getAttribute('data-id-servico');

    if (servico_id != null) servico_id = servico_id.replace("servico-", "");
    else servico_id = ''

    if ($input_share.replace(/(<([^>]+)>)/ig, '').length == 0) {
        $(".servico-share-erro.erro").text("Por favor, inserir o texto.");
    } else {
        $(".servico-share-erro.erro").text("");
    }

    if ($input_why.replace(/(<([^>]+)>)/ig, '').length == 0) {
        $(".servico-why-erro.erro").text("Por favor, inserir o texto.");
    } else {
        $(".servico-why-erro.erro").text("");
    }

    if ($input_about.replace(/(<([^>]+)>)/ig, '').length == 0) {
        $(".servico-about-erro.erro").text("Por favor, inserir o texto.");
    } else {
        $(".servico-about-erro.erro").text("");
    }

    if ($input_resumo.replace(/(<([^>]+)>)/ig, '').length == 0) {
        $(".servico-resumo-erro.erro").text("Por favor, inserir o texto.");
    } else {
        if ($input_resumo.replace(/(<([^>]+)>)/ig, '').length > 300) {
            $(".servico-resumo-erro.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
        } else {
            $(".servico-resumo-erro.erro").text("");
        }
    }

    if ($input_sigla == "") {
        $(".servico-sigla-erro.erro").text("Por favor, inserir a sigla.");
    } else {
        $(".servico-sigla-erro.erro").text("");
    }

    if ($input_title == "") {
        $(".servico-titulo-erro.erro").text("Por favor, inserir o título.");
    } else {
        $(".servico-titulo-erro.erro").text("");
    }

    if ($input_title != '' 
    && $input_sigla != '' 
    && $input_resumo != ''
    && $input_resumo.replace(/(<([^>]+)>)/ig, '').length < 301
    && $input_about != ''
    && $input_why != ''
    && $input_share != '') {
        servico.append('cmdEval', 'saveServico');
        servico.append("id", servico_id);
        servico.append("title", $input_title);
        servico.append("sigla", $input_sigla);
        servico.append("short_description", $input_resumo);
        servico.append("about", $input_about);
        servico.append("why", $input_why);
        servico.append("sharing", $input_share);

        if (files.length > 0) {
            servico.append("img", $input_img);
            for (let i = 0; i < files.length; i++) {
                let file = files[i]
                servico.append('filesServices[]', file)
            }
        }

        var xhttp = new XMLHttpRequest;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    $.notify("Serviço guardado com sucesso!", "success");

                    linhaServico = document.getElementById('servico-' + servico_id);

                    var inputs = document.getElementById('servicoInfo').getElementsByTagName('input');

                    for (index = 0; index < inputs.length; ++index) {
                        inputs[index].value = '';
                    }

                    $('#servicoInfo #servico-resumo').next().find('.note-editable').html('');
                    $('.servico-resumo span').text('300');

                    $('#servicoInfo #servico-about').next().find('.note-editable').html('');

                    $('#servicoInfo #servico-why').next().find('.note-editable').html('');

                    $('#servicoInfo #servico-share').next().find('.note-editable').html('');

                    $('#servicoInfo').css({ 'display': 'none' });
                    $('.servicoInfo').css({ 'display': 'none' });

                    document.getElementById('deleteServico').setAttribute('data-id-servico', '');

                    if ($servicoArea) {
                        if (servico_id == '') getServicos(null, null);
                        else getServicos(null, servico_id);
                        $servicoArea = document.getElementById('servicoInfo');
                        $servicoArea.setAttribute('data-id-servico', '');
                    } else {
                        getServicos("last", null);
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

        xhttp.open("POST", "functions/func-servicos.php", true);
        xhttp.send(servico);
    }
});

/**
 * delete servico
 */
var $deleteServicoBtn = $('#deleteServico');
$deleteServicoBtn.click(function (id) {
    id = document.getElementById('deleteServico').getAttribute('data-id-servico');
    xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getServicos()
                $.notify("Serviço apagado com sucesso.", "success");

                document.getElementById('deleteServico').setAttribute('data-id-servico', '');

                var inputs = document.getElementById('servicoInfo').getElementsByTagName('input');

                for (index = 0; index < inputs.length; ++index) {
                    inputs[index].value = '';
                }

                $('#servicoInfo #servico-resumo').next().find('.note-editable').html('');
                $('.servico-resumo span').text('300');

                $('#servicoInfo #servico-about').next().find('.note-editable').html('');

                $('#servicoInfo #servico-why').next().find('.note-editable').html('');

                $('#servicoInfo #servico-share').next().find('.note-editable').html('');

                $('#servicoInfo').css({ 'display': 'none' });
                $('.servicoInfo').css({ 'display': 'none' });
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Não foi possível apagar o serviço.");
            }
        }
    }
    xhttp.open("GET", "functions/func-servicos.php?cmdEval=deleteServico&id=" + id);
    xhttp.send();
});