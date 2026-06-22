// Aguarda o carregamento do DOM para garantir estabilidade
document.addEventListener("DOMContentLoaded", () => {
    
    // --- FUNCIONALIDADE 1: MODO ESCURO ---
    const btnDarkMode = document.getElementById("toggle-dark-mode");
    
    btnDarkMode.addEventListener("click", () => {
        // Altera a classe no body para disparar as variáveis do CSS
        document.body.classList.toggle("dark-mode");
        
        // Atualiza textualmente o botão para melhorar a experiência
        if (document.body.classList.contains("dark-mode")) {
            btnDarkMode.textContent = "☀️ Modo Claro";
        } else {
            btnDarkMode.textContent = "Compartilhar 🌓 Modo Escuro";
        }
    });

    // --- FUNCIONALIDADE 2: VALIDADOR DE QUIZ ANTI-DESINFORMAÇÃO ---
    const btnSubmitQuiz = document.getElementById("btn-submit-quiz");
    const feedbackBox = document.getElementById("quiz-feedback");

    btnSubmitQuiz.addEventListener("click", () => {
        // Captura a opção selecionada usando seletores avançados
        const selectedOption = document.querySelector('input[name="quiz-answer"]:checked');
        
        // Verifica se o usuário respondeu algo antes de processar
        if (!selectedOption) {
            feedbackBox.className = "feedback-error";
            feedbackBox.textContent = "⚠️ Por favor, selecione uma alternativa antes de enviar.";
            return;
        }

        // Armazena o valor em uma variável antes de exibir na tela
        const answerValue = selectedOption.value;

        // Limpa classes anteriores de feedback
        feedbackBox.classList.remove("hidden", "feedback-success", "feedback-error");

        // Condicional e manipulação do DOM baseado na resposta
        if (answerValue === "correto") {
            feedbackBox.classList.add("feedback-success");
            feedbackBox.textContent = "🎉 Parabéns! Você agiu como um cidadão digital consciente. Sempre cheque fontes confiáveis!";
        } else {
            feedbackBox.classList.add("feedback-error");
            feedbackBox.textContent = "❌ Alerta de Risco! Compartilhar mídias sem checar espalha desinformação automatizada por IA. Tente novamente.";
        }
    });
});
