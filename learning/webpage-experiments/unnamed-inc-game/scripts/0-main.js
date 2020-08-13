
const GAME_VERSION = '0.0.1';
const TICKS_PER_SEC = 20;
const NAME_REGEX = /(\w ?)+/g;

var thePlayer;
var theGameEngine;
var theTimer;

(function() {
	'use strict';

	let stateCheck = setInterval(() => {
		if (document.readyState === 'complete') {
            console.log('EisDEBUG: Start 0-main.js, v.' + GAME_VERSION + '.');
            startup();
            clearInterval(stateCheck);
		}
	}, 100);
})();

function startup() {
    console.log('EisDebug: startup() started.');
    let startTime = new Date().getTime();

    theGameEngine = new GameEngine();
    thePlayer = new Player();

    addControls();

    addButtons();

    console.log('EisDebug: startup() complete. Time elapsed: ' + (new Date().getTime() - startTime) + ' ms');
}

function addButtons() {
    console.log('EisDebug: addButtons()');
    let gridColumns = document.getElementsByClassName('gridColumn');

    for(let i = 0; i < gridColumns.length; i++) {
        for(let j = 0; j < gridColumns.length; j++) {
            gridColumns[i].children[j].onclick = function() {
                thePlayer.gridPress(i, j);
            };
        }
    }

    document.getElementById('startButton').onclick = function() {
        theGameEngine.togglePause();
    };
    document.getElementById('startButtonText').onclick = function() {
        theGameEngine.togglePause();
    };
}