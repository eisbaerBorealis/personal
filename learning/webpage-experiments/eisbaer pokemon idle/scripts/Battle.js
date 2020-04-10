class Battle {

    // GameEngine creates a new battle, Battle grabs some Pokemon and calls gameDisplay to update the battle box
    constructor(newEnemy, newSpecial) {
        this.enemyPokemon = newEnemy;
        this.playerPokemon = thePlayer.party[0];
        this.fightingPokemon = [thePlayer.party[0]];
        this.special = newSpecial;

        displayNewBattle(); // this needs to do something with trainers or something
    }

    switchPokemon(newPokemonId) {
        if(this.fightingPokemonHas(newPokemonId)) {
            this.fightingPokemon.push(newPokemonId);
        }
        this.playerPokemon = newPokemonId;
    }

    fightingListHas(pokeId) {
        let returnValue = false;
        for(let i = 0; i < fightingPokemon.length; i++) {
            if(fightingPokemon[i] === pokeId) {
                returnValue = true;
                i = fightingPokemon.length;
            }
        }
        return returnValue;
    }
}