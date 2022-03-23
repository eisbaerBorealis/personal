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

    setupEvents();

    theQuilt = new Quilt();
}

function setupEvents() {
    console.log('  eisDEBUG: setupEvents()');
    // on window resize, reset redraw countdown
}