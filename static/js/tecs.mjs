// Insira o conteúdo HTML no corpo antes do primeiro filho usando insertAdjacentHTML
document.body.insertAdjacentHTML('afterbegin', `

<dialog id="myDialog">

    <button id="closeDialog">X</button>

    <h3>Ver sobre?</h3>
    
    <a href="/golang">GoLang</a>

    <a href="/java">Java</a>

    <a href="/c">C</a>

    <a href="/postgreSQL">PostgreSQL</a>

    <a href="/docker">Docker</a>

    <a href="/typescript">TypeScript</a>

    <a href="/hadoop">Hadoop</a>

    <a href="/html">HTML5</a>

    <a href="/css">CSS3</a>

</dialog>

<div id="overlay"></div>

`);

