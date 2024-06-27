const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

const inputFilePath = path.join(__dirname, 'path/to/your/file.ejs');
const outputFilePath = path.join(__dirname, 'path/to/your/output/file.html');

ejs.renderFile(inputFilePath, {}, (err, str) => {
  if (err) {
    console.error(err);
  } else {
    fs.writeFileSync(outputFilePath, str);
    console.log('HTML file generated successfully.');
  }
});
