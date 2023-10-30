var toastErrado = document.getElementById("toastErrado")

document.getElementById('btEntrar').addEventListener('click', async function () {

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

        }

    } else {

        toastErrado.style.display = "block";

        setTimeout(function () {

            toastErrado.style.display = "none";

        }, 2000);

    }

});




