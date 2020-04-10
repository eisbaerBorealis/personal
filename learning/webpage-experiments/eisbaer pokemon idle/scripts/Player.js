class Player {

    constructor() {
        this.name = '';
        this.gender = null;
        this.rivalName = null;
        this.rivalType = -1;
        this.location = null;
        this.pokemon = [];
        this.party = [];
        this.inventory = [];
        this.money = 0;
        this.timePlayed = 0;
        this.badges = 0;
        this.pokedex = [];
        this.achievements = [];
        this.objectives = [];
        this.miniObjectives = [];
        this.unlockedActions = [];
        this.cooldowns = {};
        this.upgrades = {};
        this.normalStats = {};
        this.totalStats = {};
        this.settings = {};
    }

    newPlayer(newName, newGender, newRivalName) {
        console.log('EisbaerDebug@Player.newPlayer, name is ' + newName + ', gender is ' + newGender + ', rival name is ' + newRivalName);

        this.normalStats = data_newPlayer.normalStats;
        this.totalStats = data_newPlayer.totalStats;
        this.settings = data_newPlayer.settings;
        this.cooldowns = data_newPlayer.cooldowns;

        this.name = newName;
        this.gender = newGender;
        this.rivalName = newRivalName;

        this.location = data_newPlayer.location;
        this.money = data_newPlayer.money;

        for(let i = 0; i < data_pokemon.length; i++) {
            // this.pokedex.push( [false, 0, 0, 0, 0] );
            this.pokedex.push( {'seen': false, 'captured': [0, 0, 0, 0]} );
            //  seen, captured, shiny captured, total captured, and total shiny captured
        }
        for(let i = 0; i < data_objectives.length; i++) {
            this.objectives.push(false);
        }
        for(let i = 0; i < data_miniObjectives.length; i++) {
            this.miniObjectives.push(false);
        }
        for(let i = 0; i < data_actions.length; i++) {
            this.unlockedActions.push(false);
        }

        this.savePlayer();
    }

    loadPlayer() {
        let playerData = JSON.parse(localStorage.playerJSON);

        this.name = playerData.name;
        this.gender = playerData.gender;
        this.rivalName = playerData.rivalName;
        this.rivalType = playerData.rivalType;
        this.location = playerData.location;
        this.pokemon = playerData.pokemon;
        this.party = playerData.party;
        this.inventory = playerData.inventory;
        this.money = playerData.money;
        this.timePlayed = playerData.timePlayed;
        this.badges = playerData.badges;
        this.pokedex = playerData.pokedex;
        this.achievements = playerData.achievements;
        this.objectives = playerData.objectives;
        this.miniObjectives = playerData.miniObjectives;
        this.unlockedActions = playerData.unlockedActions;
        this.cooldowns = playerData.cooldowns;
        this.upgrades = playerData.upgrades;
        this.normalStats = playerData.normalStats;
        this.totalStats = playerData.totalStats;
        this.settings = playerData.settings;

        for(let i = 0; i < this.pokemon.length; i++) {
            this.pokemon[i] = Pokemon.getPokemonFromObject(this.pokemon[i]);
        }
    }

    savePlayer() {
        localStorage.setItem('playerJSON', JSON.stringify(this));
    }

    addSecond() {
        this.timePlayed++;
    }

    getName() {
        return this.name;
    }

    getNextPokemonId() {
        this.settings.lastPokemonId++;
        return this.settings.lastPokemonId;
    }

    getLocationId() {
        return this.location;
    }

    changeLocation(newLocationId) {
        this.location = newLocationId;
    }

    isActionUnlocked(actionId) {
        return this.unlockedActions[actionId];
    }

    unlockAction(actionId) {
        this.unlockedActions[actionId] = true;
        // console.log('EisbaerDebug@unlockAction, action ' + actionId + ' unlocked!');
    }

    getLocalActionIds() {
        // console.log('data_locations[this.getLocationId()].actions is ' + data_locations[this.getLocationId()].actions);
        return data_locations[this.getLocationId()].actions;
    }

    getLocalUnlockedActions() {
        let locationActions = this.getLocalActionIds();
        let exploredActions = [];

        for(let i = 0; i < locationActions.length; i++) {
            if(thePlayer.isActionUnlocked(locationActions[i])) {
                exploredActions.push(locationActions[i]);
            }
        }
        // console.log('EisbaerDebug@getLocalUnlockedActions, exploredActions is ' + exploredActions);
        return exploredActions;
    }

    getObjectives() {
        return this.objectives;
    }

    getMiniObjectives() {
        return this.miniObjectives;
    }

    completeObjective(id) {
        this.objectives[id] = true;
        // console.log('EisbaerDebug@Player, Objective #' + id + ' is now ' + this.objectives[id]);
    }

    completeMiniObjective(id) {
        this.miniObjectives[id] = true;
    }

    catchPokemon(newPokemon) {
        newPokemon.setId(this.totalStats.pokemonCaptured + 1);
        console.log('EisbaerDebug@catchPokemon, newPokemon is ' + newPokemon);

        this.normalStats.pokemonCaptured++;
        this.totalStats.pokemonCaptured++;

        let newPokeId = newPokemon.getSpeciesId() - 1;

        this.pokedex[newPokeId].captured[0]++;
        this.pokedex[newPokeId].captured[2]++;

        if(newPokemon.getIsShiny()) {
            this.normalStats.shinyPokemonCaptured++;
            this.totalStats.shinyPokemonCaptured++;
            this.pokedex[newPokeId].captured[1]++;
            this.pokedex[newPokeId].captured[3]++;
        }

        if(!this.pokedex[newPokeId].seen) {
            this.pokedex[newPokeId].seen = true;
        }

        this.pokemon.push(newPokemon);
        if(this.party.length < 6) {
            this.party.push(newPokemon.getIndividualId());
        }
    }

    hasItem(itemId) {
        let itemIndex = -1;

        for(let i = 0; i < this.inventory.length; i++) {
            // console.log('this.inventory[i].id and itemId are ' + this.inventory[i].id + ' and ' + itemId);
            if(this.inventory[i].id == itemId) {
                itemIndex = i;
                i = this.inventory.length;
            }
        }
        // console.log('EisbaerDebug@hasItem, itemIndex is ' + itemIndex);

        return itemIndex;
    }

    alterItemCount(id, number) {
        let itemIndex = this.hasItem(id);
        if(itemIndex === -1) {
            this.inventory.push({'id': id, 'count': number});
            itemIndex = this.inventory.length - 1;
        } else {
            this.inventory[itemIndex].count += number;
        }

        if(this.inventory[itemIndex].count <= 0) {
            if(itemIndex != this.inventory.length - 1) {
                let tempItem = this.inventory[itemIndex];
                this.inventory[itemIndex] = this.inventory[this.inventory.length - 1];
                this.inventory[this.inventory.length - 1] = tempItem;
            }
            this.inventory.pop();
        }
    }

    // inventoryHas(id) {
    //     for(let i = 0; i < this.inventory.length; i++) {

    //     }
    // }

    getPokemonFromId(individualId) {
        let returnPokemon = null;
        for(let i = 0; i < this.pokemon.length; i++) {
            if(individualId === this.pokemon[i].getIndividualId()) {
                returnPokemon = this.pokemon[i];
                i = this.pokemon.length;
            }
        }

        if(returnPokemon===null){console.log('EisbaerDebug@getPokemonFromId, returnPokemon is null');}
        return returnPokemon;
    }

    getPartyPokemon(position) {
        return this.getPokemonFromId(this.party[position - 1]);
    }

    addMaxedPokemon() {
        this.normalStats.pokemonMaxed++;
        this.totalStats.pokemonMaxed++;
    }

    setRivalType(newRivalType) {
        this.rivalType = newRivalType;
    }
}