/* eslint-disable */
window.addEventListener('load', function(e) {
    getSlideshowHomepage();

    $('#slideshow-text').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']]
        ],
        callbacks: {
            onKeydown: function(e) {
                var t = e.currentTarget.innerText;
                if (t.trim().length >= 150) {
                    //delete keys, arrow keys, copy, cut, select all
                    if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
                        e.preventDefault();
                }
            },
            onKeyup: function(e) {
                var t = e.currentTarget.innerText;
                $('.slideshow-text span').text(150 - t.trim().length);
            },
            onPaste: function(e) {
                var t = e.currentTarget.innerText;
                var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                e.preventDefault();
                var maxPaste = bufferText.length;
                if (t.length + bufferText.length > 150) {
                    maxPaste = 150 - t.length;
                }
                if (maxPaste > 0) {
                    document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
                }
                $('.slideshow-text span').text(150 - t.length);
            }
        }
    });

    $('#slide-novo-text').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']]
        ],
        callbacks: {
            onKeydown: function(e) {
                var t = e.currentTarget.innerText;
                if (t.trim().length >= 150) {
                    //delete keys, arrow keys, copy, cut, select all
                    if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
                        e.preventDefault();
                }
            },
            onKeyup: function(e) {
                var t = e.currentTarget.innerText;
                $('.slide-novo-text span').text(150 - t.trim().length);
            },
            onPaste: function(e) {
                var t = e.currentTarget.innerText;
                var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                e.preventDefault();
                var maxPaste = bufferText.length;
                if (t.length + bufferText.length > 150) {
                    maxPaste = 150 - t.length;
                }
                if (maxPaste > 0) {
                    document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
                }
                $('.slide-novo-text span').text(150 - t.length);
            }
        }
    });
});

$("#slideshow-text").on("keypress", function() {
    var limiteCaracteres = 150;
    var caracteres = $(this).text();
    var totalCaracteres = caracteres.length;

    //Update Count value
    $(".slideshow-text span").text(totalCaracteres);

    //Check and Limit Charaters
    if (totalCaracteres >= limiteCaracteres) {
        return false;
    }
});

$("#slide-novo-text").on("keypress", function() {
    var limiteCaracteres = 150;
    var caracteres = $(this).text();
    var totalCaracteres = caracteres.length;

    //Update Count value
    $(".slide-novo-text span").text(totalCaracteres);

    //Check and Limit Charaters
    if (totalCaracteres >= limiteCaracteres) {
        return false;
    }
});

/* get Slideshow Homepage info */
function getSlideshowHomepage(last, idSlide) {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                printSlideshowEntries(JSON.parse(resp[1]), last, idSlide);
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro ao aceder à informação do Slideshow");
            }
        }
    };

    xhttp.open("GET", "functions/func-slideshow.php?cmdEval=getSlideshowHomepage");
    xhttp.send();
    xhttp.getResponseHeader('Content-Type', 'application/xml');
}

