document.addEventListener('DOMContentLoaded', function () {
    var entrarButton = document.getElementById('entrar');
    
    entrarButton.addEventListener('click', async function () {
        const nickname = document.querySelector("#nickname").value;
        const senha = document.querySelector("#senha").value;
        const response = await fetch("/login", {
            method: "POST",
            body: JSON.stringify({ nickname, senha })
        });

        if (response.ok) {
            const data = await response.json();
            if (data && data.message === "Login efetuado com sucesso!" && data.usuario && data.usuario.id_usuario) {
                localStorage.setItem("token", data.token);
                window.location.href = "/home";
            } else {
                alert('Ops! Usuário inexistente');
            }
        } else {
            alert('Ops! Usuário inexistente');
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {

    const entrarButton = document.querySelector("#entrar");
    const usuarioInput = document.querySelector("#nickname");
    const senhaInput = document.querySelector("#senha");

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            entrarButton.click();
        }
    }

    usuarioInput.addEventListener("keypress", handleKeyPress);
    senhaInput.addEventListener("keypress", handleKeyPress);
});
