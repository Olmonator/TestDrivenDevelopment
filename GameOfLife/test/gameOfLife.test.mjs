import { expect } from "chai";
import { readFile } from "../src/gameOfLife.mjs";

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
});
