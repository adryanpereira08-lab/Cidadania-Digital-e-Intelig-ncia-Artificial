// Banco de dados de perguntas isolado
const perguntas = [
    {
        pergunta: "O que é um 'Deepfake'?",
        alternativas: [
            "Um antivírus de última geração baseado em IA.",
            "Vídeos ou áudios gerados por IA que imitam pessoas reais dizendo coisas que não disseram.",
            "Um perfil em rede social que só posta notícias verdadeiras.",
            "Uma inteligência artificial que ajuda a limpar dados antigos do computador."
        ],
        correta: 1
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

// Estado da Aplicação
let estadoQuiz = {
    indiceAtual: 0,
    pontuacao: 0
};

// Seletores do DOM
const elementos = {
    pergunta: document.getElementById("pergunta"),
    containerBotoes: document.getElementById("botoes-alternativas"),
    containerControles: document.getElementById("controles"),
    botaoProximo: document.getElementById("botao-proximo"),
    containerResultado: document.getElementById("resultado-container"),
    textoResultado: document.getElementById("texto-resultado"),
    botaoReiniciar: document.getElementById("botao-reiniciar"),
    quizContainer: document.getElementById("quiz")
};

// Inicializa ou reinicia o jogo
function iniciarJogo() {
    estadoQuiz.indiceAtual = 0;
    estadoQuiz.pontuacao = 0;
    elementos.containerResultado.classList.add("escondido");
    elementos.quizContainer.classList.remove("escondido");
    mostrarPergunta();
}

// Renderiza a pergunta da vez
function mostrarPergunta() {
    limparEstadoAnterior();
    const perguntaAtual = perguntas[estadoQuiz.indiceAtual];
    elementos.pergunta.textContent = perguntaAtual.pergunta;

    perguntaAtual.alternativas.forEach((alternativa, index) => {
        const botao = document.createElement("button");
        botao.textContent = alternativa;
        botao.classList.add("btn-opcao");
        botao.addEventListener("click", () => verificarResposta(index, botao));
        elementos.containerBotoes.appendChild(botao);
    });
}

// Reseta a área de botões do quiz
function limparEstadoAnterior() {
    elementos.containerControles.classList.add("escondido");
    elementos.containerBotoes.replaceChildren(); // Método moderno e mais rápido que remover filhos manualmente
}

// Gerencia a resposta selecionada pelo usuário
function verificarResposta(indiceSelecionado, botaoClicado) {
    const indiceCorreto = perguntas[estadoQuiz.indiceAtual].correta;
    const todosBotoes = elementos.containerBotoes.querySelectorAll(".btn-opcao");

    if (indiceSelecionado === indiceCorreto) {
        botaoClicado.classList.add("correto");
        estadoQuiz.pontuacao++;
    } else {
        botaoClicado.classList.add("errado");
        todosBotoes[indiceCorreto].classList.add("correto");
    }

    // Desabilita as opções após a escolha
    todosBotoes.forEach(botao => botao.disabled = true);
    elementos.containerControles.classList.remove("escondido");
}

// Avança o fluxo do quiz
elementos.botaoProximo.addEventListener("click", () => {
    estadoQuiz.indiceAtual++;
    if (estadoQuiz.indiceAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        exibirResultadoFinal();
    }
});

// Mostra o feedback de encerramento
function exibirResultadoFinal() {
    elementos.quizContainer.classList.add("escondido");
    elementos.containerResultado.classList.remove("escondido");
    elementos.textoResultado.textContent = `Você acertou ${estadoQuiz.pontuacao} de ${perguntas.length} perguntas!`;
}

elementos.botaoReiniciar.addEventListener("click", iniciarJogo);

// Execução inicial do Quiz
document.addEventListener("DOMContentLoaded", iniciarJogo);
