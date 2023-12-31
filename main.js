var intervaloTempo;
var segundosPassados = 0;
var isPausado = true;
var corValor = { 'branco': 0, 'vermelho': 0, 'preto': 0 };
var quantidadeNumeros = 21;
var coresSorteadas = [];
var qtdBranco = 1;
var qtdPreto = 10;
var qtdVermelho = 10;
var qtdAcertos = 0;
var chute;

function updateTimer() {
    const minutos = Math.floor(segundosPassados / 60).toString().padStart(2, '0');
    const segundos = (segundosPassados % 60).toString().padStart(2, '0');
    $('#timer').text(`Timer: ${minutos}:${segundos}`);
}

function updateGraficoPizza() {
    $.each(corValor, function (cor, quantidade) {
        if (cor == 'branco') {
            pieChart.data.datasets[0].data[0] = quantidade;
        }
        if (cor == 'vermelho') {
            pieChart.data.datasets[0].data[1] = quantidade;
        }
        if (cor == 'preto') {
            pieChart.data.datasets[0].data[2] = quantidade;
        }
        pieChart.update();
    });
}

function sortearNumero() {
    
    const number = Math.floor(Math.random() * quantidadeNumeros);
    var cor = 'branco';

    if (number > 0 && number < 11) {
        cor = 'vermelho';
    } else if (number >= 11) {
        cor = 'preto';
    }

    corValor[cor]++;

    updateGraficoPizza();

    const circulo = $('<div>').addClass('circulo ' + cor).text(number);
    $('#number').text(`Último Número: ${number}`);
    $('#sortedNumber').text(number).addClass('circulo ' + cor);
    $('#history').append(circulo);

    coresSorteadas.push(cor);

    calcularAcertos(chute.toLowerCase(), cor);
}

function stop() {
    $('#startButton').prop("disabled", false);
    $('#pauseButton').prop("disabled", true);

    clearInterval(intervaloTempo);
    isPausado = true;
    updateTimer();
}

function start() {
    $('#startButton').html("RESUMIR");
    $('#startButton').prop("disabled", true);
    $('#pauseButton').prop("disabled", false);

    calcularProbabilidades(coresSorteadas);
    if (isPausado) {
        isPausado = false;
        intervaloTempo = setInterval(() => {
            segundosPassados++;
            updateTimer();
            if (segundosPassados % 5 === 0) {
                sortearNumero();
                segundosPassados = 0;
                calcularProbabilidades(coresSorteadas);
            }
        }, 1000);
    }
}

function calcularProbabilidades(coresSorteadas) {
    // console.log('calculando...');
    coresRepetidas = 0;
    corSorteada = coresSorteadas[coresSorteadas.length - 1]
    
    coresSorteadas.slice().reverse().every(cor => {
        console.log('cor do array: ' + cor + ' -- cor sorteada: ' + corSorteada);
        if(cor == corSorteada){
            coresRepetidas += 1;
            console.log('são iguais! coresRepetidas: ' + coresRepetidas);
            return true;
        }else{
            console.log('são diferentes ): coresRepetidas: ' + coresRepetidas);
            return false;
        }
    });
    // console.log('coresSorteadas: ' + coresSorteadas)
    // console.log('coresRepetidas: ' + coresRepetidas)
    coresAConsiderar = coresSorteadas.slice(-coresRepetidas);
    // console.log('cores a considerar: ' + coresAConsiderar);
    // console.log('___________________________');

    // Contar o número de ocorrências de cara
    const quantidadeSorteouBranco = coresAConsiderar.filter(cor => cor === 'branco').length;
    const quantidadeSorteouPreto = coresAConsiderar.filter(cor => cor === 'preto').length;
    const quantidadeSorteouVermelho = coresAConsiderar.filter(cor => cor === 'vermelho').length;

    // console.log('quantidadeSorteouBranco: ' + quantidadeSorteouBranco);
    // console.log('quantidadeSorteouPreto: ' + quantidadeSorteouPreto);
    // console.log('quantidadeSorteouVermelho: ' + quantidadeSorteouVermelho);

    probBranco = (qtdBranco / quantidadeNumeros);
    if(quantidadeSorteouBranco > 0){
        // console.log("probBranco: " + probBranco + " / quantidade sorteado branco: " + quantidadeSorteouBranco)
        probBranco = probBranco**(quantidadeSorteouBranco+1);
    }

    probPreto = (qtdPreto / quantidadeNumeros);
    if(quantidadeSorteouPreto > 0){
        // console.log("probPreto: " + probPreto + " / quantidade sorteado preto: " + quantidadeSorteouPreto)
        probPreto = probPreto**(quantidadeSorteouPreto+1);
    }

    probVermelho = (qtdVermelho / quantidadeNumeros);
    if(quantidadeSorteouVermelho > 0){
        // console.log("probVermelho: " + probVermelho + " / quantidade sorteado vermelho: " + quantidadeSorteouVermelho)
        probVermelho = probVermelho**(quantidadeSorteouVermelho+1);
    }

    max = probBranco;
    if(probPreto > max){
        max = probPreto;
        cor = 'PRETO';
    }
    if(probVermelho > max){
        max = probVermelho
        cor = 'VERMELHO';
    }

    $('#probBranco').html('Branco: ' + probBranco.toFixed(3)*100 + '%');
    $('#probPreto').html('Preto: ' + probPreto.toFixed(3)*100 + '%');
    $('#probVermelho').html('Vermelho: ' + probVermelho.toFixed(3)*100 + '%');

    $('#chute').html('Chute: ' + cor);
    chute = cor;

    return;
  }

  function calcularAcertos(chute, cor){
    quantidadeVezesSorteios = coresSorteadas.length;

    // console.log('chute: ' + chute + " cor: " + cor)
    if(chute == cor){
        qtdAcertos = qtdAcertos + 1;
    }

    probAcertos = (qtdAcertos / quantidadeVezesSorteios);

    // console.log("probAcertos: " + probAcertos + " => quantidade acertos: " + qtdAcertos + " / quantidade sorteios: " + quantidadeVezesSorteios);
    $('#acerto').html('% de acerto: ' + probAcertos.toFixed(3)*100 + '%');
  }