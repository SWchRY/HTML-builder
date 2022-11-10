const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');
let oldDir = path.join(__dirname, 'files');
let newDir = path.join(__dirname, 'files-copy');

function copyDir(oldDir, newDir){
    fsPromises.rm(newDir, { recursive: true, force: true })
    .then(() =>  fsPromises.mkdir(newDir, {recursive: true}), err => console.error(err))
    .then(() => copyFiles(oldDir, newDir), err => console.error(err));
    console.log('\x1b[34m%s\x1b[0m','Коипрование произошло успешно')
}

function copyFiles(oldDir, newDir) {
    fsPromises.readdir(oldDir,{ withFileTypes: true }).then(listFiles =>{
        for (let file of listFiles){
            if (file.isFile()) {
                let inputFile = fs.createReadStream(path.join(oldDir, file.name));
                let outputFile = fs.createWriteStream (path.join(newDir, file.name));
                inputFile.pipe(outputFile);
            }          
        } 
    },
    (err) => console.error(err));
}



copyDir(oldDir, newDir);