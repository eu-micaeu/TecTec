const token = localStorage.getItem("token").toString();

let idUsuario;

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
        idUsuario = data.usuario.id_usuario;
    } catch (error) {
        console.error(error);
    }

}

varIdUsuario().then(() => {

    function openSidebar() {
        document.getElementById("mySidebar").style.width = "250px";
      }



    function displayFeed() {

        fetch(`/contar_amizades/${idUsuario}`)
            .then(response => response.json())
            .then(data => {

                const numberOfFriends = data.quantidade_amizades;

                if (numberOfFriends === 0) {
                    const carrossel = document.querySelector("#carrosel");

                    const aviso = document.createElement("p");
                    carrossel.appendChild(aviso);
                    aviso.textContent = "Você não segue ninguém :(";
                    aviso.classList.add("centraliza");

                    const p = document.createElement("p");
                    carrossel.appendChild(p);
                    p.textContent = "Aperte na lupa para buscar alguém.";
                    p.classList.add("centraliza");

                } else {
                    fetch(`/postagens-curtidas/${idUsuario}`, {
                        headers: {
                            'Authorization': token
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            const curtidasUsuario = data.postagens;

                            fetch('/feed/' + idUsuario, {
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

                                        nicknameElement.addEventListener("click", function () {
                                            window.location.href = '/perfil-visitado?nickname=' + postagem.nickname;
                                        });


                                        let textElement = document.createElement("p");
                                        textElement.classList.add("texto");
                                        textElement.textContent = postagem.texto;
                                        postElement.appendChild(textElement);

                                        let divEmbaixo = document.createElement("div");
                                        divEmbaixo.classList.add("centraliza");

                                        let comentarioImagem = document.createElement('img');

                                        comentarioImagem.src = '../static/images/comentario.png'
                                        comentarioImagem.width = 18;
                                        comentarioImagem.height = 18;

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
                                                    id_usuario: idUsuario,
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

                                        feedContainer.appendChild(postElement);
                                    }
                                });
                        })
                }

            })
    }

    displayFeed()

})

var sidebarOpen = false;

document.getElementById("busca").addEventListener("click", function() {
  if (!sidebarOpen) {
    document.getElementById("mySidebar").style.width = "13vw";
    document.getElementById("mySidebar").style.borderColor = "white";
    document.getElementById("mySidebar").style.border= "2px";
    document.getElementById("mySidebar").style.borderStyle= "solid";
    sidebarOpen = true;
  } else {
    document.getElementById("mySidebar").style.width = "0";
    sidebarOpen = false;
  }
});

import { iconsHover } from './global.mjs';

iconsHover();
