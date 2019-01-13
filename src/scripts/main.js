document.addEventListener('DOMContentLoaded', () => {
    var deadline = document.querySelector('.js-counter').getAttribute('data-deadline');

    initializeClock('js-counter', deadline);
});