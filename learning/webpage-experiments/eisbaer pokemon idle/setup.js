var reloadFailCount;
var thePlayer;
var theGameEngine;

(function() {
	let stateCheck = setInterval(() => {
		if (document.readyState === 'complete')
		{
            clearInterval(stateCheck);
            setup();
		}
	}, 100);
})();

function setup() {
    reloadFailCount = 0;
    // console.log('EisbaerDebug@setup.setup()');
    thePlayer = new Player();

    // localStorage.clear(); console.log('WARNING: localStorage is getting automatically wiped.');

    if(localStorage.length === 0) {
        document.getElementById("reload").onclick = function() {
            reloadSave();
        };
    } else {
        document.getElementById('no-save').classList.add('hidden');
        document.getElementById('reload').classList.add('hidden');
        document.getElementById('load-game').classList.remove('hidden');
        document.getElementById('load-found').innerHTML = 'A character has been found with the name "' +
            JSON.parse(localStorage.playerJSON).name + '"';
        
        document.getElementById("load-character").onclick = function() {
            thePlayer.loadPlayer();
thePlayer.objectives[1] = false; // FOR TESTING
            setupGameDivs();
            startEngine();
        };
    }
    // document.getElementById("create-character").onclick = function() {
    //     if(createCharacter()) {
    //         setupGameDivs();
    //         startEngine();
    //     }
    // };

    addButtons();
}

function setupGameDivs() {
    document.getElementById('start-game').classList.add('hidden');
    document.getElementById('badges').classList.remove('hidden');
    document.getElementById('map').classList.remove('hidden');
    document.getElementById('activity').classList.remove('hidden');
    document.getElementById('pokemon-team').classList.remove('hidden');
    document.getElementById('inventory').classList.remove('hidden');
    document.getElementById('pokemon-storage').classList.remove('hidden');
    document.getElementById('pokedex').classList.remove('hidden');
    document.getElementById('stats').classList.remove('hidden');
    document.getElementById('settings').classList.remove('hidden');

    document.getElementById('badges-label').innerHTML = thePlayer.getName();
    updateActions();
}

function addButtons() {
    document.getElementById("popup-container-soft").onclick = function() {
        document.getElementById('popup-container-soft').classList.add('hidden');
        document.getElementById('popup-box').classList.add('hidden');
        // document.getElementById('special-popup').classList = 'hidden';
    };
    document.getElementById("popup-box").onclick = function() {
        document.getElementById('popup-container-soft').classList.add('hidden');
        document.getElementById('popup-box').classList.add('hidden');
    };
    // document.getElementById("special-popup").onclick = function() {
    //     document.getElementById('popup-container').classList.add('hidden');
    //     document.getElementById('special-popup').classList = 'hidden';
    // };
    document.getElementById("create-character").onclick = function() {
        if(createCharacter()) {
            setupGameDivs();
            startEngine();
        }
    };
}

function startEngine() {
    theGameEngine = new GameEngine();
}

function reloadSave() {
    if(localStorage.length > 0) {
        thePlayer.loadPlayer();
        document.getElementById('new-player').classList.add('hidden');
    } else {
        reloadFailCount++;
        document.getElementById('reload-fail').innerHTML = 'Reload failed ' + reloadFailCount + ' time(s). Try again or create a new character.';
        document.getElementById('reload-fail').classList.remove('hidden');
    }
}

function createCharacter() {
    let success = false;
    let newName = document.getElementsByName('new-name')[0].value;
    let newGender = null;
    let newRivalName = document.getElementsByName('new-rival-name')[0].value;

    let newGenderGroup = document.getElementsByName('gender');
    for(let i = 0; i < newGenderGroup.length; i++) {
        if(newGenderGroup[i].checked) {
            newGender = newGenderGroup[i].value;
            i = newGenderGroup.length
        }
    }

    let goodName = false;
    let goodGender = false;
    let goodRival = false;

    if(newName.match(/[A-z0-9]+/g) != null) {
        goodName = true;
    }
    if(newGender !== null) {
        goodGender = true;
    }
    if(newRivalName.match(/[A-z0-9]+/g) != null) {
        goodRival = true;
    }

    if(!goodName || !goodGender || !goodRival) {
        let errorHTML = '<h2>Error</h2>';
        if(!goodName) {
            errorHTML += '<p>Your name: "' + newName + '". Please include at least one letter or number.</p>';
        }
        if(!goodGender) {
            errorHTML += '<p>Please select a gender.</p>';
        }
        if(!goodRival) {
            errorHTML += '<p>Your rival\'s name: "' + newRivalName + '". Please include at least one letter or number.</p>';
        }
        showPopup(errorHTML);
    } else {
        thePlayer.newPlayer(newName, newGender, newRivalName);
        success = true;
    }
    console.log('EisbaerDebug@createCharacter, returning ' + success);
    return success;
}

function showPopup(popupHTML) {
    document.getElementById('popup-container-soft').classList.remove('hidden');
    document.getElementById('popup-box').classList.remove('hidden');
    document.getElementById('popup-box').innerHTML = popupHTML;
}