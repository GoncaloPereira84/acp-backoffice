/* eslint-disable */
window.addEventListener('load', function (e) {
    document.execCommand('copy', false, null);
    document.execCommand('cut', false, null);
    document.execCommand('redo', false, null);
    document.execCommand('undo', false, null);

    $('div[contenteditable=true]').bind("paste", function () {
        // $(this).text($(this).text());
        document.execCommand('paste', false, null);
    });

    var map = Array.prototype.map;

    $("div[contenteditable=true]").each(function () {
        $(this).bind({
            paste: function () {
                var self = $(this);
                setTimeout(function () {
                    var text = self.html();

                    text = text.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '<br><br>');
                    text = text.replace(/<div[^>]*>/g, '').replace(/<\/p>/g, '<br><br>');

                    self.html(text);

                    self.children().not('br').each(function () {
                        var content = $(this).contents();
                        $(this).replaceWith(content);
                    });

                }, 1);
            }
        });

    })

    // $('div[contenteditable=true]').bind("paste", function () {
    //     // $(this).text($(this).text());
    //     document.execCommand('paste', false, null);
    // });

    formatButtons();

    $(".bold").each(function () {
        $(this).on('click', function () {
            document.execCommand('bold', false, null);
        })
    });

    $(".italic").each(function () {
        $(this).on('click', function () {
            document.execCommand('italic', false, null);
        })
    });

    $(".underline").each(function () {
        $(this).on('click', function () {
            document.execCommand('underline', false, null);
        })
    });

    $(".ul-list").each(function () {
        $(this).on('click', function () {
            document.execCommand('insertUnorderedList', false, null);
        })
    });

    $(".ol-list").each(function () {
        $(this).on('click', function () {
            document.execCommand('insertOrderedList', false, null);
        })
    });

    $(".create-link").each(function () {
        $(this).on('click', function () {
            document.execCommand('createLink', false, window.getSelection().toString());
        })
    });
});



function formatButtons() {
    var textareas = document.querySelectorAll('[contenteditable=true]');
    var map = Array.prototype.map;

    map.call(textareas, function (t) {
        var btnsContainer = document.createElement('div');
        btnsContainer.id = 'format-btns';

        //bold button
        var boldBtn = document.createElement('div');
        // boldBtn.id = 'bold';
        boldBtn.classList = 'bold btn btn-primary';

        var txtB = document.createElement('span');
        txtB.classList = 'icon text-white-75';
        txtB.innerHTML = '<b>B</b>';

        boldBtn.appendChild(txtB);

        //italic button
        var italicBtn = document.createElement('div');
        // italicBtn.id = 'italic';
        italicBtn.classList = 'italic btn btn-primary';

        var txtI = document.createElement('span');
        txtI.classList = 'icon text-white-75';
        txtI.innerHTML = '<i>I</i>';

        italicBtn.appendChild(txtI);

        //underline button
        var underlineBtn = document.createElement('div');
        // underlineBtn.id = 'underline';
        underlineBtn.classList = 'underline btn btn-primary';

        var txtU = document.createElement('span');
        txtU.classList = 'icon text-white-75';
        txtU.innerHTML = '<u>U</u>';

        underlineBtn.appendChild(txtU);

        //unordered list button
        var ulBtn = document.createElement('div');
        ulBtn.classList = 'ul-list btn btn-primary';

        var txtUl = document.createElement('span');
        txtUl.classList = 'icon text-white-75';
        txtUl.innerHTML = '<i class="fas fa-list-ul"></i>';

        ulBtn.appendChild(txtUl);

        //ordered list button
        var olBtn = document.createElement('div');
        olBtn.classList = 'ol-list btn btn-primary';

        var txtOl = document.createElement('span');
        txtOl.classList = 'icon text-white-75';
        txtOl.innerHTML = '<i class="fas fa-list-ol"></i>';

        olBtn.appendChild(txtOl);

        //create link button
        var linkBtn = document.createElement('div');
        linkBtn.classList = 'create-link btn btn-primary';

        var txtLink = document.createElement('span');
        txtLink.classList = 'icon text-white-75';
        txtLink.innerHTML = '<i class="fas fa-link"></i>';

        linkBtn.appendChild(txtLink);

        //append buttons to container
        btnsContainer.appendChild(boldBtn);
        btnsContainer.appendChild(italicBtn);
        btnsContainer.appendChild(underlineBtn);
        btnsContainer.appendChild(ulBtn);
        btnsContainer.appendChild(olBtn);
        btnsContainer.appendChild(linkBtn);

        //append container to area
        t.parentNode.append(btnsContainer);
    })
}

