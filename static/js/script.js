const openButton = document.getElementById("openButton");
const overlay = document.getElementById("overlay");
const closeButton = document.getElementById("closeButton");

openButton.addEventListener("click", () => {
overlay.style.transform = "translateX(0)";
});

closeButton.addEventListener("click", () => {
overlay.style.transform = "translateX(100%)";
});


