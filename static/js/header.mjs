// Insira o conteúdo HTML no corpo antes do primeiro filho usando insertAdjacentHTML
document.body.insertAdjacentHTML('afterbegin', `

<button id="toggleHeaderButton">
    <img src="../static/images/logo.png" alt="Logo" id="logo" width="50" height="50">
</button>

<header>

<div class="imgTitulo"> 
    
    <img src="../static/images/logo.png" alt="Logo" id="logo" width="50" height="50">

    <p>
        <span style="color: #00891E;">T</span>
        <span style="color: #00891E;">e</span>
        <span style="color: #00891E;">c</span>
        <span style="color: white;">T</span>
        <span style="color: white;">e</span>
        <span style="color: white; margin:0">c</span>
    </p>
  
    </div>
    
    <div class="imgTitulo"> 
    
        <img src="../static/images/casinha.png" alt="Home" id="casa" class="opcao" onclick="window.location.href='/home'" title="Home" width="30" height="30">

        <p>Home</p>
    
    </div>

    <div class="imgTitulo"> 
    
        <img src="../static/images/la_user.png" alt="Perfil" id="perfil" class="opcao" onclick="window.location.href='/perfil'" title="Perfil" width="30" height="30">

        <p>Perfil</p>
    
    </div>

    <div class="imgTitulo"> 
    
        <img src="../static/images/explorar.png" alt="Pesquisar usuário" id="pesquisar" class="opcao" onclick="window.location.href='/pesquisar'" title="Pesquisar usuário" width="30" height="30">

        <p>Pesquisar</p>
    
    </div>

    <div class="imgTitulo"> 
    
        <img src="../static/images/pesquisa.png" alt="Tecnologias" id="busca" class="opcao" title="Tecnologias" width="30" height="30">

        <p>Tecnologias</p>
    
    </div>
    
    <div class="imgTitulo"> 
    
        <img src="../static/images/addpost.png" alt="Postar" id="addpost" class="opcao" onclick="window.location.href='/post'" title="Postar" width="30" height="30">

        <p>Postar</p>
    
    </div>
    
    <div class="imgTitulo"> 
    
        <img src="../static/images/out.png" alt="Sair" id="sair" class="opcao" title="Sair" width="30" height="30">

        <p>Sair</p>
    
    </div>

`);

