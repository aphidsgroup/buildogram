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

  const relativePath = filePath.replace(baseDir, '').replace(/\\/g, '/').replace('/page.js', '') || '/';
  
  // Exclude private routes
  const privatePrefixes = ['/admin', '/ops', '/client', '/partner', '/api', '/login', '/reset-password', '/forgot-password', '/test', '/dev'];
  if (privatePrefixes.some(p => relativePath.startsWith(p))) return;
  
  // Exclude dynamic routes (they handle it manually)
  if (relativePath.includes('[')) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has the JSX tag
  if (content.includes('<BreadcrumbSchema') || content.includes('BreadcrumbList')) return;

  // Extract title and path from metadata or generateSEOMetadata
  let title = '';
  const titleMatch = content.match(/(title|heroTitle):\s*['"](.*?)['"]/);
  if (titleMatch) {
    title = titleMatch[2].split('|')[0].trim();
  } else {
    const parts = relativePath.split('/');
    title = parts[parts.length - 1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  if (!title) title = 'Home';

  // Define breadcrumb items based on path segments
  const segments = relativePath.split('/').filter(Boolean);
  const items = [{ name: 'Home', path: '/' }];
  
  let currentPath = '';
  for (let i = 0; i < segments.length; i++) {
    currentPath += '/' + segments[i];
    let name = segments[i].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    if (i === segments.length - 1) name = title; // Use page title for the last segment
    items.push({ name, path: currentPath });
  }

  const breadcrumbProps = `items={${JSON.stringify(items)}}`;
  const injection = `<BreadcrumbSchema ${breadcrumbProps} />`;

  // Inject import
  if (!content.includes('import BreadcrumbSchema')) {
    if (content.includes('"use client"') || content.includes("'use client'")) {
      content = content.replace(/['"]use client['"];?\s*/, "$&\nimport BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';\n");
    } else {
      content = `import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';\n` + content;
    }
  }

  // Find the LAST export default function
  const lines = content.split('\n');
  let exportDefaultIndex = -1;
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].includes('export default function') || lines[i].includes('export default async function')) {
      exportDefaultIndex = i;
      break;
    }
  }

  if (exportDefaultIndex === -1) return; // No default export

  // Find the first `return (` AFTER export default function
  let returnIndex = -1;
  for (let i = exportDefaultIndex; i < lines.length; i++) {
    if (lines[i].includes('return (')) {
      returnIndex = i;
      break;
    }
  }

  if (returnIndex === -1) return; // No return statement found

  // Find the LAST `);` AFTER returnIndex which belongs to that return
  // We can just find the last `);` before the closing brace of the function.
  let closingParenIndex = -1;
  for (let i = lines.length - 1; i >= returnIndex; i--) {
    if (lines[i].includes(');')) {
      closingParenIndex = i;
      break;
    }
  }

  if (closingParenIndex === -1) return;

  // We have the lines.
  // Replace `return (` with `return ( <> `
  lines[returnIndex] = lines[returnIndex].replace('return (', 'return ( <>');
  // Replace `);` with `<BreadcrumbSchema /> </> );`
  lines[closingParenIndex] = lines[closingParenIndex].replace(');', `  ${injection}\n    </>\n  );`);

  fs.writeFileSync(filePath, lines.join('\n'));
  console.log(`Injected BreadcrumbSchema JSX into ${relativePath}`);
});
