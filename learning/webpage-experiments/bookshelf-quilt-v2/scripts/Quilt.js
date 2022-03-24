class Quilt {
    constructor() {
        // console.log('  eisDEBUG: Quilt constructor');
        
        this.shelves = [];

        this.heightWeights;
        this.widthWeights;

        this.randomizeBooks();
        this.redraw();
    }

    randomizeBooks() {
        console.log('  eisDEBUG: Quilt.randomizeBooks()');
        let debugWidthCounter = [0, 0];

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
            let bookshelf = [];
            let remainingSpace = SHELF_WIDTH;
            while(remainingSpace >= minWidth) {
                let randWidth = this.getRandomWidth(remainingSpace);
                let randHeight = this.getRandomHeight();
                
                // console.log('     eisDEBUG: adding a book');
                bookshelf.push({'w': randWidth, 'h': randHeight});
                remainingSpace -= randWidth;

                // DEBUG
                if(randWidth === 1) {
                    debugWidthCounter[0]++;
                } else {
                    debugWidthCounter[1]++;
                }
            }
            // console.log('   eisDEBUG: adding a bookshelf (remainingSpace is ' + remainingSpace + ')');
            this.shelves.push(bookshelf);
        }
        // console.log('  eisDEBUG: printed bookshelf:');
        // this.printBookshelf();
        console.log('    eisDEBUG: debugWidthCounter is ' + debugWidthCounter);
    }

    getRandomHeight() {
        return randomByWeightedArray(BOOK_HEIGHTS, this.heightWeights);
    }

    getRandomWidth(max) {
        let width = max + 1;
        while(width > max) {
            width = randomByWeightedArray(BOOK_WIDTHS, this.widthWeights);
        }
        return width;
    }

    redraw() {
        console.log('  eisDEBUG: Quilt.redraw()');

        let w = getWindowWidth();
        let h = getWindowHeight();
        let shelfW = (w - (WOOD_WIDTH * (NUM_COLUMNS + 1))) / NUM_COLUMNS;
        let shelfH = (h - (WOOD_WIDTH * (NUM_ROWS + 1))) / NUM_ROWS;
        let shelfIndex = 0;

        document.getElementById(QUILT_SVG_ID).setAttribute('width', w);
        document.getElementById(QUILT_SVG_ID).setAttribute('height', h);
        document.getElementById(REDRAW_SVG_ID).setAttribute('width', w);
        document.getElementById(REDRAW_SVG_ID).setAttribute('height', h);

        let svgHTML = '';

        for(let i = 0; i < NUM_ROWS; i++) {
            for(let j = 0; j < NUM_COLUMNS; j++) {
                let shelfX = WOOD_WIDTH + j * (shelfW + WOOD_WIDTH);
                let shelfY = WOOD_WIDTH + i * (shelfH + WOOD_WIDTH);
                svgHTML += '\n  <rect class="svg-shelf" y=' + shelfY + ' x=' + shelfX + ' width=' + shelfW + ' height=' + shelfH + ' />';

                let shelf = this.shelves[shelfIndex];
                let bookX = shelfX;
                for(let k = 0; k < shelf.length; k++) {
                    // add a book
                    let bookW = (shelf[k].w / SHELF_WIDTH) * shelfW;
                    let bookH = (shelf[k].h / SHELF_HEIGHT) * shelfH;
                    let space = shelfH - bookH;
                    svgHTML += '\n    <rect class="svg-book" y=' + (shelfY + space) + ' x=' + bookX + ' width=' + bookW + ' height=' + bookH + ' />';

                    bookX += bookW;
                }
                shelfIndex++;
            }
        }

        document.getElementById(QUILT_SVG_ID).innerHTML = svgHTML;
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