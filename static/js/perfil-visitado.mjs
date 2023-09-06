window.onload = function() {
    localStorage.removeItem("id_usuario");
};

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function updateName() {
    var id = parseInt(getParameterByName('id'));
    fetch('/perfil/' + id)
        .then(response => response.json())
        .then(data => {
            let nickname = data.usuario.nickname;
            let nameElement = document.getElementById('nome');
            nameElement.textContent = "@" + nickname;
        });
}

window.addEventListener('load', updateName);

function displayFeed() {
    let id = parseInt(getParameterByName('id'));
    fetch('/postagens/' + id)
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

                let textElement = document.createElement("p");
                textElement.textContent = postagem.texto;
                postElement.appendChild(textElement);

                feedContainer.appendChild(postElement);
            }
        });
}

window.addEventListener("load", displayFeed);

window.addEventListener('load', function() {
    var id = parseInt(getParameterByName('id'));
    fetch('/perfil/' + id)
        .then(response => response.json())
        .then(data => {
            document.getElementById('biografia').innerHTML = data.usuario.biografia;
        });
});
