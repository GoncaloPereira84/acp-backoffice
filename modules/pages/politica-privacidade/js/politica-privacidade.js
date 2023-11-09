/* eslint-disable */
window.addEventListener('load', function (e) {
    getPoliticaPrivacidade();

    $('#pp-text').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']]
        ]
    });
});

/* get Especialidades Homepage info */
function getPoliticaPrivacidade(last, idPP) {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                printPPEntries(JSON.parse(resp[1]), last, idPP);
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro ao aceder à informação da Política de Privacidade");
            }
        }
    };
    xhttp.open("GET", "functions/func-politica-privacidade.php?cmdEval=getPoliticaPrivacidade");
    xhttp.send();
}

/* print especialidades */
function printPPEntries(topics, last, idPP) {
    ppArea = document.querySelector("#ppList");
    document.querySelector("#ppList").innerHTML = "";
    arrayStatus = [];
    ppArea.innerHTML = "";
    for (const i in topics) {
        if (topics.hasOwnProperty(i)) {
            const topic = topics[i];
            linha = document.createElement("div");
            linha.id = "pp-" + topic.id;
            linha.classList.add("col-lg-12");
            linha.classList.add("valueLine");
            linha.style.display = 'flex';
            linha.style.cursor = 'pointer';

            html = `
                <div class="col-lg-6">${topic.title}</div>
            `;
            linha.innerHTML = html;
            linha.addEventListener("click", function () {
                selectTopic("pp-" + topic.id);
            });
            ppArea.append(linha);
        }
    }

    $('#ppList').sortable({
        items: '> .valueLine',
        start: function (event, ui) {
            // Create a temporary attribute on the element with the old index
            $('#ppList').attr('data-currentindex', ui.item.index());
        },
        update: function (event, ui) {
            var data = $(this).sortable('serialize');

            // Reset the current index
            $(this).removeAttr('data-currentindex');

            // Post to the server to handle the changes
            $.ajax({
                type: "GET",
                url: "functions/func-politica-privacidade.php?cmdEval=saveOrderTopics",
                data: data,
                beforeSend: function () {
                    // Disable dragging
                    $('#ppList').sortable('disable');
                },
                success: function (html) {
                    // Re-enable dragging
                    $('#ppList').sortable('enable');
                    getPoliticaPrivacidade(null, null);
                }
            });
        }
    });

    if (last != null) {
        document.querySelector("#ppList .row:first-child").classList.add("active");
    }
    if (idPP != null) {
        document.querySelector("#ppList #pp-" + idPP).classList.add("active");
    }
}

/* select especialidade */
function selectTopic(id) {
    linhaPP = document.getElementById(id);

    /**
     * events triggered by selection and deselection
     * this code block only concerns the new/edit modal inputs
     */
    if (linhaPP.classList.contains("active")) {
        linhaPP.classList.remove("active");
        var inputs = document.getElementById('ppInfo').getElementsByTagName('input');

        for (index = 0; index < inputs.length; ++index) {
            if (inputs[index].type == "text")
                inputs[index].value = '';
        }

        $espArea = document.getElementById('ppInfo');
        $espArea.setAttribute('data-id-pp', '');

        document.getElementById('deletePP').setAttribute('data-id-pp', '');

        $('#pp-text').next().find('.note-editable').html('');

        $('#ppInfo').css({ 'display': 'none' });
        $('.ppInfo').css({ 'display': 'none' });

    } else {
        $("#ppList .valueLine").removeClass("active");
        linhaPP.classList.add("active");

        //load data into the inputs in the page
        getTopicById(id.replace("pp-", ""));
    }
}

/* get slide info by selected */
function getTopicById(idPP) {
    idPP = idPP.replace("pp-", "");
    listaPP = document.querySelector('#ppList');

    document.getElementById('deletePP').setAttribute('data-id-pp', idPP);

    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getAllDataByTopic(JSON.parse(resp[1]));
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro para aceder à informação dos Tópicos.");
            }
        }
    };
    xhttp.open("GET", "functions/func-politica-privacidade.php?cmdEval=getAllInfoByIdTopic&id_pp=" + idPP);
    xhttp.send();
}

