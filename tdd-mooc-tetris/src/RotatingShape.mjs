export class RotatingShape {
  shape = [];
  rowOffset;
  colOffset;

  constructor(shapeString, row, col) {
    if (typeof(shapeString) === 'string') {
      let formattedString = this.formatString(shapeString);
      this.toArray(formattedString);
    } else {
      this.shape = shapeString;
    }
    this.rowOffset = row;
    this.colOffset = col;
  }

  formatString(shapeString) {
    return shapeString.replace(/ /g, '');
  }

  toString() {
    let shapeString = "";
    for (let row = 0; row < this.shape.length; row++) {
      for (let col = 0; col < this.shape[0].length; col++) {
        shapeString += this.shape[row][col];
      }
      shapeString += "\n";
    }
    return shapeString;
  }

  toArray(shapeString) {
    let rows = shapeString.split("\n");

    for (let row = 0; row < rows.length; row++) {
      this.shape[row] = [...rows[row]];
    }
  }

  createArray(rows) {
    let arr = []
    for (let row = 0; row < rows; row++) {
      arr[row] = [];
    }
    return arr;
  }

  rotateRight() {
    // attempt number one
    // this.shape = this.shape[0].map((val, index) => this.shape.map(row => row[index]).reverse());

    // attempt number three
    let rotatedShape = this.createArray(this.shape.length);
    
    for (let row = 0; row < this.shape.length; row++) {
      for (let col = 0; col < this.shape[0].length; col++) {
        rotatedShape[col][(this.shape.length -1) - row] = this.shape[row][col];
      }
    }
    return new RotatingShape(rotatedShape);
  }

  rotateLeft() {
    // attempt number two
    let rotatedShape = this.shape;
    var n=rotatedShape.length;
    
    for (var i=0; i<n/2; i++) {
      for (var j=i; j<n-i-1; j++) {
          var tmp=this.shape[i][j];
          rotatedShape[i][j]=this.shape[j][n-i-1];
          rotatedShape[j][n-i-1]=this.shape[n-i-1][n-j-1];
          rotatedShape[n-i-1][n-j-1]=this.shape[n-j-1][i];
          rotatedShape[n-j-1][i]=tmp;
      }
    }
    // possible 3 times right rotating
    return new RotatingShape(rotatedShape);
  }

  rows() {
    return this.shape.length;
  }

  collumns() {
    return this.shape.length;
  }

  /**
   * 
   * @param {*} row 
   * @param {*} col 
   * @returns the char of the shape at the given position defined by row and collumn parameters
   */
  cellAt(row, col) {
    //console.log('RS:', this.rowOffset);

    if (row >= 0 && row < this.rows() && col >= 0 &&  col < this.collumns()) {
      //console.log('cell: ', this.shape[innerRow][innerCol]);
      return this.shape[row][col];
    }
    return '.';
  }

  isInside(grid, row, col) {
    return row >= 0 && row < grid.rows() && col >= 0 && col < grid.collumns();
  }

  collides(staticBoard) {
    for (let rowShape = 0; rowShape < this.rows(); rowShape ++) {
      for (let colShape = 0; colShape < this.collumns(); colShape ++) {
        // shape has EMPTY field here, no collision can occur
        if (this.shape[rowShape][colShape] === '.') {
          continue;
        }
        // shape has a defined field here, check for collision
        let rowBoard = rowShape + this.rowOffset;
        let colBoard = colShape + this.colOffset;
        
        //console.log('RS_collides: [' + rowBoard + '][' + colBoard + '] ' + staticBoard.rows());
        if (!this.isInside(staticBoard, rowBoard, colBoard) || staticBoard.cellAt(rowBoard, colBoard) !== '.') {
          return true;
        }
      }
    }
    return false;
  }

  moveDown() {
    return new RotatingShape(this.shape, this.rowOffset +1, this.colOffset);
  }
}