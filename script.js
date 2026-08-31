// Seleção dos elementos do DOM
const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

// Estrutura de dados com perguntas, alternativas e consequências/textos para a história final
const perguntas = [
    {
        enunciado: "1. Descobrindo a IA: Ao sair da escola, você descobre uma IA avançada capaz de responder a qualquer pergunta e gerar conteúdos realistas. Qual o seu primeiro sentimento em relação a essa inovação?",
        alternativas: [
            {
                texto: "Receio: Acredito que o avanço rápido sem controle pode trazer riscos sérios.",
                afirmacao: "Sua jornada começou com uma postura cautelosa perante o avanço acelerado da IA.",
                perfil: "cauteloso"
            },
            {
                texto: "Entusiasmo: Vejo um potencial incrível para transformar a forma como aprendemos e vivemos.",
                afirmacao: "Desde o início, você enxergou o potencial transformador e otimista das novas tecnologias.",
                perfil: "entusiasta"
            }
        ]
    },
    {
        enunciado: "2. APLICAÇÃO ESCOLAR: Sua professora pede um trabalho sobre a presença de Inteligência Artificial no ambiente de aula. Como você decide estruturar sua pesquisa?",
        alternativas: [
            {
                texto: "Uso assistentes de IA para gerar um resumo inicial e depois aprofundo a análise criticamente.",
                afirmacao: "No ambiente acadêmico, optou por integrar a IA como ferramenta inicial de produtividade.",
                perfil: "entusiasta"
            },
            {
                texto: "Prefiro pesquisar em livros e artigos acadêmicos tradicionais antes de consultar qualquer ferramenta digital.",
                afirmacao: "Na escola, priorizou a pesquisa tradicional para garantir fontes consolidadas e checagem de fatos.",
                perfil: "cauteloso"
            }
        ]
    },
    {
        enunciado: "3. MERCADO DE TRABALHO: Durante um debate escolar sobre as profissões do futuro, surge a dúvida de como a automação afetará os empregos. Como você defende seu ponto de vista?",
        alternativas: [
            {
                texto: "A IA criará novas profissões e substituirá tarefas repetitivas, aumentando a produtividade humana.",
                afirmacao: "Defendeu que a automação impulsionará a evolução do trabalho e a criação de novos cargos.",
                perfil: "entusiasta"
            },
            {
                texto: "A automação desmedida causará desemprego em massa e exigirá regulamentações rígidas de proteção trabalhista.",
                afirmacao: "Alertou sobre os impactos sociais do desemprego gerado pela tecnologia sem controle.",
                perfil: "cauteloso"
            }
        ]
    },
    {
        enunciado: "4. CRIAÇÃO ARTÍSTICA: Você precisa ilustrar um projeto escolar sobre tecnologia. Qual método de produção visual você escolhe utilizar?",
        alternativas: [
            {
                texto: "Desenho a ilustração manualmente ou utilizo softwares tradicionais de edição de imagem.",
                afirmacao: "Valorizou o processo criativo autoral e manual na hora de expressar suas ideias.",
                perfil: "cauteloso"
            },
            {
                texto: "Uso geradores de imagem por IA a partir de prompts detalhados para criar a arte ideal.",
                afirmacao: "Explorou ferramentas de geração de imagem sintética para otimizar sua criação visual.",
                perfil: "entusiasta"
            }
        ]
    },
    {
        enunciado: "5. ÉTICA E RESPONSABILIDADE: Um colega do trabalho em grupo copiou integralmente a resposta dada por um chat de IA sem fazer nenhuma revisão. Como você reage?",
        alternativas: [
            {
                texto: "Explicito que o uso da IA deve ser um apoio complementar, exigindo revisão crítica e autoria própria.",
                afirmacao: "Reforçou a importância da responsabilidade, ética e pensamento crítico no uso da tecnologia.",
                perfil: "cauteloso"
            },
            {
                texto: "Aceito o texto como está, considerando que a resposta da ferramenta já é suficiente para a entrega.",
                afirmacao: "Confia plenamente na precisão dos modelos automatizados para entregas diretas.",
                perfil: "entusiasta"
            }
        ]
    }
];