/* print slides */
function printSlideshowEntries(slides, last, idSlide) {
    slidesArea = document.querySelector("#slides");
    document.querySelector("#slides").innerHTML = "";
    arrayStatus = [];
    slidesArea.innerHTML = "";
    for (const i in slides) {
        if (slides.hasOwnProperty(i)) {
            const slide = slides[i];
            linha = document.createElement("div");
            linha.id = "slide-" + slide.id;
            linha.classList.add("col-lg-12");
            linha.classList.add("valueLine");
            linha.style.display = 'flex';
            linha.style.cursor = 'pointer';

            var img_name;
            if (slide.img == 'chair') {
                img_name = 'Cadeira';
            }

            if (slide.img == 'children') {
                img_name = 'Crianças';
            }

            if (slide.img == 'moon') {
                img_name = 'Lua';
            }

            if (slide.img == 'frame') {
                img_name = 'Quadro';
            }

            if (slide.img == 'none') {
                img_name = 'Nenhum';
            }

            var imagem;
            if (slide.static_img == null || slide.static_img == '') {
                imagem = 'Não tem imagem.'
            } else {
                var splitSrc = slide.static_img.split('uploads');
                imagem = '<img style="height: 100%;" src="../../../uploads' + splitSrc[1] + '" />';
            }

            var bool;

            if (slide.is_external == 0) bool = 'Não';
            else bool = 'Sim';

            html = `
                <div class="col-lg-1">${slide.title}</div>
                <div class="col-lg-2">${slide.text}</div>
                <div class="col-lg-2">${slide.cta_txt}</div>
                <div class="col-lg-2">${slide.link}</div>
                <div class="col-lg-2">${bool}</div>
                <div class="col-lg-1">${img_name}</div>
                <div class="col-lg-2">
                    ${imagem}
                </div>
            `;
            linha.innerHTML = html;
            linha.addEventListener("click", function() {
                selectSlide("slide-" + slide.id);
            });
            slidesArea.append(linha);
        }
    }

    $('#slides').sortable({
        items: '> .valueLine',
        start: function(event, ui) {
            // Create a temporary attribute on the element with the old index
            $('#slides').attr('data-currentindex', ui.item.index());
        },
        update: function(event, ui) {
            var data = $(this).sortable('serialize');

            // Reset the current index
            $(this).removeAttr('data-currentindex');

            // Post to the server to handle the changes
            $.ajax({
                type: "GET",
                url: "functions/func-slideshow.php?cmdEval=saveOrderSlide",
                data: data,
                beforeSend: function() {
                    // Disable dragging
                    $('#slides').sortable('disable');
                },
                success: function(html) {
                    // Re-enable dragging
                    $('#slides').sortable('enable');
                    getSlideshowHomepage(null, null);
                }
            });
        }
    });

    if (last != null) {
        document.querySelector("#slides .row:first-child").classList.add("active");
    }
    if (idSlide != null) {
        document.querySelector("#slides #slide-" + idSlide).classList.add("active");
    }
}

/* select slide */
function selectSlide(id) {
    linhaSlide = document.getElementById(id);

    /**
     * events triggered by selection and deselection
     * this code block only concerns the new/edit modal inputs
     */
    if (linhaSlide.classList.contains("active")) {
        linhaSlide.classList.remove("active");
        var inputs = document.getElementById('slideInfo').getElementsByTagName('input');

        $('input[name=slideshow-img]').attr('checked', false);
        for (index = 0; index < inputs.length; ++index) {
            if (inputs[index].type == "text")
                inputs[index].value = '';
        }

        $('#slideshow-text').next().find('.note-editable').html('');
        $('.slideshow-text span').text('150');

        document.getElementById('deleteSlide').setAttribute('data-id-slide', '');

        $slidesArea = document.getElementById('slideInfo');
        $slidesArea.setAttribute('data-id-slide', '');

        $('#slideInfo').css({ 'display': 'none' });
        $('.slideInfo').css({ 'display': 'none' });

        document.getElementById('slideshow-img-1').checked = false;
        document.getElementById('slideshow-img-2').checked = false;
        document.getElementById('slideshow-img-3').checked = false;
        document.getElementById('slideshow-img-4').checked = false;
        document.getElementById('external-link-yes').checked = false;
        document.getElementById('external-link-no').checked = false;

        //document.getElementById('deleteSlide').setAttribute('data-id-slide', '');

    } else {
        $("#slides .valueLine").removeClass("active");
        linhaSlide.classList.add("active");

        //load data into the inputs in the page
        getSlideById(id.replace("slide-", ""));
    }
}

/* get slide info by selected */
function getSlideById(idSlide) {
    idSlide = idSlide.replace("slide-", "");
    listaSlides = document.querySelector('#slides');

    document.getElementById('deleteSlide').setAttribute('data-id-slide', idSlide);

    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getAllDataBySlide(JSON.parse(resp[1]));
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro para aceder à informação dos Slides.");
            }
        }
    };
    xhttp.open("GET", "functions/func-slideshow.php?cmdEval=getAllSlidesByIdSlide&id_slide=" + idSlide);
    xhttp.send();
}

