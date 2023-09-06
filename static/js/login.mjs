document.addEventListener('DOMContentLoaded', function () {
    var entrarButton = document.getElementById('entrar');
    
        entrarButton.addEventListener('click', async function () {
            const nickname = document.querySelector("#nickname").value;
            const senha = document.querySelector("#senha").value;
    
            try {
                const response = await fetch("/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ nickname, senha })
                });
    
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.message === "Login efetuado com sucesso!" && data.usuario && data.usuario.id_usuario) {
                        localStorage.setItem("token", data.token);
                        modificarIdUsuario(data.usuario.id_usuario);
                        window.location.href = "/home";
                    } else {
                        alert('Ops! Invalid response data.');
                    }
                } else {
                    alert('Authentication failed. Please check your credentials.');
                }

        });
    }
});
