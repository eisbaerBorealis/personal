
const GAME_VERSION = '1.0.2';
const TICKS_PER_SEC = 20;

var countDown = 0;

(function() {
	'use strict';

	console.log('EisDEBUG: Start 0-main.js, v.' + GAME_VERSION + '.');

	let stateCheck = setInterval(() => {
		if (document.readyState === 'complete') {
			if(countDown === 0) {
				try {
					startup();
					clearInterval(stateCheck);
				}
				catch(error) {
					console.log('EisERROR: Startup failed');
					countDown = 20;
				}
			} else {
				countDown--;
			}
		}
	}, 100);
})();

function startup() {
    console.log('EisDebug: startup() started.');
    let date = new Date();
    let startTime = date.getTime();

    loadData();
    // addPlayerHTML();
    // addHatcheryHTML();

    console.log('EisDebug: startup() complete. Time elapsed: ' + (date.getTime() - startTime) + ' ms');
}