/* get slide info */
function getAllDataBySlide(slide) {
    $slidesArea = document.getElementById('slideInfo');
    $slidesArea.setAttribute('data-id-slide', 'slide-' + slide[0].id);

    $('#slideInfo').css({ 'display': 'flex' });
    $('.slideInfo').css({ 'display': 'flex' });

    var $input_title = $('#slideInfo #slideshow-title');
    var $input_text = $('#slideInfo #slideshow-text');
    var $input_cta = $('#slideInfo #slideshow-cta');
    var $input_link = $('#slideInfo #slideshow-link');

    $input_title.val(slide[0].title);
    $input_cta.val(slide[0].cta_txt);
    $input_link.val(slide[0].link);
    $("input[name=slideshow-img][value=" + slide[0].img + "]").attr('checked', true);
    $("input[name=slideshow-l][value=" + slide[0].is_external + "]").attr('checked', true);

    $input_text.next().find('.note-editable').html(slide[0].text);
    $('.slideshow-text span').text(150 - slide[0].text.replace(/(<([^>]+)>)/ig, "").length);
}

/* save/update slide */
var $saveSlideBtn = $('#saveSlide');
$saveSlideBtn.click(function() {
    var slide = new FormData;

    var $input_title = $('#slideInfo #slideshow-title').val();
    var $input_text = $('#slideInfo #slideshow-text').next().find('.note-editable').html();
    var $input_cta = $('#slideInfo #slideshow-cta').val();
    var $input_link = $('#slideInfo #slideshow-link').val();
    var $input_img = $('#slideInfo input[name=slideshow-img]:checked');
    var $input_external = $('#slideInfo input[name=slideshow-l]:checked');
    var $input_img1 = $('#slideInfo #slideshow-static-img').val();
    var $input_img_mobile = $('#slideInfo #slideshow-static-img-mobile').val();

    const files = document.querySelector('#slideInfo #slideshow-static-img').files;
    const files_mobile = document.querySelector('#slideInfo #slideshow-static-img-mobile').files;

    $slidesArea = document.getElementById('slideInfo');
    var slide_id = $slidesArea.getAttribute('data-id-slide');

    if (slide_id != null)
        slide_id = slide_id.replace("slide-", "");
    else
        slide_id = ''

    if (!$input_img.val()) {
        $(".slideshow-img-erro.erro").text("Seleccionar opção de animação.");
    } else {
        $(".slideshow-img-erro.erro").text("");
    }

    if (!$input_external.val()) {
        $(".external-link-erro.erro").text("Por favor, seleccionar opção.");
    } else {
        $(".external-link-erro.erro").text("");
    }

    if ($input_link == "") {
        $(".slideshow-link-erro.erro").text("Por favor, inserir o link.");
    } else {
        $(".slideshow-link-erro.erro").text("");
    }


    if ($input_text.replace(/(<([^>]+)>)/ig, '').length > 150) {
        $(".slideshow-text-erro.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
    } else {
        $(".slideshow-text-erro.erro").text("");
    }

    // if ($input_img1 != '') {
    //     if ($input_img_mobile == '') {
    //         $('.slideshow-static-img-mobile.erro').text("Por favor, inserir imagem em formato mobile.");
    //     } else {
    //         $('.slideshow-static-img-mobile.erro').text("");
    //     }
    // }

    if ($input_link != '' && $input_img.val() && $input_external.val() && $input_text.replace(/(<([^>]+)>)/ig, '').length < 151) {
        slide.append('cmdEval', 'saveSlide');
        slide.append("id", slide_id);
        slide.append("title", $input_title);
        slide.append("content", $input_text);
        slide.append("cta_txt", $input_cta);
        slide.append("link", $input_link);
        slide.append("img", $input_img.val());
        slide.append("is_external", $input_external.val());

        if (files.length > 0) {
            slide.append("static_img", $input_img1);
            for (let i = 0; i < files.length; i++) {
                let file = files[i]
                slide.append('files', file)
            }
        }

        // console.log(files);

        if (files_mobile.length > 0) {
            slide.append("static_img_mobile", $input_img_mobile);
            for (let i = 0; i < files_mobile.length; i++) {
                let file_mobile = files_mobile[i]
                slide.append('files_mobile', file_mobile)
            }
        }

        var xhttp = new XMLHttpRequest;
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    $.notify("Slide guardado com sucesso!", "success");

                    linhaSlide = document.getElementById('slide-' + slide_id);

                    // linhaSlide.classList.remove("active");
                    var inputs = document.getElementById('slideInfo').getElementsByTagName('input');

                    $('input[name=slideshow-img]').attr('checked', false);
                    for (index = 0; index < inputs.length; ++index) {
                        if (inputs[index].type == "text")
                            inputs[index].value = '';
                    }

                    $('#slideInfo #slideshow-text').next().find('.note-editable').html('');
                    $('.slideshow-text span').text('150');

                    $('#slideInfo').css({ 'display': 'none' });
                    $('.slideInfo').css({ 'display': 'none' });

                    $('input[name=slideshow-l]').attr('checked', false);

                    document.getElementById('deleteSlide').setAttribute('data-id-slide', '');

                    document.getElementById('slideshow-img-1').checked = false;
                    document.getElementById('slideshow-img-2').checked = false;
                    document.getElementById('slideshow-img-3').checked = false;
                    document.getElementById('slideshow-img-4').checked = false;
                    document.getElementById('external-link-yes').checked = false;
                    document.getElementById('external-link-no').checked = false;

                    if ($slidesArea) {
                        if (slide_id == '')
                            getSlideshowHomepage(null, null);
                        else
                            getSlideshowHomepage(null, slide_id);
                        $slidesArea = document.getElementById('slideInfo');
                        $slidesArea.setAttribute('data-id-slide', '');
                    } else {
                        getSlideshowHomepage("last", null);
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

        xhttp.open("POST", "functions/func-slideshow.php", true);
        xhttp.send(slide);
    }
});

/**
 * delete slide
 *
*/
var $deleteSlideBtn= $('#deleteSlide');
$deleteSlideBtn.click(function (id) {
    id = document.getElementById('deleteSlide').getAttribute('data-id-slide');
    xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getSlideshowHomepage()
                $.notify("Slide apagado com sucesso.", "success");

                var inputs = document.getElementById('slideInfo').getElementsByTagName('input');

                $('input[name=slideshow-img]').attr('checked', false);
                for (index = 0; index < inputs.length; ++index) {
                    if (inputs[index].type == "text")
                        inputs[index].value = '';
                }

                document.getElementById('deleteSlide').setAttribute('data-id-slide', '');

                document.getElementById('slideshow-img-1').checked = false;
                document.getElementById('slideshow-img-2').checked = false;
                document.getElementById('slideshow-img-3').checked = false;
                document.getElementById('slideshow-img-4').checked = false;

                $('#slideInfo').css({ 'display': 'none' });
                $('.slideInfo').css({ 'display': 'none' });

                document.getElementById('slideInfo').setAttribute('data-id-slide', '');
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Não foi possível apagar o slide.");
            }
        }
    }
    xhttp.open("GET", "functions/func-slideshow.php?cmdEval=deleteSlide&id=" + id);
    xhttp.send();
});



