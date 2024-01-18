const fs = require('fs');
const path = require('path');

const url = path.join(__dirname, 'text.txt');

fs.readFile(url, 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
