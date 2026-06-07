const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../src/app');

function getFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else {
      if (filePath.endsWith('page.js')) fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = getFiles(baseDir);
const results = {};

allFiles.forEach(file => {
  let relativePath = file.replace(baseDir, '').replace(/\\/g, '/').replace('/page.js', '') || '/';
  if (relativePath.includes('/ops') || relativePath.includes('/admin') || relativePath.includes('/api')) return;

  const content = fs.readFileSync(file, 'utf8');
  
  // Find all contact links
  const regex = /contact\?type=([a-zA-Z0-9_]+)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    if (!results[relativePath]) results[relativePath] = new Set();
    results[relativePath].add(match[1]);
  }
});

for (const [route, types] of Object.entries(results)) {
  console.log(`${route}: ${Array.from(types).join(', ')}`);
}
