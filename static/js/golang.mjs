import { iconsHover } from './global.mjs';

iconsHover();

var sidebarOpen = false;

document.getElementById("busca").addEventListener("click", function() {
  if (!sidebarOpen) {
    document.getElementById("mySidebar").style.width = "13vw";
    sidebarOpen = true;
  } else {
    document.getElementById("mySidebar").style.width = "0";
    sidebarOpen = false;
  }
});