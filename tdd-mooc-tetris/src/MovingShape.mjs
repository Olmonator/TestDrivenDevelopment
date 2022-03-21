export class MovingShape {
  shape;

  rowOffset; // increases with each moveDown()
  colOffset; // static without movement, fixed to middle of the board at beginning

  constructor(shape, rowOffset, colOffset) {
    this.shape = shape
    this.rowOffset = rowOffset;
    this.colOffset = colOffset;

  }

  toString() {
    return this.shape.toString();
  }

  rows() {
    return this.shape.rows();
  }

  collumns() {
    return this.shape.collumns();
  }

  moveDown() {
    return new MovingShape(this.shape, this.rowOffset +1, this.colOffset);
  }

  moveRight() {
    return new MovingShape(this.shape, this.rowOffset, this.colOffset +1);
  }

  moveLeft() {
    return new MovingShape(this.shape, this.rowOffset, this.colOffset -1);
  }

  rotateRight() {
    return new MovingShape(this.shape.rotateRight(), this.rowOffset, this.colOffset);
  }

  rotateLeft() {
    return new MovingShape(this.shape.rotateLeft(), this.rowOffset, this.colOffset);
  }

  isInside(grid, row, col) {
    return row >= -1 && row < grid.rows() && col >= 0 && col < grid.collumns();
  }

  collides(staticBoard) {
    //console.log('MSHAPE_collides:\n', this.shape);
    for (let rowShape = 0; rowShape < this.rows(); rowShape ++) {
      for (let colShape = 0; colShape < this.collumns(); colShape ++) {
        // shape has EMPTY field here, no collision can occur
        if (this.shape.cellAt(rowShape, colShape) === '.') {
          continue;
        }
        // shape has a defined field here, check for collision
        let rowBoard = rowShape + this.rowOffset;
        let colBoard = colShape + this.colOffset;
        
        //console.log('MSHAPE_collides: [' + rowBoard + '][' + colBoard + '] ' + staticBoard.rows());
        if (!this.isInside(staticBoard, rowBoard, colBoard) || staticBoard.cellAt(rowBoard, colBoard) !== '.') {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * 
   * @param {*} row 
   * @param {*} col 
   * @returns the char of the shape at the given position defined by row and collumn parameters
   */
   cellAt(row, col) {
    let innerRow = row - this.rowOffset;
    let innerCol = col - this.colOffset;
    
    if (innerRow >= 0 && innerRow < this.rows() && innerCol >= 0 &&  innerCol < this.collumns()) {
      //console.log('iRow: ' + innerRow + ' iCol:' + innerCol + ' cell: ', this.shape.cellAt(innerRow, innerCol));
      return this.shape.cellAt(innerRow, innerCol); 
    } 
    return '.';
  }
}
