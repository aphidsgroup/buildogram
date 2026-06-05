const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../src/app');

function getPathFromDir(filePath) {
  let relative = path.relative(appDir, path.dirname(filePath)).replace(/\\/g, '/');
  if (relative === '') return '/';
  if (relative.includes('[')) return `/${relative}`;
  return `/${relative}`;
}

const formatTitle = (slug) => {
  const parts = slug.split('/');
  const last = parts[parts.length - 1];
  if (!last) return 'Buildogram';
  return last.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' | Buildogram';
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
      
      if (content.includes("'use client'") || content.includes('"use client"')) {
        const layoutPath = path.join(dir, 'layout.js');
        if (!fs.existsSync(layoutPath)) {
          const routePath = getPathFromDir(fullPath);
          if (routePath.includes('[')) continue; // skip dynamic
          if (routePath.includes('/admin') || routePath.includes('/ops') || routePath.includes('/client') || routePath.includes('/partner')) continue; // skip internal

          // Don't overwrite the root layout!
          if (routePath === '/') continue;

          const title = formatTitle(routePath);
          const layoutContent = `import { generateSEOMetadata } from '@/lib/seo/metadata';

export const metadata = generateSEOMetadata({
  title: '${title}',
  description: 'Engineer-led home construction companion in Chennai. Plan, build, source materials, verify site progress, and manage your Property.',
  path: '${routePath}',
});

export default function Layout({ children }) {
  return <>{children}</>;
}
`;
          fs.writeFileSync(layoutPath, layoutContent, 'utf-8');
          console.log(`Created layout with SEO metadata for ${routePath}`);
        }
      }
    }
  }
}

processDirectory(appDir);
console.log('Client layouts injection complete.');
