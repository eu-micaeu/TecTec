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
        searchNicknames();
    } catch (error) {
        console.error(error);
    }
}

varIdUsuario();


function searchNicknames() {
    var searchTerm = document.getElementById("searchInput").value;
    var resultsUl = document.getElementById("results");
    resultsUl.innerHTML = ""; 

    if (usuariosData.length > 0) {
        for (var i = 0; i < usuariosData.length; i++) {
            if (usuariosData[i].nickname.includes(searchTerm)) { 
                var lista = document.createElement("button");
                lista.textContent = usuariosData[i].nickname;
                resultsUl.appendChild(lista);

                lista.setAttribute("data-nickname", usuariosData[i].nickname);
                
                resultsUl.appendChild(lista);

                lista.style.cursor = "pointer";

                lista.addEventListener("click", function () {
                    var nickname = this.getAttribute("data-nickname");
                    window.location.href = '/perfil-visitado?nickname=' + nickname;
                });
            }
        }
    }
}



import { iconsHover } from './global.mjs';

iconsHover();