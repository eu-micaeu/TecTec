// Insira o conteúdo HTML no corpo antes do primeiro filho usando insertAdjacentHTML
document.body.insertAdjacentHTML('afterbegin', `

<button id="alternarBotaoHeader">

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
        <span style="color: white;">c</span>
    </p>
  
    </div>
    
    <div class="imgTitulo"> 
    
        <img src="../static/images/casinha.png" alt="Home" id="casa" class="opcao" onclick="window.location.href='/home'" title="Home" width="30" height="30">

        <p>
            <span style="color: #00891E;">H</span>
            <span style="color: #00891E;">o</span>
            <span style="color: white;">m</span>
            <span style="color: white;">e</span>
        </p>
    
    </div>

    <div class="imgTitulo"> 
    
        <img src="../static/images/la_user.png" alt="Perfil" id="perfil" class="opcao" onclick="window.location.href='/perfil'" title="Perfil" width="30" height="30">

        <p>
            <span style="color: #00891E;">P</span>
            <span style="color: #00891E;">e</span>
            <span style="color: #00891E;">r</span>
            <span style="color: white;">f</span>
            <span style="color: white;">i</span>
            <span style="color: white;">l</span>
        </p>
    
    </div>

    <div class="imgTitulo"> 
    
        <img src="../static/images/explorar.png" alt="Pesquisar usuário" id="pesquisar" class="opcao" onclick="window.location.href='/pesquisar'" title="Pesquisar usuário" width="30" height="30">

        <p>
            <span style="color: #00891E;">B</span>
            <span style="color: #00891E;">u</span>
            <span style="color: #00891E;">s</span>
            <span style="color: white;">c</span>
            <span style="color: white;">a</span>
            <span style="color: white;">r</span>
        </p>
    
    </div>

    <div class="imgTitulo"> 
    
        <img src="../static/images/pesquisa.png" alt="Tecnologias" id="busca" class="opcao" title="Tecnologias" width="30" height="30">

        <p>

            <span style="color: #00891E;">T</span>
            <span style="color: #00891E;">e</span>
            <span style="color: white;">c</span>
            <span style="color: white;">s.</span>

        </p>
    
    </div>
    
    <div class="imgTitulo"> 
    
        <img src="../static/images/addpost.png" alt="Postar" id="addpost" class="opcao" onclick="window.location.href='/post'" title="Postar" width="30" height="30">

        <p>
        
            <span style="color: #00891E;">P</span>
            <span style="color: #00891E;">o</span>
            <span style="color: white;">s</span>
            <span style="color: white;">t</span>

        </p>
    
    </div>
    
    <div class="imgTitulo"> 
    
        <img src="../static/images/out.png" alt="Sair" id="sair" class="opcao" title="Sair" width="30" height="30">

        <p>
        
            <span style="color: #00891E;">S</span>
            <span style="color: #00891E;">a</span>
            <span style="color: white;">i</span>
            <span style="color: white;">r</span>

        </p>
    
    </div>

`);

