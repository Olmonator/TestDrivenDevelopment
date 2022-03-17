export class Shape {
  shape;

  rowOffset; // increases with each moveDown()
  colOffset; // static without movement, fixed to middle of the board at beginning

  constructor(shape, rowOffset, colOffset) {
    this.shape = shape;
    this.rowOffset = rowOffset;
    this.colOffset = colOffset;
  }

  toString() {
    return this.shape;     
  }

  rows() {
    return 1;
  }

  collumns() {
    return 1;
  }

  cellAt(row, col) {
    if (row >= 0 && row < this.rows() && col >= 0 &&  col < this.collumns()) {
      return this.shape;
    }
    return '.';
  }

  moveDown() {
    return new Shape(this.shape, this.rowOffset +1, this.colOffset);
  }

  isInside(grid, row, col) {
    return row >= 0 && row < grid.rows() && col >= 0 && col < grid.collumns();
  }

  collides(staticBoard) {
    // shape only has 1 field
    let boardRow = this.rowOffset;
    let boardCol = this.colOffset;
    
    //console.log('Shape_collides: [' + boardRow + '][' + boardCol + '] ' + staticBoard.rows());
    if (!this.isInside(staticBoard, boardRow, boardCol) || staticBoard.cellAt(boardRow, boardCol) !== '.') {
      return true;
    }
    return false;
  }
}
