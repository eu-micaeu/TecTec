window.addEventListener("load", function () {

    setTimeout(function () {

        window.location.href = "/login";

    }, 2000);
    
});

async function getTokenFromCookies() {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === 'token') {
        return value;
      }
    }
    return null;
  }
  
  const token = getTokenFromCookies();
  
  if (token) {
    const respostaPerfilToken = await fetch("/perfil-token", {
      method: "POST",
    });
  
    if (respostaPerfilToken.ok) {
      const informacoesPerfilToken = await respostaPerfilToken.json();
      const nickname = informacoesPerfilToken.usuario.nickname;
  
      const respostaSessaoEntrada = await fetch("/entrada/" + nickname, {
        method: "POST",
      });
  
      if (respostaSessaoEntrada.ok) {
        window.location.href = "/home";
      }
    }
  }