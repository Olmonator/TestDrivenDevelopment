export class Piece {
  grid = [];

  // turns the shape (type String) into a two-dim array
  parseShape(shape) {
    let rows = shape.split("\n");
    //console.log('PIECE_parseShape:\n', rows);
    for (let row = 0; row < rows.length; row++) {
      this.grid[row] = [...rows[row]];
    }
  }

  constructor(shape) {
    //console.log('PIECE_constructor:\n', shape);
    this.parseShape(shape);
    //console.log('PIECE_grid:\n', this.grid);
    //console.log('RP_constructor: [', this.grid.length + '][' + this.collumns() + ']');
  }

  rows() {
    return this.grid.length;
  }

  collumns() {
    return this.grid[0].length;
  }

  isInside(row, col) {
    return row >= 0 && row < this.rows() && col >= 0 && col < this.collumns();
  }

  cellAt(row, col) {
    if (this.isInside(row, col)) {
      return this.grid[row][col];
    }
    else {
      return '.';
    }
  }

  toString() {
    let shapeString = "";
    for (let row = 0; row < this.rows(); row++) {
      for (let col = 0; col < this.collumns(); col++) {
        shapeString += this.cellAt(row, col);
      }
      shapeString += "\n";
    }
    //console.log('PIECE_toString_result:\n', shapeString);
    return shapeString;
  }
}
