import { Block } from "./Block.mjs";

export class Board {
  width;
  height;

  falling = null;
  fallingRow = 0;

  board;

  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.board = [];

    for (let row = 0; row < this.height; row++) {
      this.board[row] = []
      for (let col = 0; col < this.width; col++) {
        this.board[row][col] = '.';
      }
    }
  }

  toString() {
    let boardString = ''
    for (let row = 0; row < this.height; row++) { 
      for (let col = 0; col < this.width; col++) {
        if (row === this.fallingRow && col === 1 && this.hasFalling()) {
          boardString += this.falling.getColor();
        } else {
          boardString += this.board[row][col];
        }
      }
      boardString += '\n';
    }
    return boardString;
  }

  // set a boolean that is checked to write X to Board
  drop(newBlock) {
    // check if Block is already falling
    if (this.falling) {
      throw new Error('already falling');
    }
    this.falling = newBlock;
    //console.log('DROP:\n', this.toString());
  }

  hasFalling() {
    return this.falling !== null;
  }

  checkBoundaries() {
    //console.log(this.board[this.fallingRow][1]);
    if (this.fallingRow === this.height -1 || this.board[this.fallingRow][1] !== '.') {
      return true;
    } else {
      return false;
    }
  }

  // set an int to signal what row the Block is on
  tick() {
    //console.log('BEFORE:\n', this.toString());
    // check if Block has reached bottom (height -1)
    if (this.checkBoundaries()) {
      this.board[this.fallingRow][1] = this.falling.getColor();
      this.falling = null;
      this.fallingRow = 0;
    } else if(this.falling) {
      this.fallingRow ++;
    }
    //console.log('AFTER:\n', this.toString());
  }
}