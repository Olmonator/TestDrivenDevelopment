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
    if (row < 0) {
      return '.';
    }
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

  // can be considered safe because of collision detection
  setCell(cell, row, col) {
    this.board[row][col] = cell;
  }

  // collision occurs if both piece and board have a non empty cell
  collides(piece, rowOffset, colOffset) {
    for (let row = 0; row < piece.rows(); row ++) {
      for (let col = 0; col < piece.collumns(); col ++) {
        let cell = piece.cellAt(row, col);
        let boardRow = row + rowOffset;
        let boardCol = col + colOffset;
        if (cell !== '.' && this.cellAt(boardRow, boardCol) !== '.') {
          throw new Error(`Error at position [${boardRow},${boardCol}]: cannot set piece there, collision \n ${this.toString()}`);
        }
      }
    }
    return false;
  }

  // sets a new block (with corerect orientation) on the board
  setBoard(piece, rowOffset, colOffset) {
    if (!this.collides(piece, rowOffset, colOffset)) {
      for (let row = 0; row < piece.rows(); row ++) {
        for (let col = 0; col < piece.collumns(); col ++) {
          let cell = piece.cellAt(row, col);
          let boardRow = row + rowOffset;
          let boardCol = col + colOffset;
          
          // only override when not an emtpy cell 
          if (cell !== '.') {
            this.setCell(cell, boardRow, boardCol);
          }
        }
      }
    }
      
    return this;
  }

  clearLine(row) {
    for (let boardRow = row; boardRow >= 0; boardRow --) {
      for (let col = 0; col < this.collumns(); col ++) {
        if (boardRow > 0) {
          this.setCell(this.cellAt(boardRow -1, col), boardRow, col);
        } else {
          this.setCell('.', boardRow, col);
        } 
      }
    }
  }
}