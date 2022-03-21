export class Scoring {
  score;
  level;
  rowsRemoved;
  startingLevel;

  constructor(level) {
    this.level = level;
    this.startingLevel = level;
    this.score = 0;
    this.rowsRemoved = 0;
  }

  updateScore(addition) {
    this.score += addition;
  }

  updateRows(removedRows) {
    this.rowsRemoved += removedRows;
  }

  updateLevel() {
    if (this.startingLevel === this.level) {
      if (this.rowsRemoved >= (this.startingLevel * 10) + 10) {
        this.level ++;
        this.rowsRemoved -= (this.startingLevel * 10) + 10;
      } 
      else if (this.rowsRemoved >= Math.max(100, (this.startingLevel * 10) - 50)) {
        this.level ++;
        this.rowsRemoved -= Math.max(100, (this.startingLevel * 10) - 50);
      }
    } else {
      if (this.rowsRemoved >= 10) {
        this.level ++;
        this.rowsRemoved -= 10;
      }
    }
  }

  lineClear(removedRows) {
    this.updateRows(removedRows);

    switch (removedRows) {
      case 1:
        this.updateScore((this.level +1) * 40);
        break;
      
      case 2:
        this.updateScore((this.level +1) * 100);
        break;

      case 3:
        this.updateScore((this.level +1) * 300);
        break;

      case 4:
        this.updateScore((this.level +1) * 1200);
        break;
      
      default:
        throw new Error(`Error: Too many or too few lines (${removedRows}) possible were cleared.`);
    }
    this.updateLevel();
  }
}