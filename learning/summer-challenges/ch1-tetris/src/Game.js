import React, { Component } from 'react';
import Gameboard from './Gameboard.js';
import * as graphics from './graphics.js';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      gameState: 0, // 0-start, 1-active, 2-paused, 3-end
      gameBoard: null,
      isPaused: true,
      countdown: 20,
      score: 0,
      level: 1,
    };
    
    this.doTick = this.doTick.bind(this);
    this.initializeListeners = this.initializeListeners.bind(this);
    this.getKeyPressed = this.getKeyPressed.bind(this);
    this.apiStartGame = this.apiStartGame.bind(this);
    this.apiUp = this.apiUp.bind(this);
    this.apiLeft = this.apiLeft.bind(this);
    this.apiRight = this.apiRight.bind(this);
    this.apiDown = this.apiDown.bind(this);
    this.apiSpace = this.apiSpace.bind(this);
    this.setPiece = this.setPiece.bind(this);
  }
  
componentDidMount() {
  // Set up the interval to update the counter every second
  this.interval = setInterval(this.doTick, 50);
  console.log('eisDEBUG: Game.componentDidMount()');
  console.log('eisDEBUG: this.state.counter is ' + this.state.counter);
  graphics.initializeBoardSVG();
  graphics.initializeUISVG();
  this.initializeListeners();
}

componentWillUnmount() {
  // Clear the interval to avoid memory leaks
  console.log('eisDEBUG: Game.componentWillUnmount()');
  clearInterval(this.interval);
}

doTick() {
  // console.log('eisDEBUG: Game.doTick()');
  if(!this.state.isPaused) {
    this.state.counter++;
  
    // if(this.state.counter % 100 === 0) {
    //   console.log('this.state.counter is ' + this.state.counter);
    // }

    this.state.countdown--;
    if(this.state.countdown <= 0) {
      this.apiDown();
      this.state.countdown = 20 - this.state.level;
      // console.log('eisDEBUG: doTick(); countdown reset; this.state.level is ' + this.state.level);
      // console.log('  eisDEBUG: doTick(); countdown reset1; this.state.countdown is ' + this.state.countdown);
      if(this.state.countdown < 1) {
        this.state.countdown = 1;
      }
      // console.log('  eisDEBUG: doTick(); countdown reset2; this.state.countdown is ' + this.state.countdown);
    }
  }
}

initializeListeners() {
  console.log('eisDEBUG: initializeListeners()');
  document.getElementById('btnNewGame').addEventListener('click', this.apiStartGame);
  document.addEventListener('keydown', this.getKeyPressed);
}

getKeyPressed(e) {
  let key = e.keyCode;
  // console.log('eisDEBUG: getKeyPressed(), key is ' + key);

  if(this.state.gameState === 1) {
    if(key === 87 || key === 38) {
      this.apiUp();
    } else if(key === 65 || key === 37) {
      this.apiLeft();
    } else if(key === 68 || key === 39) {
      this.apiRight();
    } else if(key === 83 || key === 40) {
      this.apiDown();
    } else if(key === 32) {
      this.apiSpace();
    } else if(key === 80) { // P
      this.apiPause();
    } else {
      console.log('eisDEBUG: getKeyPressed(), key is ' + key + '; not a valid control');
    }
  } else {
    console.log('  eisDEBUG: getKeyPressed(), gameState is ' + this.state.gameState);
  }
  
}

apiStartGame() {
  console.log('eisDEBUG: Game.apiStartGame()');
  this.state.gameState = 1;
  this.state.isPaused = false;
  this.state.gameBoard = new Gameboard();
  this.state.score = 0;
  graphics.updateScore(0, 1);
  graphics.hideStartBtn();
  console.log('eisDEBUG: this.state.gameState is ' + this.state.gameState);
  console.log('eisDEBUG: this.state.gameBoard is ' + this.state.gameBoard);
  console.log('eisDEBUG: this.state.gameBoard.score is ' + this.state.gameBoard.score);
}

apiPause() {
  this.state.isPaused = !this.state.isPaused;
}

