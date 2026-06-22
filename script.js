// Perguntas do Quiz
const questions = [
    {
        question: "O que é mais importante ao compartilhar uma notícia gerada por IA?",
        answers: [
            { text: "Verificar se a informação é verdadeira antes de espalhar.", correct: true },
            { text: "Compartilhar imediatamente se for engraçada.", correct: false },
            { text: "Apenas curtir, pois tudo na internet é real.", correct: false }
        ]
    },
    {
        question: "Qual atitude demonstra boa Cidadania Digital?",
        answers: [
            { text: "Usar IA para criar imagens falsas de colegas.", correct: false },
            { text: "Respeitar a opinião dos outros e proteger seus dados.", correct: true },
            { text: "Ignorar as regras de segurança dos sites.", correct: false }
        ]
    },
    {
        question: "Se uma IA coletar seus dados pessoais, você deve:",
        answers: [
            { text: "Não se importar, dados não são importantes.", correct: false },
            { text: "Aceitar todos os termos sem ler.", correct: false },
            { text: "Ler as políticas de privacidade e saber como eles serão usados.", correct: true }
        ]
    },
    {
        question: "O termo 'Pegada Digital' refere-se a:",
        answers: [
            { text: "O rastro de informações que você deixa ao usar a internet.", correct: true },
            { text: "A marca do seu dedo na tela do celular.", correct: false },
            { text: "A velocidade da sua conexão de internet.", correct: false }
        ]
    },
    {
        question: "O que é um 'Deepfake'?",
        answers: [
            { text: "Um antivírus super potente.", correct: false },
            { text: "Vídeos ou áudios alterados por IA para parecerem reais.", correct: true },
            { text: "Um jogo de realidade virtual.", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionTextElement = document.getElementById('question-text');
const optionsContainerElement = document.getElementById('options-container');
const resultContainerElement = document.getElementById('result-container');
const questionContainerElement = document.getElementById('question-container');
const scoreTextElement = document.getElementById('score-text');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainerElement.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionTextElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        optionsContainerElement.appendChild(button);
    });
}

function resetState() {
    while (optionsContainerElement.firstChild) {
        optionsContainerElement.removeChild(optionsContainerElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    
    if (isCorrect) {
        score++;
        selectedButton.style.backgroundColor = "var(--accent-color)";
    } else {
        selectedButton.style.backgroundColor = "#ef4444"; // Vermelho para erro
    }

    // Espera 1 segundo para mostrar a próxima pergunta ou o resultado
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

function showResult() {
    questionContainerElement.classList.add('hide');
    resultContainerElement.classList.remove('hide');
    scoreTextElement.innerText = `Você acertou ${score} de ${questions.length} perguntas!`;
}

// Inicia o jogo automaticamente ao carregar a página
window.onload = startQuiz;
