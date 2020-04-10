function doSpecial(specialId) {
    switch(specialId) {
        case 0:
            starterPokemon();
            break;
        default:
            console.log('EisbaerDebug@doSpecial, switch hit default.');
    }
}

function starterPokemon() {
    console.log('EisbaerDebug@starterPokemon');
    document.getElementById('popup-container-hard').classList.remove('hidden');
    document.getElementById('special-popup').classList = 'starter-popup';

    document.getElementById('special-popup').innerHTML = '<h2>Choose your first Pokemon!</h2>' +
        '<div id="starter-pokemon">' +
            '<div id="starter-1" class="starter-container"><img src="' + data_pokemon[0].image + '"><p>' + data_pokemon[0].name + '</p></div>' + 
            '<div id="starter-2" class="starter-container"><img src="' + data_pokemon[3].image + '"><p>' + data_pokemon[3].name + '</p></div>' + 
            '<div id="starter-3" class="starter-container"><img src="' + data_pokemon[6].image + '"><p>' + data_pokemon[6].name + '</p></div>' + 
        '</div>';

    document.getElementById("starter-1").onclick = function() {
        console.log('EisbaerDebug, Bulbasaur chosen!');
        thePlayer.catchPokemon(new Pokemon(1, 5, true));
        document.getElementById('popup-container-hard').classList.add('hidden');
        document.getElementById('special-popup').classList = 'hidden';
        updatePokemonTeam();
        thePlayer.setRivalType(0);
    };
    document.getElementById("starter-2").onclick = function() {
        console.log('EisbaerDebug, Charmander chosen!');
        thePlayer.catchPokemon(new Pokemon(4, 5, true));
        document.getElementById('popup-container-hard').classList.add('hidden');
        document.getElementById('special-popup').classList = 'hidden';
        updatePokemonTeam();
        thePlayer.setRivalType(1);
    };
    document.getElementById("starter-3").onclick = function() {
        console.log('EisbaerDebug, Squirtle chosen!');
        thePlayer.catchPokemon(new Pokemon(7, 5, true));
        document.getElementById('popup-container-hard').classList.add('hidden');
        document.getElementById('special-popup').classList = 'hidden';
        updatePokemonTeam();
        thePlayer.setRivalType(2);
    };
}