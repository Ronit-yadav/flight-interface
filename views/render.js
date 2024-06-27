const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

// Define the path to your EJS file and the output HTML file
const inputFilePath = path.join(__dirname, 'views', 'dashboard.ejs');
const outputFilePath = path.join(__dirname, 'dashboard.html');

// Render the EJS file to HTML
ejs.renderFile(inputFilePath, {}, (err, str) => {
  if (err) {
    console.error(err);
  } else {
    fs.writeFileSync(outputFilePath, str);
    console.log('HTML file generated successfully.');
  }
});
