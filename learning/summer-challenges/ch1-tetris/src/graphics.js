export const initializeSVG = () => {
  let boardSVG = document.getElementById('gameSVG');
  let svgHTML = '<rect id="svgBackground" width="300" height="600" x="0" y="0" fill="black" />';
  
  for(let i = 1; i < 10; i++) {
    svgHTML += '<line class="svgGrid" x1="' + (30*i) + '" y1="0" x2="' + (30*i) + '" y2="600" />';
  }

  for(let i = 1; i < 20; i++) {
    svgHTML += '<line class="svgGrid" x1="0" y1="' + (30*i) + '" x2="300" y2="' + (30*i) + '" />';
  }

  boardSVG.innerHTML = svgHTML;
};

// export const testFunction = () => {}