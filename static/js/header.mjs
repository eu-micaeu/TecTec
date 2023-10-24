// Insira o conteúdo HTML no corpo antes do primeiro filho usando insertAdjacentHTML
document.body.insertAdjacentHTML('afterbegin', `

<header>

    <div class="centraliza">

        <img src="../static/images/logo.png" alt="Logo" id="logo" width="45" height="45">

        <img src="../static/images/casinha.png" alt="Home" id="casa" class="opcao" onclick="window.location.href='/home'" title="Home" width="30" height="30">
    
        <img src="../static/images/la_user.png" alt="Perfil" id="perfil" class="opcao" onclick="window.location.href='/perfil'" title="Perfil" width="30" height="30">
    
        <img src="../static/images/explorar.png" alt="Pesquisar usuário" id="pesquisar" class="opcao" onclick="window.location.href='/pesquisar'" title="Buscar usuários" width="30" height="30">

        <img src="../static/images/tech.png" alt="Tecnologias" id="busca" class="opcao" title="Tecnologias" width="30" height="30">

        <img src="../static/images/addpost.png" alt="Postar" id="addpost" class="opcao" onclick="window.location.href='/post'" title="Postar" width="30" height="30">

        <img src="../static/images/out.png" alt="Sair" id="sair" class="opcao" title="Sair" width="30" height="30">
    
    </div>

</header>

`);

