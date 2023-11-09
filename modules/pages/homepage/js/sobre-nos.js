/* eslint-disable */
window.addEventListener('load', function (e) {
    getAboutHomepage();

    $('#about-text').summernote({
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
                $('.about-text span').text(400 - t.trim().length);
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
                $('.about-text span').text(400 - t.length);
            }
        }
    });
});

$("#about-text").on("keypress", function () {
    var limiteCaracteres = 400;
    var caracteres = $(this).text();
    var totalCaracteres = caracteres.length;
  
    //Update Count value
    $(".about-text span").text(totalCaracteres);
  
    //Check and Limit Charaters
    if (totalCaracteres >= limiteCaracteres) {
      return false;
    }
});

/* get About Homepage info */
function getAboutHomepage() {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                var about_data = JSON.parse(resp[1]);
                var $input_title = $('#sobre-nos #about-title');
                var $input_content = $('#sobre-nos #about-text');
                var $input_cta = $('#sobre-nos #about-cta');
                var $input_link = $('#sobre-nos #about-link');

                $input_title.val(about_data.title);
                $input_content.next().find('.note-editable').html(about_data.content);
                $('.about-text span').text(400 - about_data.content.replace(/(<([^>]+)>)/ig, "").length);
                $input_cta.val(about_data.cta_txt);
                $input_link.val(about_data.link);
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

    xhttp.open("GET", "functions/func-sobre-nos.php?cmdEval=getAboutHomepage");
    xhttp.send();
}

/* update About Homepage info */
var $saveAboutBtn = $('#saveAbout');
$saveAboutBtn.click(function () {
    var about = new FormData;
    var $input_title = $('#sobre-nos #about-title').val();
    var $input_content = $('#sobre-nos #about-text').next().find('.note-editable').html();
    var $input_cta = $('#sobre-nos #about-cta').val();
    var $input_link = $('#sobre-nos #about-link').val();

    if ($input_link == "") {
        $(".about-link-erro.erro").text("Por favor, inserir o link do botão.");
    } else {
        $(".about-link-erro.erro").text("");
    }

    if ($input_cta == "") {
        $(".about-cta-erro.erro").text("Por favor, inserir o texto do botão.");
    } else {
        $(".about-cta-erro.erro").text("");
    }

    if ($input_content.replace(/(<([^>]+)>)/ig, '').length == 0) {
        $(".about-text-erro.erro").text("Por favor, inserir texto.");
    } else {
        if ($input_content.replace(/(<([^>]+)>)/ig, '').length > 400) {
            $(".about-text-erro.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
        } else {
            $(".about-text-erro.erro").text("");
        }
    }

    if ($input_title == "") {
        $(".about-title-erro.erro").text("Por favor, inserir o título.");
    } else {
        $(".about-title-erro.erro").text("");
    }

    if ($input_title != '' && $input_content != '' && $input_cta != '' && $input_link != '' && $input_content.replace(/(<([^>]+)>)/ig, '').length < 401) {
        about.append("cmdEval", "updateAboutHomepage");
        about.append("title", $input_title);
        about.append("content", $input_content);
        about.append("cta", $input_cta);
        about.append("link", $input_link);

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

        xhttp.open("POST", "functions/func-sobre-nos.php", true);
        xhttp.send(about);
    }
});