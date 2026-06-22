// Lista de perguntas do jogo
const perguntas = [
    {
        pergunta: "O que é um 'Deepfake'?",
        alternativas: [
            "Um antivírus de última geração baseado em IA.",
            "Vídeos ou áudios gerados por IA que imitam pessoas reais dizendo coisas que não disseram.",
            "Um perfil em rede social que só posta notícias verdadeiras.",
            "Uma inteligência artificial que ajuda a limpar dados antigos do computador."
        ],
        correta: 1 // Índice da alternativa correta (começa em 0)
    },
    {
        pergunta: "Ao usar uma IA para gerar um texto escolar, qual é a atitude eticamente correta?",
        alternativas: [
            "Copiar e colar o texto fingindo que foi você quem escreveu por completo.",
            "Usar a IA como apoio para ideias, mas escrever com suas palavras e citar o uso da ferramenta.",
            "Não entregar o trabalho e dizer que a IA apagou os arquivos.",
            "Vender o texto gerado pela IA para seus colegas de classe."
        ],
        correta: 1
    },
    {
        pergunta: "O que significa o termo 'Viés Algorítmico' na Inteligência Artificial?",
        alternativas: [
            "Quando a IA fica muito rápida no processamento de dados.",
            "Quando uma IA aprende preconceitos humanos presentes nos dados usados para treiná-la.",
            "O cabo físico que conecta os servidores de inteligência artificial.",
            "Um sistema que impede ataques de hackers."
        ],
        correta: 1
    },
    {
        pergunta: "Qual dessas ações protege sua privacidade ao interagir com assistentes virtuais ou IAs?",
        alternativas: [
            "Compartilhar senhas e dados bancários para a IA guardar.",
            "Digitar o endereço completo e rotina diária de toda a sua família.",
            "Evitar inserir dados pessoais sensíveis nas plataformas de conversação.",
            "Deixar a câmera e o microfone ligados transmitindo dados 24 horas por dia."
        ],
        correta: 2
    },
    {
        pergunta: "Como o bom Cidadão Digital deve reagir ao ver uma notícia duvidosa gerada por IA?",
        alternativas: [
            "Compartilhar imediatamente em todos os grupos para avisar os outros.",
            "Ignorar completamente e não fazer nada a respeito.",
            "Verificar em fontes de notícias confiáveis e agências de checagem antes de repassar.",
            "Comentar na publicação dizendo que é 100% real sem pesquisar."
        ],
        correta: 2
    }
];

// Elementos da DOM
const elementoPergunta = document.getElementById("pergunta");
const containerBotoes = document.getElementById("botoes-alternativas");
const containerControles = document.getElementById("controles");
const botaoProximo = document.getElementById("botao-proximo");
const containerResultado = document.getElementById("resultado-container");
const textoResultado = document.getElementById("texto-resultado");
const botaoReiniciar = document.getElementById("botao-reiniciar");
const quizContainer = document.getElementById("quiz");

let indicePerguntaAtual = 0;
let pontuacao = 0;

// Inicializa o Jogo
function iniciarJogo() {
    indicePerguntaAtual = 0;
    pontuacao = 0;
    containerResultado.classList.add("escondido");
    quizContainer.classList.remove("escondido");
    mostrarPergunta();
}

// Mostra a pergunta atual e as alternativas
function mostrarPergunta() {
    resetarEstado();
    let perguntaAtual = perguntas[indicePerguntaAtual];
    elementoPergunta.innerText = perguntaAtual.pergunta;

    perguntaAtual.alternativas.forEach((alternativa, index) => {
        const botao = document.createElement("button");
        botao.innerText = alternativa;
        botao.classList.add("btn-opcao");
        botao.addEventListener("click", () => selecionarAlternativa(index, botao));
        containerBotoes.appendChild(botao);
    });
}

// Limpa os botões antigos
function resetarEstado() {
    containerControles.classList.add("escondido");
    while (containerBotoes.firstChild) {
        containerBotoes.removeChild(containerBotoes.firstChild);
    }
}

// Trata a escolha do usuário
function selecionarAlternativa(indiceSelecionado, botaoClicado) {
    let indiceCorreto = perguntas[indicePerguntaAtual].correta;
    let todosBotoes = containerBotoes.querySelectorAll(".btn-opcao");

    if (indiceSelecionado === indiceCorreto) {
        botaoClicado.classList.add("correto");
        pontuacao++;
    } else {
        botaoClicado.classList.add("errado");
        // Mostra visualmente qual era a correta
        todosBotoes[indiceCorreto].classList.add("correto");
    }

    // Desativa todos os botões para não clicar de novo
    todosBotoes.forEach(botao => botao.disabled = true);
    containerControles.classList.remove("escondido");
}

// Passa para a próxima pergunta ou exibe o fim do jogo
botaoProximo.addEventListener("click", () => {
    indicePerguntaAtual++;
    if (indicePerguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
});

// Mostra a tela final com a pontuação
function mostrarResultado() {
    quizContainer.classList.add("escondido");
    containerResultado.classList.remove("escondido");
    textoResultado.innerText = `Você acertou ${pontuacao} de ${perguntas.length} perguntas!`;
}

// Reiniciar o jogo
botaoReiniciar.addEventListener("click", iniciarJogo);

// Inicia o script quando a página carrega
iniciarJogo();
