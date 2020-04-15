
const GAME_VERSION = '0.1.1';
const TICKS_PER_SEC = 20;
const NAME_REGEX = /(\w ?)+/g;

var reloadFailCount;
var thePlayer;
var theGameEngine;
var newPlayerWarning;

(function() {
	'use strict';

    // console.log('EisDEBUG: Start 0-main.js, v.' + GAME_VERSION + '.');

	let stateCheck = setInterval(() => {
		if (document.readyState === 'complete') {
            eisDebug(1, 'EisDEBUG: Start 0-main.js, v.' + GAME_VERSION + '.');
            startup();
            clearInterval(stateCheck);
		}
	}, 100);
})();

function startup() {
    // console.log('EisDebug: startup() started.');
    eisDebug(1, 'EisDebug: startup() started.');
    let startTime = new Date().getTime();

    addButtons();

	reloadFailCount = 0;
    thePlayer = new Player();
    thePlayer.setNewHatchery();
    newPlayerWarning = false;
    
	if(localStorage.ecmPlayerJSON === undefined) {
        reloadFailCount++;
        // document.getElementById('loadPlayerName').innerHTML = 'Reload failed ' +
        //         reloadFailCount + ' time(s). <br>Try again or create a new character.';
        alterInnerHtml('loadPlayerName', 'Reload failed ' + reloadFailCount + ' time(s). <br>Try again or create a new character.');
        // document.getElementById("loadPlayerButton").classList.add('hidden');
        addClass('loadPlayerButton', 'hidden');
        // document.getElementById("attemptReloadButton").classList.remove('hidden');
        removeClass('attemptReloadButton', 'hidden');
    } else {
        // document.getElementById("loadPlayerButton").classList.remove('disabled');
        // document.getElementById("loadPlayerButton").classList.add('clickable');
        // document.getElementById('loadPlayerName').innerHTML = JSON.parse(localStorage.ecmPlayerJSON).settings.name;
        removeClass('loadPlayerButton', 'disabled');
        addClass('loadPlayerButton', 'clickable');
        alterInnerHtml('loadPlayerName', JSON.parse(localStorage.ecmPlayerJSON).settings.name);
    }

    // console.log('EisDebug: startup() complete. Time elapsed: ' + (new Date().getTime() - startTime) + ' ms');
    eisDebug(1, 'EisDebug: startup() complete. Time elapsed: ' + (new Date().getTime() - startTime) + ' ms');
}

function reloadSave() {
    // console.log('EisDebug @ reloadSave()');
    eisDebug(2, 'EisDebug @ reloadSave()');
    if(localStorage.ecmPlayerJSON !== undefined) {
        // document.getElementById("loadPlayerName").innerHTML = JSON.parse(localStorage.ecmPlayerJSON).settings.name;
        // document.getElementById("loadPlayerButton").classList.remove('hidden');
        // document.getElementById("attemptReloadButton").classList.add('hidden');
        alterInnerHtml('loadPlayerName', JSON.parse(localStorage.ecmPlayerJSON).settings.name);
        removeClass('loadPlayerButton', 'hidden');
        addClass('attemptReloadButton', 'hidden');
    } else {
        reloadFailCount++;
        // document.getElementById('loadPlayerName').innerHTML = 'Reload failed '
        //         + reloadFailCount + ' time(s). <br>Try again or create a new character.';
        alterInnerHtml('loadPlayerName', 'Reload failed ' + reloadFailCount + ' time(s). <br>Try again or create a new character.');
    }
}

function newPlayer() {
    // console.log('EisDebug @ newPlayer()');
    eisDebug(2, 'EisDebug @ newPlayer()');
    if(document.getElementsByName('newName')[0].value.match(NAME_REGEX)) {
        if(localStorage.ecmPlayerJSON !== undefined) {
            if(!newPlayerWarning) {
                newPlayerWarning = true;
                // document.getElementById("newPlayerButton").classList.add('warnButton');
                addClass('newPlayerButton', 'warnButton');
                popup('WARNING: If you continue creating a new player, you will overwrite ' +
                    'the old save data.');
            } else {
                // thePlayer.setName(document.getElementsByName('newName')[0].value);
                thePlayer.setName(getInput('newName'));
                startGame();
            }
        } else {
            // thePlayer.setName(document.getElementsByName('newName')[0].value);
            thePlayer.setName(getInput('newName'));
            startGame();
        }
        
    } else {
        popup('Please create a name with at least one letter or number.');
    }
}

function startGame() {
    // console.log('EisDebug @ startGame()');
    eisDebug(2, 'EisDebug @ startGame()');

    // document.getElementById('saveSection').classList.add('hidden');
    // document.getElementById('playerName').innerHTML = thePlayer.getName();
    addClass('saveSection', 'hidden');
    alterInnerHtml('playerName', thePlayer.getName());

    theGameEngine = new GameEngine();
}