const openButton = document.getElementById("btn-abrir");
const overlay = document.getElementById('sobrepor');
const closeButton = document.getElementById('btn-fechar');

openButton.addEventListener('click', function () {
    overlay.classList.add('active');
});

closeButton.addEventListener('click', function () {
    overlay.classList.remove('active');
});

function displayFeed() {
    let id = parseInt(localStorage.getItem("id_usuario"));
    fetch('/feed/' + id)
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
