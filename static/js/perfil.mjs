// Importação de funções do global.mjs 

import { iconeSelecionado, configureDialog} from './global.mjs';

iconeSelecionado();

configureDialog("busca", "myDialog", "overlay", "closeDialog");

let idUsuario;
let nickname;

async function varIdUsuarioPerfil() {

    try {

        const resposta = await fetch('/perfil-token/', {

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

            elementoNome.textContent = "@" + nickname;

            elementoNome.style.color = "#00891E";

            elementoNome.style.border = "2px solid white";

            elementoNome.style.borderRadius = "10px";

            elementoNome.style.padding = "20px";

            elementoNome.style.backgroundColor = "black";

            elementoNome.style.fontSize = "20px";

            elementoNome.style.textAlign = "center";            

            let tecnologia = data.usuario.tecnologia;
            
            let elementoTecnologia = document.getElementById('tecnologia');

            elementoTecnologia.textContent = "Tecnologia: " + tecnologia;

            elementoTecnologia.style.color = "#00891E";

            elementoTecnologia.style.border = "2px solid white";

            elementoTecnologia.style.borderRadius = "10px";

            elementoTecnologia.style.padding = "20px";
            
            elementoTecnologia.style.backgroundColor = "black";

            elementoTecnologia.style.fontSize = "20px";

            elementoTecnologia.style.textAlign = "center";

            let seguidores = data.usuario.seguidores;

            let elementoSeguidores = document.getElementById('seguidores');

            elementoSeguidores.textContent = "Seguidores: " + seguidores;

            elementoSeguidores.style.color = "#00891E";

            elementoSeguidores.style.border = "2px solid white";

            elementoSeguidores.style.borderRadius = "10px";

            elementoSeguidores.style.padding = "20px";

            elementoSeguidores.style.backgroundColor = "black";

            elementoSeguidores.style.fontSize = "20px";

            elementoSeguidores.style.textAlign = "center";
            
            let seguindo = data.usuario.seguindo;

            let elementoSeguindo = document.getElementById('seguindo');

            elementoSeguindo.textContent = "Seguindo: " + seguindo;

            elementoSeguindo.style.color = "#00891E";

            elementoSeguindo.style.border = "2px solid white";

            elementoSeguindo.style.borderRadius = "10px";

            elementoSeguindo.style.padding = "20px";

            elementoSeguindo.style.backgroundColor = "black";

            elementoSeguindo.style.fontSize = "20px";

            elementoSeguindo.style.textAlign = "center";

        });

}

function mostrarFeed() {

    fetch(`/contar_postagens/${idUsuario}`)

        .then(resposta => resposta.json())

        .then(data => {

            const numeroDeAmigos = data.quantidade_postagens;

            if (numeroDeAmigos === 0) {

                const carrossel = document.querySelector("#feed");

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

                                    let elementoImagem = document.createElement("img");
                                    elementoImagem.src = "/static/images/lixo.png";
                                    elementoImagem.style.width = "25px";
                                    elementoImagem.style.height = "25px";
                                    elementoImagem.style.cursor = "pointer";
                                    elementoImagem.id = "lixo";

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
                                        
                                        mostrarFeed();
                                    });

                                    divEmbaixo.appendChild(elementoImagem);

                                    elementoPostagem.appendChild(divEmbaixo);

                                    conteinerFeed.appendChild(elementoPostagem);


                                }
                            });
                    });
            }
        });
}
