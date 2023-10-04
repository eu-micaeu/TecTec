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

let id_usuario;

const token = localStorage.getItem("token").toString();

async function varIdUsuario() {
    let nickname;
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
        id_usuario = data.usuario.id_usuario;
        document.querySelector("#botaoComentario").addEventListener("click", async () => {

            const texto = document.querySelector("#inputComentario").value;

            const response = await fetch("/comentar/" + postId, {
                method: "POST",
                body: JSON.stringify({ texto, id_usuario })
            });

            const data = await response.json();

            if (data.message === "Comentário criada com sucesso!") {
                alert("Comentário feito!");
                window.location.reload(true);
            } else {
                alert("Erro ao criar o comentário!");
            }
        });
    } catch (error) {
        console.error(error);
    }
}

async function showPost(postId) {
    try {
        const response = await fetch('/postagem/' + postId, {
            headers: {
                'Authorization': token
            }
        });

        const data = await response.json();
        console.log(data);

        let postagem = data.postagem;

        let postagemContainer = document.querySelector("#postagem-principal");
        postagemContainer.innerHTML = "";

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

        fetch(`/postagens-curtidas/${id_usuario}`, {
            headers: {
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(data => {
                const curtidasUsuario = data.postagens;
                let divEmbaixo = document.createElement("div");
                divEmbaixo.classList.add("centraliza");

                let comentarioImagem = document.createElement('img');

                comentarioImagem.src = '../static/images/comentario.png'
                comentarioImagem.width = 18;
                comentarioImagem.height = 18;
                comentarioImagem.title = "Comentar";

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
                likeButton.width = 18;
                likeButton.height = 18;
                likeButton.style.cursor = 'pointer';
                likeButton.dataset.postId = postagem.id_postagem;
                likeButton.title = "Curtir";

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
                        fetch(`/curtir/` + id_usuario + '/' + postId, {
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
                        fetch(`/descurtir/` + id_usuario + '/' + postId, {
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

                let seguidorImagem = document.createElement('img');

                seguidorImagem.src = '../static/images/seguidor.png'
                seguidorImagem.width = 18;
                seguidorImagem.height = 18;
                seguidorImagem.title = 'Deixar de seguir';

                seguidorImagem.addEventListener('mouseover', function () {
                    seguidorImagem.src = '/static/images/seguidorbranco.png';
                });
                seguidorImagem.addEventListener('mouseout', function () {
                    seguidorImagem.src = '/static/images/seguidor.png';
                });

                seguidorImagem.addEventListener('click', async function () {
                    const response = await fetch(`/desfazer_amizade`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id_usuario: id_usuario,
                            id_usuario_seguindo: postagem.id_usuario
                        })
                    });

                    if (response.ok) {
                        displayFeed()
                    } else {
                        console.error('Erro ao desfazer amizade');
                    }
                });

                divEmbaixo.appendChild(seguidorImagem);


                postElement.appendChild(divEmbaixo);
            })

        postagemContainer.appendChild(postElement);

        showComments(postId);
    } catch (error) {
        console.error(error);
    }
}

async function showComments(postId) {
    try {
        const response = await fetch('/comentarios/' + postId);
        const data = await response.json();

        let comentarios = data.comentarios;

        let comentariosContainer = document.querySelector("#postagem-principal");

        comentarios.forEach(comentario => {
            let comentarioElement = document.createElement("div");
            comentarioElement.classList.add("cartaoComen");

            let nicknameElement = document.createElement("span");
            nicknameElement.style.color = "green";
            nicknameElement.textContent = '@' + comentario.nickname;
            comentarioElement.appendChild(nicknameElement);

            let textElement = document.createElement("p");
            textElement.textContent = comentario.texto;
            comentarioElement.appendChild(textElement);

            comentariosContainer.appendChild(comentarioElement);

        });
    } catch (error) {
        console.error(error);
    }
}

varIdUsuario().then(() => {
    showPost(postId);
});

import { iconsHover } from './global.mjs';

iconsHover();

var sidebarOpen = false;

document.getElementById("busca").addEventListener("click", function () {
    if (!sidebarOpen) {
        document.getElementById("mySidebar").style.width = "13vw";
        document.getElementById("mySidebar").style.borderColor = "white";
        document.getElementById("mySidebar").style.border = "2px";
        document.getElementById("mySidebar").style.borderStyle = "solid";
        sidebarOpen = true;
    } else {
        document.getElementById("mySidebar").style.width = "0";
        sidebarOpen = false;
    }
});