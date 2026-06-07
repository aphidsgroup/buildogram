const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

const baseDir = path.join(__dirname, '../src/app');

walkDir(baseDir, (filePath) => {
  if (!filePath.endsWith('page.js')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace itemData.xyz.title with itemData.title
  if (content.match(/itemData\.\w+\.title/)) {
    content = content.replace(/itemData\.\w+\.title/g, 'itemData.title');
    changed = true;
  }
  // Replace itemData.xyz.slug with itemData.slug
  if (content.match(/itemData\.\w+\.slug/)) {
    content = content.replace(/itemData\.\w+\.slug/g, 'itemData.slug');
    changed = true;
  }
  // Also check for term
  if (content.match(/itemData\.\w+\.term/)) {
    content = content.replace(/itemData\.\w+\.term/g, 'itemData.term');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log('Fixed breadcrumb bugs in', filePath);
  }
});
