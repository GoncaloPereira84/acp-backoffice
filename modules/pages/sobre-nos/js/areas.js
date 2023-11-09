/* eslint-disable */
window.addEventListener('load', function (e) {
    getAreas();

    $('#area-text').summernote({
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
                $('.area-text span').text(300 - t.trim().length);
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
                $('.area-text span').text(300 - t.length);
            }
        }
    });
});

$("#area-text").on("keypress", function () {
    var limiteCaracteres = 300;
    var caracteres = $(this).text();
    var totalCaracteres = caracteres.length;
  
    //Update Count value
    $(".area-text span").text(totalCaracteres);
  
    //Check and Limit Charaters
    if (totalCaracteres >= limiteCaracteres) {
      return false;
    }
});

/* get areas info */
function getAreas(last, idArea) {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                printAreasEntries(JSON.parse(resp[1]), last, idArea);
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro ao aceder à informação das Áreas");
            }
        }
    };
    xhttp.open("GET", "functions/func-areas.php?cmdEval=getAreas");
    xhttp.send();
}

/* print areas */
function printAreasEntries(areas, last, idArea) {
    areasArea = document.querySelector("#areasList");
    document.querySelector("#areasList").innerHTML = "";
    arrayStatus = [];
    areasArea.innerHTML = "";
    for (const i in areas) {
        if (areas.hasOwnProperty(i)) {
            const area = areas[i];
            linha = document.createElement("div");
            linha.id = "area-" + area.id;
            linha.classList.add("col-lg-12");
            linha.classList.add("valueLine");
            linha.style.display = 'flex';
            linha.style.cursor = 'pointer';

            html = `
                <div class="col-lg-2">${area.title}</div>
                <div class="col-lg-6">${area.text}</div>
            `;
            linha.innerHTML = html;
            linha.addEventListener("click", function () {
                selectArea("area-" + area.id);
            });
            areasArea.append(linha);
        }
    }

    $('#areasList').sortable({
        items: '> .valueLine',
        start: function (event, ui) {
            // Create a temporary attribute on the element with the old index
            $('#areasList').attr('data-currentindex', ui.item.index());
        },
        update: function (event, ui) {
            var data = $(this).sortable('serialize');

            // Reset the current index
            $(this).removeAttr('data-currentindex');

            // Post to the server to handle the changes
            $.ajax({
                type: "GET",
                url: "functions/func-areas.php?cmdEval=saveOrderAreas",
                data: data,
                beforeSend: function () {
                    // Disable dragging
                    $('#areasList').sortable('disable');
                },
                success: function (html) {
                    // Re-enable dragging
                    $('#areasList').sortable('enable');
                    getAreas(null, null);
                }
            });
        }
    });

    if (last != null) {
        document.querySelector("#areasList .row:first-child").classList.add("active");
    }
    if (idArea != null) {
        document.querySelector("#areasList #area-" + idArea).classList.add("active");
    }
}

/* select area */
function selectArea(id) {
    linhaArea = document.getElementById(id);

    /**
     * events triggered by selection and deselection
     * this code block only concerns the new/edit modal inputs
     */
    if (linhaArea.classList.contains("active")) {
        linhaArea.classList.remove("active");
        var inputs = document.getElementById('areaInfo').getElementsByTagName('input');

        for (index = 0; index < inputs.length; ++index) {
            if (inputs[index].type == "text")
                inputs[index].value = '';
        }

        $('#area-text').next().find('.note-editable').html('');
        $('.area-text span').text('300');

        document.getElementById('deleteArea').setAttribute('data-id-area', '');

        $areaArea = document.getElementById('areaInfo');
        $areaArea.setAttribute('data-id-area', '');

        $('#areaInfo').css({ 'display': 'none' });
        $('.areaInfo').css({ 'display': 'none' });
    } else {
        $("#areasList .valueLine").removeClass("active");
        linhaArea.classList.add("active");

        //load data into the inputs in the page
        getAreaById(id.replace("area-", ""));
    }
}

