const fs = require('fs');
const path = require('path');

const urlDirStyles = path.join(__dirname, 'styles');
const urlDirDist = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(urlDirStyles, (err, data) => {
  if (err) throw err;
  const writeableStream = fs.createWriteStream(urlDirDist);
  data.forEach((dataUrl) => {
    if (path.extname(dataUrl) !== '.css') return;
    fs.readFile(path.join(urlDirStyles, dataUrl), (err, style) => {
      writeableStream.write(style);
    });
  });
});
