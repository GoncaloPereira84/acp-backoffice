/* eslint-disable */
window.addEventListener('load', function (e) {
    getBlogCats();
    getBlogPosts();

    document.getElementById("cats-id-search").addEventListener("change", function () {
        searchByCategoria();
    })

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
                cats = JSON.parse(resp[1]);

                select_search = document.getElementById("cats-id-search");
                cats.forEach(cat => {
                    option = document.createElement("option");
                    option.value = cat.id;
                    option.innerText = cat.valor;
                    select_search.append(option);
                })

                selectCat = document.querySelector("#cats-id");
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
    xhttp.open("GET", "functions/func-artigos.php?cmdEval=getBlogCats");
    xhttp.send();
}

function searchByCategoria() {
    categoria = document.getElementById("cats-id-search").value;
    posts = document.querySelectorAll("#postsList .valueLine");
    posts.forEach(post => {
        if (categoria == "null") {
            post.style.display = "flex";
        } else {
            if (post.dataset.categoria != categoria) {
                post.style.display = "none";
            } else {
                post.style.display = "flex";
            }
        }
    });
}

/* get posts info */
function getBlogPosts(last, idPost) {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                printPostsEntries(JSON.parse(resp[1]), last, idPost);
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro ao aceder à informação dos Posts.");
            }
        }
    };
    xhttp.open("GET", "functions/func-artigos.php?cmdEval=getBlogPosts");
    xhttp.send();
}

/* print posts */
function printPostsEntries(posts, last, idPost) {
    postsArea = document.querySelector("#postsList");
    document.querySelector("#postsList").innerHTML = "";
    arrayStatus = [];
    postsArea.innerHTML = "";

    var categorias;
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                categorias = JSON.parse(resp[1]);

                for (const i in posts) {
                    if (posts.hasOwnProperty(i)) {
                        const post = posts[i];
                        linha = document.createElement("div");
                        linha.id = "post-" + post.id;
                        linha.classList.add("col-lg-10");
                        linha.classList.add("valueLine");
                        linha.style.display = 'flex';
                        linha.style.cursor = 'pointer';
                        linha.dataset.categoria = post.categoria_id;

                        var imagem;
                        if (post.img_src == null || post.img_src == '') {
                            imagem = 'Não tem imagem.'
                        } else {
                            var splitSrc = post.img_src.split('uploads');
                            imagem = '<img style="height: 100%;" src="../../../uploads' + splitSrc[1] + '" />'
                        }

                        var video;
                        if (post.video_src == null || post.video_src == '') {
                            video = 'Não tem vídeo.'
                        } else {
                            video = '<div style="height: 100%;">' + post.video_src + '</div>'
                        }

                        var map = Array.prototype.map;
                        var cat = [];
                        
                        var pid = post.categoria_id;

                        map.call(categorias, function (c) {
                            if (c.id == post.categoria_id) {
                                cat.push(c.valor);
                            } else {
                                map.call(pid, function(p){
                                    if (c.id == p) {
                                        cat.push(c.valor);
                                    }
                                })
                            }
                        });

                        html = `
                            <div class="col-lg-2">${post.title}</div>
                            <div class="col-lg-2">${cat}</div>
                            <div class="col-lg-2">${post.date}</div>
                            <div class="col-lg-3">
                                ${imagem}
                            </div>
                            <div class="col-lg-2" style="height: 100px;">
                                ${video}
                            </div>
                        `;
                        linha.innerHTML = html;
                        linha.addEventListener("click", function () {
                            selectPost("post-" + post.id);
                        });
                        postsArea.append(linha);
                    }
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
    };
    xhttp.open("GET", "functions/func-artigos.php?cmdEval=getBlogCats");
    xhttp.send();

    if (last != null) {
        document.querySelector("#postsList .row:first-child").classList.add("active");
    }
    if (idPost != null) {
        document.querySelector("#postsList #post-" + idPost).classList.add("active");
    }
}

