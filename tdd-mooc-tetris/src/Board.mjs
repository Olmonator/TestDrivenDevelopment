import { MovingShape } from "./MovingShape.mjs";
import { Grid } from "./Grid.mjs";

export class Board{
  width;
  height;

  falling = null;
  fallingRow = 0;

  // static Board with already fallen pieces
  board;

  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.board = new Grid(width, height);
  }

  // row and col reference upper right corner of the block
  setBlock(newBlock, orientation, row, col) {
    let piece = newBlock.getOrientation(orientation); // Piece
    this.board.setBoard(piece, row, col);

    console.log('BOARD_setBlock:\n', this.toString());
  }

  drop(newBlock) {
    // check if Block is already falling
    if (this.hasFalling()) {
      throw new Error('already falling');
    }
    let rowOffset = this.calculateRowOffset(newBlock);
    let colOffset = Math.ceil((this.width - newBlock.collumns()) / 2);
    this.falling = new MovingShape(newBlock, rowOffset, colOffset);
    //console.log('DROP:\n', this.toString());
  }

  // different Block have different amounts of whitespace above the block
  // .... this line needs to be accounted for
  // .TTT
  // ..T.
  // ....
  calculateRowOffset(newBlock) {
    for (let row = 0; row < newBlock.rows(); row++) {
      for (let col = 0; col < newBlock.collumns(); col++) {
          if (newBlock.cellAt(row, col) !== '.') {
              return -row;
          }
      }
    }
  }

  hasFalling() {
    return this.falling !== null;
  }

  tick() {
    //console.log('BOARD_tick_BEFORE:\n', this.toString());
    if (this.hasFalling()) {
      // check if tick would lead to collision
      let nextFalling = this.falling.moveDown(); 
      if (nextFalling.collides(this.board)) {
        this.board = this.board.updateBoard(this.toString());
        this.falling = null;
      } else if(this.hasFalling()) {
        this.falling = nextFalling;
      }
    }
    
    //console.log('AFTER:\n', this.toString());
  }

  cellAt(row, col) {
    if(this.hasFalling()) {
      let cell = this.falling.cellAt(row, col);
      if (cell && cell !== '.') {
        return cell;
      } else 
        return this.board.cellAt(row, col);
    }
    return this.board.cellAt(row, col);
  }

  toString() {
    let boardString = ''
    for (let row = 0; row < this.height; row++) { 
      for (let col = 0; col < this.width; col++) {
        boardString += this.cellAt(row, col);
      }
      boardString += '\n';
    }
    return boardString;
  }

  moveRight() {
    this.falling = this.checkBounds(this.falling.moveRight());
  }

  moveLeft() {
    this.falling = this.checkBounds(this.falling.moveLeft());
  }

  moveDown() {
    let next = this.falling.moveDown();
    if (next.collides(this.board)) {
      this.board = this.board.updateBoard(this.toString());
      this.falling = null;
    } else {
      this.falling = next;
    }
  }

  checkBounds(nextPos) {
    if (!nextPos.collides(this.board)) {
      return nextPos;
    } else {
      return this.falling;
    }
  }

  rotateRight() {
    let nextPos = this.falling.rotateRight();
    if (nextPos.collides(this.board)) {
      let kickPos = nextPos.moveLeft();
      if (!kickPos.collides(this.board)) {
        this.falling = kickPos;
      }
      kickPos = nextPos.moveRight();
      if (!kickPos.collides(this.board)) {
        this.falling = kickPos;
      }
    } else {
      this.falling = nextPos;
    }
  }
  
  rotateLeft() {
    let nextPos = this.falling.rotateLeft();
    if (nextPos.collides(this.board)) {
      let kickPos = nextPos.moveLeft();
      if (!kickPos.collides(this.board)) {
        this.falling = kickPos;
      }
      kickPos = nextPos.moveRight();
      if (!kickPos.collides(this.board)) {
        this.falling = kickPos;
      }
    } else {
      this.falling = nextPos;
    }
  }
}