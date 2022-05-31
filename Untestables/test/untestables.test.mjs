import { expect } from "chai";
import { readFile } from "../src/untestable.mjs";
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
 