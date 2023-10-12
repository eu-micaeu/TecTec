let nickname;

let idUsuario;
let idUsuarioSeguindo;

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

nickname = getParameterByName('nickname');

function updateAmizades(nickname) {
    let name = nickname;
    fetch('/perfil/' + name)
        .then(response => response.json())
        .then(data => {
            let seguidores = data.usuario.seguidores;
            let nameElement = document.getElementById('seguidores');
            nameElement.textContent = "Seguidores: " + seguidores;
            nameElement.style.color = "#00891E";
            nameElement.style.border = "2px solid white";
            nameElement.style.borderRadius = "10px";
            nameElement.style.padding = "10px";
            nameElement.style.backgroundColor = "black";
            nameElement.style.fontSize = "20px";
            nameElement.style.width = "15vw";
            nameElement.style.textAlign = "center";

            if (window.innerWidth <= 768) {
                nameElement.style.width = "30vw";
            }

        })
}

async function varIdUsuario() {
    try {
        const response = await fetch('/perfil/' + nickname, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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
        });
        const data = await response.json();
        idUsuario = data.usuario.id_usuario;
    } catch (error) {
        console.error(error);
    }
}

varIdUsuario().then(() => {

    function displayFeed() {
        fetch(`/postagens-curtidas/${idUsuario}`)
            .then(response => response.json())
            .then(data => {

                const curtidasUsuario = data.postagens;

                fetch('/postagens/' + nickname)
                    .then(response => response.json())
                    .then(data => {
                        let postagens = data.postagens;
                        let feedContainer = document.querySelector("#feed");
                        feedContainer.innerHTML = "";
                        for (let i = 0; i < postagens.length; i++) {
                            let postagem = postagens[i];
                            let postElement = document.createElement("div");
                            postElement.classList.add("postagem");

                            let nicknameElement = document.createElement("span");
                            nicknameElement.style.color = "white";
                            nicknameElement.textContent = '@' + postagem.nickname;
                            postElement.appendChild(nicknameElement);

                            let textElement = document.createElement("p");
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

    function update(nickname) {
        let name = nickname;
        fetch('/perfil/' + name)
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
                seguidoresElement.style.width = "";
                seguidoresElement.style.textAlign = "center";

                let seguindo = data.usuario.seguindo;
                let seguindoElement = document.getElementById('seguindo');
                seguindoElement.textContent = "Seguindo: " + seguindo;
                seguindoElement.style.color = "#00891E";
                seguindoElement.style.border = "2px solid white";
                seguindoElement.style.borderRadius = "10px";
                seguindoElement.style.padding = "10px";
                seguindoElement.style.backgroundColor = "black";
                seguindoElement.style.fontSize = "20px";
                seguindoElement.style.width = "";
                seguindoElement.style.textAlign = "center";

                if (window.innerWidth <= 768) {
                    nomeElement.style.width = "30vw";
                    tecnologiaElement.style.width = "30vw";
                    seguidoresElement.style.width = "30vw";
                    seguindoElement.style.width = "30vw";
                }
            });
    }

    update(nickname);
    displayFeed();

});

varIdUsuario().then(async () => {

    const seguirBotao = document.getElementById("seguir");
    seguirBotao.style.color = "#00891E";
    seguirBotao.style.border = "2px solid #00891E";
    seguirBotao.style.borderRadius = "10px";
    seguirBotao.style.padding = "10px";
    seguirBotao.style.backgroundColor = "black";
    seguirBotao.style.fontSize = "20px";
    seguirBotao.style.width = "10vw";
    seguirBotao.style.textAlign = "center";
    seguirBotao.style.cursor = "pointer";
    seguirBotao.style.fontFamily = "monospace";

    if (window.innerWidth <= 768) {
        seguirBotao.style.width = "30vw";
    }

    seguirBotao.addEventListener('mouseover', function () {
        seguirBotao.style.backgroundColor = "white";
    });
    seguirBotao.addEventListener('mouseout', function () {
        seguirBotao.style.backgroundColor = "black";
    });

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