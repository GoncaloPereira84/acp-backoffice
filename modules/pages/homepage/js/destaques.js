/* eslint-disable */
window.addEventListener('load', function (e) {
    getDestaques();
    getCategoriaDest();
    getFormacaoDest();
    getBlogDest();
});

/* get posts info */
function getDestaques(last, idDest) {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                printDestaques(JSON.parse(resp[1]), last, idDest);
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro ao aceder à informação dos Destaques.");
            }
        }
    };
    xhttp.open("GET", "functions/func-destaques.php?cmdEval=getDestaques");
    xhttp.send();
}

function getCategoriaDest() {
    xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                selectCat = document.querySelector("#destaque-id");
                cats = JSON.parse(resp[1]);
                cats.forEach(function (cat) {
                    option = document.createElement("option");
                    option.value = cat.id;
                    option.innerText = cat.name;
                    selectCat.append(option);
                })
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("não foi possível carregar as categorias, entre novamente na página.");
            }
        }
    }
    xhttp.open("GET", "functions/func-destaques.php?cmdEval=getListaCatsDestaques");
    xhttp.send();
}

function getFormacaoDest() {
    xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                selectForm = document.querySelector("#destaque-form-id");
                forms = JSON.parse(resp[1]);
                forms.forEach(function (form) {
                    option = document.createElement("option");
                    option.value = form.formacao_id;
                    option.innerText = form.title;
                    selectForm.append(option);
                })
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("não foi possível carregar as formações, entre novamente na página.");
            }
        }
    }
    xhttp.open("GET", "functions/func-destaques.php?cmdEval=getFormacoes");
    xhttp.send();
}

function getBlogDest() {
    xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                selectForm = document.querySelector("#destaque-blog-id");
                forms = JSON.parse(resp[1]);
                forms.forEach(function (form) {
                    option = document.createElement("option");
                    option.value = form.id;
                    option.innerText = form.title;
                    selectForm.append(option);
                })
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("não foi possível carregar os artigos, entre novamente na página.");
            }
        }
    }
    xhttp.open("GET", "functions/func-destaques.php?cmdEval=getBlogPosts");
    xhttp.send();
}

document.querySelector("#destaque-id").addEventListener('change', function(){
    if(this.value == 1) {
        document.getElementById("formacoes").style.display = 'flex';
        document.getElementById("blogPosts").style.display = 'none';

        document.getElementById("blogPosts").value = 'null';
        document.getElementById("destaque-blog-title").value = null;
        document.getElementById("destaque-blog-text").value = null;
        document.getElementById("destaque-blog-img").value = null;
        document.getElementById("destaque-blog-url").value = null;

        document.querySelector("#destaque-form-id").addEventListener('change', function(){
            var form_value = this.value;
            xhttp = new XMLHttpRequest;
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    resp = this.responseText.split("||");
                    if (resp[0] == "true") {
                        forms = JSON.parse(resp[1]);
                        
                        forms.forEach(function (form) {
                            if(form.tps_id == form_value) {
                                document.getElementById("destaque-formacao-title").value = form.tps_title;
                                document.getElementById("destaque-formacao-text").value = form.text;
                                document.getElementById("destaque-formacao-categoria").value = form.categoria_id;
                                document.getElementById("destaque-formacao-date-start").value = form.date_start;
                                document.getElementById("destaque-formacao-date-end").value = form.date_end;
                                document.getElementById("destaque-formacao-full").value = form.is_full;
                                document.getElementById("destaque-formacao-vagas").value = form.last_vagas;
                                document.getElementById("destaque-formacao-img").value = form.icon;
                                document.getElementById("destaque-formacao-url").value = '/academia/'+form.url_code_form+form.link;
                            }
                        })
                    } else if (resp[0] == "session_expired") {
                        window.location = "login.php";
                    } else {
                        $.notify("não foi possível carregar as formações, entre novamente na página.");
                    }
                }
            }
            xhttp.open("GET", "functions/func-destaques.php?cmdEval=getFormacoes");
            xhttp.send();
        })

    } else {
        document.getElementById("formacoes").style.display = 'none';
        document.getElementById("blogPosts").style.display = 'flex';

        document.getElementById("formacoes").value = 'null';
        document.getElementById("destaque-formacao-title").value = null;
        document.getElementById("destaque-formacao-text").value = null;
        document.getElementById("destaque-formacao-categoria").value = null;
        document.getElementById("destaque-formacao-date-start").value = null;
        document.getElementById("destaque-formacao-date-end").value = null;
        document.getElementById("destaque-formacao-full").value = null;
        document.getElementById("destaque-formacao-vagas").value = null;
        document.getElementById("destaque-formacao-img").value = null;
        document.getElementById("destaque-formacao-url").value = null;

        document.querySelector("#destaque-blog-id").addEventListener('change', function(){
            var form_value = this.value;
            xhttp = new XMLHttpRequest;
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    resp = this.responseText.split("||");
                    if (resp[0] == "true") {
                        forms = JSON.parse(resp[1]);
                        
                        forms.forEach(function (form) {
                            if(form.id == form_value) {
                                document.getElementById("destaque-blog-title").value = form.title;
                                document.getElementById("destaque-blog-text").value = form.text;
                                document.getElementById("destaque-blog-img").value = form.img_src;
                                document.getElementById("destaque-blog-url").value = '/blog/'+form.url_code;
                            }
                        })
                    } else if (resp[0] == "session_expired") {
                        window.location = "login.php";
                    } else {
                        $.notify("não foi possível carregar os artigos, entre novamente na página.");
                    }
                }
            }
            xhttp.open("GET", "functions/func-destaques.php?cmdEval=getBlogPosts");
            xhttp.send();
        })
    }
})

