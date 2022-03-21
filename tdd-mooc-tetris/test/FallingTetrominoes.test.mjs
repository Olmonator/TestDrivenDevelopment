import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { RotatingPiece } from '../src/RotatingPiece.mjs';

const T_SHAPE = new RotatingPiece(
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
const L_SHAPE = new RotatingPiece(
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
const J_SHAPE = new RotatingPiece(
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
const I_SHAPE = new RotatingPiece(
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
const S_SHAPE = new RotatingPiece(
  [
          "....\n" +
          ".SS.\n" +
          "SS..",
  
          "S...\n" +
          "SS..\n" +
          ".S.."
  ]
);
const Z_SHAPE = new RotatingPiece(
  [
          "....\n" +
          "ZZ..\n" +
          ".ZZ.",
  
          "..Z.\n" +
          ".ZZ.\n" +
          ".Z.."
  ]
);
const O_SHAPE = new RotatingPiece(
  [
          ".OO.\n" +
          ".OO."
  ]
);

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);  
  });

  it("start from the top middle", () => {
    board.drop(T_SHAPE);

    expect(board.toString()).to.equalShape(
      `...TTT....
       ....T.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("stop when they hit the bottom", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...TTT....
       ....T.....`
    );
  });

  it("stop when they land on another block", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...TTT....
       ....T.....
       ...TTT....
       ....T.....`
    );
  });
});
