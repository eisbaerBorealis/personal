

class Player {

    constructor() {
        this.critters = this.getNewCritters();
        // this.hatcheries = this.getNewHatcheries();
        this.hatcheries = [];
        this.resources = this.getNewResources();
        this.science = [];
        this.war = {};
        this.stats = this.getNewStats();
        this.settings = this.getNewSettings();
    }

    getNewCritters() {
        let newCritterArray = [];

        return newCritterArray;
    }

    getNewResources() {
        return {
            'dirt': 0,
            'grass': 0,
            'sod': 0
        }
    }

    getNewStats() {
        return {
            'timePlayed': 0,
            'totalCritters': 0,
            'totalGenerations': 0
        }
    }

    getNewSettings() {
        return {
            'name': 'New Name',
            'version': GAME_VERSION,
            'theme': 'dark1'
        }
    }

    setNewHatchery() {
        this.hatcheries.push(new Hatchery());
    }

    savePlayer() {
        localStorage.setItem('ecmPlayerJSON', JSON.stringify(this));
    }

    loadPlayer() {
        let playerData = JSON.parse(localStorage.ecmPlayerJSON);

        this.critters = playerData.critters;
        this.resources = playerData.resources;
        this.science = playerData.science;
        this.war = playerData.war;
        this.stats = playerData.stats;
        this.settings = playerData.settings;
    }

    setName(newName) {
        this.settings.name = newName;
    }

    getName() {
        return this.settings.name;
    }

    getHatcheries() {
        return this.hatcheries;
    }

    getNextId() {
        return this.stats.totalCritters;
    }

    addSecond() {
        this.stats.timePlayed++;
    }

    addCritter(newCritter) {
        this.critters.push(newCritter);
        this.stats.totalCritters++;
    }

    removeCritter(id) {
        let index = -1;
        for(let i = 0; i < this.critters.length; i++) {
            if(this.critters[i].id === id) {
                index = i;
                i = this.critters.length;
            }
        }
        if(index >= 0) {
            // remove from other places
            switch(this.critters[index].location) {
                case 'hatchery':
                    this.hatcheries[0].removeCritter(id);
                    break;
                case 'debug':
                    break;
                default:
                    // console.log('EisDebug @ Player.removeCritter(), defaulted in switch statement');
                    eisDebug(1, 'EisError @ Player.removeCritter(), defaulted in switch statement');
            }

            // remove from Player.critters
            for(let i = index; i < this.critters.length - 1; i++) {
                this.critters[i] = this.critters[i + 1];
            }
            this.critters.pop();
        } else {
            // console.log('EisError @ Player: could not remove critter; id ' + id + ' not found.');
            eisDebug(1, 'EisError @ Player: could not remove critter; id ' + id + ' not found.');
        }
    }
}