const DIV_SIZE = 200;
const CIRC_1_WIDTH = 30;
const CIRC_1_COLOR = '#00ff00';
const CIRC_1_RADIUS = (DIV_SIZE - CIRC_1_WIDTH) / 2;
const CIRC_1_CIRCUM = Math.ceil(2 * Math.PI * CIRC_1_RADIUS);

const CIRC_SPACE = 10;

const CIRC_2_WIDTH = 5;
const CIRC_2_COLOR = '#ff0000'
const CIRC_2_RADIUS = CIRC_1_RADIUS - CIRC_SPACE - (CIRC_1_WIDTH + CIRC_2_WIDTH) / 2;
const CIRC_2_CIRCUM = Math.ceil(2 * Math.PI * CIRC_2_RADIUS);

const BUTTON_RADIUS = CIRC_2_RADIUS - CIRC_SPACE;

class Timer {

    constructor() {
        this.maxTime = 60;

        this.createTimerHTML();
    }

    createTimerHTML() {
        let timerDivStyle = 'height: ' + DIV_SIZE + 'px; width: ' + DIV_SIZE + 'px;';
        document.getElementById('timer').setAttribute('style', timerDivStyle);

        let timerHTML = '<svg class="base-timer__svg" viewBox="';
        timerHTML += '0 0 ' + DIV_SIZE + ' ' + DIV_SIZE + '" ';
        timerHTML += 'xmlns="http://www.w3.org/2000/svg"';
        timerHTML += 'style="transform: scaleX(-1);">';

        timerHTML += '<g style="fill: none; stroke: none;">';
        timerHTML += '<circle ';
        timerHTML += 'style="stroke-width: ' + CIRC_1_WIDTH + 'px; stroke: grey;" ';
        timerHTML += 'cx="' + DIV_SIZE / 2 + '" cy="' + DIV_SIZE / 2 + '" r="' + CIRC_1_RADIUS + '" />';
        timerHTML += '<path id="timer-1-path-remaining" ';
        timerHTML += 'style="stroke-width: ' + CIRC_1_WIDTH + 'px; stroke-linecap: butt; ';
        timerHTML += 'transform: rotate(90deg); transform-origin: center; ';
        timerHTML += 'transition: 0.05s linear all; stroke: ' + CIRC_1_COLOR + ';"';
        timerHTML += 'stroke-dasharray="' + CIRC_1_CIRCUM + '"';
        timerHTML += ' ';
        timerHTML += 'd="';
        timerHTML += 'M ' + DIV_SIZE / 2 + ', ' + DIV_SIZE / 2 + ' ';
        timerHTML += 'm -' + CIRC_1_RADIUS + ', 0 ';
        timerHTML += 'a ' + CIRC_1_RADIUS + ',' + CIRC_1_RADIUS + ' 0 1,0 ' + CIRC_1_RADIUS * 2 + ',0 ';
        timerHTML += 'a ' + CIRC_1_RADIUS + ',' + CIRC_1_RADIUS + ' 0 1,0 -' + CIRC_1_RADIUS * 2 + ',0"></path>';

        timerHTML += '<circle ';
        timerHTML += 'style="stroke-width: ' + CIRC_2_WIDTH + 'px; stroke: grey;" ';
        timerHTML += 'cx="' + DIV_SIZE / 2 + '" cy="' + DIV_SIZE / 2 + '" r="' + CIRC_2_RADIUS + '" />';
        timerHTML += '<path id="timer-2-path-remaining" ';
        timerHTML += 'style="stroke-width: ' + CIRC_2_WIDTH + 'px; stroke-linecap: butt; ';
        timerHTML += 'transform: rotate(90deg); transform-origin: center; ';
        timerHTML += 'stroke: ' + CIRC_2_COLOR + ';"';
        timerHTML += 'stroke-dasharray="0 ' + CIRC_2_CIRCUM + '"';
        timerHTML += ' ';
        timerHTML += 'd="';
        timerHTML += 'M ' + DIV_SIZE / 2 + ', ' + DIV_SIZE / 2 + ' ';
        timerHTML += 'm -' + CIRC_2_RADIUS + ', 0 ';
        timerHTML += 'a ' + CIRC_2_RADIUS + ',' + CIRC_2_RADIUS + ' 0 1,0 ' + CIRC_2_RADIUS * 2 + ',0 ';
        timerHTML += 'a ' + CIRC_2_RADIUS + ',' + CIRC_2_RADIUS + ' 0 1,0 -' + CIRC_2_RADIUS * 2 + ',0"></path>';

        timerHTML += '<circle id="startButton" class="clickable" cx="' + DIV_SIZE / 2 + '" cy="' + DIV_SIZE / 2 + '" r="' + BUTTON_RADIUS + '" stroke="black" stroke-width="3" fill="red" />';

        timerHTML += '<text id="startButtonText" class="clickable" x="' + DIV_SIZE / 2 + '" y="' + DIV_SIZE / 2 + '" dominant-baseline="middle" text-anchor="middle" ';
        timerHTML += 'style="font-size: ' + DIV_SIZE / 10 + 'px; fill: black; transform-origin: center; transform: scaleX(-1);">START</text>';

        timerHTML += '</g></svg>';

        let timerDiv = document.getElementById('timer');
        timerDiv.innerHTML = timerHTML;
    }

    updateTimer(time1, time2) {
        let time1Interval = (Math.floor(time1 * CIRC_1_CIRCUM)) + ' ' + CIRC_1_CIRCUM;
        let time2Interval = '0 ' + CIRC_2_CIRCUM;
        let barSize = CIRC_2_CIRCUM / 10;

        if(time2 === 0) {
            time2Interval = '' + (barSize / 2) + ' ' + (CIRC_2_CIRCUM - barSize) + ' ' + (barSize / 2);
        } else if(time2 !== -1) {
            time2 -= 0.05;
            time2Interval = '0 ' + time2 * CIRC_2_CIRCUM + ' ' + barSize + ' ' + (1.0 - time2) * CIRC_2_CIRCUM;
        } else {
            time2Interval = '0 ' + CIRC_2_CIRCUM;
        }

        document
            .getElementById("timer-1-path-remaining")
            .setAttribute("stroke-dasharray", time1Interval);
        document
            .getElementById("timer-2-path-remaining")
            .setAttribute("stroke-dasharray", time2Interval);
    }

    updateText(text) {
        document.getElementById('startButtonText').innerHTML = text;
    }
}