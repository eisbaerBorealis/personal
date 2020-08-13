const DEFAULT_GRID_SIZE = 10;
const DEFAULT_CREDITS = 200;

class Player {

    constructor() {
        this.grid = new Grid(DEFAULT_GRID_SIZE);
        this.credits = DEFAULT_CREDITS;
    }

    savePlayer() {
        localStorage.setItem('ecmPlayerJSON', JSON.stringify(this));
    }

    gridPress(y, x) {
        this.grid.gridPress(x, y);
    }
}