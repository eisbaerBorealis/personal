// const LEVELUP_MODIFIER = 0.8;

class Critter {

    constructor(newId, newGeneration, newType, newStats, newMutations) {
        this.id = newId;
        this.generation = newGeneration;
        this.type = newType;
        this.isFemale = Math.random() >= 0.5;

        this.baseVitality     = newStats[0];
        this.baseStrength     = newStats[1];
        this.baseAttack       = newStats[2];
        this.baseDefense      = newStats[3];
        this.baseAgility      = newStats[4];
        this.baseIntelligence = newStats[5];

        this.mutations = newMutations;

        this.finalVitality     = this.baseVitality;
        this.finalStrength     = this.baseStrength;
        this.finalAttack       = this.baseAttack;
        this.finalDefense      = this.baseDefense;
        this.finalAgility      = this.baseAgility;
        this.finalIntelligence = this.baseIntelligence;

        this.score;
        this.updateFinalStats();

        this.location = '';

        // thePlayer.addCritter(this);
    }

    updateFinalStats() {
        for(let i = 0; i < this.mutations.length; i++) {
            // mutations will each have an id, which stat it effects, and a value (which implies whether it is expressed)
            switch(mutations[i].stat) {
                case 'vitality':
                    if(mutations[i].value > 0) {
                        this.finalVitality += this.baseVitality * mutations[i].value;
                    }
                    break;
                case 'strength':
                    if(mutations[i].value > 0) {
                        this.finalStrength += this.baseStrength * mutations[i].value;
                    }
                    break;
                case 'attack':
                    if(mutations[i].value > 0) {
                        this.finalAttack += this.baseAttack * mutations[i].value;
                    }
                    break;
                case 'defense':
                    if(mutations[i].value > 0) {
                        this.finalDefense += this.baseDefense * mutations[i].value;
                    }
                    break;
                case 'agility':
                    if(mutations[i].value > 0) {
                        this.finalAgility += this.baseAgility * mutations[i].value;
                    }
                    break;
                case 'intelligence':
                    if(mutations[i].value > 0) {
                        this.finalIntelligence += this.baseIntelligence * mutations[i].value;
                    }
                    break;
                default:
                    // console.log('EisError: defaulted in updateFinalStats for mutations[i].stat.');
                    eisDebug(1, 'EisError: defaulted in updateFinalStats for mutations[i].stat.');
            }            
        }

        this.score = (this.finalVitality + this.finalStrength + this.finalAttack +
                    this.finalDefense + this.finalAgility + this.finalIntelligence) / 6;
        this.score = Math.floor(this.score * 10) / 10;
    }

    setIsFemale(newIsFemale) {
        this.isFemale = newIsFemale;
    }

    getIsFemale() {
        return this.isFemale;
    }

    setLocation(newLocation) {
        this.location = newLocation;
    }

    getBaseStats() {
        return [
            this.baseVitality,
            this.baseStrength,
            this.baseAttack,
            this.baseDefense,
            this.baseAgility,
            this.baseIntelligence
        ];
    }

    getFinalStats() {
        return [
            this.finalVitality,
            this.finalStrength,
            this.finalAttack,
            this.finalDefense,
            this.finalAgility,
            this.finalIntelligence
        ];
    }

    getHexInfo() {
        return [
            this.id,
            this.score,
            this.finalVitality,
            this.finalStrength,
            this.finalAttack,
            this.finalDefense,
            this.finalAgility,
            this.finalIntelligence
        ];
    }

    getId() {
        return this.id;
    }

    static randomStat(stat1, stat2, mutationRate, mutationShift) {
        let mutationValue = (Math.random() * 2 - 1) * mutationRate * (stat1 + stat2) / 2;

        let lowerStat = stat1;
        if(stat1 > stat2) {
            lowerStat = stat2;
        }

        let mutationBase = Math.random() * Math.abs(stat1-stat2) + lowerStat;

        mutationShift = (stat1 + stat2) / 2 * mutationShift;

        return Math.floor(mutationBase + mutationShift + mutationValue + 0.5);
    }

    static getCritterObj(oldCritter) {
        let returnCritter = null;

        if(oldCritter !== null) {
            thePlayer.addCritter(new Critter(oldCritter.id, oldCritter.generation, oldCritter.type,
                [oldCritter.baseVitality, oldCritter.baseStrength, oldCritter.baseAttack,
                    oldCritter.baseDefense, oldCritter.baseAgility, oldCritter.baseIntelligence],
                oldCritter.mutations));
            returnCritter = thePlayer.critters[thePlayer.critters.length-1];

            returnCritter.isFemale = oldCritter.isFemale;
            returnCritter.finalVitality = oldCritter.finalVitality;
            returnCritter.finalStrength = oldCritter.finalStrength;
            returnCritter.finalAttack = oldCritter.finalAttack;
            returnCritter.finalDefense = oldCritter.finalDefense;
            returnCritter.finalAgility = oldCritter.finalAgility;
            returnCritter.finalIntelligence = oldCritter.finalIntelligence;
            returnCritter.score = oldCritter.score;
            returnCritter.location = oldCritter.location;
        } else {
            eisDebug(2, 'EisDebug, oldCritter is null');
        }

        return returnCritter;
    }
}