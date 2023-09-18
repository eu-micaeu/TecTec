const token = localStorage.getItem("token").toString();

let idUsuario;



async function varIdUsuario() {
    try {
        const response = await fetch('/perfil-token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token })
        });
        const data = await response.json();
        idUsuario = data.usuario.id_usuario;
    } catch (error) {
        console.error(error);
    }
}

varIdUsuario().then(() => {

    function displayFeed() {

        fetch(`/contar_amizades/${idUsuario}`)
            .then(response => response.json())
            .then(data => {
                const numberOfFriends = data.quantidade_amizades;

                if (numberOfFriends === 0) {
                    const carrossel = document.querySelector("#carrosel");
                    carrossel.style.display = "none";

                } else if (numberOfFriends > 0) {
                }
            })
            .catch(error => {
                console.error('Error counting friends:', error);
            });


        fetch(`/postagens-curtidas/${idUsuario}`, {
            headers: {
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(data => {
                const curtidasUsuario = data.postagens;

                fetch('/feed/' + idUsuario, {
                    headers: {
                        'Authorization': token
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        let postagens = data.postagens;
                        let feedContainer = document.querySelector("#carrosel");
                        feedContainer.innerHTML = "";
                        for (let i = 0; i < postagens.length; i++) {
                            let postagem = postagens[i];
                            let postElement = document.createElement("div");
                            postElement.classList.add("cartao");

                            let nicknameElement = document.createElement("span");
                            nicknameElement.classList.add("nameWhite");
                            nicknameElement.textContent = '@' + postagem.nickname;
                            postElement.appendChild(nicknameElement);
                            nicknameElement.style.cursor = "pointer";

                            nicknameElement.addEventListener("click", function () {
                                window.location.href = '/perfil-visitado?nickname=' + postagem.nickname;
                            });

                           
                            let textElement = document.createElement("p");
                            textElement.textContent = postagem.texto;
                            postElement.appendChild(textElement);

                            let divEmbaixo = document.createElement("div");
                            divEmbaixo.classList.add("centraliza");

                            let comentarioImagem = document.createElement('img');

                            comentarioImagem.src = '../static/images/comentario.png'
                            comentarioImagem.width = 18;
                            comentarioImagem.height = 18;

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
                            likeButton.width = 18;
                            likeButton.height = 18;
                            likeButton.style.cursor = 'pointer';
                            likeButton.dataset.postId = postagem.id_postagem;

                            if (curtidasUsuario.some(curtida => curtida.id_postagem === postagem.id_postagem)) {
                                likeButton.src = '/static/images/coracaofechado.png';
                            } else {
                                likeButton.src = '/static/images/coracao.png';
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

                            let seguidorImagem = document.createElement('img');

                            seguidorImagem.src = '../static/images/seguidor.png'
                            seguidorImagem.width = 18;
                            seguidorImagem.height = 18;

                            seguidorImagem.addEventListener('mouseover', function () {
                                seguidorImagem.src = '/static/images/seguidorbranco.png';
                            });
                            seguidorImagem.addEventListener('mouseout', function () {
                                seguidorImagem.src = '/static/images/seguidor.png';
                            });

                            divEmbaixo.appendChild(seguidorImagem);


                            postElement.appendChild(divEmbaixo);

                            feedContainer.appendChild(postElement);
                        }
                    });
            })
    }

    function loadFriendSuggestions() {
        fetch(`/sugerir_amizades/${idUsuario}`)
            .then(response => response.json())
            .then(data => {
                const friendSuggestions = data.sugestoes_amigos;
    
                if (Array.isArray(friendSuggestions)) {
                    const amigosDiv = document.querySelector("#adicionar-amigos");
                    amigosDiv.innerHTML = "";
    
                    const titulo = document.createElement("span");
                    titulo.textContent = "Sugestões para seguir:";
                    amigosDiv.appendChild(titulo);
                    titulo.classList.add("titleSugestao");
                    titulo.classList.add("centraliza");
    
                    for (const suggestion of friendSuggestions) {
                        const suggestionBox = document.createElement("div");
                        suggestionBox.classList.add("sugestao-amizade");
    
                        const nicknameElement = document.createElement("span");
                        nicknameElement.textContent = suggestion.nickname;
                        suggestionBox.appendChild(nicknameElement);
    
                        const addButton = document.createElement("button");
                        addButton.textContent = "Seguir";
                        suggestionBox.appendChild(addButton);
    
                        addButton.addEventListener("click", async () => {
                            const response = await fetch("/criar_amizade", {
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    id_usuario: idUsuario,
                                    id_usuario_seguindo: suggestion.id_usuario
                                })
                            });
            
                            if (response.ok) {
                                loadFriendSuggestions()
                                displayFeed()
                            }
                        });
    
                        amigosDiv.appendChild(suggestionBox);
                    }
                } else {
                    console.error('Friend suggestions is not an array:', friendSuggestions);
                }
            })
            .catch(error => {
                console.error('Error loading friend suggestions:', error);
            });
    }

    loadFriendSuggestions()
    displayFeed()
})

let homeImage = document.querySelector("#casa");

homeImage.addEventListener('mouseover', function () {
    homeImage.src = '/static/images/homebranco.png';
});
homeImage.addEventListener('mouseout', function () {
    homeImage.src = '/static/images/home.png';
});

let userImage = document.querySelector("#perfil");

userImage.addEventListener('mouseover', function () {
    userImage.src = '/static/images/la_userbranco.png';
});
userImage.addEventListener('mouseout', function () {
    userImage.src = '/static/images/la_user.png';
});

let pesquisaImage = document.querySelector("#pesquisa");

pesquisaImage.addEventListener('mouseover', function () {
    pesquisaImage.src = '/static/images/pesquisabranco.png';
});
pesquisaImage.addEventListener('mouseout', function () {
    pesquisaImage.src = '/static/images/pesquisa.png';
});

let outImage = document.querySelector("#sair");

outImage.addEventListener('mouseover', function () {
    outImage.src = '/static/images/outbranco.png';
});
outImage.addEventListener('mouseout', function () {
    outImage.src = '/static/images/out.png';
});