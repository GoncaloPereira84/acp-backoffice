/* eslint-disable */
window.addEventListener('load', function (e) {
    getConfianca();
    getConfiancaTopicos();

    $('#conf-text').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']]
        ],
        callbacks: {
            onKeydown: function (e) {
                var t = e.currentTarget.innerText;
                if (t.trim().length >= 400) {
                //delete keys, arrow keys, copy, cut, select all
                if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
                    e.preventDefault();
                }
            },
            onKeyup: function (e) {
                var t = e.currentTarget.innerText;
                $('.conf-text span').text(400 - t.trim().length);
            },
            onPaste: function (e) {
                var t = e.currentTarget.innerText;
                var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                e.preventDefault();
                var maxPaste = bufferText.length;
                if (t.length + bufferText.length > 400) {
                maxPaste = 400 - t.length;
                }
                if (maxPaste > 0) {
                document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
                }
                $('.conf-text span').text(400 - t.length);
            }
        }
    });

    $('#conf-topico-text').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']]
        ],
        callbacks: {
            onKeydown: function (e) {
                var t = e.currentTarget.innerText;
                if (t.trim().length >= 200) {
                //delete keys, arrow keys, copy, cut, select all
                if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
                    e.preventDefault();
                }
            },
            onKeyup: function (e) {
                var t = e.currentTarget.innerText;
                $('.conf-topico-text span').text(200 - t.trim().length);
            },
            onPaste: function (e) {
                var t = e.currentTarget.innerText;
                var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                e.preventDefault();
                var maxPaste = bufferText.length;
                if (t.length + bufferText.length > 200) {
                maxPaste = 200 - t.length;
                }
                if (maxPaste > 0) {
                document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
                }
                $('.conf-topico-text span').text(200 - t.length);
            }
        }
    });
});

$("#conf-text").on("keypress", function () {
    var limiteCaracteres = 400;
    var caracteres = $(this).text();
    var totalCaracteres = caracteres.length;
  
    //Update Count value
    $(".conf-text span").text(totalCaracteres);
  
    //Check and Limit Charaters
    if (totalCaracteres >= limiteCaracteres) {
      return false;
    }
});

$("#conf-topico-text").on("keypress", function () {
    var limiteCaracteres = 200;
    var caracteres = $(this).text();
    var totalCaracteres = caracteres.length;
  
    //Update Count value
    $(".conf-topico-text span").text(totalCaracteres);
  
    //Check and Limit Charaters
    if (totalCaracteres >= limiteCaracteres) {
      return false;
    }
});

/* get confianca info */
function getConfianca() {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                var conf_data = JSON.parse(resp[1]);
                var $input_title = $('#confianca-apresentacao #conf-title');
                var $input_text = $('#confianca-apresentacao #conf-text');

                $input_title.val(conf_data.title);                
                $input_text.next().find('.note-editable').html(conf_data.text);
                $('.conf-text span').text(400 - conf_data.text.replace(/(<([^>]+)>)/ig, "").length);
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

    xhttp.open("GET", "functions/func-confianca.php?cmdEval=getConfianca");
    xhttp.send();
}

/* update confianca info */
var $saveConfBtn = $('#saveConfiancaApr');
$saveConfBtn.click(function () {
    var conf = new FormData;
    var $input_title = $('#confianca-apresentacao #conf-title').val();
    var $input_text = $('#confianca-apresentacao #conf-text').find('.note-editable').html();

    if ($input_text.replace(/(<([^>]+)>)/ig, '').length == 0) {
        $(".conf-text-erro.erro").text("Por favor, inserir texto.");
    } else {
        if ($input_text.replace(/(<([^>]+)>)/ig, '').length > 400) {
            $(".conf-text-erro.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
        } else {
            $(".conf-text-erro.erro").text("");
        }
    }

    if ($input_title == "") {
        $(".conf-title-erro.erro").text("Por favor, inserir o título.");
    } else {
        $(".conf-title-erro.erro").text("");
    }

    if ($input_title != '' && $input_text != '' && $input_text.replace(/(<([^>]+)>)/ig, '').length < 401) {
        conf.append("cmdEval", "updateConfianca");
        conf.append("title", $input_title);
        conf.append("text", $input_text);

        var xhttp = new XMLHttpRequest;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    $.notify("Dados guardados com sucesso!", "success");
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

        xhttp.open("POST", "functions/func-confianca.php", true);
        xhttp.send(conf);
    }
});

/* get confianca topicos info */
function getConfiancaTopicos(last, idTopico) {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                printTopicosEntries(JSON.parse(resp[1]), last, idTopico);
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro ao aceder à informação dos tópicos da Confiança");
            }
        }
    };
    xhttp.open("GET", "functions/func-confianca.php?cmdEval=getConfiancaTopicos");
    xhttp.send();
}

