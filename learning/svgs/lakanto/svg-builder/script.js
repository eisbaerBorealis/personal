(function() {
    'use strict';

    console.log('DEBUG: starting Javascript');

    let stateCheck = setInterval(() => {
        if (document.readyState === 'complete') {
            try {
                clearInterval(stateCheck);
                insert();
            } catch(error) {
                console.error('ERROR: Startup failed' + error);
            }
        }
    }, 250);
})();

function insert() {
    console.log('DEBUG: starting insert()');

    document.body.innerHTML = buildSVG();
    console.log('DEBUG: end of insert()');
}

function buildSVG() {
    console.log('DEBUG: starting buildSVG()');

    let sus1 = buildings[1];
    let maxSide = Math.max(sus1.length, sus1.width);
    let offSet = Math.floor(maxSide * 0.05);
    let height = sus1.width + offSet * 2;
    let width = sus1.length + offSet * 2;

    let svg = '<svg class="building" height="' + height + '" width="' + width + '">';
    svg += '<rect width="100%" height="100%" fill="#ffffff" />';

    // Inner walls
    let innerWalls = sus1.parts.innerWalls;
    if(innerWalls.length !== 0) {
        svg += '<g stroke="' + COLOR_INNER_WALLS + '" stroke-width="2" fill="none">';
        for(let i = 0; i < innerWalls.length; i++) {
            svg += '<path d="M ';
            svg += innerWalls[i].map((x) => x + offSet).join(' ');
            svg += '"/>';
        }
        svg += '</g>';
    }

    // Outer walls
    let wallCoords = sus1.parts.outerWalls;
    svg += '<polygon stroke="' + COLOR_OUTER_WALLS + '" stroke-width="3" fill="none" points="';
    for(let i = 0; i < wallCoords.length; i += 2) {
        svg += (wallCoords[i] + offSet) + ',' + (wallCoords[i+1] + offSet);
        if(i+2 < wallCoords.length) {
            svg += ' ';
        }
    }
    svg += '"/>';

    // Racking
    let racking = sus1.parts.racking;
    let binWidth = racking.width;
    let binDepth = racking.depth;
    let aisles = racking.aisles;
    let xDiff, yDiff, rectWidth, rectHeight;
    if(racking.direction === 'vertical') {
        xDiff = 0;
        yDiff = racking.width;
        rectWidth = binDepth;
        rectHeight = binWidth;
    } else {
        xDiff = racking.length;
        yDiff = 0;
        rectWidth = binWidth;
        rectHeight = binDepth;
    }
    svg += '<g stroke="' + COLOR_RACKS + '" stroke-width="1" fill="none">';
    for(let i = 0; i < aisles.length; i++) {
        let aisle = aisles[i];
        let x = aisle.startX + offSet;
        let y = aisle.startY + offSet;

        for(let j = 0; j < aisle.binCount; j++) {
            svg += '<rect x="' + x + '" y="' + y + '" width="' + rectWidth + '" height="' + rectHeight + '" />';
            x = Math.round((x + xDiff) * 10) / 10;
            y = Math.round((y + yDiff) * 10) / 10;

        }
    }
    svg += '</g>';

    svg += '</svg>';
    console.log('DEBUG: end of buildSVG()');
    console.log(svg);
    return svg;
}