export class Board {
  width;
  height;

  falling = false;
  fallingRow = 0;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    let boardString = ''
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        if (row === this.fallingRow && col === 1 && this.falling) {
          boardString += 'X';
        } else {
          boardString += '.';
        }
      }
      boardString += '\n';
    }
    return boardString;
  }

  // set a boolean that is checked to write X to Board
  drop() {
    // check if Block is already falling
    if (this.falling) {
      throw new Error('already falling');
    }
    this.falling = true;
  }

  // set an int to signal what row the Block is on
  tick() {
    this.fallingRow ++;
  }
}