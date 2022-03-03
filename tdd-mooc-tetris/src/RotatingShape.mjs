export class RotatingShape {
  shape = [];

  constructor(shapeString) {
    if (typeof(shapeString) === 'string') {
      let formattedString = this.formatString(shapeString);
      this.toArray(formattedString);
    } else {
      this.shape = shapeString;
    }
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
    return new RotatingShape(rotatedShape);
  }
}