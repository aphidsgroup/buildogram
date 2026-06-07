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
  
  let desc = `Comprehensive ${name.toLowerCase()} services. Buildogram is an AI-driven, engineer-led construction and property ecosystem offering BOQ review, structural audit, survey, testing, and piling.`;
  
  if (relativePath.includes('/materials')) {
    desc = `Source verified ${name.toLowerCase()} materials directly through Buildogram, the AI-driven, engineer-led construction and property ecosystem. Ensure quality and transparent pricing.`;
  } else if (relativePath.includes('/review') || relativePath.includes('audit')) {
    desc = `Independent ${name.toLowerCase()} for transparent pricing and quality assurance. Avoid hidden costs with Buildogram's structural audit and engineer-led construction ecosystem.`;
  } else if (relativePath.includes('chennai')) {
    desc = `Expert ${name.toLowerCase()} in Chennai. Trust Buildogram, an AI-driven, engineer-led construction and property ecosystem for structural audit, survey, testing, piling, and Property Passport solutions.`;
  } else if (relativePath.includes('/ai')) {
    desc = `Access our AI-driven ${name.toLowerCase()} tools. Buildogram combines technology with engineer-led construction support for BOQ review, planning, and Property Passport management.`;
  } else if (relativePath.includes('/compare')) {
    desc = `Compare ${name.toLowerCase()} to make informed decisions. Buildogram provides an AI-driven, engineer-led construction and property ecosystem for BOQ review and structural audit.`;
  } else if (relativePath.includes('/guides') || relativePath.includes('/faqs') || relativePath.includes('/glossary')) {
    desc = `Learn about ${name.toLowerCase()} with Buildogram's resources. We are an AI-driven, engineer-led construction and property ecosystem offering BOQ review, structural audit, and testing in Chennai.`;
  } else if (relativePath.includes('/build') || relativePath.includes('/properties')) {
    desc = `Professional ${name.toLowerCase()} services via Buildogram, the AI-driven, engineer-led construction and property ecosystem. We handle BOQ review, structural audit, survey, testing, and piling.`;
  }
  
  return { title, desc };
}

