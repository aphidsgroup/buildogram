const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/app/**/page.js');
let changed = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('Buy Materials')) {
    content = content.replace(/Buy Materials/g, 'Material Sourcing');
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed Buy Materials in:', file);
    changed++;
  }
}
console.log('Changed in', changed, 'files');
