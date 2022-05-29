import { expect } from "chai";
import { readFile, readRLE, arrToString, iterate } from "../src/gameOfLife.mjs";

describe("Read RLE Files", () => {
  it("Read Files", () => {
    expect(readFile("src/testFiles/testFile.txt")).to.equal("Line1\nLine2");
  });

  it("Read Blinker", () => {
    expect(readFile("src/testFiles/blinker.rle")).to.equal("#N Blinker\n#O John Conway\n#C A period 2 oscillator that is the smallest and most common oscillator.\n#C www.conwaylife.com/wiki/index.php?title=Blinker\nx = 3, y = 1, rule = B3/S23\n3o!");
  });

  it("Read Block", () => {
    expect(readFile("src/testFiles/block.rle")).to.equal("#N Block\n#C An extremely common 4-cell still life.\n#C www.conwaylife.com/wiki/index.php?title=Block\nx = 2, y = 2, rule = B3/S23\n2o$2o!");
  });

  it("Read Glider", () => {
    expect(readFile("src/testFiles/glider.rle")).to.equal("#N Glider\n#O Richard K. Guy\n#C The smallest, most common, and first discovered spaceship. Diagonal, has period 4 and speed c/4.\n#C www.conwaylife.com/wiki/index.php?title=Glider\nx = 3, y = 3, rule = B3/S23\nbob$2bo$3o!");
  });

  describe("Read RLE format" , () => {
    it("Read Blinker", () => {
      expect(arrToString(readRLE("src/testFiles/blinker.rle"))).to.equal("ooo");
    });
    it("Read Block", () => {
      expect(arrToString(readRLE("src/testFiles/block.rle"))).to.equal("oo\noo\n");
    });
    it("Read Glider", () => {
      expect(arrToString(readRLE("src/testFiles/glider.rle"))).to.equal("bob\nbbo\nooo\n");
    });
  });
});

describe("Game Logic", () => {
  describe("Blinker", ()  => {
    it("1 iteration", () => {
      expect(arrToString(iterate("src/testFiles/blinker.rle", 1))).to.equal("bbbbb\nbbobb\nbbobb\nbbobb\nbbbbb\n");
    });
  });
  describe("Block", ()  => {
    it("1 iteration", () => {
      expect(arrToString(iterate("src/testFiles/block.rle", 1))).to.equal("bbbb\nboob\nboob\nbbbb\n");
    });
  });
  describe("Glider", ()  => {
    it("1 iteration", () => {
      expect(arrToString(iterate("src/testFiles/glider.rle", 1))).to.equal("bbbbb\nbbbbb\nbobob\nbboob\nbbobb\n");
    });
  });
});