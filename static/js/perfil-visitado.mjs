const token = localStorage.getItem("token").toString();

// Função que serve para 
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function displayFeed() {
    let nickname = getParameterByName('nickname');
    fetch('/postagens/' + nickname, {
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

                let textElement = document.createElement("p");

                textElement.textContent = postagem.texto;

                postElement.appendChild(textElement);

                let nickname = postagem.nickname;
                let nameElement = document.getElementById('nome');
                nameElement.textContent = "@" + nickname;

                let imageContainer = document.createElement("div");
                imageContainer.classList.add("centraliza");

                let image2Element = document.createElement('img');

                image2Element.src = '../static/images/comentario.png'
                image2Element.width = 25;
                image2Element.height = 25;

                image2Element.addEventListener('mouseover', function () {
                    image2Element.src = '/static/images/comentariobranco.png';
                });
                image2Element.addEventListener('mouseout', function () {
                    image2Element.src = '/static/images/comentario.png';
                });

                image2Element.addEventListener('click', function () {
                    let postId = postagem.id_postagem;
                    document.cookie = "postId=" + postId;
                    window.location.href = 'comentario?postId=' + postId;
                });

                imageContainer.appendChild(image2Element);

                let comentarioQuantidade = document.createElement('p');
                comentarioQuantidade.textContent = postagem.comentarios;

                imageContainer.appendChild(comentarioQuantidade);

                postElement.appendChild(imageContainer);

                feedContainer.appendChild(postElement);

                document.getElementById('biografia').innerHTML = postagem.biografia;

                let tecnologia = postagem.tecnologia;

                let tecnologiaElement = document.getElementById('tecnologia');
                
                tecnologiaElement.textContent = "Tecnologia: " + tecnologia;

                window.addEventListener("resize", ajustarTamanhoDoCartao);  
                ajustarTamanhoDoCartao();
            }


        });
}

window.addEventListener("load", displayFeed);

function ajustarTamanhoDoCartao() {
    var larguraDaTela = window.innerWidth;
    
    if (larguraDaTela <= 768) {
        var cartoes = document.querySelectorAll(".cartao");
        cartoes.forEach(function (cartao) {
            cartao.style.width = "70vh";
            cartao.style.fontSize = "10px"; 
            cartao.style.padding = "15px";
            cartao.style.margin = "0.5vh"; 
        });
    } else {
        var cartoes = document.querySelectorAll(".cartao");
        cartoes.forEach(function (cartao) {
            cartao.style.width = "80vh"; 
            cartao.style.fontSize = "16px"; 
            cartao.style.padding = "25px"; 
            cartao.style.margin = "1vh"; 
        });
    }
} 

let homeImage = document.querySelector("#casa");

homeImage.addEventListener('mouseover', function () {
    homeImage.src = '/static/images/homebranco.png';
});
homeImage.addEventListener('mouseout', function () {
    homeImage.src = '/static/images/home.png';
});

let userImage = document.querySelector("#perfil");

userImage.addEventListener('mouseover', function () {
    userImage.src = '/static/images/la_userbranco.png';
});
userImage.addEventListener('mouseout', function () {
    userImage.src = '/static/images/la_user.png';
});

let pesquisaImage = document.querySelector("#pesquisa");

pesquisaImage.addEventListener('mouseover', function () {
    pesquisaImage.src = '/static/images/pesquisabranco.png';
});
pesquisaImage.addEventListener('mouseout', function () {
    pesquisaImage.src = '/static/images/pesquisa.png';
});

let outImage = document.querySelector("#sair");

outImage.addEventListener('mouseover', function () {
    outImage.src = '/static/images/outbranco.png';
});
outImage.addEventListener('mouseout', function () {
    outImage.src = '/static/images/out.png';
});