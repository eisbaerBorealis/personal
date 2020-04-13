function addPlayerHTML() {
    console.log('EisDebug @ htmlSetup.js addPlayerHTML() called.');

    let playerHTML = '<div id="playerProfile">' +
                    '<div id="playerImage"></div>' +
                    '<div id="playerName">Player Name</div></div>' +
                    '<div id="playerPreviews">' +
                    '<div id="playerHatcheries" class="layer2">Hatchery</div>' +
                    '<div id="playerProduction" class="layer2">Production</div>' +
                    '<div id="playerScience" class="layer2">Science</div>' +
                    '<div id="playerWar" class="layer2">War</div>' +
                    '<div id="playerSave" class="layer2">Save</div>' +
                    '</div>';

    document.getElementById('playerContent').innerHTML = playerHTML;
}

function addHatcheryHTML() {
    console.log('EisDebug @ htmlSetup.js addHatcheryHTML() called.');

    let hatcheryHTML = '<div id="royaltyContainer"></div>' +
                    '<div id="offspringContainer"></div>' +
                    '<div id="nextGenContainer"></div>';
    document.getElementById('hatcheriesContent').innerHTML = hatcheryHTML;

    let royaltyContainerHTML = '<div id="kingContainer"><div class="maleText">KING</div>' +
                    '</div>' +
                    '<div id="hatcheryTimer"></div>' +
                    '<div id="queenContainer"></div>';
    document.getElementById('royaltyContainer').innerHTML = royaltyContainerHTML;

}