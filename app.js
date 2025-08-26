let listaDeNumeros = [];
let limiteDeSorteios = 100

// Gera um número aleatório entre 1 e variável limiteDeSorteios
const gerarNumeroAleatorio = () => {
    let numeroEscolhido = parseInt(Math.random() * limiteDeSorteios) + 1;
    let quantidadeDeNumeros = listaDeNumeros.length;

    if (quantidadeDeNumeros == limiteDeSorteios) {
        listaDeNumeros = [];
        alert('Todos os números já foram escolhidos. O game será reiniciado.');
    }
    if (listaDeNumeros.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumeros.push(numeroEscolhido);
        console.log(listaDeNumeros);
        return numeroEscolhido;
    }
}

// Variáveis número secreto e tentativas, exibe no console para testes
let tentativas = 1;
let numeroSecreto = gerarNumeroAleatorio();
console.log(numeroSecreto);

// Função para exibir textos na tela e falar o texto
const exibirTexto = (tag, texto) => {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', 
    { rate: 1.2 });
}

// Exibe a mensagem inicial do jogo
const exibirMsgInicial = () => {
    exibirTexto('h1', 'Jogo do número secreto');
    exibirTexto('p', `Descubra um número secreto entre 1 e ${limiteDeSorteios}`);
}

exibirMsgInicial();

// Função para verificar o chute do usuário
const verificarChute = () => {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTexto('h1', 'Você acertou!');
        let palavraTentativas = tentativas == 1 ? 'tentativa' : 'tentativas';
        let msgTentativas = `Utilizando ${tentativas} ${palavraTentativas}!`;
        exibirTexto('p', msgTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chutar').setAttribute('disabled', true);
    } else {
        if (chute < numeroSecreto) {
            exibirTexto('h1', 'Você errou!');
            exibirTexto('p', `O número secreto é maior que ${chute}`);
        } else {
            exibirTexto('h1', 'Você errou!');
            exibirTexto('p', `O número secreto é menor que ${chute}`);
        }

        tentativas++;
        limparcampo();
    }
}

// Função para limpar o campo de input
const limparcampo = () => {
    let campo = document.querySelector('input');
    campo.value = '';
}

// Função para reiniciar o jogo
const reiniciargame = () => {
    numeroSecreto = gerarNumeroAleatorio();
    console.log(numeroSecreto);
    tentativas = 1;
    limparcampo();
    exibirMsgInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chutar').removeAttribute('disabled');
}