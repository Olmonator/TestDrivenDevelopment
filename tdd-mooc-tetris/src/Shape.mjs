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
} 