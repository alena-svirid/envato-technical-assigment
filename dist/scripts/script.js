// days remain counter

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function getTimeRemaining(endtime) {
    var timeRemain = Date.parse(endtime) - Date.parse(new Date());
    var secondsRemain = Math.floor(timeRemain / 1000),
        minutesRemain = Math.floor(secondsRemain / 60),
        hoursRemain = Math.floor(minutesRemain / 60),
        daysRemain = Math.floor(hoursRemain / 24);

    hoursRemain = hoursRemain - (daysRemain * 24);
    minutesRemain = minutesRemain - (daysRemain * 24 * 60) - (hoursRemain * 60);
    secondsRemain = secondsRemain - (daysRemain * 24 * 60 * 60) - (hoursRemain * 60 * 60) - (minutesRemain * 60);

    return {
        'total': timeRemain,
        'days': daysRemain,
        'hours': hoursRemain,
        'minutes': minutesRemain,
        'seconds': secondsRemain
    };
}

function makeCounterValue(value) {
    value = String(value);
    if (value.length == 0) {
        value = "00";
    } else if (value.length == 1) {
        value = "0" + value;
    }

    return value;
}

function initializeClock(id, endtime) {

    var clock = document.getElementById(id),
        counterDaysEl = clock.querySelector('.js-digit-days'),
        counterHoursEl = clock.querySelector('.js-digit-hours'),
        counterMinutesEl = clock.querySelector('.js-digit-minutes'),
        counterSecondsEl = clock.querySelector('.js-digit-seconds');


    function updateClock() {

        var timeRemain = getTimeRemaining(endtime);

        if (timeRemain.total <= 0) {

            counterDaysEl.innerHTML = "00";
            counterHoursEl.innerHTML = "00";
            counterMinutesEl.innerHTML = "00";
            counterSecondsEl.innerHTML = "00";

            clearInterval(timeInterval);

        } else {

            counterDaysEl.innerHTML = makeCounterValue(timeRemain.days);
            counterHoursEl.innerHTML = makeCounterValue(timeRemain.hours);
            counterMinutesEl.innerHTML = makeCounterValue(timeRemain.minutes);
            counterSecondsEl.innerHTML = makeCounterValue(timeRemain.seconds);

        }
    }

    updateClock();
    var timeInterval = setInterval(updateClock, 1000);
};document.addEventListener('DOMContentLoaded', () => {
    var deadline = document.querySelector('.js-counter').getAttribute('data-deadline');

    initializeClock('js-counter', deadline);
});