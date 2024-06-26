export const initializeBoardSVG = () => {
  let boardSVG = document.getElementById('gameSVG');
  let svgHTML = '<rect id="boardSvgBackground" width="300" height="600" x="0" y="0" />';
  
  for(let i = 1; i < 10; i++) {
    svgHTML += '<line class="svgGrid" x1="' + (30*i) + '" y1="0" x2="' + (30*i) + '" y2="600" />';
  }

  for(let i = 1; i < 20; i++) {
    svgHTML += '<line class="svgGrid" x1="0" y1="' + (30*i) + '" x2="300" y2="' + (30*i) + '" />';
  }

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

  // Long Tetris map
  // svgHTML += '<rect x="210" y="48" width="60" height="600"/>';

  svgHTML += '<rect class="svgKey" width="60"  height="60" x="120" y="230" rx="15" />'; // W
  svgHTML += '<rect class="svgKey" width="60"  height="60" x="50"  y="300" rx="15" />'; // A
  svgHTML += '<rect class="svgKey" width="60"  height="60" x="120" y="300" rx="15" />'; // S
  svgHTML += '<rect class="svgKey" width="60"  height="60" x="190" y="300" rx="15" />'; // D
  svgHTML += '<rect class="svgKey" width="200" height="50" x="50"  y="420" rx="15" />'; // Space

  svgHTML += '<text class="svgTextPlain" x="127" y="258">W</text>';
  svgHTML += '<text class="svgTextPlain" x="57" y="328">A</text>';
  svgHTML += '<text class="svgTextPlain" x="127" y="328">S</text>';
  svgHTML += '<text class="svgTextPlain" x="197" y="328">D</text>';
  svgHTML += '<text class="svgTextPlain" x="98" y="452">Spacebar</text>';
  svgHTML += '<text class="svgTextPlainSmall" x="70" y="550">(arrow keys work, too)</text>';

  svgHTML += '<text class="svgTextPixelBig" x="650" y="40">NEXT</text>';
  svgHTML += '<text class="svgTextPixelBig" x="630" y="300">SCORE:</text>';
  svgHTML += '<text class="svgTextPixelBig" x="630" y="450">LEVEL:</text>';
  svgHTML += '<text class="svgTextPixelBig" id="svgScore" x="680" y="350">0</text>';
  svgHTML += '<text class="svgTextPixelBig" id="svgLevel" x="680" y="500">1</text>';

  svgHTML += '<text class="svgTextPixelSmall" x="125" y="220">ROTATE</text>';
  svgHTML += '<text class="svgTextPixelSmall" x="63" y="380">LEFT</text>';
  svgHTML += '<text class="svgTextPixelSmall" x="131" y="380">DOWN</text>';
  svgHTML += '<text class="svgTextPixelSmall" x="199" y="380">RIGHT</text>';
  svgHTML += '<text class="svgTextPixelSmall" x="131" y="490">DROP</text>';

  uiSVG.innerHTML = svgHTML;
};

// export const testFunction = () => {}