function checkEmail($email) {
    var filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
    return filter.test($email);
}

$("#login-user").on("submit", function (e) {
    e.preventDefault();

    var data = {
        email: $("form#login-user input#email").val(),
        pw: $("form#login-user input#password").val()
    };

    var controlEmail = false;
    if (data["email"] == "") {
        $("form#login-user input#email").focus();
        erro = 'Introduza o seu e-mail.';
        $("form#login-user input#email").attr('placeholder', erro);
    } else {
        verifyEmail = checkEmail(data["email"]);
        if (verifyEmail) {
            controlEmail = true;
        } else {
            $("form#login-user input#email").focus();
            erro = 'O e-mail inserido não é valido.';
            $("form#login-user input#email").attr('placeholder', erro);
        }
    }
    if (data["pw"] == "") {
        $("form#login-user input#password").focus();
        erro = 'Introduza a password.';
        $("form#login-user input#password").attr('placeholder', erro);
    }

    if (controlEmail == true && data["pw"] != "") {
        var location = window.location.href;
        var split_url = location.split("/");
        var ref = split_url[split_url.length - 1];
        var path;

        // if (ref == 'index.php' || ref == "bootstrap-BO") path = '';
        // else path = '../../'

        $.ajax({
            url: 'ajax/login.php',
            type: 'POST',
            data: {
                email: data['email'],
                password: data['pw']
            },
            dataType: "json",
            success: function (response) {
                if (response.error) {
                    $("label#formError").html(response.result);
                } else if (response.success) {
                    // window.location.assign("/bootstrap-BO/index.php");
                    window.location.assign("/index.php");
                } else {
                    erro = 'Erro no login.';
                    $("label#formError").text(erro);
                }
            }
        })
        return false;
    }
    return false;
})


function logout() {
    var location = window.location.href;
    var split_url = location.split("/");
    var ref = split_url[split_url.length - 1];
    var path;

    if (ref == 'index.php' || ref == "bootstrap-BO") path = '';
    else path = '../../../'

    $.ajax({
        url: path + 'ajax/logout.php',
        dataType: "json",
        success: function (response) {
            // window.location.assign("/bootstrap-BO/login.php");
            window.location.assign("/login.php");
        },
    });
}

$('#savePassword').on('click', function (e) {
    e.preventDefault();
    $("span#pw-old-error").text("");
    $("span#pw-new-error").text("");
    $("span#pw-new-conf-error").text("");

    var oldP = $('#password-old');
    var newP = $('#password-new');
    var newP_conf = $('#password-new-conf');

    var data = {
        old: oldP.val(),
        new: newP.val(),
        newC: newP_conf.val()
    }

    var conf_pw = false;
    var erro;

    if (data.new != '') {
        if (data.new.length < 6) {
            newP.focus();
            erro = 'A password deverá ter mais de 6 caracteres.';
            $("span#pw-new-error").text(erro);
            newP.val('');
            newP_conf.val('');
        } else {
            $("span#pw-new-error").text('');

            if (data.new == data.newC) {
                conf_pw = true;
                $('#password-new-conf').text('');
            } else if (data.new != data.newC && data.newC != '') {
                newP.focus();
                erro = 'As passwords não correspondem';
                $("span#pw-new-conf-error").text(erro);
                newP.val('');
                newP_conf.val('');
            } else if (data.newC == '') {
                newP_conf.focus();
                erro = 'Confirme a password nova.';
                $("span#pw-new-conf-error").text(erro);
            }
        }
    } else {
        newP.focus();
        erro = 'Defina a sua password nova.';
        $("span#pw-new-error").text(erro);
    }

    if (data.old == '') {
        oldP.focus();
        erro = 'Introduza a password actual.';
        $("span#pw-old-error").text(erro);
    }

    if (data.old != '' && data.new != '' && data.newC != '' && conf_pw != false) {
        var location = window.location.href;
        var split_url = location.split("/");
        var ref = split_url[split_url.length - 1];
        var path;

        if (ref == 'index.php') path = '';
        else path = '../../'

        $.ajax({
            url: path + 'ajax/changePassword.php',
            type: 'POST',
            data: data,
            dataType: "json",
            success: function (response) {
                if (response.error_nova_pw) {
                    oldP.val('');
                    newP.val('');
                    newP_conf.val('');
                    $("span#pw-new-error").html(response.result);
                } else if (response.error_nova_pw_c) {
                    oldP.val('');
                    newP.val('');
                    newP_conf.val('');
                    $("span#pw-new-conf-error").html(response.result);
                } else if (response.success) {
                    $("span#pw-new-conf-error").html(response.result);
                } else if (response.error_pw) {
                    oldP.val('');
                    newP.val('');
                    newP_conf.val('');
                    $("span#pw-old-error").html(response.result);
                } else if (response.error_nova_pw_6) {
                    oldP.val('');
                    newP.val('');
                    newP_conf.val('');
                    $("span#pw-new-error").html(response.result);
                } else {
                    erro = 'Erro na actualização de dados.';
                    $("span#pw-new-error").text(erro);
                }
            }
        })
    }
    return false;
})

