

class Hatchery {

    constructor() {
        this.type = 'normal';
        this.mutationRate = 0.2;
        this.mutationShift = 0.01;

        this.generation = 0;
        this.king = new Critter(thePlayer.getNextId(), this.generation, this.type, [5,5,5,5,5,5], []);
        this.king.setIsFemale(false);
        this.king.setLocation('king');
        this.queen = new Critter(thePlayer.getNextId(), this.generation, this.type, [5,5,5,5,5,5], []);
        this.queen.setIsFemale(true);
        this.queen.setLocation('queen');

        this.nest = [];
        this.nestSize = 5; // after testing this will go down to 1
        this.nextKing = null;
        this.nextQueen = null;
        this.isPaused = false;
        this.mateDuration = 20; // set to ~100 after debugging
        // this.updateMateDuration();
        this.mateTimer = this.mateDuration;
    }

    doTick() {
        if(this.nestSize !== this.nest.length) {
            this.mateTimer--;
            if(this.mateTimer === 0) {
                // console.log('EisDebug, Hatchery mateTimer is 0.');
                eisDebug(2, 'EisDebug, Hatchery mateTimer is 0.');
                this.mateTimer = this.mateDuration;

                let newStats = [];
                let kingStats = this.king.getBaseStats();
                let queenStats = this.queen.getBaseStats();

                for(let i = 0; i < kingStats.length; i++) {
                    newStats.push(Critter.randomStat(kingStats[i], queenStats[i], this.mutationRate, this.mutationShift));
                }
                let offspring = new Critter(thePlayer.getNextId(), this.generation+1, this.type, newStats, []);
                offspring.setLocation('hatchery');

                this.nest.push(offspring);

                // sort Offspring
                // update Offspring display
            }
        }
    }

    updateMateDuration() {
        // TICKS_PER_SEC is 20
        this.mateDuration = 100;
    }

    togglePause() {
        if(this.isPaused) {
            this.isPaused = false;
            // console.log('EisDebug: Hatchery has been unpaused');
            eisDebug(2, 'EisDebug: Hatchery has been unpaused');
        } else {
            this.isPaused = true;
            // console.log('EisDebug: Hatchery has been paused');
            eisDebug(2, 'EisDebug: Hatchery has been paused');
        }
    }

    sendOffspringToNextGen() {

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
            // console.log('EisError @ Hatchery: could not remove critter; id ' + id + ' not found.');
            eisDebug(1, 'EisError @ Hatchery: could not remove critter; id ' + id + ' not found.');
        }
    }
}