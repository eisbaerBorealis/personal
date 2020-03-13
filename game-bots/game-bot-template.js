// ==UserScript==
// @name         Game Name Bot
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Play the game "Game Name" at website.net/gameName
// @author       eisbaerBorealis
// @match        https://website.net/gameName*
// @grant        none
// ==/UserScript==

/* INFO */
// https://gameName.fandom.com/wiki/Achievement
// https://gameName.fandom.com/wiki/Upgrades
// https://gameName.fandom.com/wiki/Prestige

/* CONSTANTS */
const BOT_VERSION = '0.0.1';
const TICKS_PER_SEC = 20;
const BOT_NAME = '';

/* IMPORTANT VARIABLES */
// Do not change these.
var countDown = 0;
var roundCount = 0;
var gameMode = 'normal';
var botActive = true;
var doClicking = true;
var doPrestige = true;
var botBroken = false;
// var nextSteps = [];
// var failCount = 0;

(function() {
	'use strict';

	console.log('EisDEBUG: Start bot, v.' + BOT_VERSION + ' ' + BOT_NAME);

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
	console.log('EisDEBUG: Started startup');

	// Changes all the settings for lower graphics
	Game.prefs.fancy = 0;
	Game.prefs.particles = 0;
	Game.volume = 0;

	// Gets a bunch of unique, one-time achievements
    
    
    // Add the bot window
    addCSS();
    addWindow();
	
	// start up the main doRound function
	var mainLoopInterval = setInterval(doRound, 1000 / TICKS_PER_SEC);

	console.log('"EisDEBUG: Finished startup');
}

function doRound() {
    if(botActive) {
        switch(gameMode) {
            case 'normal':
                Game.ClickThing();
                if(roundCount % 5 === 1) {
                    // do something every 5 ticks
                }
                if(roundCount % 40 === 1) {
                    // do something every 40 ticks
                }
                break;
            case '"special':
                // do special things
                break;
            default:
                if(!botBroken) {
                    botBroken = true;
                    console.log('EisERROR: defaulted on gameMode');
                }
        }
    }
    roundCount++;
}

function addCSS() {
    let style = document.createElement('style');
    style.type = 'text/css';

    style.innerHTML =
          '#botOptions {'
            + 'display: flex;'
            + 'flex-direction: column;'
            + 'position: fixed;'
            + 'left: 10px;'
            + 'bottom: 0px;'
            + 'background-color: #3d3d85;'
            + 'padding: 5px;'
            + 'border-radius: 15px 15px 0px 0px;'
            + 'min-width: 99px; }'
        + '#optionsBody {'
            + 'display: none;'
            + 'flex-direction: column; }'
        + '#optionsTitle {'
            + 'margin: 0 auto;'
            + 'color: white; }'
        + '#optionsBody a {'
            + 'display: flex; }'
        + '#botOptions:hover #optionsBody {'
            + 'display: flex; }'
        + '.botButton {'
            + 'margin: 2px;'
            + 'padding: 3px 8px;'
            + 'border-radius: 10px;'
            + 'text-align: center;'
            + 'cursor: pointer; }'
        + '.actionButton {'
            + 'background-color: #a8a8a8 }'
        + '.activeButton {'
            + 'background-color: #28a819 }'
        + '.inactiveButton {'
            + 'background-color: #a81919 }'
        ;

    document.getElementsByTagName('head')[0].appendChild(style);
}

function addWindow() {
    let botHtml = '<div id="botOptions">'
        + '<div id="optionsTitle">Bot Options</div>'
        + '<div id="optionsBody">'
            + '<div id="buttonNewGame" class="botButton actionButton">New Game</div>'
            + '<div id="buttonPrestige" class="botButton actionButton">Prestige</div>'
            + '<div id="toggleActive" class="botButton activeButton">Active</div>'
            + '<div id="toggleClicking" class="botButton activeButton">Clicking</div>'
            + '<div id="togglePrestige" class="botButton activeButton">Auto Prestige</div>'
        + '</div></div>';

    document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', botHtml);

    document.getElementById('buttonNewGame').onclick = function() {
        console.log('EisDEBUG: New Game pressed');
    };

    document.getElementById('buttonPrestige').onclick = function() {
        console.log('EisDEBUG: Prestige pressed');
    };

    document.getElementById('toggleActive').onclick = function() {
        console.log('EisDEBUG: Active pressed');
        botActive = !botActive;
        document.getElementById('toggleActive').classList.toggle('activeButton');
        document.getElementById('toggleActive').classList.toggle('inactiveButton');
    };

    document.getElementById('toggleClicking').onclick = function() {
        console.log('EisDEBUG: Clicking pressed');
        doClicking = !doClicking;
        document.getElementById('toggleClicking').classList.toggle('activeButton');
        document.getElementById('toggleClicking').classList.toggle('inactiveButton');
    };

    document.getElementById('togglePrestige').onclick = function() {
        console.log('EisDEBUG: Auto Prestige pressed');
        doPrestige = !doPrestige;
        document.getElementById('togglePrestige').classList.toggle('activeButton');
        document.getElementById('togglePrestige').classList.toggle('inactiveButton');
    };
}