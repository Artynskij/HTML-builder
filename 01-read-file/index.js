const fs = require('fs');
const path = require('path');
const pathFile = path.format({
  root: '/',
  base: 'text.txt',
  ext: 'ignored',
});
const url = __dirname + pathFile;

fs.readFile(url, 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
