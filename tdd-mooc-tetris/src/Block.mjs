import { Shape } from "./Shape.mjs";

export class Block {
  shape;

  rowOffset; // increases with each moveDown()
  colOffset; // static without movement, fixed to middle of the board at beginning

  constructor(shape) {
    this.shape = new Shape(shape, 0, 1);
    //console.log('BLOCK_constructor: ', this.shape);
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

  cellAt(row, col) {
    return this.shape.cellAt(row, col);
  }

  moveDown() {
    return this.shape.moveDown();
  }

  collides(staticBoard) {
    return this.shape.collides(staticBoard);
  }
}