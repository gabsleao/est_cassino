<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Number Draw and Timer</title>
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
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
      <button id="startButton" class="btn btn-primary mr-2">COMEÇAR</button>
      <button id="pauseButton" class="btn btn-danger">PAUSAR</button>
    </div>

    <div id="history" class="d-flex justify-content-center mb-4"></div>

    <div class="d-flex justify-content-center">
      <canvas id="pieChart" width="400" height="400"></canvas>
    </div>
  </div>

  <script>
    let timerInterval;
    let secondsElapsed = 0;
    let isPaused = true;
    let numberCounts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0 , 21: 0};
    // let numberCounts = {};
    let numeros = {};
    let quantidadeNumeros = 21;

    // const numberCounts = () => {
    //   for(i = 0, i <= quantidadeNumeros, i++){
    //     numberCounts[i] = 0;
    //     numeros.push(i);
    //   }
    // };

    const updateTimerDisplay = () => {
      const minutes = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
      const seconds = (secondsElapsed % 60).toString().padStart(2, '0');
      $('#timer').text(`TIMER: ${minutes}:${seconds}`);
    };

    const updatePieChart = () => {
      $.each(numberCounts, function(index, value){
        pieChart.data.datasets[0].data.push(index);
        pieChart.update();
      });
    };

    const drawNumber = () => {
      const number = Math.floor(Math.random() * 3);
      numberCounts[number]++;
      updatePieChart();
      $('#number').text(`NUMBER: ${number}`);
      const circle = $('<div>').addClass('circle').text(number);
      $('#history').append(circle);
    };

    $('#startButton').on('click', function () {
      if (isPaused) {
        isPaused = false;
        if (!timerInterval) {
          timerInterval = setInterval(() => {
            secondsElapsed++;
            updateTimerDisplay();
            if (secondsElapsed % 10 === 0) {
              drawNumber();
            }
          }, 1000);
        }
      }
    });

    $('#pauseButton').on('click', function () {
      clearInterval(timerInterval);
      timerInterval = null;
      isPaused = true;
      secondsElapsed = 0;
      updateTimerDisplay();
    });

    let pieChart = new Chart($('#pieChart'), {
      type: 'pie',
      data: {
        labels: [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        datasets: [{
          data: [numberCounts[0], numberCounts[1], numberCounts[2],
                  numberCounts[3], numberCounts[4], numberCounts[5],
                  numberCounts[6], numberCounts[7], numberCounts[8],
                  numberCounts[9], numberCounts[10], numberCounts[11],
                  numberCounts[12], numberCounts[13], numberCounts[14],
                  numberCounts[15], numberCounts[16], numberCounts[17],
                  numberCounts[18], numberCounts[19], numberCounts[20], numberCounts[21]],
          backgroundColor: ['#ffffff', 
                            '#d10808', '#d10808', '#d10808', '#d10808', '#d10808', '#d10808', '#d10808', '#d10808', '#d10808', '#d10808',
                            '#000000', '#000000','#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', 
                          ],
          borderColor: ['#000000', 
                        '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', 
                        '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    updateTimerDisplay();
  </script>

</body>

</html>