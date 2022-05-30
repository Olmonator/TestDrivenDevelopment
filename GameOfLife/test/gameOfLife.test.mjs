import { expect } from "chai";
import { readFile, readRLE, arrToString, iterate, arrayToRLE, handleCommandLine } from "../src/gameOfLife.mjs";

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
  describe("Blinker", () => {
    it("One Iteration", () => {
      expect(arrToString(iterate("src/testFiles/blinker.rle", 1))).to.equal("bbbbb\nbbobb\nbbobb\nbbobb\nbbbbb\n");
    });
    it("Two Iterations", () => {
      expect(arrToString(iterate("src/testFiles/blinker.rle", 2))).to.equal("bbbbb\nbbbbb\nbooob\nbbbbb\nbbbbb\n");
    });
  });
  describe("Block", () => {
    it("One Iteration", () => {
      expect(arrToString(iterate("src/testFiles/block.rle", 1))).to.equal("bbbb\nboob\nboob\nbbbb\n");
    });
  });
  describe("Glider", () => {
    it("One Iteration", () => {
      // because the glider moves, need to extend the matrix
      // bbo  bbbbb         bbbbb
      // obo  bbbob iterate bbbbb
      // boo  bobob         bobob
      //      bboob         bboob
      //      bbbbb         bbobb
      expect(arrToString(iterate("src/testFiles/glider.rle", 1))).to.equal("bbbbb\nbbbbb\nbobob\nbboob\nbbobb\n");
    });
    it("Two Iterations", () => {
      expect(arrToString(iterate("src/testFiles/glider.rle", 2))).to.equal("bbbbb\nbbbbb\nbbbob\nbobob\nbboob\n");
    });
    it("Three Iterations", () => {
      expect(arrToString(iterate("src/testFiles/glider.rle", 3))).to.equal("bbbbb\nbbbbb\nbbobb\nbbboo\nbboob\n");
    });
  });
});

describe("Array To RLE format", () => {
  it("Blinker - 0 iterations", () => {
    expect(arrayToRLE(readRLE("src/testFiles/blinker.rle"))).to.equal("ooo!");
  });
  it("Blinker - 1 iteration", () => {
    expect(arrayToRLE(iterate("src/testFiles/blinker.rle", 1))).to.equal("o$o$o!");
  });
  it("Block - 0 iterations", () => {
    expect(arrayToRLE(readRLE("src/testFiles/block.rle"))).to.equal("oo$oo!");
  });
  it("Block - 1 iteration", () => {
    expect(arrayToRLE(iterate("src/testFiles/block.rle", 1))).to.equal("oo$oo!");
  });
  it("Glider - 0 iterations", () => {
    expect(arrayToRLE(readRLE("src/testFiles/glider.rle"))).to.equal("bob$bbo$ooo!");
  });
  it("Glider -  iteration", () => {
    expect(arrayToRLE(iterate("src/testFiles/glider.rle", 1))).to.equal("obo$boo$bob!");
  });
});

describe("Command Line", () => {
  describe("Arguments", () => {
    it("too few arguments", () => {
      expect(handleCommandLine(["path"])).to.equal("Error: Too few arguments, please give a path and the number of iterations to run!");
    });
    it("too many arguments", () => {
      expect(handleCommandLine(["path", 2, 32])).to.equal("Error: Too many arguments, please give a path and the number of iterations to run!");
    });
    describe("File Path", () => {
      it("path is no string", () => {
        expect(handleCommandLine([2, 2])).to.equal("Error: Path in wrong format, please provide a string");
      });
      it("path not found", () => {
        expect(handleCommandLine(["path", 2])).to.equal("Error: Path not found, please provide a correct path!");
      });
      describe("Iterations", () => {
        it("iterations is no int", () => {
          expect(handleCommandLine(["src/testFiles/block.rle", "hello"])).to.equal("Error: Iterations in wrong format, please provide an integer!");
        });
        it("iterations are negative", () => {
          expect(handleCommandLine(["src/testFiles/block.rle", -1])).to.equal("Error: Iterations are negative, only positive numbers allowed!");
        });
        describe("Functionality", () => {
          it("blinker works", () => {
            expect(handleCommandLine(["src/testFiles/blinker.rle", 1])).to.equal("o$o$o!");
          });
          it("glider works", () => {
            expect(handleCommandLine(["src/testFiles/glider.rle", 2])).to.equal("bbo$obo$boo!");
          });
        })
      });
    });
  });
  
});