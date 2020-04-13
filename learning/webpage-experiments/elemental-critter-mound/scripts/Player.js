

class Player {

    constructor() {
        this.critters = [];
        this.resources = {};
        this.science = [];
        this.war = {};
        this.settings = {};
    }

    getNewSettings() {
        return {
            'version': '0.1.0',
            'theme': 'dark1'
        }
    }

    savePlayer() {
        localStorage.setItem('playerJSON', JSON.stringify(this));
    }

    loadPlayer() {
        let playerData = JSON.parse(localStorage.playerJSON);

        this.critters = playerData.critters;
        this.resources = playerData.resources;
        this.science = playerData.science;
        this.war = playerData.war;
    }
}