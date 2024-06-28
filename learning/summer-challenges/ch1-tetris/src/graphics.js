export const initializeBoardSVG = () => {
  let boardSVG = document.getElementById('gameSVG');
  let svgHTML = '<rect id="boardSvgBackground" width="300" height="600" x="0" y="0" />';
  
  for(let i = 1; i < 10; i++) {
    svgHTML += '<line class="svgGrid" x1="' + (30*i) + '" y1="0" x2="' + (30*i) + '" y2="600" />';
  }

  for(let i = 1; i < 20; i++) {
    svgHTML += '<line class="svgGrid" x1="0" y1="' + (30*i) + '" x2="300" y2="' + (30*i) + '" />';
  }

  for(let y = 0; y < 20; y++) {
    for(let x = 0; x < 20; x++) {
      svgHTML += '<rect id="board-' + x + '-' + y + '" class="svgBlock hidden" width="30" height="30" x="' + (30*x) + '" y="' + (30*y) + '" rx="5" />';
    }
  }

  svgHTML += '<rect id="btnNewGame" class="svgButton clickable" width="200" height="50" x="50" y="275" rx="15" />';
  svgHTML += '<text id="newGameText" class="svgTextPlain svgTextWhite unclickable" font-size="24" x="83" y="308">NEW GAME</text>';

  svgHTML += '<text class="svgTextPixel svgTextWhite hidden" font-size="48" x="83" y="255">GAME</text>';
  svgHTML += '<text class="svgTextPixel svgTextWhite hidden" font-size="48" x="83" y="380">OVER</text>';

  boardSVG.innerHTML = svgHTML;
};

export const initializeUISVG = () => {
  let uiSVG = document.getElementById('uiSVG');
  let svgHTML = '<rect id="uiSvgBackground" width="900" height="700" x="0" y="0" rx="20" />';
  
  // "NEXT" square
  svgHTML += '<rect x="630" y="48" width="120" height="120"/>';
  for(let i = 1; i < 4; i++) {
    svgHTML += '<line class="svgGrid" x1="' + (630+30*i) + '" y1="48" x2="' + (630+30*i) + '" y2="168" />';
    svgHTML += '<line class="svgGrid" x1="630" y1="' + (48+30*i) + '" x2="750" y2="' + (48+30*i) + '" />';
  }

  for(let y = 0; y < 4; y++) {
    for(let x = 0; x < 4; x++) {
      svgHTML += '<rect id="next-' + x + '-' + y + '" class="svgBlock hidden" width="30" height="30" x="' + (630+30*x) + '" y="' + (48+30*y) + '" rx="5" />';
    }
  }

  // Long Tetris map
  // svgHTML += '<rect x="210" y="48" width="60" height="600"/>';

  svgHTML += '<rect class="svgKey" width="60"  height="60" x="120" y="230" rx="15" />'; // W
  svgHTML += '<rect class="svgKey" width="60"  height="60" x="50"  y="300" rx="15" />'; // A
  svgHTML += '<rect class="svgKey" width="60"  height="60" x="120" y="300" rx="15" />'; // S
  svgHTML += '<rect class="svgKey" width="60"  height="60" x="190" y="300" rx="15" />'; // D
  svgHTML += '<rect class="svgKey" width="200" height="50" x="50"  y="420" rx="15" />'; // Space

  svgHTML += '<text class="svgTextPlain" font-size="24" x="127" y="258">W</text>';
  svgHTML += '<text class="svgTextPlain" font-size="24" x="57" y="328">A</text>';
  svgHTML += '<text class="svgTextPlain" font-size="24" x="127" y="328">S</text>';
  svgHTML += '<text class="svgTextPlain" font-size="24" x="197" y="328">D</text>';
  svgHTML += '<text class="svgTextPlain" font-size="24" x="98" y="452">Spacebar</text>';
  svgHTML += '<text class="svgTextPlain" font-size="16" x="70" y="550">(arrow keys work, too)</text>';

  svgHTML += '<text class="svgTextPixel" font-size="30" x="650" y="40">NEXT</text>';
  svgHTML += '<text class="svgTextPixel" font-size="30" x="630" y="300">SCORE:</text>';
  svgHTML += '<text class="svgTextPixel" font-size="30" x="630" y="450">LEVEL:</text>';
  svgHTML += '<text class="svgTextPixel" font-size="30" id="svgScore" x="680" y="350">0</text>';
  svgHTML += '<text class="svgTextPixel" font-size="30" id="svgLevel" x="680" y="500">1</text>';

  svgHTML += '<text class="svgTextPixel" font-size="12" x="125" y="220">ROTATE</text>';
  svgHTML += '<text class="svgTextPixel" font-size="12" x="63" y="380">LEFT</text>';
  svgHTML += '<text class="svgTextPixel" font-size="12" x="131" y="380">DOWN</text>';
  svgHTML += '<text class="svgTextPixel" font-size="12" x="199" y="380">RIGHT</text>';
  svgHTML += '<text class="svgTextPixel" font-size="12" x="131" y="490">DROP</text>';

  uiSVG.innerHTML = svgHTML;
};

