/* eslint-disable */
window.addEventListener('load', function (e) {
    getEquipaHomepage();

    $('#equipa-text').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']]
        ],
        callbacks: {
            onKeydown: function (e) {
                var t = e.currentTarget.innerText;
                if (t.trim().length >= 800) {
                //delete keys, arrow keys, copy, cut, select all
                if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
                    e.preventDefault();
                }
            },
            onKeyup: function (e) {
                var t = e.currentTarget.innerText;
                $('.equipa-text span').text(800 - t.trim().length);
            },
            onPaste: function (e) {
                var t = e.currentTarget.innerText;
                var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                e.preventDefault();
                var maxPaste = bufferText.length;
                if (t.length + bufferText.length > 800) {
                maxPaste = 800 - t.length;
                }
                if (maxPaste > 0) {
                document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
                }
                $('.equipa-text span').text(800 - t.length);
            }
        }
    });
});

$("#equipa-text").on("keypress", function () {
    var limiteCaracteres = 800;
    var caracteres = $(this).text();
    var totalCaracteres = caracteres.length;
  
    //Update Count value
    $(".equipa-text span").text(totalCaracteres);
  
    //Check and Limit Charaters
    if (totalCaracteres >= limiteCaracteres) {
      return false;
    }
});

/* get Equipa Homepage info */
function getEquipaHomepage() {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                var equipa_data = JSON.parse(resp[1]);
                var $input_name = $('#equipa #equipa-name');
                var $input_cargo = $('#equipa #equipa-cargo');
                var $input_img = $('#equipa #equipa-img');

                var $input_title = $('#equipa #equipa-title');
                var $input_content = $('#equipa #equipa-text');
                var $input_cta = $('#equipa #equipa-cta');
                var $input_link = $('#equipa #equipa-link');

                var splitSrc = equipa_data.img.split('uploads');

                $input_name.val(equipa_data.name);
                $input_cargo.val(equipa_data.cargo);
                $input_img.html('<img style="width: 60%;" src="../../../uploads' + splitSrc[1] + '" />');

                $input_title.val(equipa_data.title);
                $input_content.next().find('.note-editable').html(equipa_data.text);
                $('.about-text span').text(800 - equipa_data.text.replace(/(<([^>]+)>)/ig, "").length);
                $input_cta.val(equipa_data.cta_txt);
                $input_link.val(equipa_data.link);
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

    xhttp.open("GET", "functions/func-equipa.php?cmdEval=getEquipaHomepage");
    xhttp.send();
}

/* update Equipa Homepage info */
var $saveEquipaBtn = $('#saveEquipa');
$saveEquipaBtn.click(function () {
    var equipa = new FormData;

    var $input_name = $('#equipa #equipa-name').val();
    var $input_cargo = $('#equipa #equipa-cargo').val();
    var $input_img = $('#equipa #equipa-img-upload').val();
    var $div_img = $('#equipa #equipa-img').text();

    const files = document.querySelector('#equipa-img-upload').files;

    var $input_title = $('#equipa #equipa-title').val();
    var $input_content = $('#equipa #equipa-text').next().find('.note-editable').html();
    var $input_cta = $('#equipa #equipa-cta').val();
    var $input_link = $('#equipa #equipa-link').val();

    if ($input_link == "") {
        $(".equipa-link-erro.erro").text("Por favor, inserir o link di botão.");
    } else {
        $(".equipa-link-erro.erro").text("");
    }

    if ($input_cta == "") {
        $(".equipa-cta-erro.erro").text("Por favor, inserir o texto do botão.");
    } else {
        $(".equipa-cta-erro.erro").text("");
    }

    if ($input_content.replace(/(<([^>]+)>)/ig, '').length == 0) {
        $(".equipa-text-erro.erro").text("Por favor, inserir texto.");
    } else {
        if ($input_content.replace(/(<([^>]+)>)/ig, '').length > 800) {
            $(".equipa-text-erro.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
        } else {
            $(".equipa-text-erro.erro").text("");
        }
    }

    if ($input_title == "") {
        $(".equipa-title-erro.erro").text("Por favor, inserir o título.");
    } else {
        $(".equipa-title-erro.erro").text("");
    }

    if ($input_cargo == "") {
        $(".equipa-cargo-erro.erro").text("Por favor, inserir o cargo.");
    } else {
        $(".equipa-cargo-erro.erro").text("");
    }

    if ($input_name == "") {
        $(".equipa-name-erro.erro").text("Por favor, inserir o nome.");
    } else {
        $(".equipa-name-erro.erro").text("");
    }

    if ($input_title != '' && $input_content != '' && $input_cta != '' && $input_link != '' && $input_content.replace(/(<([^>]+)>)/ig, '').length < 801) {
        equipa.append("cmdEval", "updateEquipaHomepage");
        equipa.append("name", $input_name);
        equipa.append("cargo", $input_cargo);

        equipa.append("title", $input_title);
        equipa.append("content", $input_content);
        equipa.append("cta", $input_cta);
        equipa.append("link", $input_link);

        if (files.length > 0) {
            equipa.append("img", $input_img);
            for (let i = 0; i < files.length; i++) {
                let file = files[i]
                equipa.append('files[]', file)
            }
        }

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

        xhttp.open("POST", "functions/func-equipa.php", true);
        xhttp.send(equipa);
    }
});