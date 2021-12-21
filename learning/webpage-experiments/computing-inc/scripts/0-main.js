
const GAME_VERSION = '0.0.1';
const TICKS_PER_SEC = 20;
const NAME_REGEX = /(\w ?)+/g;

var reloadFailCount;
var thePlayer;
var theGameEngine;
var newPlayerWarning;

(function() {
	'use strict';

	let stateCheck = setInterval(() => {
		if (document.readyState === 'complete') {
            eisDebug(1, 'EisDEBUG: Start 0-main.js, v.' + GAME_VERSION + '.');
            startup();
            clearInterval(stateCheck);
		}
	}, 100);
})();

function startup() {
    eisDebug(1, 'EisDebug: startup() started.');
    let startTime = new Date().getTime();

    addButtons();

	reloadFailCount = 0;
    thePlayer = new Player();
    // thePlayer.setNewHatchery();
    newPlayerWarning = false;
    
	if(localStorage.ecmPlayerJSON === undefined) {
        reloadFailCount++;
        alterInnerHtml('loadPlayerName', 'Reload failed ' + reloadFailCount + ' time(s). <br>Try again or create a new character.');
        addClass('loadPlayerButton', 'hidden');
        removeClass('attemptReloadButton', 'hidden');
    } else {
        removeClass('loadPlayerButton', 'disabled');
        addClass('loadPlayerButton', 'clickable');
        alterInnerHtml('loadPlayerName', JSON.parse(localStorage.ecmPlayerJSON).settings.name);
    }

    eisDebug(1, 'EisDebug: startup() complete. Time elapsed: ' + (new Date().getTime() - startTime) + ' ms');
}

function reloadSave() {
    eisDebug(2, 'EisDebug @ reloadSave()');
    if(localStorage.ecmPlayerJSON !== undefined) {
        alterInnerHtml('loadPlayerName', JSON.parse(localStorage.ecmPlayerJSON).settings.name);
        removeClass('loadPlayerButton', 'hidden');
        addClass('attemptReloadButton', 'hidden');
    } else {
        reloadFailCount++;
        alterInnerHtml('loadPlayerName', 'Reload failed ' + reloadFailCount + ' time(s). <br>Try again or create a new character.');
    }
}

function newPlayer() {
    eisDebug(2, 'EisDebug @ newPlayer()');
    if(document.getElementsByName('newName')[0].value.match(NAME_REGEX)) {
        if(localStorage.ecmPlayerJSON !== undefined) {
            if(!newPlayerWarning) {
                newPlayerWarning = true;
                addClass('newPlayerButton', 'warnButton');
                popup('WARNING: If you continue creating a new player, you will overwrite ' +
                    'the old save data.');
            } else {
                thePlayer.setName(getInput('newName'));
                thePlayer.newRoyalty();
                startGame();
            }
        } else {
            thePlayer.setName(getInput('newName'));
            thePlayer.newRoyalty();
            startGame();
        }
        
    } else {
        popup('Please create a name with at least one letter or number.');
    }
}

function startGame() {
    eisDebug(2, 'EisDebug @ startGame()');

    addClass('saveSection', 'hidden');
    alterInnerHtml('playerName', thePlayer.getName());

    theGameEngine = new GameEngine();

    updateRoyalty();
    updateOffspring();
    updateSelected();
    updateNextGen();
    thePlayer.hatcheries[0].updatedEnabledButtons();
    updateHatcheryButtons();
}