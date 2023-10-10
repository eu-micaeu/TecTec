import { iconsHover, sidebarModule } from './global.mjs';

let idUsuario;
let nickname;

async function varIdUsuarioPerfil() {
    try {
        const response = await fetch('/perfil-token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        idUsuario = data.usuario.id_usuario;
        nickname = data.usuario.nickname;;
    } catch (error) {
        console.error(error);
    }
}

varIdUsuarioPerfil().then(() => {
    
    displayFeedCarregar();
    update(nickname);
    displayFeed();
    
});



function update(nickname) {
    
    fetch('/perfil/' + nickname)
        .then(response => response.json())
        .then(data => {

            let nickname = data.usuario.nickname;
            let nomeElement = document.getElementById('nome');
            nomeElement.textContent = "@" + nickname;
            nomeElement.style.color = "#00891E";
            nomeElement.style.border = "2px solid white";
            nomeElement.style.borderRadius = "10px";
            nomeElement.style.padding = "10px";
            nomeElement.style.backgroundColor = "black";
            nomeElement.style.fontSize = "20px";
            nomeElement.style.width = "15vw";
            nomeElement.style.height = "4vh";
            nomeElement.style.textAlign = "center";            

            let tecnologia = data.usuario.tecnologia;
            
            let tecnologiaElement = document.getElementById('tecnologia');
            tecnologiaElement.textContent = "Tecnologia: " + tecnologia;
            tecnologiaElement.style.color = "#00891E";
            tecnologiaElement.style.border = "2px solid white";
            tecnologiaElement.style.borderRadius = "10px";
            tecnologiaElement.style.padding = "10px";
            tecnologiaElement.style.backgroundColor = "black";
            tecnologiaElement.style.fontSize = "20px";
            tecnologiaElement.style.width = "15vw";
            tecnologiaElement.style.height = "4vh";
            tecnologiaElement.style.textAlign = "center";

            let seguidores = data.usuario.seguidores;
            let seguidoresElement = document.getElementById('seguidores');
            seguidoresElement.textContent = "Seguidores: " + seguidores;
            seguidoresElement.style.color = "#00891E";
            seguidoresElement.style.border = "2px solid white";
            seguidoresElement.style.borderRadius = "10px";
            seguidoresElement.style.padding = "10px";
            seguidoresElement.style.backgroundColor = "black";
            seguidoresElement.style.fontSize = "20px";
            seguidoresElement.style.width = "15vw";
            seguidoresElement.style.height = "4vh";
            seguidoresElement.style.textAlign = "center";

            if (window.innerWidth <= 768) {
                nomeElement.style.width = "30vw";
                tecnologiaElement.style.width = "30vw";
                seguidoresElement.style.width = "30vw";
            }

        });
}

function displayFeedCarregar() {

    const loadingDiv = document.getElementById("loading");
    
    const contentDiv2 = document.getElementById("perfil-usuario");

    const contentDiv = document.getElementById("carrosel");

    loadingDiv.style.display = "block";

    contentDiv2.style.display = "none";

    contentDiv.style.display = "none";
    
    setTimeout(function () {

        loadingDiv.style.display = "none";

        contentDiv2.style.display = "block";

        contentDiv.style.display = "block";


    }, 1500);
}

function displayFeed() {

    fetch(`/contar_postagens/${idUsuario}`)
        .then(response => response.json())
        .then(data => {

            const numberOfFriends = data.quantidade_postagens;

            if (numberOfFriends === 0) {
                const carrossel = document.querySelector("#carrosel");

                const aviso = document.createElement("p");
                carrossel.appendChild(aviso);
                aviso.textContent = "Você não possui postagens :(";
                aviso.classList.add("centraliza");

                const p = document.createElement("p");
                carrossel.appendChild(p);
                p.textContent = "Aperte no botão para fazer postagem.";
                p.classList.add("centraliza");

            } else {
                fetch(`/postagens-curtidas/${idUsuario}`)
                    .then(response => response.json())
                    .then(data => {

                        const curtidasUsuario = data.postagens;

                        fetch('/postagens/' + nickname)
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
                                    nicknameElement.style.color = "white";
                                    nicknameElement.textContent = '@' + postagem.nickname;
                                    postElement.appendChild(nicknameElement);

                                    let textElement = document.createElement("p");
                                    textElement.classList.add("texto");
                                    textElement.textContent = postagem.texto;
                                    postElement.appendChild(textElement);

                                    let divEmbaixo = document.createElement("div");
                                    divEmbaixo.classList.add("centraliza");

                                    let comentarioImagem = document.createElement('img');

                                    comentarioImagem.src = '../static/images/comentario.png'
                                    comentarioImagem.width = 25;
                                    comentarioImagem.height = 25;
                                    comentarioImagem.style.cursor = 'pointer';

                                    comentarioImagem.addEventListener('mouseover', function () {
                                        comentarioImagem.src = '/static/images/comentariobranco.png';
                                    });
                                    comentarioImagem.addEventListener('mouseout', function () {
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

                                    let likeButton = document.createElement('img');
                                    likeButton.width = 20;
                                    likeButton.height = 20;
                                    likeButton.style.cursor = 'pointer';
                                    likeButton.dataset.postId = postagem.id_postagem;

                                    if (curtidasUsuario.some(curtida => curtida.id_postagem === postagem.id_postagem)) {
                                        likeButton.src = '/static/images/coracaofechado.png';
                                    } else {
                                        likeButton.src = '/static/images/coracao.png';
                                    }

                                    divEmbaixo.appendChild(likeButton);
                                    let curtidaQuantidade = document.createElement('p');
                                    curtidaQuantidade.textContent = postagem.curtidas;
                                    divEmbaixo.appendChild(curtidaQuantidade);

                                    likeButton.addEventListener('click', function () {
                                        const postId = likeButton.dataset.postId;
                                        const liked = likeButton.src.endsWith('coracaofechado.png');

                                        if (!liked) {
                                            fetch(`/curtir/` + idUsuario + '/' + postId, {
                                                method: 'POST',
                                            })
                                                .then(response => {
                                                    if (response.status === 200) {
                                                        likeButton.src = '/static/images/coracaofechado.png';


                                                        postagem.curtidas++;
                                                        curtidaQuantidade.textContent = postagem.curtidas;
                                                    }
                                                })
                                                .catch(error => {
                                                    console.error('Error liking post:', error);
                                                });
                                        } else {
                                            fetch(`/descurtir/` + idUsuario + '/' + postId, {
                                                method: 'DELETE',
                                            })
                                                .then(response => {
                                                    if (response.status === 200) {
                                                        likeButton.src = '/static/images/coracao.png';

                                                        postagem.curtidas--;
                                                        curtidaQuantidade.textContent = postagem.curtidas;
                                                    }
                                                })
                                                .catch(error => {
                                                    console.error('Error disliking post:', error);
                                                });
                                        }
                                    });

                                    let imageElement = document.createElement("img");
                                    imageElement.src = "/static/images/lixo.png";
                                    imageElement.style.width = "25px";
                                    imageElement.style.height = "25px";
                                    imageElement.style.cursor = "pointer";
                                    imageElement.id = "lixo";

                                    imageElement.addEventListener('mouseover', function () {
                                        imageElement.src = '/static/images/lixobranco.png';
                                    });
                                    imageElement.addEventListener('mouseout', function () {
                                        imageElement.src = '/static/images/lixo.png';
                                    });

                                    imageElement.addEventListener("click", function () {

                                        let postId = postagem.id_postagem;

                                        fetch('/excluir-postagem/' + postId, {
                                            method: 'DELETE',
                                            headers: {
                                                'Authorization': token
                                            }
                                        })
                                            .then(response => response.json())
                                            .then(data => {
                                                displayFeed();
                                            });
                                    });

                                    divEmbaixo.appendChild(imageElement);

                                    postElement.appendChild(divEmbaixo);

                                    feedContainer.appendChild(postElement);


                                }
                            });
                    });
            }
        });
}

iconsHover();

var sidebar = sidebarModule();
document.getElementById("busca").addEventListener("click", sidebar.toggleSidebar);