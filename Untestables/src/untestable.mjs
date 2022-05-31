import { readFileSync, unwatchFile, writeFileSync } from 'fs';

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

  return time.getDate() + 1;
}

export function randomNumber(max) {
  return Math.floor(Math.random() * max);
}
