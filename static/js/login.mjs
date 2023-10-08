// Detectar o carregamento inicial da página e implementar a lógiva que possui
document.addEventListener("DOMContentLoaded", function () {

    const btEntrar = document.querySelector("#btEntrar");

    function cabecalhoParaEnviar(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            btEntrar.click();

        }
    }

    const inserirUsuario = document.querySelector("#nickname");

    inserirUsuario.addEventListener("keypress", cabecalhoParaEnviar);

    const inserirSenha = document.querySelector("#senha");

    inserirSenha.addEventListener("keypress", cabecalhoParaEnviar);

});

// Detectar o btEntrar para implementar a lógica de login
document.getElementById('btEntrar').addEventListener('click', async function () { // Ao apertar o botão de Entrar

    const nickname = document.querySelector("#nickname").value;

    const senha = document.querySelector("#senha").value;

    const respostaLogin = await fetch("/login", {

        method: "POST",

        body: JSON.stringify({ nickname, senha })

    });

    if (respostaLogin.ok) {

        const informacoesLogin = await respostaLogin.json();

        if (informacoesLogin.message === "Login efetuado com sucesso!") {

            const respostaPerfilToken = await fetch("/perfil-token", {

                method: "POST",

            });

            if (respostaPerfilToken.ok) {

                const informacoesPerfilToken = await respostaPerfilToken.json();
                
                const nickname = informacoesPerfilToken.usuario.nickname

                const respostaSessaoEntrada = await fetch("/entrada/" + nickname, {

                    method: "POST",

                });

                if (respostaSessaoEntrada.ok) {

                    window.location.href = "/home";

                }

            }

        } else {

            alert('Ops! Usuário inexistente');

        }

    } else {

        alert('Ops! Usuário inexistente');

    }

});

