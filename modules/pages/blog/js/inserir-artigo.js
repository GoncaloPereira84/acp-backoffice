/* eslint-disable */
window.addEventListener('load', function (e) {
    getBlogCats();

    $('#post-text').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']]
        ]
    });
});

/* get posts info */
function getBlogCats() {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                selectCat = document.querySelector("#cats-id");
                cats = JSON.parse(resp[1]);
                cats.forEach(function (cat) {
                    option = document.createElement("option");
                    option.value = cat.id;
                    option.innerText = cat.valor;
                    selectCat.append(option);
                })
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro ao aceder à informação das Categorias.");
            }
        }
    };
    xhttp.open("GET", "functions/func-inserir-artigo.php?cmdEval=getBlogCats");
    xhttp.send();
}

/* save/update post */
var $savePostBtn = $('#savePost');
$savePostBtn.click(function () {
    var post = new FormData;

    var $input_title = $('#postInfo #post-title').val();
    var $input_text = $('#postInfo #post-text').next().find('.note-editable').html();
    var $input_video = $('#postInfo #post-video').val();
    var $input_img = $('#postInfo #post-img').val();
    var $input_select_id = $('#postInfo #cats-id').val();

    const files = document.querySelector('#post-img').files;

    if ($input_text.replace(/(<([^>]+)>)/ig, '').length == 0) {
        $(".post-text-erro.erro").text("Por favor, inserir texto.");
    } else {
        $(".post-text-erro.erro").text("");
    }

    if ($input_select_id == 'null') {
        $(".formacao-title-erro.erro").text("Por favor, seleccionar a categoria.");
    } else {
        $(".formacao-title-erro.erro").text("");
    }

    if ($input_title == "") {
        $(".formacao-title-erro.erro").text("Por favor, inserir o título.");
    } else {
        $(".formacao-title-erro.erro").text("");
    }

    if ($input_title != '' && $input_text != '') {
        post.append('cmdEval', 'savePost');
        post.append("title", $input_title);
        post.append("text", $input_text);
        post.append("video", $input_video);
        post.append("cat_id", $input_select_id);

        if (files.length > 0) {
            post.append("img", $input_img);
            for (let i = 0; i < files.length; i++) {
                let file = files[i]
                post.append('filesPost[]', file)
            }
        }

        var xhttp = new XMLHttpRequest;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    $.notify("Post guardado com sucesso!", "success");
   
                    setTimeout(() => {
                        window.location.href = "https://backoffice.anacarolinapereira.pt/modules/pages/blog/artigos.php";
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

        xhttp.open("POST", "functions/func-inserir-artigo.php", true);
        xhttp.send(post);
    }
});