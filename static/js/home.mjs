// Coloca o token em uma variável.
const token = localStorage.getItem("token").toString();

// Função que serve para carregar o feed principal
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
                    window.location.href = '/perfil-visitado?nickname=' + postagem.nickname;
                });
                
                let textElement = document.createElement("p");
                textElement.textContent = postagem.texto;
                postElement.appendChild(textElement);

                feedContainer.appendChild(postElement);
            }
        });
}

window.addEventListener("load", displayFeed);