/* get slide info by selected */
function getAreaById(idArea) {
    idArea = idArea.replace("area-", "");
    listaAreas = document.querySelector('#areasList');

    document.getElementById('deleteArea').setAttribute('data-id-area', idArea);

    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getAllDataByArea(JSON.parse(resp[1]));
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro para aceder à informação das Áreas.");
            }
        }
    };
    xhttp.open("GET", "functions/func-areas.php?cmdEval=getAllAreasByIdArea&id_area=" + idArea);
    xhttp.send();
}

/* get area info */
function getAllDataByArea(area) {
    $areasArea = document.getElementById('areaInfo');
    $areasArea.setAttribute('data-id-area', 'area-' + area[0].id);

    $('#areaInfo').css({ 'display': 'flex' });
    $('.areaInfo').css({ 'display': 'flex' });

    var $input_title = $('#areaInfo #area-title');
    var $input_text = $('#areaInfo #area-text');

    $input_title.val(area[0].title);
    $input_text.next().find('.note-editable').html(area[0].text);
    $('.area-text span').text(300 - area[0].text.replace(/(<([^>]+)>)/ig, "").length);
}

/* save/update area */
var $saveAreaBtn = $('#saveArea');
$saveAreaBtn.click(function () {
    var area = new FormData;

    var $input_title = $('#areaInfo #area-title').val();
    var $input_text = $('#areaInfo #area-text').next().find('.note-editable').html();

    $areaArea = document.getElementById('areaInfo');
    var area_id = $areaArea.getAttribute('data-id-area');

    if (area_id != null)
        area_id = area_id.replace("area-", "");
    else
        area_id = ''

    if ($input_text.replace(/(<([^>]+)>)/ig, '').length == 0) {
        $(".area-text-erro.erro").text("Por favor, inserir texto.");
    } else {
        if ($input_text.replace(/(<([^>]+)>)/ig, '').length > 300) {
            $(".area-text-erro.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
        } else {
            $(".area-text-erro.erro").text("");
        }
    }

    if ($input_title == "") {
        $(".area-title-erro.erro").text("Por favor, inserir o título.");
    } else {
        $(".area-title-erro.erro").text("");
    }

    if ($input_title != '' && $input_text != '' && $input_text.replace(/(<([^>]+)>)/ig, '').length < 301) {
        area.append('cmdEval', 'saveArea');
        area.append("id", area_id);
        area.append("title", $input_title);
        area.append("text", $input_text);

        var xhttp = new XMLHttpRequest;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    $.notify("Área guardada com sucesso!", "success");

                    linhaArea = document.getElementById('area-' + area_id);

                    var inputs = document.getElementById('areaInfo').getElementsByTagName('input');

                    for (index = 0; index < inputs.length; ++index) {
                        inputs[index].value = '';
                    }

                    $('#areaInfo #area-text').next().find('.note-editable').html('');
                    $('.area-text span').text('150');

                    $('#areaInfo').css({ 'display': 'none' });
                    $('.areaInfo').css({ 'display': 'none' });

                    if ($areaArea) {
                        if (area_id == '')
                            getAreas(null, null);
                        else
                            getAreas(null, area_id);
                        $areaArea = document.getElementById('areaInfo');
                        $areaArea.setAttribute('data-id-area', '');
                    } else {
                        getAreas("last", null);
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

        xhttp.open("POST", "functions/func-areas.php", true);
        xhttp.send(area);
    }
});

/**
 * delete area
 */
var $deleteAreaBtn = $('#deleteArea');
$deleteAreaBtn.click(function (id) {
    id = document.getElementById('deleteArea').getAttribute('data-id-area');
    xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getAreas()
                $.notify("Área apagada com sucesso.", "success");

                var inputs = document.getElementById('areaInfo').getElementsByTagName('input');

                for (index = 0; index < inputs.length; ++index) {
                    inputs[index].value = '';
                }

                $('#areaInfo #area-text').next().find('.note-editable').html('');
                $('.area-text span').text('150');

                $('#areaInfo').css({ 'display': 'none' });
                $('.areaInfo').css({ 'display': 'none' });
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Não foi possível apagar a área.");
            }
        }
    }
    xhttp.open("GET", "functions/func-areas.php?cmdEval=deleteArea&id=" + id);
    xhttp.send();
});