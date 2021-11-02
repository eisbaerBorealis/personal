const TICKS_PER_SEC = 40;
const CIRC_LEN = 754;

var paused = false;
var state = 'init';
var tasksLeft = [];
var currTask = -1;
var maxTime = -1;
var countdown = 0;

(function() {
    'use strict';

    let stateCheck = setInterval(() => {
        if (document.readyState === 'complete') {
            console.log('  eisDEBUG: document ready')
            startup();
            clearInterval(stateCheck);
        }
    }, 100);
})();

function startup() {
    console.log('  eisDEBUG: startup()');
    addButtons();
}

function addButtons() {
    document.getElementById('play-btn').onclick = function() {
        start();
    };
    document.getElementById('time-text').onclick = function() {
        togglePause();
    };
}

function start() {
    console.log('  eisDEBUG: start()');
    document.getElementById('play-btn').remove();

    let gameEngine = setInterval(() => {
        doTick();
    }, 1000 / TICKS_PER_SEC);
}

function togglePause() {
    paused = !paused;
}

function resetTasks() {
    console.log('  eisDEBUG: resetTasks()');
    for(let i = 0; i < TASKS.length; i++) {
        tasksLeft.push(i);
    }
}

function chooseNextTask() {
    console.log('  eisDEBUG: chooseNextTask()');
    let next = Math.floor(Math.random() * tasksLeft.length);
    currTask = tasksLeft[next];
    tasksLeft.splice(next, 1);
    console.log('    eisDEBUG: chose task ' + TASKS[currTask].name);
    document.getElementById('task-text').innerHTML = TASKS[currTask].name;
}

function switchToPrep() {
    console.log('  eisDEBUG: switchToPrep()');
    state = 'prep';
    chooseNextTask();
    maxTime = TASKS[currTask].prep * TICKS_PER_SEC;
    countdown = maxTime;
    updateTimer();
    document.getElementById('timer-path').classList.toggle('timer-prep');
    document.getElementById('timer-path').classList.toggle('timer-task');
    // console.log('    eisDEBUG: switchToPrep() - ' + countdown + '/' + maxTime);
}

function switchToTask() {
    console.log('  eisDEBUG: switchToTask()');
    state = 'task';
    maxTime = TASKS[currTask].duration * TICKS_PER_SEC;
    countdown = maxTime;
    updateTimer();
    document.getElementById('timer-path').classList.toggle('timer-prep');
    document.getElementById('timer-path').classList.toggle('timer-task');
    // console.log('    eisDEBUG: ' + countdown + '/' + maxTime);
}

function doTick() {
    if(!paused) {
        switch(state) {
            case 'init':
                //resetTasks();
                state = 'task';
                console.log('  eisDEBUG: changing state to \'task\' from \'init\'');
                doTick();
                break;
            case 'prep':
                if(countdown <= 0) {
                    switchToTask();
                } else {
                    updateTimer();
                }
                countdown--;
                break;
            case 'task':
                if(countdown <= 0) {
                    if(tasksLeft.length === 0) {
                        resetTasks();
                    }
                    switchToPrep();
                } else {
                    updateTimer();
                }
                countdown--;
                break;
            default:
                console.error('ERROR: default in switch statement for doTick().');
        }
    }
}

function updateTimer() {
//console.log('  eisDEBUG updateTimer(): countdown is ' + countdown);
    let arclength;
    if(state === 'prep') {
        arclength = CIRC_LEN * (1 - countdown / maxTime);
    } else {
        arclength = CIRC_LEN * countdown / maxTime;
    }
    let dasharray = Math.floor(arclength) + ' ' + CIRC_LEN;
//if(countdown % 40 === 0){console.log('  eisDEBUG updateTimer(): dasharrayis ' + dasharray);}
    document
            .getElementById('timer-path')
            .setAttribute('stroke-dasharray', dasharray);

    document.getElementById('time-text').innerHTML = getTimeText(countdown / TICKS_PER_SEC);
}

function getTimeText(seconds) {
    seconds = Math.floor(seconds);
    minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    if(seconds < 10) {
        seconds = '0' + seconds;
    }

    return minutes + ':' + seconds;
}