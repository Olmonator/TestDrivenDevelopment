import { readFileSync } from 'fs';

let globalInt = 5;

export function readFile(fileName) {
  try {
    const data = readFileSync(fileName, 'utf8');
    return data;
  } catch (err) {
    return false;
  }
}

export function readClock(date) {
  let time;
  if(date === undefined) {
    time = Date;
  } else {
    time = new Date(date);
  }
  globalInt = time.getDate();
  return time.getDate() + 1;
}

export function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

function callNumber() {
  return getNumber(globalInt)
}

export function getNumber(number) {
  return number -1;
}

export function everything(fileName, date) {
  let max = parseInt(readFile(fileName));
  if(Number.isNaN(max)) {
    return "Error";
  }
  let day = readClock(date);
  let randomInt = randomNumber(max);
  return getNumber(day + randomInt);
}