/* select post */
function selectPost(id) {
    linhaPost = document.getElementById(id);

    /**
     * events triggered by selection and deselection
     * this code block only concerns the new/edit modal inputs
     */
    if (linhaPost.classList.contains("active")) {
        linhaPost.classList.remove("active");
        var inputs = document.getElementById('postInfo').getElementsByTagName('input');

        for (index = 0; index < inputs.length; ++index) {
            if (inputs[index].type == "text")
                inputs[index].value = '';
        }

        $('#post-text').next().find('.note-editable').html('');
        document.getElementById('deletePost').setAttribute('data-id-post', '');
        document.getElementById('cats-id').value = '';

        $postArea = document.getElementById('postInfo');
        $postArea.setAttribute('data-id-post', '');

        $('#formacaoInfo').css({ 'display': 'none' });
        $('.formacaoInfo').css({ 'display': 'none' });
    } else {
        $("#postsList .valueLine").removeClass("active");
        linhaPost.classList.add("active");

        //load data into the inputs in the page
        getPostById(id.replace("post-", ""));
    }
}

/* get post info by selected */
function getPostById(idPost) {
    idPost = idPost.replace("post-", "");
    listaPosts = document.querySelector('#postsList');

    document.getElementById('deletePost').setAttribute('data-id-post', idPost);

    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getAllDataByPost(JSON.parse(resp[1]));
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro para aceder à informação dos Posts.");
            }
        }
    };
    xhttp.open("GET", "functions/func-artigos.php?cmdEval=getAllPostsByIdPost&id_post=" + idPost);
    xhttp.send();
}

/* get post info */
function getAllDataByPost(post) {
    $postsArea = document.getElementById('postInfo');
    $postsArea.setAttribute('data-id-post', 'post-' + post[0].id);

    $('#postInfo').css({ 'display': 'flex' });
    $('.postInfo').css({ 'display': 'flex' });

    var $input_title = $('#postInfo #post-title');
    var $input_text = $('#postInfo #post-text');
    var $input_video = $('#postInfo #post-video');
    var $input_select = $('#postInfo #cats-id');

    var cats = post[0].categoria_id.split(',');

    $input_title.val(post[0].title);
    $input_text.next().find('.note-editable').html(post[0].text);
    $input_video.val(post[0].video_src);
    $input_select.val(cats);
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

    $postArea = document.getElementById('postInfo');
    var post_id = $postArea.getAttribute('data-id-post');

    if (post_id != null)
        post_id = post_id.replace("post-", "");
    else
        post_id = ''

    if ($input_select_id == 'null') $.notify("Seleccionar serviço.");
    if ($input_title == '') $.notify("Introduzir titulo.");
    if ($input_text == '') $.notify("Introduzir texto.");

    if ($input_title != '' && $input_text != '') {
        post.append('cmdEval', 'savePost');
        post.append("id", post_id);
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

                    linhaPost = document.getElementById('post-' + post_id);
                    document.getElementById('cats-id').value = 'null';

                    var inputs = document.getElementById('postInfo').getElementsByTagName('input');

                    for (index = 0; index < inputs.length; ++index) {
                        if (inputs[index].type == "text")
                            inputs[index].value = '';
                    }

                    $('#post-text').next().find('.note-editable').html('');

                    document.getElementById('deletePost').setAttribute('data-id-post', '');

                    $postArea = document.getElementById('postInfo');
                    $postArea.setAttribute('data-id-post', '');

                    $('#postInfo').css({ 'display': 'none' });
                    $('.postInfo').css({ 'display': 'none' });

                    if ($postArea) {
                        if (post_id == '')
                            getBlogPosts(null, null);
                        else
                            getBlogPosts(null, post_id);
                        $postArea = document.getElementById('postInfo');
                        $postArea.setAttribute('data-id-post', '');
                    } else {
                        getBlogPosts("last", null);
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

        xhttp.open("POST", "functions/func-artigos.php", true);
        xhttp.send(post);
    }
});

/**
 * delete post
 */
var $deletePostBtn = $('#deletePost');
$deletePostBtn.click(function (id) {
    id = document.getElementById('deletePost').getAttribute('data-id-post');
    xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getBlogPosts()
                $.notify("Post apagado com sucesso.", "success");

                var inputs = document.getElementById('postInfo').getElementsByTagName('input');

                for (index = 0; index < inputs.length; ++index) {
                    if (inputs[index].type == "text")
                        inputs[index].value = '';
                }

                document.getElementById('cats-id').value = 'null';

                $('#post-text').next().find('.note-editable').html('');

                $('#postInfo').css({ 'display': 'none' });
                $('.postInfo').css({ 'display': 'none' });

                document.getElementById('deletePost').setAttribute('data-id-post', '');
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Não foi possível apagar o post.");
            }
        }
    }
    xhttp.open("GET", "functions/func-artigos.php?cmdEval=deletePost&id=" + id);
    xhttp.send();
});