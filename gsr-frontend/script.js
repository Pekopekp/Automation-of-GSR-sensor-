let chart;
let updateInterval;
let isRunning = false;

const channelID = "YOUR_CHANNEL_ID";
const field = "field1";
const fetchURL = `https://api.thingspeak.com/channels/${channelID}/fields/${field}.json?results=20`;

function createChart() {
    const ctx = document.getElementById("gsrChart").getContext("2d");

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: "GSR Value",
                data: [],
                borderWidth: 3,
                borderColor: "#3867d6",
                pointRadius: 0,
                tension: 0.35
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

createChart();

function updateGraph() {
    fetch(fetchURL)
        .then(res => res.json())
        .then(data => {
            const feeds = data.feeds;

            const labels = feeds.map(x => x.created_at.slice(11, 19));
            const values = feeds.map(x => parseFloat(x[field]));

            chart.data.labels = labels;
            chart.data.datasets[0].data = values;
            chart.update();
        });
}

document.getElementById("startBtn").addEventListener("click", () => {
    if (!isRunning) {
        isRunning = true;
        updateInterval = setInterval(updateGraph, 3000);

        document.getElementById("resultsBtn").disabled = true;
        document.getElementById("resultsBtn").classList.add("disabled");
    }
});

document.getElementById("stopBtn").addEventListener("click", () => {
    if (isRunning) {
        clearInterval(updateInterval);
        isRunning = false;

        const resBtn = document.getElementById("resultsBtn");
        resBtn.disabled = false;
        resBtn.classList.remove("disabled");

        resBtn.onclick = () => {
            window.location.href = "results.html";
        };
    }
});
