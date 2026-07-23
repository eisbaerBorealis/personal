// King: ♚
// Queen: ♛
// Rook: ♜
// Bishop: ♝
// Knight: ♞
// Pawn: ♟

var pieceID = 0;

class Piece {
    constructor(color, location) {
        this.color = color;
        this.location = location;
        this.id = pieceID;
        pieceID++;
    }

    getValidMoves() {
        console.log(`  ERROR: getValidMoves() called on Piece class`);
    }
}

class King extends Piece {
    constructor(color, location) {
        super(color, location);
    }

    getValidMoves() {
        
    }
}

class Queen extends Piece {
    constructor(color, location) {
        super(color, location);
    }
}

class Rook extends Piece {
    constructor(color, location) {
        super(color, location);
    }
}

class Bishop extends Piece {
    constructor(color, location) {
        super(color, location);
    }
}

class Knight extends Piece {
    constructor(color, location) {
        super(color, location);
    }
}

class Pawn extends Piece {
    constructor(color, location) {
        super(color, location);
    }
}
