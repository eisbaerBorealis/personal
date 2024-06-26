import React, { Component } from 'react';
// import {initializeSVG} from './graphics.js';
import * as graphics from './graphics.js';
import * as api from './api.js';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      gameBoard: Array(20).fill().map(() => Array(10).fill(null)),
    };
    
    this.doTick = this.doTick.bind(this);
  }
  
componentDidMount() {
  // Set up the interval to update the counter every second
  this.interval = setInterval(this.doTick, 50);
  console.log('eisDEBUG: Game.componentDidMount()');
  console.log('eisDEBUG: this.state.counter is ' + this.state.counter);
  // initializeSVG();
  graphics.initializeBoardSVG();
  graphics.initializeUISVG();
}

componentWillUnmount() {
  // Clear the interval to avoid memory leaks
  console.log('eisDEBUG: Game.componentWillUnmount()');
  clearInterval(this.interval);
}

doTick() {
  // console.log('eisDEBUG: Game.doTick()');
  this.state.counter++;
  
  if(this.state.counter % 100 === 0) {
    console.log('this.state.counter is ' + this.state.counter);
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