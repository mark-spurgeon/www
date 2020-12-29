const path = require('path');
const fs = require('fs');
const mammoth = require("mammoth");

const readFile = async ({
  file,
  ext,
}) => {
  if (ext === 'docx') {
    let data = await mammoth.extractRawText({path: file});
    let output = [ ...data.value].join('');
    return output;
  }
  
  return fs.readFileSync(filePath, 'utf8').toString()
}

const readBuffer = async ({
  buffer,
  ext,
}) => {
  if (ext === 'docx') {
    let data = await mammoth.extractRawText({ buffer });
    return [ ...data.value].join('');
  }

  return buffer;
}

exports.readText = async ({ buffer, file, ext }) => {
  if (file) {
    return await readFile({ file, ext });
  } 
  else if (buffer) {
    return await readBuffer({ buffer, ext });
  }
}


