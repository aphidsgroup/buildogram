const fs = require('fs');
const path = require('path');

function walk(dir) {
  let files = [];
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? files.push(...walk(dirPath)) : files.push(dirPath);
  });
  return files;
}

const files = walk('src').filter(f => f.endsWith('.js') || f.endsWith('.ts'));
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes("import prisma from '@/lib/db'")) {
    fs.writeFileSync(f, content.replace(/import prisma from '@\/lib\/db'/g, "import prisma from '@/lib/prisma'"));
    console.log('Updated ' + f);
  }
});
