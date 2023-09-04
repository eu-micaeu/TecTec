const openButton = document.getElementById("open-Button");
const overlay = document.getElementById('overlay');
const closeButton = document.getElementById('close-Button');

openButton.addEventListener('click', function () {
    overlay.classList.add('active');
});

closeButton.addEventListener('click', function () {
    overlay.classList.remove('active');
});

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

document.getElementById("biografia").addEventListener("blur", function() {
    var biografia = document.getElementById("biografia").textContent;
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/atualizar-biografia/" + id_usuario);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({biografia: biografia}));
});

function updateBio() {
    var id = parseInt(localStorage.getItem("id_usuario"));
    fetch('/perfil/' + id)
        .then(response => response.json())
        .then(data => {
            let bio = data.usuario.biografia;
            let nameElement = document.getElementById('biografia');
            nameElement.textContent = bio;
        });
}

window.addEventListener('load', updateBio);


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
                imageContainer.classList.add("image-container"); // Adicione uma classe para o container da imagem

                let imageElement = document.createElement("img");
                imageElement.src = "/static/images/lixo.png";
                imageElement.style.width = "25px";
                imageElement.style.height = "25px";
                imageElement.style.cursor = "pointer";
                imageContainer.appendChild(imageElement);
                postElement.appendChild(imageContainer);

                feedContainer.appendChild(postElement);
            }
        });
}

window.addEventListener("load", displayFeed);