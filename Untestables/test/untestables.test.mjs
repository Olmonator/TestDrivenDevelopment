import { expect } from "chai";
import { readClock, readFile, randomNumber, getNumber, everything } from "../src/untestable.mjs";
import { writeFileSync } from "fs";

describe("Filesystem Test", () => {
  it("Read Files", () => {
    let data = "Line1\nLine2";
    writeFileSync("src/testFile.txt", data);
    expect(readFile("src/testFile.txt")).to.equal("Line1\nLine2");
  });
  it("Read Files failes", () => {
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
    //console.log("numbers: ", numbers);
  });
  it("Every Number Test", () => {
    for(let i = 0; i < max; i++) {
      expect(numbers).to.contain(i);
    }
  });
  it("Range Test", () => {
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

describe("all together", () => {
  it("Everything, Everywhere, All at once - Range", () => {
    let date = '2000-01-01T03:24:00';
    writeFileSync("src/testFiles/testFileAll.txt", "10");
    let numbers = [];
    for (let i = 0; i < 100; i++) {
      numbers.push(everything("src/testFiles/testFileAll.txt", date));
    }
    numbers.forEach(number => {
      expect(number).to.be.at.least(1);
      expect(number).to.be.at.most(10);
    });
  });
  it("Everything, Everywhere, All at once - Instances", () => {
    let date = '2000-01-01T03:24:00';
    writeFileSync("src/testFiles/testFileAll.txt", "10");
    let numbers = new Set();
    for (let i = 0; i < 100; i++) {
      numbers.add(everything("src/testFiles/testFileAll.txt", date));
    }
    console.log(numbers);
    for(let i = 1; i < 11; i ++) {
      expect(numbers).to.contain(i);
    }
  });
  it("Failure, max is no Int", () => {
    writeFileSync("src/testFiles/testFileAll.txt", "maximum");
    expect(everything("src/testFiles/testFileAll.txt")).to.equal("Error");
  });
});