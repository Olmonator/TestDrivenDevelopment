import { expect } from "chai";
import { readClock, readFile, randomNumber } from "../src/untestable.mjs";
import { writeFileSync } from "fs";
import exp from "constants";

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
  it("Read the clock", () => {
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
  it("Uniqueness Test", () => {
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
  });
  it("Every Number Test", () => {
    
    //console.log("numbers: ", numbers);
    for(let i = 0; i < max; i++) {
      expect(numbers).to.contain(i)
    }
  });
  it("Range Test", () => {
    numbers.forEach(number => {
      expect(number).to.be.at.least(0);
      expect(number).to.be.at.most(9);
    });
  });
});
 