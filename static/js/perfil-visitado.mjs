let nickname;

let idUsuario;

let idUsuarioSeguindo;

function pegarParametroPeloNome(name, url = window.location.href) {

    name = name.replace(/[\[\]]/g, '\\$&');

    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');

    var resultados = regex.exec(url);

    if (!resultados) return null;

    if (!resultados[2]) return '';

    return decodeURIComponent(resultados[2].replace(/\+/g, ' '));

}

nickname = pegarParametroPeloNome('nickname');

function updateAmizades(nickname) {

    let name = nickname;

    fetch('/perfil/' + name)

        .then(resposta => resposta.json())

        .then(data => {

            let seguidores = data.usuario.seguidores;


            let elementoNome = document.getElementById('seguidores');


            elementoNome.textContent = "Seguidores: " + seguidores;


            if (window.innerWidth <= 768) {

                elementoNome.style.width = "30vw";

            }

        });

}

async function varIdUsuario() {

    try {

        const resposta = await fetch('/perfil/' + nickname, {

            method: 'GET',

            headers: {

                'Content-Type': 'application/json',

            },

        });

        const data = await resposta.json();

        nickname = data.usuario.nickname;

        idUsuarioSeguindo = data.usuario.id_usuario;

    } catch (error) {

        console.error(error);

    }

    try {

        const resposta = await fetch('/perfil-token/', {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json'

            },

        });

        const data = await resposta.json();

        idUsuario = data.usuario.id_usuario;

    } catch (error) {

        console.error(error);

    }

}

varIdUsuario().then(() => {

    function mostrarFeed() {

        fetch(`/postagens-curtidas/${idUsuario}`)

            .then(resposta => resposta.json())

            .then(data => {

                const curtidasUsuario = data.postagens;

                fetch('/postagens/' + nickname)

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

                            let elementoTexto = document.createElement("p");

                            elementoTexto.textContent = postagem.texto;

                            elementoPostagem.appendChild(elementoTexto);

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

                            elementoPostagem.appendChild(divEmbaixo);

                            conteinerFeed.appendChild(elementoPostagem);

                        }

                    });

            })

    }

    function update(nickname) {

        fetch('/perfil/' + nickname)
            .then(resposta => resposta.json())
            .then(data => {
    
                let nickname = data.usuario.nickname;
    
                let elementoNome = document.getElementById('nome');
    
                elementoNome.textContent = "@" + nickname;
    
                elementoNome.style.color = "#00891E";
    
                elementoNome.style.padding = "0 20px";
    
                elementoNome.style.backgroundColor = "black";
    
                elementoNome.style.fontSize = "25px";
    
                elementoNome.style.textAlign = "center";
    
                let seguidores = data.usuario.seguidores;
    
                let elementoSeguidores = document.getElementById('seguidores');
    
                elementoSeguidores.textContent = "Seguidores: " + seguidores;
    
                elementoSeguidores.style.color = "#00891E";
    
                elementoSeguidores.style.padding = "0 20px";
    
                elementoSeguidores.style.backgroundColor = "black";
    
                elementoSeguidores.style.fontSize = "20px";
    
                elementoSeguidores.style.textAlign = "center";
    
                let seguindo = data.usuario.seguindo;
    
                let elementoSeguindo = document.getElementById('seguindo');
    
                elementoSeguindo.textContent = "Seguindo: " + seguindo;
    
                elementoSeguindo.style.color = "#00891E";
    
                elementoSeguindo.style.padding = "0 20px";
    
                elementoSeguindo.style.backgroundColor = "black";
    
                elementoSeguindo.style.fontSize = "20px";
    
                elementoSeguindo.style.textAlign = "center";
    
                let blocoPerfil = document.getElementById('perfil-usuario');
    
                blocoPerfil.style.display = "block";
    
            });
    
    }

    update(nickname);

    mostrarFeed();

});

varIdUsuario().then(async () => {

    const btSeguir = document.getElementById("seguir");

    btSeguir.style.color = "#00891E";

    btSeguir.style.border = "2px solid #00891E";

    btSeguir.style.borderRadius = "10px";

    btSeguir.style.padding = "10px";

    btSeguir.style.backgroundColor = "black";

    btSeguir.style.fontSize = "20px";

    btSeguir.style.textAlign = "center";

    btSeguir.style.cursor = "pointer";

    btSeguir.style.fontFamily = "monospace";

    if (window.innerWidth <= 768) {

        btSeguir.style.width = "30vw";

    }

    btSeguir.addEventListener('mouseover', function () {

        btSeguir.style.backgroundColor = "white";

    });

    btSeguir.addEventListener('mouseout', function () {

        btSeguir.style.backgroundColor = "black";

    });

    const resposta = await fetch("/verificar_amizade", {

        method: "POST",

        headers: {

            'Content-Type': 'application/json'

        },

        body: JSON.stringify({ id_usuario: idUsuario, id_usuario_seguindo: idUsuarioSeguindo })

    });

    if (resposta.ok) {

        const data = await resposta.json();

        if (data.amizade_existe) {
            btSeguir.textContent = "Seguindo";
        } else {
            btSeguir.textContent = "Seguir";
        }
    }

    async function seguir(idUsuario, idUsuarioSeguindo) {

        const resposta = await fetch("/verificar_amizade", {

            method: "POST",

            headers: {

                'Content-Type': 'application/json'

            },

            body: JSON.stringify({ id_usuario: idUsuario, id_usuario_seguindo: idUsuarioSeguindo })

        });

        if (resposta.ok) {

            const data = await resposta.json();

            if (data.amizade_existe) {

                const resposta = await fetch("/desfazer_amizade", {

                    method: "DELETE",

                    headers: {

                        'Content-Type': 'application/json'

                    },
                    body: JSON.stringify({ id_usuario: idUsuario, id_usuario_seguindo: idUsuarioSeguindo })

                });

                if (resposta.ok) {

                    btSeguir.textContent = "Seguir";

                    updateAmizades(nickname);

                }

            } else {

                const resposta = await fetch("/criar_amizade", {

                    method: "POST",

                    headers: {

                        'Content-Type': 'application/json'

                    },

                    body: JSON.stringify({ id_usuario: idUsuario, id_usuario_seguindo: idUsuarioSeguindo })

                });
                
                if (resposta.ok) {

                    btSeguir.textContent = "Seguindo";

                    updateAmizades(nickname);

                }

            }

        }

    }

    btSeguir.addEventListener("click", () => {

        seguir(idUsuario, idUsuarioSeguindo);
        
    });

})

import { iconeSelecionado, configureDialog } from './global.mjs';

iconeSelecionado();

configureDialog("busca", "myDialog", "overlay", "closeDialog");