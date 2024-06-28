class Gameboard {
  constructor() {
    this.board = Array(20).fill().map(() => Array(10).fill(null));
    this.activePiece = null;
    this.activeRotation = 0;
    this.activeX = 0;
    this.activeY = 0;
    this.nextPiece = null;
    this.nextRotation = 0;
    console.log('eisDEBUG: Gameboard.constructor()');
    this.newNextPiece();
    this.newPiece();
  }
  
  newNextPiece() {
    console.log('eisDEBUG: Gameboard.newNextPiece()');
    // this.nextPiece = 'z';
    
    // for(let i = 0; i < 10; i++) {
    //   console.log('  eisDEBUG: random number is ' + Math.floor(Math.random() * 7));
    // }
    let nextRand = Math.floor(Math.random() * 7);
    switch(nextRand) {
      case 0:
        this.nextPiece = 'i';
        break;
      case 1:
        this.nextPiece = 'j';
        break;
      case 2:
        this.nextPiece = 'l';
        break;
      case 3:
        this.nextPiece = 'o';
        break;
      case 4:
        this.nextPiece = 's';
        break;
      case 5:
        this.nextPiece = 't';
        break;
      case 6:
        this.nextPiece = 'z';
        break;
      default:
        console.log('ERROR: default switch in Gameboard.newNextPiece()');
        this.nextPiece = 'o';
    }
  }

  newPiece() {
    this.activeX = 4;
    this.activeY = 0;
    this.activePiece = this.nextPiece;
    this.rotation = this.nextRotation;

    if(this.activePiece === 'j' || this.activePiece === 'l' || this.activePiece === 't') {
      this.activeY = 1;
    }

    if(!this.checkPlace(this.activePiece, this.activeRotation, this.activeX, this.activeY)) {
      console.log('eisDEBUG: GAME OVER!!!');
    } else {
      this.addPiece(this.activePiece, this.activeRotation, this.activeX, this.activeY);
    }

    this.newNextPiece();
  }

  checkPlace(type, rotation, x, y) {
    console.log('eisDEBUG: Gameboard.checkPlace()');
    let isClear = true;

    return isClear;
  }

  removePiece(type, rotation, x, y) {
    console.log('eisDEBUG: Gameboard.removePiece()');

  }

  addPiece(type, rotation, x, y) {
    console.log('eisDEBUG: Gameboard.addPiece() with ' + type + ', ' + rotation + ', ' + x + ', and ' + y);

    let piece = type + rotation;
    console.log('  eisDEBUG: piece is ' + piece);

    document.getElementById('board-' + x + '-' + y).setAttribute('class','svgBlock ' + type + 'BlockActive');

    // up-left
    if(piece === 'j0' || piece === 'l3'){
      document.getElementById('board-' + (x-1) + '-' + (y-1)).setAttribute('class','svgBlock ' + type + 'BlockActive');
    }

    // up
    if(piece === 'i1' || piece === 'j1' || piece === 'j3' || piece === 'l1' ||
       piece === 'l3' || piece === 's1' || piece === 't0' || piece === 't1' ||
       piece === 't3' || piece === 'z1'){
      document.getElementById('board-' + (x-0) + '-' + (y-1)).setAttribute('class','svgBlock ' + type + 'BlockActive');
    }

    // up-right
    if(piece === 'j1' || piece === 'l0'){
      document.getElementById('board-' + (x+1) + '-' + (y-1)).setAttribute('class','svgBlock ' + type + 'BlockActive');
    }

    // left
    if(piece === 'i0' || piece === 'j0' || piece === 'j2' || piece === 'l0' ||
       piece === 'l2' || piece === 't0' || piece === 't2' || piece === 't3' ||
       piece === 'z0' || piece === 'z1'){
      document.getElementById('board-' + (x-1) + '-' + (y-0)).setAttribute('class','svgBlock ' + type + 'BlockActive');
    }

    // right
    if(piece === 'i0' || piece === 'j0' || piece === 'j2' || piece === 'l0' ||
       piece === 'l2' || piece === 'o0' || piece === 's0' || piece === 's1' ||
       piece === 't0' || piece === 't1' || piece === 't2'){
      document.getElementById('board-' + (x+1) + '-' + (y-0)).setAttribute('class','svgBlock ' + type + 'BlockActive');
    }

    // right-right
    if(piece === 'i0'){
      document.getElementById('board-' + (x+2) + '-' + (y-0)).setAttribute('class','svgBlock ' + type + 'BlockActive');
    }

    // down-left
    if(piece === 'j3' || piece === 'l2' || piece === 's0' || piece === 'z1'){
      document.getElementById('board-' + (x-1) + '-' + (y+1)).setAttribute('class','svgBlock ' + type + 'BlockActive');
    }

    // down
    if(piece === 'i1' || piece === 'j1' || piece === 'j3' || piece === 'l1' ||
       piece === 'l3' || piece === 'o0' || piece === 's0' || piece === 't1' ||
       piece === 't2' || piece === 't3' || piece === 'z0'){
      document.getElementById('board-' + (x-0) + '-' + (y+1)).setAttribute('class','svgBlock ' + type + 'BlockActive');
    }

    // down-right
    if(piece === 'j2' || piece === 'l1' || piece === 'o0' || piece === 's1' || piece === 'z0'){
      document.getElementById('board-' + (x+1) + '-' + (y+1)).setAttribute('class','svgBlock ' + type + 'BlockActive');
    }

    // down-down
    if(piece === 'i1'){
      document.getElementById('board-' + (x-0) + '-' + (y+2)).setAttribute('class','svgBlock ' + type + 'BlockActive');
    }
  }
}


export default Gameboard;