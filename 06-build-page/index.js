// const str1 =
//   'Your input {{header}} {{footer}} str1ing with {{someWord1}} and {{anotherWord2}}';
const fs = require('fs');
const path = require('path');

const urlNewFolder = path.join(__dirname, 'project-dist');
const urlAssetFolder = path.join(__dirname, 'assets');
const urlStylesFolder = path.join(__dirname, 'styles');
const urlComponentsFolder = path.join(__dirname, 'components');
// const nameFolders = {
//   dist: 'project-dist',
//   assets: 'assets',
// };
fs.rm(urlNewFolder, { recursive: true }, () => {
  fs.mkdir(urlNewFolder, () => {
    createIndexHtml();
    createStyleCss();
    createAssetFolder();
  });
});

function createAssetFolder() {
  fs.mkdir(path.join(urlNewFolder, 'assets'), () => {
    fs.readdir(urlAssetFolder, { recursive: true }, (err, data) => {
      if (err) throw err;
      data.forEach((item) =>
        recursiveCreateAsset(path.join(urlNewFolder, 'assets'), item),
      );
    });
  });
}
function recursiveCreateAsset(url, nameFile) {
  //   console.log(url);
  //   console.log(nameFile);
  fs.stat(
    path.join(url.replace(urlNewFolder, __dirname), nameFile),
    (err, stat) => {
      //   console.log(url.replace(urlNewFolder, __dirname), nameFile);
      if (err) throw err;

      if (stat.isDirectory()) {
        fs.mkdir(path.join(url, nameFile), () => {
          fs.readdir(
            path.join(url.replace(urlNewFolder, __dirname), nameFile),
            (err, data) => {
              if (err) throw err;
              data.forEach((item) => {
                recursiveCreateAsset(path.join(url, nameFile), item);
              });
            },
          );
        });
      }
      if (stat.isFile()) {
        const writeableStream = fs.createWriteStream(path.join(url, nameFile));
        fs.readFile(
          path.join(url.replace(urlNewFolder, __dirname), nameFile),
          (err, data) => {
            if (err) throw err;
            writeableStream.write(data);
          },
        );
      }
    },
  );
}
function createStyleCss() {
  fs.readdir(urlStylesFolder, (err, data) => {
    if (err) throw err;
    const writeableStream = fs.createWriteStream(
      path.join(urlNewFolder, 'style.css'),
    );
    data.forEach((dataUrl) => {
      if (path.extname(dataUrl) !== '.css') return;
      fs.readFile(
        path.join(urlStylesFolder, dataUrl),
        'utf-8',
        (err, style) => {
          writeableStream.write(style);
        },
      );
    });
  });
}
function createIndexHtml() {
  const writeableStream = fs.createWriteStream(
    path.join(urlNewFolder, 'index.html'),
  );
  fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
    if (err) throw err;
    const objectsNameFiles = findTemplatesStr(data);
    let newHtml = data;
    data.replace;
    objectsNameFiles.forEach((item, index) => {
      fs.readFile(
        path.join(urlComponentsFolder, `${item.name}.html`),
        (err, data) => {
          if (err) throw err;

          newHtml = newHtml.replace(item.find, data);
          if (index === objectsNameFiles.length - 1) {
            writeableStream.write(newHtml);
          }
        },
      );
    });

    // return newHtml;
  });
}

function findTemplatesStr(str) {
  const regex = /{{\s*([^{}]+(?:\s*{{[^{}]+}}[^{}]*)*)\s*}}/g;
  const matches = [...str.matchAll(regex)];

  const words = matches.map((match) => {
    return { find: match[0], name: match[1] };
  });
  return words;
}