function removeOldMeta(content) {
  return content
    .replace(/export\s+(const|let|var)\s+metadata\s*=\s*(generateSEOMetadata\()?\{[\s\S]*?\}(\))?;?/g, '')
    .replace(/export\s+async\s+function\s+generateMetadata[\s\S]*?\n\}/g, '');
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
  
  let combinedContent = content + '\n' + layoutContent;
  
  // Check if it has a properly unique description using generateSEOMetadata
  let hasHelper = /generateSEOMetadata/i.test(combinedContent);
  let isBoilerplate = /Engineer-led home construction companion in Chennai/i.test(combinedContent) || /Buildogram is an engineer-led construction support platform/i.test(combinedContent);
  
  // Also, if it has "desc: " matching our generation, it's already fixed.
  // Wait, I just generated descriptions. If it already has it, skip it.
  let { title, desc } = generateContent(relativePath);
  let alreadyHasNewDesc = combinedContent.includes(desc);
  
  if (alreadyHasNewDesc) {
    skippedPages.push(`${relativePath} (already has unique metadata)`);
    return;
  }
  
  if (hasHelper && !isBoilerplate && !combinedContent.includes('const metadata = {')) {
    // Has helper, not boilerplate, looks like good custom metadata
    // Wait, some pages like /about have: "Learn about Buildogram..." which is good.
    // Let's keep them if they are good.
    // We only touch if NOT hasHelper or isBoilerplate or native object.
    
    // Actually, to be safe and ensure all requirements are met:
    // If it has generateSEOMetadata but is NOT boilerplate, we might want to keep it.
    // But some like /faqs/[category] don't have descriptions at all (or empty string)?
    // Let's just aggressively rewrite if it's boilerplate OR missing helper OR missing description completely.
  }
  
  let needsRewrite = !hasHelper || isBoilerplate || combinedContent.includes('export const metadata = {');
  
  if (!needsRewrite) {
    // Just ensure it has a description
    if (!combinedContent.includes('description:')) {
      needsRewrite = true;
    } else {
      skippedPages.push(`${relativePath} (has valid custom metadata)`);
      return;
    }
  }

  // Rewrite Metadata!
  if (relativePath.includes('[')) {
    let titleStr = title.replace(/\[(.*?)\]/g, '${resolvedParams.$1}');
    let pathStr = relativePath.replace(/\[(.*?)\]/g, '${resolvedParams.$1}');
    
    let metaCode = `import { generateSEOMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const title = \`${titleStr}\`;
  return generateSEOMetadata({
    title,
    description: "${desc}",
    path: \`${pathStr}\`
  });
}
`;
    if (isClient) {
      if (!hasLayout) {
        fs.writeFileSync(layoutFile, `${metaCode}\nexport default function Layout({ children }) {\n  return <>{children}</>;\n}\n`);
      } else {
        let newLayout = removeOldMeta(layoutContent);
        // add helper import if missing
        if (!newLayout.includes('generateSEOMetadata')) {
          newLayout = "import { generateSEOMetadata } from '@/lib/seo/metadata';\n" + newLayout;
        }
        // inject meta
        let lines = newLayout.split('\n');
        let lastImportIndex = -1;
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].startsWith('import ')) lastImportIndex = i;
        }
        lines.splice(lastImportIndex + 1, 0, '\n' + metaCode.replace("import { generateSEOMetadata } from '@/lib/seo/metadata';\n\n", ""));
        fs.writeFileSync(layoutFile, lines.join('\n'));
      }
    } else {
      let newContent = removeOldMeta(content);
      if (!newContent.includes('generateSEOMetadata')) {
        newContent = "import { generateSEOMetadata } from '@/lib/seo/metadata';\n" + newContent;
      }
      let lines = newContent.split('\n');
      let lastImportIndex = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('import ')) lastImportIndex = i;
      }
      lines.splice(lastImportIndex + 1, 0, '\n' + metaCode.replace("import { generateSEOMetadata } from '@/lib/seo/metadata';\n\n", ""));
      fs.writeFileSync(file, lines.join('\n'));
    }
  } else {
    let metaCode = `import { generateSEOMetadata } from '@/lib/seo/metadata';\n\nexport const metadata = generateSEOMetadata({\n  title: "${title}",\n  description: "${desc}",\n  path: "${relativePath}"\n});\n`;
    
    if (isClient) {
      if (!hasLayout) {
        fs.writeFileSync(layoutFile, `${metaCode}\nexport default function Layout({ children }) {\n  return <>{children}</>;\n}\n`);
      } else {
        let newLayout = removeOldMeta(layoutContent);
        if (!newLayout.includes('generateSEOMetadata')) {
          newLayout = "import { generateSEOMetadata } from '@/lib/seo/metadata';\n" + newLayout;
        }
        let lines = newLayout.split('\n');
        let lastImportIndex = -1;
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].startsWith('import ')) lastImportIndex = i;
        }
        lines.splice(lastImportIndex + 1, 0, '\n' + metaCode.replace("import { generateSEOMetadata } from '@/lib/seo/metadata';\n\n", ""));
        fs.writeFileSync(layoutFile, lines.join('\n'));
      }
    } else {
      let newContent = removeOldMeta(content);
      if (!newContent.includes('generateSEOMetadata')) {
        newContent = "import { generateSEOMetadata } from '@/lib/seo/metadata';\n" + newContent;
      }
      let lines = newContent.split('\n');
      let lastImportIndex = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('import ')) lastImportIndex = i;
      }
      lines.splice(lastImportIndex + 1, 0, '\n' + metaCode.replace("import { generateSEOMetadata } from '@/lib/seo/metadata';\n\n", ""));
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
