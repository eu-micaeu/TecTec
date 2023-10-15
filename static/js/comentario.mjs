// Função que serve para resgatar o posId da URL
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

        const resposta = await fetch('/perfil-token/', { // Constante para armazenar o resultado da requisição

            method: 'POST', // Método http da requisição

            headers: { // Definindo cabeçalho da requisição

                'Content-Type': 'application/json' // Corpo da requisição será no formato JSON

            },
        });

        const data = await resposta.json(); // Resposta JSON
        
        nickname = data.usuario.nickname; //Variável nickname
        
        id_usuario = data.usuario.id_usuario; //Variável id_usuario 
        
        document.querySelector("#botaoComentario").addEventListener("click", async () => {

            const texto = document.querySelector("#inputComentario").value;

            const resposta = await fetch("/comentar/" + postId, {
        
                method: "POST",
        
                body: JSON.stringify({ texto, id_usuario })
        
            });

            const data = await resposta.json();

            if (data.message === "Comentário criada com sucesso!") {
            
                alert("Comentário feito!");
            
                window.location.reload(true);
            
            } else {
            
                alert("Erro ao criar o comentário!");
            
            }
        });

    } catch (error) {/*Caso ocorra erro na execução dos comandos */
       
        console.error(error);
    }
}

/* Função para mostrar postagem*/
async function mostrarPostagem(postId) {

    try {

        const resposta = await fetch('/postagem/' + postId);/* Constante para armazenar o resultado da requisição*/

        const data = await resposta.json(); /* Função para mostrar postagem*/
        
        console.log(data);

        let postagem = data.postagem;

        let conteinerPostagem = document.querySelector("#postagem-principal");
        
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

        fetch(`/postagens-curtidas/${id_usuario}`)
            .then(resposta => resposta.json())
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
                
                        fetch(`/curtir/` + id_usuario + '/' + postId, {
                
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
                        fetch(`/descurtir/` + id_usuario + '/' + postId, {

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
            
            })

        conteinerPostagem.appendChild(elementoPostagem);

        
        mostrarComentarios(postId);
    } catch (error) {
        
        console.error(error);
    
    }

}

async function mostrarComentarios(postId) {
    try {
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
    } catch (error) {
      
        console.error(error);
    
    }
}

varIdUsuario().then(() => {
   
    mostrarPostagem(postId);

});

import { iconeSelecionado } from './global.mjs';

iconeSelecionado();