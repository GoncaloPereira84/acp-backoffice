/* eslint-disable */
window.addEventListener('load', function (e) {
    getHistoria();

    $('#historia-text1').summernote({
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
                $('.historia-text1 span').text(300 - t.trim().length);
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
                $('.historia-text1 span').text(300 - t.length);
            }
        }
    });

    $('#historia-text2').summernote({
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
                $('.historia-text2 span').text(300 - t.trim().length);
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
                $('.historia-text2 span').text(300 - t.length);
            }
        }
    });
});

$("#historia-text1").on("keypress", function () {
    var limiteCaracteres = 300;
    var caracteres = $(this).text();
    var totalCaracteres = caracteres.length;
  
    //Update Count value
    $(".historia-text1 span").text(totalCaracteres);
  
    //Check and Limit Charaters
    if (totalCaracteres >= limiteCaracteres) {
      return false;
    }
});

$("#historia-text2").on("keypress", function () {
    var limiteCaracteres = 300;
    var caracteres = $(this).text();
    var totalCaracteres = caracteres.length;
  
    //Update Count value
    $(".historia-text2 span").text(totalCaracteres);
  
    //Check and Limit Charaters
    if (totalCaracteres >= limiteCaracteres) {
      return false;
    }
});

/* get Historia info */
function getHistoria() {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                var hist_data = JSON.parse(resp[1]);
                var $input_text1 = $('#historia #historia-text1');
                var $input_text2 = $('#historia #historia-text2');
                
                $input_text1.next().find('.note-editable').html(hist_data.text);
                $('.historia-text1 span').text(300 - hist_data.text.replace(/(<([^>]+)>)/ig, "").length);
                
                $input_text2.next().find('.note-editable').html(hist_data.text2);
                $('.historia-text2 span').text(300 - hist_data.text2.replace(/(<([^>]+)>)/ig, "").length);
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

    xhttp.open("GET", "functions/func-intro.php?cmdEval=getHistoria");
    xhttp.send();
}

/* update historia info */
var $saveHistBtn = $('#saveHistoria');
$saveHistBtn.click(function () {
    var hist = new FormData;
    var $input_text1 = $('#historia #historia-text1').next().find('.note-editable').html();
    var $input_text2 = $('#historia #historia-text2').next().find('.note-editable').html();

    if ($input_text2.replace(/(<([^>]+)>)/ig, '').length == 0) {
        $(".historia-text2-erro.erro").text("Por favor, inserir texto.");
    } else {
        if ($input_text2.replace(/(<([^>]+)>)/ig, '').length > 300) {
            $(".historia-text2-erro.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
        } else {
            $(".historia-text2-erro.erro").text("");
        }
    }

    if ($input_text1.replace(/(<([^>]+)>)/ig, '').length == 0) {
        $(".historia-text1-erro.erro").text("Por favor, inserir texto.");
    } else {
        if ($input_text1.replace(/(<([^>]+)>)/ig, '').length > 300) {
            $(".historia-text1-erro.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
        } else {
            $(".historia-text1-erro.erro").text("");
        }
    }

    if ($input_text1 != '' && $input_text2 != '' && $input_text1.replace(/(<([^>]+)>)/ig, '').length < 301 && $input_text2.replace(/(<([^>]+)>)/ig, '').length < 301) {
        hist.append("cmdEval", "updateHistoria");
        hist.append("text", $input_text1);
        hist.append("text2", $input_text2);

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

        xhttp.open("POST", "functions/func-intro.php", true);
        xhttp.send(hist);
    }
});