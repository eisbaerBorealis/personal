class Quilt {
    constructor() {
        console.log('  eisDEBUG: Quilt constructor');
        
        this.shelves = [];

        this.heightWeights;
        this.widthWeights;

        this.randomizeBooks();
        this.redraw();
    }

    randomizeBooks() {
        console.log('  eisDEBUG: Quilt.randomizeBooks()');

        if(HEIGHT_WEIGHTS.length > 0) {
            this.heightWeights = setWeightsByArray(HEIGHT_WEIGHTS);
        } else {
            this.heightWeights = setWeightsByCount(BOOK_HEIGHTS.length);
        }

        if(WIDTH_WEIGHTS.length > 0) {
            this.widthWeights = setWeightsByArray(WIDTH_WEIGHTS);
        } else {
            this.widthWeights = setWeightsByCount(BOOK_WIDTHS.length);
        }

        let minWidth = Math.min(...BOOK_WIDTHS);
        for(let i = 0; i < NUM_ROWS * NUM_COLUMNS; i++) {
        // for(let i = 0; i < 1; i++) {
            // console.log('   eisDEBUG: minWidth is ' + minWidth + ' and SHELF_WIDTH is ' + SHELF_WIDTH);
            let bookshelf = [];
            let remainingSpace = SHELF_WIDTH;
            while(remainingSpace >= minWidth) {
                let randWidth = this.getRandomWidth(remainingSpace);
                let randHeight = this.getRandomHeight();
                
                console.log('     eisDEBUG: adding a book');
                bookshelf.push({'w': randWidth, 'h': randHeight});
                remainingSpace -= randWidth;
            }
            console.log('   eisDEBUG: adding a bookshelf (remainingSpace is ' + remainingSpace + ')');
            this.shelves.push(bookshelf);
        }
        console.log('  eisDEBUG: printed bookshelf:');
        this.printBookshelf();
    }

    getRandomHeight() {
        return randomByWeightedArray(BOOK_HEIGHTS, this.heightWeights);
    }

    getRandomWidth(max) {
        let width = max + 1;
        while(width > max) {
            // console.log('     eisDEBUG: getRandomWidth(), width is ' + width + ', max is ' + max);
            width = randomByWeightedArray(BOOK_WIDTHS, this.widthWeights);
        }
        return width;
    }

    redraw() {
        console.log('  eisDEBUG: Quilt.redraw()');

    }

    printBookshelf() {
        for(let i = 0; i < this.shelves.length; i++) {
            console.log('---SHELF ' + (i + 1) + '---')
            let currShelf = this.shelves[i];
            for(let j = 0; j < currShelf.length; j++) {
                console.log('    W: ' + currShelf[j].w + ', H: ' + currShelf[j].h);
            }
        }
    }
}