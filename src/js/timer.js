let timer;
let timerStart;
let timeOnWebsite;

const startTimer = () => {
    timerStart = Date.now();
    timer = setInterval(() => {
        timeOnWebsite = getTimeOnWebsite()+(Date.now()-timerStart);
        timerStart = parseInt(Date.now());
        document.querySelector('#timer').innerHTML = `Time: ${parseInt(timeOnWebsite/1000)}`;
    }, 1000);
};

const getTimeOnWebsite = () => {
    return timeOnWebsite = isNaN(timeOnWebsite) ? 0 : timeOnWebsite;
};

startTimer();

document.querySelector('#timer').addEventListener('mouseover', (event) => {
    clearInterval(timer);
});

document.querySelector('#timer').addEventListener('mouseout', (event) => {
    startTimer();
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
        timer = 0;
        timerStart = 0;
        timeOnWebsite = 0;
        startTimer();
    }
});
