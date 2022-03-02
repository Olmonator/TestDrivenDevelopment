export class Board {
  width;
  height;

  board;
  stillFalling;


  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.toBoard();
    this.stillFalling = false;
  }

  toBoard() {
    if (!this.width || !this.height) {
      console.log('height or width not specified')
      return null
    }
    if (this.width === 0 || this.height === 0) {
      console.log('height and width must be more than 0')
      return null;
    }
    let board = new Array(this.height)
    for (let i = 0; i < this.height; i++) {
      board[i] = new Array (this.width)
      for (let j = 0; j < this.width; j++) {
        board[i][j] = '.'
      }
    }
    return board;    
  }

  toString() {
    let boardString = ''
    for (let h = 0; h < this.height; h++ ) {
      for (let w = 0; w < this.width; w++) {
        boardString = boardString.concat(this.board[h][w]);
      }
      boardString = boardString.concat('\n');
    }
    return boardString;
  }

  hasFalling() {
    if (this.stillFalling) {
      this.stillFalling = false;
      return true;
    }
    for (let h = this.height -1; h >= 0; h--) {
      for (let w = 0; w < this.width; w++) {
        if (this.board[h][w] !== '.' && ((h+1) < this.height && this.board[(h + 1)][w] === '.')) {
          if ((h+1) === this.height || this.board[(h + 1)][w] !== '.') {
            
            this.stillFalling = true
          }
          return true
        }
      }
    }
    return false
  }

  drop(block) {
    if (this.hasFalling()) {
      throw "already falling";
    } else {
       // todo: floor
      const halfWidth = (this.width -1) / 2;
      this.board[0][halfWidth] = block.color; 
    }
  }

  tick() {
    for (let h = this.height -1; h >= 0; h--) {
      for (let w = 0; w < this.width; w++) {
        if (this.board[h][w] !== '.' && ((h+1) < this.height) && this.board[(h + 1)][w] === '.') {
          console.log(this.board)
          this.board[(h + 1)][w] = this.board[h][w];
          this.board[h][w] = '.';
          console.log(this.board)
        }
      }
    }
  }
}
