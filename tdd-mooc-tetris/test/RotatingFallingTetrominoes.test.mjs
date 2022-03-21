import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { RotatingPiece } from "../src/RotatingPiece.mjs";

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

const T_SHAPE_2 = new RotatingPiece(
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
  ], 2
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

describe("it rotates clockwise while moving", () => {
  let board;
  beforeEach(() => {
    board = new Board(7, 5);
    board.drop(T_SHAPE);
  });

  it("it rotates to right once", () => {
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `..TT...
       ...T...
       .......
       .......
       .......`
    );
  });

  it("it rotates to right twice", () => {
    board.rotateRight();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `...T...
       ..TTT..
       .......
       .......
       .......`
    );
  });

  it("it rotates to right three times", () => {
    board.rotateRight();
    board.rotateRight();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `...TT..
       ...T...
       .......
       .......
       .......`
    );
  });

  it("it rotates to right four times", () => {
    board.rotateRight();
    board.rotateRight();
    board.rotateRight();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `..TTT..
       ...T...
       .......
       .......
       .......`
    );
  });
});

describe("it rotates anti-clockwise while moving", () => {
  let board;
  beforeEach(() => {
    board = new Board(7, 5);
    board.drop(T_SHAPE_2);
  });

  it("it starts from the top middle", () => {
    expect(board.toString()).to.equalShape(
      `...T...
       ..TTT..
       .......
       .......
       .......`
    );
  });

  it("it rotates left once", () => {
    board.tick();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `...T...
       ..TT...
       ...T...
       .......
       .......`
    );
  });  

  it("it rotates to left twice", () => {
    board.rotateLeft();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `..TTT..
       ...T...
       .......
       .......
       .......`
    );
  });

  it("it rotates left three times", () => {
    board.tick();
    board.rotateLeft();
    board.rotateLeft();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `...T...
       ...TT..
       ...T...
       .......
       .......`
    );
  });

  it("it rotates to left four times", () => {
    board.rotateLeft();
    board.rotateLeft();
    board.rotateLeft();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `...T...
       ..TTT..
       .......
       .......
       .......`
    );
  });
});

describe("collides with walls when rotating", () => {
  let board;
  beforeEach(() => {
    board = new Board(7, 5);
    board.drop(T_SHAPE);
  });

  it("it collides with right wall, when rotating into it, wall kick", () => {
    board.rotateLeft();
    moveToRight(board);
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `.....T.
       ....TTT
       .......
       .......
       .......`
    );
  });

  it("it collides with left wall, when rotating into it, no wall kick", () => {
    board.rotateRight();
    board.moveRight();
    fall(board);

    board.drop(T_SHAPE);
    board.moveRight();
    board.moveRight();
    board.rotateRight();
    board.moveRight();
    board.moveDown();
    board.moveDown();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `.......
       ......T
       ....TTT
       ...TT.T
       ....T..`
    );
  });

  it("it collides with left wall, when rotating into it, wall kick", () => {
    board.rotateRight();
    moveToLeft(board);
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `.T.....
       TTT....
       .......
       .......
       .......`
    );
  });

  it("it collides with left wall, when rotating into it, no wall kick", () => {
    board.rotateLeft();
    board.moveLeft();
    fall(board);

    board.drop(T_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.rotateLeft();
    board.moveLeft();
    board.moveDown();
    board.moveDown();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `.......
       T......
       TTT....
       T.TT...
       ..T....`
    );
  });
});

describe("collision with only I shape", () => {
  let board;
  beforeEach(() => {
    board = new Board(7, 5);
    board.drop(I_SHAPE);
  });

  it("it starts in the middle", () => {
    expect(board.toString()).to.equalShape(
      `..IIII.
       .......
       .......
       .......
       .......`
    );
  });

  it("it collides with floor, when rotating into it", () => {
    fallToBottom(board);
    board.moveDown();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `.......
       .......
       .......
       .......
       ..IIII.`
    );
  });

  // todo: no wall kicking for I shape
});

describe("collision with other Tetrominoes when rotating", () => {
  let board;
  beforeEach(() => {
    board = new Board(7, 5);
    board.setBlock(T_SHAPE, 2, 2, 2);
  });

  it("it collides with T_Shape from the top, wall kick", () => {
    board.drop(T_SHAPE);
    board.tick();
    board.moveRight();
    board.tick();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `.......
       ....T.. 
       ...TT.. 
       ...TT..
       ..TTT..`
    );
  });

  it("it collides with T_Shape from the top, no wall kick", () => {
    board.setBlock(T_SHAPE, 2, 1, 0);
    board.setBlock(T_SHAPE, 2, 1, 4);
    
    board.drop(T_SHAPE);
    board.rotateLeft();
    board.moveRight();
    board.tick();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `.......
       ...T...
       .TTTTT. 
       TTTTTTT
       ..TTT..`
    );
  });

  it("it fits with T_Shape from the top", () => {
    board.drop(T_SHAPE);
    board.rotateLeft();
    board.moveLeft();
    fall(board);
    expect(board.toString()).to.equalShape(
      `.......
       ..T....
       ..TT...
       ..TT...
       ..TTT..`
    );
  });
});