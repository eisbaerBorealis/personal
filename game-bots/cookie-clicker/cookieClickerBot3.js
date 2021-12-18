// ==UserScript==
// @name         Cookie Clicker Bot
// @namespace    http://tampermonkey.net/
// @version      1.4.0
// @description  Play the game "Cookie Clicker" at orteil.dashnet.org/cookieclicker
// @author       eisbaerBorealis
// @match        http*://orteil.dashnet.org/cookieclicker*
// @grant        none
// ==/UserScript==

/* INFO */
// https://cookieclicker.fandom.com/wiki/Achievement
// https://cookieclicker.fandom.com/wiki/Upgrades
// https://cookieclicker.fandom.com/wiki/Garden

/* CONSTANTS */
const botVersion = '1.4.0';
var ordering = {};

/* IMPORTANT VARIABLES */
var botSettings = {};
var miscSettings = {};
var countdowns = {};

var roundCount = 0;
var gameState = '(none)';

(function() {
    'use strict';

    console.log('  DEBUG: Start bot, v.' + botVersion);

    let stateCheck = setInterval(() => {
        if (document.readyState === 'complete') {
            try {
                clearInterval(stateCheck);
                startup();
            } catch(error) {
                console.error('ERROR: Startup failed' + error);
            }
        }
    }, 250);
})();

function startup() {
    console.log('  DEBUG: Started startup');

    // This is the website cookies disclaimer
    let disclaimers = document.getElementsByClassName('cc_btn_accept_all');
    if(disclaimers.length > 0) {
        disclaimers[0].click();
    }

    // Changes all the settings for lower graphics
    Game.prefs.fancy = 0;
    Game.prefs.particles = 0;
    Game.prefs.numbers = 0;
    Game.prefs.cursors = 0;
    Game.prefs.wobbly = 0;
    Game.prefs.focus = 0;
    Game.volume = 0;

    // Add the bot window
    addCSS();
    addWindow();

    // initialize which game mode to use
    updateState();

    // start up the main doRound function 20 times per second
    miscSettings.mainLoopInterval = setInterval(doRound, 50);

    console.log('  DEBUG: Finished startup');
}

function doRound() {
    roundCount++;
    doClicks();

    if(roundCount % 20 === 0) {
        doGoldenClicks();
        doRandomAchievements();
//         doUpgrades(); // includes buildings
//         doSeasonal(); // includes dragon
//         doGarden();
        if(roundCount % 200 === 0) {
            updateState();
//             doSugarLumps();
        }
    }
}

function updateState() {
    let oldState = gameState;

    if(gameState === "speedbaking" && (((Game.T / 30) > 900) || Game.Achievements["Speed baking III"].won === 1)) {
        gameState = 'preprestige';
    } else if(!botSettings.clicking && Game.Achievements["Speed baking III"].won === 0 && (Game.T / 30) < 900) {
        gameState = 'speedbaking';
    } else if(Game.Achievements["True Neverclick"].won === 0 && Game.cookieClicks === 0 && !botSettings.clicking) {
        gameState = 'noclick';
        if(Game.Achievements["Hardcore"].won === 0 && Game.UpgradesOwned === 0) {
            gameState += '&hardcore';
        }
    } else if(Game.Achievements["Hardcore"].won === 0 && Game.UpgradesOwned === 0 && !botSettings.upgrades) {
        gameState = "hardcore";
    }
//     else if(Game.prestige < 1324 && Game.prestige + Game.ascendMeterLevel >= 1324) {
//        gameState = "preprestige";
//     } else if(Game.prestige < 1000000000 && Game.ascendMeterLevel > Game.prestige * 2) {
//        gameState = "preprestige";
//     }
    else {
        gameState = "normal";
    }
    // seasonal, garden, normal, prestige, preprestige

    if(oldState !== gameState) {
        console.log('gameState changed from ' + oldState + ' to ' + gameState);
    }
}

function doClicks() {
    if(botSettings.clicking && gameState !== 'noclick' && gameState !== 'noclick&hardcore' && gameState !== 'preprestige') {
        Game.ClickCookie();

        if(gameState === 'speedbaking') {
            for(let i = 0; i < 9; i++) {
                Game.ClickCookie();
            }
        }
    }
}

function doGoldenClicks() {
    if(botSettings.golden && Game.shimmers.length > 0) {
        if(gameState === 'speedbaking') {
            Game.shimmers[0].pop();
        } else if(Game.Achievements["Fading luck"].won === 0) {
            // if(Game.shimmers[0].life < 10) {
            if(Game.shimmers[0].life < 11) {
                Game.shimmers[0].pop();
            }
        } else {
            Game.shimmers[0].pop();
            console.log('pop!');
        }
    }
}

function doRandomAchievements() {
    // Gets a bunch of unique, one-time achievements
    if(Game.Achievements["Tabloid addiction"].won === 0) {
        for(let i = 0; i < 50; i++) {
            document.getElementById("commentsText").click();
        }
    }

    if(Game.Achievements["Cookie-dunker"].won === 0) {
        miscSettings.leftWindowHeight = document.getElementById("backgroundLeftCanvas").getAttribute("height");
        document.getElementById("backgroundLeftCanvas").setAttribute("height", "100");
        console.log('Cookie Dunker: miscSettings.leftWindowHeight is ' + miscSettings.leftWindowHeight);
    } else if(miscSettings.leftWindowHeight !== undefined) {
        document.getElementById("backgroundLeftCanvas").setAttribute("height", miscSettings.leftWindowHeight);
        miscSettings.leftWindowHeight = undefined;
    }

    Game.bakeryNameSet("Orteil");
    Game.bakeryNameSet("Cookie Clicker Bot");

    Game.ClickTinyCookie();
    Game.Achievements["Here you go"].click();
}


