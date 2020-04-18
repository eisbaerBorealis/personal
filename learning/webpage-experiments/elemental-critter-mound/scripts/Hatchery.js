

class Hatchery {

    constructor() {
        eisDebug(2, 'EisDebug, Hatchery constructor called.');
        this.type = 'normal';
        this.mutationRate = 0.2;
        this.mutationShift = 0.01;

        this.generation = 0;
        this.king = null;
        this.queen = null;

        this.nest = [];
        this.nestSize = 5; // after testing this will go down to 1
        this.selected = [false, false, false, false, false, false, false];
        this.nextKing = null;
        this.nextQueen = null;
        this.isPaused = false;
        this.mateDuration = this.getUpdatedMateDuration();
        this.mateTimer = this.mateDuration;

        this.enabledButtons = {
            'prince': false,
            'mine': false,
            'farm': false,
            'factory': false,
            'army': false,
            'discard': false,
            'nextGen': false,
            'upgrade': false
        };
    }

    doTick() {
        if(!this.isPaused && this.nestSize !== this.nest.length) {
            this.mateTimer--;

            // update timer
            updateTimer((this.mateDuration - this.mateTimer) / this.mateDuration);

            if(this.mateTimer === 0) {
                eisDebug(2, 'EisDebug, Hatchery mateTimer is 0.');
                this.mateTimer = this.mateDuration;

                this.newOffspring();

                updateOffspring();

                // sort Offspring
            }
        }
    }

    newRoyalty() {
        eisDebug(2, 'EisDebug, Hatchery.newRoyalty() called.');
        this.king = new Critter(thePlayer.getNextId(), this.generation, this.type, [5,5,5,5,5,5], []);
        this.king.setIsFemale(false);
        this.king.setLocation('king');
        thePlayer.addCritter(this.king);
        this.queen = new Critter(thePlayer.getNextId(), this.generation, this.type, [5,5,5,5,5,5], []);
        this.queen.setIsFemale(true);
        this.queen.setLocation('queen');
        thePlayer.addCritter(this.queen);
    }

    newOffspring() {
        let newStats = [];
        let kingStats = this.king.getBaseStats();
        let queenStats = this.queen.getBaseStats();

        for(let i = 0; i < kingStats.length; i++) {
            newStats.push(Critter.randomStat(kingStats[i], queenStats[i], this.mutationRate, this.mutationShift));
        }
        let offspring = new Critter(thePlayer.getNextId(), this.generation+1, this.type, newStats, []);
        thePlayer.addCritter(offspring)
        offspring.setLocation('hatchery');

        this.nest.push(offspring);
    }

    getUpdatedMateDuration() {
        // TICKS_PER_SEC is 20
        return 20; // set to ~100 after debugging
    }

    togglePause() {
        if(this.isPaused) {
            this.isPaused = false;
            eisDebug(2, 'EisDebug: Hatchery has been unpaused');
        } else {
            this.isPaused = true;
            eisDebug(2, 'EisDebug: Hatchery has been paused');
        }
    }

    nextGen() {

    }

    // call the removeCritter function on the player instead; that will call this one
    removeCritter(id) {
        let index = -1;
        for(let i = 0; i < this.nest.length; i++) {
            if(this.nest[i].id === id) {
                index = i;
                i = this.nest.length;
            }
        }
        if(index >= 0) {
            // remove from Hatchery.nest
            for(let i = index; i < this.nest.length - 1; i++) {
                this.nest[i] = this.nest[i + 1];
            }
            this.nest.pop();
        } else {
            eisDebug(1, 'EisError @ Hatchery: could not remove critter; id ' + id + ' not found.');
        }

        updateOffspring();
    }

    getKingHexInfo() {
        return this.king.getHexInfo();
    }

    getQueenHexInfo() {
        return this.queen.getHexInfo();
    }

    getNestSize() {
        return this.nestSize;
    }

    getNest() {
        return this.nest;
    }

    toggleSelected(target) {
        if(target < this.nest.length) {
            this.selected[target] = !this.selected[target];
            updateSelected();
            this.updatedEnabledButtons();
        } else {
            eisDebug(2, 'EisDebug, clicked on hex without critter.');
        }
    }

    getSelected() {
        return this.selected;
    }

    clearSelected() {
        for(let i = 0; i < this.selected.length; i++) {
            this.selected[i] = false;
        }
        updateSelected();
    }

