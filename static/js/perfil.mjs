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


    function update(nickname) {
        let name = nickname;
        fetch('/perfil/' + name)
            .then(response => response.json())
            .then(data => {
                let nickname = data.usuario.nickname;
                let nameElement = document.getElementById('nome');
                nameElement.textContent = "@" + nickname;
                nameElement.style.color = "white";
                nameElement.style.border = "2px solid white";
                nameElement.style.borderRadius = "10px";
                nameElement.style.padding = "10px";
                nameElement.style.backgroundColor = "black";
                nameElement.style.fontSize = "20px";
                nameElement.style.width = "10vw";
                nameElement.style.textAlign = "center";
                let tecnologia = data.usuario.tecnologia;
                nameElement = document.getElementById('tecnologia');
                nameElement.textContent = "Tecnologia: " + tecnologia;
                nameElement.style.color = "white";
                nameElement.style.border = "2px solid white";
                nameElement.style.borderRadius = "10px";
                nameElement.style.padding = "10px";
                nameElement.style.backgroundColor = "black";
                nameElement.style.fontSize = "16px";
                nameElement.style.width = "10vw";
                nameElement.style.textAlign = "center";
                let seguidores = data.usuario.seguidores;
                nameElement = document.getElementById('seguidores');
                nameElement.textContent = "Seguidores: " + seguidores;
                nameElement.style.color = "white";
                nameElement.style.border = "2px solid white";
                nameElement.style.borderRadius = "10px";
                nameElement.style.padding = "10px";
                nameElement.style.backgroundColor = "black";
                nameElement.style.fontSize = "20px";
                nameElement.style.width = "10vw";
                nameElement.style.textAlign = "center";
            });
    }

    displayFeedCarregar();
    update(nickname);
    displayFeed();
    

});

function displayFeedCarregar() {

    const loadingDiv = document.getElementById("loading");
    const contentDiv = document.getElementById("carrosel");
    const contentDiv2 = document.getElementById("perfil-usuario");


    loadingDiv.style.display = "block";
    contentDiv.style.display = "none";
    contentDiv2.style.display = "none";

    setTimeout(function () {
        loadingDiv.style.display = "none";
        contentDiv.style.display = "block";
        contentDiv2.style.display = "block";
    }, 1500);
}

iconsHover();

var sidebar = sidebarModule();
document.getElementById("busca").addEventListener("click", sidebar.toggleSidebar);