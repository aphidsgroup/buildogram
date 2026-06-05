const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../src/app');

function fixDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      fixDirectory(fullPath);
    } else if (file === 'page.js') {
      let content = fs.readFileSync(fullPath, 'utf-8');
      
      if (content.includes(',,')) {
        // Fix double commas that might have been accidentally inserted
        content = content.replace(/,,/g, ',');
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log(`Fixed syntax in ${fullPath}`);
      }
    }
  }
}

fixDirectory(appDir);
console.log('Syntax fix complete.');
