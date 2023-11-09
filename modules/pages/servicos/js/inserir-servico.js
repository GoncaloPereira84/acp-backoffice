/* eslint-disable */
window.addEventListener('load', function (e) {
    $('#servico-resumo').summernote({
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
                $('servico-resumo span').text(300 - t.trim().length);
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
                $('.servico-resumo span').text(300 - t.length);
            }
        }
    });

    $('#servico-about').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']]
        ]
    });

    $('#servico-why').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']]
        ]
    });

    $('#servico-share').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']]
        ]
    });
});

$("#servico-resumo").on("keypress", function () {
    var limiteCaracteres = 300;
    var caracteres = $(this).text();
    var totalCaracteres = caracteres.length;
  
    //Update Count value
    $(".servico-resumo span").text(totalCaracteres);
  
    //Check and Limit Charaters
    if (totalCaracteres >= limiteCaracteres) {
      return false;
    }
});

/* save/update servico */
var $saveServicoBtn = $('#saveServico');
$saveServicoBtn.click(function () {
    var servico = new FormData;

    var $input_title = $('#servicoInfo #servico-titulo').val();
    var $input_sigla = $('#servicoInfo #servico-sigla').val();
    var $input_resumo = $('#servicoInfo #servico-resumo').next().find('.note-editable').html();
    var $input_about = $('#servicoInfo #servico-about').next().find('.note-editable').html();
    var $input_why = $('#servicoInfo #servico-why').next().find('.note-editable').html();
    var $input_share = $('#servicoInfo #servico-share').next().find('.note-editable').html();
    var $input_img = $('#servicoInfo #servico-icone').val();

    const files = document.querySelector('#servico-icone').files;

    if ($input_share.replace(/(<([^>]+)>)/ig, '').length == 0) {
        $(".servico-share-erro.erro").text("Por favor, inserir o texto.");
    } else {
        $(".servico-share-erro.erro").text("");
    }

    if ($input_why.replace(/(<([^>]+)>)/ig, '').length == 0) {
        $(".servico-why-erro.erro").text("Por favor, inserir o texto.");
    } else {
        $(".servico-why-erro.erro").text("");
    }

    if ($input_about.replace(/(<([^>]+)>)/ig, '').length == 0) {
        $(".servico-about-erro.erro").text("Por favor, inserir o texto.");
    } else {
        $(".servico-about-erro.erro").text("");
    }

    if ($input_resumo.replace(/(<([^>]+)>)/ig, '').length == 0) {
        $(".servico-resumo-erro.erro").text("Por favor, inserir o texto.");
    } else {
        if ($input_resumo.replace(/(<([^>]+)>)/ig, '').length > 300) {
            $(".servico-resumo-erro.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
        } else {
            $(".servico-resumo-erro.erro").text("");
        }
    }

    if ($input_sigla == "") {
        $(".servico-sigla-erro.erro").text("Por favor, inserir a sigla.");
    } else {
        $(".servico-sigla-erro.erro").text("");
    }

    if ($input_title == "") {
        $(".servico-titulo-erro.erro").text("Por favor, inserir o título.");
    } else {
        $(".servico-titulo-erro.erro").text("");
    }

    if ($input_title != '' 
    && $input_sigla != '' 
    && $input_resumo != ''
    && $input_resumo.replace(/(<([^>]+)>)/ig, '').length < 301
    && $input_about != ''
    && $input_why != ''
    && $input_share != '') {
        servico.append('cmdEval', 'saveServico');
        servico.append("title", $input_title);
        servico.append("sigla", $input_sigla);
        servico.append("short_description", $input_resumo);
        servico.append("about", $input_about);
        servico.append("why", $input_why);
        servico.append("sharing", $input_share);

        if (files.length > 0) {
            servico.append("img", $input_img);
            for (let i = 0; i < files.length; i++) {
                let file = files[i]
                servico.append('filesServices[]', file)
            }
        }

        var xhttp = new XMLHttpRequest;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    $.notify("Serviço guardado com sucesso!", "success");

                    setTimeout(() => {
                        window.location.href = "https://backoffice.anacarolinapereira.pt/modules/pages/servicos/servicos.php";
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

        xhttp.open("POST", "functions/func-inserir-servico.php", true);
        xhttp.send(servico);
    }
});