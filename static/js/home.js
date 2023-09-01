const openButton = document.getElementById("open-Button");
const overlay = document.getElementById('overlay');
const closeButton = document.getElementById('close-Button');

openButton.addEventListener('click', function() {
    overlay.classList.add('active');
});

closeButton.addEventListener('click', function() {
    overlay.classList.remove('active'); 
});

function feed() {
    var id = parseInt(localStorage.getItem("id_usuario"));
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            var postagens = response.postagens;
            var repeatedButtonsContainer = document.querySelector("#carrosel");
            repeatedButtonsContainer.innerHTML = "";

            for (var i = 0; i < postagens.length; i++) {
                var clonedButton = document.createElement("div");
                clonedButton.classList.add("cartao");
                clonedButton.textContent = postagens[i].texto + " " + postagens[i].curtidas + " " + postagens[i].comentarios;
                repeatedButtonsContainer.appendChild(clonedButton);
            }
        } else {
            return;
        }
    };
    xhr.open("GET", "/feed/" + id, true);
    xhr.send();
}

window.addEventListener("load", feed);
