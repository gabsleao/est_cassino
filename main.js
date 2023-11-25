var intervaloTempo;
var segundosPassados = 0;
var isPausado = true;
var corValor = { 'branco': 0, 'vermelho': 0, 'preto': 0 };
var quantidadeNumeros = 21;

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

    if (number > 0 && number <= 11) {
        cor = 'vermelho';
    } else if (number > 0 && number > 11) {
        cor = 'preto';
    }

    corValor[cor]++;

    updateGraficoPizza();
    const circulo = $('<div>').addClass('circulo ' + cor).text(number);
    $('#number').text(`Último Número: ${number}`);
    $('#sortedNumber').text(number).addClass('circulo ' + cor);
    $('#history').append(circulo);
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

    if (isPausado) {
        isPausado = false;
        intervaloTempo = setInterval(() => {
            segundosPassados++;
            updateTimer();
            if (segundosPassados % 5 === 0) {
                sortearNumero();
                segundosPassados = 0;
            }
        }, 1000);
    }
}