document.addEventListener("DOMContentLoaded", function () {
    const mostrarOverlayButton = document.getElementById("mostrarOverlay");
    const mostrarOverlay2Button = document.getElementById("mostrarOverlay2");
    const mostrarOverlay3Button = document.getElementById("mostrarOverlay3");


    const fecharOverlayButton = document.getElementById("fecharOverlay");
    const fecharOverlay2Button = document.getElementById("fecharOverlay2"); 
    const fecharOverlay3Button = document.getElementById("fecharOverlay3"); 


    const overlay = document.getElementById("overlay-passos");
    const overlay2 = document.getElementById("overlay-biblioteca");
    const overlay3 = document.getElementById("overlay-finalidades");


    mostrarOverlayButton.addEventListener("click", function () {
        overlay.style.display = "block";
    });
    mostrarOverlay2Button.addEventListener("click", function () {
        overlay2.style.display = "block";
    });
    mostrarOverlay3Button.addEventListener("click", function () {
        overlay3.style.display = "block";
    });


    fecharOverlayButton.addEventListener("click", function () {
        overlay.style.display = "none";
    });
    fecharOverlay2Button.addEventListener("click", function () {
        overlay2.style.display = "none";
    });
    fecharOverlay3Button.addEventListener("click", function () {
        overlay3.style.display = "none";
    });
});