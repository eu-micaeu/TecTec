// Insira o conteúdo HTML no corpo antes do primeiro filho usando insertAdjacentHTML
document.body.insertAdjacentHTML('afterbegin', `

<header>

    <img src="../static/images/logo.png" alt="Logo" id="logo" width="40" height="40">
    
    <div class="logoComOpcao">

        <img src="../static/images/casinha.png" alt="Home" id="casa" class="opcao" onclick="window.location.href='/home'" title="Home" width="30" height="30">

        <p>Home</p>
    
    </div>

    <div class="logoComOpcao">

        <img src="../static/images/la_user.png" alt="Perfil" id="perfil" class="opcao" onclick="window.location.href='/perfil'" title="Perfil" width="30" height="30">

        <p>Perfil</p>
    
    </div>

    <div class="logoComOpcao">

        <img src="../static/images/explorar.png" alt="Pesquisar usuário" id="pesquisar" class="opcao" onclick="window.location.href='/pesquisar'" title="Buscar usuários" width="30" height="30">

        <p>Buscar</p>
    
    </div>

    <img src="../static/images/tech.png" alt="Tecnologias" id="busca" class="opcao" title="Tecnologias" width="30" height="30">

    <div class="logoComOpcao">

        <img src="../static/images/out.png" alt="Sair" id="sair" class="opcao" title="Sair" width="30" height="30">

        <p>Sair</p>
    
    </div>

    

    

</header>

`);

