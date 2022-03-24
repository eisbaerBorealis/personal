(function() {
    'use strict';

    let stateCheck = setInterval(() => {
        if (document.readyState === 'complete') {
            console.log('  eisDEBUG: document ready')
            clearInterval(stateCheck);
            startup();
        }
    }, 100);
})();

function startup() {
    console.log('  eisDEBUG: startup()');
    // console.log('  eisDEBUG: SPINNER_RADIUS is ' + SPINNER_RADIUS);

    setupEvents();

    theQuilt = new Quilt();
}

function setupEvents() {
    // console.log('  eisDEBUG: setupEvents()');
    // on window resize, reset redraw countdown
    window.addEventListener('resize', function(event) {
        resetRedrawCountdown();
    }, true);
}