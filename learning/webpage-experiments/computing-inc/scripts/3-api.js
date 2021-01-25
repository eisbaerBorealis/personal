/**
 * This is available for users to program scripts if they wish.
 * It is intended to make it easy for someone to play the game through the console.
 */

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

function API_upgradeHatchery() {

}

function API_selectInHatchery(index) {
    thePlayer.hatcheries[0].toggleSelected(index);
    updateHatcheryButtons();
}

function API_moveToNextGen() {
    eisDebug(3, 'EisDebug @ API_moveToNextGen()');
    thePlayer.hatcheries[0].moveToNextGen();
    updateNextGen();
    thePlayer.hatcheries[0].clearSelected();
}

function API_moveToMine() {

}

function API_moveToFarm() {

}

function API_moveToFactory() {
    
}

function API_moveToArmy() {
    
}

function API_moveToDiscard() {
    thePlayer.discardSelected();
    thePlayer.hatcheries[0].updatedEnabledButtons();
    updateHatcheryButtons();
}

function API_swapRoyalty() {
    thePlayer.hatcheries[0].swapRoyalty();
    updateRoyalty();
    updateNextGen();
}