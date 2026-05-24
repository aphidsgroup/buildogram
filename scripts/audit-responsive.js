const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');

const issues = {
  fixedWidths: [],
  unresponsiveFlex: [],
  unresponsiveGrid: [],
  tables: [],
  modals: []
};

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir(srcDir, (filePath) => {
  if (!filePath.endsWith('.js') && !filePath.endsWith('.jsx')) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const shortPath = filePath.replace(srcDir, '');

  // Fixed widths (e.g. w-[600px], w-[800px], w-96 without md:w-96)
  if (/w-\[[4-9]\d{2}px\]|w-\[\d{4}px\]/.test(content)) {
    issues.fixedWidths.push(shortPath);
  }
  
  // Unresponsive grids (e.g. grid-cols-2 without md: or sm:)
  if (/(?<!sm:|md:|lg:|xl:|2xl:)grid-cols-[2-9]/.test(content)) {
    issues.unresponsiveGrid.push(shortPath);
  }

  // Flex without wrap (flex gap-x without flex-wrap or flex-col)
  // This is harder to regex, but we can look for flex w-full and no wrap
  if (/className="[^"]*\bflex\b[^"]*"/g.test(content) && !content.includes('flex-wrap') && !content.includes('flex-col')) {
    // Might be too noisy, let's skip for now or keep it light.
  }

  // Tables
  if (content.includes('<table') && !content.includes('overflow-x-auto')) {
    issues.tables.push(shortPath);
  }

  // Modals (fixed inset-0 without internal scroll)
  if (content.includes('fixed inset-0') && !content.includes('overflow-y-auto')) {
    issues.modals.push(shortPath);
  }
});

console.log(JSON.stringify(issues, null, 2));
