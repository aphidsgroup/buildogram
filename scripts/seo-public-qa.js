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

let classifications = {
  public_indexable: [],
  public_noindex: [],
  private_ignored: []
};

let results = {
  missingH1: [],
  missingCanonical: [],
  missingMetaDesc: [],
  missingJSONLD: [],
  thinContent: [],
  duplicateTitle: [],
  duplicateDesc: []
};

let seenTitles = new Map();
let seenDescs = new Map();

allFiles.forEach(file => {
  let relativePath = file.replace(baseDir, '').replace(/\\/g, '/').replace('/page.js', '') || '/';
  
  if (privatePrefixes.some(p => relativePath.startsWith(p))) {
    classifications.private_ignored.push(relativePath);
    return; // Skip private pages
  }
  
  let content = fs.readFileSync(file, 'utf8');
  let layoutFile = file.replace('page.js', 'layout.js');
  let layoutContent = fs.existsSync(layoutFile) ? fs.readFileSync(layoutFile, 'utf8') : '';
  
  const isNoIndex = /robots.*noindex/i.test(content) || /robots.*noindex/i.test(layoutContent) || relativePath.includes('/print');
  if (isNoIndex) {
    classifications.public_noindex.push(relativePath);
    return; // Skip checking missing SEO tags for noindex pages
  } else {
    classifications.public_indexable.push(relativePath);
  }

  // 1. Missing H1
  const hasH1 = /<h1/i.test(content) || /heroTitle=/i.test(content) || /title=/i.test(content) || /<PublicServicePage/i.test(content);
  if (!hasH1 && !relativePath.includes('[')) results.missingH1.push(relativePath);
  
  // 2. Missing Canonical (Check both page and layout)
  const hasCanonical = /alternates:\s*\{\s*canonical/i.test(content) || /generateSEOMetadata/i.test(content) || /alternates:\s*\{\s*canonical/i.test(layoutContent) || /generateSEOMetadata/i.test(layoutContent);
  if (!hasCanonical) results.missingCanonical.push(relativePath);
  
  // 3. Missing Meta Description
  const hasDesc = /description:\s*['"`]/i.test(content) || /generateSEOMetadata/i.test(content) || /description:\s*['"`]/i.test(layoutContent) || /generateSEOMetadata/i.test(layoutContent);
  if (!hasDesc) results.missingMetaDesc.push(relativePath);
  
  // 4. Missing JSON-LD
  const hasJsonLd = /<script\s+type=['"]application\/ld\+json['"]/i.test(content) || /BreadcrumbSchema/i.test(content) || /generateSEOMetadata/i.test(content) || /generateSEOMetadata/i.test(layoutContent);
  if (!hasJsonLd) results.missingJSONLD.push(relativePath);
  
  // 5. Thin Content
  if (content.length < 500 && !relativePath.includes('[')) results.thinContent.push(relativePath);
  
  let pageTitleMatch = content.match(/(?:title|heroTitle):\s*['"`](.*?)['"`]/);
  let layoutTitleMatch = layoutContent.match(/title:\s*['"`](.*?)['"`]/);
  const titleMatch = pageTitleMatch || layoutTitleMatch;
  if (titleMatch) {
    let t = titleMatch[1];
    if (seenTitles.has(t)) {
      results.duplicateTitle.push(`${relativePath} (dupe of ${seenTitles.get(t)})`);
    } else {
      seenTitles.set(t, relativePath);
    }
  }
  
  const descMatch = content.match(/description:\s*['"`](.*?)['"`]/) || layoutContent.match(/description:\s*['"`](.*?)['"`]/);
  if (descMatch) {
    let d = descMatch[1];
    if (seenDescs.has(d)) {
      results.duplicateDesc.push(`${relativePath} (dupe of ${seenDescs.get(d)})`);
    } else {
      seenDescs.set(d, relativePath);
    }
  }
});

const report = `# SEO_PUBLIC_QA_REPORT

**Generated:** ${new Date().toISOString()}

## Classification Summary
- **public_indexable:** ${classifications.public_indexable.length}
- **public_noindex:** ${classifications.public_noindex.length}
- **private_ignored:** ${classifications.private_ignored.length}

---

## public_indexable pages missing elements:

### 1. Missing H1 Tags (${results.missingH1.length})
${results.missingH1.map(p => '- ' + p).join('\n')}

### 2. Missing Canonical URLs (${results.missingCanonical.length})
${results.missingCanonical.map(p => '- ' + p).join('\n')}

### 3. Missing Meta Descriptions (${results.missingMetaDesc.length})
${results.missingMetaDesc.map(p => '- ' + p).join('\n')}

### 4. Missing JSON-LD Schema (${results.missingJSONLD.length})
${results.missingJSONLD.map(p => '- ' + p).join('\n')}

### 5. Thin Content Warning (${results.thinContent.length})
${results.thinContent.map(p => '- ' + p).join('\n')}

### 6. Duplicate Titles (${results.duplicateTitle.length})
${results.duplicateTitle.map(p => '- ' + p).join('\n')}

### 7. Duplicate Meta Descriptions (${results.duplicateDesc.length})
${results.duplicateDesc.map(p => '- ' + p).join('\n')}
`;

fs.writeFileSync(path.join(__dirname, '../SEO_PUBLIC_QA_REPORT.md'), report);
console.log('Generated updated SEO_PUBLIC_QA_REPORT.md');
