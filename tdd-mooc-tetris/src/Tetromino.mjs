import { Piece } from "./Piece.mjs";
import { RotatingShape } from "./RotatingShape.mjs";
import { RotatingPiece } from "./RotatingPiece.mjs";

export class Tetromino {
  static T_SHAPE = new RotatingPiece(
    [
            "....\n" +
            "TTT.\n" +
            ".T..",

            ".T..\n" +
            "TT..\n" +
            ".T..",

            "....\n" +
            ".T..\n" +
            "TTT.",
  
            ".T..\n" +
            ".TT.\n" +
            ".T.."
    ]
  );
  	static L_SHAPE = new RotatingPiece(
      [
            "....\n" +
            "LLL.\n" +
            "L...",
    
            "LL..\n" +
            ".L..\n" +
            ".L..",
    
            "....\n" +
            "..L.\n" +
            "LLL.",
    
            ".L..\n" +
            ".L..\n" +
            ".LL."
    ]
  );
  static J_SHAPE = new RotatingPiece(
    [
            "....\n" +
            "JJJ.\n" +
            "..J.",
    
            ".J..\n" +
            ".J..\n" +
            "JJ..",
    
            "....\n" +
            "J...\n" +
            "JJJ.",
    
            ".JJ.\n" +
            ".J..\n" +
            ".J.."
    ]
  );
  static I_SHAPE = new RotatingPiece(
    [
            "....\n" +
            "IIII\n" +
            "....\n" +
            "....",
    
            "..I.\n" +
            "..I.\n" +
            "..I.\n" +
            "..I."
    ]
  );
  static S_SHAPE = new RotatingPiece(
    [
            "....\n" +
            ".SS.\n" +
            "SS..",
    
            "S...\n" +
            "SS..\n" +
            ".S.."
    ]
  );
  static Z_SHAPE = new RotatingPiece(
    [
            "....\n" +
            "ZZ..\n" +
            ".ZZ.",
    
            "..Z.\n" +
            ".ZZ.\n" +
            ".Z.."
    ]
  );
  static O_SHAPE = new RotatingPiece(
    [
            ".OO.\n" +
            ".OO."
    ]
  );
/*
  static T_SHAPE = new Piece([
    ".T..\n" +
    "TTT.\n" +
    "....\n" +
    "....",
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
      let shape = new RotatingShape(arg2);
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
  */
}