// Variáveis de controle de estado
let posicaoAtual = 0;
let perguntaAtual;
let historiaFinal = "";
let pontuacaoEntusiasta = 0;
let pontuacaoCauteloso = 0;

// Criação dinâmica da barra de progresso no topo da caixa
const barraProgressoContainer = document.createElement("div");
barraProgressoContainer.className = "barra-progresso-container";
const barraProgressoPreenchimento = document.createElement("div");
barraProgressoPreenchimento.className = "barra-progresso-preenchimento";
barraProgressoContainer.appendChild(barraProgressoPreenchimento);
caixaPrincipal.insertBefore(barraProgressoContainer, caixaPrincipal.firstChild);

// Atualiza a barra de progresso visual
function atualizaBarraProgresso() {
    const porcentagem = (posicaoAtual / perguntas.length) * 100;
    barraProgressoPreenchimento.style.width = `${porcentagem}%`;
}

// Renderiza a pergunta atual ou finaliza
function mostraPergunta() {
    atualizaBarraProgresso();

    if (posicaoAtual >= perguntas.length) {
        exibeResultadoFinal();
        return;
    }
    
    perguntaAtual = perguntas[posicaoAtual];
    
    // Animação suave de troca de pergunta
    caixaPerguntas.style.opacity = "0";
    caixaAlternativas.style.opacity = "0";

    setTimeout(() => {
        caixaPerguntas.textContent = perguntaAtual.enunciado;
        caixaAlternativas.textContent = "";
        mostraAlternativas();
        
        caixaPerguntas.style.opacity = "1";
        caixaAlternativas.style.opacity = "1";
    }, 200);
}

// Cria os botões para cada alternativa
function mostraAlternativas() {
    perguntaAtual.alternativas.forEach((alternativa, index) => {
        const botaoAlternativa = document.createElement("button");
        botaoAlternativa.textContent = alternativa.texto;
        botaoAlternativa.setAttribute("data-index", index);
        
        // Listener que dispara ao escolher a opção
        botaoAlternativa.addEventListener("click", () => processaResposta(alternativa));
        caixaAlternativas.appendChild(botaoAlternativa);
    });
}

// Processa a escolha do usuário
function processaResposta(opcaoSelecionada) {
    // Acumula a história e o perfil
    historiaFinal += opcaoSelecionada.afirmacao + " ";
    
    if (opcaoSelecionada.perfil === "entusiasta") {
        pontuacaoEntusiasta++;
    } else {
        pontuacaoCauteloso++;
    }

    posicaoAtual++;
    mostraPergunta();
}

// Apresenta o resultado final e botão de reiniciar
function exibeResultadoFinal() {
    atualizaBarraProgresso();
    caixaPerguntas.textContent = "Análise do seu Perfil Tecnológico";
    caixaAlternativas.textContent = "";
    
    let resumoPerfil = "";
    if (pontuacaoEntusiasta > pontuacaoCauteloso) {
        resumoPerfil = "Perfil predominantemente Entusiasta e Inovador. Você enxerga a IA como um motor fundamental de produtividade e evolução.";
    } else {
        resumoPerfil = "Perfil predominantemente Cauteloso e Analítico. Você prioriza a ética, a regulamentação e a preservação do discernimento humano.";
    }

    textoResultado.innerHTML = `
        <p><strong>Síntese das suas escolhas:</strong></p>
        <p>${historiaFinal}</p>
        <br>
        <p><strong>Veredito:</strong> ${resumoPerfil}</p>
    `;

    // Botão para reiniciar o quiz
    const botaoReiniciar = document.createElement("button");
    botaoReiniciar.textContent = "Refazer Questionário";
    botaoReiniciar.className = "btn-reiniciar";
    botaoReiniciar.addEventListener("click", reiniciarQuiz);
    caixaAlternativas.appendChild(botaoReiniciar);
}

// Reseta o estado do quiz
function reiniciarQuiz() {
    posicaoAtual = 0;
    historiaFinal = "";
    pontuacaoEntusiasta = 0;
    pontuacaoCauteloso = 0;
    textoResultado.textContent = "";
    mostraPergunta();
}

// Inicializa o script
mostraPergunta();