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
        var mySidebar = document.getElementById("mySidebar");
    
        if (!sidebarOpen) {
            if (window.innerWidth < 768) {
                mySidebar.style.right = "0"; 
            } else {
                mySidebar.style.right = "0"; 
                mySidebar.style.marginTop = "10vh";
                mySidebar.style.height = "80%";
                mySidebar.style.width = "10%";
            }
    
            mySidebar.style.borderTop = "2px solid green";
            mySidebar.style.borderLeft = "2px solid green";
            mySidebar.style.borderBottom = "2px solid green";
            mySidebar.style.borderRadius = "15px 0 0 15px";
            sidebarOpen = true;
        } else {
            
            mySidebar.style.right = "-100%"; 
            mySidebar.style.height = "0";
            mySidebar.style.border = "none";
            
            sidebarOpen = false;
        }
    }
    

    return {
        toggleSidebar: toggleSidebar
    };
}

const header = document.querySelector('header');

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    header.style.display = 'none';
}

const toggleHeaderButton = document.getElementById('toggleHeaderButton');

toggleHeaderButton.addEventListener('click', function() {
    
    if (header.style.display === 'block' || header.style.display === '') {

        header.style.display = 'none';

    } else {
        
        header.style.display = 'block';

    }

});