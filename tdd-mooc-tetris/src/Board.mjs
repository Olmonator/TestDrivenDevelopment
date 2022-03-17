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

  // set a boolean that is checked to write X to Board
  drop(newBlock) {
    // check if Block is already falling
    if (this.falling) {
      throw new Error('already falling');
    }
    this.falling = new MovingShape(newBlock, 0, Math.floor((this.width - newBlock.collumns()) / 2));
    //console.log('DROP:\n', this.toString());
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
    this.falling = this.falling.moveRight();
  }

  moveLeft() {
    this.falling = this.falling.moveLeft();
  }
}