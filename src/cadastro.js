window.onload = function (e) {

    var btnCadastrar = document.getElementById("btnCadastrar");

    var txtNome = document.getElementById("txtNome");

    var txtSobrenome = document.getElementById("txtSobrenome");

    var txtEmail = document.getElementById("txtEmail");

    var txtTelefone = document.getElementById("txtTelefone");

    var slcGenero = document.getElementById("slcGenero");

    var txtSenha = document.getElementById("txtSenha");

    txtNome.focus();

    btnCadastrar.onclick = function (e) {

        e.preventDefault();

        var nome = txtNome.value;

        var sobrenome = txtSobrenome.value;

        var telefone = txtTelefone.value;

        var email = txtEmail.value;

        var genero = slcGenero.value;

        var senha = txtSenha.value;

        if (nome == "") {
            exibirMensagemErro("informe o  nome.");
        }
        else if (sobrenome == "") {
            exibirMensagemErro("informe o sobrenome");
        }
        else if (telefone == "") {
            exibirMensagemErro("informe o telefone");
        }
        else if (email == "") {
            exibirMensagemErro("informe o email");
        }
        
        else if (genero == "") {
            exibirMensagemErro("informe o genero")
        }
        else if (senha == "") {
            exibirMensagemErro("informe a senha");
        }
        else {
            cadastrar(nome, sobrenome, telefone, email , genero, senha);
        }
    };

    function exibirMensagemErro(mensagem) {

        var spnErro = document.getElementById("spnErro");
        spnErro.innerText = mensagem;
        spnErro.style.display = "block";

        setTimeout(function () {
            spnErro.style.display = "none";
        }, 5000);
    };


    function cadastrar(nome, sobrenome, telefone, email, genero, senha) {
        var data = JSON.stringify({
            "nome": nome,
            "sobrenome": sobrenome,
            "telefone": telefone,
            "email": email,
            "genero": genero,
            "senha": senha
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var result = JSON.parse(this.responseText);
                if (result.sucesso) {
                    localStorage.setItem("usuarioGuid", result.usuarioGuid);
                    window.location.href = 'home.html';
                }
                else {
                    exibirMensagemErro(result.mensagem);
                }
            }

        });

        xhr.open("POST", "https://localhost:44380/api/usuario/cadastro");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);

    };

}
    
