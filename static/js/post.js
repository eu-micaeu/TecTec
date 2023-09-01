const id_usuario = localStorage.getItem("id_usuario").toString();

document.querySelector(".publicar").addEventListener("click", async () => {
    const texto = document.querySelector("#inputPostagem").value;
    const response = await fetch(`/publicar/${id_usuario}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ texto }),
    });
    const data = await response.json();
    document.querySelector("#inputPostagem").value = "";
    localStorage.removeItem("inputPostagem");
    if(data.message === "Postagem criada com sucesso!"){
        alert("Foi publicado");
        window.location.href = "/home";
    }else{
        alert("erro")
    }
});
