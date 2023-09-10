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

                feedContainer.appendChild(postElement);

                let nickname = postagem.nickname;
                let nameElement = document.getElementById('nome');
                nameElement.textContent = "@" + nickname;

                document.getElementById('biografia').innerHTML = postagem.biografia;
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
