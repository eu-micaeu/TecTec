// Função que serve para resgatar o posId da URL
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

let postId = getParameterByName('postId');


let nickname;
const token = localStorage.getItem("token").toString();

async function varIdUsuario() {
    try {
        const response = await fetch('/perfil-token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token })
        });
        const data = await response.json();
        nickname = data.usuario.nickname;
    } catch (error) {
        console.error(error);
    }
}

varIdUsuario().then(() => {

    // Função que mostra/retorna a publicação
    function showPost(postId) {

        let name = nickname;
        fetch('/postagem/' + postId, {
            headers: {
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)

                let postagem = data.postagem;

                let postagemContainer = document.querySelector("#postagem-principal");
                postagemContainer.innerHTML = "";


                let postElement = document.createElement("div");
                postElement.classList.add("cartao");

                let nicknameElement = document.createElement("span");
                nicknameElement.classList.add("nameWhite");
                nicknameElement.textContent = '@' + data.postagem.nickname;
                postElement.appendChild(nicknameElement);

                let textElement = document.createElement("p");
                textElement.textContent = postagem.texto;
                postElement.appendChild(textElement);

                let imageContainer = document.createElement("div");
                imageContainer.classList.add("image-container");


                postagemContainer.appendChild(postElement);

            })
    }

    showPost(postId)
});

// Função que serve para comentar
document.querySelector("#botaoComentario").addEventListener("click", async () => {

    const texto = document.querySelector("#inputComentario").value;

    const response = await fetch("/comentar/" + postId, {
        method: "POST",
        body: JSON.stringify({ texto })
    });

    const data = await response.json();

    if (data.message === "Comentário criada com sucesso!") {
        alert("Comentário feito!");
    } else {
        alert("Erro ao criar o comentário!");
    }
});




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