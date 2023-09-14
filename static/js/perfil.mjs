let nickname;
const token = localStorage.getItem("token").toString();

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
        nickname = data.usuario.nickname;
    } catch (error) {
        console.error(error);
    }
}

varIdUsuario().then(() => {
    function displayFeed(nickname) {
        let name = nickname;
        fetch('/postagens/' + name, {
            headers: {
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
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

                    let textElement = document.createElement("p");
                    textElement.textContent = postagem.texto;
                    postElement.appendChild(textElement);

                    let imageContainer = document.createElement("div");
                    imageContainer.classList.add("centraliza");

                    let imageElement = document.createElement("img");
                    imageElement.src = "/static/images/lixo.png";
                    imageElement.style.width = "25px";
                    imageElement.style.height = "25px";
                    imageElement.style.cursor = "pointer";
                    imageElement.id = "lixo";

                    imageElement.addEventListener('mouseover', function () {
                        imageElement.src = '/static/images/lixobranco.png';
                    });
                    imageElement.addEventListener('mouseout', function () {
                        imageElement.src = '/static/images/lixo.png';
                    });

                    imageElement.addEventListener("click", function () {

                        let postId = postagem.id_postagem;

                        fetch('/excluir-postagem/' + postId, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': token
                            }
                        })
                            .then(response => response.json())
                            .then(data => {
                                displayFeed(name);
                            });
                    });

                    let image2Element = document.createElement('img');

                    image2Element.src = '../static/images/comentario.png'
                    image2Element.width = 25; 
                    image2Element.height = 25;

                    image2Element.addEventListener('mouseover', function () {
                        image2Element.src = '/static/images/comentariobranco.png';
                    });
                    image2Element.addEventListener('mouseout', function () {
                        image2Element.src = '/static/images/comentario.png';
                    });

                    image2Element.addEventListener('click', function () {
                        let postId = postagem.id_postagem;
                        document.cookie = "postId=" + postId;
                        window.location.href = 'comentario?postId=' + postId;
                    });

                    imageContainer.appendChild(image2Element);

                    let comentarioQuantidade = document.createElement('p');
                    comentarioQuantidade.textContent = postagem.comentarios;

                    imageContainer.appendChild(comentarioQuantidade);

                    imageContainer.appendChild(imageElement);

                    postElement.appendChild(imageContainer);

                    feedContainer.appendChild(postElement);

                    
                    window.addEventListener("resize", ajustarTamanhoDoCartao);  
                    ajustarTamanhoDoCartao();
                }
            });
    }

    function ajustarTamanhoDoCartao() {
        var larguraDaTela = window.innerWidth;
        
        if (larguraDaTela <= 768) {
            var cartoes = document.querySelectorAll(".cartao");
            cartoes.forEach(function (cartao) {
                cartao.style.width = "70%";
                cartao.style.fontSize = "10px"; 
                cartao.style.padding = "15px";
                cartao.style.margin = "0.5vh"; 
                cartao.style.marginLeft = "1.5vh"; 

            });
        } else {
            var cartoes = document.querySelectorAll(".cartao");
            cartoes.forEach(function (cartao) {
                cartao.style.width = "80vh"; 
                cartao.style.fontSize = "16px"; 
                cartao.style.padding = "25px"; 
                cartao.style.margin = "1vh"; 
            });
        }
    } 

    function updateBiografia(nickname) {
        let name = nickname;
        fetch('/perfil/' + name, {
            headers: {
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById('biografia').value = data.usuario.biografia;
            });
    };

    function updateNome(nickname) {
        let name = nickname;
        fetch('/perfil/' + name, {
            headers: {
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(data => {
                let nickname = data.usuario.nickname;
                let nameElement = document.getElementById('nome');
                nameElement.textContent = "@" + nickname;
            });
    }

    function updateTecnologia(nickname) {
        let name = nickname;
        fetch('/perfil/' + name, {
            headers: {
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(data => {
                let tecnologia = data.usuario.tecnologia;
                let nameElement = document.getElementById('tecnologia');
                nameElement.textContent = "Tecnologia: " + tecnologia;
            });
    }


    updateNome(nickname);
    updateBiografia(nickname);
    updateTecnologia(nickname);
    displayFeed(nickname);


    document.getElementById('biografia').addEventListener('blur', function () {
        let name = nickname;
        var biografia = document.getElementById('biografia').value;
        fetch('/atualizar-biografia/' + name, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ biografia: biografia })
        });
    });
});

document.getElementById("editar").addEventListener("click", function () {
    document.getElementById("biografia").contentEditable = true;
    document.getElementById("biografia").focus();
});

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