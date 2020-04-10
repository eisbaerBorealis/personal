const LEVELUP_MODIFIER = 0.8;
const LEVELUP_EXPONENT = 1.5;
const NORMAL_SHINY_CHANCE = 1/500;
const RARE_SHINY_CHANCE = 1/5;

class Pokemon {

    // WARNING: newSpeciesId starts at 1, not 0
    constructor(newSpeciesId, newLevel, isRare) {
        this.individualId = null;
        this.speciesId = newSpeciesId;
        this.gender = this.getNewGender();
        this.isShiny = this.getNewShiny(isRare);
        this.level = newLevel;
        // this.experience = this.getNewExperience();
        this.experience = 0;
        this.maxHP = this.updateMaxHP();
        this.currentHP = this.maxHP;
    }

    static getPokemonFromObject(pokeObj) {
        let returnPokemon = new Pokemon(pokeObj.speciesId, pokeObj.level, false);

        returnPokemon.individualId = pokeObj.individualId;
        returnPokemon.gender = pokeObj.gender;
        returnPokemon.isShiny = pokeObj.isShiny;
        returnPokemon.currentHP = pokeObj.currentHP;
        returnPokemon.experience = pokeObj.experience;

        return returnPokemon;
    }

    getIndividualId() {
        return this.individualId;
    }

    getSpeciesId() {
        return this.speciesId;
    }

    getIsShiny() {
        return this.isShiny;
    }

    getSpeciesName() {
        return data_pokemon[this.speciesId - 1].name;
    }

    getHPString() {
        // hpString = this.currentHP + '/' + this.maxHP;
        return this.currentHP + '/' + this.maxHP;
    }

    getHPPercent() {
        return this.currentHP / this.maxHP * 100;
    }

    getExpPercent() {
        return this.experience / this.getNextExp() * 100;
    }

    updateMaxHP() {
        let baseHP = data_pokemon[this.speciesId - 1]['base-hp'];
        return Math.floor(baseHP + (baseHP / 100 * this.level));
    }

    // For new/captured Pokemon
    setId(newId) {
        this.individualId = newId;
    }

    // getNewExperience() {
    //     // TODO - actual experience formula
    //     return 0;
    // }

    getNextExp() {
        let nextExp = 0;
        if(this.level < 100) {
            // nextExp = Math.floor(0.5 + (EXP_MODIFIER * Math.pow(this.level, EXP_EXPONENT)));
            nextExp = Math.floor(LEVELUP_MODIFIER * Math.pow(this.level, LEVELUP_EXPONENT) + 1);
        }
        return nextExp;
    }

    getNewGender() {
        let returnGender = 'none';
        let maleChance = data_pokemon[this.speciesId - 1]['male-chance'];

        if(maleChance === -1) {
            returnGender = 'none';
        } else if(Math.random < data_pokemon[this.speciesId - 1]['male-chance']) {
            returnGender = 'male';
        } else {
            returnGender = 'female';
        }

        return returnGender;
    }

    getNewShiny(isRare) {
        let chance = NORMAL_SHINY_CHANCE;
        if(isRare) {
            chance = RARE_SHINY_CHANCE;
        }
        return Math.random() < chance;
    }

    // Act on the Pokemon
    addExperience(newExp) {
        if(this.level < 100) {
            this.experience += newExp;
            if(this.experience > this.getNextExp()) {
                this.levelUp();
            }
        }
    }

    levelUp() {
        this.experience -= this.getNextExp();
        let oldMaxHp = this.maxHP;

        this.level++;

        if(this.level === 100) {
            this.experience = 0;
            thePlayer.addMaxedPokemon();
        }
        this.updateMaxHP();
        if(this.currentHP > 0) {
            this.currentHP += (this.maxHP - oldMaxHp);
        }
    }
}