apiUp() {
  // console.log('eisDEBUG: apiUp()');

  let newType = this.state.gameBoard.activePiece;
  let newX = this.state.gameBoard.activeX;
  let newY = this.state.gameBoard.activeY;

  let newRotation = this.state.gameBoard.activeRotation + 1;
  if(newType.match(/[isz]/g)){
    // console.log('  eisDEBUG: apiUp(), type matches [isz]');
    newRotation %= 2;
  } else if(newType.match(/[jlt]/g)){
    // console.log('  eisDEBUG: apiUp(), type matches [jlt]');
    newRotation %= 4;
  } else {
    // console.log('  eisDEBUG: apiUp(), type is o');
    newRotation = 0;
  }

  if(this.state.gameBoard.checkPlace(newType, newRotation, newX, newY)) {
    this.state.gameBoard.removePiece(newType, this.state.gameBoard.activeRotation, newX, newY);
    this.state.gameBoard.addPiece(newType, newRotation, newX, newY);
    // console.log('    eisDEBUG: apiUp(), oldRotation is ' + this.state.gameBoard.activeRotation + ', newRotation is ' + newRotation);
    this.state.gameBoard.activeRotation = newRotation;
  } else {
    console.log('  eisDEBUG: apiUp() failed');
  }
}

apiLeft() {
  // console.log('eisDEBUG: apiLeft()');

  let newType = this.state.gameBoard.activePiece;
  let newRotation = this.state.gameBoard.activeRotation;
  let newX = this.state.gameBoard.activeX - 1;
  let newY = this.state.gameBoard.activeY;

  if(this.state.gameBoard.checkPlace(newType, newRotation, newX, newY)) {
    this.state.gameBoard.removePiece(newType, newRotation, newX + 1, newY);
    this.state.gameBoard.addPiece(newType, newRotation, newX, newY);
    this.state.gameBoard.activeX--;
  } else {
    console.log('  eisDEBUG: apiLeft() failed');
  }
}

apiRight() {
  // console.log('eisDEBUG: apiRight()');

  let newType = this.state.gameBoard.activePiece;
  let newRotation = this.state.gameBoard.activeRotation;
  let newX = this.state.gameBoard.activeX + 1;
  let newY = this.state.gameBoard.activeY;

  if(this.state.gameBoard.checkPlace(newType, newRotation, newX, newY)) {
    this.state.gameBoard.removePiece(newType, newRotation, newX - 1, newY);
    this.state.gameBoard.addPiece(newType, newRotation, newX, newY);
    this.state.gameBoard.activeX++;
  } else {
    console.log('  eisDEBUG: apiRight() failed');
  }
}

apiDown() {
  // console.log('eisDEBUG: apiDown()');

  let newType = this.state.gameBoard.activePiece;
  let newRotation = this.state.gameBoard.activeRotation;
  let newX = this.state.gameBoard.activeX;
  let newY = this.state.gameBoard.activeY + 1;

  if(this.state.gameBoard.checkPlace(newType, newRotation, newX, newY)) {
    this.state.gameBoard.removePiece(newType, newRotation, newX, newY - 1);
    this.state.gameBoard.addPiece(newType, newRotation, newX, newY);
    this.state.gameBoard.activeY++;
  } else {
    console.log('\n  eisDEBUG: apiDown() failed');
    this.setPiece();
  }
}

apiSpace() {
  console.log('eisDEBUG: apiSpace()');

  let newType = this.state.gameBoard.activePiece;
  let newRotation = this.state.gameBoard.activeRotation;
  let newX = this.state.gameBoard.activeX;
  let newY = this.state.gameBoard.activeY;

  while(newY < 20 && this.state.gameBoard.checkPlace(newType, newRotation, newX, newY)) {
    newY++;
  }
  newY--;
  
  this.state.gameBoard.removePiece(newType, newRotation, newX, this.state.gameBoard.activeY);
  this.state.gameBoard.addPiece(newType, newRotation, newX, newY);
  this.state.gameBoard.activeY = newY;
  
  this.setPiece();
}

setPiece() {
  this.state.gameBoard.setPiece();
  let gameOver = !this.state.gameBoard.newPiece();
  if(gameOver) {
    this.state.gameState = 3;
    this.state.isPaused = true;
    graphics.gameOver();
  } else {
    if(this.state.gameBoard.score !== this.score) {
      this.state.score = this.state.gameBoard.score;
      this.state.level = Math.ceil(this.state.score / 1000);
      graphics.updateScore(this.state.score, this.state.level);
    } else {
      console.log('eisDEBUG: Game.setPiece(), gameBoard.score is ' + this.state.gameBoard.score + ', Game.score is ' + this.state.score);
    }
  }
}

render() {
  return (
    <div id="gameDiv">
      <svg id="gameSVG" width="300" height="600" xmlns="http://www.w3.org/2000/svg"></svg>
    </div>
  );
}

};

export default Game;