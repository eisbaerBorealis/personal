const DEFAULT_COLUMN_COUNT = 4;
const MAX_COLUMN_COUNT = 20;

class Abacus {
    
    constructor() {
        this.value = 0;
        this.columnCount = DEFAULT_COLUMN_COUNT
        this.beadColumns = [];
        for(let i = 0; i < this.columnCount; i++) {
            this.beadColumns.push([0, 0]);
        }
    }

    setValue(newValue) {
        this.value = newValue;
    }

    setColumnCount(newColumnCount) {
        this.columnCount = newColumnCount;
    }

    setColumn(column, newDigit) {
        let topValue = Math.floor(newDigit / 5);
        let bottomValue = newDigit % 5;
        
        for(let i = 0; i < 9; i++) {
            let spaceDiv = document.getElementById('space-' + column + '-' + i);
            let isGrown = hasClass(spaceDiv, 'grow-space');
    
            if(i !== (2 - topValue) && i !== (3 + bottomValue) && isGrown) { // needs to shrink
                spaceDiv.className = 'space';
                spaceDiv.classList.add("space-shrink");
            } else if((i === (2 - topValue) || i === (3 + bottomValue)) && !isGrown) { // needs to grow
                spaceDiv.className = 'space';
                spaceDiv.classList.add('grow-space');
                spaceDiv.classList.add('space-grow');
            }
        }
    }

    updateValue() {
        this.value = 0;
        let placeHolder = 1;
        let spaceArray = document.getElementsByClassName('grow-space');
        let space1Num, space2Num;
        for(let i = 0; i < this.columnCount; i++) {
            space1Num = Number(spaceArray[i].id.match(/\d+/g)[1]);
            space2Num = Number(spaceArray[i + this.columnCount].id.match(/\d+/g)[1]);
            if(space1Num === 1) {
                this.value += (5 * placeHolder);
            }
			if(space1Num == 0)
			{
				this.value += 10 * placeHolder;
			}

            this.value += (space2Num - 3) * placeHolder;

            placeHolder *= 10;
        }
    }

    updateBeads() {
        for(let i = 0; i < this.columnCount; i++) {
            let digit = this.value % Math.pow(10, i + 1);
            if(digit < Math.pow(10, i)) {
                digit = 0;
            } else {
                while(digit > 9) {
                    digit = Math.floor(digit / 10);
                }
            }
    
            this.setColumn(i + 1, digit);
        }
    }

    getValue() {
        return this.value;
    }

    getColumnCount() {
        return this.columnCount;
    }
}
