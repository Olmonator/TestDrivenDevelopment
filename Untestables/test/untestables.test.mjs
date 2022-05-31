import { expect } from "chai";
import { readClock, readFile } from "../src/untestable.mjs";
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
  it("Read the clock", () => {
    let date = '2000-01-01T03:24:00';
    expect(readClock(date)).to.equal(2);
  });
})
 