/* get slide info */
function getAllDataByTopic(topic) {
    $ppArea = document.getElementById('ppInfo');
    $ppArea.setAttribute('data-id-pp', 'pp-' + topic[0].id);

    $('#ppInfo').css({ 'display': 'flex' });
    $('.ppInfo').css({ 'display': 'flex' });

    var $input_title = $('#ppInfo #pp-title');
    var $input_text = $('#ppInfo #pp-text');

    $input_title.val(topic[0].title);
    $input_text.next().find('.note-editable').html(topic[0].content);
}

/* save/update especialidade */
var $savePPBtn = $('#savePP');
$savePPBtn.click(function () {
    var topico = new FormData;

    var $input_title = $('#ppInfo #pp-title').val();
    var $input_text = $('#ppInfo #pp-text').next().find('.note-editable').html();

    $ppArea = document.getElementById('ppInfo');
    var pp_id = $ppArea.getAttribute('data-id-pp');

    if (pp_id != null)
        pp_id = pp_id.replace("pp-", "");
    else
        pp_id = ''

    if ($input_text.replace(/(<([^>]+)>)/ig, '').length == 0) {
        $(".pp-text-erro.erro").text("Por favor, inserir o texto.");
    } else {
        $(".pp-text-erro.erro").text("");
    }

    if ($input_title == "") {
        $(".pp-title-erro.erro").text("Por favor, inserir o título.");
    } else {
        $(".pp-title-erro.erro").text("");
    }

    if ($input_title != '' && $input_text != '') {
        topico.append('cmdEval', 'saveTopic');
        topico.append("id", pp_id);
        topico.append("title", $input_title);
        topico.append("content", $input_text);

        var xhttp = new XMLHttpRequest;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    $.notify("Tópico guardado com sucesso!", "success");

                    linhaPP = document.getElementById('pp-' + pp_id);

                    var inputs = document.getElementById('ppInfo').getElementsByTagName('input');
                    for (index = 0; index < inputs.length; ++index) {
                        inputs[index].value = '';
                    }
                    
                    document.getElementById('deletePP').setAttribute('data-id-pp', '');

                    if ($ppArea) {
                        if (pp_id == '')
                            getPoliticaPrivacidade(null, null);
                        else
                            getPoliticaPrivacidade(null, pp_id);
                        $ppArea = document.getElementById('ppInfo');
                        $ppArea.setAttribute('data-id-pp', '');
                    } else {
                        getPoliticaPrivacidade("last", null);
                    }

                    $('#pp-text').next().find('.note-editable').html('');
            
                    $('#ppInfo').css({ 'display': 'none' });
                    $('.ppInfo').css({ 'display': 'none' });

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

        xhttp.open("POST", "functions/func-politica-privacidade.php", true);
        xhttp.send(topico);
    }
});

/**
* delete PP
*/
var $deletePPBtn = $('#deletePP');
$deletePPBtn.click(function (id) {
    id = document.getElementById('deletePP').getAttribute('data-id-pp');
    xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getPoliticaPrivacidade()
                $.notify("Tópico apagado com sucesso.", "success");

                var inputs = document.getElementById('ppInfo').getElementsByTagName('input');
                for (index = 0; index < inputs.length; ++index) {
                    inputs[index].value = '';
                }

                document.getElementById('deletePP').setAttribute('data-id-pp', '');

                $('#pp-text').next().find('.note-editable').html('');
        
                $('#ppInfo').css({ 'display': 'none' });
                $('.ppInfo').css({ 'display': 'none' });
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Não foi possível apagar o tópico.");
            }
        }
    }
    xhttp.open("GET", "functions/func-politica-privacidade.php?cmdEval=deletePP&id=" + id);
    xhttp.send();
});