const openButton = document.getElementById("open-Button");
const overlay = document.getElementById('overlay');
const closeButton = document.getElementById('close-Button');

openButton.addEventListener('click', function () {
    overlay.classList.add('active');
});

closeButton.addEventListener('click', function () {
    overlay.classList.remove('active');
});

function feed() {
    var cont = 0;
    var id = parseInt(localStorage.getItem("id_usuario"));
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var response = JSON.parse(this.responseText);
            var feed = response.postagens;
            var repeatedButtonsContainer = document.querySelector("#carrosel");
            repeatedButtonsContainer.innerHTML = "";

            function createAndAppendCard(userId, text) {
                let clonedButton = document.createElement("div");
                clonedButton.classList.add("cartao");
                clonedButton.textContent = '@' + userId;
                repeatedButtonsContainer.appendChild(clonedButton);

                let textNode = document.createTextNode(" " + text);
                clonedButton.appendChild(textNode);
            }

            function fetchUserAndPostData(userId) {
                fetch('/perfil/' + userId)
                    .then(response => response.json())
                    .then(data => {
                        let nickname = data.usuario.nickname;
                        fetch('/postagens/' + userId)
                            .then(response => response.json())
                            .then(data => {
                                let text = data.postagens[cont].texto;
                                createAndAppendCard(nickname, text);
                                cont = cont + 1;
                            });
                    });
            }

            for (var i = 0; i < feed.length; i++) {
                let userId = feed[i].id_usuario;
                fetchUserAndPostData(userId);
            }
        }
    };
    xhr.open("GET", "/feed/" + id, true);
    xhr.send();
}


window.addEventListener("load", feed);

function updateName() {
    var id = parseInt(localStorage.getItem("id_usuario"));
    fetch('/perfil/' + id)
        .then(response => response.json())
        .then(data => {
            let nickname = data.usuario.nickname;
            let nameElement = document.getElementById('nome');
            nameElement.textContent = "@" + nickname;
        });
}

window.addEventListener('load', updateName);