export const hideStartBtn = () => {
  document.getElementById('btnNewGame').classList.add('hidden');
  document.getElementById('newGameText').classList.add('hidden');
}

export const setBlock = (type, x, y, isActive) => {
  console.log('eisDEBUG: graphics.setBlock with ' + type + ', ' + x + ', ' + y + ', and ' + isActive);
  if(isActive) {
    document.getElementById('board-' + x + '-' + y).setAttribute('class','svgBlock ' + type + 'BlockActive');
    console.log('  eisDEBUG: graphics.setBlock (active), ' + x + ', ' + y);
  } else {
    document.getElementById('board-' + x + '-' + y).setAttribute('class','svgBlock ' + type + 'BlockInactive');
    console.log('  eisDEBUG: graphics.setBlock (inactive), ' + x + ', ' + y);
  }
}

export const clearBlock = (x, y) => {
  document.getElementById('board-' + x + '-' + y).setAttribute('class','svgBlock hidden');
}

export const newNextPiece = (type) => {
  for(let y = 0; y < 4; y++) {
    for(let x = 0; x < 4; x++) {
      // svgHTML += '<rect id="next-' + x + '-' + y + '" class="svgBlock hidden" width="30" height="30" x="' + (630+30*x) + '" y="' + (48+30*y) + '" rx="5" />';
      document.getElementById('next-' + x + '-' + y).setAttribute('class','svgBlock hidden');
    }
  }
  
  let x = 1;
  let y = 1;
  let rotation = 0;
  let piece = '' + type + rotation;
  console.log('eisDEBUG: newNextPiece(), piece is ' + piece);

  document.getElementById('next-' + (x) + '-' + (y)).setAttribute('class','svgBlock ' + type + 'BlockActive');

  // up-left
  if(piece.match(/(j0)|(l3)/g)){
    // graphics.setBlock(type, x-1, y-1);
    document.getElementById('next-' + (x-1) + '-' + (y-1)).setAttribute('class','svgBlock ' + type + 'BlockActive');
  }

  // up
  if(piece.match(/(i1)|(j1)|(j3)|(l1)|(l3)|(s1)|(t0)|(t1)|(t3)|(z1)/g)){
    // graphics.setBlock(type, x, y-1);
    document.getElementById('next-' + (x) + '-' + (y-1)).setAttribute('class','svgBlock ' + type + 'BlockActive');
  }

  // up-right
  if(piece.match(/(j1)|(l0)/g)){
    // graphics.setBlock(type, x+1, y-1);
    document.getElementById('next-' + (x+1) + '-' + (y-1)).setAttribute('class','svgBlock ' + type + 'BlockActive');
  }

  // left
  if(piece.match(/(i0)|(j0)|(j2)|(l0)|(l2)|(t0)|(t2)|(t3)|(z0)|(z1)/g)){
    // graphics.setBlock(type, x-1, y);
    document.getElementById('next-' + (x-1) + '-' + (y)).setAttribute('class','svgBlock ' + type + 'BlockActive');
  }

  // right
  if(piece.match(/(i0)|(j0)|(j2)|(l0)|(l2)|(o0)|(s0)|(s1)|(t0)|(t1)|(t2)/g)){
    // graphics.setBlock(type, x+1, y);
    document.getElementById('next-' + (x+1) + '-' + (y)).setAttribute('class','svgBlock ' + type + 'BlockActive');
  }

  // right-right
  if(piece.match(/(i0)/g)){
    // graphics.setBlock(type, x+2, y);
    document.getElementById('next-' + (x+2) + '-' + (y)).setAttribute('class','svgBlock ' + type + 'BlockActive');
  }

  // down-left
  if(piece.match(/(j3)|(l2)|(s0)|(z1)/g)){
    // graphics.setBlock(type, x-1, y+1);
    document.getElementById('next-' + (x-1) + '-' + (y+1)).setAttribute('class','svgBlock ' + type + 'BlockActive');
  }

  // down
  if(piece.match(/(i1)|(j1)|(j3)|(l1)|(l3)|(o0)|(s0)|(t1)|(t2)|(t3)|(z0)/g)){
    // graphics.setBlock(type, x, y+1);
    document.getElementById('next-' + (x) + '-' + (y+1)).setAttribute('class','svgBlock ' + type + 'BlockActive');
  }

  // down-right
  if(piece.match(/(j2)|(l1)|(o0)|(s1)|(z0)/g)){
    // graphics.setBlock(type, x+1, y+1);
    document.getElementById('next-' + (x+1) + '-' + (y+1)).setAttribute('class','svgBlock ' + type + 'BlockActive');
  }

  // down-down
  if(piece.match(/(i1)/g)){
    // graphics.setBlock(type, x, y+2);
    document.getElementById('next-' + (x) + '-' + (y+2)).setAttribute('class','svgBlock ' + type + 'BlockActive');
  }
}