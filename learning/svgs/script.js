(function() {
    'use strict';

    console.log('DEBUG: starting Javascript');

    let stateCheck = setInterval(() => {
        if (document.readyState === 'complete') {
            try {
                clearInterval(stateCheck);
                insert();
            } catch(error) {
                console.error('ERROR: Startup failed' + error);
            }
        }
    }, 250);
})();

function insert() {
    console.log('DEBUG: starting insert()');
    document.body.innerHTML = svg;
}