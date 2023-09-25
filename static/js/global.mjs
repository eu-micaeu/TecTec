export function iconsHover() {
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

    let pesquisaImage = document.querySelector("#pesquisar");

    pesquisaImage.addEventListener('mouseover', function () {
        pesquisaImage.src = '/static/images/explorarbranco.png';
    });
    pesquisaImage.addEventListener('mouseout', function () {
        pesquisaImage.src = '/static/images/explorar.png';
    });

    let outImage = document.querySelector("#sair");

    outImage.addEventListener('mouseover', function () {
        outImage.src = '/static/images/outbranco.png';
    });
    outImage.addEventListener('mouseout', function () {
        outImage.src = '/static/images/out.png';
    });

    let buscaImage = document.querySelector("#busca");

    buscaImage.addEventListener('mouseover', function () {
        buscaImage.src = '/static/images/pesquisabranco.png';
    });
    buscaImage.addEventListener('mouseout', function () {
        buscaImage.src = '/static/images/pesquisa.png';
    });
}

export function sidebarModule() {
    var sidebarOpen = false;

    function toggleSidebar() {
        if (!sidebarOpen) {
            document.getElementById("mySidebar").style.width = "13vw";
            sidebarOpen = true;
        } else {
            document.getElementById("mySidebar").style.width = "0";
            sidebarOpen = false;
        }
    }

    return {
        toggleSidebar: toggleSidebar
    };
}

export async function varIdUsuario() {

    const token = localStorage.getItem("token").toString();

    let idUsuario;
    let nickname;

    try {
        const response = await fetch('/perfil-token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token })
        });
        const data = await response.json();
        idUsuario = data.usuario.id_usuario;
        nickname = data.usuario.nickname;
    } catch (error) {
        console.error(error);
    }

    return { idUsuario, nickname };
}
