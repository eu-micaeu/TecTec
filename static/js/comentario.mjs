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
        nicknameElement.classList.add("nameWhite");
        nicknameElement.textContent = '@' + postagem.nickname;
        postElement.appendChild(nicknameElement);

        let textElement = document.createElement("p");
        textElement.textContent = postagem.texto;
        postElement.appendChild(textElement);

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
            nicknameElement.classList.add("nameGreen");
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