/* print topicos */
function printTopicosEntries(topicos, last, idTopico) {
    topicosArea = document.querySelector("#confiancaList");
    document.querySelector("#confiancaList").innerHTML = "";
    arrayStatus = [];
    topicosArea.innerHTML = "";
    for (const i in topicos) {
        if (topicos.hasOwnProperty(i)) {
            const topico = topicos[i];
            linha = document.createElement("div");
            linha.id = "topico-" + topico.id;
            linha.classList.add("col-lg-12");
            linha.classList.add("valueLine");
            linha.style.display = 'flex';
            linha.style.cursor = 'pointer';

            var imagem;
            if (topico.img_src == null || topico.img_src == '') {
                imagem = 'Não tem imagem.'
            } else {
                var splitSrc = topico.img_src.split('uploads');
                imagem = '<img style="height: 100%;" src="../../../uploads' + splitSrc[1] + '" />'
            }

            html = `
                <div class="col-lg-3">${topico.title}</div>
                <div class="col-lg-3">${topico.text}</div>
                <div class="col-lg-3">
                    ${imagem}
                </div>
            `;
            linha.innerHTML = html;
            linha.addEventListener("click", function () {
                selectTopico("topico-" + topico.id);
            });
            topicosArea.append(linha);
        }
    }

    $('#confiancaList').sortable({
        items: '> .valueLine',
        start: function (event, ui) {
            // Create a temporary attribute on the element with the old index
            $('#confiancaList').attr('data-currentindex', ui.item.index());
        },
        update: function (event, ui) {
            var data = $(this).sortable('serialize');

            // Reset the current index
            $(this).removeAttr('data-currentindex');

            // Post to the server to handle the changes
            $.ajax({
                type: "GET",
                url: "functions/func-confianca.php?cmdEval=saveOrderConfiancaTopicos",
                data: data,
                beforeSend: function () {
                    // Disable dragging
                    $('#confiancaList').sortable('disable');
                },
                success: function (html) {
                    // Re-enable dragging
                    $('#confiancaList').sortable('enable');
                    getConfiancaTopicos(null, null);
                }
            });
        }
    });

    if (last != null) {
        document.querySelector("#confiancaList .row:first-child").classList.add("active");
    }
    if (idTopico != null) {
        document.querySelector("#confiancaList #topico-" + idTopico).classList.add("active");
    }
}

/* select topico */
function selectTopico(id) {
    linhaTopico = document.getElementById(id);

    /**
     * events triggered by selection and deselection
     * this code block only concerns the new/edit modal inputs
     */
    if (linhaTopico.classList.contains("active")) {
        linhaTopico.classList.remove("active");
        var inputs = document.getElementById('confiancaInfo').getElementsByTagName('input');

        for (index = 0; index < inputs.length; ++index) {
            if (inputs[index].type == "text")
                inputs[index].value = '';
        }

        $('#conf-topico-text').next().find('.note-editable').html('');
        $('.conf-topico-text span').text('200');

        document.getElementById('deleteConfTopico').setAttribute('data-id-topico', '');

        $topicoArea = document.getElementById('confiancaInfo');
        $topicoArea.setAttribute('data-id-topico', '');

        $('#confiancaInfo').css({ 'display': 'none' });
        $('.confiancaInfo').css({ 'display': 'none' });

    } else {
        $("#confiancaList .valueLine").removeClass("active");
        linhaTopico.classList.add("active");

        //load data into the inputs in the page
        getTopicoById(id.replace("topico-", ""));
    }
}

/* get topico info by selected */
function getTopicoById(idTopico) {
    idTopico = idTopico.replace("topico-", "");
    listaTopicos = document.querySelector('#confiancaList');

    document.getElementById('deleteConfTopico').setAttribute('data-id-topico', idTopico);

    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getAllDataByTopico(JSON.parse(resp[1]));
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro para aceder à informação dos tópicos da Confiança.");
            }
        }
    };
    xhttp.open("GET", "functions/func-confianca.php?cmdEval=getAllTopicosByIdTopico&id_topico=" + idTopico);
    xhttp.send();
}

