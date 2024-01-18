// const path = require('path');
// function pathFile(base) {
//   path.format({
//     root: '/',
//     base: base,
//     ext: 'ignored',
//   });
// }
// const promises = require('fs/promises');

const fs = require('fs');
const path = require('path');

function readFiles(url) {
  fs.readdir(url, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    files.forEach((item) => {
      const pathFile = path.format({
        root: '/',
        base: item,
        ext: 'ignored',
      });
      const stat = fs.statSync(`${url}${pathFile}`);
      if (!stat.isFile()) return;
      const size = stat.size;
      const extname = path.extname(item);
      const name = path.win32.basename(item, extname);
      console.log(`${name} - ${extname.slice(1)} - ${size}kb`);
    });
  });
}
const pathSF = path.format({
  root: '/',
  base: 'secret-folder',
  ext: 'ignored',
});
readFiles(`${__dirname}${pathSF}`);
