export class Board {
  width;
  height;

  falling;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.falling = false;
  }

  toString() {
    let boardString = ''
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        if (row === 0 && col === 1 && this.falling) {
          boardString += 'X';
        } else {
          boardString += '.';
        }
      }
      boardString += '\n';
    }
    return boardString;
  }

  drop() {
    this.falling = true;
  }
}