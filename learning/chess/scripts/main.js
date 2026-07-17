

(function() {
    'use strict';

    let stateCheck = setInterval(() => {
        if (document.readyState === 'complete') {
            console.log('  DEBUG: document ready')
            clearInterval(stateCheck);
            startup();
        }
    }, 100);
})();

function startup() {
    console.log('  DEBUG: startup()');
    
    buildBoard();
    newGame();
}

function buildBoard() {
    console.log('  DEBUG: buildBoard()');
    
    for(let i = 8; i > 0; i--) {
        for (let j = 0; j < 8; j++) {
            let square = document.createElement('div');
            square.id = addToChar('a', j) + i;
            square.classList.add((i + j) % 2 === 0 ? 'light-square' : 'dark-square');
            document.getElementById('chessboard').appendChild(square);
        }
    }

    console.log(document.querySelectorAll('#chessboard > div').length); // Should be 64
}

function newGame() {
    console.log('  DEBUG: newGame()');

}

function addToChar(char, num) {
    return String.fromCharCode(char.charCodeAt(0) + num);
}