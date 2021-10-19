// const WIDTH = 700;
// const HEIGHT = 700;
// const UNIT = 50;

// const TRIANGLE_RAD = UNIT / Math.sqrt(3);
// // const SQUARE_RAD = UNIT * Math.sqrt(2) / 2;
// const DIAMOND_RAD_1 = UNIT / 2;
// const DIAMOND_RAD_2 = UNIT / 2 * Math.sqrt(3);
// const DIAMOND_2_RAD_1 = UNIT / 4;
// const DIAMOND_2_RAD_2 = UNIT * Math.sin(toRads(80));

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

    let svg = '<svg  class="fish" height="' + HEIGHT + '" width="' + WIDTH + '">';

    for(tile in tiles) {
        // console.log('  DEBUG: tile is ' + tile);
        // console.log('  DEBUG: tile is ' + tiles[tile]);
        svg += getPolygon(tiles[tile]);
    }

    console.log('DEBUG: tileCount is ' + tiles.length);

    svg += '</svg>';
    console.log('DEBUG: end of buildSVG()');
    return svg;
}

function getPolygon(tileInfo) {
    /* example:
    <polygon
        points="0,0 400,0 400,400 0,400"
        style="fill:var(--color0);stroke-width:0"/>
    //*/
    let html = '<polygon points="';

    let centerX = WIDTH/2 + tileInfo.xOffset * UNIT;
    let centerY = HEIGHT/2 + tileInfo.yOffset * UNIT;

    switch(tileInfo.type) {
        case 'hexagon':
            console.log('    DEBUG: getPolygon() for \'hexagon\'');
            for(let i = 0; i < 6; i++) {
                let angle = toRads(i * 60 + tileInfo.rotation);
                html += getXY(centerX, centerY, angle, UNIT) + ' ';
            }
            html += '" style="fill:var(--color1main);stroke:var(--color1bord);stroke-width:1"/>';
            break;
        case 'diamond':
            console.log('    DEBUG: getPolygon() for \'diamond\'');
            for(let i = 0; i < 4; i++) {
                let angle = toRads(i * 90 + tileInfo.rotation);
                let dist = DIAMOND_RAD_1 * UNIT;
                if(i % 2 === 1) {
                    dist = DIAMOND_RAD_2 * UNIT;
                }
                html += getXY(centerX, centerY, angle, dist) + ' ';
            }
            html += '" style="fill:var(--color2main);stroke:var(--color2bord);stroke-width:1"/>';
            break;
        case 'triangle':
            console.log('    DEBUG: getPolygon() for \'triangle\'');
            for(let i = 0; i < 3; i++) {
                let angle = toRads(i * 120 + tileInfo.rotation);
                html += getXY(centerX, centerY, angle, TRIANGLE_RAD * UNIT) + ' ';
            }
            html += '" style="fill:var(--color3main);stroke:var(--color3bord);stroke-width:1"/>';
            break;
        case 'diamond2':
            console.log('    DEBUG: getPolygon() for \'diamond2\'');
            for(let i = 0; i < 4; i++) {
                let angle = toRads(i * 90 + tileInfo.rotation);
                let dist = DIAMOND_2_RAD_1 * UNIT;
                if(i % 2 === 1) {
                    dist = DIAMOND_2_RAD_2 * UNIT;
                }
                html += getXY(centerX, centerY, angle, dist) + ' ';
            }
            html += '" style="fill:var(--color4main);stroke:var(--color4bord);stroke-width:1"/>';
            break;
        default:
            console.error('ERROR: default case in getPolygon()');
    }

    return html;
}

function getXY(centerX, centerY, angle, dist) {
    let x = Math.floor(dist * Math.sin(angle) + centerX + 0.5);
    let y = Math.floor(dist * Math.cos(angle) + centerY + 0.5);

    return x + ',' + y;
}