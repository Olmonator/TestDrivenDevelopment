import { expect } from "chai";
import { Board } from "../src/Board.mjs";
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

const O_SHAPE = new RotatingPiece(
  [
          ".OO.\n" +
          ".OO."
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

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Line Clearing", () => {
  let board;
  beforeEach(() => {
    board = new Board(7, 7); 
    board.setBlock(O_SHAPE, 0, 5, 2);
    board.setBlock(O_SHAPE, 0, 5, 4);
    board.setBlock(O_SHAPE, 0, 3, 2);
    board.setBlock(O_SHAPE, 0, 3, 4);
  });

  it("it sets the board correctly", () => {  
    expect(board.toString()).to.equalShape(
      `.......
       .......
       .......
       ...OOOO
       ...OOOO
       ...OOOO
       ...OOOO`
    );
  });

  it("it clears one line", () => {
    board.drop(T_SHAPE);
    board.moveLeft();
    board.moveLeft();
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `.......
       .......
       .......
       .......
       ...OOOO
       ...OOOO
       .T.OOOO`
    );
  });

  it("it clears two lines", () => {
    board.setBlock(O_SHAPE, 0, 5, 0);

    board.drop(I_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.rotateLeft();
    board.moveLeft();
    board.moveLeft();
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `.......
       .......
       .......
       .......
       .......
       I..OOOO
       I..OOOO`
    );
  });

  it("it clears three lines", () => {
    board.setBlock(L_SHAPE, 3, 4, -1);
    board.setBlock(I_SHAPE, 1, 2, -1);

    board.drop(I_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.rotateLeft();
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `.......
       .......
       .......
       .......
       .......
       .I.....
       .IIOOOO`
    );
  });

  it("it clears four lines", () => {
    board.setBlock(I_SHAPE, 1, 3, -2);
    board.setBlock(I_SHAPE, 1, 3, -1);
           
    board.drop(I_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.rotateLeft();
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `.......
       .......
       .......
       .......
       .......
       .......
       .......`
    );
  });
});