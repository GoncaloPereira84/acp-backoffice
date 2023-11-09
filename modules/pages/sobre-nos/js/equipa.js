/* eslint-disable */
window.addEventListener('load', function (e) {
    getEquipa();

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
                if (t.trim().length >= 1600) {
                //delete keys, arrow keys, copy, cut, select all
                if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
                    e.preventDefault();
                }
            },
            onKeyup: function (e) {
                var t = e.currentTarget.innerText;
                $('.equipa-text span').text(1600 - t.trim().length);
            },
            onPaste: function (e) {
                var t = e.currentTarget.innerText;
                var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                e.preventDefault();
                var maxPaste = bufferText.length;
                if (t.length + bufferText.length > 1600) {
                maxPaste = 1600 - t.length;
                }
                if (maxPaste > 0) {
                document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
                }
                $('.equipa-text span').text(1600 - t.length);
            }
        }
    });
});

$("#equipa-text").on("keypress", function () {
    var limiteCaracteres = 1600;
    var caracteres = $(this).text();
    var totalCaracteres = caracteres.length;
  
    //Update Count value
    $(".equipa-text span").text(totalCaracteres);
  
    //Check and Limit Charaters
    if (totalCaracteres >= limiteCaracteres) {
      return false;
    }
});

/* get equipa info */
function getEquipa(last, idMembro) {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                printEquipaEntries(JSON.parse(resp[1]), last, idMembro);
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro ao aceder à informação da Equipa");
            }
        }
    };
    xhttp.open("GET", "functions/func-equipa.php?cmdEval=getEquipa");
    xhttp.send();
}

/* print equipa */
function printEquipaEntries(membros, last, idMembro) {
    equipaArea = document.querySelector("#equipaList");
    document.querySelector("#equipaList").innerHTML = "";
    arrayStatus = [];
    equipaArea.innerHTML = "";
    for (const i in membros) {
        if (membros.hasOwnProperty(i)) {
            const membro = membros[i];
            linha = document.createElement("div");
            linha.id = "membro-" + membro.id;
            linha.classList.add("col-lg-12");
            linha.classList.add("valueLine");
            linha.style.display = 'flex';
            linha.style.cursor = 'pointer';

            var imagem;
            if (membro.img_src == null || membro.img_src == '') {
                imagem = 'Não tem imagem.'
            } else {
                var splitSrc = membro.img_src.split('uploads');
                imagem = '<img style="height: 100%;" src="../../../uploads' + splitSrc[1] + '" />'
            }

            html = `
                <div class="col-lg-1">${membro.name}</div>
                <div class="col-lg-1">${membro.cargo}</div>
                <div class="col-lg-3">${membro.description}</div>
                <div class="col-lg-3">
                    ${imagem}
                </div>
            `;
            linha.innerHTML = html;
            linha.addEventListener("click", function () {
                selectMembro("membro-" + membro.id);
            });
            equipaArea.append(linha);
        }
    }

    $('#equipaList').sortable({
        items: '> .valueLine',
        start: function (event, ui) {
            // Create a temporary attribute on the element with the old index
            $('#equipaList').attr('data-currentindex', ui.item.index());
        },
        update: function (event, ui) {
            var data = $(this).sortable('serialize');

            // Reset the current index
            $(this).removeAttr('data-currentindex');

            // Post to the server to handle the changes
            $.ajax({
                type: "GET",
                url: "functions/func-equipa.php?cmdEval=saveOrderEquipa",
                data: data,
                beforeSend: function () {
                    // Disable dragging
                    $('#equipaList').sortable('disable');
                },
                success: function (html) {
                    // Re-enable dragging
                    $('#equipaList').sortable('enable');
                    getEquipa(null, null);
                }
            });
        }
    });

    if (last != null) {
        document.querySelector("#equipaList .row:first-child").classList.add("active");
    }
    if (idMembro != null) {
        document.querySelector("#equipaList #membro-" + idMembro).classList.add("active");
    }
}

/* select Membro */
function selectMembro(id) {
    linhaMembro = document.getElementById(id);

    /**
     * events triggered by selection and deselection
     * this code block only concerns the new/edit modal inputs
     */
    if (linhaMembro.classList.contains("active")) {
        linhaMembro.classList.remove("active");
        var inputs = document.getElementById('equipaInfo').getElementsByTagName('input');

        for (index = 0; index < inputs.length; ++index) {
            if (inputs[index].type == "text")
                inputs[index].value = '';
        }

        document.getElementById('deleteEquipa').setAttribute('data-id-equipa', '');

        $('#equipa-text').next().find('.note-editable').html('');
        $('.equipa-text span').text('1600');

        $membroArea = document.getElementById('equipaInfo');
        $membroArea.setAttribute('data-id-membro', '');

        $('#equipaInfo').css({ 'display': 'none' });
        $('.equipaInfo').css({ 'display': 'none' });

    } else {
        $("#equipaList .valueLine").removeClass("active");
        linhaMembro.classList.add("active");

        //load data into the inputs in the page
        getMembroById(id.replace("membro-", ""));
    }
}

/* get membro info by selected */
function getMembroById(idMembro) {
    idMembro = idMembro.replace("membro-", "");
    listaMembros = document.querySelector('#equipaList');

    document.getElementById('deleteEquipa').setAttribute('data-id-equipa', idMembro);

    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getAllDataByMembro(JSON.parse(resp[1]));
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro para aceder à informação dos membros da Equipa.");
            }
        }
    };
    xhttp.open("GET", "functions/func-equipa.php?cmdEval=getAllMembrosByIdMembro&id_membro=" + idMembro);
    xhttp.send();
}

