// Aguarda o carregamento total do DOM antes de executar o script
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // SELEÇÃO DE ELEMENTOS DO DOM
    // ==========================================
    const toggleDarkModeBtn = document.getElementById("toggle-dark-mode");
    const quizForm = document.getElementById("agro-quiz");
    const steps = document.querySelectorAll(".quiz-step");
    const quizContainer = document.querySelector(".quiz-container");
    const feedbackDiv = document.getElementById("quiz-feedback");
    const resultCard = document.getElementById("quiz-result");
    const resultText = document.getElementById("result-text");
    
    // Botões de controle
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");
    const btnSubmit = document.getElementById("btn-submit");
    const btnRestart = document.getElementById("btn-restart");

    // Gabarito do Quiz
    const correctAnswers = {
        q1: "B",
        q2: "C",
        q3: "A",
        q4: "B",
        q5: "A",
        q6: "A"
    };

    let currentStep = 1;
    const totalSteps = steps.length;

    // ==========================================
    // CONTROLADOR DO MODO ESCURO (DARK MODE)
    // ==========================================
    toggleDarkModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        
        // Altera dinamicamente o texto do botão baseado na situação
        if (document.body.classList.contains("dark-mode")) {
            toggleDarkModeBtn.textContent = "Modo Claro";
        } else {
            toggleDarkModeBtn.textContent = "Modo Escuro";
        }
    });

    // ==========================================
    // GERENCIAMENTO DA MUDANÇA DE CORES DO MEIO AMBIENTE
    // ==========================================
    function updateEnvironmentColor(step) {
        // Remove todas as classes antigas de ambiente
        quizContainer.className = "quiz-container"; 
        
        // Adiciona a classe correspondente ao passo atual para acionar o CSS
        quizContainer.classList.add(`env-step-${step}`);
    }

    // Inicializa a cor do primeiro passo
    updateEnvironmentColor(currentStep);

    // ==========================================
    // FLUXO DE NAVEGAÇÃO DO QUIZ (PASSOS)
    // ==========================================
    function showStep(stepNumber) {
        steps.forEach(step => {
            step.classList.add("hidden");
            step.classList.remove("active");
        });

        const activeStep = document.querySelector(`.quiz-step[data-step="${stepNumber}"]`);
        activeStep.classList.remove("hidden");
        activeStep.classList.add("active");

        // Atualização dos botões controladores
        btnPrev.disabled = (stepNumber === 1);
        
        if (stepNumber === totalSteps) {
            btnNext.classList.add("hidden");
            btnSubmit.classList.remove("hidden");
        } else {
            btnNext.classList.remove("hidden");
            btnSubmit.classList.add("hidden");
        }

        // Limpa mensagens de erro ao navegar
        hideFeedback();
        
        // Muda as cores do meio ambiente a cada transição de tela
        updateEnvironmentColor(stepNumber);
    }

    // ==========================================
    // VALIDAÇÃO SIMPLES
    // ==========================================
    function validateCurrentStep() {
        const activeStepEl = document.querySelector(`.quiz-step[data-step="${currentStep}"]`);
        const checkedRadio = activeStepEl.querySelector('input[type="radio"]:checked');
        
        if (!checkedRadio) {
            showFeedback("Por favor, selecione uma opção antes de prosseguir!", "error");
            return false;
        }
        return true;
    }

    // Gerenciador de exibição de feedbacks/alertas
    function showFeedback(text, type) {
        feedbackDiv.textContent = text;
        feedbackDiv.className = `feedback-message ${type}`;
    }

    function hideFeedback() {
        feedbackDiv.className = "feedback-message hidden";
    }

    // Eventos dos Botões de Navegação
    btnNext.addEventListener("click", () => {
        if (validateCurrentStep()) {
            currentStep++;
            showStep(currentStep);
        }
    });

    btnPrev.addEventListener("click", () => {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });

    // ==========================================
    // PROCESSAMENTO DO RESULTADO DO QUIZ
    // ==========================================
    quizForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Impede o recarregamento padrão da página

        // Valida a última questão antes de aceitar o envio
        if (!validateCurrentStep()) return;

        let score = 0;
        const formData = new FormData(quizForm);

        // Compara os dados selecionados com o gabarito correto
        for (let key in correctAnswers) {
            if (formData.get(key) === correctAnswers[key]) {
                score++;
            }
        }

        // Esconde o formulário do quiz e exibe a tela de resultados
        quizForm.classList.add("hidden");
        hideFeedback();
        resultCard.classList.remove("hidden");

        // Mensagem dinâmica baseada no desempenho do usuário
        if (score === totalSteps) {
            resultText.innerHTML = `🌟 Perfeito! Você acertou <strong>${score} de ${totalSteps}</strong>. Você domina a arquitetura de biomas e o agro sustentável!`;
        } else if (score >= 4) {
            resultText.innerHTML = `🌱 Muito bom! Você acertou <strong>${score} de ${totalSteps}</strong>. Tem uma ótima base sobre o equilíbrio ambiental!`;
        } else {
            resultText.innerHTML = `🍂 Você acertou <strong>${score} de ${totalSteps}</strong>. Que tal reler o texto sobre Arquitetura de
