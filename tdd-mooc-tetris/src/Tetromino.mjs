import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  static T_SHAPE = new Tetromino(
    ".T.\n" +
    "TTT\n" +
    "..."
  )

  shape = [];
  
  constructor(shapeString) {
    this.shape = new RotatingShape(shapeString);
  }

  toString() {
    return this.shape.toString()
  }
}