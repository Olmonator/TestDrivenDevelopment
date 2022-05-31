import { readFileSync, writeFileSync } from 'fs';

export function readFile(fileName) {
  try {
    const data = readFileSync(fileName, 'utf8');
    return data;
  } catch (err) {
    return false;
  }
}
