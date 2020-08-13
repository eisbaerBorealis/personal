

class Grid {

    constructor(newSize) {
        this.size = newSize
        this.grid = [];
        this.items = [];
        this.deadItems = [];

        this.resetGrid();
        this.randomResources();
        this.displayNewGrid();
    }

    resetGrid() {
        for(let i = 0; i < this.size; i++) {
            let nextColumn = [];
            for(let j = 0; j < this.size; j++) {
                nextColumn.push(new GridContent());
            }
            this.grid.push(nextColumn);
        }
    }

    randomResources() {

    }

    getContentAt(x, y) {
        return this.grid[x][y];
    }

    displayNewGrid() {
        let gridDiv = document.getElementById('grid');

        gridDiv.innerHTML = '';
        for(let i = 0; i < this.size; i++) {
            let newColumnDiv = document.createElement('div');
            newColumnDiv.setAttribute('class', 'gridColumn');
            gridDiv.append(newColumnDiv);

            for(let j = 0; j < this.size; j++) {
                let newGridContentDiv = document.createElement('div');
                newGridContentDiv.classList.add('gridContent');
                newGridContentDiv.classList.add('clickable');
                newColumnDiv.append(newGridContentDiv);
            }
        }
    }

    gridPress(x, y) {
        console.log('eisDebug, button Test. x is ' + x + ' and y is ' + y);
    }
}