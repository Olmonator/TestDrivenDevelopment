import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  static T_SHAPE = new Tetromino(4,
    ".T.\n" +
    "TTT\n" +
    "..."
  )

  static I_SHAPE = new Tetromino(2,
    ".....\n" +
    ".....\n" +
    "IIII.\n" +
    ".....\n" +
    "..... "
  )

  static O_SHAPE = new Tetromino(1,
    ".OO\n" +
    ".OO\n" +
    "..."
  )

  orientations = [];
  currentOrientation = 0;

  
  constructor(arg1, arg2) {
    if (typeof(arg2) === 'string') {
      let shape = new RotatingShape(arg2, 0 , 2);
      this.orientations = [];
      for (let index = 0; index < arg1; index ++) {
        this.orientations[index] = shape;
        shape = shape.rotateRight();
      }
    } else {
      this.orientations = arg2;
      this.currentOrientation = (arg1 + this.orientations.length) % this.orientations.length;
    }
  }

  toString() {
    return this.orientations[this.currentOrientation].toString();
  }

  rotateRight() {
    return new Tetromino(this.currentOrientation +1, this.orientations);
  }

  rotateLeft() {
    return new Tetromino(this.currentOrientation -1, this.orientations);
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

  moveDown() {
    return this.orientations[this.currentOrientation].moveDown();
  }

  collides(string) {
    return this.orientations[this.currentOrientation].collides(string);
  }
}