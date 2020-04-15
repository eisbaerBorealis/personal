function API_loadPlayer() {
    thePlayer.loadPlayer();
    document.getElementById("saveSection").classList.add('hidden');
    startGame();
}

function API_reloadSave() {
    reloadSave();
}

function API_newPlayer() {
    newPlayer();
}

function API_closePopup() {
    closePopup();
}

function API_verboseLevel(newLevel) {
    verboseLevel = newLevel;
}