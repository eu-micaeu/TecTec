window.onload = function() {
    localStorage.removeItem("id_usuario");
};

window.addEventListener("load", function () {
    setTimeout(function () {
        window.location.href = "/login";
    }, 2000);
});