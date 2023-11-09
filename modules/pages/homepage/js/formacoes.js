/* eslint-disable */
window.addEventListener('load', function (e) {
    getFormacoesIntro();

    $('#formacoes-intro-text').summernote({
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
                $('.formacoes-intro-text span').text(400 - t.trim().length);
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
                $('.formacoes-intro-text span').text(400 - t.length);
            }
        }
    });
});

$("#formacoes-intro-text").on("keypress", function () {
    var limiteCaracteres = 400;
    var caracteres = $(this).text();
    var totalCaracteres = caracteres.length;
  
    //Update Count value
    $(".formacoes-intro-text span").text(totalCaracteres);
  
    //Check and Limit Charaters
    if (totalCaracteres >= limiteCaracteres) {
      return false;
    }
});

/* get Formacoes intro info */
function getFormacoesIntro() {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                var formacoes_data = JSON.parse(resp[1]);
                var $input_title = $('#formacoes #formacoes-intro-title');
                var $input_content = $('#formacoes #formacoes-intro-text');

                $input_title.val(formacoes_data.title);
                $input_content.next().find('.note-editable').html(formacoes_data.text);
                $('.about-text span').text(400 - formacoes_data.text.replace(/(<([^>]+)>)/ig, "").length);
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

    xhttp.open("GET", "functions/func-formacoes.php?cmdEval=getFormacoesIntro");
    xhttp.send();
}

/* update Formacao intro info */
var $saveFormacaoIntro = $('#saveFormacaoIntro');
$saveFormacaoIntro.click(function () {
    var about = new FormData;
    var $input_title = $('#formacoes #formacoes-intro-title').val();
    var $input_content = $('#formacoes #formacoes-intro-text').next().find('.note-editable').html();

    if ($input_content.replace(/(<([^>]+)>)/ig, '').length == 0) {
        $(".formacoes-intro-text-erro.erro").text("Por favor, inserir texto.");
    } else {
        if ($input_content.replace(/(<([^>]+)>)/ig, '').length > 400) {
            $(".formacoes-intro-text-erro.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
        } else {
            $(".formacoes-intro-text-erro.erro").text("");
        }
    }

    if ($input_title == "") {
        $(".formacoes-intro-title-erro.erro").text("Por favor, inserir o título.");
    } else {
        $(".formacoes-intro-title-erro.erro").text("");
    }

    if ($input_title != '' && $input_content != '' && $input_content.replace(/(<([^>]+)>)/ig, '').length < 401) {
        about.append("cmdEval", "updateFormacoesIntro");
        about.append("title", $input_title);
        about.append("text", $input_content);

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

        xhttp.open("POST", "functions/func-formacoes.php", true);
        xhttp.send(about);
    }
});