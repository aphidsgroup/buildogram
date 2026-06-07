const fs = require('fs');
const path = require('path');

const filesToFix = [
  { path: 'src/app/compare/[slug]/page.js', param: 'slug' },
  { path: 'src/app/faqs/[category]/page.js', param: 'category' },
  { path: 'src/app/glossary/[term]/page.js', param: 'term' },
  { path: 'src/app/guides/[slug]/page.js', param: 'slug' },
  { path: 'src/app/services/[slug]/page.js', param: 'slug' }
];

filesToFix.forEach(({ path: filePath, param }) => {
  const fullPath = path.join(__dirname, '..', filePath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Fix generateMetadata
    content = content.replace(
      /export async function generateMetadata\(\{ params \}\) \{\s*const \w+ = \w+Map\[params\.\w+\];/g,
      (match) => match.replace(`params.${param}`, `(await params).${param}`)
    );
    // There are some where it's not a map
    content = content.replace(
      /export async function generateMetadata\(\{ params \}\) \{\s*const \w+ = \w+\.find\(\(\w+\) => \w+\.\w+ === params\.\w+\);/g,
      (match) => match.replace(`params.${param}`, `(await params).${param}`)
    );

    // Fix Page component
    content = content.replace(
      /export default function \w+\(\{ params \}\) \{\s*const \w+ = \w+Map\[params\.\w+\];/g,
      (match) => match.replace('export default function', 'export default async function').replace(`params.${param}`, `(await params).${param}`)
    );
    content = content.replace(
      /export default function \w+\(\{ params \}\) \{\s*const \w+ = \w+\.find\(\(\w+\) => \w+\.\w+ === params\.\w+\);/g,
      (match) => match.replace('export default function', 'export default async function').replace(`params.${param}`, `(await params).${param}`)
    );

    // Some specific ones where it's used elsewhere
    content = content.replace(/params\.category/g, '(await params).category');
    content = content.replace(/params\.slug/g, '(await params).slug');
    content = content.replace(/params\.term/g, '(await params).term');

    fs.writeFileSync(fullPath, content);
    console.log('Fixed', filePath);
  }
});
