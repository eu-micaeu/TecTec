let id_usuario;
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
        id_usuario = data.usuario.id_usuario;
    } catch (error) {
        console.error(error);
    }
}

varIdUsuario().then(() => {
    document.getElementById('publicar').addEventListener('click', function () {
        var texto = document.getElementById('inputPostagem').value;
        fetch('/publicar/' + id_usuario, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ texto: texto })
        })
        .then(response => {
            if (response.ok) {
                alert('Postagem bem-sucedida!');
                window.location.href = "/home";
            } else {
                alert('Erro na solicitação POST. Código de status: ' + response.status);
            }
        })
        .catch(error => {
            alert('Erro na solicitação POST: ' + error);
        });
    });
});




