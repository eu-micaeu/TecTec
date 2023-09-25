let nickname;

let idUsuario;
let idUsuarioSeguindo;

const token = localStorage.getItem("token").toString();

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

nickname = getParameterByName('nickname');

function updateAmizades(nickname){
    let name = nickname;
    fetch('/perfil/' + name, {
        headers: {
            'Authorization': token
        }
    })
        .then(response => response.json())
        .then(data =>{
            let seguidores = data.usuario.seguidores;
            let nameElement = document.getElementById('seguidores');
            nameElement.textContent = "Seguidores: " + seguidores;
        })
}

async function varIdUsuario() {
    try {
        const response = await fetch('/perfil/' + nickname, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        const data = await response.json();
        nickname = data.usuario.nickname;
        idUsuarioSeguindo = data.usuario.id_usuario;
    } catch (error) {
        console.error(error);
    }

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

    function displayFeed() {
        fetch(`/postagens-curtidas/${idUsuario}`, {
            headers: {
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(data => {

                const curtidasUsuario = data.postagens;

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
                            nicknameElement.style.cursor = "pointer";

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
                                likeButton.src = '/static/images/coracaofechado.png'; // Postagem curtida
                            } else {
                                likeButton.src = '/static/images/coracao.png'; // Postagem não curtida
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

                            postElement.appendChild(divEmbaixo);

                            feedContainer.appendChild(postElement);

                        }
                    });
            })
    }

    function updateNome(nickname) {
        let name = nickname;
        fetch('/perfil/' + name, {
            headers: {
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(data => {
                let nickname = data.usuario.nickname;
                let nameElement = document.getElementById('nome');
                nameElement.textContent = "@" + nickname;
            });
    }

    function updateTecnologia(nickname) {
        let name = nickname;
        fetch('/perfil/' + name, {
            headers: {
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(data => {
                let tecnologia = data.usuario.tecnologia;
                let nameElement = document.getElementById('tecnologia');
                nameElement.textContent = "Tecnologia: " + tecnologia;
            });
    }

    updateNome(nickname);
    updateTecnologia(nickname);
    updateAmizades(nickname);
    displayFeed();

});

varIdUsuario().then(async () => {

    const seguirBotao = document.getElementById("seguir");
    const response = await fetch("/verificar_amizade", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_usuario: idUsuario, id_usuario_seguindo: idUsuarioSeguindo })
    });

    if (response.ok) {
        const data = await response.json();

        if (data.amizade_existe) {
            seguirBotao.textContent = "Seguindo";
        } else {
            seguirBotao.textContent = "Seguir";
        }
    }

    async function seguir(idUsuario, idUsuarioSeguindo) {
        const response = await fetch("/verificar_amizade", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_usuario: idUsuario, id_usuario_seguindo: idUsuarioSeguindo })
        });

        if (response.ok) {
            const data = await response.json();

            if (data.amizade_existe) {
                const response = await fetch("/desfazer_amizade", {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id_usuario: idUsuario, id_usuario_seguindo: idUsuarioSeguindo })
                });

                if (response.ok) {
                    seguirBotao.textContent = "Seguir";
                    updateAmizades(nickname);
                }
            } else {
                const response = await fetch("/criar_amizade", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id_usuario: idUsuario, id_usuario_seguindo: idUsuarioSeguindo })
                });

                if (response.ok) {
                    seguirBotao.textContent = "Seguindo";
                    updateAmizades(nickname);
                }
            }
        }
    }

    seguirBotao.addEventListener("click", () => {
        seguir(idUsuario, idUsuarioSeguindo);
    });

})

import { iconsHover, sidebarModule } from './global.mjs';

iconsHover();

var sidebar = sidebarModule();
document.getElementById("busca").addEventListener("click", sidebar.toggleSidebar);