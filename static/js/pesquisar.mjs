const token = localStorage.getItem("token").toString();
let usuariosData = []; // Array para armazenar os dados dos usuários
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
        searchNicknames(); // Chama a função de busca após a conclusão da requisição fetch
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
            if (usuariosData[i].nickname === searchTerm) {
                var li = document.createElement("li");
                li.textContent = usuariosData[i].nickname;
                resultsUl.appendChild(li);
            }
        }
    } else {
        varIdUsuario().then(() => {

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
        });
    }
}

varIdUsuario();

