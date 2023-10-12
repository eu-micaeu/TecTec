// Insira o conteúdo HTML no corpo antes do primeiro filho usando insertAdjacentHTML
document.body.insertAdjacentHTML('afterbegin', `

<div class="centraliza">

<header>

    <img src="../static/images/casinha.png" alt="Home" id="casa" onclick="window.location.href='/home'" title="Home" width="30" height="30">

    <br>

    <img src="../static/images/la_user.png" alt="Perfil" id="perfil" onclick="window.location.href='/perfil'" title="Perfil" width="30" height="30">

    <br>

    <img src="../static/images/explorar.png" alt="Pesquisar usuário" id="pesquisar" onclick="window.location.href='/pesquisar'" title="Pesquisar usuário" width="20" height="20">

    <br>

    <img src="../static/images/logo.png" alt="Logo" id="logo" width="40" height="40">

    <br>

    <img src="../static/images/pesquisa.png" alt="Tecnologias" id="busca" title="Tecnologias" width="20" height="20">

    <br>

    <img src="../static/images/addpost.png" alt="Postar" id="addpost" onclick="window.location.href='/post'" title="Postar" width="30" height="30">

    <br>

    <img src="../static/images/out.png" alt="Sair" id="sair" title="Sair" width="30" height="30">


</header></div>



`);

