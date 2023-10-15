document.querySelector("#cadastrar").addEventListener("click", async () => {

    const nickname = document.querySelector("#nickname").value;
    const senha = document.querySelector("#senha").value;
    const telefone = document.querySelector("#telefone").value;
    const tecnologia = document.querySelector("#tecnologia").value;
    const passwordconfirmed = document.querySelector("#confSenha").value;

    if (nickname === "" || senha === "" || passwordconfirmed === "") {
        alert("Por favor, preencha todos os campos antes de continuar.");
        return;
    }

    if (senha !== passwordconfirmed) {
        alert("Confirmação da senha e senha estão diferentes.");
        return;
    }

    const resposta = await fetch("/register", {
        method: "POST",
        body: JSON.stringify({ nickname, senha, telefone, tecnologia })
    });

    const data = await resposta.json();

    if (data.message === "Usuário criado com sucesso!") {

        var toastCerto = document.getElementById("toastCerto");
        toastCerto.style.display = "block";

        document.querySelector("#nickname").value = "";
        document.querySelector("#senha").value = "";
        document.querySelector("#telefone").value = "";
        document.querySelector("#tecnologia").value = "";
        document.querySelector("#confSenha").value = "";

        setTimeout(function () {
            toastCerto.style.display = "none";
            window.location.href = "/login";
        }, 3000);
    } else {
        alert("Erro ao criar o usuário!");
    }

});