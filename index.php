<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>cassino predict</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
  <link href="main.css" rel="stylesheet">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>

<body class="bg-light text-dark">

  <div class="container my-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div id="timer" class="h2 font-weight-bold">TIMER: 00:00</div>
      <div id="number" class="h2 font-weight-bold">NUMBER: -</div>
    </div>

    <div class="d-flex justify-content-center mb-4">
      <button id="startButton" class="btn btn-primary">COMEÇAR</button>
      <button id="pauseButton" class="btn btn-danger ms-2" disabled>PAUSAR</button>
    </div>

    <div id="history" class="d-flex justify-content-center mb-4"></div>

    <div class="d-flex justify-content-center">
      <canvas id="pieChart" width="400" height="400"></canvas>
    </div>
  </div>

  <script>
    let intervaloTempo;
    let segundosPassados = 0;
    let isPausado = true;
    let corValor = {'branco': 0, 'vermelho': 0, 'preto': 0 };
    let quantidadeNumeros = 21;

    const updateTimer = () => {
      const minutos = Math.floor(segundosPassados / 60).toString().padStart(2, '0');
      const segundos = (segundosPassados % 60).toString().padStart(2, '0');
      $('#timer').text(`TIMER: ${minutos}:${segundos}`);
    };

    const updateGraficoPizza = () => {
      $.each(corValor, function (cor, quantidade) {
        if(cor == 'branco'){
          pieChart.data.datasets[0].data[0] = quantidade;
        }
        if(cor == 'vermelho'){
          pieChart.data.datasets[0].data[1] = quantidade;
        }
        if(cor == 'preto'){
          pieChart.data.datasets[0].data[2] = quantidade;
        }
        pieChart.update();
      });
    };

    const sortearNumero = () => {
      const number = Math.floor(Math.random() * 22);
      var cor = 'branco';

      if (number > 0 && number <= 11) {
        cor = 'vermelho';
      } else if (number > 0 && number > 11) {
        cor = 'preto';
      }

      corValor[cor]++;

      console.log(corValor);
      updateGraficoPizza();
      $('#number').text(`NUMBER: ${number}`);
      const circle = $('<div>').addClass('circle ' + cor).text(number);
      $('#history').append(circle);
    };

    $('#startButton').on('click', function () {
      $('#startButton').html("RESUMIR");
      $('#startButton').prop("disabled", true);
      $('#pauseButton').prop("disabled", false);

      if (isPausado) {
        isPausado = false;
        intervaloTempo = setInterval(() => {
          segundosPassados++;
          updateTimer();
          if (segundosPassados % 1 === 0) {
            sortearNumero();
            segundosPassados = 0;
          }
        }, 1000);
      }
    });

    $('#pauseButton').on('click', function () {
      $('#startButton').prop("disabled", false);
      $('#pauseButton').prop("disabled", true);

      clearInterval(intervaloTempo);
      isPausado = true;
      updateTimer();
    });

    let pieChart = new Chart($('#pieChart'), {
      type: 'pie',
      data: {
        labels: ['branco', 'vermelho', 'preto'],
        datasets: [{
          data: [corValor['branco'], corValor['vermelho'], corValor['preto']],
          backgroundColor: ['#ffffff', '#d10808', '#000000'],
          borderColor: ['#000000', '#000000', '#ffffff'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    updateTimer();
  </script>

</body>

</html>