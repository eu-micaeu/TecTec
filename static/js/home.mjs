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

                let divEmbaixo = document.createElement("div");
                divEmbaixo.classList.add("centraliza");

                let comentarioImagem = document.createElement('img');

                comentarioImagem.src = '../static/images/comentario.png'
                comentarioImagem.width = 30; 
                comentarioImagem.height = 30;

                comentarioImagem.addEventListener('mouseover', function() {
                    comentarioImagem.src = '/static/images/comentariobranco.png';
                });
                comentarioImagem.addEventListener('mouseout', function() {
                    comentarioImagem.src = '/static/images/comentario.png';
                });                

                comentarioImagem.addEventListener('click', function () {
                    let postId = postagem.id_postagem;
                    window.location.href = 'comentario?postId=' + postId;
                });

                divEmbaixo.appendChild(comentarioImagem);

                let comentarioQuantidade = document.createElement('p');
                comentarioQuantidade.textContent = postagem.comentarios;
                                                
                divEmbaixo.appendChild(comentarioQuantidade);

                postElement.appendChild(divEmbaixo);

                feedContainer.appendChild(postElement);
            }
        });
}

window.addEventListener("load", displayFeed);

let homeImage = document.querySelector("#casa");

homeImage.addEventListener('mouseover', function() {
    homeImage.src = '/static/images/homebranco.png';
});
homeImage.addEventListener('mouseout', function() {
    homeImage.src = '/static/images/home.png';
});

let userImage = document.querySelector("#perfil");

userImage.addEventListener('mouseover', function() {
    userImage.src = '/static/images/la_userbranco.png';
});
userImage.addEventListener('mouseout', function() {
    userImage.src = '/static/images/la_user.png';
});

let pesquisaImage = document.querySelector("#pesquisa");

pesquisaImage.addEventListener('mouseover', function() {
    pesquisaImage.src = '/static/images/pesquisabranco.png';
});
pesquisaImage.addEventListener('mouseout', function() {
    pesquisaImage.src = '/static/images/pesquisa.png';
});

let outImage = document.querySelector("#sair");

outImage.addEventListener('mouseover', function() {
    outImage.src = '/static/images/outbranco.png';
});
outImage.addEventListener('mouseout', function() {
    outImage.src = '/static/images/out.png';
});