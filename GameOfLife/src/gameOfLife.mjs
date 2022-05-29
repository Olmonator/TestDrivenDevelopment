import { create } from 'domain';
import { readFileSync, unwatchFile } from 'fs';

export function readFile(fileName) {
  try {
    const data = readFileSync(fileName, 'utf8');
    //console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

// create an Array to fill with pattern and use for game of life logic
function createArray(x, y) {
  let arr = [];

  for(let indx = 0; indx < x; indx ++) {
    if (y === 1) {
      arr[indx] = "";
    } else {
      arr[indx] = [];
    }
  }

  return arr;
}

function patternToArray(arr, pattern, x, y) {
  //console.log("current pattern: ", pattern);

  // variables for traversing arr
  let indx = 0;
  let indy = 0;

  // go through all pattern elements
  for (let patternIndex = 0; patternIndex < pattern.length; patternIndex++) {
    // differentiate between signs (b/o) multipliers (2/3/4) and specials ($/!)
    const element = pattern[patternIndex];
    //console.log("current element: ", element);

    // check if NaN
    if(Number.isNaN(parseInt(element))) {
      // check if special or sign
      if(element === '$') {
        // newline, set indeces
        indx ++;
        indy = 0;
      }
      else if(element === '!') {
        // return
        return arr;
      }
      else {
        // normal write letter (b/o) to arr
        arr[indx][indy] = element;
        indy ++;
      }
    } else {
      // repeat next letter
      // differentiate between 2D and 1D
      for (let i = 0; i < element; i ++) {
        if(y === 1) {
          arr[indx + i] = pattern[patternIndex + 1]; // next letter
        } else {
          arr[indx][indy + i] = pattern[patternIndex + 1]; // next letter
        }
        
      }

      //console.log("multiple letter write: ", arr, indx, indy);
      // skip the next letter; indy needs to be advanced by how much the element is
      patternIndex ++;
      indy += parseInt(element);
    }
  }
}

// simple 2D array to String method
// exeption for 1D arr
export function arrToString(arr) {
  let string = "";

  for(let x = 0; x < arr.length; x++) {
    // if y === 0, then don't use 2D logic
    if (arr[0].length > 1) {
      for(let y = 0; y < arr[0].length; y++) {
        string += arr[x][y];
      }
      string += "\n";
    } else {
      string += arr[x];
    }
  }

  return string;
}

export function readRLE(fileName) {
  const input = readFile(fileName);
  const lines = input.split("\n");

  // matrix dimensions
  let x;
  let y;

  // pattern e.g. [3o!]
  let pattern;

  lines.forEach(line => {
    if(line[0] !== '#') {

      // check for x and y
      for (let indx = 0; indx < line.length; indx ++) {
        if(line[indx] === 'x') {
          //console.log("x: ", line[indx +4]);
          x = parseInt(line[indx + 4]);
        }
        if(line[indx] === 'y') {
          //console.log("y: ", line[indx +4]);
          y = parseInt(line[indx + 4]);
        }
      }
      
      // check for pattern (line after x and y)
      if(line[0] !== 'x') {
        pattern = line;
        //console.log("pattern: ", pattern + "\n");
      }
    }
  })

  let arr = createArray(x, y);

  return patternToArray(arr, pattern, x, y);
}

function check(arr, x, y, xmax, ymax) {
  if(x >= 0 && x < xmax && y >= 0 && y < ymax) {
    if (arr[x][y] === 'o') {
      return true;
    }
  } 
  return false;
}

function getNeighbors(arr, x, y, xmax, ymax) {
  let nOfAlive = 0;
  //console.log("flag", arr);
  for (let xOff = -1; xOff < 2; xOff++) {
    for(let yOff = -1; yOff < 2; yOff++) {
      
      if(xOff !== 0 || yOff !== 0) {
        if(check(arr, x + xOff, y + yOff, xmax, ymax)) {
          nOfAlive++;
        }
      }
    }
  }
  console.log("alive: [" + x + "," + y + "] " + arr[x][y] + " " + nOfAlive);
  return nOfAlive;
}

// surounds the array with a padding
// oo   bbbb
// oo   boob
//      boob
//      bbbb
function extendArr(arr) {
  let matrix = arr;
  const offset = arr.length - arr[0].length;
  let extArr = createArray(arr.length, arr.length);
  console.log("matrix: ", matrix);
  // turn 1D into 2D
  if(arr[0].length === 1) {
    for(let x = 0; x < extArr.length; x++) {
      for(let y = 0; y < extArr.length; y++) {
        if(x === 1) {
          extArr[x][y] = arr[x];
        } else {
          extArr[x][y] = 'b';
        }
      }
    }
    //console.log("1D conversion", extArr);
    matrix = extArr;
  }
  
  extArr = createArray(matrix.length +2, matrix[0].length);

  for(let x = 0; x < extArr.length; x++) {
    for(let y = 0; y < extArr.length; y++) {
      extArr[x][y] = 'b';
    }
  }
    
  for(let x = 1; x < extArr.length -1; x++) {
    for(let y = 1; y < extArr[0].length -1; y++) {
      //console.log("element: ", matrix[x]);
      if (matrix[x-1][y-1] !== undefined) {
        extArr[x][y] = matrix[x-1][y-1];
      }
    }
  }

  return extArr;
}

export function iterate(fileName, iterations) {
  let arr = readRLE(fileName);
  arr = extendArr(arr);
  let resultArr = createArray(arr.length, arr.length);

  console.log("arr: ", arr);

  for (let i = 0; i < iterations; i++) {
    for(let x  = 0; x < arr.length; x++) {
      for(let y = 0; y < arr[0].length; y++) {
        let neighbors = getNeighbors(arr, x, y, arr.length, arr[0].length);
        if((neighbors === 2 || neighbors === 3) && arr[x][y] === 'o') {
          resultArr[x][y] = 'o';
        } else if(neighbors === 3 && arr[x][y] === 'b') {
          resultArr[x][y] = 'o';
        } else {
          resultArr[x][y] = 'b';
        }
      }
    }
  }
  return resultArr;
}