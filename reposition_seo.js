const fs = require('fs');
const path = require('path');

function replaceInDir(dir, replacements) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath, replacements);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let updated = false;
      for (const [oldStr, newStr] of replacements) {
        if (content.includes(oldStr)) {
          content = content.split(oldStr).join(newStr);
          updated = true;
        }
      }
      if (updated) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated', fullPath);
      }
    }
  }
}

const replacements = [
  ["India's Property Transparency Platform", "Buildogram is a construction and property marketplace that connects property owners, construction professionals, material suppliers, property listings, and digital property records."],
  ["India’s Property Transparency Platform", "Buildogram is a construction and property marketplace that connects property owners, construction professionals, material suppliers, property listings, and digital property records."],
  ["Property Transparency Platform", "Construction & Property Marketplace"],
  ["Buy. Build. Track. Rent. Sell. Maintain.", ""],
  ["Build with proof, not promises.", "Showcase. Connect. Build."]
];

// Update both src/data and src/app directly
replaceInDir(path.join(__dirname, 'src/data/seo'), replacements);
replaceInDir(path.join(__dirname, 'src/app'), replacements);

console.log('Done script.');
