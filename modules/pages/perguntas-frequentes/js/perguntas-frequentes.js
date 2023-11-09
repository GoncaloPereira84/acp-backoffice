/* eslint-disable */
window.addEventListener('load', function (e) {
    getFaqs();

    $('#faqs-resposta').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']]
        ]
    });
});


/* get Especialidades Homepage info */
function getFaqs(last, idFaqs) {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                printFaqsEntries(JSON.parse(resp[1]), last, idFaqs);
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro ao aceder à informação das FAQS");
            }
        }
    };
    xhttp.open("GET", "functions/func-perguntas-frequentes.php?cmdEval=getFaqs");
    xhttp.send();
}

/* print especialidades */
function printFaqsEntries(topics, last, idFaqs) {
    ppArea = document.querySelector("#faqsPergList");
    document.querySelector("#faqsPergList").innerHTML = "";
    arrayStatus = [];
    ppArea.innerHTML = "";
    for (const i in topics) {
        if (topics.hasOwnProperty(i)) {
            const topic = topics[i];
            linha = document.createElement("div");
            linha.id = "faqs-" + topic.faq_id;
            linha.classList.add("col-lg-12");
            linha.classList.add("valueLine");
            linha.style.display = 'flex';
            linha.style.cursor = 'pointer';

            linha.dataset.faqid = topic.faq_id;

            html = `
                <div class="col-lg-6">${topic.pergunta}</div>
                <div class="col-lg-6">${topic.resposta}</div>
            `;
            linha.innerHTML = html;
            linha.addEventListener("click", function () {
                selectFaq("faqs-" + topic.faq_id);
            });
            ppArea.append(linha);
        }
    }

    $('#faqsPergList').sortable({
        items: '> .valueLine',
        start: function (event, ui) {
            // Create a temporary attribute on the element with the old index
            $('#faqsPergList').attr('data-currentindex', ui.item.index());
        },
        update: function (event, ui) {
            var data = $(this).sortable('serialize');

            // Reset the current index
            $(this).removeAttr('data-currentindex');

            // Post to the server to handle the changes
            $.ajax({
                type: "GET",
                url: "functions/func-perguntas-frequentes.php?cmdEval=saveOrderFaqs",
                data: data,
                beforeSend: function () {
                    // Disable dragging
                    $('#faqsPergList').sortable('disable');
                },
                success: function (html) {
                    // Re-enable dragging
                    $('#faqsPergList').sortable('enable');
                    getFaqs(null, null);
                }
            });
        }
    });

    if (last != null) {
        document.querySelector("#faqsPergList .row:first-child").classList.add("active");
    }
    if (idFaqs != null) {
        document.querySelector("#faqsPergList #faqs-" + idFaqs).classList.add("active");
    }
}

/* select especialidade */
function selectFaq(id) {
    linhaFaq = document.getElementById(id);

    /**
     * events triggered by selection and deselection
     * this code block only concerns the new/edit modal inputs
     */
    if (linhaFaq.classList.contains("active")) {
        linhaFaq.classList.remove("active");
        var inputs = document.getElementById('faqsPergInfo').getElementsByTagName('input');

        $('#faqs-resposta').next().find('.note-editable').html('');

        $('#faqsPergInfo').css({ 'display': 'none' });

        for (index = 0; index < inputs.length; ++index) {
            if (inputs[index].type == "text")
                inputs[index].value = '';
        }

        $faqsArea = document.getElementById('faqsPergInfo');
        $faqsArea.setAttribute('data-id-faqs', '');

        document.getElementById('deleteFaq').setAttribute('data-id-topico', '');

    } else {
        $("#faqsPergList .valueLine").removeClass("active");
        linhaFaq.classList.add("active");

        //load data into the inputs in the page
        getFaqById(id.replace("faqs-", ""));
    }
}

/* get slide info by selected */
function getFaqById(idFaqs) {
    idFaqs = idFaqs.replace("faqs-", "");
    listFaq = document.querySelector('#faqsPergList');

    document.getElementById('deleteFaq').setAttribute('data-id-topico', idFaqs);

    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getAllDataByFaq(JSON.parse(resp[1]));
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro para aceder à informação das FAQS.");
            }
        }
    };
    xhttp.open("GET", "functions/func-perguntas-frequentes.php?cmdEval=getAllInfoByIdFaq&id_faqs=" + idFaqs);
    xhttp.send();
}

