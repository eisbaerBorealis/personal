// ==UserScript==
// @name         Critter Mound Bot
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  Play the game "Critter Mound" at jayseesee.github.io
// @author       eisbaerBorealis
// @match        http://jayseesee.github.io/Crittermound-Fork*
// @grant        none
// ==/UserScript==

/* CONSTANTS */
const BOT_VERSION = '1.0.2';
const TICKS_PER_SEC = 2;
const BOT_NAME = 'Critter Mound Bot';

/* IMPORTANT VARIABLES */
// Do not change these.
var countDown = 0;
var roundCount = 0;
var gameMode = 'normal';
var gameWon = false;
var botActive = true;
var doWar = true;
var botBroken = false;

/* USER VARIABLES */
// Changing these values could have a positive or negative effect on the bot's gameplay. Tweak them if you want to experiment.
var keepBoosts = 2;
var armyStrengthModifier = 1.10; // Will not attack unless our weakest soldier is X times stronger than the strongest opponent
var newSoldierModifier   = 1.10; // If offspring is X times stronger than the weakest soldier, replace said soldier

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

	// Changes all the settings
    game.armySort('score');
    document.getElementsByTagName('input')[1].value = 2;
    pauseHunting();
    
    // Add the bot window
    addCSS();
    addWindow();
	
	// start up the main doRound function
	var mainLoopInterval = setInterval(doRound, 1000 / TICKS_PER_SEC);

	console.log('EisDEBUG: Finished startup');
}

