

(function() {
    'use strict';

    let stateCheck = setInterval(() => {
        if (document.readyState === 'complete') {
            console.log('  DEBUG: document ready')
            clearInterval(stateCheck);
            startup();
        } else {
            console.log('  DEBUG: document not ready')
        }
    }, 100);
})();

function startup() {
    console.log('  DEBUG: startup()');
    
    buildBoard();
    newGame();
}

function newGame() {
    console.log('  DEBUG: newGame()');

}

function addToChar(char, num) {
    return String.fromCharCode(char.charCodeAt(0) + num);
}

function chessCharToNum(char) {
    return char.charCodeAt(0) - 'a'.charCodeAt(0);
}

function chessNumToChar(num) {
    return String.fromCharCode('a'.charCodeAt(0) + num);
}