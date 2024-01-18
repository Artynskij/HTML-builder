const fs = require('fs');
const path = require('path');
const pathFile = path.format({
  root: '/',
  base: 'hello.txt',
  ext: 'ignored',
});
const url = __dirname + pathFile;
const writeableStream = fs.createWriteStream(url);

let readline = require('readline');
let readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>',
});
let guestName = '';
readlineInterface.question('What is your name? ', (answer) => {
  guestName = answer;
  console.log(`Hello ${answer}`);
  console.log('You can write');
  readlineInterface.prompt('>');
});
readlineInterface.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    readlineInterface.close();
    return;
  }
  writeableStream.write(`${input}\n`);
  readlineInterface.prompt('>');
});

readlineInterface.on('close', () => {
  console.log(`good night ${guestName}`);
});
