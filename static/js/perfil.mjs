let nickname;
const token = localStorage.getItem("token").toString();

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
        nickname = data.usuario.nickname;
    } catch (error) {
        console.error(error);
    }
}

varIdUsuario().then(() => {
    function displayFeed(nickname) {
        let name = nickname;
        fetch('/postagens/' + name, {
            headers: {
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                let postagens = data.postagens;
                let feedContainer = document.querySelector("#carrosel");
                feedContainer.innerHTML = "";
                for (let i = 0; i < postagens.length; i++) {
                    let postagem = postagens[i];
                    let postElement = document.createElement("div");
                    postElement.classList.add("cartao");

                    let nicknameElement = document.createElement("span");
                    nicknameElement.classList.add("nameWhite");
                    nicknameElement.textContent = '@' + postagem.nickname;
                    postElement.appendChild(nicknameElement);

                    let textElement = document.createElement("p");
                    textElement.textContent = postagem.texto;
                    postElement.appendChild(textElement);

                    let imageContainer = document.createElement("div");
                    imageContainer.classList.add("image-container");

                    let imageElement = document.createElement("img");
                    imageElement.src = "/static/images/lixo.png";
                    imageElement.style.width = "25px";
                    imageElement.style.height = "25px";
                    imageElement.style.cursor = "pointer";
                    imageElement.id = "lixo";

                    imageElement.addEventListener('mouseover', function() {
                        imageElement.src = '/static/images/lixobranco.png';
                    });
                    imageElement.addEventListener('mouseout', function() {
                        imageElement.src = '/static/images/lixo.png';
                    });

                    imageElement.addEventListener("click", function () {
                        let postId = postagem.id_postagem;

                        fetch('/excluir-postagem/' + postId, {
                            method: 'DELETE'
                        })
                            .then(response => response.json())
                            .then(data => {
                                displayFeed(name);
                            });
                    });

                    imageContainer.appendChild(imageElement);
                    postElement.appendChild(imageContainer);

                    feedContainer.appendChild(postElement);
                }
            });
    }

    function updateBiografia(id_usuario) {
        let id = parseInt(id_usuario); 
        fetch('/perfil/' + id, { 
            headers: {
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById('biografia').value = data.usuario.biografia;
            });
    };

    function updateNome(id_usuario) { 
        let id = parseInt(id_usuario); 
        fetch('/perfil/' + id, { 
            headers: {
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(data => {
                let nickname = data.usuario.nickname;
                let nameElement = document.getElementById('nome');
                nameElement.textContent = "@" + nickname;
            });
    }


    updateNome(nickname);
    updateBiografia(nickname);
    displayFeed(nickname);


    document.getElementById('biografia').addEventListener('blur', function () {
        var userId = id_usuario;
        var biografia = document.getElementById('biografia').value;
        fetch('/atualizar-biografia/' + userId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ biografia: biografia })
        });
    });
});

document.getElementById("editar").addEventListener("click", function () {
    document.getElementById("biografia").contentEditable = true;
    document.getElementById("biografia").focus();
});