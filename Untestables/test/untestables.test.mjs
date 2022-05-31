import { expect } from "chai";
import { readClock, readFile, randomNumber, getNumber } from "../src/untestable.mjs";
import { writeFileSync } from "fs";

describe("Filesystem Test", () => {
  xit("Read Files", () => {
    let data = "Line1\nLine2";
    writeFileSync("src/testFile.txt", data);
    expect(readFile("src/testFile.txt")).to.equal("Line1\nLine2");
  });
  xit("Read Files failes", () => {
    let data = "Line1\nLine2";
    writeFileSync("src/testFiles/testFile.txt", data);
    expect(readFile("src/testFiles/testFile1.txt")).to.equal(false);
  });
});

describe("Time Test", () => {
  xit("Read the clock", () => {
    let date = '2000-01-01T03:24:00';
    expect(readClock(date)).to.equal(2);
  });
});

function randomNumbers(max) {
  let numbers = new Set();
    for(let i = 0; i < 100; i++) {
      numbers.add(randomNumber(max));
    }
  return numbers;
}

describe("Randomness Test", () => {
  let max = 10;
  let numbers;
  xit("Uniqueness Test", () => {
    let array;
    let set = new Set();
    let arr = [];
    for(let i = 0; i < 20; i++) {
      array = [];
      for(let j = 0; j < 20; j++) {
        array.push(randomNumber(max));
      }
      set.add(array);
      arr.push(array);
    }
    expect(set.size).to.be.equal(arr.length);
  });
  beforeEach(() => {
    numbers = randomNumbers(max);
    //console.log("numbers: ", numbers);
  });
  xit("Every Number Test", () => {
    for(let i = 0; i < max; i++) {
      expect(numbers).to.contain(i)
    }
  });
  xit("Range Test", () => {
    numbers.forEach(number => {
      expect(number).to.be.at.least(0);
      expect(number).to.be.at.most(9);
    });
  });
});

describe("Globals Test", () => {
  // because global can be changed by time, test only the getNumber() method
  it("get a number", () => {
    expect(getNumber(10)).to.equal(9);
  })
});