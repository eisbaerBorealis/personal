/* CONSTANTS */
const BOT_VERSION = '0.0.1';
const TICK_LENGTH = 99;

/* IMPORTANT VARIABLES */
var botSettings = {};
var miscSettings = {};
var countdowns = {};

var gameLoop = null;
var roundCount = 0;
var gameState = '(none)';

/*(function() {
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
})();//*/

function startup() {
    console.log('  DEBUG: Start bot, v.' + BOT_VERSION);
    console.log('    DEBUG: Started startup()');

    addCSS();
    addWindow();

    gameLoop = setInterval(() => {
        doLoop();
    }, TICK_LENGTH)

    console.log('    DEBUG: Ended startup');
}

function doLoop() {
    roundCount++;
    if(roundCount % 20 === 0 || roundCount === 1) {
        console.log('  DEBUG: doLoop() on round ' + roundCount);
    }
}

function addCSS() {
    console.log('      DEBUG: Adding CSS');
    let style = document.createElement('style');
    // style.type = 'text/css';
/*
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
        ;//*/
    style.innerHTML =
       `#blocker {
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            z-index: 9999;
            background-color: #333333;
            opacity: 90%;
        }
        #botOptions {
            display: flex;
            flex-direction: column;
            position: fixed;
            left: 5px;
            bottom: 0px;
            background-color: #3d3d85;
            padding: 5px;
            border-radius: 15px 15px 0px 0px;
            min-width: 99px;
            z-index: 10000;}
        #optionsBody {
            display: none;
            flex-direction: column; }
        #optionsTitle {
            margin: 0 auto;
            color: white; }
        #optionsBody a {
            display: flex; }
        #botOptions:hover #optionsBody {
            display: flex; }
        .botButton {
            margin: 2px;
            padding: 3px 8px;
            border-radius: 10px;
            text-align: center;
            cursor: pointer; }
        .activeButton {
            background-color: #28a819 }
        .inactiveButton {
            background-color: #a81919 }`
        ;

    document.getElementsByTagName('head')[0].appendChild(style);
    console.log('        DEBUG: Added CSS');
}

function addWindow() {
    console.log('      DEBUG: Adding Window');
    /*let botHtml = '<div id="botOptions">'
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

    botHtml += '</div></div>';//*/
    let botHtml = 
       `<div id="blocker"></div>
        <div id="botOptions">
            <div id="optionsTitle">Bot Options</div>
            <div id="optionsBody">
                <div id="toggleClicking" class="botButton inactiveButton">Main Cookie</div>
                <div id="toggleGolden" class="botButton inactiveButton">Golden</div>
                <div id="toggleUpgrades" class="botButton inactiveButton">Upgrades</div>
                <div id="toggleBuildings" class="botButton inactiveButton">Buildings</div>
                <div id="toggleSeasons" class="botButton inactiveButton">Seasons</div>
                <div id="toggleGarden" class="botButton inactiveButton">Garden</div>
                <div id="toggleDragon" class="botButton inactiveButton">Dragon</div>
                <div id="togglePrestige" class="botButton inactiveButton">Prestige</div>
                <div id="toggleSugarlumps" class="botButton inactiveButton">Sugar Lumps</div>
            </div>
        </div>`;
    document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', botHtml);

    // console.log('EisDEBUG: finished adding Window HTML');

    /*botSettings.clicking = false;
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
    };//*/

    console.log('        DEBUG: Added Window');
}

startup();