const iniciar = document.getElementById("iniciar");

const arvores = document.getElementById("arvores");
const agua = document.getElementById("agua");
const especies = document.getElementById("especies");

const mensagem = document.getElementById("mensagem");

const modoEscuro = document.getElementById("modoEscuro");

modoEscuro.addEventListener("click", () => {
    document.body.classList.toggle("claro");
});

iniciar.addEventListener("click", () => {

    const escolhas =
    document.querySelectorAll(".acaoCheck:checked");

    let pontos = 0;

    escolhas.forEach(item => {
        pontos += Number(item.value);
    });

    const totalArvores = pontos * 1000;
    const totalAgua = pontos * 5000;
    const totalEspecies = pontos * 4;

    animarContador(arvores, totalArvores);
    animarContador(agua, totalAgua);
    animarContador(especies, totalEspecies);

    if(pontos <= 20){

        mensagem.textContent =
        "⚠️ Poucas ações sustentáveis foram escolhidas. O planeta ainda enfrenta grandes desafios ambientais.";

    }
    else if(pontos <= 50){

        mensagem.textContent =
        "🌱 Você já está contribuindo para um futuro melhor, mas ainda existem oportunidades para ampliar os impactos positivos.";

    }
    else if(pontos <= 80){

        mensagem.textContent =
        "🌳 Excelente! Suas escolhas ajudam a preservar recursos naturais e fortalecer a produção sustentável.";

    }
    else{

        mensagem.textContent =
        "🌎 Incrível! Você construiu um cenário de equilíbrio entre produção agrícola, preservação ambiental e qualidade de vida para as futuras gerações.";

    }

});

document.querySelectorAll(".acao").forEach(card => {

    card.addEventListener("click", () => {

        const valor = card.dataset.valor;

        if(valor == 1){

            mensagem.textContent =
            "Milhares de árvores foram recuperadas e novos corredores ecológicos surgiram.";

        }

        if(valor == 2){

            mensagem.textContent =
            "A tecnologia reduziu desperdícios e preservou milhões de litros de água.";

        }

        if(valor == 3){

            mensagem.textContent =
            "Abelhas e outros polinizadores voltaram a prosperar.";

        }

        if(valor == 4){

            mensagem.textContent =
            "A agricultura inteligente aumentou a produção sem ampliar áreas de cultivo.";

        }

    });

});

function animarContador(elemento, destino){

    let atual = 0;

    const intervalo = setInterval(() => {

        atual += Math.ceil(destino / 100);

        if(atual >= destino){

            atual = destino;
            clearInterval(intervalo);
        }

        elemento.textContent =
        atual.toLocaleString('pt-BR');

    },20);

}