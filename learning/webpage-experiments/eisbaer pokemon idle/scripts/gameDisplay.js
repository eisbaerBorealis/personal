function updateActions() {
    let currentLocation = data_locations[thePlayer.getLocationId()];

    let exploredActions = thePlayer.getLocalUnlockedActions();
    let actionsHTML = '<div id="action-explore" class="button">EXPLORE</div>';
    for(let i = 0; i < exploredActions.length; i++) {
        // example: exploredActions is [0, 2]
        actionsHTML += '<div id="action-' + exploredActions[i] + '" class="button">' +
        data_actions[exploredActions[i]].text + '</div>';
    }

    document.getElementById('location').innerHTML = 'Location: ' + currentLocation.name;
    document.getElementById('explored-count').innerHTML = 'Explored: ' + exploredActions.length + '/' + thePlayer.getLocalActionIds().length;
    document.getElementById('actions').innerHTML = actionsHTML;
    
    document.getElementById('action-explore').onclick = function() {
        theGameEngine.startAction(-1);
    };

    for(let i = 0; i < exploredActions.length; i++) {
        let actionDivId = 'action-' + exploredActions[i];
        document.getElementById(actionDivId).onclick = function() {
            theGameEngine.startAction(exploredActions[i]);
        };
    }
}

function updatePokemonTeam() {
    for(i = 0; i < thePlayer.party.length; i++) {
        updatePokemon(i);
    }
}

function updatePokemon(position) {
    thisPokemon = thePlayer.getPokemonFromId(thePlayer.party[position]);

    if(hasClass(document.getElementsByClassName('party-pkmn')[position], 'hidden')) {
        document.getElementsByClassName('party-pkmn')[position].classList = 'party-pkmn';
    }

    document.getElementsByClassName('party-pkmn')[position].innerHTML = '<div class="party-image">' +
            '<img src="' + data_pokemon[thisPokemon.getSpeciesId()-1].image + '"></div>' +
            '<div class="party-info flex-col"><div class="party-text">' + thisPokemon.getSpeciesName() +
            '\n' + thisPokemon.getHPString() + '</div> <div class="full-hp">' +
            '<div id="pokemon-' + (position + 1) + '-hp"></div></div>' +
            '<div class="full-exp">' + '<div id="pokemon-' + (position + 1) + '-exp" class="exp-bar"></div></div></div>';

    let hpPercent = thePlayer.getPartyPokemon(position + 1).getHPPercent();
    let hpElement = document.getElementById('pokemon-' + (position+1) + '-hp');
    hpElement.style.width = '' + hpPercent + '%';

    if(hpPercent <= 100 && hpPercent > 66) {
        hpElement.classList = 'green-hp';
    } else if(hpPercent > 33) {
        hpElement.classList = 'yellow-hp';
    } else if(hpPercent >= 0) {
        hpElement.classList = 'red-hp';
    } else {
        console.log('EisbaerDebug@updatePokemon, HP percent is not 0-100');
    }
    
    // let hpPercent = thePlayer.getPartyPokemon(position + 1).getHPPercent();
    document.getElementById('pokemon-' + (position+1) + '-exp').style.width = '' + (thePlayer.getPartyPokemon(position + 1).getExpPercent()) + '%';
    // hpElement.style.width = '' + hpPercent + '%';
    // Needed: Pokemon image, name, HP, EXP, NEEDS LEVEL
}

function changeHP(position, newHPPercent) {

}

function hasClass(element, className) {
    let returnValue = false;
    for(let i = 0; i < element.classList.length; i++) {
        if(element.classList[i] === className) {
            returnValue = true;
            i = element.classList.length;
        }
    }
    return returnValue;
}

function displayNewBattle(enemyPokemon) {
    document.getElementById('battle-box').classList.remove('hidden');
    // <div id="my-pokemon"></div>
    //     <div id="commands"></div>
    //     <div id="enemy-pokemon"></div>
    let thisPokemon = thePlayer.getPokemonFromId(thePlayer.party[0]);
    // document.getElementById('my-pokemon').innerHTML = '<div id="my-pokemon-image" class="party-image"></div>' +
    // '<div class="party-info flex-col"><div class="party-text"></div> <div class="full-hp">' +
    // '<div id="pokemon-7-hp"></div></div><div class="full-exp">' + '<div id="pokemon-7-exp" class="exp-bar"></div></div></div>';

    // document.getElementsByClassName('party-pkmn')[position].innerHTML = '<div class="party-image">' +
    //         '<img src="' + data_pokemon[thisPokemon.getSpeciesId()-1].image + '"></div>' +
    //         '<div class="party-info flex-col"><div class="party-text">' + thisPokemon.getSpeciesName() +
    //         '\t' + thisPokemon.getHPString() + '</div> <div class="full-hp">' +
    //         '<div id="pokemon-' + (position + 1) + '-hp"></div></div>' +
    //         '<div class="full-exp">' + '<div id="pokemon-' + (position + 1) + '-exp" class="exp-bar"></div></div></div>';
    document.getElementById('fighter-image').innerHTML = '<img src="' + data_pokemon[thisPokemon.getSpeciesId()-1].image + '"></div>';
    document.getElementById('fighter-text').innerHTML = thisPokemon.getSpeciesName() + '\n' + thisPokemon.getHPString() + '</div>';

    let hpPercent = thePlayer.getPartyPokemon(1).getHPPercent();
    let hpElement = document.getElementById('fighter-hp');
    hpElement.style.width = '' + hpPercent + '%';

    if(hpPercent <= 100 && hpPercent > 66) {
        hpElement.classList = 'green-hp';
    } else if(hpPercent > 33) {
        hpElement.classList = 'yellow-hp';
    } else if(hpPercent >= 0) {
        hpElement.classList = 'red-hp';
    } else {
        console.log('EisbaerDebug@updatePokemon, HP percent is not 0-100');
    }

    //trainerId is not defined
    // console.log('EisbaerDebug@updatePokemon, trainerId is ' + trainerId);
    // console.log('EisbaerDebug@updatePokemon, data_trainers[trainerId] is ' + data_trainers[trainerId]);
    // let enemyData = data_trainers[trainerId].pokemon[pokemonId];
    // let enemyData = data_trainers[trainerId].pokemon[pokemonId];
    // let enemyPokemon = new Pokemon(enemyData.id, enemyData.level, false);

    document.getElementById('enemy-image').innerHTML = '<img src="' + data_pokemon[enemyPokemon.getSpeciesId()-1].image + '"></div>';
    document.getElementById('enemy-text').innerHTML = enemyPokemon.getSpeciesName() + '\n' + enemyPokemon.getHPString() + '</div>';

    hpPercent = thePlayer.getPartyPokemon(1).getHPPercent();
    hpElement = document.getElementById('fighter-hp');
    hpElement.style.width = '' + hpPercent + '%';

    if(hpPercent <= 100 && hpPercent > 66) {
        hpElement.classList = 'green-hp';
    } else if(hpPercent > 33) {
        hpElement.classList = 'yellow-hp';
    } else if(hpPercent >= 0) {
        hpElement.classList = 'red-hp';
    } else {
        console.log('EisbaerDebug@updatePokemon, HP percent is not 0-100');
    }
}

function hideBattle() {
    document.getElementById('activity-box').classList.remove('faded');
    document.getElementById('battle-box').classList.add('hidden');
}