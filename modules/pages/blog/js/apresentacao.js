/* eslint-disable */
window.addEventListener('load', function (e) {
    getApresentacao();

    $('#apresentacao-text').summernote({
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
                $('.apresentacao-text span').text(450 - t.trim().length);
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
                $('.apresentacao-text span').text(450 - t.length);
            }
        }
    });
});

/* get Apresentação info */
function getApresentacao() {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                var apr_data = JSON.parse(resp[1]);
                var $input_text = $('#blog-intro #apresentacao-text');

                $input_text.next().find('.note-editable').html(apr_data.text);
                $('.apresentacao-text span').text(450 - apr_data.text.replace(/(<([^>]+)>)/ig, "").length);
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

    xhttp.open("GET", "functions/func-apresentacao.php?cmdEval=getApresentacao");
    xhttp.send();
}

$("#apresentacao-text").on("keypress", function () {
    var limiteCaracteres = 450;
    var caracteres = $(this).text();
    var totalCaracteres = caracteres.length;
  
    //Update Count value
    $(".apresentacao-text span").text(totalCaracteres);
  
    //Check and Limit Charaters
    if (totalCaracteres >= limiteCaracteres) {
      return false;
    }
});

/* update Apresentação info */
var $saveBlogAprBtn = $('#saveApresentacao');
$saveBlogAprBtn.click(function () {
    var apr = new FormData;
    var $input_text = $('#blog-intro #apresentacao-text').next().find('.note-editable').html();

    if ($input_text.replace(/(<([^>]+)>)/ig, '').length == 0) {
        $(".apresentacao-text-erro.erro").text("Por favor, inserir texto.");
    } else {
        if ($input_text.replace(/(<([^>]+)>)/ig, '').length > 450) {
            $(".apresentacao-text-erro.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
        } else {
            $(".apresentacao-text-erro.erro").text("");
        }
    }

    if ($input_text != '' && $input_text.replace(/(<([^>]+)>)/ig, '').length < 451) {
        apr.append("cmdEval", "updateApresentacao");
        apr.append("text", $input_text);

        var xhttp = new XMLHttpRequest;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    $.notify("Texto guardado com sucesso!", "success");
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

        xhttp.open("POST", "functions/func-apresentacao.php", true);
        xhttp.send(apr);
    }
});