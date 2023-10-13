let usuariosData = [];
let nickname;
async function varIdUsuario() {
    try {
        const response = await fetch('/perfil-token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();

        nickname = data.usuario.nickname;

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
            if (usuariosData[i].nickname.includes(searchTerm)) { 
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

        fetch('/usuarios/' + nickname)
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

import { iconsHover, sidebarModule } from './global.mjs';

iconsHover();

var sidebar = sidebarModule();
document.getElementById("busca").addEventListener("click", sidebar.toggleSidebar);