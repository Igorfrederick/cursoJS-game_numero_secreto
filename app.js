let listaDeNumeros = [];
let limiteDeSorteios = 10

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

let tentativas = 1;
let numeroSecreto = gerarNumeroAleatorio();
console.log(numeroSecreto);

// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Descubra um número secreto entre 1 e 100';

const exibirTexto = (tag, texto) => {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', 
    { rate: 1.2 });
}

// exibirTexto('h1', 'Jogo do número secreto');
// exibirTexto('p', `Descubra um número secreto entre 1 e ${limiteDeSorteios}`);

const exibirMsgInicial = () => {
    exibirTexto('h1', 'Jogo do número secreto');
    exibirTexto('p', `Descubra um número secreto entre 1 e ${limiteDeSorteios}`);
}

exibirMsgInicial();

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

const limparcampo = () => {
    let campo = document.querySelector('input');
    campo.value = '';
}

const reiniciargame = () => {
    numeroSecreto = gerarNumeroAleatorio();
    console.log(numeroSecreto);
    tentativas = 1;
    limparcampo();
    exibirMsgInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chutar').removeAttribute('disabled');
}