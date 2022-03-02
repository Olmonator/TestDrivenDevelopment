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
          boardString += '.';
      }
      boardString += '\n';
    }
    return boardString;
  }
}