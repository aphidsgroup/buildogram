const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../src/app');

function getPathFromDir(filePath) {
  let relative = path.relative(appDir, path.dirname(filePath)).replace(/\\/g, '/');
  if (relative === '') return '/';
  // handle dynamic routes, but usually we just want the base string or skip them.
  if (relative.includes('[')) return `/${relative}`;
  return `/${relative}`;
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file === 'page.js') {
      let content = fs.readFileSync(fullPath, 'utf-8');
      
      // Skip if already using generateSEOMetadata
      if (content.includes('generateSEOMetadata(')) continue;
      
      // Match `export const metadata = { title: '...', description: '...' }`
      const metadataRegex = /export\s+const\s+metadata\s*=\s*\{([^}]*)\};/s;
      const match = content.match(metadataRegex);
      
      if (match) {
        let innerObj = match[1];
        const routePath = getPathFromDir(fullPath);
        
        // Exclude some complex ones or dynamic ones where path would be wrong
        if (routePath.includes('[')) continue;
        
        // check if it has import for generateSEOMetadata
        if (!content.includes('import { generateSEOMetadata }')) {
          content = "import { generateSEOMetadata } from '@/lib/seo/metadata';\n" + content;
        }

        const newMetadata = `export const metadata = generateSEOMetadata({
${innerObj.trim()},
  path: '${routePath}',
});`;
        
        content = content.replace(metadataRegex, newMetadata);
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log(`Updated metadata in ${routePath}`);
      }
    }
  }
}

processDirectory(appDir);
console.log('Metadata injection complete.');
