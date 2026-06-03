// Me arrependi de fazer isso, mesmo pedido ajuda para IA para me ajudar a entender e fazer minha ideia 
// dar certo nunca tive tanto problema em fazer um gato funcionar, nem sequer necessidade tinha de fazer 
// isso.... a tarefa era só deixar o site bonito.... pq quis fazer isso? 

//pegando imagens e fala do gato
const gato = document.querySelector(".gato");
const fala = document.querySelector("#falaGato");

//pegando botao sim e nao
const btnSim = document.querySelector("#btnSim");
const btnNao = document.querySelector("#btnNao");
const botoes = document.querySelector("#botoesInicio");

//pegando as info para o atualizar
const meioJogo = document.querySelector(".dirMeioJogo");
const placar = document.querySelector(".placar");
const form = document.querySelector("#formJogo");
const input = document.querySelector("#inNumero");
const respErros = document.querySelector("#outErros");
const respChances = document.querySelector("#outChances");
const historico = document.querySelector("#outHistorico");
const placarJogador = document.querySelector("#placarJogador");
const placarGato = document.querySelector("#placarGato");

//sons
const somFeliz = document.querySelector("#somFeliz");
const somTriste = document.querySelector("#somTriste");

// se quiser MUDAR O NUMERO DE TENTATIVAS
const chancesMax = 6;

// se quiser MUDAR ATÉ QUE NUMERO O GATO PODE ESCOLHER
const numeroPossiveis = 100; 

// criando numero aleatorio + vetor de erros
let sorteadoAtual = Math.floor(Math.random() * numeroPossiveis) + 1;
const erros = [];

// dizendo as chances
respChances.innerHTML = chancesMax;

// deixando as info invisivel no comeco (surpresa)
meioJogo.classList.add("oculto");
placar.classList.add("oculto");

function reiniciarJogo() {
    sorteadoAtual = Math.floor(Math.random() * numeroPossiveis) + 1;
    erros.length = 0;
    respErros.innerHTML = 0;
    respChances.innerHTML = chancesMax;
    historico.innerHTML = "Nenhum ainda";
    input.value = "";
    form.querySelector("button").disabled = false;
}

function fimDeJogo() {
    form.querySelector("button").disabled = true;
    setTimeout(() => {
        fala.innerHTML = "Quer jogar de novo?";
        botoes.classList.remove("oculto");
        btnSim.onclick = () => {
            form.querySelector("button").disabled = false;
            reiniciarJogo();
        };
        btnNao.onclick = () => {
            gato.src = "./imgs/gatoTriste.jfif";
            fala.innerHTML = "Ah... tudo bem... tchau 😿";
            setTimeout(() => {
                window.location.href = "https://www.google.com";
            }, 12000);
        };
    }, 2500);
}

// voce quer jogar com o gato (apertou o botao SIM)
btnSim.addEventListener("click", () => {
    somFeliz.currentTime = 0;
    somFeliz.play();
    botoes.classList.add("oculto");
    gato.src = "/imgs/gatoFeliz.jfif";
    fala.innerHTML = "Ebaa!! 😸";
    setTimeout(() => {
    gato.src = "/imgs/gatoPensando.jpg";
    fala.innerHTML = "Hmm... deixa eu pensar um número... 😼";
    }, 2000);
    setTimeout(() => {
        fala.innerHTML = "Pronto! Tenta adivinhar!!! 😸";
        meioJogo.classList.remove("oculto");
        placar.classList.remove("oculto");
    }, 4000);
});

// voce nao quer jogar com o gato (apertou o botao NAO)
btnNao.addEventListener("click", () => {
    somTriste.currentTime = 0;
    somTriste.play();
    botoes.classList.add("oculto");
    gato.src = "./imgs/gatoTriste.jfif";
    fala.innerHTML = "Ah... tudo bem... tchau 😿";
    setTimeout(() => {
        window.location.href = "https://www.google.com";
    }, 12000);
});

// tentando um numero
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const numero = Number(input.value);
    // numero = numero ja tentado
    if (erros.includes(numero)) {
        fala.innerHTML = `Ei!!! você já tentou ${numero} 😾`;
        input.value = "";
        return;
    }

    //empurrando vetor de numeros tentados + atualizando chances e numeros tentados
    erros.push(numero);
    const chancesRestantes = chancesMax - erros.length;
    respErros.innerHTML = erros.length;
    respChances.innerHTML = chancesRestantes;
    historico.innerHTML = erros.join(" - ");

    // acertou
    if (numero === sorteadoAtual) {
        fala.innerHTML = `Acertou!! Eu pensei em ${sorteadoAtual} 😺`;
        placarJogador.innerHTML = Number(placarJogador.innerHTML) + 1;
        fimDeJogo();
        return;
    }

    //errou numero
    const dica = numero < sorteadoAtual ? "MAIOR" : "MENOR";
    fala.innerHTML = `Errou 😼... o número é ${dica} que ${numero}`;

    //acabou tentativas (levando para fim de jogo)
    if (chancesRestantes === 0) {
        fala.innerHTML = `GANHEI!!!!! 🙀 eu pensei em ${sorteadoAtual}`;
        placarGato.innerHTML = Number(placarGato.innerHTML) + 1;
        fimDeJogo();
        return;
    }

    // limpando o input e focando nele
    input.value = "";
    input.focus();
});