function RecoverPassword(){
	$("#recuperar-form-r").on("submit", function(e){
	e.preventDefault();
	var myParam = location.search.split('recover_code=')[1];
	var data = {
	    emailrecover : $("#recover_password_email").val(),
	    newpassrecover : $("#recover_password").val(),
	    confirmnewpassrecover : $("#recover_password_confirm").val(),
	    code : myParam
	};
	var verifyEmail = false;
	var confirm_pw = false;
		if(data["newpassrecover"] != ''){
			$("label.pw-nova").text('');
			if(data["newpassrecover"].length < 6){
				$("input#recover_password").focus();
				erro = 'A nova password deve ter, pelo menos, 6 caracteres.';
				$("label.pw-nova").text(erro);
				$("input#recover_password").val('');
				$("input#recover_password_confirm").val('');
			}else{
				$("label.pw-nova").text("");
				if(data["newpassrecover"] == data["confirmnewpassrecover"]){
					confirm_pw = true;
					$("label.pw-nova-conf").text("");
				}else if(data["newpassrecover"] != data["confirmnewpassrecover"] && data["confirm"] != ""){
					$("input#recover_password").focus();
					erro = 'As palavras-passe não correspondem.';
					$("label.pw-nova-conf").text(erro);
					$("input#recover_password").val('');
					$("input#recover_password_confirm").val('');
				}else if(data["confirmnewpassrecover"] == ""){
					$("input#recover_password_confirm").focus();
					erro = 'Confirme a password nova.';
		        	$("label.pw-nova-conf").text(erro);
				}
			}
		}else{
			$("input#recover_password").focus();
			erro = 'Introduza a password nova.';
	    	$("label.pw-nova").text(erro);
		}
	  
	    if(data['emailrecover'] != ''){
	    	verifyEmail = checkEmail(data['emailrecover']);
	    	if(!verifyEmail){
	      		erro = 'O e-mail inserido não é valido.';
	      		$('label.nova-email').text(erro);
	    	}
	  	}else{
	  		$("input#recover_password_email").focus();
	    	erro = 'Introduza o seu e-mail.';
	    	$('label.nova-email').text(erro);
	  	}
	  	
	  	if(confirm_pw == true && verifyEmail == true){
			$.ajax({
	    		url : '/ajax/recover_password.php',
	    		type: "POST",
	    		data : data,
	    		dataType: "json",
	    		success: function (response){
	    			if(response.error){
	        			$("label.submit-password").text(response.result);
	        		}else if(response.success_update){
	        			$("label.submit-password").text(response.result);
	        		}else{
		        		erro = 'Erro na actualização da palavra-passe.';
	        			$("label.submit-password").text(erro);
	        		}
	    		}
			});
	  	}
	});
}