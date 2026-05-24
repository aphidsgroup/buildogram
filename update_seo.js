const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://buildogram.in';

function processFile(filePath, type, slugVarName, titleVarName) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Add alternates: { canonical: ... }
  if (!content.includes('alternates:')) {
    const metaRegex = /(return \{[\s\S]*?)(title:\s*[^,]+,)([\s\S]*?)(\};)/;
    content = content.replace(metaRegex, (match, p1, p2, p3, p4) => {
      // Avoid adding multiple times
      if (match.includes('alternates:')) return match;
      return `${p1}${p2}${p3}    alternates: { canonical: \`${BASE_URL}/${type}/\${${slugVarName}}\` },\n  ${p4}`;
    });
  }

  // Add Breadcrumb schema function
  if (!content.includes('BreadcrumbList')) {
    const breadcrumbFunc = `
const breadcrumbSchema = (itemData) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: '${BASE_URL}' },
    { '@type': 'ListItem', position: 2, name: '${type.charAt(0).toUpperCase() + type.slice(1)}', item: '${BASE_URL}/${type}' },
    { '@type': 'ListItem', position: 3, name: itemData.${titleVarName}, item: \`${BASE_URL}/${type}/\${itemData.${slugVarName}}\` },
  ],
});
`;
    // Insert before default export
    content = content.replace('export default function ', breadcrumbFunc + '\nexport default function ');
  }

  // Inject Breadcrumb script tag inside return (<>)
  if (!content.includes('breadcrumbSchema(')) {
    const objVarMap = {
      'services': 'svc',
      'guides': 'guide',
      'glossary': 'term',
      'materials': 'mat',
      'faqs': 'cat',
      'compare': 'comp'
    };
    const objVar = objVarMap[type] || 'itemData'; // handle localities separately maybe
    
    // Replace the first <script type="application/ld+json" ... /> with it + breadcrumb
    // or insert right after <>
    content = content.replace(/(<\s*>\s*)/, `$1\n      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(${objVar})) }} />\n`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
}

// Handle Localities uniquely
function processLocality(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('alternates:')) {
    const metaRegex = /(return \{[\s\S]*?)(title:\s*[^,]+,)([\s\S]*?)(\};)/;
    content = content.replace(metaRegex, (match, p1, p2, p3, p4) => {
      if (match.includes('alternates:')) return match;
      return `${p1}${p2}${p3}    alternates: { canonical: \`${BASE_URL}/locations/chennai/\${loc.slug}\` },\n  ${p4}`;
    });
  }
  if (!content.includes('BreadcrumbList')) {
    const breadcrumbFunc = `
const breadcrumbSchema = (loc) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: '${BASE_URL}' },
    { '@type': 'ListItem', position: 2, name: 'Locations', item: '${BASE_URL}/locations/chennai' },
    { '@type': 'ListItem', position: 3, name: loc.name, item: \`${BASE_URL}/locations/chennai/\${loc.slug}\` },
  ],
});
`;
    content = content.replace('export default function ', breadcrumbFunc + '\nexport default function ');
  }
  if (!content.includes('breadcrumbSchema(loc)')) {
    content = content.replace(/(<\s*>\s*)/, `$1\n      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(loc)) }} />\n`);
  }
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated Locality ${filePath}`);
}

const baseDir = path.join(__dirname, 'src', 'app');

processFile(path.join(baseDir, 'services', '[slug]', 'page.js'), 'services', 'svc.slug', 'svc.title');
processFile(path.join(baseDir, 'guides', '[slug]', 'page.js'), 'guides', 'guide.slug', 'guide.title');
processFile(path.join(baseDir, 'glossary', '[term]', 'page.js'), 'glossary', 'term.slug', 'term.term');
processFile(path.join(baseDir, 'materials', '[slug]', 'page.js'), 'materials', 'mat.slug', 'mat.name');
processFile(path.join(baseDir, 'faqs', '[category]', 'page.js'), 'faqs', 'cat.slug', 'cat.title');
processFile(path.join(baseDir, 'compare', '[slug]', 'page.js'), 'compare', 'comp.slug', 'comp.title');
processLocality(path.join(baseDir, 'locations', 'chennai', '[locality]', 'page.js'));

// Fix guide sidebar
let guideFile = path.join(baseDir, 'guides', '[slug]', 'page.js');
let guideContent = fs.readFileSync(guideFile, 'utf8');
guideContent = guideContent.replace(
  "display: 'none'",
  "display: 'block'"
);
guideContent = guideContent.replace(
  "<aside style={{",
  "<aside className=\"hide-on-mobile\" style={{"
);
fs.writeFileSync(guideFile, guideContent, 'utf8');

// Fix Layout.js to add Organization schema
let layoutFile = path.join(baseDir, 'layout.js');
let layoutContent = fs.readFileSync(layoutFile, 'utf8');
if (!layoutContent.includes('Organization')) {
  const orgSchema = `
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Buildogram',
  url: 'https://buildogram.in',
  logo: 'https://buildogram.in/globe.svg',
  description: 'Build your dream home in Chennai with PhD-grade structural engineering and 100% transparent BOQ pricing.',
};
`;
  layoutContent = layoutContent.replace('export default function ', orgSchema + '\nexport default function ');
  
  layoutContent = layoutContent.replace(
    /<\/body>/, 
    `  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />\n      </body>`
  );
  fs.writeFileSync(layoutFile, layoutContent, 'utf8');
  console.log('Updated Layout');
}
