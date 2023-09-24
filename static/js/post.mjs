let id_usuario;
const token = localStorage.getItem("token").toString();

// Função para retornar informações do usuário através do token que o mesmo criou.
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

    function exibirImagem(caminhoImagem) {
        const fundoEscurecido = document.createElement('div');
        fundoEscurecido.style.position = 'fixed';
        fundoEscurecido.style.top = '0';
        fundoEscurecido.style.left = '0';
        fundoEscurecido.style.width = '100%';
        fundoEscurecido.style.height = '100%';
        fundoEscurecido.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        
        const imagem = document.createElement('img');
        imagem.src = caminhoImagem;
        imagem.style.display = 'block';
        imagem.style.margin = '0 auto';
        imagem.style.position = 'absolute';
        imagem.style.top = '50%';
        imagem.style.left = '50%';
        imagem.style.transform = 'translate(-50%, -50%)';
        imagem.style.width = '500px';
        imagem.style.height = '500px';
        imagem.style.borderRadius = '100px';
        
        fundoEscurecido.appendChild(imagem);
        document.body.appendChild(fundoEscurecido);
        
    }

    document.getElementById('publicar').addEventListener('click', function () {
        var texto = document.getElementById('inserirPostagem').value;
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
                exibirImagem('../static/images/confirmado.png');
                setTimeout(() => {
                    window.location.href = "/home";
                }, 2000);
                
            } else {
                alert('Erro na solicitação POST. Código de status: ' + response.status);
            }
        })
    });
});

import { iconsHover } from './global.mjs';

iconsHover();

var sidebarOpen = false;

document.getElementById("busca").addEventListener("click", function() {
  if (!sidebarOpen) {
    document.getElementById("mySidebar").style.width = "13vw";
    document.getElementById("mySidebar").style.height = "100%";
    sidebarOpen = true;
  } else {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("mySidebar").style.height = "0";
    document.getElementById("mySidebar").style.marginTop = "0";
    sidebarOpen = false;
  }
});