var intervaloTempo;
var segundosPassados = 0;
var isPausado = true;
var corValor = { 'branco': 0, 'vermelho': 0, 'preto': 0 };
var quantidadeNumeros = 21;
var coresSorteadas = [];
var qtdBranco = 1;
var qtdPreto = 10;
var qtdVermelho = 10;

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
    const number = Math.floor(Math.random() * 22);
    var cor = 'branco';

    if (number > 0 && number < 11) {
        cor = 'vermelho';
    } else if (number > 0 && number >= 11) {
        cor = 'preto';
    }

    corValor[cor]++;

    updateGraficoPizza();

    const circulo = $('<div>').addClass('circulo ' + cor).text(number);
    $('#number').text(`Último Número: ${number}`);
    $('#sortedNumber').text(number).addClass('circulo ' + cor);
    $('#history').append(circulo);

    coresSorteadas.push(cor);
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
    console.log('calculando...');
    
    // Contar o número de ocorrências de cara e coroa
    const quantidadeSorteouBranco = coresSorteadas.filter(cor => cor === 'branco').length;
    const quantidadeSorteouPreto = coresSorteadas.filter(cor => cor === 'preto').length;
    const quantidadeSorteouVermelho = coresSorteadas.filter(cor => cor === 'vermelho').length;

    probBranco = (qtdBranco / quantidadeNumeros);
    if(quantidadeSorteouBranco > 0){
        probBranco = probBranco**(quantidadeSorteouBranco+1);
    }

    probPreto = (qtdPreto / quantidadeNumeros);
    if(quantidadeSorteouPreto > 0){
        console.log("probPreto: " + probPreto + " / quantidade sorteado preto: " + quantidadeSorteouPreto)
        probPreto = probPreto**(quantidadeSorteouPreto+1);
    }

    probVermelho = (qtdVermelho / quantidadeNumeros);
    if(quantidadeSorteouVermelho > 0){
        console.log("probVermelho: " + probVermelho + " / quantidade sorteado vermelho: " + quantidadeSorteouVermelho)
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
    // console.log('quantidadeSorteouBranco: ' + quantidadeSorteouBranco + ' - probBranco: ' + probBranco.toFixed(2)*100 + '%');
    // console.log('quantidadeSorteouPreto: ' + quantidadeSorteouPreto + ' - probPreto: ' + probPreto.toFixed(2)*100 + '%');
    // console.log('quantidadeSorteouVermelho: ' + quantidadeSorteouVermelho + ' - probVermelho: ' + probVermelho.toFixed(2)*100 + '%');

    $('#chute').html('Chute: ' + cor);
    return;
  }