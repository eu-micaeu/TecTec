let usuariosData = [];

let nickname;

async function varIdUsuario() {

    try {

        const resposta = await fetch('/perfil-token/', {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json'

            },

        });

        const data = await resposta.json();

        nickname = data.usuario.nickname;

        pesquisarNicknames();

    } catch (error) {

        console.error(error);

    }
}

function pesquisarNicknames() {

    var pesquisarTerm = document.getElementById("barraPesquisa").value;

    var resultadosUl = document.getElementById("resultados");

    resultadosUl.innerHTML = "";

    if (usuariosData.length > 0) {

        for (var i = 0; i < usuariosData.length; i++) {

            if (usuariosData[i].nickname.includes(pesquisarTerm)) { 

                var lista = document.createElement("button");

                lista.textContent = usuariosData[i].nickname;

                lista.setAttribute("data-nickname", usuariosData[i].nickname);

                lista.style.cursor = "pointer";

                lista.addEventListener("click", function () {
                    var nickname = this.getAttribute("data-nickname");
                    window.location.href = '/perfil-visitado?nickname=' + nickname;
                });

                resultadosUl.appendChild(lista);
            }
        }

    } else {

        fetch('/usuarios/' + nickname)

            .then(resposta => {

                if (!resposta.ok) {

                    throw new Error('Erro na solicitação: ' + resposta.status);

                }

                return resposta.json();
            })

            .then(data => {

                usuariosData = data.usuarios;

                pesquisarNicknames();

            })

            .catch(error => {

                console.error(error.message);

            });

    }
}

var barraPesquisa = document.getElementById("barraPesquisa");

barraPesquisa.addEventListener("input", function () {

    pesquisarNicknames();

});

varIdUsuario();


import { iconeSelecionado, moduloBarraLateral } from './global.mjs';

iconeSelecionado();

var barraLateral = moduloBarraLateral();
document.getElementById("busca").addEventListener("click", barraLateral.alternarBarraLateral);