let timerInterval;
let secondsElapsed = 0;
let isPaused = true;
let numberCounts = { 0: 0, 1: 0, 2: 0 };

const updateTimerDisplay = () => {
    const minutes = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
    const seconds = (secondsElapsed % 60).toString().padStart(2, '0');
    $('#timer').text(`TIMER: ${minutes}:${seconds}`);
};

const updatePieChart = () => {
    pieChart.data.datasets[0].data = [numberCounts[0], numberCounts[1], numberCounts[2]];
    pieChart.update();
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
        labels: ['0', '1', '2'],
        datasets: [{
            data: [numberCounts[0], numberCounts[1], numberCounts[2]],
            backgroundColor: ['#f87171', '#fbbf24', '#60a5fa'],
            borderColor: ['#f87171', '#fbbf24', '#60a5fa'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

updateTimerDisplay();