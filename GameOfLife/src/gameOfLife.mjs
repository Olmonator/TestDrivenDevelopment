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
