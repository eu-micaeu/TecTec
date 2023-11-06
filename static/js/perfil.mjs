let idUsuario;

let nickname;

async function varIdUsuarioPerfil() {

    try {

        const resposta = await fetch('/perfil-token', {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json'

            },

        });

        const data = await resposta.json();

        idUsuario = data.usuario.id_usuario;

        nickname = data.usuario.nickname;;

    } catch (error) {

        console.error(error);

    }

}

varIdUsuarioPerfil().then(() => {

    update(nickname);

    mostrarFeed();

});

function update(nickname) {

    fetch('/perfil/' + nickname)

        .then(resposta => resposta.json())

        .then(data => {

            let nickname = data.usuario.nickname;

            let elementoNome = document.getElementById('nome');

            elementoNome.textContent = "Olá, " + nickname;

            let seguidores = data.usuario.seguidores;

            let rotSeguidores = document.getElementById('rotSeguidores');

            rotSeguidores.textContent = "Seguidores";

            let numSeguidores = document.getElementById('numSeguidores');

            numSeguidores.textContent = seguidores;

            let seguindo = data.usuario.seguindo;

            let rotSeguindo = document.getElementById('rotSeguindo');

            rotSeguindo.textContent = "Seguindo";

            let numSeguindo = document.getElementById('numSeguindo');

            numSeguindo.textContent = seguindo;

            let infos = document.getElementById('infos');

            infos.style.display = "flex";

        });

}

function mostrarFeed() {

    fetch(`postagens-curtidas/${idUsuario}`)

        .then(resposta => resposta.json())

        .then(data => {

            const curtidasUsuario = data.postagens;

            fetch('postagens/' + nickname)

                .then(resposta => resposta.json())

                .then(data => {

                    let postagens = data.postagens;

                    let conteinerFeed = document.querySelector("#feed");

                    conteinerFeed.innerHTML = "";

                    for (let i = 0; i < postagens.length; i++) {

                        let postagem = postagens[i];

                        let elementoPostagem = document.createElement("div");

                        elementoPostagem.classList.add("postagem");

                        let elementoNickname = document.createElement("span");

                        elementoNickname.style.color = "#00891E";

                        elementoNickname.textContent = '@' + postagem.nickname;

                        elementoPostagem.appendChild(elementoNickname);

                        let elementoTexto = document.createElement("p");

                        elementoTexto.textContent = postagem.texto;

                        elementoPostagem.appendChild(elementoTexto);

                        let divEmbaixo = document.createElement("div");

                        divEmbaixo.classList.add("centralizaOpcoesPostagem");

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

                        let btCurtida = document.createElement('img');

                        btCurtida.width = 20;

                        btCurtida.height = 20;

                        btCurtida.style.cursor = 'pointer';

                        btCurtida.dataset.postId = postagem.id_postagem;

                        if (curtidasUsuario.some(curtida => curtida.id_postagem === postagem.id_postagem)) {

                            btCurtida.src = '/static/images/coracaofechado.png';

                        } else {

                            btCurtida.src = '/static/images/coracao.png';

                        }

                        divEmbaixo.appendChild(btCurtida);

                        let curtidaQuantidade = document.createElement('p');

                        curtidaQuantidade.textContent = postagem.curtidas;

                        divEmbaixo.appendChild(curtidaQuantidade);

                        btCurtida.addEventListener('click', function () {

                            const postId = btCurtida.dataset.postId;

                            const curtido = btCurtida.src.endsWith('coracaofechado.png');

                            if (!curtido) {

                                fetch(`/curtir/` + idUsuario + '/' + postId, {

                                    method: 'POST',

                                })
                                    .then(resposta => {

                                        if (resposta.status === 200) {

                                            btCurtida.src = '/static/images/coracaofechado.png';

                                            postagem.curtidas++;

                                            curtidaQuantidade.textContent = postagem.curtidas;

                                        }

                                    })

                            } else {

                                fetch(`/descurtir/` + idUsuario + '/' + postId, {

                                    method: 'DELETE',

                                })

                                    .then(resposta => {

                                        if (resposta.status === 200) {

                                            btCurtida.src = '/static/images/coracao.png';

                                            postagem.curtidas--;

                                            curtidaQuantidade.textContent = postagem.curtidas;

                                        }

                                    })

                            }

                            

                        });

                        let elementoImagem = document.createElement("img");

                        elementoImagem.src = "/static/images/lixo.png";

                        elementoImagem.style.width = "25px";

                        elementoImagem.style.height = "25px";

                        elementoImagem.id = "lixo";

                        elementoImagem.title = "Excluir postagem";

                        elementoImagem.style.cursor = "pointer";

                        elementoImagem.addEventListener('mouseover', function () {

                            elementoImagem.src = '/static/images/lixobranco.png';

                        });

                        elementoImagem.addEventListener('mouseout', function () {

                            elementoImagem.src = '/static/images/lixo.png';

                        });

                        elementoImagem.addEventListener("click", function () {

                            let postId = postagem.id_postagem;

                            fetch('/excluir-postagem/' + postId, {

                                method: 'DELETE',

                            })

                                .then(resposta => {

                                    if (resposta.status === 200) {

                                        mostrarFeed();

                                    }
                                })

                        });


                        divEmbaixo.appendChild(elementoImagem);

                        elementoPostagem.appendChild(divEmbaixo);

                        conteinerFeed.appendChild(elementoPostagem);

                    }
                });
        });
}

// Importação de funções do global.mjs 

import { iconeSelecionado } from './global.mjs';

iconeSelecionado();


