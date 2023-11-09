/* eslint-disable */
window.addEventListener('load', function (e) {
    getContactos();

    $('#contactos-address').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']]
        ]
    });

    $('#contactos-horario').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']]
        ]
    });

    $('#contactos-api').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']]
        ]
    });
});

/* get Contactos Homepage info */
function getContactos() {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                var contactos_data = JSON.parse(resp[1]);
                var $input_tlf_1 = $('#contactos #contactos-tlf1');
                var $input_tlf_2 = $('#contactos #contactos-tlf2');
                var $input_email_1 = $('#contactos #contactos-email1');
                var $input_email_2 = $('#contactos #contactos-email2');
                var $input_address = $('#contactos #contactos-address');
                var $input_horario = $('#contactos #contactos-horario');
                var $input_fb = $('#contactos #contactos-fb');
                var $input_ig = $('#contactos #contactos-ig');
                var $input_blog = $('#contactos #contactos-blog');
                var $input_api = $('#contactos #contactos-api');

                $input_tlf_1.val(contactos_data.tlf_1);
                $input_tlf_2.val(contactos_data.tlf_2);
                $input_email_1.val(contactos_data.email_1);
                $input_email_2.val(contactos_data.email_2);
                $input_address.next().find('.note-editable').html(contactos_data.address);
                $input_horario.next().find('.note-editable').html(contactos_data.horario);
                $input_fb.val(contactos_data.facebook);
                $input_ig.val(contactos_data.instagram);
                $input_blog.val(contactos_data.blog);
                $input_api.next().find('.note-editable').html(contactos_data.google_maps_code);
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

    xhttp.open("GET", "functions/func-contactos.php?cmdEval=getContactos");
    xhttp.send();
}

/* update Contactos Homepage info */
var $saveContactosBtn = $('#saveContactos');
$saveContactosBtn.click(function () {
    var contactos = new FormData;
    var $input_tlf_1 = $('#contactos #contactos-tlf1').val();
    var $input_tlf_2 = $('#contactos #contactos-tlf2').val();
    var $input_email_1 = $('#contactos #contactos-email1').val();
    var $input_email_2 = $('#contactos #contactos-email2').val();
    var $input_address = $('#contactos #contactos-address').next().find('.note-editable').html();
    var $input_horario = $('#contactos #contactos-horario').next().find('.note-editable').html();
    var $input_fb = $('#contactos #contactos-fb').val();
    var $input_ig = $('#contactos #contactos-ig').val();
    var $input_blog = $('#contactos #contactos-blog').val();
    var $input_api = $('#contactos #contactos-api').next().find('.note-editable').html();

    if ($input_tlf_1 == "") {
        $(".contactos-tlf1-erro.erro").text("Por favor, inserir o telefone principal.");
    } else {
        $(".contactos-tlf1-erro.erro").text("");
    }

    if ($input_email_1 == "") {
        $(".contactos-email1-erro.erro").text("Por favor, inserir o e-mail principal.");
    } else {
        $(".contactos-email1-erro.erro").text("");
    }

    if ($input_address.replace(/(<([^>]+)>)/ig, '').length == 0) {
        $(".contactos-address-erro.erro").text("Por favor, inserir a morada.");
    } else {
        $(".contactos-address-erro.erro").text("");
    }

    if ($input_horario.replace(/(<([^>]+)>)/ig, '').length == 0) {
        $(".contactos-horario-erro.erro").text("Por favor, inserir o horário de funcionamento.");
    } else {
        $(".contactos-horario-erro.erro").text("");
    }

    if ($input_fb == "") {
        $(".contactos-fb-erro.erro").text("Por favor, inserir o URL da página de Facebook.");
    } else {
        $(".contactos-fb-erro.erro").text("");
    }

    if ($input_ig == "") {
        $(".contactos-ig-erro.erro").text("Por favor, inserir o URL do perfil de Instagram.");
    } else {
        $(".contactos-ig-erro.erro").text("");
    }

    if ($input_blog == "") {
        $(".contactos-blog-erro.erro").text("Por favor, inserir o URL do Blog.");
    } else {
        $(".contactos-blog-erro.erro").text("");
    }

    if ($input_api.replace(/(<([^>]+)>)/ig, '').length == 0) {
        $(".contactos-api-erro.erro").text("Por favor, introduzir código do Google Maps.");
    } else {
        $(".contactos-api-erro.erro").text("");
    }

    if ($input_tlf_1 != '' && $input_email_1 != '' && $input_address != '' && $input_horario != '' && $input_fb != '' && $input_ig != '' && $input_blog != '' && $input_api != '') {
        contactos.append("cmdEval", "updateContactos");
        contactos.append("tlf1", $input_tlf_1);
        contactos.append("tlf2", $input_tlf_2);
        contactos.append("email1", $input_email_1);
        contactos.append("email2", $input_email_2);
        contactos.append("address", $input_address);
        contactos.append("horario", $input_horario);
        contactos.append("facebook", $input_fb);
        contactos.append("instagram", $input_ig);
        contactos.append("blog", $input_blog);
        contactos.append("api_code", $input_api);

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

        xhttp.open("POST", "functions/func-contactos.php", true);
        xhttp.send(contactos);
    }
});