/* BOT OPTIONS */
function addCSS() {
    let style = document.createElement('style');
    // style.type = 'text/css';
    style.type = 'text/css';

    style.innerHTML =
          '#botOptions {'
            + 'display: flex;'
            + 'flex-direction: column;'
            + 'position: fixed;'
            // + 'right: 10px;'
            + 'left: 5px;'
            + 'bottom: 35px;'
            + 'background-color: #3d3d85;'
            + 'padding: 5px;'
            + 'border-radius: 15px 15px 0px 0px;'
            + 'min-width: 99px; '
            + 'z-index: 5;}'
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
        + '.activeButton {'
            + 'background-color: #28a819 }'
        + '.inactiveButton {'
            + 'background-color: #a81919 }'
        ;

    document.getElementsByTagName('head')[0].appendChild(style);
    // console.log('EisDEBUG: finished adding CSS');
}

function addWindow() {
    let botHtml = '<div id="botOptions">'
                  + '<div id="optionsTitle">Bot Options</div>'
                  + '<div id="optionsBody">';

    botHtml += '<div id="toggleClicking" class="botButton inactiveButton">Main Cookie</div>';
    botHtml += '<div id="toggleGolden" class="botButton inactiveButton">Golden</div>';
    botHtml += '<div id="toggleUpgrades" class="botButton inactiveButton">Upgrades</div>';
    botHtml += '<div id="toggleBuildings" class="botButton inactiveButton">Buildings</div>';
    botHtml += '<div id="toggleSeasons" class="botButton inactiveButton">Seasons</div>';
    botHtml += '<div id="toggleGarden" class="botButton inactiveButton">Garden</div>';
    botHtml += '<div id="toggleDragon" class="botButton inactiveButton">Dragon</div>';
    botHtml += '<div id="togglePrestige" class="botButton inactiveButton">Prestige</div>';
    botHtml += '<div id="toggleSugarlumps" class="botButton inactiveButton">Sugar Lumps</div>';

    botHtml += '</div></div>';
    document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', botHtml);

    // console.log('EisDEBUG: finished adding Window HTML');

    botSettings.clicking = false;
    document.getElementById('toggleClicking').onclick = function() {
        console.log('EisDEBUG: Main Cookie option pressed');
        botSettings.clicking = !botSettings.clicking;
        document.getElementById('toggleClicking').classList.toggle('activeButton');
        document.getElementById('toggleClicking').classList.toggle('inactiveButton');
    };

    botSettings.golden = false;
    document.getElementById('toggleGolden').onclick = function() {
        console.log('EisDEBUG: Golden option pressed');
        botSettings.golden = !botSettings.golden;
        document.getElementById('toggleGolden').classList.toggle('activeButton');
        document.getElementById('toggleGolden').classList.toggle('inactiveButton');
    };

    botSettings.upgrades = false;
    document.getElementById('toggleUpgrades').onclick = function() {
        console.log('EisDEBUG: Upgrades option pressed');
        botSettings.upgrades = !botSettings.upgrades;
        document.getElementById('toggleUpgrades').classList.toggle('activeButton');
        document.getElementById('toggleUpgrades').classList.toggle('inactiveButton');
    };

    botSettings.buildings = false;
    document.getElementById('toggleBuildings').onclick = function() {
        console.log('EisDEBUG: Buildings option pressed');
        botSettings.buildings = !botSettings.buildings;
        document.getElementById('toggleBuildings').classList.toggle('activeButton');
        document.getElementById('toggleBuildings').classList.toggle('inactiveButton');
    };

    botSettings.seasons = false;
    document.getElementById('toggleSeasons').onclick = function() {
        console.log('EisDEBUG: Seasons option pressed');
        botSettings.seasons = !botSettings.seasons;
        document.getElementById('toggleSeasons').classList.toggle('activeButton');
        document.getElementById('toggleSeasons').classList.toggle('inactiveButton');
    };

    botSettings.garden = false;
    document.getElementById('toggleGarden').onclick = function() {
        console.log('EisDEBUG: Garden option pressed');
        botSettings.garden = !botSettings.garden;
        document.getElementById('toggleGarden').classList.toggle('activeButton');
        document.getElementById('toggleGarden').classList.toggle('inactiveButton');
    };

    botSettings.dragon = false;
    document.getElementById('toggleDragon').onclick = function() {
        console.log('EisDEBUG: Dragon option pressed');
        botSettings.dragon = !botSettings.dragon;
        document.getElementById('toggleDragon').classList.toggle('activeButton');
        document.getElementById('toggleDragon').classList.toggle('inactiveButton');
    };

    botSettings.prestige = false;
    document.getElementById('togglePrestige').onclick = function() {
        console.log('EisDEBUG: Prestige option pressed');
        botSettings.prestige = !botSettings.prestige;
        document.getElementById('togglePrestige').classList.toggle('activeButton');
        document.getElementById('togglePrestige').classList.toggle('inactiveButton');
    };

    botSettings.sugarlumps = false;
    document.getElementById('toggleSugarlumps').onclick = function() {
        console.log('EisDEBUG: Sugar Lumps option pressed');
        botSettings.sugarlumps = !botSettings.sugarlumps;
        document.getElementById('toggleSugarlumps').classList.toggle('activeButton');
        document.getElementById('toggleSugarlumps').classList.toggle('inactiveButton');
    };

    console.log('EisDEBUG: finished adding buttons');
}