const fs = require('fs');
const path = require('path');

const faqsPath = path.join(__dirname, '../src/app/faqs/[category]/page.js');
if (fs.existsSync(faqsPath)) {
  let content = fs.readFileSync(faqsPath, 'utf8');
  content = content.replace(/itemData\.cat\.title/g, 'itemData.title');
  content = content.replace(/itemData\.cat\.slug/g, 'itemData.slug');
  fs.writeFileSync(faqsPath, content);
}

const comparePath = path.join(__dirname, '../src/app/compare/[slug]/page.js');
if (fs.existsSync(comparePath)) {
  let content = fs.readFileSync(comparePath, 'utf8');
  content = content.replace(/itemData\.comp\.title/g, 'itemData.title');
  content = content.replace(/itemData\.comp\.slug/g, 'itemData.slug');
  fs.writeFileSync(comparePath, content);
}

console.log('Fixed breadcrumbSchema bugs');
