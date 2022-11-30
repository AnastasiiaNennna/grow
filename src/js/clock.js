const showCurrentDate = () => {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const time = new Date();
    const currentHours = (time.getHours() < 10) ? `0${time.getHours()}` : time.getHours();
    const currentMinutes = (time.getMinutes() < 10) ? `0${time.getMinutes()}` : time.getMinutes();
    const currentSeconds = (time.getSeconds() < 10) ? `0${time.getSeconds()}` : time.getSeconds();
    const amPm = currentHours > 12 ? 'PM' : 'AM';
    const currentWeekDay = weekDays[time.getDay()];
    const currentMonth = month[time.getMonth()];
    const currentDay = time.getDate();
    const currentYear = time.getFullYear();
    document.querySelector('#clock').innerHTML =
        `${currentHours}:${currentMinutes}:${currentSeconds} ${amPm} ${currentWeekDay}, ${currentMonth} ${currentDay}, ${currentYear}`;
};

setInterval(showCurrentDate, 1000);
