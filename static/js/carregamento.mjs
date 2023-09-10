// Ao esperar 2 segundos, a página de carregamento irá redirecionada para a rota /login
window.addEventListener("load", function () {
    setTimeout(function () {
        window.location.href = "/login";
    }, 2000);
});

localStorage.clear();