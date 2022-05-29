import { create } from 'domain';
import { readFileSync } from 'fs';

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
  console.log("current pattern: ", pattern);

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
function arrToString(arr) {
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

  return arrToString(patternToArray(arr, pattern, x, y));
  
}