/* get slide info */
function getAllDataByFaq(topic) {
    $faqArea = document.getElementById('faqsPergInfo');
    $faqArea.setAttribute('data-id-faqs', 'faqs-' + topic[0].faq_id);

    $('#faqsPergInfo').css({ 'display': 'flex' });

    var $input_pergunta = $('#faqsPergInfo #faqs-pergunta');
    var $input_resposta = $('#faqsPergInfo #faqs-resposta');

    $input_pergunta.val(topic[0].pergunta);
    $input_resposta.next().find('.note-editable').html(topic[0].resposta);
}

/* save/update especialidade */
var $saveFaqsBtn = $('#saveFaqs');
$saveFaqsBtn.click(function () {
    var topico = new FormData;

    var $input_pergunta = $('#faqsPergInfo #faqs-pergunta').val();
    var $input_resposta = $('#faqsPergInfo #faqs-resposta').next().find('.note-editable').html();

    $faqsArea = document.getElementById('faqsPergInfo');
    var faq_id = $faqsArea.getAttribute('data-id-faqs');

    if (faq_id != null)
        faq_id = faq_id.replace("faqs-", "");
    else
        faq_id = ''

    if ($input_resposta.replace(/(<([^>]+)>)/ig, '').length == 0) {
        $(".faqs-resposta-erro.erro").text("Por favor, inserir o texto.");
    } else {
        $(".faqs-resposta-erro.erro").text("");
    }

    if ($input_pergunta == "") {
        $(".faqs-pergunta-erro.erro").text("Por favor, inserir a pergunta.");
    } else {
        $(".faqs-pergunta-erro.erro").text("");
    }

    if ($input_pergunta != '' && $input_resposta != '') {
        topico.append('cmdEval', 'saveFaq');
        topico.append("id", faq_id);
        topico.append("pergunta", $input_pergunta);
        topico.append("resposta", $input_resposta);

        var xhttp = new XMLHttpRequest;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    $.notify("Pergunta guardada com sucesso!", "success");

                    linhaPP = document.getElementById('faqs-' + faq_id);

                    document.getElementById('deleteFaq').setAttribute('data-id-topico', '');

                    var inputs = document.getElementById('faqsPergInfo').getElementsByTagName('input');

                    $('#faqs-resposta').next().find('.note-editable').html('');
            
                    $('#faqsPergInfo').css({ 'display': 'none' });

                    
                    for (index = 0; index < inputs.length; ++index) {
                        inputs[index].value = '';
                    }

                    if ($faqsArea) {
                        if (faq_id == '')
                            getFaqs(null, null);
                        else
                            getFaqs(null, faq_id);
                        $faqsArea = document.getElementById('faqsPergInfo');
                        $faqsArea.setAttribute('data-id-faqs', '');
                    } else {
                        getFaqs("last", null);
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

        xhttp.open("POST", "functions/func-perguntas-frequentes.php", true);
        xhttp.send(topico);
    }
});

/**
* delete slide
*/
var $deleteFaqBtn = $('#deleteFaq');
$deleteFaqBtn.click(function (id) {
    id = document.getElementById('deleteFaq').getAttribute('data-id-topico');
    xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getFaqs()
                $.notify("Tópico apagado com sucesso.", "success");

                var inputs = document.getElementById('faqsPergInfo').getElementsByTagName('input');

                $('#faqs-resposta').next().find('.note-editable').html('');
            
                $('#faqsPergInfo').css({ 'display': 'none' });

                for (index = 0; index < inputs.length; ++index) {
                    inputs[index].value = '';
                }

                document.getElementById('deleteFaq').setAttribute('data-id-topico', '');
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Não foi possível apagar o tópico.");
            }
        }
    }
    xhttp.open("GET", "functions/func-perguntas-frequentes.php?cmdEval=deleteFaq&id=" + id);
    xhttp.send();
});