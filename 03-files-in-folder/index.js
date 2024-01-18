const fs = require('fs');
const path = require('path');

function readFiles(url) {
  fs.readdir(url, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    files.forEach((item) => {
      fs.stat(path.join(url, item), (err, stat) => {
        if (!stat.isFile()) return;
        const size = stat.size;
        const extname = path.extname(item);
        const name = path.win32.basename(item, extname);
        console.log(`${name} - ${extname.slice(1)} - ${size}kb`);
      });
    });
  });
}

readFiles(path.join(__dirname, 'secret-folder'));
