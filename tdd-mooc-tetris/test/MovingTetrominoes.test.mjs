import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Moving tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(8, 5);
    board.drop(Tetromino.O_SHAPE);
  });

  // test to check hardcoding of collumn offset
  it("start from the top middle", () => {
    expect(board.toString()).to.equalShape(
      `...OO...
       ...OO...
       ........
       ........
       ........`
    );
  });

  it("it moves right", () => {
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `....OO..
       ....OO..
       ........
       ........
       ........`
    );
  });

  it("it moves left", () => {
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `..OO....
       ..OO....
       ........
       ........
       ........`
    );
  });
});