﻿window.onload = function (e) {
    var txtEmail = document.getElementById("txtEmail");

    txtEmail.focus();

    var form = document.getElementById("frmEsqueceu");

    form.onsubmit = function (e) {

        e.preventDefault();

        var email = txtEmail.value;

        if (email == "") {

            var mensagem = "Os campos acimas são obrigatório";

            exibirMensagemErro(mensagem);
        }
        else {
            esqueceuSenha(email);
        }
    };

    function esqueceuSenha(email) {
        var data = JSON.stringify({
            "email": email
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);

                var result = JSON.parse(this.responseText);

                if (result.sucesso) {
                    alert("Recuperou!!");
                }
                else {
                    exibirMensagemErro(result.mensagem);
                }
            }
        });

        xhr.open("POST", "https://localhost:44380/api/usuario/EsqueceuSenha");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }

    function exibirMensagemErro(mensagem) {
        var spnErro = document.getElementById("spnErro");

        spnErro.innerText = mensagem;

        spnErro.style.display = "block";

        setTimeout(function () {
            spnErro.style.display = "none";
        }, 5000);
    }
}