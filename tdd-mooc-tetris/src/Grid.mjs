export class Grid {
  board;

  constructor(width, height) {
    this.board = [];

    for (let row = 0; row < height; row++) {
      this.board[row] = []
      for (let col = 0; col < width; col++) {
        this.board[row][col] = '.';
      }
    }
  }

  rows() {
    return this.board.length;
  }

  collumns() {
    return this.board[0].length;
  }

  cellAt(row, col) {
    return this.board[row][col];
  }

  toString() {
    let boardString = '';

    for (let row = 0; row < this.rows(); row ++) {
      for (let col = 0; col < this.collumns(); col ++) {
        boardString += this.cellAt(row, col);
      }
      boardString += '\n';
    }

    //  console.log('GRID_toString:\n', boardString);
    return boardString;
  }

  toArray(string) {
    let arr = []
    let rows = string.split("\n");

    for (let row = 0; row < rows.length; row++) {
      arr[row] = [...rows[row]];
    }

    //console.log('GRID_toArray:\n', arr);
    return arr;
  }

  updateBoard(string) {
    let boardArray = this.toArray(string);

    for (let row = 0; row < this.rows(); row ++) {
      for (let col = 0; col < this.collumns(); col ++) {
        this.board[row][col] = boardArray[row][col];
      }
    }

    //console.log('GRID_updateBoard:\n', this.toString());
    return this;
  }
}