/* get membro info */
function getAllDataByMembro(membro) {
    $membrosArea = document.getElementById('equipaInfo');
    $membrosArea.setAttribute('data-id-membro', 'membro-' + membro[0].id);

    $('#equipaInfo').css({ 'display': 'flex' });
    $('.equipaInfo').css({ 'display': 'flex' });

    var $input_name = $('#equipaInfo #equipa-name');
    var $input_cargo = $('#equipaInfo #equipa-cargo');
    var $input_description = $('#equipaInfo #equipa-text');
    var $input_img = $('#equipaInfo #equipa-img');

    $input_name.val(membro[0].name);
    $input_cargo.val(membro[0].cargo);
    $input_description.next().find('.note-editable').html(membro[0].description);
    $('.equipa-text span').text(1600 - membro[0].description.replace(/(<([^>]+)>)/ig, "").length);
    $input_img.val(membro[0].img);
}

/* save/update equipa */
var $saveEquipaBtn = $('#saveEquipa');
$saveEquipaBtn.click(function () {
    var membro = new FormData;

    var $input_name = $('#equipaInfo #equipa-name').val();
    var $input_cargo = $('#equipaInfo #equipa-cargo').val();
    var $input_description = $('#equipaInfo #equipa-text').next().find('.note-editable').html();
    var $input_img = $('#equipaInfo #equipa-img').val();

    const files = document.querySelector('#equipa-img').files;

    $equipaArea = document.getElementById('equipaInfo');
    var membro_id = $equipaArea.getAttribute('data-id-membro');

    if (membro_id != null)
        membro_id = membro_id.replace("membro-", "");
    else
        membro_id = ''

    if ($input_description.replace(/(<([^>]+)>)/ig, '').length == 0) {
        $(".equipa-text-erro.erro").text("Por favor, inserir texto.");
    } else {
        if ($input_description.replace(/(<([^>]+)>)/ig, '').length > 1600) {
            $(".equipa-text-erro.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
        } else {
            $(".equipa-text-erro.erro").text("");
        }
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

    if ($input_name != '' && $input_cargo != '' && $input_description != '' && $input_description.replace(/(<([^>]+)>)/ig, '').length < 1601) {
        membro.append('cmdEval', 'saveEquipa');
        membro.append("id", membro_id);
        membro.append("name", $input_name);
        membro.append("cargo", $input_cargo);
        membro.append("description", $input_description);

        if (files.length > 0) {
            membro.append("img", $input_img);
            for (let i = 0; i < files.length; i++) {
                let file = files[i]
                membro.append('filesEquipa[]', file)
            }
        }

        var xhttp = new XMLHttpRequest;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    $.notify("Membro da equipa guardado com sucesso!", "success");

                    linhaMembro = document.getElementById('membro-' + membro_id);
                    document.getElementById('deleteEquipa').setAttribute('data-id-equipa', '');

                    var inputs = document.getElementById('equipaInfo').getElementsByTagName('input');
                    
                    for (index = 0; index < inputs.length; ++index) {
                        inputs[index].value = '';
                    }

                    $('#equipaInfo #equipa-text').next().find('.note-editable').html('');
                    $('.equipa-text span').text('1600');

                    $('#equipaInfo').css({ 'display': 'none' });
                    $('.equipaInfo').css({ 'display': 'none' });

                    if ($equipaArea) {
                        if (membro_id == '')
                            getEquipa(null, null);
                        else
                            getEquipa(null, membro_id);
                        $equipaArea = document.getElementById('equipaInfo');
                        $equipaArea.setAttribute('data-id-membro', '');
                    } else {
                        getEquipa("last", null);
                    }

                } else if (resp[0] == "false") {
                    $.notify(resp[1]);
                } else if (resp[0] == "warn") {
                    $.notify(resp[1], "warn");
                } else if (resp[0] == "session_expired") {
                    window.location = "login.php";
                } else {
                    $.notify("Erro ao guardar.");
                }
            }
        }

        xhttp.open("POST", "functions/func-equipa.php", true);
        xhttp.send(membro);
    }
});

/**
 * delete membro da equipa
 */
var $deleteEquipaBtn = $('#deleteEquipa');
$deleteEquipaBtn.click(function (id) {
    id = document.getElementById('deleteEquipa').getAttribute('data-id-equipa');
    xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getEquipa()
                $.notify("Membro da equipa apagado com sucesso.", "success");

                document.getElementById('deleteEquipa').setAttribute('data-id-equipa', '');
                var inputs = document.getElementById('equipaInfo').getElementsByTagName('input');

                for (index = 0; index < inputs.length; ++index) {
                    inputs[index].value = '';
                }

                $('#equipaInfo #equipa-text').next().find('.note-editable').html('');
                $('.equipa-text span').text('150');

                $('#equipaInfo').css({ 'display': 'none' });
                $('.equipaInfo').css({ 'display': 'none' });

                setTimeout(() => {
                    window.location.href = "https://backoffice.anacarolinapereira.pt/modules/pages/sobre-nos/equipa.php";
                }, 250);
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Não foi possível apagar o membro da equipa.");
            }
        }
    }
    xhttp.open("GET", "functions/func-equipa.php?cmdEval=deleteEquipa&id=" + id);
    xhttp.send();
});

/* add membro equipa */
var $addEquipaBtn = $('#addEquipa');
$addEquipaBtn.click(function () {
    $('.equipaInfo').css('display', 'flex');
    $('#equipaInfo').css('display', 'flex');
});