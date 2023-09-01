document.querySelector("#cadastrar").addEventListener("click", async () => {
    const nickname = document.querySelector("#nickname").value;
    const senha = document.querySelector("#senha").value;
    const telefone = document.querySelector("#telefone").value;
    const tecnologia = document.querySelector("#tecnologia").value;
    const passwordconfirmed = document.querySelector("#confSenha").value;

    if (nickname === "" || password === "" || passwordconfirmed === "") {
        alert("Por favor, preencha todos os campos antes de continuar.");
        return;
    }

    if (password !== passwordconfirmed) {
        alert("Confirmação da senha e senha estão diferentes.");
        return;
    }

    const response = await fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nickname, senha, telefone, tecnologia})
    });

    const data = await response.json();

    if (data.message === "Usuário criado com sucesso!") {
            alert("Usuário criado com sucesso!");
    } else {
        alert("Erro ao criar o usuário!");
    }
});