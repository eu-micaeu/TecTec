function updateName() {
    var id = parseInt(localStorage.getItem("id_usuario"));
    fetch('/perfil/' + id)
        .then(response => response.json())
        .then(data => {
            let nickname = data.usuario.nickname;
            let nameElement = document.getElementById('nome');
            nameElement.textContent = "@" + nickname;
        });
}

window.addEventListener('load', updateName);

document.getElementById("editar").addEventListener("click", function() {
    document.getElementById("biografia").contentEditable = true;
    document.getElementById("biografia").focus();

});

const id_usuario = localStorage.getItem("id_usuario").toString();

function displayFeed() {
    let id = parseInt(localStorage.getItem("id_usuario"));
    fetch('/postagens/' + id)
        .then(response => response.json())
        .then(data => {
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
                
                imageElement.addEventListener("click", function() {
                    let postId = postagem.id_postagem;
                    
                    fetch('/excluir-postagem/' + postId, {
                        method: 'DELETE'
                    })
                    .then(response => response.json())
                    .then(data => {
                        displayFeed();
                    });
                });
                
                imageContainer.appendChild(imageElement);
                postElement.appendChild(imageContainer);

                feedContainer.appendChild(postElement);
            }
        });
}

window.addEventListener("load", displayFeed);

window.addEventListener('load', function() {
    var userId = id_usuario;
    fetch('/perfil/' + userId)
        .then(response => response.json())
        .then(data => {
            document.getElementById('biografia').value = data.usuario.biografia;
        });
});

document.getElementById('biografia').addEventListener('blur', function() {
    var userId = id_usuario;
    var biografia = document.getElementById('biografia').value;
    fetch('/atualizar-biografia/' + userId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ biografia: biografia })
    });
});
