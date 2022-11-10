const fs = require("fs/promises");
const path = require("path");

const currPath = path.join(__dirname, "secret-folder");

let i = 0

fs.readdir(currPath, { withFileTypes: true }).then((allFiles) => {
    allFiles.forEach((el) => showFile(el));
});


function showFile(file) {
  if (file.isFile()) {
    const filePath = path.join(currPath, file.name);
    const fileExt = path.extname(filePath).slice(1);
    const fileName = path.basename(filePath).split(".")[0];
    let fileSize;
    fs.stat(filePath).then((res) => {
      fileSize = res.size / 1000 + '\x1b[32mkb\x1b[0m';
      let result = [fileName, fileExt, fileSize];
      if(i == 0) {console.log('\x1b[33m%s\x1b[0m',result.join(" - ")); }
      if(i == 1) {console.log('\x1b[36m%s\x1b[0m',result.join(" - ")); }
      if(i == 2) {console.log('\x1b[31m%s\x1b[0m',result.join(" - ")); }
      if(i == 3) {console.log('\x1b[34m%s\x1b[0m',result.join(" - ")); }
      i++
    });
  }
}