const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../src/app');

function getFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = getFiles(baseDir).filter(f => f.endsWith('page.js'));

const privatePrefixes = [
  '/admin', '/ops', '/client', '/partner', '/supplier', '/api', 
  '/login', '/reset-password', '/forgot-password', '/test', '/dev',
  '/ai-floor-plan-creator/studio', '/passport', '/ops/invoices'
];

let fixedPages = [];
let skippedPages = [];

function generateContent(relativePath) {
  let parts = relativePath.split('/').filter(Boolean);
  if (parts.length === 0) return { title: 'Home', desc: '' };
  
  let name = parts[parts.length - 1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  let title = `${name} | Buildogram`;
  
  let desc = `Comprehensive ${name.toLowerCase()} services and guidance. Buildogram is an AI-driven, engineer-led construction and property ecosystem offering BOQ review, structural audit, survey, testing, piling, and Property Passport solutions.`;
  
  if (relativePath.includes('/materials')) {
    desc = `Source verified ${name.toLowerCase()} materials directly through Buildogram, the AI-driven, engineer-led construction and property ecosystem.`;
  } else if (relativePath.includes('/review') || relativePath.includes('audit')) {
    desc = `Independent ${name.toLowerCase()} for transparent pricing. Avoid hidden costs with Buildogram's BOQ review, structural audit, and engineer-led construction ecosystem.`;
  } else if (relativePath.includes('chennai')) {
    desc = `Expert ${name.toLowerCase()} in Chennai. Trust Buildogram, an AI-driven, engineer-led construction and property ecosystem for structural audit, survey, testing, and piling.`;
  }
  
  return { title, desc };
}

allFiles.forEach(file => {
  let relativePath = file.replace(baseDir, '').replace(/\\/g, '/').replace('/page.js', '') || '/';
  
  if (privatePrefixes.some(p => relativePath.startsWith(p)) || relativePath.includes('/print')) {
    skippedPages.push(`${relativePath} (private/noindex)`);
    return;
  }
  
  if (relativePath === '/') {
    skippedPages.push(`${relativePath} (root layout)`);
    return;
  }

  let content = fs.readFileSync(file, 'utf8');
  let isClient = content.includes("'use client'") || content.includes('"use client"');
  
  let layoutFile = file.replace('page.js', 'layout.js');
  let hasLayout = fs.existsSync(layoutFile);
  let layoutContent = hasLayout ? fs.readFileSync(layoutFile, 'utf8') : '';
  
  let pageHasHelper = /generateSEOMetadata/i.test(content);
  let layoutHasHelper = /generateSEOMetadata/i.test(layoutContent);
  
  if (pageHasHelper || layoutHasHelper) {
    skippedPages.push(`${relativePath} (already uses generateSEOMetadata)`);
    return;
  }

  let { title, desc } = generateContent(relativePath);

  // Extract existing metadata to merge if present
  let existingTitle = title;
  let existingDesc = desc;

  const extractTitleDesc = (str) => {
    let tMatch = str.match(/title:\s*['"`](.*?)['"`]/);
    if (tMatch) existingTitle = tMatch[1];
    let dMatch = str.match(/description:\s*['"`](.*?)['"`]/);
    if (dMatch) existingDesc = dMatch[1];
  };

  extractTitleDesc(content);
  extractTitleDesc(layoutContent);
  
  if (relativePath.includes('[')) {
    let titleStr = existingTitle.replace(/\[(.*?)\]/g, '${resolvedParams.$1}');
    let pathStr = relativePath.replace(/\[(.*?)\]/g, '${resolvedParams.$1}');
    
    let metaCode = `import { generateSEOMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const title = \`${titleStr}\`;
  return generateSEOMetadata({
    title,
    description: "${existingDesc}",
    path: \`${pathStr}\`
  });
}
`;
    if (isClient) {
      if (!hasLayout) {
        fs.writeFileSync(layoutFile, `${metaCode}\nexport default function Layout({ children }) {\n  return children;\n}\n`);
      } else {
        // Strip out existing export metadata
        let newLayout = layoutContent.replace(/export\s+(const|let|var)\s+metadata\s*=\s*\{[\s\S]*?\};?/, '').replace(/export\s+async\s+function\s+generateMetadata[\s\S]*?\n\}/, '');
        fs.writeFileSync(layoutFile, metaCode + "\n" + newLayout);
      }
    } else {
      let newContent = content.replace(/export\s+(const|let|var)\s+metadata\s*=\s*\{[\s\S]*?\};?/, '').replace(/export\s+async\s+function\s+generateMetadata[\s\S]*?\n\}/, '');
      let lines = newContent.split('\n');
      let lastImportIndex = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('import ')) {
          lastImportIndex = i;
        }
      }
      if (lastImportIndex !== -1) {
        lines.splice(lastImportIndex + 1, 0, '\n' + metaCode);
      } else {
        lines.unshift(metaCode);
      }
      fs.writeFileSync(file, lines.join('\n'));
    }
  } else {
    let metaCode = `import { generateSEOMetadata } from '@/lib/seo/metadata';\n\nexport const metadata = generateSEOMetadata({\n  title: "${existingTitle}",\n  description: "${existingDesc}",\n  path: "${relativePath}"\n});\n`;
    
    if (isClient) {
      if (!hasLayout) {
        fs.writeFileSync(layoutFile, `${metaCode}\nexport default function Layout({ children }) {\n  return children;\n}\n`);
      } else {
        let newLayout = layoutContent.replace(/export\s+(const|let|var)\s+metadata\s*=\s*\{[\s\S]*?\};?/, '').replace(/export\s+async\s+function\s+generateMetadata[\s\S]*?\n\}/, '');
        fs.writeFileSync(layoutFile, metaCode + "\n" + newLayout);
      }
    } else {
      let newContent = content.replace(/export\s+(const|let|var)\s+metadata\s*=\s*\{[\s\S]*?\};?/, '').replace(/export\s+async\s+function\s+generateMetadata[\s\S]*?\n\}/, '');
      let lines = newContent.split('\n');
      let lastImportIndex = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('import ')) {
          lastImportIndex = i;
        }
      }
      if (lastImportIndex !== -1) {
        lines.splice(lastImportIndex + 1, 0, '\n' + metaCode);
      } else {
        lines.unshift(metaCode);
      }
      fs.writeFileSync(file, lines.join('\n'));
    }
  }
  
  fixedPages.push(relativePath);
});

const report = `# SEO_METADATA_FIX_REPORT

**Generated:** ${new Date().toISOString()}

## Summary
- **Pages Fixed:** ${fixedPages.length}
- **Pages Skipped:** ${skippedPages.length}

### Fixed Pages
${fixedPages.map(p => '- ' + p).join('\n')}

### Skipped Pages
${skippedPages.map(p => '- ' + p).join('\n')}
`;

fs.writeFileSync(path.join(__dirname, '../SEO_METADATA_FIX_REPORT.md'), report);
console.log('Fixed metadata. Generated SEO_METADATA_FIX_REPORT.md');
