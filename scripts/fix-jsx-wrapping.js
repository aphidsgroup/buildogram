const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

const baseDir = path.join(__dirname, '../src/app');

walkDir(baseDir, (filePath) => {
  if (!filePath.endsWith('page.js')) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if it doesn't have BreadcrumbSchema (to be safe)
  if (!content.includes('<BreadcrumbSchema')) return;

  // Find return ( ... );
  const returnRegex = /return\s*\(\s*([\s\S]*?)\s*\);/g;
  
  const newContent = content.replace(returnRegex, (match, body) => {
    if (body.trim().startsWith('<>')) {
      return match; // Already wrapped
    }
    // If it starts with a tag like <main> or <div> that encloses everything, wrapping it is still safe.
    // If it's a self closing tag followed by another tag, wrapping it is REQUIRED.
    return `return (\n    <>\n      ${body.trim()}\n    </>\n  );`;
  });

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent);
    console.log(`Fixed JSX wrapping in ${filePath}`);
  }
});
