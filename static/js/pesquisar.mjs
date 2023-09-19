var usuariosData = []; // Array para armazenar os dados dos usuários

const token = localStorage.getItem("token").toString();

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
        function searchNicknames() {
            var searchTerm = document.getElementById("searchInput").value;
            var resultsUl = document.getElementById("results");
            resultsUl.innerHTML = ""; // Limpa os resultados anteriores
        
            // Se os dados já foram carregados, fazer a busca no array local
            if (usuariosData.length > 0) {
                for (var i = 0; i < usuariosData.length; i++) {
                    if (usuariosData[i].nickname === searchTerm) { // Comparação exata, sensível a maiúsculas e minúsculas
                        var li = document.createElement("li");
                        li.textContent = usuariosData[i].nickname;
                        resultsUl.appendChild(li);
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
                        usuariosData = data.usuarios; // Armazena os dados no array local
                        searchNicknames(); // Chama a função de busca novamente
                    })
                    .catch(error => {
                        console.error(error.message);
                    });
            }
        }
    } catch (error) {
        console.error(error);
    }
}

varIdUsuario();

