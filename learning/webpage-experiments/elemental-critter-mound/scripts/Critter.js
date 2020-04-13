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

        this.updateFinalStats();
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
                    console.log('EisError: defaulted in updateFinalStats for mutations[i].stat.');
            }            
        }
    }
}