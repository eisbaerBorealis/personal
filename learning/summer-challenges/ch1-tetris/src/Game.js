import React, { Component } from 'react';
import Gameboard from './Gameboard.js';
import * as graphics from './graphics.js';
// import * as api from './api.js';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      gameState: 0, // 0-start, 1-active, 2-paused, 3-end
      // gameBoard: new Gameboard(),
      gameBoard: null,
      isPaused: true,
      // gameBoard: Array(20).fill().map(() => Array(10).fill(null)),
    };
    
    this.doTick = this.doTick.bind(this);
    this.initializeListeners = this.initializeListeners.bind(this);
    this.apiStartGame = this.apiStartGame.bind(this);
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
  
    if(this.state.counter % 100 === 0) {
      console.log('this.state.counter is ' + this.state.counter);
    }
  }
}

initializeListeners() {
  console.log('eisDEBUG: initializeListeners()');
  document.getElementById('btnNewGame').addEventListener('click', this.apiStartGame);
}

apiStartGame() {
  console.log('eisDEBUG: Game.apiStartGame()');
  this.state.gameState = 1;
  this.state.gameBoard = new Gameboard();
  graphics.hideStartBtn();
  console.log('eisDEBUG: this.state.gameState is ' + this.state.gameState);
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