import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function moveToRight(board) {
  for (let i = 0; i < 5; i++) {
    board.moveRight();
  }
}

function moveToLeft(board) {
  for (let i = 0; i < 5; i++) {
    board.moveLeft();
  }
}

function fallToBottom(board) {
  for (let i = 0; i < 3; i++) {
    board.tick();
  }
}

function fall(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

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

  it("it moves to the right", () => {
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `....OO..
       ....OO..
       ........
       ........
       ........`
    );
  });

  it("it moves to the left", () => {
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `..OO....
       ..OO....
       ........
       ........
       ........`
    );
  });

  it("it doesn't leave right border", () => {
    moveToRight(board);

    expect(board.toString()).to.equalShape(
      `......OO
       ......OO
       ........
       ........
       ........`
    );
  });

  it("it doesn't leave left border", () => {
    moveToLeft(board);
    
    expect(board.toString()).to.equalShape(
      `OO......
       OO......
       ........
       ........
       ........`
    );
  });
});
describe("when it hits the bottom", () => {
  let board;
  beforeEach(() => {
    board = new Board(8, 5);
    board.drop(Tetromino.O_SHAPE);
    fallToBottom(board);
    board.moveLeft();
  });

  it("it is still moving on the last row", () => {
    expect(board.toString()).to.equalShape(
      `........
       ........
       ........
       ..OO....
       ..OO....`
    );
    expect(
      board.hasFalling(),
      "the player should still be able to move the block"
    ).to.be.true;
  });

  it("it stops when it hits the bottom", () => {
    board.moveDown();

    expect(board.toString()).to.equalShape(
      `........
       ........
       ........
       ..OO....
       ..OO....`
    );
    expect(board.hasFalling(), "the block should stop moving").to.be.false;
  });
});

describe("Collision after moving", () => {
  let board;
  beforeEach(() => {
    board = new Board(8, 5);
    board.drop(Tetromino.O_SHAPE);
    board.moveLeft();
    board.moveLeft();
  });

  it("it stops at bottom after moving", () => {
    fall(board);

    expect(board.toString()).to.equalShape(
      `........
       ........
       ........
       .OO.....
       .OO.....`
    );
  });

  it("it stops on block after moving", () => {
    fall(board);
    board.drop(Tetromino.O_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.moveDown();
    board.moveDown();

    expect(board.toString()).to.equalShape(
      `........
       .OO.....
       .OO.....
       .OO.....
       .OO.....`
    );
  });

  it("it stops on half a block", () => {
    fall(board);
    board.drop(Tetromino.O_SHAPE);
    board.moveLeft();
    fall(board);

    expect(board.toString()).to.equalShape(
      `........
       ..OO....
       ..OO....
       .OO.....
       .OO.....`
    );
  });
});

describe("collision when moving between tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(8, 5);
    board.drop(Tetromino.O_SHAPE);  
  });

  it('it collides with a tetronimo to the left', () => {
    board.moveLeft();
    board.moveLeft();
    fall(board);  
    board.drop(Tetromino.O_SHAPE);
    board.moveLeft();
    board.moveLeft();
    fall(board);
    board.drop(Tetromino.O_SHAPE);
    board.tick();
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `........
       .OOOO...
       .OOOO...
       .OO.....
       .OO.....`
    );
  });

  it('it collides with a tetronimo to the right', () => {
    board.moveRight();
    board.moveRight();
    fall(board);  
    board.drop(Tetromino.O_SHAPE);
    board.moveRight();
    board.moveRight();
    fall(board);
    board.drop(Tetromino.O_SHAPE);
    board.tick();
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `........
       ...OOOO.
       ...OOOO.
       .....OO.
       .....OO.`
    );
  });
});