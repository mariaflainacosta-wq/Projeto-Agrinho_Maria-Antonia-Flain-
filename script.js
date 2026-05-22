// Aguarda o carregamento completo do DOM para evitar erros de execução
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. REQUISITO: GERENCIAMENTO DO MODO ESCURO
    // ==========================================================================
    const btnDarkMode = document.getElementById("toggle-dark-mode");
    
    btnDarkMode.addEventListener("click", () => {
        // Verifica o tema atual no atributo customizado do HTML
        const currentTheme = document.documentElement.getAttribute("data-theme");
        
        if (currentTheme === "dark") {
            document.documentElement.removeAttribute("data-theme");
            btnDarkMode.textContent = "Modo Escuro";
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            btnDarkMode.textContent = "Modo Claro";
        }
    });

    // ==========================================================================
    // 2. REQUISITO: VALIDAÇÃO E DINÂMICA DO QUIZ
    // ==========================================================================
    const quizForm = document.getElementById("quiz-form");
    const feedbackArea = document.getElementById("quiz-feedback");

    quizForm.addEventListener("submit", (event) => {
        // Impede que a página recarregue ao submeter o formulário
        event.preventDefault();

        // Coleta de dados utilizando FormData do próprio JavaScript
        const formData = new FormData(quizForm);
        const q1Response = formData.get("q1");
        const q2Response = formData.get("q2");

        // Validação Simples: O usuário respondeu todas as perguntas?
        if (!q1Response || !q2Response) {
            exibirFeedback("Por favor, responda a todas as questões antes de enviar!", "atencao");
            return; 
        }

        // Contabilização de Acertos
        let acertos = 0;
        if (q1Response === "correto") acertos++;
        if (q2Response === "correto") acertos++;

        // Geração de Mensagem Dinâmica baseada na performance
        let mensagemFinal = "";
        if (acertos === 2) {
            mensagemFinal = `Excelente! Você acertou ${acertos}/2. Você compreende perfeitamente como balancear a produção com a Arquitetura de Biomas! 🌱`;
            exibirFeedback(mensagemFinal, "sucesso");
        } else {
            mensagemFinal = `Você acertou ${acertos}/2. Que tal ler o conteúdo acima novamente e tentar otimizar sua resposta pelo bem do ecossistema?`;
            exibirFeedback(mensagemFinal, "atencao");
        }
    });

    // Função Auxiliar para manipulação do DOM e exibição de alertas visuais
    function exibirFeedback(texto, classeEstilo) {
        // Remove configurações anteriores
        feedbackArea.className = "";
        
        // Adiciona o texto dinâmico e aplica a classe CSS correta
        feedbackArea.textContent = texto;
        feedbackArea.classList.add(classeEstilo);
        
        // Efeito simples de animação/foco visual via JS scroll suave
        feedbackArea.scrollIntoView({ behavior: 'smooth' });
    }
});
