const POPUP_X = '<div id="popupX" class="clickable">X</div>';

function alterInnerHtml(elemId, newHtml) {
    document.getElementById(elemId).innerHTML = newHtml;
}

function addClass(elemId, className) {
    document.getElementById(elemId).classList.add(className);
}

function removeClass(elemId, className) {
    document.getElementById(elemId).classList.remove(className);
}

function getInput(name) {
    return document.getElementsByName(name)[0].value;
}

function addButtons() {
    document.getElementById('loadPlayerButton').onclick = function() {
        API_loadPlayer();
    };
    document.getElementById('attemptReloadButton').onclick = function() {
        API_reloadSave();
    };
    document.getElementById('newPlayerButton').onclick = function() {
        API_newPlayer();
    };

    document.getElementById('popupGray').onclick = function() {
        API_closePopup();
    };

    document.getElementById('hatcheryUpgradeButton').onclick = function() {
        API_upgradeHatchery();
    };
    document.getElementById('moveToNextGen').onclick = function() {
        API_moveToNextGen();
    };
    document.getElementById('moveToMine').onclick = function() {
        API_moveToMine();
    };
    document.getElementById('moveToFarm').onclick = function() {
        API_moveToFarm();
    };
    // document.getElementById('moveToCarry').onclick = function() {
    //     API_moveToCarry();
    // };
    document.getElementById('moveToFactory').onclick = function() {
        API_moveToFactory();
    };
    document.getElementById('moveToArmy').onclick = function() {
        API_moveToArmy();
    };
    document.getElementById('moveToDiscard').onclick = function() {
        API_moveToDiscard();
    };
    document.getElementById('nextGenButton').onclick = function() {
        API_swapRoyalty();
    };

    let hexContainers = document.getElementById('offspringContainer').getElementsByClassName('hexContainer');
    for(let i = 0; i < hexContainers.length; i++) {
        hexContainers[i].onclick = function() {
            API_selectInHatchery(i);
        };
    }
}

function popup(html) {
    eisDebug(2, 'EisDebug @ popup()');

    document.getElementById('popupContainer').innerHTML = POPUP_X + html;
    document.getElementById('popupGray').classList.remove('hidden');

    if(document.getElementById('popupX').onclick === null) {
        document.getElementById('popupX').onclick = function() {
            API_closePopup();
        };
    }
}

function closePopup() {
    document.getElementById('popupGray').classList.add('hidden');
}

function updateTimer(value) {
    document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray',
            value);
}

function hexInfoToHtml(hexInfo) {
    return '<div class="hexTextHeader">ID: ' + hexInfo[0] + '</br>SCORE: ' + hexInfo[1] +
            '</div><div class="hexTextStatsBox"><div class="hexTextStatsBoxInner">' +
            'VIT: ' + hexInfo[2] + '</br>STR: ' + hexInfo[3] + '</br>ATT: ' + hexInfo[4] +
            '</div><div class="hexTextStatsBoxInner">' +
            'DEF: ' + hexInfo[5] + '</br>AGL: ' + hexInfo[6] + '</br>INT: ' + hexInfo[7] +
            '</div></div>';
}

function updateRoyalty() {
    let hexagons = document.getElementById('royaltyContainer').getElementsByClassName('hexagonText');
    let kingStats = thePlayer.getKingStats();
    let queenStats = thePlayer.getQueenStats();

    let kingHtml = hexInfoToHtml(kingStats);
    let queenHtml = hexInfoToHtml(queenStats);
    
    hexagons[0].innerHTML = kingHtml;
    hexagons[1].innerHTML = queenHtml;
}

