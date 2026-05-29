// Banco de dados do Quiz contendo as 6 perguntas baseadas na arquitetura de biomas e sustentabilidade
const quizData = [
    {
        id: 1,
        question: "Qual técnica de arquitetura de bioma integra árvores arbóreas com cultivos agrícolas no mesmo espaço?",
        options: [
            "Monocultura intensiva",
            "Sistema Agroflorestal (SAF)",
            "Desmatamento seletivo",
            "Tratamento químico do solo"
        ],
        correct: 1
    },
    {
        id: 2,
        question: "Para preservar a arquitetura hídrica do bioma Cerrado, qual estrutura natural deve ser mantida intacta?",
        options: [
            "As matas de galeria e nascentes",
            "As estradas de escoamento rápido",
            "Apenas o solo sem vegetação rasteira",
            "Áreas de queimada controlada total"
        ],
        correct: 0
    },
    {
        id: 3,
        question: "Como os corredores ecológicos auxiliam a sustentabilidade nos biomas fragmentados pela agricultura?",
        options: [
            "Isolando completamente as espécies",
            "Permitindo o trânsito livre de tratores",
            "Conectando fragmentos florestais para fluxo da fauna e flora",
            "Aumentando a área interna de pastagens abertas"
        ],
        correct: 2
    },
    {
        id: 4,
        question: "A arquitetura do bioma Caatinga exige técnicas agrícolas adaptadas a qual característica predominante?",
        options: [
            "Inundações constantes",
            "Alta pluviosidade anual",
            "Clima semiárido e escassez hídrica sazonal",
            "Solos congelados (permafrost)"
        ],
        correct: 2
    },
    {
        id: 5,
        question: "Manter a 'arquitetura de estratos' (plantas baixas, médias e árvores altas) na Amazônia ajuda diretamente a:",
        options: [
            "Reduzir a umidade natural do ar",
            "Manter o microclima e a fertilidade orgânica do solo",
            "Facilitar o uso de colheitadeiras pesadas",
            "Eliminar completamente os polinizadores nativos"
        ],
        correct: 1
    },
    {
        id: 6,
        question: "O conceito de 'Agro forte, futuro sustentável' defende primordialmente que:",
        options: [
            "A produção deve crescer ignorando os limites dos biomas",
            "O meio ambiente deve ser intocado e a agricultura extinta",
            "É impossível produzir alimentos sem destruir ecossistemas",
            "A produção agrícola e o equilíbrio ambiental são interdependentes e coexistem"
        ],
        correct: 3
    }
];

// Seleção de elementos do DOM
const quizContainer = document.getElementById('quiz-container');
const btnSubmit = document.getElementById('btn-submit-quiz');
const feedbackDiv = document.getElementById('quiz-feedback');
const resultDiv = document.getElementById('quiz-result');
const btnDarkMode = document.getElementById('toggle-dark-mode');

// Função para renderizar as perguntas do Quiz na tela dinamicamente
function loadQuiz() {
    quizContainer.innerHTML = ""; // Limpa o container antes de renderizar

    quizData.forEach((item, index) => {
        // Cria o elemento da pergunta
        const quizItem = document.createElement('div');
        quizItem.classList.add('quiz-item');

        // Estrutura HTML interna da pergunta
        let optionsHTML = '';
        item.options.forEach((option, oIndex) => {
            optionsHTML += `
                <label>
                    <input type="radio" name="question${index}" value="${oIndex}">
                    ${option}
                </label>
            `;
        });

        quizItem.innerHTML = `
            <p class="quiz-question">${index + 1}. ${item.question}</p>
            <div class="quiz-options">
                ${optionsHTML}
            </div>
        `;

        quizContainer.appendChild(quizItem);
    });
}

// Evento para validação simples e correção do Quiz
btnSubmit.addEventListener('click', () => {
    let score = 0;
    let allAnswered = true;

    // Reset de estados das mensagens dinâmicas
    feedbackDiv.classList.add('hidden');
    feedbackDiv.classList.remove('error');
    resultDiv.classList.add('hidden');

    // Validação simples: verifica se o usuário respondeu todas as 6 perguntas
    quizData.forEach((_, index) => {
        const checkedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (!checkedOption) {
            allAnswered = false;
        }
    });

    // Mensagem Dinâmica de Validação se houver campos em branco
    if (!allAnswered) {
        feedbackDiv.textContent = "⚠️ Por favor, responda todas as 6 perguntas antes de enviar!";
        feedbackDiv.classList.add('error');
        feedbackDiv.classList.remove('hidden');
        return; // Interrompe a execução
    }

    // Processamento das respostas se a validação passar
    quizData.forEach((item, index) => {
        const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`).value;
        if (parseInt(selectedAnswer) === item.correct) {
            score++;
        }
    });

    // Mensagem Dinâmica e Interativa baseada na pontuação do usuário
    let performanceMessage = "";
    if (score === 6) {
        performanceMessage = "Excelente! Você domina a Arquitetura de Biomas e a Agroecologia! 🌾💚";
    } else if (score >= 4) {
        performanceMessage = "Muito bom! Você entende os conceitos de equilíbrio ecológico no campo! 🚜🌱";
    } else {
        performanceMessage = "Bom esforço! Que tal reler o texto sobre Arquitetura de Biomas e tentar novamente? 🌍🍃";
    }

    // Exibe o placar de resultados final formatado
    resultDiv.innerHTML = `
        <h3>Resultado do Desafio</h3>
        <p>Você acertou <strong>${score}</strong> de <strong>${quizData.length}</strong> questões.</p>
        <p><em>${performanceMessage}</em></p>
    `;
    resultDiv.classList.remove('hidden');
});

// Evento e lógica para alternância do Modo Escuro
btnDarkMode.addEventListener('click', () => {
    // Altera o atributo customizado no elemento <html> para ativar as regras do CSS correspondentes
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        btnDarkMode.textContent = "🌓 Modo Escuro";
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        btnDarkMode.textContent = "☀️ Modo Claro";
    }
});

// Executa a inicialização do quiz ao carregar a página
document.addEventListener('DOMContentLoaded', loadQuiz);

       
   
