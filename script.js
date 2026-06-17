// Aguarda o carregamento do DOM para evitar erros de execução
document.addEventListener('DOMContentLoaded', () => {

    // --- REQUISITO: Acessibilidade / Modo Escuro ---
    const toggleBtn = document.getElementById('toggle-dark-mode');
    
    toggleBtn.addEventListener('click', () => {
        // Altera a classe no body disparando a troca de variáveis CSS
        document.body.classList.toggle('dark-mode');
        
        // Breve feedback textual de mudança de estado do botão
        if (document.body.classList.contains('dark-mode')) {
            toggleBtn.textContent = '☀️ Modo Claro';
        } else {
            toggleBtn.textContent = '🌓 Modo Escuro';
        }
    });

    // --- REQUISITO: Manipulação dinâmica do DOM / Quiz Interativo ---
    const quizForm = document.getElementById('quiz-form');
    const feedbackBox = document.getElementById('quiz-feedback');

    quizForm.addEventListener('submit', (event) => {
        // Impede o recarregamento padrão da página ao enviar formulário
        event.preventDefault(); 

        // Captura do dado inserido e armazenamento em variável para processamento
        const userAnswer = document.getElementById('quiz-question').value;

        // Limpa classes anteriores de feedback
        feedbackBox.className = 'feedback-box';

        // Processamento lógico da resposta
        if (userAnswer === 'verificar') {
            feedbackBox.textContent = 'Correto! Sempre cruze informações e verifique fontes confiáveis antes de repassar qualquer mídia.';
            feedbackBox.classList.add('success');
        } else {
            feedbackBox.textContent = 'Resposta incorreta. Compartilhar sem checar ou simplesmente ignorar ajuda a propagar conteúdos manipulados de forma prejudicial.';
            feedbackBox.classList.add('error');
        }

        // Exibe a div de feedback removendo a classe utility .hidden
        feedbackBox.classList.remove('hidden');
    });
});
