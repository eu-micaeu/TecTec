function pegarParametroPeloNome(name, url = window.location.href) {

    name = name.replace(/[\[\]]/g, '\\$&');

    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),

        results = regex.exec(url);

    if (!results) return null;

    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, ' '));

}

let postId = pegarParametroPeloNome('postId');

let id_usuario;

async function varIdUsuario() {

    let nickname;

    try {

        const resposta = await fetch('/perfil-token/', {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json'

            },
        });

        const data = await resposta.json();

        nickname = data.usuario.nickname;

        id_usuario = data.usuario.id_usuario;

        document.querySelector("#botaoComentario").addEventListener("click", async () => {

            const texto = document.querySelector("#inserirComentario").value;

            const resposta = await fetch("/comentar/" + postId, {

                method: "POST",

                body: JSON.stringify({ texto, id_usuario })

            });

            const data = await resposta.json();

            if (data.message === "Comentário criada com sucesso!") {

                var toastCerto = document.getElementById("toastCerto");

                toastCerto.style.display = "block";

                setTimeout(function () {

                    toastCerto.style.display = "none";

                    document.getElementById('inserirPostagem').value = "";



                }, 2000);

                setTimeout(function () {

                    window.location.reload(true);

                }, 1000);

                

            } else {

                alert("Erro ao criar o comentário!");

            }
        });

    } catch (error) {

        console.error(error);

    }

}

let conteinerPostagem = document.querySelector("#postagem-principal");

async function mostrarPostagem(postId) {

    const resposta = await fetch('/postagem/' + postId);

    const data = await resposta.json();

    console.log(data);

    let postagem = data.postagem;

    conteinerPostagem.innerHTML = "";

    let elementoPostagem = document.createElement("div");

    elementoPostagem.classList.add("cartao");

    let elementoNickname = document.createElement("span");

    elementoNickname.style.color = "white";

    elementoNickname.textContent = '@' + postagem.nickname;

    elementoPostagem.appendChild(elementoNickname);

    let elementoTexto = document.createElement("p");

    elementoTexto.classList.add("texto");

    elementoTexto.textContent = postagem.texto;

    elementoPostagem.appendChild(elementoTexto);

    conteinerPostagem.appendChild(elementoPostagem);

    mostrarComentarios(postId);

}

async function mostrarComentarios(postId) {

    const resposta = await fetch('/comentarios/' + postId);

    const data = await resposta.json();

    let comentarios = data.comentarios;

    let conteinerComentarios = document.querySelector("#postagem-principal");

    comentarios.forEach(comentario => {

        let elementoComentario = document.createElement("div");

        elementoComentario.classList.add("cartaoComen");

        let elementoNickname = document.createElement("span");

        elementoNickname.style.color = "green";

        elementoNickname.textContent = '@' + comentario.nickname;

        elementoComentario.appendChild(elementoNickname);

        let elementoTexto = document.createElement("p");

        elementoTexto.textContent = comentario.texto;

        elementoComentario.appendChild(elementoTexto);

        conteinerComentarios.appendChild(elementoComentario);

    });

    conteinerPostagem.style.display = "block";

    document.querySelector("main").style.display = "flex";

    document.getElementById("comentar").style.display = "flex";

}

varIdUsuario().then(() => {

    mostrarPostagem(postId);

});

import { iconeSelecionado } from './global.mjs';

iconeSelecionado();
