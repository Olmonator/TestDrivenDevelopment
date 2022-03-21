import { expect } from "chai";
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

function distinctOrientations(shape) {
  const distinct = new Set();
  let goingRight = shape;
  let goingLeft = shape;
  for (let i = 0; i < 10; i++) {
    distinct.add(goingRight.toString());
    goingRight = goingRight.rotateRight();
    distinct.add(goingLeft.toString());
    goingLeft = goingLeft.rotateLeft();
  }
  return distinct;
}

describe("The T shape", () => {
  const shape = T_SHAPE;
  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       TTT.
       .T..`
    );
  });

  it("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.T..
       TT..
       .T..`
    );
  });
 
  it("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.T..
       .TT.
       .T..`
    );
  });

  it("has 4 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(4);
  });
});


describe("The I shape", () => {
  const shape = I_SHAPE;

  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       IIII
       ....
       ....`
    );
  });

  it("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `..I.
       ..I.
       ..I.
       ..I.`
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `..I.
       ..I.
       ..I.
       ..I.`
    );
  });

  it("has 2 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(2);
  });
});



describe("The O shape", () => {
  const shape = O_SHAPE;

  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `.OO.
       .OO.`
    );
  });

  it("cannot be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.OO.
       .OO.`
    );
  });

  it("cannot be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.OO.
       .OO.`
    );
  });

  it("has 1 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(1);
  });
});


// todo: new shapes