/* print posts */
function printDestaques(destaques, last, idDest) {
    destArea = document.querySelector("#destaquesList");
    document.querySelector("#destaquesList").innerHTML = "";
    arrayStatus = [];
    destArea.innerHTML = "";

    var categorias;
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                categorias = JSON.parse(resp[1]);

                for (const i in destaques) {
                    if (destaques.hasOwnProperty(i)) {
                        const dest = destaques[i];
                        linha = document.createElement("div");
                        linha.id = "destaque-" + dest.id;
                        linha.classList.add("col-lg-12");
                        linha.classList.add("valueLine");
                        linha.style.display = 'flex';
                        linha.style.cursor = 'pointer';

                        var imagem;
                        if (dest.img_src == null || dest.img_src == '') {
                            imagem = 'Não tem imagem.'
                        } else {
                            var splitSrc = dest.img_src.split('uploads');
                            imagem = '<img style="height: 100%;" src="../../../uploads' + splitSrc[1] + '" />'
                        }

                        var map = Array.prototype.map;
                        var cat;

                        map.call(categorias, function (c) {
                            if (c.id == dest.categoria_destaque_id) {
                                cat = c.name;
                            }
                        });


                        html = `
                            <div class="dest-title col-lg-2">${dest.title}</div>
                            <div class="col-lg-1">${cat}</div>
                            <div class="col-lg-2">
                                ${imagem}
                            </div>
                        `;
                        linha.innerHTML = html;
                        linha.addEventListener("click", function () {
                            selectDestaque("destaque-" + dest.id);
                        });
                        destArea.append(linha);
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
    xhttp.open("GET", "functions/func-destaques.php?cmdEval=getListaCatsDestaques");
    xhttp.send();

    if (last != null) {
        document.querySelector("#destaquesList .row:first-child").classList.add("active");
    }
    if (idDest != null) {
        // document.querySelector("#destaquesList #destaque-" + idDest).classList.add("active");
    }
}

/* select post */
function selectDestaque(id) {
    linhaDestaque = document.getElementById(id);

    /**
     * events triggered by selection and deselection
     * this code block only concerns the new/edit modal inputs
     */
    if (linhaDestaque.classList.contains("active")) {
        linhaDestaque.classList.remove("active");
        var inputs = document.getElementById('destaqueInfo').getElementsByTagName('input');

        for (index = 0; index < inputs.length; ++index) {
            if (inputs[index].type == "text")
                inputs[index].value = '';
        }

        for (index = 0; index < inputs.length; ++index) {
            if (inputs[index].type == "hidden")
                inputs[index].value = '';
        }

        document.getElementById('destaque-id').value = 'null';
        document.getElementById('destaque-form-id').value = 'null';
        document.getElementById('destaque-blog-id').value = 'null';
        document.getElementById('formacoes').style.display = 'none';
        document.getElementById('blogPosts').style.display = 'none';

        document.getElementById('deleteDestaque').setAttribute('data-id-destaque', '');

        $postArea = document.getElementById('destaqueInfo');
        $postArea.setAttribute('data-id-destaque', '');

    } else {
        $("#destaquesList .valueLine").removeClass("active");
        linhaDestaque.classList.add("active");

        //load data into the inputs in the page
        getDestaqueById(id.replace("destaque-", ""));
    }
}

/* get post info by selected */
function getDestaqueById(idDest) {
    idDest = idDest.replace("destaque-", "");
    listaDestaques = document.querySelector('#destaquesList');

    document.getElementById('deleteDestaque').setAttribute('data-id-destaque', idDest);
}

/* save/update post */
var $saveDestaqueBtn = $('#saveDestaque');
$saveDestaqueBtn.click(function () {
    var destaque = new FormData;

    var $input_select_id = $('#destaqueInfo #destaque-id').val();

    var $form_title = document.getElementById("destaque-formacao-title").value;
    var $form_text = document.getElementById("destaque-formacao-text").value;
    var $form_cat = document.getElementById("destaque-formacao-categoria").value;
    var $date_start = document.getElementById("destaque-formacao-date-start").value;
    var $date_end = document.getElementById("destaque-formacao-date-end").value;
    var $is_full = document.getElementById("destaque-formacao-full").value;
    var $last_vagas = document.getElementById("destaque-formacao-vagas").value;
    var $form_img = document.getElementById("destaque-formacao-img").value;
    var $form_url = document.getElementById("destaque-formacao-url").value;

    var $blog_title = document.getElementById("destaque-blog-title").value;
    var $blog_text = document.getElementById("destaque-blog-text").value;
    var $blog_img = document.getElementById("destaque-blog-img").value;
    var $blog_url = document.getElementById("destaque-blog-url").value;

    if($form_title != '') {
        destaque.append("formacao_title", $form_title);
        destaque.append("formacao_text", $form_text);
        destaque.append("formacao_categoria", $form_cat);
        destaque.append("date_start", $date_start);
        destaque.append("date_end", $date_end);
        destaque.append("is_full", $is_full);
        destaque.append("last_vagas", $last_vagas);
        destaque.append("formacao_img", $form_img);
        destaque.append("formacao_url", $form_url);
    } else {
        destaque.append("formacao_title", null);
        destaque.append("formacao_text", null);
        destaque.append("formacao_categoria", null);
        destaque.append("date_start", null);
        destaque.append("date_end", null);
        destaque.append("is_full", null);
        destaque.append("last_vagas", null);
        destaque.append("formacao_img", null);
        destaque.append("formacao_url", null);
    }

    if($blog_title != '') {
        destaque.append("blog_title", $blog_title);
        destaque.append("blog_text", $blog_text);
        destaque.append("blog_img", $blog_img);
        destaque.append("blog_url", $blog_url);
    } else {
        destaque.append("blog_title", null);
        destaque.append("blog_text", null);
        destaque.append("blog_img", null);
        destaque.append("blog_url", null);
    }

    if ($input_select_id == 'null') $.notify("Seleccionar categoria.");

    $destaqueArea = document.getElementById('destaqueInfo');
    var destaque_id = $destaqueArea.getAttribute('data-id-destaque');

    if (destaque_id != null)
        destaque_id = destaque_id.replace("destaque-", "");
    else
        destaque_id = ''

    if ($input_select_id != 'null') {
        destaque.append('cmdEval', 'saveDestaque');
        destaque.append("cat_id", $input_select_id);

        var titles = [];
        $('.dest-title').each(function(){
            titles.push($(this).text());
        })

        if(titles.includes($form_title) || titles.includes($blog_title)) {
            $.notify('Já existe destaque para este tópico.', "warn");
        } else {
            var xhttp = new XMLHttpRequest;
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    resp = this.responseText.split("||");
                    if (resp[0] == "true") {
                        $.notify("Destaque guardado com sucesso!", "success");

                        linhaDestaque = document.getElementById('destaque-' + destaque_id);
                        document.getElementById('destaque-id').value = 'null';

                        // linhaDestaque.classList.remove("active");

                        var inputs = document.getElementById('destaqueInfo').getElementsByTagName('input');

                        for (index = 0; index < inputs.length; ++index) {
                            if (inputs[index].type == "text")
                                inputs[index].value = '';
                        }

                        for (index = 0; index < inputs.length; ++index) {
                            if (inputs[index].type == "hidden")
                                inputs[index].value = null;
                        }

                        document.getElementById('destaque-id').value = 'null';
                        document.getElementById('destaque-form-id').value = 'null';
                        document.getElementById('destaque-blog-id').value = 'null';
                        document.getElementById('formacoes').style.display = 'none';
                        document.getElementById('blogPosts').style.display = 'none';

                        document.getElementById('deleteDestaque').setAttribute('data-id-destaque', '');

                        $destaqueArea = document.getElementById('destaqueInfo');
                        $destaqueArea.setAttribute('data-id-destaque', '');

                        if ($destaqueArea) {
                            if (destaque_id == '')
                                getDestaques(null, null);
                            else
                                getDestaques(null, destaque_id);
                            $destaqueArea = document.getElementById('destaqueInfo');
                            $destaqueArea.setAttribute('data-id-destaque', '');
                        } else {
                            getDestaques("last", null);
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

            xhttp.open("POST", "functions/func-destaques.php", true);
            xhttp.send(destaque);
        }
    }
});

/**
 * delete post
 */
var $deleteDestaqueBtn = $('#deleteDestaque');
$deleteDestaqueBtn.click(function (id) {
    id = document.getElementById('deleteDestaque').getAttribute('data-id-destaque');
    xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getDestaques()
                $.notify("Destaque apagado com sucesso.", "success");

                var inputs = document.getElementById('destaqueInfo').getElementsByTagName('input');

                for (index = 0; index < inputs.length; ++index) {
                    if (inputs[index].type == "text")
                        inputs[index].value = '';
                }

                for (index = 0; index < inputs.length; ++index) {
                    if (inputs[index].type == "hidden")
                        inputs[index].value = null;
                }

                document.getElementById('destaque-id').value = 'null';
                document.getElementById('destaque-form-id').value = 'null';
                document.getElementById('destaque-blog-id').value = 'null';
                document.getElementById('formacoes').style.display = 'none';
                document.getElementById('blogPosts').style.display = 'none';

                document.getElementById('deleteDestaque').setAttribute('data-id-destaque', '');
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Não foi possível apagar o destaque.");
            }
        }
    }
    xhttp.open("GET", "functions/func-destaques.php?cmdEval=deleteDestaque&id=" + id);
    xhttp.send();
});