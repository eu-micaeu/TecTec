let postId;
const token = localStorage.getItem("token").toString();

async function varIdPostagem() {
    try {
        const response = await fetch('/perfil-token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token, requestType: 'id_postagem' })
        });

        const data = await response.json();

        postId = data.postagens.id_postagem;
    } catch (error) {
        console.error(error);
    }
}

varIdPostagem().then(() => {

    function displayComent(id_postagem) {

        fetch("/postagem/:id_postagem" + postId, {
            headers: {
                'Authorization': token
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            let postagem = data.postagens;
            let postagemContainer = document.querySelector("#postagem-principal");
            postagemContainer.innerHTML = "";

            let postElement = document.createElement("div");
            postElement.classList.add("cartao");

            let nicknameElement = document.createElement("span");
            nicknameElement.classList.add("nameWhite");
            nicknameElement.textContent = '@' + postagem.nickname;
            postElement.appendChild(nicknameElement);

            let textElement = document.createElement("p");
            textElement.textContent = postagem.texto;
            postElement.appendChild(textElement);

            postagemContainer.appendChild(postElement);


        })
        
    }

    displayComent(postId);


});






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