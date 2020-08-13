const AUTO_SAVE_INTERVAL = 60;

var paused;

class GameEngine {

    constructor() {
        console.log('EisbaerDebug @ GameEngine.constructor, ENGINE STARTED');
        
        this.ticks = 0;
        this.ticksPerSecond = 20;
        this.secondsPerRound = 60;
        this.paused = true;

        this.timer = new Timer();

        this.tickInterval = setInterval(() => {
            this.doTick();
        }, 1000 / this.ticksPerSecond);
    }

    doTick() {
        if(!this.paused) {
            this.ticks++;
            
            let time1 = 1.0 - this.ticks % (this.ticksPerSecond * this.secondsPerRound) / (this.ticksPerSecond * this.secondsPerRound);
            let time2 = 1.0 - this.ticks % this.ticksPerSecond / this.ticksPerSecond;

            if(time2 >= 1) {
                time2 = 0;
            }

            if(this.ticks % (this.ticksPerSecond / 10) === 0) {
                let timeLeft = this.secondsPerRound - (this.ticks / this.ticksPerSecond);
                timeLeft = Math.floor(timeLeft * 10) / 10;
                if(timeLeft % 1.0 === 0) {
                    timeLeft += '.0';
                }
                this.timer.updateText(timeLeft + ' s');
            }
            
            this.timer.updateTimer(time1, time2);

            if(this.ticks >= this.ticksPerSecond * this.secondsPerRound) {
                this.paused = true;
                this.ticks = 0;
                this.timer.updateTimer(1, -1);
                this.timer.updateText('START');
            }
        }
    }

    togglePause() {
        this.paused = !this.paused;
    }
}