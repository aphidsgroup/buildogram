import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function walkSync(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    const dirent = fs.statSync(dirFile);
    if (dirent.isDirectory()) {
      // skip node_modules and .next
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        filelist = walkSync(dirFile, filelist);
      }
    } else {
      if (dirFile.endsWith('.js') || dirFile.endsWith('.jsx')) {
        filelist.push(dirFile);
      }
    }
  }
  return filelist;
}

const files = walkSync(path.join(__dirname, 'src'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // 1. Text Highlights (color: '#CCFF00' or color: "#CCFF00")
  content = content.replace(/color:\s*['"]#CCFF00['"]/gi, 
    "background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent'");

  // 2. Solid Backgrounds (background: '#CCFF00')
  content = content.replace(/background:\s*['"]#CCFF00['"]/gi, 
    "background: 'var(--gradient-orange)'");

  // 3. Badge/Pill backgrounds (rgba(204,255,0,...))
  content = content.replace(/rgba\(204,\s*255,\s*0,\s*0\.1[02]?\)/gi, 
    "'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))'".replace(/'/g, ''));
    
  // 4. Borders with rgba(204,255,0,0.2)
  content = content.replace(/rgba\(204,\s*255,\s*0,\s*0\.2\)/gi, 
    "rgba(252, 110, 32, 0.28)");

  // 5. Radial gradients in Hero sections (rgba(204,255,0,0.07) or 0.15)
  content = content.replace(/rgba\(204,\s*255,\s*0,\s*(0\.\d+)\)/gi, 
    "rgba(252, 110, 32, $1)");

  // 6. Generic hex replacements for anything missed
  content = content.replace(/#CCFF00/gi, "#FC6E20");
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`Updated: ${file}`);
  }
}
console.log('All files processed.');
