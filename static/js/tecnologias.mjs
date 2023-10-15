import { iconeSelecionado, moduloBarraLateral } from './global.mjs';

iconeSelecionado();

var barraLateral = moduloBarraLateral();
document.getElementById("busca").addEventListener("click", barraLateral.alternarBarraLateral);
