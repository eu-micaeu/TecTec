const token = localStorage.getItem("token").toString();

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
    fetch('/feed', { 
        headers: {
            'Authorization': token
        }
    })
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
                nicknameElement.style.cursor = "pointer";

                nicknameElement.addEventListener("click", function() {
                    window.location.href = '/perfil-visitado?id=' + postagem.id_usuario;
                });
                
                

                let textElement = document.createElement("p");
                textElement.textContent = postagem.texto;
                postElement.appendChild(textElement);

                feedContainer.appendChild(postElement);
            }
        });
}

window.addEventListener("load", displayFeed);
