export function iconeSelecionado() {

    let imagemHome = document.querySelector("#casa");

    imagemHome.addEventListener('mouseover', function () {

        imagemHome.src = '/static/images/homebranco.png';

    });

    imagemHome.addEventListener('mouseout', function () {

        imagemHome.src = '/static/images/home.png';

    });

    let imagemUser = document.querySelector("#perfil");

    imagemUser.addEventListener('mouseover', function () {

        imagemUser.src = '/static/images/la_userbranco.png';

    });

    imagemUser.addEventListener('mouseout', function () {

        imagemUser.src = '/static/images/la_user.png';

    });

    let imagemPesquisa = document.querySelector("#pesquisar");

    imagemPesquisa.addEventListener('mouseover', function () {

        imagemPesquisa.src = '/static/images/explorarbranco.png';

    });

    imagemPesquisa.addEventListener('mouseout', function () {

        imagemPesquisa.src = '/static/images/explorar.png';

    });
    
    let imagemBusca = document.querySelector("#busca");

    imagemBusca.addEventListener('mouseover', function () {

        imagemBusca.src = '/static/images/techbranco.png';

    });

    imagemBusca.addEventListener('mouseout', function () {

        imagemBusca.src = '/static/images/tech.png';

    });

    let imagemPostar = document.querySelector("#addpost");

    imagemPostar.addEventListener('mouseover', function () {

        imagemPostar.src = '/static/images/addpostbranco.png';

    });

    imagemPostar.addEventListener('mouseout', function () {

        imagemPostar.src = '/static/images/addpost.png';

    });

    let imagemSair = document.querySelector("#sair");

    imagemSair.addEventListener('mouseover', function () {

        imagemSair.src = '/static/images/outbranco.png';

    });

    imagemSair.addEventListener('mouseout', function () {

        imagemSair.src = '/static/images/out.png';

    });

    document.getElementById('sair').addEventListener('click', async function () {

        const resposta2 = await fetch("/sair", {

            method: "POST",

        });

        if (resposta2.ok) {

            window.location.href='/';
            
        }
        
    })

}

const header = document.querySelector('header');

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    header.style.display = 'none';
}

const alternarBotaoHeader = document.getElementById('alternarBotaoHeader');

alternarBotaoHeader.addEventListener('click', function() {
    
    if (header.style.display === 'block' || header.style.display === '') {

        header.style.display = 'none';

    } else {
        
        header.style.display = 'block';

    }

});