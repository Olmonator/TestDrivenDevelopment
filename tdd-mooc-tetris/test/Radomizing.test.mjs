import { expect } from "chai";

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

const shapeArray = [T_SHAPE, L_SHAPE, J_SHAPE, I_SHAPE, S_SHAPE, Z_SHAPE, O_SHAPE];

let nOfShapes = 7;

function createArray(length) {
  let arr = [];
  for (let i = 0; i < length; i++) {
    arr[i] = i;
  }
  return arr;
}

function createboolArray(length) {
  let arr = [];

  for (let i = 0; i < length; i ++) {
    let collumns = [];
    for (let j = 0; j < length; j ++) {
      collumns[j] = false;
    }
    arr[i] = collumns;
  }
  return arr;
}

function randomPermutation(length) {
  let shuffled = createArray(length);
  for (let ind = 0; ind < length; ind ++) {
    let swapInd = ind + Math.floor(Math.random() * (length - ind));
    let tmp = shuffled[ind];
    shuffled[ind] = shuffled[swapInd];
    shuffled[swapInd] = tmp;
  }
  return shuffled;
}

describe("randomizing number Array", () => {
  it("shuffled array contains all indeces", () => {
    let shuffled = randomPermutation(nOfShapes);
    for (let n = 0; n < nOfShapes; n ++) {
      expect(shuffled).to.contain(n);
    }
  });

  it("after enough tries, every number appears at every index", () => {
    let boolArr = createboolArray(nOfShapes);
    for (let i = 0; i < 50; i++) {
      let shuffled = randomPermutation(nOfShapes);
      //console.log('shuffled', shuffled);
      for (let n = 0; n < nOfShapes; n ++) {
        let ind = shuffled.findIndex(el => el === n);
        //console.log('boolArr[' + n +'][' + ind + '] = ' + boolArr[n][ind]);
        boolArr[n][ind] = true;
        //console.log(n + ' is at ' + shuffled.findIndex(el => el === n) + ' positions: ' + boolArr);
      }
    }
    //console.log(boolArr);
    expect(boolArr.reduce((pre, cur) => pre && cur.reduce((pre, cur) => pre && cur))).to.be.true;
  });

  it("only values from 0 to number of shapes appear", () => {
    let flag = true;
    let shuffled;

    for (let i = 0; i < 50; i++) {
      shuffled = randomPermutation(nOfShapes);
      shuffled.forEach(el => {
        if (el < 0 || el >= nOfShapes) {
          flag = false;
        }
      })
    }

    expect(flag).to.be.true;
  });

  it("every value appears only once", () => {
    let flag = true;
    let shuffled;

    for (let i = 0; i < 50; i++) {
      shuffled = randomPermutation(nOfShapes);
      for (let j = 0; j < shuffled.length; j ++) {
        if (shuffled.filter(el => el === j).length > 1) {
          flag = false;
        }
      }
    }

    expect(flag).to.be.true;
  });

  it("ermutations are different", () => {
    let shuffled = [];

    for (let i = 0; i < 50; i++) {
      shuffled.push(randomPermutation(nOfShapes));
    }

    let shuffledSet = new Set(shuffled);
    let difference = shuffled.length - shuffledSet.size;

    expect(difference).to.equal(0);
  });
});

describe("turning randoms into Tetrominoes", () => {
  let shuffledNumbers = randomPermutation(shapeArray.length);
  let shuffledTetrominoes = shuffledNumbers.map(number => shapeArray[number]);

  console.log(shuffledTetrominoes.map(shape => shape.toString()));

  expect(shapeArray.map(shape => shuffledTetrominoes.includes(shape)).reduce((pre, cur) => pre && cur)).to.be.true;
});