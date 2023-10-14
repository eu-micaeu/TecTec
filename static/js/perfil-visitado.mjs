//Declaração de variáveis
let nickname;
let idUsuario;
let idUsuarioSeguindo;

/* Função que extrai valor de um parâmetro de consulta da URL */
function getParameterByName(name, url = window.location.href) {
    // Substituir os colchetes para criar uma expressão regular
    name = name.replace(/[\[\]]/g, '\\$&');

    // Cria uma expressão regular para procurar o parâmetro na URL.
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');

    // A expressão regular é executada na URL e armazena o resultado
    var results = regex.exec(url);

    // Retorna nulo caso não tenha resultado
    if (!results) return null;

    // Retorna string vazia
    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


nickname = getParameterByName('nickname');

//Função que irá atualizar os seguidores do perfil visitado */
function updateAmizades(nickname) {
    // Variável para armazenar o nickname
    let name = nickname;

    // Solicitação GET para a URL '/perfil/' + name 
    fetch('/perfil/' + name)
        .then(response => response.json()) // Converte a resposta em JSON.
        .then(data => {
            // Obter número de seguidores
            let seguidores = data.usuario.seguidores;

            // Obter HTML pelo id 'seguidores'
            let nameElement = document.getElementById('seguidores');

            // Atualiza o conteúdo do elemento para exibir o número de seguidores.
            nameElement.textContent = "Seguidores: " + seguidores;

            // Defindo estilo para o elemento nameElement
            nameElement.style.color = "#00891E";
            nameElement.style.border = "2px solid white";
            nameElement.style.borderRadius = "10px";
            nameElement.style.padding = "10px";
            nameElement.style.backgroundColor = "black";
            nameElement.style.fontSize = "20px";
            nameElement.style.width = "15vw";
            nameElement.style.textAlign = "center";

            // Ajustar largura para tela menor que 768px
            if (window.innerWidth <= 768) {
                nameElement.style.width = "30vw";
            }
        });
}

// Fazer solicitações ao servidor e recuperar dados relacionado ao perfil 
async function varIdUsuario() {
    //Obter informações - GET
    try {
        // Para solicitação GET para a URL '/perfil/' 
        const response = await fetch('/perfil/' + nickname, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
      
        // Armazena a resposta json na variável data
        const data = await response.json();
      
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
        const response = await fetch('/perfil-token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
      
        // Armazena a resposta json na variável data 
        const data = await response.json();
      
        // A variável irá armazenar o valor 'id_usuario' 
        idUsuario = data.usuario.id_usuario;
    
    } catch (error) {
        // Em caso de erro, exibe o erro no console.
        console.error(error);
    }
}


/*Se varIdUsuario for solcitado de forma correta, então a outra função será executada */
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
                nomeElement.style.padding = "20px";
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
                tecnologiaElement.style.padding = "20px";
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
                seguidoresElement.style.padding = "20px";
                seguidoresElement.style.backgroundColor = "black";
                seguidoresElement.style.fontSize = "20px";
                seguidoresElement.style.width = "15vw";
                seguidoresElement.style.textAlign = "center";

                let seguindo = data.usuario.seguindo;
                let seguindoElement = document.getElementById('seguindo');
                seguindoElement.textContent = "Seguindo: " + seguindo;
                seguindoElement.style.color = "#00891E";
                seguindoElement.style.border = "2px solid white";
                seguindoElement.style.borderRadius = "10px";
                seguindoElement.style.padding = "20px";
                seguindoElement.style.backgroundColor = "black";
                seguindoElement.style.fontSize = "20px";
                seguindoElement.style.width = "15vw";
                seguindoElement.style.textAlign = "center";

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

        // Função assíncrona para seguir ou deixar de seguir um usuário.
    async function seguir(idUsuario, idUsuarioSeguindo) {
        // Faz uma solicitação POST para verificar a existência de uma amizade.
        const response = await fetch("/verificar_amizade", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_usuario: idUsuario, id_usuario_seguindo: idUsuarioSeguindo })
        });

        // Verifica se a solicitação foi bem-sucedida.
        if (response.ok) {
            // Analisa a resposta como JSON.
            const data = await response.json();

            // Desfazer amizade, caso exista
            if (data.amizade_existe) {
                const response = await fetch("/desfazer_amizade", {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id_usuario: idUsuario, id_usuario_seguindo: idUsuarioSeguindo })
                });

                // Atualizar botão, ao desfazer a amizade
                if (response.ok) {
                    seguirBotao.textContent = "Seguir";
                    updateAmizades(nickname);
                }
            } else {
                // Criar amizade, caso não exista
                const response = await fetch("/criar_amizade", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id_usuario: idUsuario, id_usuario_seguindo: idUsuarioSeguindo })
                });

                // Atualizar o botão de seguir, ao seguir
                if (response.ok) {
                    seguirBotao.textContent = "Seguindo";
                    updateAmizades(nickname);
                }
            }
        }
    }

    // Ouvinte de evento para o botão 
    seguirBotao.addEventListener("click", () => {
        // Chamar função seguir
        seguir(idUsuario, idUsuarioSeguindo);
    });


})

// Importar 'iconsHover' e 'sidebarModule' do arquivo 'global.mjs'.
import { iconsHover, sidebarModule } from './global.mjs';

// Chamada da função 'iconsHover'
iconsHover();

// Chamada da função 'sidebarModule'. Armazena o retorno na variável sidebar
var sidebar = sidebarModule();

//Adicionar ouvinte para o evento ao elemento HTML com id "busca" - o elemento busca ao ser clicado chama a função toggleSidebar
document.getElementById("busca").addEventListener("click", sidebar.toggleSidebar);
