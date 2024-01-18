const fs = require('fs');
const path = require('path');

const urlNewFolder = path.join(__dirname, 'filesCopy');
const urlOldFolder = path.join(__dirname, 'files');
function copyFile(url, data) {
  fs.writeFile(url, data, (err) => {
    if (err) throw err;
    console.log(path.basename(url) + ' created');
  });
}
function readFiles(url) {
  fs.readdir(url, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach((item) => {
      fs.readFile(path.join(url, item), 'utf8', (err, data) => {
        if (err) throw err;
        copyFile(path.join(urlNewFolder, item), data);
      });
    });
  });
}

fs.rm(urlNewFolder, { recursive: true }, () => {
  fs.mkdir(urlNewFolder, () => {
    readFiles(urlOldFolder);
  });
});
