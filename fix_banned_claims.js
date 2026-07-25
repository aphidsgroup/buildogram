const fs = require('fs');
const glob = require('glob');
const path = require('path');

const replacements = [
  { regex: /Turnkey construction/gi, replace: 'End-to-End Construction' },
  { regex: /Direct from suppliers/gi, replace: 'Quality materials' },
  { regex: /Verified architects/gi, replace: 'Professional architects' },
  { regex: /Verified suppliers/gi, replace: 'Quality materials' }
];

const files = glob.sync('src/**/*.{js,jsx}');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  for (const rep of replacements) {
    content = content.replace(rep.regex, rep.replace);
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed:', file);
  }
}
