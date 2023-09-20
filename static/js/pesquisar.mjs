const token = localStorage.getItem("token").toString();
let usuariosData = [];
let idUsuario;

async function varIdUsuario() {
    try {
        const response = await fetch('/perfil-token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token })
        });

        const data = await response.json();

        idUsuario = data.usuario.id_usuario;

        console.log(idUsuario)
        searchNicknames();
    } catch (error) {
        console.error(error);
    }
}

function searchNicknames() {
    var searchTerm = document.getElementById("searchInput").value;
    var resultsUl = document.getElementById("results");
    resultsUl.innerHTML = "";

    if (usuariosData.length > 0) {
        for (var i = 0; i < usuariosData.length; i++) {
            if (usuariosData[i].nickname.includes(searchTerm)) { // Alterado para correspondência parcial
                var lista = document.createElement("button");
                lista.textContent = usuariosData[i].nickname;
                lista.setAttribute("data-nickname", usuariosData[i].nickname);

                lista.style.cursor = "pointer";

                lista.addEventListener("click", function () {
                    var nickname = this.getAttribute("data-nickname");
                    window.location.href = '/perfil-visitado?nickname=' + nickname;
                });

                resultsUl.appendChild(lista);
            }
        }
    } else {
        fetch('/usuarios/' + idUsuario)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na solicitação: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                usuariosData = data.usuarios;
                searchNicknames();
            })
            .catch(error => {
                console.error(error.message);
            });
    }
}

var searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function () {
    searchNicknames();
});

varIdUsuario();



import { iconsHover } from './global.mjs';

iconsHover();