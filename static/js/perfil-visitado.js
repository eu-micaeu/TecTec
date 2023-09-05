function updateName() {
    var id = parseInt(localStorage.getItem("id_usuario_visitado"));
    fetch('/perfil/' + id)
        .then(response => response.json())
        .then(data => {
            let nickname = data.usuario.nickname;
            let nameElement = document.getElementById('nome');
            nameElement.textContent = "@" + nickname;
        });
}

window.addEventListener('load', updateName);

const id_usuario_visitado = localStorage.getItem("id_usuario_visitado").toString();

function displayFeed() {
    let id = parseInt(localStorage.getItem("id_usuario_visitado"));
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

                feedContainer.appendChild(postElement);
            }
        });
}

window.addEventListener("load", displayFeed);

window.addEventListener('load', function() {
    var id = parseInt(localStorage.getItem("id_usuario_visitado"));
    fetch('/perfil/' + id)
        .then(response => response.json())
        .then(data => {
            document.getElementById('biografia').innerHTML = data.usuario.biografia;
        });
});




