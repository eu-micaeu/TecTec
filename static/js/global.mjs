export function iconeSelecionado() {

    document.getElementById('sair').addEventListener('click', async function () {

        const resposta2 = await fetch("/sair", {

            method: "POST",

        });

        if (resposta2.ok) {

            window.location.href='/';
            
        }
        
    })

} 

