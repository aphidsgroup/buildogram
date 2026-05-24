const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else {
      if (filePath.endsWith('.js') || filePath.endsWith('.jsx') || filePath.endsWith('.css') || filePath.endsWith('.module.css')) {
        results.push(filePath);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src'));

let changedCount = 0;
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content.replace(/ffda01/gi, 'CCFF00');
  
  // also check for rgba with the old color maybe? The old color was FFDA01. The rgb is 255, 218, 1.
  // "rgba(255,218,1" -> "rgba(204,255,0"
  newContent = newContent.replace(/255,\s*218,\s*1/g, '204,255,0');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    changedCount++;
  }
});

console.log('Files changed:', changedCount);
