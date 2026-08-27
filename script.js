const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const perguntas = [
    {
        enunciado: "1. Descobrindo a IA: Ao sair da escola, você descobre uma IA avançada capaz de responder a qualquer pergunta e gerar conteúdos realistas. Qual o seu primeiro sentimento em relação a essa inovação?",
        alternativas: [
            "Receio: Acredito que o avanço rápido sem controle pode trazer riscos sérios.",
            "Entusiasmo: Vejo um potencial incrível para transformar a forma como aprendemos e vivemos."
        ]
    },
    {
        enunciado: "2. APLICAÇÃO ESCOLAR: Sua professora pede um trabalho sobre a presença de Inteligência Artificial no ambiente de aula. Como você decide estruturar sua pesquisa?",
        alternativas: [
            "Uso assistentes de IA para gerar um resumo inicial e depois aprofundo a análise criticamente.",
            "Prefiro pesquisar em livros e artigos acadêmicos tradicionais antes de consultar qualquer ferramenta digital."
        ]
    },
    {
        enunciado: "3. MERCADO DE TRABALHO: Durante um debate escolar sobre as profissões do futuro, surge a dúvida de como a automação afetará os empregos. Como você defende seu ponto de vista?",
        alternativas: [
            "A IA criará novas profissões e substituirá tarefas repetitivas, aumentando a produtividade humana.",
            "A automação desmedida causará desemprego em massa e exigirá regulamentações rígidas de proteção trabalhista."
        ]
    },
    {
        enunciado: "4. CRIAÇÃO ARTÍSTICA: Você precisa ilustrar um projeto escolar sobre tecnologia. Qual método de produção visual você escolhe utilizar?",
        alternativas: [
            "Desenho a ilustração manualmente ou utilizo softwares tradicionais de edição de imagem.",
            "Uso geradores de imagem por IA a partir de promps detalhados para criar a arte ideal."
        ]
    },
    {
        enunciado: "5. ÉTICA E RESPONSABILIDADE: Um colega do trabalho em grupo copiou integralmente a resposta dada por um chat de IA sem fazer nenhuma revisão. Como você reage?",
        alternativas: [
            "Explicito que o uso da IA deve ser um apoio complementar, exigindo revisão crítica e autoria própria.",
            "Aceito o texto como está, considerando que a resposta da ferramenta já é suficiente para a entrega."
        ]
    }
];

let atual = 0;
let perguntaAtual;

function mostraPergunta() {
    if (atual >= perguntas.length) {
        caixaPerguntas.textContent = "Questionário Concluído!";
        caixaAlternativas.textContent = "";
        textoResultado.textContent = "Obrigado por compartilhar suas perspectivas sobre o impacto e o futuro da tecnologia!";
        return;
    }
    
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa;
        botaoAlternativas.addEventListener("click", respostaSelecionada);
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada() {
    atual++;
    mostraPergunta();
}

mostraPergunta();