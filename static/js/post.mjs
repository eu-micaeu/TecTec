let id_usuario;

// Função para retornar informações do usuário através do token que o mesmo criou.
async function varIdUsuario() {
    try {
        const response = await fetch('/perfil-token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        id_usuario = data.usuario.id_usuario;
    } catch (error) {
        console.error(error);
    }
}

varIdUsuario().then(() => {

    document.getElementById('publicar').addEventListener('click', function () {
        var texto = document.getElementById('inserirPostagem').value;
        fetch('/publicar/' + id_usuario, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ texto: texto })
        })
        .then(response => {
            if (response.ok) {
                alert("Postagem feita!");
                setTimeout(() => {
                    window.location.href = "/home";
                }, 2000);
                
            } else {
                alert('Erro na solicitação POST. Código de status: ' + response.status);
            }
        })
    });
});

import { iconsHover, sidebarModule } from './global.mjs';

iconsHover();

var sidebar = sidebarModule();
document.getElementById("busca").addEventListener("click", sidebar.toggleSidebar);