/**
 * PROJETO: Agro Forte, Futuro Sustentável
 * SCRIPT: Manipulação dinâmica do Quiz, validações e Modo Escuro.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. GERENCIAMENTO DO MODO ESCURO
    // ==========================================================================
    const toggleDarkModeBtn = document.getElementById('toggle-dark-mode');
    const bodyElement = document.body;
    const modeIcon = toggleDarkModeBtn.querySelector('.icon');
    const modeText = toggleDarkModeBtn.querySelector('.text');

    toggleDarkModeBtn.addEventListener('click', () => {
        // Verifica o tema atual e alterna
        if (bodyElement.getAttribute('data-theme') === 'dark') {
            bodyElement.removeAttribute('data-theme');
            modeIcon.textContent = '🌙';
            modeText.textContent = 'Modo Escuro';
        } else {
            bodyElement.setAttribute('data-theme', 'dark');
            modeIcon.textContent = '☀️';
            modeText.textContent = 'Modo Claro';
        }
    });

    // ==========================================================================
    // 2. PROCESSAMENTO E VALIDAÇÃO DO QUIZ
    // ==========================================================================
    const quizForm = document.getElementById('quiz-form');
    const resultBox = document.getElementById('quiz-result');

    // Gabarito oficial do Quiz (6 questões)
    const correctAnswers = {
        q1: 'B',
        q2: 'A',
        q3: 'C',
        q4: 'A',
        q5: 'B',
        q6: 'A'
    };

    quizForm.addEventListener('submit', (event) => {
        // Impede o recarregamento automático da página
        event.preventDefault();

        // Coleta de dados utilizando a API FormData do HTML5
        const formData = new FormData(quizForm);
        let answeredCount = 0;
        let score = 0;

        // Validação simples: verificar se o usuário respondeu todas as 6 perguntas
        for (let i = 1; i <= 6; i++) {
            if (formData.has(`q${i}`)) {
                answeredCount++;
                // Se a resposta bater com o gabarito, soma ponto
                if (formData.get(`q${i}`) === correctAnswers[`q${i}`]) {
                    score++;
                }
            }
        }

        // Exibição de mensagens dinâmicas baseadas na validação e na performance
        resultBox.classList.remove('hidden', 'success', 'error');

        if (answeredCount < 6) {
            // Caso falte responder alguma questão (Validação)
            resultBox.textContent = `⚠️ Atenção: Você respondeu apenas ${answeredCount} de 6 perguntas. Por favor, responda todas antes de enviar!`;
            resultBox.classList.add('error');
        } else {
            // Feedback final dinâmico baseado nos acertos
            resultBox.classList.add('success');
            
            if (score === 6) {
                resultBox.textContent = `🌱 Excelente! Você acertou todas as ${score} questões. Você entende perfeitamente a Arquitetura de Biomas e a importância do Agro Sustentável!`;
            } else if (score >= 4) {
                resultBox.textContent = `👍 Muito bom! Você acertou ${score} de 6 questões. Tem uma ótima base sobre o equilíbrio entre produção e meio ambiente.`;
            } else {
                resultBox.textContent = `🌾 Você acertou ${score} de 6 questões. Que tal reler o conteúdo sobre Biomas para aprender um pouco mais sobre práticas sustentáveis?`;
            }
        }

        // Rolar suavemente a tela até o container de resultado
        resultBox.scrollIntoView({ behavior: 'smooth' });
    });
});
