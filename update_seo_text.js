const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      replaceInDir(full);
    } else if (full.endsWith('.js') || full.endsWith('.jsx')) {
      let content = fs.readFileSync(full, 'utf8');
      const original = content;

      content = content.replace(/Buy Properties/g, 'Buy/Sell Properties');
      content = content.replace(/Rent Properties/g, 'Rent/Lease Properties');

      if (content !== original) {
        fs.writeFileSync(full, content, 'utf8');
        console.log(`Updated Text in ${full}`);
      }
    }
  }
}

replaceInDir(path.join(__dirname, 'src', 'data', 'seo'));
