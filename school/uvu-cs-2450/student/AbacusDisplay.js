class AbacusDisplay {

    constructor() {
        this.theAbacus = new Abacus();
    }

    addAbacus() {
        document.getElementById('abacus').innerHTML = '<div id="abacus-top"></div><div id="abacus-bottom"></div>';
        this.updateColumns(this.theAbacus.getColumnCount());
    }

    updateColumns(newColumnCount) {
        this.theAbacus.setColumnCount(newColumnCount);

        let abacusTopHTML = '';
        let abacusBottomHTML = '';
        let beadClasses = 'bead normal-bead';
        let columnCount = this.theAbacus.getColumnCount();

        if(columnCount > 10) {
            beadClasses = 'bead skinny-bead';
        }

        for(let i = 1; i <= columnCount; i++) {
            abacusTopHTML += '<div id="top-row-' + i + '" class="top-row">' +
                            '<div id="space-' + i + '-0" class="space"></div>' +
                            '<div id="bead-' + i + '-1" class="' + beadClasses + '"></div>' +
                            '<div id="space-' + i + '-1" class="space"></div>' +
                            '<div id="bead-' + i + '-2" class="' + beadClasses + '"></div>' +
                            '<div id="space-' + i + '-2" class="space grow-space"></div></div>';
            abacusBottomHTML += '<div id="bottom-row-' + i + '" class="bottom-row">' +
                            '<div id="space-' + i + '-3" class="space grow-space"></div>' +
                            '<div id="bead-' + i + '-3" class="' + beadClasses + '"></div>' +
                            '<div id="space-' + i + '-4" class="space"></div>' +
                            '<div id="bead-' + i + '-4" class="' + beadClasses + '"></div>' +
                            '<div id="space-' + i + '-5" class="space"></div>' +
                            '<div id="bead-' + i + '-5" class="' + beadClasses + '"></div>' +
                            '<div id="space-' + i + '-6" class="space"></div>' +
                            '<div id="bead-' + i + '-6" class="' + beadClasses + '"></div>' +
                            '<div id="space-' + i + '-7" class="space"></div>' +
                            '<div id="bead-' + i + '-7" class="' + beadClasses + '"></div>' +
                            '<div id="space-' + i + '-8" class="space"></div></div>';
        }

        document.getElementById('abacus-top').innerHTML = abacusTopHTML;
        document.getElementById('abacus-bottom').innerHTML = abacusBottomHTML;

        this.addBeads(columnCount);
    }

    addBeads(columnCount) {
        for(let i = 1; i <= columnCount; i++) {
            for(let j = 1; j <= 7; j++) {
                document.getElementById("bead-" + i + "-" + j).onclick = function() {
                    beadClick(this.id);
                };
            }
        }

        this.colorBeads(columnCount);
    }

    colorBeads(columnCount) {
        let beads = document.getElementsByClassName("bead");
        let hueOffset = 255 / columnCount;
    
        for(let i = 0; i < columnCount * 2; i ++) {
            beads[i].style.background = 'hsl(' + (0 + Math.floor(i/2) * hueOffset) + ', 80%, 40%)';
        }
        
        for(let i = columnCount * 2; i < beads.length; i++) {
            beads[i].style.background = 'hsl(' + (0 + Math.floor((i - (columnCount * 2))/5) * hueOffset) + ', 80%, 40%)';
        }
    }

    solve(newValue) {
        this.theAbacus.setValue(newValue)
        this.theAbacus.updateBeads();
    }

    shiftBeads(beadId) {
        let columnCount = this.theAbacus.getColumnCount();
        let beadNumbers = beadId.match(/\d+/g);
        let column = Number(beadNumbers[0]);
        let beadNum = Number(beadNumbers[1]);
        let oldSpaceOffset = 0;
        if(beadNum > 2) {
            oldSpaceOffset = columnCount;
        }

        let oldSpace = document.getElementsByClassName("grow-space")[column + oldSpaceOffset - 1];
        let oldSpaceNum = Number(oldSpace.id.match(/\d+/g)[1]);
        let newSpaceNumOffset = 0;

        if(beadNum > 2 && oldSpaceNum <= beadNum) {
            newSpaceNumOffset = 1;
        } else if(beadNum <= 2 && oldSpaceNum >= beadNum) {
            newSpaceNumOffset = -1;
        }

        let newSpace = document.getElementById("space-" + column + "-" + (beadNum + newSpaceNumOffset));

        if(oldSpace === null || newSpace === null) {
            console.log("JesseDebug@AbacusDisplay.shiftBeads(), oldSpace and newSpace are " + oldSpace + " and " + newSpace);
        }

        oldSpace.className = 'space';
        newSpace.className = 'space';
        newSpace.classList.add("grow-space");
        oldSpace.classList.add("space-shrink");
        newSpace.classList.add("space-grow");

        this.theAbacus.updateValue();
    }

    updateBeads() {
        this.theAbacus.updateBeads();
    }

    updateValue() {
        this.theAbacus.updateValue();
    }

    getColumnCount() {
        return this.theAbacus.getColumnCount();
    }

    getValue() {
        return this.theAbacus.getValue();
    }
}