/* save new slide */
var $saveNewSlideBtn = $('#saveNewSlide');
$saveNewSlideBtn.click(function() {
    var slide = new FormData;

    var $input_title = $('#slideNovoInfo #slide-novo-title').val();
    var $input_text = $('#slideNovoInfo #slide-novo-text').next().find('.note-editable').html();
    var $input_cta = $('#slideNovoInfo #slide-novo-cta').val();
    var $input_link = $('#slideNovoInfo #slide-novo-link').val();
    var $input_img = $('#slideNovoInfo input[name=slide-novo-img]:checked');
    var $input_external = $('#slideNovoInfo input[name=slide-novo-l]:checked');
    var $input_img1 = $('#slideNovoInfo #slide-novo-static-img').val();
    var $input_img_mobile = $('#slideNovoInfo #slide-novo-static-img-mobile').val();

    const files = document.querySelector('#slideNovoInfo #slide-novo-static-img').files;
    const files_mobile = document.querySelector('#slideNovoInfo #slide-novo-static-img-mobile').files;

    $slidesArea = document.getElementById('slideNovoInfo');
    var slide_id = $slidesArea.getAttribute('data-id-slide');

    if (slide_id != null)
        slide_id = slide_id.replace("slide-", "");
    else
        slide_id = ''

    if (!$input_img.val()) {
        $(".slide-novo-img-erro.erro").text("Seleccionar opção de animação.");
    } else {
        $(".slide-novo-img-erro.erro").text("");
    }

    if (!$input_external.val()) {
        $(".external-link-erro.erro").text("Por favor, seleccionar opção.");
    } else {
        $(".external-link-erro.erro").text("");
    }

    if ($input_link == "") {
        $(".slide-novo-link-erro.erro").text("Por favor, inserir o link.");
    } else {
        $(".slide-novo-link-erro.erro").text("");
    }


    if ($input_text.replace(/(<([^>]+)>)/ig, '').length > 150) {
        $(".slide-novo-text-erro.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
    } else {
        $(".slide-novo-text-erro.erro").text("");
    }

    // if ($input_img1 != '') {
    //     if ($input_img_mobile == '') {
    //         $('.slideshow-static-img-mobile.erro').text("Por favor, inserir imagem em formato mobile.");
    //     } else {
    //         $('.slideshow-static-img-mobile.erro').text("");
    //     }
    // }

    if ($input_link != '' && $input_img.val() && $input_external.val() && $input_text.replace(/(<([^>]+)>)/ig, '').length < 151) {
        slide.append('cmdEval', 'saveNewSlide');
        slide.append("id", slide_id);
        slide.append("title", $input_title);
        slide.append("content", $input_text);
        slide.append("cta_txt", $input_cta);
        slide.append("link", $input_link);
        slide.append("img", $input_img.val());
        slide.append("is_external", $input_external.val());

        if (files.length > 0) {
            slide.append("static_img", $input_img1);
            for (let i = 0; i < files.length; i++) {
                let file = files[i]
                slide.append('files', file)
            }
        }

        // console.log(files);

        if (files_mobile.length > 0) {
            slide.append("static_img_mobile", $input_img_mobile);
            for (let i = 0; i < files_mobile.length; i++) {
                let file_mobile = files_mobile[i]
                slide.append('files_mobile', file_mobile)
            }
        }

        var xhttp = new XMLHttpRequest;
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    $.notify("Slide guardado com sucesso!", "success");

                    // linhaSlide = document.getElementById('slide-' + slide_id);

                    // linhaSlide.classList.remove("active");
                    var inputs = document.getElementById('slideInfo').getElementsByTagName('input');

                    $('input[name=slide-novo-img]').attr('checked', false);
                    for (index = 0; index < inputs.length; ++index) {
                        if (inputs[index].type == "text")
                            inputs[index].value = '';
                    }

                    $('#slideNovoInfo #slide-novo-text').next().find('.note-editable').html('');
                    $('.slide-novo-text span').text('150');

                    $('input[name=slide-novo-l]').attr('checked', false);

                    document.getElementById('deleteSlide').setAttribute('data-id-slide', '');

                    document.getElementById('slide-novo-img-1').checked = false;
                    document.getElementById('slide-novo-img-2').checked = false;
                    document.getElementById('slide-novo-img-3').checked = false;
                    document.getElementById('slide-novo-img-4').checked = false;
                    document.getElementById('external-link-yes').checked = false;
                    document.getElementById('external-link-no').checked = false;

                    if ($slidesArea) {
                        if (slide_id == '')
                            getSlideshowHomepage(null, null);
                        else
                            getSlideshowHomepage(null, slide_id);
                        $slidesArea = document.getElementById('slideInfo');
                        $slidesArea.setAttribute('data-id-slide', '');
                    } else {
                        getSlideshowHomepage("last", null);
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

        xhttp.open("POST", "functions/func-slideshow.php", true);
        xhttp.send(slide);
    }
});