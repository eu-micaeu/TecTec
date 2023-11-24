export function iconeSelecionado() {

    document.getElementById('sair').addEventListener('click', async function () {

        const resposta2 = await fetch("/sair", {

            method: "POST",

        });

        if (resposta2.ok) {

            window.location.href = '/';

        }

    })

    var menu = document.getElementById('menuDasTecnologias');

    document.getElementById('tecnologias').addEventListener('click', function () {

        if (menu.style.display === 'flex') {

            menu.style.display = 'none';

            return;

        }else{
                
            menu.style.display = 'flex';
        }
        

    });


}


