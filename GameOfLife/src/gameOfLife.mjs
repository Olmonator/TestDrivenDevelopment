import { readFileSync } from 'fs';

export function readFile(fileName) {
  try {
    const data = readFileSync(fileName, 'utf8');
    //console.log(data);
    return data;
  } catch (err) {
    return false;
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

function extendArray(arr) {
  let array = arr;
  let array2D;

  // if 1D array, then turn into 2D
  // e.g.       bbb
  //      ooo   ooo
  //            bbb
  if(array[0].length === 1) {
    array2D = createArray(array.length, array.length);
    for (let x = 0; x < array.length; x++) {
      for(let y = 0; y < array.length; y++) {
        // only if in middle row 
        if(x === 1) {
          array2D[x][y] = array[x]; // array only 1D
        } else {
          array2D[x][y] = 'b';
        }
      }
    }
    array = array2D;
  }

  let extArr = createArray(array.length +2, array.length);
  // fill up with dead cells
  for(let x = 0; x < extArr.length; x++) {
    for(let y = 0; y < extArr.length; y++) {
      extArr[x][y] = 'b';
    }
  }

  for(let x = 1; x < extArr.length -1; x++) {
    for(let y = 1; y < extArr[0].length -1; y++) {
      if(array[x-1][y-1] !== undefined) {
        extArr[x][y] = array[x-1][y-1];
      }
    }
  }

  //console.log("array: ", extArr);
  return extArr;
}

function check(arr, x, y, xMax, yMax) {
  //check out of bounds
  if(x >= 0 && x < xMax && y >= 0 && y < yMax) {
    if (arr[x][y] === 'o') {
      return true;
    }
  }
  return false;
}

function getNeighbors(arr, x, y) {
  let nOfAlive = 0;

  // iterate over neighboring fields
  for(let xOff = -1; xOff < 2; xOff++) {
    for(let yOff = -1; yOff < 2; yOff++) {
      // don't check element itself
      if(xOff !== 0 || yOff !== 0) {
        if(check(arr, x + xOff, y + yOff, arr.length, arr[0].length)) {
          nOfAlive ++;
        }
      }
    }
  }

  //console.log("alive neighboors: [" + x + "," + y + "] " + nOfAlive );
  return nOfAlive;
}

export function iterate(fileName, iterations) {
  // first extract the pattern
  let arr = readRLE(fileName);
  // somehow make space for the array | x=3 y=3 for more iterations
  let extArr = extendArray(arr);
  let resultArr;
  //apply game logic
  for(let i = 0; i < iterations; i++) {
    resultArr = createArray(extArr.length, extArr[0].length);
    for(let x = 0; x < extArr.length; x++) {
      for (let y = 0; y < extArr[0].length; y++) {
        // count neighbors
        let neighbors = getNeighbors(extArr, x, y);
        // rules
        if(extArr[x][y] === 'o' && (neighbors === 2 || neighbors === 3)) {
          resultArr[x][y] = 'o';
        } else if (extArr[x][y] === 'b' && neighbors === 3 ) {
          resultArr[x][y] = 'o';
        } else {
          resultArr[x][y] = 'b';
        }
      }
    }
    // overwrite arr to start again
    extArr = resultArr;
  }

  return resultArr;
}

// can only delete horizontal line, if no alive cell appears
function trimYAxis(arr, y) {
  for(let x = 0; x < arr.length; x++) {
    if(arr[x][y] === 'o') {
      return false;
    }
  }
  return true;
}
function trimArray(arr) {
  // to counteract the deletion of lines, we need to subtract the amount of lines we have deleted
  //  0 abc            0 abc
  //  1 abc -> delete  
  //  2 abc            1 abc
  let slices = 0;
  // copy array to work on
  let array = createArray(arr.length, arr.length);
  for (let x = 0; x < arr.length; x++) {
    for (let y = 0; y < arr.length; y++) {
      array[x][y] = arr[x][y];
    }
  }

  for(let x = 0; x < arr.length; x++) {
    //console.log("line: ", arr[x]);
    if(!arr[x].includes('o')) {
      array.splice(x - slices, 1);
      slices ++;
    } else {
      for (let y = 0; y < arr.length; y++) {
        if(trimYAxis(arr, y) === true) {
          array[x -slices][y] = '';
        }
      }
    }
    //console.log("after", array);
  }
  
  return array;
}

export function arrayToRLE(array) {
  let rlePattern = '';
  console.log("before", array);

  // only trim if 2D
  if (array[0].length !== 1) {
    array = trimArray(array);
  }
 
  // try to trim some dead cells
  console.log("after", array);

  for(let x = 0; x < array.length; x++) {
    // 1D array
    if(array[0].length === 1) {
      rlePattern += array[x];
    } else {
      for (let y = 0; y < array[0].length; y++) {
        rlePattern += array[x][y];
      }
      if(x < array.length -1) {
        rlePattern += '$';
      }
    }
    
  }

  rlePattern += '!';
  return rlePattern;
}

export function handleCommandLine(args) {
  console.log(typeof(args[0]));
  if(args.length < 2) {
    return "Error: Too few arguments, please give a path and the number of iterations to run!";
  } else if (args.length > 2) {
    return "Error: Too many arguments, please give a path and the number of iterations to run!";
  } else if(typeof(args[0]) !== "string") {
    return "Error: Path in wrong format, please provide a string";
  } else if(readFile(args[0]) === false) {
    return "Error: Path not found, please provide a correct path!";
  } else if(Number.isNaN(parseInt(args[1]))) {
    return "Error: Iterations in wrong format, please provide an integer!";
  } else if(parseInt(args[1]) < 1) {
    return "Error: Iterations are negative, only positive numbers allowed!";
  } else {
    return arrayToRLE(iterate(args[0], args[1]));
  }
}

handleCommandLine(process.args.splice(2,2));