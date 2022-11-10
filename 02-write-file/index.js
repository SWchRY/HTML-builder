const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "data.txt");
const stream = fs.createWriteStream(file);
const { stdin, stdout } = require("process");
const readline = require("readline");
const rl = readline.createInterface({ input: stdin, output: stdout });


console.log('Запишите данные в файл');

rl.on('line', (str) => {
  if (str === 'exit' || str === 'Exit') {
    rl.close();
    console.log('Файл data.txt создан');
  } 
  else {
    stream.write(`${str}\n`);
  }
});

rl.on("SIGINT", () => {
    console.log('Файл data.txt создан');
    rl.close();
  });
  