/* get topico info */
function getAllDataByTopico(topico) {
    $topicoArea = document.getElementById('confiancaInfo');
    $topicoArea.setAttribute('data-id-topico', 'topico-' + topico[0].id);

    $('#confiancaInfo').css({ 'display': 'flex' });
    $('.confiancaInfo').css({ 'display': 'flex' });

    var $input_title = $('#confiancaInfo #conf-topico-title');
    var $input_text = $('#confiancaInfo #conf-topico-text');
    var $input_img = $('#confiancaInfo #conf-topico-img');

    $input_title.val(topico[0].title);
    $input_text.next().find('.note-editable').html(topico[0].text);
    $('.conf-topico-text span').text(200 - topico[0].text.replace(/(<([^>]+)>)/ig, "").length);
    // $input_img.val(topico[0].img_src);
}

/* save/update topico */
var $saveTopicoBtn = $('#saveConfTopico');
$saveTopicoBtn.click(function () {
    var topico = new FormData;

    var $input_title = $('#confiancaInfo #conf-topico-title').val();
    var $input_text = $('#confiancaInfo #conf-topico-text').next().find('.note-editable').html();
    var $input_img = $('#confiancaInfo #conf-topico-img').val();

    const files = document.querySelector('#conf-topico-img').files;

    $topicoArea = document.getElementById('confiancaInfo');
    var topico_id = $topicoArea.getAttribute('data-id-topico');

    if (topico_id != null)
        topico_id = topico_id.replace("topico-", "");
    else
        topico_id = ''

    if ($input_text.replace(/(<([^>]+)>)/ig, '').length == 0) {
        $(".conf-topico-text-erro.erro").text("Por favor, inserir texto.");
    } else {
        if ($input_text.replace(/(<([^>]+)>)/ig, '').length > 200) {
            $(".conf-topico-text-erro.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
        } else {
            $(".conf-topico-text-erro.erro").text("");
        }
    }

    if ($input_title == "") {
        $(".conf-topico-title-erro.erro").text("Por favor, inserir o título.");
    } else {
        $(".conf-topico-title-erro.erro").text("");
    }

    if ($input_title != '' && $input_text != '' && $input_text.replace(/(<([^>]+)>)/ig, '').length < 201) {
        topico.append('cmdEval', 'saveTopico');
        topico.append("id", topico_id);
        topico.append("title", $input_title);
        topico.append("text", $input_text);

        if (files.length > 0) {
            topico.append("img", $input_img);
            for (let i = 0; i < files.length; i++) {
                let file = files[i]
                topico.append('filesConf[]', file)
            }
        }

        var xhttp = new XMLHttpRequest;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    $.notify("Tópico guardado com sucesso!", "success");

                    linhaTopico = document.getElementById('topico-' + topico_id);

                    var inputs = document.getElementById('confiancaInfo').getElementsByTagName('input');

                    for (index = 0; index < inputs.length; ++index) {
                        inputs[index].value = '';
                    }

                    $('#confiancaInfo #conf-topico-text').next().find('.note-editable').html('');
                    $('.conf-topico-text span').text('200');

                    $('#confiancaInfo').css({ 'display': 'none' });
                    $('.confiancaInfo').css({ 'display': 'none' });

                    document.getElementById('deleteConfTopico').setAttribute('data-id-topico', '');

                    if ($topicoArea) {
                        if (topico_id == '')
                            getConfiancaTopicos(null, null);
                        else
                            getConfiancaTopicos(null, topico_id);
                        $topicoArea = document.getElementById('confiancaInfo');
                        $topicoArea.setAttribute('data-id-topico', '');
                    } else {
                        getConfiancaTopicos("last", null);
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

        xhttp.open("POST", "functions/func-confianca.php", true);
        xhttp.send(topico);
    }
});

/**
 * delete tópico confiança
 */
var $deleteTopicoBtn = $('#deleteConfTopico');
$deleteTopicoBtn.click(function (id) {
    id = document.getElementById('deleteConfTopico').getAttribute('data-id-topico');
    xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getConfiancaTopicos()
                $.notify("Tópico apagado com sucesso.", "success");

                document.getElementById('deleteConfTopico').setAttribute('data-id-topico', '');

                var inputs = document.getElementById('confiancaInfo').getElementsByTagName('input');

                for (index = 0; index < inputs.length; ++index) {
                    inputs[index].value = '';
                }

                $('#confiancaInfo #area-text').next().find('.note-editable').html('');
                $('.conf-topico-text span').text('200');

                $('#confiancaInfo').css({ 'display': 'none' });
                $('.confiancaInfo').css({ 'display': 'none' });
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Não foi possível apagar o tópico.");
            }
        }
    }
    xhttp.open("GET", "functions/func-confianca.php?cmdEval=deleteTopico&id=" + id);
    xhttp.send();
});