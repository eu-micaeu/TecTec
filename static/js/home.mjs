
let idUsuario;

async function varIdUsuarioHome() {

    try {

        const resposta = await fetch('/perfil-token', {
            
            method: 'POST',

            headers: { 'Content-Type': 'application/json' },

        });

        const data = await resposta.json();

        idUsuario = data.usuario.id_usuario;

    } catch (error) {

        console.error(error);

    }

    return idUsuario;

}

varIdUsuarioHome().then(idUsuario => {

    mostrarFeed(idUsuario)

})

function mostrarFeed(idUsuario) {

    fetch(`/contar_amizades/${idUsuario}`)

        .then(resposta => resposta.json())

        .then(data => {

            const numeroDeAmigos = data.quantidade_amizades;

            if (numeroDeAmigos === 0) {

                const carrossel = document.querySelector("#feed");

                const aviso = document.createElement("p");

                carrossel.appendChild(aviso);

                aviso.textContent = "Você não segue ninguém :(";

                aviso.classList.add("centraliza");

                const p = document.createElement("p");

                carrossel.appendChild(p);

                p.textContent = "Aperte na lupa para buscar alguém.";

                p.classList.add("centraliza");

            } else {

                fetch(`/postagens-curtidas/${idUsuario}`)

                    .then(resposta => resposta.json())

                    .then(data => {

                        const curtidasUsuario = data.postagens;

                        fetch('/feed/' + idUsuario)

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

                                    elementoNickname.style.color = "white"; 

                                    elementoNickname.textContent = '@' + postagem.nickname;

                                    elementoPostagem.appendChild(elementoNickname);

                                    elementoNickname.style.cursor = "pointer";

                                    elementoNickname.addEventListener("click", function () {

                                        window.location.href = '/perfil-visitado?nickname=' + postagem.nickname;

                                    });

                                    let elementoTexto = document.createElement("p");

                                    elementoTexto.textContent = postagem.texto;

                                    elementoPostagem.appendChild(elementoTexto);

                                    let divEmbaixo = document.createElement("div");

                                    divEmbaixo.classList.add("centralizaOpcoesPostagem");

                                    let comentarioImagem = document.createElement('img');

                                    comentarioImagem.src = '../static/images/comentario.png'

                                    comentarioImagem.width = 18;

                                    comentarioImagem.height = 18;

                                    comentarioImagem.title = "Comentar";

                                    comentarioImagem.style.cursor = "pointer";

                                    comentarioImagem.addEventListener('mouseover', function () {

                                        comentarioImagem.src = '/static/images/comentariobranco.png';

                                    });
                                    
                                    comentarioImagem.addEventListener('mouseout', function (

                                    ) {

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

                                    btCurtida.width = 18;

                                    btCurtida.height = 18;

                                    btCurtida.style.cursor = 'pointer';

                                    btCurtida.dataset.postId = postagem.id_postagem;

                                    btCurtida.title = "Curtir";

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
                                                .catch(error => {
                                                    console.error('Error liking post:', error);
                                                });
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

                                    seguidorImagem.style.cursor = "pointer";

                                    seguidorImagem.addEventListener('mouseover', function () {

                                        seguidorImagem.src = '/static/images/seguidorbranco.png';

                                    });
                                    seguidorImagem.addEventListener('mouseout', function () {

                                        seguidorImagem.src = '/static/images/seguidor.png';

                                    });

                                    seguidorImagem.addEventListener('click', async function () {

                                        const resposta = await fetch(`/desfazer_amizade`, {

                                            method: 'DELETE',

                                            headers: {

                                                'Content-Type': 'application/json'

                                            },

                                            body: JSON.stringify({

                                                id_usuario: idUsuario,

                                                id_usuario_seguindo: postagem.id_usuario

                                            })

                                        });

                                        if (resposta.ok) {

                                            mostrarFeed()

                                        } else {

                                            console.error('Erro ao desfazer amizade');

                                        }

                                    });

                                    divEmbaixo.appendChild(seguidorImagem);


                                    elementoPostagem.appendChild(divEmbaixo);

                                    conteinerFeed.appendChild(elementoPostagem);
                                }
                            });
                    })
            }

        })
}

import { iconeSelecionado, configureDialog} from './global.mjs';

iconeSelecionado();

configureDialog("busca", "myDialog", "overlay", "closeDialog");

