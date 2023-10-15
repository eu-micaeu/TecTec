// Importação de funções do global.mjs 

import { iconeSelecionado, configureDialog} from './global.mjs';

iconeSelecionado();

configureDialog("busca", "myDialog", "overlay", "closeDialog");

//Declaração de variáveis
let nickname;
let idUsuario;
let idUsuarioSeguindo;

/* Função que extrai valor de um parâmetro de consulta da URL */
function pegarParametroPeloNome(name, url = window.location.href) {
    // Substituir os colchetes para criar uma expressão regular
    name = name.replace(/[\[\]]/g, '\\$&');

    // Cria uma expressão regular para procurar o parâmetro na URL.
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');

    // A expressão regular é executada na URL e armazena o resultado
    var resultados = regex.exec(url);

    // Retorna nulo caso não tenha resultado
    if (!resultados) return null;

    // Retorna string vazia
    if (!resultados[2]) return '';

    return decodeURIComponent(resultados[2].replace(/\+/g, ' '));

}

nickname = pegarParametroPeloNome('nickname');

//Função que irá atualizar os seguidores do perfil visitado */
function updateAmizades(nickname) {
    // Variável para armazenar o nickname
    let name = nickname;

    // Solicitação GET para a URL '/perfil/' + name 
    fetch('/perfil/' + name)

        .then(resposta => resposta.json()) // Converte a resposta em JSON.

        .then(data => {
            // Obter número de seguidores
            let seguidores = data.usuario.seguidores;

            // Obter HTML pelo id 'seguidores'
            let elementoNome = document.getElementById('seguidores');

            // Atualiza o conteúdo do elemento para exibir o número de seguidores.
            elementoNome.textContent = "Seguidores: " + seguidores;

            // Ajustar largura para tela menor que 768px
            if (window.innerWidth <= 768) {

                elementoNome.style.width = "30vw";
                
            }
        });
}

// Fazer solicitações ao servidor e recuperar dados relacionado ao perfil 
async function varIdUsuario() {
    //Obter informações - GET
    try {
        // Para solicitação GET para a URL '/perfil/' 
        const resposta = await fetch('/perfil/' + nickname, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
      
        // Armazena a resposta json na variável data
        const data = await resposta.json();
      
        // A variável irá armazenar o valor 'nickname' 
        nickname = data.usuario.nickname;
      
        // A variável irá armazenar o valor 'id_usuario' 
        idUsuarioSeguindo = data.usuario.id_usuario;
    
    } catch (error) {
        // Exiber erro no console
        console.error(error);
    }

    //Atualizar variáveis com os valores obtidos - POST
    try {
        // Para POST para a URL '/perfil-token/'.
        const resposta = await fetch('/perfil-token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
      
        // Armazena a resposta json na variável data 
        const data = await resposta.json();
      
        // A variável irá armazenar o valor 'id_usuario' 
        idUsuario = data.usuario.id_usuario;
    
    } catch (error) {
        // Em caso de erro, exibe o erro no console.
        console.error(error);
    }
}


/*Se varIdUsuario for solcitado de forma correta, então a outra função será executada */
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
                                btCurtida.src = '/static/images/coracaofechado.png'; // Postagem curtida
                            } else {
                                btCurtida.src = '/static/images/coracao.png'; // Postagem não curtida
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
        let name = nickname;
        fetch('/perfil/' + name)
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

        // Função assíncrona para seguir ou deixar de seguir um usuário.
    async function seguir(idUsuario, idUsuarioSeguindo) {
        // Faz uma solicitação POST para verificar a existência de uma amizade.
        const resposta = await fetch("/verificar_amizade", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_usuario: idUsuario, id_usuario_seguindo: idUsuarioSeguindo })
        });

        // Verifica se a solicitação foi bem-sucedida.
        if (resposta.ok) {
            // Analisa a resposta como JSON.
            const data = await resposta.json();

            // Desfazer amizade, caso exista
            if (data.amizade_existe) {
                const resposta = await fetch("/desfazer_amizade", {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id_usuario: idUsuario, id_usuario_seguindo: idUsuarioSeguindo })
                });

                // Atualizar botão, ao desfazer a amizade
                if (resposta.ok) {
                    btSeguir.textContent = "Seguir";
                    updateAmizades(nickname);
                }
            } else {
                // Criar amizade, caso não exista
                const resposta = await fetch("/criar_amizade", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id_usuario: idUsuario, id_usuario_seguindo: idUsuarioSeguindo })
                });

                // Atualizar o botão de seguir, ao seguir
                if (resposta.ok) {
                    btSeguir.textContent = "Seguindo";
                    updateAmizades(nickname);
                }
            }
        }
    }

    btSeguir.addEventListener("click", () => {
        // Chamar função seguir
        seguir(idUsuario, idUsuarioSeguindo);
    });


})