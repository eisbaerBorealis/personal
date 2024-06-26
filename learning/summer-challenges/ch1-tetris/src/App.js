import React, { useState } from 'react';
import Game from './Game';

const App = () => {

  return (
    <div id="appDiv">
      <svg id="uiSVG" width="900" height="700" xmlns="http://www.w3.org/2000/svg"></svg>
      <Game />
    </div>
  );
};

export default App;