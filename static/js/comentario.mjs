const token = localStorage.getItem("token").toString();

// Resgatar o valor do cookie
let cookies = document.cookie.split('; ');
for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let [name, value] = cookie.split('=');
    if (name === 'postId') {
        console.log('O ID da postagem é: ' + value);
    }
}

function displayPostagem() {
    fetch("/postagem/" + postId, {
        headers: {
            'Authorization': token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let postagens = data.postagens;
        let postagemContainer = document.querySelector("#postagem-principal");
        postagemContainer.innerHTML = "";
        for (let i = 0; i < postagens.length; i++) {
            let postagem = postagens[i];
            postId = postagem.id_postagem;
        }
    });
}

function loadComentarios() {
    fetch("/comentar/" + postId, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        displayPostagem();
    });
}

displayPostagem();




loadComentarios









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