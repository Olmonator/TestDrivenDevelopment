import { Piece } from "./Piece.mjs";

export class RotatingPiece {
  orientations = [];
  currentOrientation;

  constructor(shapes, orientation) {
      shapes.forEach(shape => {
        // if string build new piece  => (drop)
        // if not => (rotation)
        if(typeof(shape) === 'string') {
          this.orientations = this.orientations.concat(new Piece(shape));
        } else {
          this.orientations = this.orientations.concat(shape);
        }
      });

      // if 
      if (orientation >= -1 && orientation <= this.orientations.length) {
        this.currentOrientation = ( orientation + this.orientations.length ) % this.orientations.length;
      } else {
        this.currentOrientation = 0;
      }
  }

  rotateRight() {
    return new RotatingPiece(this.orientations, this.currentOrientation + 1);
  }

  rotateLeft() {
    //console.log('RPIECE: or' + (this.currentOrientation - 1) + ' length: ' + this.orientations.length + '\n result:' + (this.currentOrientation - 1 + this.orientations.length ) % this.orientations.length + '\n' + this.orientations[(this.currentOrientation - 1 + this.orientations.length ) % this.orientations.length]);
    return new RotatingPiece(this.orientations, this.currentOrientation - 1);
  }

  rows() {
    return this.orientations[this.currentOrientation].rows();
  }

  collumns() {
    return this.orientations[this.currentOrientation].collumns();
  }

  cellAt(row, col) {
    return this.orientations[this.currentOrientation].cellAt(row, col);
  }

  toString() {
    return  this.orientations[this.currentOrientation].toString();
  }

  setOrientation(orientation) {
    this.currentOrientation = orientation;
  }

  getOrientation(orientation) {
    return this.orientations[orientation];  
  }
}