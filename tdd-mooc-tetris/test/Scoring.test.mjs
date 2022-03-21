import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { RotatingPiece } from '../src/RotatingPiece.mjs';
import { Scoring } from "../src/Scoring.mjs";

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

function dropShape(block, board, times) {
  for (let i = 0; i < times; i++) {
    board.drop(block);
    fallToBottom(board);
  }
}

describe("Scoring and Leveling Up Systems", () => {
  describe("Level 1 - scores", () => {
    let board;
    let scores;
    beforeEach(() => {
      board = new Board(7, 7); 
      scores = new Scoring(0);
      board.addScoring(scores);
  
      board.setBlock(O_SHAPE, 0, 5, 2);
      board.setBlock(O_SHAPE, 0, 5, 4);
      board.setBlock(O_SHAPE, 0, 3, 2);
      board.setBlock(O_SHAPE, 0, 3, 4);
    });
  
    it("it clears one line - score 40", () => {
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
      expect(scores.score).to.equal(40);
    });
  
    it("it clears two lines - score 100", () => {
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
      expect(scores.score).to.equal(100);
    });
  
    it("it clears three lines - score 300", () => {
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
      expect(scores.score).to.equal(300);
    });
  
    it("it clears four lines - score 1200", () => { 
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
      expect(scores.score).to.equal(1200);
    });
  });

  describe("Level 30 - scores", () => {
    let board;
    let scores;
    beforeEach(() => {
      board = new Board(7, 7); 
      scores = new Scoring(30);
      board.addScoring(scores);
  
      board.setBlock(O_SHAPE, 0, 5, 2);
      board.setBlock(O_SHAPE, 0, 5, 4);
      board.setBlock(O_SHAPE, 0, 3, 2);
      board.setBlock(O_SHAPE, 0, 3, 4);
    });
  
    it("it clears one line - score 1240", () => {
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
      expect(scores.score).to.equal(1240);
    });
  
    it("it clears two lines - score 3100", () => {
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
      expect(scores.score).to.equal(3100);
    });
  
    it("it clears three lines - score 9300", () => {
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
      expect(scores.score).to.equal(9300);
    });
  
    it("it clears four lines - score 37200", () => { 
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
      expect(scores.score).to.equal(37200);
    });    
  });

  describe("Leveling Up", () => {
    let board;
    let scores;
    beforeEach(() => {
      board = new Board(4, 7); 
    });

    it("it levels up at starting-level 0 - 10 lineClears", () => {
      scores = new Scoring(0);
      board.addScoring(scores);
      dropShape(I_SHAPE, board, 10);
      expect(scores.level).to.equal(1);
    });

    it("it levels up at starting-level 5 - 60 lineClears", () => {
      scores = new Scoring(5);
      board.addScoring(scores);
      dropShape(I_SHAPE, board, 60);
      expect(scores.level).to.equal(6);
    });

    it("it levels up after 10 more linesClears", () => {
      scores = new Scoring(0);
      board.addScoring(scores);
      dropShape(I_SHAPE, board, 20);
      expect(scores.level).to.equal(2);
    });
  });
}); 