const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      if (!file.includes('node_modules') && !file.includes('.next') && !file.includes('.git')) {
        results = results.concat(walk(file));
      }
    } else { 
      if (file.endsWith('.js') || file.endsWith('.jsx')) results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
let changedCount = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let newContent = content;

  // Pattern 1: className="btn btn-lg" style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white', background: 'transparent' }}
  newContent = newContent.replace(/className="btn btn-lg" style=\{\{\s*border:\s*['"]2px solid rgba\(255,255,255,0\.3\)['"],\s*color:\s*['"]white['"],\s*background:\s*['"]transparent['"]\s*\}\}/g, 'className="btn btn-lg btn-outline-light"');
  
  // Pattern 2: className="btn" style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white', background: 'transparent' }}
  newContent = newContent.replace(/className="btn" style=\{\{\s*border:\s*['"]2px solid rgba\(255,255,255,0\.3\)['"],\s*color:\s*['"]white['"],\s*background:\s*['"]transparent['"]\s*\}\}/g, 'className="btn btn-outline-light"');

  // Generic fallback if they have other class names
  newContent = newContent.replace(/className="([^"]*btn[^"]*)" style=\{\{\s*border:\s*['"]2px solid rgba\(255,255,255,0\.3\)['"],\s*color:\s*['"]white['"],\s*background:\s*['"]transparent['"]\s*\}\}/g, 'className=" btn-outline-light"');

  if (content !== newContent) {
    fs.writeFileSync(f, newContent);
    changedCount++;
    console.log('Fixed buttons in:', f);
  }
});

console.log('Total files changed:', changedCount);
