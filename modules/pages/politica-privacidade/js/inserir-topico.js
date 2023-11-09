/* eslint-disable */
window.addEventListener('load', function (e) {
    $('#pp-text').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']]
        ]
    });
});

/* save/update especialidade */
var $savePPBtn = $('#savePP');
$savePPBtn.click(function () {
    var topico = new FormData;

    var $input_title = $('#ppInfo #pp-title').val();
    var $input_text = $('#ppInfo #pp-text').next().find('.note-editable').html();

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
        topico.append("title", $input_title);
        topico.append("content", $input_text);

        var xhttp = new XMLHttpRequest;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    $.notify("Tópico guardado com sucesso!", "success");

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

        xhttp.open("POST", "functions/func-inserir-topico.php", true);
        xhttp.send(topico);
    }
});