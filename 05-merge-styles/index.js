const fs = require('fs');
const path = require('path');
const { unlink, readdir, appendFile, readFile } = require('fs/promises');

async function createBundleFile() {
  const pathToStyles = path.join(__dirname, 'styles')
  const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

  try {
    await appendFile(bundlePath, '')
    await unlink(bundlePath)
    await appendFile(bundlePath, '');

    let arrStyles = []
    const allFiles = await readdir(pathToStyles, { withFileTypes: true });
    for (let j = 0; j < allFiles.length; j++) {
      const fileName = allFiles[j].name;
      if (allFiles[j].isFile() && path.extname(fileName) === '.css') {
        const currText = await readFile(path.join(pathToStyles, fileName), 'utf-8')
        arrStyles.push(currText)
        await appendFile(bundlePath, `${currText}\n\n`)
      }
    }
  }
  catch (error) {
    console.log(error)
  }
}

createBundleFile()