function doRound() {
    if(botActive && !gameWon) {
        switch(gameMode) {
            case 'normal':
                if(game.sod() < 7500000000) { // halfway between final upgrade cost and what the game thinks is the next upgrade cost
                    buyUpgrades();
                }
                
                useBoost();

                if(game.femaleMound().length > 0) {
                    moveFemale();
                }
                if(game.maleMound().length > 0) {
                    moveMale();
                }

                if(!game.atWar()) {
                    startNextWar();
                } else {
                    pauseHunting();
                    if(!game.inBattle() && game.armyMound().length === game.maxArmyMoundSize()) {
                        startFight();
                    }
                }
                
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

function buyUpgrades() {
    if(game.factoryMoundUpgradeCost() < game.sod()) {
        game.Upgrade('Factory');
    } else if(game.carrierMoundUpgradeCost() < game.sod()) {
        game.Upgrade('Carrier');
    } else if(game.farmMoundUpgradeCost() < game.sod()) {
        game.Upgrade('Farm');
    } else if(game.mineMoundUpgradeCost() < game.sod()) {
        game.Upgrade('Mine');
    } else if(game.armyMoundUpgradeCost() < game.sod()) {
        game.Upgrade('Army');
    } else if(game.sod() < 750000000) {
        if(game.femaleMoundUpgradeCost() < game.sod()) {
            game.Upgrade('FemaleHatchery');
        } else if(game.maleMoundUpgradeCost() < game.sod()) {
            game.Upgrade('MaleHatchery');
        }
        // Upgrade Prince/Princess?
    }
}

function useBoost() {
    if(game.femaleMound().length < game.maxFemaleMoundSize() && game.maleMound().length < game.maxMaleMoundSize() && game.boosts()-1 >= keepBoosts) {
        game.Boost();
    }
}

function moveFemale() {
    if(game.femaleMound()[0].totalMutations > game.mother().totalMutations) {
        game.Move('Mate', 'Female', null, KeyboardEvent);
    } else if(game.mother().totalMutations > game.femaleMound()[0].totalMutations) {
        game.Move('Worker', 'Female', null, KeyboardEvent);
    } else if(game.femaleMound()[0].score > game.mother().score) {
        game.Move('Mate', 'Female', null, KeyboardEvent);
    } else if(game.maxArmyMoundSize() > game.armyMound().length || game.femaleMound()[0].score > game.armyMound()[game.maxArmyMoundSize()-1].score * newSoldierModifier) {
        if(game.maxArmyMoundSize() == game.armyMound().length) {
            document.getElementsByClassName("critterRow")[document.getElementsByClassName("critterRow").length - game.map().enemyArmyMound().length - 1].click();
            document.getElementsByClassName("recycle")[8].click();
            console.log('EisDebug: Manually removed the weakest soldier.');
        }
        game.Move('Army', 'Female', null, KeyboardEvent);
    } else {
        // if(game.mother().score < 200000 && game.femaleMound()[0].score < game.armyMound()[game.maxArmyMoundSize()-1].score * newSoldierModifier) {
            game.Move('Worker', 'Female', null, KeyboardEvent);
        // } else {
            // game.Move('Mate', 'Female', null, KeyboardEvent);
        // }
    }
}

function moveMale() {
    if(game.maleMound()[0].totalMutations > game.father().totalMutations) {
        game.Move('Mate', 'Male', null, KeyboardEvent);
    } else if(game.father().totalMutations > game.maleMound()[0].totalMutations) {
        game.Move('Worker', 'Male', null, KeyboardEvent);
    } else if(game.maleMound()[0].score > game.father().score) {
        game.Move('Mate', 'Male', null, KeyboardEvent);
    } else if(game.maxArmyMoundSize() > game.armyMound().length || game.maleMound()[0].score > game.armyMound()[game.maxArmyMoundSize()-1].score * newSoldierModifier) {
        if(game.maxArmyMoundSize() == game.armyMound().length) {
            document.getElementsByClassName("critterRow")[document.getElementsByClassName("critterRow").length - game.map().enemyArmyMound().length - 1].click();
            document.getElementsByClassName("recycle")[8].click();
            console.log('EisDebug: Manually removed the weakest soldier.');
        }
        game.Move('Army', 'Male', null, KeyboardEvent);
    } else {
        // if(game.father().score < 200000 && game.maleMound()[0].score < game.armyMound()[game.maxArmyMoundSize()-1].score * newSoldierModifier) {
            game.Move('Worker', 'Male', null, KeyboardEvent);
        // } else {
            // game.Move('Mate', 'Male', null, KeyboardEvent);
        // }
    }
}

function startNextWar() {
    if(game.armyMound().length >= game.maxArmyMoundSize()) {
        let targetNation = -1;
        for(let i = 0; i < game.nations().length; i++) {
            if(game.nations()[i].highBaseValue * armyStrengthModifier > game.armyMound()[game.armyMound().length - 1].score) {
                // i = game.nations().length;
            } else {
                // targetNation = i;
                if(!game.nations()[i].mapComplete() || !game.achievements()[204].isUnlocked() || !game.achievements()[148].isUnlocked()) {
                    targetNation = i;
                    // i = game.nations().length;
                }
            }
        }
        if(targetNation >= 0) {
            game.StartWar(game.nations()[targetNation]);
            console.log("EisDebug: STARTED WAR with the " + game.nations()[targetNation].name + " (" + targetNation + ")");
        }
    }
}

function pauseHunting() {
    if(!game.pauseAutoBattle()) {
        game.TogglePauseAutoBattle(); // pause hunting
    }
}

function startFight() {
    if(game.map().completePercentage() == '100%') {
        game.EndWar();
        if (game.nations()[17].mapComplete() && game.achievementsUnlocked() == 212) {
            gameWon = true;
            console.log('GAME WON');
        }
    } else {
        var battleReady = true;
        for(let i = 0; i < game.armyMound().length; i++) { // if any soldier
            if(game.armyMound()[i].healthPercentage() != '100%') { // has less than full health
                battleReady = false; // do not fight
            }
        }

        if(battleReady && doWar) {
            document.getElementsByClassName('fog unlocked')[0].click();
        }
    }
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
            + '<div id="toggleActive" class="botButton activeButton">Active</div>'
            + '<div id="toggleWar" class="botButton activeButton">Auto Fight</div>'
        + '</div></div>';

    document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', botHtml);

    document.getElementById('buttonNewGame').onclick = function() {
        console.log('EisDEBUG: New Game pressed');
        game.Reset();
    };

    document.getElementById('toggleActive').onclick = function() {
        console.log('EisDEBUG: Active pressed');
        botActive = !botActive;
        document.getElementById('toggleActive').classList.toggle('activeButton');
        document.getElementById('toggleActive').classList.toggle('inactiveButton');
    };

    document.getElementById('toggleWar').onclick = function() {
        console.log('EisDEBUG: Auto Fight pressed');
        doWar = !doWar;
        document.getElementById('toggleWar').classList.toggle('activeButton');
        document.getElementById('toggleWar').classList.toggle('inactiveButton');
    };
}