// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- Seleção de Elementos do DOM ---
    const toggleDarkModeBtn = document.getElementById('toggle-dark-mode');
    const quizForm = document.getElementById('quiz-form');
    const quizResult = document.getElementById('quiz-result');

    // --- Funcionalidade: Modo Escuro ---
    // Verifica se o usuário já possui uma preferência salva no navegador
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            toggleDarkModeBtn.textContent = '☀️ Modo Claro';
        }
    }

    // Evento de clique para alternar os temas
    toggleDarkModeBtn.addEventListener('click', () => {
        let currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            toggleDarkModeBtn.textContent = '🌓 Modo Escuro';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            toggleDarkModeBtn.textContent = '☀️ Modo Claro';
        }
    });

    // --- Funcionalidade: Validação e Processamento do Quiz ---
    quizForm.addEventListener('submit', (event) => {
        // Previne o comportamento padrão de recarregar a página ao enviar o formulário
        event.preventDefault();

        // Total de perguntas do quiz
        const totalQuestions = 6;
        let score = 0;
        let allAnswered = true;

        // Loop para validação simples: verificar se todas as perguntas possuem resposta
        for (let i = 1; i <= totalQuestions; i++) {
            const checkedOption = document.querySelector(`input[name="q${i}"]:checked`);
            
            if (!checkedOption) {
                allAnswered = false;
                break;
            } else if (checkedOption.value === 'correto') {
                score++;
            }
        }

        // --- Mensagens Dinâmicas e Interações ---
        // Torna a div de resultados visível removendo a classe utilitária
        quizResult.classList.remove('hidden');

        // Se o usuário esqueceu de responder alguma pergunta (Validação)
        if (!allAnswered) {
            quizResult.textContent = '⚠️ Por favor, responda a todas as 6 perguntas antes de enviar!';
            quizResult.className = 'result-box error'; // Aplica estilo visual de erro
            
            // Rola a página suavemente até o aviso de erro
            quizResult.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        // Geração da mensagem dinâmica baseada na performance do usuário
        let feedbackMessage = '';
        if (score === totalQuestions) {
            feedbackMessage = `🏆 Excelente! Você acertou todas (${score}/${totalQuestions}). Você entende perfeitamente como a arquitetura dos biomas suporta um agro sustentável!`;
            quizResult.className = 'result-box success';
        } else if (score >= 4) {
            feedbackMessage = `🌱 Muito bom! Você acertou ${score} de ${totalQuestions}. Tem uma ótima noção de equilíbrio ecológico!`;
            quizResult.className = 'result-box success';
        } else {
            feedbackMessage = `📚 Você acertou ${score} de ${totalQuestions}. Que tal reler o conteúdo sobre Arquitetura de Biomas e tentar novamente?`;
            quizResult.className = 'result-box error';
        }

        // Insere o texto gerado na div de resultado
        quizResult.textContent = feedbackMessage;

        // Rola a tela suavemente para exibir o resultado final
        quizResult.scrollIntoView({
