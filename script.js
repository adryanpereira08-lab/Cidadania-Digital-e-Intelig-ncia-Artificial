// Perguntas do Quiz sobre Cidadania Digital e IA
const quizData = [
    {
        question: "O que é um 'Deepfake'?",
        options: [
            "Um antivírus avançado feito por IA.",
            "Vídeos ou áudios alterados por IA para parecerem reais, mas que são falsos.",
            "Um tipo de computador quântico.",
            "Um perfil de rede social focado em tecnologia."
        ],
        correct: 1
    },
    {
        question: "Ao usar ferramentas de IA que geram texto ou imagens, qual deve ser sua postura ética?",
        options: [
            "Copiar e colar o resultado fingindo que foi você quem fez tudo.",
            "Não usar, pois toda IA é ilegal.",
            "Verificar as informações e dar os créditos ou indicar o uso da ferramenta se necessário.",
            "Espalhar o resultado sem checar se é verdadeiro ou falso."
        ],
        correct: 2
    },
    {
        question: "Por que devemos nos preocupar com os dados que fornecemos para as IAs?",
        options: [
            "Porque elas podem usar suas informações pessoais para treinar modelos públicos ou violar sua privacidade.",
            "Porque os dados podem quebrar a Inteligência Artificial.",
            "Não precisamos nos preocupar, todas as IAs são 100% seguras.",
            "Porque a IA cobra dinheiro por cada palavra digitada."
        ],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const resultBox = document.getElementById("result-box");
const questionBox = document.getElementById("question-box");
const scoreText = document.getElementById("score-text");

function loadQuestion() {
    resetState();
    let currentQuestion = quizData[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("btn-option");
        button.addEventListener("click", () => selectAnswer(index, button));
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectAnswer(selectedIndex, clickedButton) {
    const correctIndex = quizData[currentQuestionIndex].correct;
    const allButtons = optionsContainer.querySelectorAll(".btn-option");

    // Desabilita todos os botões após o clique para o usuário não clicar duas vezes
    allButtons.forEach(button => button.disabled = true);

    if (selectedIndex === correctIndex) {
        clickedButton.classList.add("correct");
        score++;
    } else {
        clickedButton.classList.add("wrong");
        // Mostra a resposta correta em verde
        allButtons[correctIndex].classList.add("correct");
    }

    // Espera 2 segundos para passar para a próxima pergunta
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 2000);
}

function showResults() {
    questionBox.classList.add("hidden");
    resultBox.classList.remove("hidden");
    scoreText.innerText = `Você acertou ${score} de ${quizData.length} perguntas!`;
}

function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    resultBox.classList.add("hidden");
    questionBox.classList.remove("hidden");
    loadQuestion();
}

// Inicializa o jogo ao carregar a página
window.onload = loadQuestion;
