// Insira o conteúdo HTML no corpo antes do primeiro filho usando insertAdjacentHTML
document.body.insertAdjacentHTML('afterbegin', `
<header>

<div class="centraliza">

    <img src="../static/images/casinha.png" alt="" class="user" id="casa" onclick="window.location.href='/home'" title="Home">

    <br>

    <img src="../static/images/la_user.png" alt="" class="user" id="perfil" onclick="window.location.href='/perfil'" title="Perfil">

    <br>

    <img src="../static/images/explorar.png" alt="" class="user" id="pesquisar" onclick="window.location.href='/pesquisar'" title="Pesquisar usuário">

    <br>

    <img src="../static/images/logo.png" alt="" class="img_logo" id="logo" >

    <br>

    <img src="../static/images/pesquisa.png" alt="" class="user" id="busca" title="Tecnologias">

    <br>

    <img src="../static/images/addpost.png" alt="" class="user" id="addpost" onclick="window.location.href='/post'" title="Postar">

    <br>

    <img src="../static/images/out.png" alt="" class="user" id="sair" onclick="window.location.href='/'" title="Sair">

</div>

</header>
`);

