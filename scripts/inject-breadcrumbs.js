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

  // Inject component inside the first element of the return of Page
  content = content.replace(
    /(return\s*\(\s*(?:<[a-zA-Z][^>]*>|<>))/i,
    `$1\n      ${injection}\n`
  );

  fs.writeFileSync(filePath, content);
  console.log(`Injected BreadcrumbSchema JSX into ${relativePath}`);
});
