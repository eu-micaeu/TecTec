let id_usuario;

async function varIdUsuario() {
    
    try {

        const resposta = await fetch('/perfil-token/', {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json'

            },

        });

        const data = await resposta.json();

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

            .then(resposta => {

                if (resposta.ok) {

                    var toastCerto = document.getElementById("toastCerto");

                    toastCerto.style.display = "block";

                    setTimeout(function () {

                        toastCerto.style.display = "none";

                        window.location.href = "/home";

                    }, 3000);

                } else {

                    alert('Erro na solicitação POST. Código de status: ' + resposta.status);

                }

            })

    });

});

// Importação de funções do global.mjs 

import { iconeSelecionado, configureDialog} from './global.mjs';

iconeSelecionado();

configureDialog("busca", "myDialog", "overlay", "closeDialog");
