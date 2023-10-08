// Insira o conteúdo HTML no corpo antes do primeiro filho usando insertAdjacentHTML
document.body.insertAdjacentHTML('afterbegin', `

<div class="centraliza">

<header>

    <img src="../static/images/casinha.png" alt="Home" class="user" id="casa" onclick="window.location.href='/home'" title="Home" style="cursor: pointer;">

    <br>

    <img src="../static/images/la_user.png" alt="Perfil" class="user" id="perfil" onclick="window.location.href='/perfil'" title="Perfil" style="cursor: pointer;">

    <br>

    <img src="../static/images/explorar.png" alt="Pesquisar usuário" class="user" id="pesquisar" onclick="window.location.href='/pesquisar'" title="Pesquisar usuário" style="cursor: pointer;">

    <br>

    <img src="../static/images/logo.ico" alt="Logo" class="img_logo" id="logo">

    <br>

    <img src="../static/images/pesquisa.png" alt="Tecnologias" class="user" id="busca" title="Tecnologias" style="cursor: pointer;">

    <br>

    <img src="../static/images/addpost.png" alt="Postar" class="user" id="addpost" onclick="window.location.href='/post'" title="Postar" style="cursor: pointer;">

    <br>

    <img src="../static/images/out.png" alt="Sair" class="user" id="sair" title="Sair" style="cursor: pointer;">


</header></div>



`);