    updatedEnabledButtons() {
        let totalMales = 0;
        let totalFemales = 0;
        for(let i = 0; i < this.nest.length; i++) {
            if(this.selected[i]) {
                if(this.nest[i].getIsFemale()) {
                    totalFemales++;
                } else {
                    totalMales++;
                }
            }
        }
        let totalCritters = totalMales + totalFemales;

        if(totalCritters > 0 && (totalMales < 2 && totalFemales < 2) && totalCritters < 3) {
            this.enabledButtons.prince = true;
        } else {
            this.enabledButtons.prince = false;
        }

        if(totalCritters > 0) {
            this.enabledButtons.mine = true;
            this.enabledButtons.farm = true;
            this.enabledButtons.factory = true;
            this.enabledButtons.army = true;
            this.enabledButtons.discard = true;
        } else {
            this.enabledButtons.mine = false;
            this.enabledButtons.farm = false;
            this.enabledButtons.factory = false;
            this.enabledButtons.army = false;
            this.enabledButtons.discard = false;
        }

        if(this.nextKing && this.nextQueen) {
            this.enabledButtons.nextGen = true;
        } else {
            this.enabledButtons.nextGen = false;
        }
    }

    getEnabledButtons() {
        return [
            this.enabledButtons.prince,
            this.enabledButtons.mine,
            this.enabledButtons.farm,
            this.enabledButtons.factory,
            this.enabledButtons.army,
            this.enabledButtons.discard
        ]
    }

    getSelectedCritters() {
        let selectedCritters = [];

        for(let i = 0; i < this.selected.length; i++) {
            if(this.selected[i]) {
                selectedCritters.push(this.nest[i]);
            }
        }

        return selectedCritters;
    }

    moveToNextGen() {
        eisDebug(3, 'EisDebug, moveToNextGen()');
        if(this.enabledButtons.prince) {
            let nextGen = this.getSelectedCritters();
            eisDebug(3, 'EisDebug, moveToNextGen(), nextGen.length is ' + nextGen.length);
            for(let i = 0; i < nextGen.length; i++) {
                if(nextGen[i].getIsFemale()) {
                    if(this.nextQueen) {
                        this.nextQueen.location = 'hatchery';
                        this.nest.push(this.nextQueen);
                    }
                    this.nextQueen = nextGen[i];
                    this.nextQueen.location = 'princess';
                } else {
                    if(this.nextKing) {
                        this.nextKing.location = 'hatchery';
                        this.nest.push(this.nextKing);
                    }
                    this.nextKing = nextGen[i];
                    this.nextKing.location = 'prince';

                }
                this.removeCritter(nextGen[i].id);
            }

            // sort nest
        } else {
            eisDebug(1, 'EisError, moveToNextGen called when not enabled.');
        }
        this.updatedEnabledButtons();
    }

    swapRoyalty() {
        // remove king and queen from thePlayer
        // move nextRoyalty to currentRoyalty
        // set nextRoyalty to null
        // update Royalty, next royalty
        thePlayer.removeCritter(this.king.id);
        thePlayer.removeCritter(this.queen.id);
        this.king = this.nextKing;
        this.queen = this.nextQueen;
        this.nextKing = null;
        this.nextQueen = null;
    }

    static getHatcheryObj(oldHatchery) {
        eisDebug(2, 'EisDebug, getHatcheryObj() called.');
        let returnHatchery = new Hatchery();

        returnHatchery.type = oldHatchery.type;
        returnHatchery.mutationRate = oldHatchery.mutationRate;
        returnHatchery.mutationShift = oldHatchery.mutationShift;
        returnHatchery.generation = oldHatchery.generation;
        returnHatchery.king = Critter.getCritterObj(oldHatchery.king);
        returnHatchery.queen = Critter.getCritterObj(oldHatchery.queen);
        returnHatchery.nest = [];

        for(let i = 0; i < oldHatchery.nest.length; i++) {
            returnHatchery.nest.push(Critter.getCritterObj(oldHatchery.nest[i]));
        }

        returnHatchery.nestSize = oldHatchery.nestSize;
        returnHatchery.selected = oldHatchery.selected;
        returnHatchery.nextKing = Critter.getCritterObj(oldHatchery.nextKing);
        returnHatchery.nextQueen = Critter.getCritterObj(oldHatchery.nextQueen);
        returnHatchery.isPaused = oldHatchery.isPaused;
        returnHatchery.mateDuration = oldHatchery.mateDuration;
        returnHatchery.mateTimer = oldHatchery.mateTimer;
        returnHatchery.enabledButtons = oldHatchery.enabledButtons;

        return returnHatchery;
    }
}