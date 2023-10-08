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

    document.getElementById('sair').addEventListener('click', async function () {
        const response2 = await fetch("/sair", {
            method: "POST",
        });

        if (response2.ok) {
            window.location.href='/';
        }
    })
    
    let buscaImage = document.querySelector("#busca");

    buscaImage.addEventListener('mouseover', function () {
        buscaImage.src = '/static/images/pesquisabranco.png';
    });
    buscaImage.addEventListener('mouseout', function () {
        buscaImage.src = '/static/images/pesquisa.png';
    });

    let addImage = document.querySelector("#addpost");

    addImage.addEventListener('mouseover', function () {
        addImage.src = '/static/images/addpostbranco.png';
    });
    addImage.addEventListener('mouseout', function () {
        addImage.src = '/static/images/addpost.png';
    });
}

export function sidebarModule() {
    var sidebarOpen = false;

    function toggleSidebar() {
        if (!sidebarOpen) {
            if (window.innerWidth < 768) {
                document.getElementById("mySidebar").style.width = "24vw"; 
            }
            else{
                document.getElementById("mySidebar").style.width = "10vw";
            }
           
            document.getElementById("mySidebar").style.height = "100%";
            document.getElementById("mySidebar").style.borderLeft = "2px solid green";
            sidebarOpen = true;
        } else {
            document.getElementById("mySidebar").style.width = "0";
            document.getElementById("mySidebar").style.height = "0";
            document.getElementById("mySidebar").style.border = "none";
            sidebarOpen = false;
        }
    }

    return {
        toggleSidebar: toggleSidebar
    };
}
