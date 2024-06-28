import * as graphics from './graphics.js';

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

    graphics.setBlock(type, x, y);

    // up-left
    if(piece.match(/(j0)|(l3)/g)){
      graphics.setBlock(type, x-1, y-1);
    }

    // up
    if(piece.match(/(i1)|(j1)|(j3)|(l1)|(l3)|(s1)|(t0)|(t1)|(t3)|(z1)/g)){
      graphics.setBlock(type, x, y-1);
    }

    // up-right
    if(piece.match(/(j1)|(l0)/g)){
      graphics.setBlock(type, x+1, y-1);
    }

    // left
    if(piece.match(/(i0)|(j0)|(j2)|(l0)|(l2)|(t0)|(t2)|(t3)|(z0)|(z1)/g)){
      graphics.setBlock(type, x-1, y);
    }

    // right
    if(piece.match(/(i0)|(j0)|(j2)|(l0)|(l2)|(o0)|(s0)|(s1)|(t0)|(t1)|(t2)/g)){
      graphics.setBlock(type, x+1, y);
    }

    // right-right
    if(piece.match(/(i0)/g)){
      graphics.setBlock(type, x+2, y);
    }

    // down-left
    if(piece.match(/(j3)|(l2)|(s0)|(z1)/g)){
      graphics.setBlock(type, x-1, y+1);
    }

    // down
    if(piece.match(/(i1)|(j1)|(j3)|(l1)|(l3)|(o0)|(s0)|(t1)|(t2)|(t3)|(z0)/g)){
      graphics.setBlock(type, x, y+1);
    }

    // down-right
    if(piece.match(/(j2)|(l1)|(o0)|(s1)|(z0)/g)){
      graphics.setBlock(type, x+1, y+1);
    }

    // down-down
    if(piece.match(/(i1)/g)){
      graphics.setBlock(type, x, y+2);
    }
  }
}


export default Gameboard;