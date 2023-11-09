/* eslint-disable */
window.addEventListener('load', function (e) {
    $('#faqs-resposta').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']]
        ]
    });
});

/* save/update especialidade */
var $saveFaqsBtn = $('#saveFaqs');
$saveFaqsBtn.click(function () {
    var topico = new FormData;

    var $input_pergunta = $('#faqsPergInfo #faqs-pergunta').val();
    var $input_resposta = $('#faqsPergInfo #faqs-resposta').next().find('.note-editable').html();

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
        topico.append("pergunta", $input_pergunta);
        topico.append("resposta", $input_resposta);

        var xhttp = new XMLHttpRequest;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    $.notify("Pergunta guardada com sucesso!", "success");

                    setTimeout(() => {
                        // window.location.href = "https://backoffice.anacarolinapereira.pt/modules/pages/perguntas-frequentes/perguntas-frequentes.php";
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

        xhttp.open("POST", "functions/func-adicionar-pergunta.php", true);
        xhttp.send(topico);
    }
});