<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>cassino predict</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
  <link href="main.css" rel="stylesheet">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="main.js"></script>
</head>

<body class="bg-light text-dark">

  <div class="container my-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div id="chute" class="h2 font-weight-bold">Chute: </div>
      <div hidden id="number" class="h2 font-weight-bold">Último Número: -</div>
      <div id="timer" class="h2 font-weight-bold">Timer: 00:00</div>
    </div>

    <div id="probBranco" class="font-weight-bold"></div>
    <div id="probPreto" class="font-weight-bold"></div>
    <div id="probVermelho" class="font-weight-bold"></div>

    <div class="d-flex justify-content-center align-items-center mb-4">
      <div id="sortedNumber" class="h2 circulo-2"></div>
    </div>

    <div class="d-flex justify-content-center mb-4">
      <button id="startButton" class="btn btn-primary" onclick="start();">COMEÇAR</button>
      <button id="pauseButton" class="btn btn-danger ms-2" disabled onclick="stop();">PAUSAR</button>
    </div>

    <div id="history" class="d-flex justify-content-center mb-4"></div>

    <div class="d-flex justify-content-center">
      <canvas id="pieChart" width="400" height="400"></canvas>
    </div>

  </div>

  <script>
    updateTimer();

    //inicia o chart de resultados
    var pieChart = new Chart($('#pieChart'), {
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
  </script>

</body>

</html>