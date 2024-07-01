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
    graphics.clearBoard();
    this.newNextPiece();
    this.newPiece();
  }
  
  newNextPiece() {
    // console.log('eisDEBUG: Gameboard.newNextPiece()');
    
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

    graphics.newNextPiece(this.nextPiece);

    // this.nextPiece = 'z'; // i j l o s t z
  }

  newPiece() {
    let success = true;
    this.activeX = 4;
    this.activeY = 0;
    this.activePiece = this.nextPiece;
    this.activeRotation = this.nextRotation;

    if(this.activePiece === 'j' || this.activePiece === 'l' || this.activePiece === 't') {
      this.activeY = 1;
    }

    if(!this.checkPlace(this.activePiece, this.activeRotation, this.activeX, this.activeY)) {
      console.log('eisDEBUG: GAME OVER!!!');
      success = false;
    } else {
      this.newNextPiece();
    }
    this.addPiece(this.activePiece, this.activeRotation, this.activeX, this.activeY);

    return success;
  }

  checkPlace(type, rotation, x, y) {
    // console.log('eisDEBUG: Gameboard.checkPlace()');
    // console.log('eisDEBUG: Gameboard.checkPlace() with ' + type + ', ' + rotation + ', ' + x + ', and ' + y);
    let isClear = true;

    let piece = type + rotation;

    // center
    if(x < 0 || x > 9 || y < 0 || y > 19 || this.board[y][x] !== null) {
      isClear = false;
      // console.log('  eisDEBUG: Gameboard.checkPlace() failed on center');
    }

    // up-left
    if(piece.match(/(j0)|(l3)/g)){
      if(x <= 0 || y < 1 || this.board[y-1][x-1] !== null) {
        isClear = false;
        // console.log('  eisDEBUG: Gameboard.checkPlace() failed on up-left');
      }
    }

    // up
    if(piece.match(/(i1)|(j1)|(j3)|(l1)|(l3)|(s1)|(t0)|(t1)|(t3)|(z1)/g)){
      if(x < 0 || x > 9 || y < 1 || this.board[y-1][x] !== null) {
        isClear = false;
        // console.log('  eisDEBUG: Gameboard.checkPlace() failed on up');
      }
    }

    // up-right
    if(piece.match(/(j1)|(l0)/g)){
      if(x > 8 || y < 1 || this.board[y-1][x+1] !== null) {
        isClear = false;
        // console.log('  eisDEBUG: Gameboard.checkPlace() failed on up-right');
      }
    }

    // left
    if(piece.match(/(i0)|(j0)|(j2)|(l0)|(l2)|(t0)|(t2)|(t3)|(z0)|(z1)/g)){
      if(x < 0 || y < 0 || y > 19 || this.board[y][x-1] !== null) {
        isClear = false;
        // console.log('  eisDEBUG: Gameboard.checkPlace() failed on left');
      }
    }

    // right
    if(piece.match(/(i0)|(j0)|(j2)|(l0)|(l2)|(o0)|(s0)|(s1)|(t0)|(t1)|(t2)/g)){
      if(x > 8 || y < 0 || y > 19 || this.board[y][x+1] !== null) {
        isClear = false;
        // console.log('  eisDEBUG: Gameboard.checkPlace() failed on right');
      }
    }

    // right-right
    if(piece.match(/(i0)/g)){
      if(x > 7 || y < 0 || y > 19 || this.board[y][x+2] !== null) {
        isClear = false;
        // console.log('  eisDEBUG: Gameboard.checkPlace() failed on right-right');
      }
    }

    // down-left
    if(piece.match(/(j3)|(l2)|(s0)|(z1)/g)){
      if(x < 1 || y > 18 || this.board[y+1][x-1] !== null) {
        isClear = false;
        // console.log('  eisDEBUG: Gameboard.checkPlace() failed on down-left');
      }
    }

    // down
    if(piece.match(/(i1)|(j1)|(j3)|(l1)|(l3)|(o0)|(s0)|(t1)|(t2)|(t3)|(z0)/g)){
      if(x < 0 || x > 9 || y > 18 || this.board[y+1][x] !== null) {
        isClear = false;
        // console.log('  eisDEBUG: Gameboard.checkPlace() failed on down');
      }
    }

    // down-right
    if(piece.match(/(j2)|(l1)|(o0)|(s1)|(z0)/g)){
      if(x > 8 || y > 18 || this.board[y+1][x+1] !== null) {
        isClear = false;
        // console.log('  eisDEBUG: Gameboard.checkPlace() failed on down-right');
      }
    }

    // down-down
    if(piece.match(/(i1)/g)){
      if(x < 0 || x > 9 || y > 17 || this.board[y+2][x] !== null) {
        isClear = false;
        // console.log('  eisDEBUG: Gameboard.checkPlace() failed on down-down');
      }
    }

    return isClear;
  }

  removePiece(type, rotation, x, y) {
    // console.log('eisDEBUG: Gameboard.removePiece()');

    let piece = type + rotation;

    graphics.clearBlock(x, y);
    
    // up-left
    if(piece.match(/(j0)|(l3)/g)){
      graphics.clearBlock(x-1, y-1);
    }

    // up
    if(piece.match(/(i1)|(j1)|(j3)|(l1)|(l3)|(s1)|(t0)|(t1)|(t3)|(z1)/g)){
      graphics.clearBlock(x, y-1);
    }

    // up-right
    if(piece.match(/(j1)|(l0)/g)){
      graphics.clearBlock(x+1, y-1);
    }

    // left
    if(piece.match(/(i0)|(j0)|(j2)|(l0)|(l2)|(t0)|(t2)|(t3)|(z0)|(z1)/g)){
      graphics.clearBlock(x-1, y);
    }

    // right
    if(piece.match(/(i0)|(j0)|(j2)|(l0)|(l2)|(o0)|(s0)|(s1)|(t0)|(t1)|(t2)/g)){
      graphics.clearBlock(x+1, y);
    }

    // right-right
    if(piece.match(/(i0)/g)){
      graphics.clearBlock(x+2, y);
    }

    // down-left
    if(piece.match(/(j3)|(l2)|(s0)|(z1)/g)){
      graphics.clearBlock(x-1, y+1);
    }

    // down
    if(piece.match(/(i1)|(j1)|(j3)|(l1)|(l3)|(o0)|(s0)|(t1)|(t2)|(t3)|(z0)/g)){
      graphics.clearBlock(x, y+1);
    }

    // down-right
    if(piece.match(/(j2)|(l1)|(o0)|(s1)|(z0)/g)){
      graphics.clearBlock(x+1, y+1);
    }

    // down-down
    if(piece.match(/(i1)/g)){
      graphics.clearBlock(x, y+2);
    }
  }

  addPiece(type, rotation, x, y) {
    // console.log('eisDEBUG: Gameboard.addPiece() with ' + type + ', ' + rotation + ', ' + x + ', and ' + y);

    let piece = type + rotation;
    // console.log('  eisDEBUG: piece is ' + piece);

    graphics.setBlock(type, x, y, true);

    // up-left
    if(piece.match(/(j0)|(l3)/g)){
      graphics.setBlock(type, x-1, y-1, true);
    }

    // up
    if(piece.match(/(i1)|(j1)|(j3)|(l1)|(l3)|(s1)|(t0)|(t1)|(t3)|(z1)/g)){
      graphics.setBlock(type, x, y-1, true);
    }

    // up-right
    if(piece.match(/(j1)|(l0)/g)){
      graphics.setBlock(type, x+1, y-1, true);
    }

    // left
    if(piece.match(/(i0)|(j0)|(j2)|(l0)|(l2)|(t0)|(t2)|(t3)|(z0)|(z1)/g)){
      graphics.setBlock(type, x-1, y, true);
    }

    // right
    if(piece.match(/(i0)|(j0)|(j2)|(l0)|(l2)|(o0)|(s0)|(s1)|(t0)|(t1)|(t2)/g)){
      graphics.setBlock(type, x+1, y, true);
    }

    // right-right
    if(piece.match(/(i0)/g)){
      graphics.setBlock(type, x+2, y, true);
    }

    // down-left
    if(piece.match(/(j3)|(l2)|(s0)|(z1)/g)){
      graphics.setBlock(type, x-1, y+1, true);
    }

    // down
    if(piece.match(/(i1)|(j1)|(j3)|(l1)|(l3)|(o0)|(s0)|(t1)|(t2)|(t3)|(z0)/g)){
      graphics.setBlock(type, x, y+1, true);
    }

    // down-right
    if(piece.match(/(j2)|(l1)|(o0)|(s1)|(z0)/g)){
      graphics.setBlock(type, x+1, y+1, true);
    }

    // down-down
    if(piece.match(/(i1)/g)){
      graphics.setBlock(type, x, y+2, true);
    }
  }

  setPiece() {
    console.log('eisDEBUG: Gameboard.setPiece()');
    let type = this.activePiece;
    let piece = type + this.activeRotation;
    let x = this.activeX;
    let y = this.activeY;

    let minY = 20;
    let maxY = -1;

    this.board[y][x] = this.activePiece;
    graphics.setBlock(type, x, y, false);

    // up-left
    if(piece.match(/(j0)|(l3)/g)){
      this.board[y-1][x-1] = this.activePiece;
      graphics.setBlock(type, x-1, y-1, false);
      if(y-1 < minY) {minY = y-1; console.log('eisDEBUG: changed minY to ' + minY + ' on up-left check');}
      if(y-1 > maxY) {maxY = y-1; console.log('eisDEBUG: changed maxY to ' + maxY + ' on up-left check');}
    }

    // up
    if(piece.match(/(i1)|(j1)|(j3)|(l1)|(l3)|(s1)|(t0)|(t1)|(t3)|(z1)/g)){
      this.board[y-1][x] = this.activePiece;
      graphics.setBlock(type, x, y-1, false);
      if(y-1 < minY) {minY = y-1; console.log('eisDEBUG: changed minY to ' + minY + ' on up check');}
      if(y-1 > maxY) {maxY = y-1; console.log('eisDEBUG: changed maxY to ' + maxY + ' on up check');}
    }

    // up-right
    if(piece.match(/(j1)|(l0)/g)){
      this.board[y-1][x+1] = this.activePiece;
      graphics.setBlock(type, x+1, y-1, false);
      if(y-1 < minY) {minY = y-1; console.log('eisDEBUG: changed minY to ' + minY + ' on up-right check');}
      if(y-1 > maxY) {maxY = y-1; console.log('eisDEBUG: changed maxY to ' + maxY + ' on up-right check');}
    }

    // left
    if(piece.match(/(i0)|(j0)|(j2)|(l0)|(l2)|(t0)|(t2)|(t3)|(z0)|(z1)/g)){
      this.board[y][x-1] = this.activePiece;
      graphics.setBlock(type, x-1, y, false);
      if(y < minY) {minY = y; console.log('eisDEBUG: changed minY to ' + minY + ' on left check');}
      if(y > maxY) {maxY = y; console.log('eisDEBUG: changed maxY to ' + maxY + ' on left check');}
    }

    // right
    if(piece.match(/(i0)|(j0)|(j2)|(l0)|(l2)|(o0)|(s0)|(s1)|(t0)|(t1)|(t2)/g)){
      this.board[y][x+1] = this.activePiece;
      graphics.setBlock(type, x+1, y, false);
      if(y < minY) {minY = y; console.log('eisDEBUG: changed minY to ' + minY + ' on right check');}
      if(y > maxY) {maxY = y; console.log('eisDEBUG: changed maxY to ' + maxY + ' on right check');}
    }

    // right-right
    if(piece.match(/(i0)/g)){
      this.board[y][x+2] = this.activePiece;
      graphics.setBlock(type, x+2, y, false);
      if(y < minY) {minY = y; console.log('eisDEBUG: changed minY to ' + minY + ' on right-right check');}
      if(y > maxY) {maxY = y; console.log('eisDEBUG: changed maxY to ' + maxY + ' on right-right check');}
    }

    // down-left
    if(piece.match(/(j3)|(l2)|(s0)|(z1)/g)){
      this.board[y+1][x-1] = this.activePiece;
      graphics.setBlock(type, x-1, y+1, false);
      if(y+1 < minY) {minY = y+1; console.log('eisDEBUG: changed minY to ' + minY + ' on down-left check');}
      if(y+1 > maxY) {maxY = y+1; console.log('eisDEBUG: changed maxY to ' + maxY + ' on down-left check');}
    }

    // down
    if(piece.match(/(i1)|(j1)|(j3)|(l1)|(l3)|(o0)|(s0)|(t1)|(t2)|(t3)|(z0)/g)){
      this.board[y+1][x] = this.activePiece;
      graphics.setBlock(type, x, y+1, false);
      if(y+1 < minY) {minY = y+1; console.log('eisDEBUG: changed minY to ' + minY + ' on down check');}
      if(y+1 > maxY) {maxY = y+1; console.log('eisDEBUG: changed maxY to ' + maxY + ' on down check');}
    }

    // down-right
    if(piece.match(/(j2)|(l1)|(o0)|(s1)|(z0)/g)){
      this.board[y+1][x+1] = this.activePiece;
      graphics.setBlock(type, x+1, y+1, false);
      if(y+1 < minY) {minY = y+1; console.log('eisDEBUG: changed minY to ' + minY + ' on down-right check');}
      if(y+1 > maxY) {maxY = y+1; console.log('eisDEBUG: changed maxY to ' + maxY + ' on down-right check');}
    }

    // down-down
    if(piece.match(/(i1)/g)){
      this.board[y+2][x] = this.activePiece;
      graphics.setBlock(type, x, y+2, false);
      if(y+2 < minY) {minY = y+2; console.log('eisDEBUG: changed minY to ' + minY + ' on down-down check');}
      if(y+2 > maxY) {maxY = y+2; console.log('eisDEBUG: changed maxY to ' + maxY + ' on down-down check');}
    }

    this.checkRows(minY, maxY);
  }
  
  checkRows(minY, maxY) {
    console.log('eisDEBUG: checkRows() between ' + minY + ' and ' + maxY);
    for(let y = maxY; y >= minY; y--) {
      let rowComplete = true;
      for(let x = 0; x < 10; x++) {
        if(this.board[y][x] === null) {
          rowComplete = false;
          console.log('  eisDEBUG: empty cell at ' + x + ',' + y);
          x = 10;
        }
      }
      if(rowComplete) {
        console.log('    eisDEBUG: rowComplete!');

        for(let y2 = y; y2 > 0; y2--) {
          for(let x2 = 0; x2 < 10; x2++) {
            this.board[y2][x2] = this.board[y2-1][x2];
            if(this.board[y2][x2] !== null) {
              graphics.setBlock(this.board[y2][x2], x2, y2, false);
            } else {
              graphics.clearBlock(x2, y2);
            }
          }
        }

        for(let x2 = 0; x2 < 10; x2++) {
          this.board[0][x2] = null;
          graphics.clearBlock(x2, 0);
        }
        y++;
      }
    }
  }


}
export default Gameboard;