function updateOffspring() {
    let hexagonTexts = document.getElementById('offspringContainer').getElementsByClassName('hexagonText');
    let nestSize = thePlayer.getNestSize();
    let critters = thePlayer.getNestCritters();

    for(let i = 0; i < hexagonTexts.length; i++) {
        let hexagon = document.getElementById('offspringContainer').getElementsByClassName('hexagon')[i];

        if(i < critters.length) {
            hexagonTexts[i].innerHTML = hexInfoToHtml(critters[i].getHexInfo());

            if(!critters[i].getIsFemale()) {
                if(!hexagon.classList.contains('hexMale')) {
                    removeHexClasses(hexagon);
                    hexagon.classList.add('hexMale');
                    hexagon.classList.add('maleBG');
                }
            } else {
                if(!hexagon.classList.contains('hexFemale')) {
                    removeHexClasses(hexagon);
                    hexagon.classList.add('hexFemale');
                    hexagon.classList.add('femaleBG');
                }
            }
        } else if(i < nestSize) {
            if(hexagonTexts[i].innerHTML) {
                hexagonTexts[i].innerHTML = '';
            }
            if(!hexagon.classList.contains('hexEmpty')) {
                removeHexClasses(hexagon);
                hexagon.classList.add('hexEmpty');
                hexagon.classList.add('emptyBG');
            }
        } else {
            if(hexagonTexts[i].innerHTML) {
                hexagonTexts[i].innerHTML = '';
            }
            if(!hexagon.classList.contains('hexDisabled')) {
                removeHexClasses(hexagon);
                hexagon.classList.add('hexDisabled');
                hexagon.classList.add('disabledBG');
            }
        }
    }
}

function removeHexClasses(hexagon) {
    if(hexagon.classList.contains('hexDisabled')) {
        hexagon.classList.remove('hexDisabled');
        hexagon.classList.remove('disabledBG');
    } else if(hexagon.classList.contains('hexEmpty')) {
        hexagon.classList.remove('hexEmpty');
        hexagon.classList.remove('emptyBG');
    } else if(hexagon.classList.contains('hexMale')) {
        hexagon.classList.remove('hexMale');
        hexagon.classList.remove('maleBG');
    } else if(hexagon.classList.contains('hexFemale')) {
        hexagon.classList.remove('hexFemale');
        hexagon.classList.remove('femaleBG');
    }
}

function updateNextGen() {
    let hexagons = document.getElementById('nextGenContainer').getElementsByClassName('hexagonText');
    if(thePlayer.hatcheries[0].nextKing) {
        hexagons[0].innerHTML = hexInfoToHtml(thePlayer.hatcheries[0].nextKing.getHexInfo());
    } else {
        hexagons[0].innerHTML = '';
    }

    if(thePlayer.hatcheries[0].nextQueen) {
        hexagons[1].innerHTML = hexInfoToHtml(thePlayer.hatcheries[0].nextQueen.getHexInfo());
    } else {
        hexagons[1].innerHTML = '';
    }

    updateNextGenButton();
}

function updateSelected() {
    let hexContainers = document.getElementById('offspringContainer').getElementsByClassName('hexContainer');
    let isSelected = thePlayer.getSelected();

    for(let i = 0; i < hexContainers.length; i++) {
        if(!isSelected[i] &&  hexContainers[i].classList.contains('selected') ||
            isSelected[i] && !hexContainers[i].classList.contains('selected')) {
            hexContainers[i].classList.toggle('selected');
        }
    }

    updateHatcheryButtons();
}

function updateHatcheryButtons() {
    eisDebug(2, 'EisDebug @ updateHatcheryButtons()');

    let buttons = [];

    let containers = document.getElementsByClassName('moveOffspringContainer');
    for(let i = 0; i < containers.length; i++) {
        for(let j = 0; j < containers[i].getElementsByClassName('button').length; j++) {
            buttons.push(containers[i].getElementsByClassName('button')[j]);
        }
    }

    let isEnabled = thePlayer.getEnabledButtons();
    for(let i = 0; i < buttons.length; i++) {
        if(!isEnabled[i] &&  buttons[i].classList.contains('clickable') ||
            isEnabled[i] && !buttons[i].classList.contains('clickable')) {
                buttons[i].classList.toggle('clickable');
                buttons[i].classList.toggle('disabled');
        }
    }
}

function updateNextGenButton() {
    let nextGenEnabled = thePlayer.hatcheries[0].enabledButtons.nextGen;
    let nextGenButton = document.getElementById('nextGenButton');
    if(!nextGenEnabled &&  nextGenButton.classList.contains('clickable') ||
        nextGenEnabled && !nextGenButton.classList.contains('clickable')) {
            nextGenButton.classList.toggle('clickable');
            nextGenButton.classList.toggle('disabled');
    }
}