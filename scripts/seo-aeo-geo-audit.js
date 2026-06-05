const fs = require('fs');
const path = require('path');

console.log('--- Buildogram SEO, AEO & GEO Local Audit ---');

const checkFile = (filePath, rule, successMsg, failMsg) => {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    if (rule.test(content)) {
      console.log(`✅ ${successMsg}`);
    } else {
      console.log(`❌ ${failMsg}`);
    }
  } else {
    console.log(`❌ File not found: ${filePath}`);
  }
};

// 1. Layout Canonical / metadataBase
checkFile(
  path.join(__dirname, '../src/app/layout.js'),
  /metadataBase:\s*new\s*URL\(['"`]https:\/\/www\.buildogram\.in['"`]\)/,
  'layout.js uses correct www metadataBase.',
  'layout.js is missing or has incorrect metadataBase.'
);

// 2. Sitemap Domain
checkFile(
  path.join(__dirname, '../src/app/sitemap.js'),
  /https:\/\/www\.buildogram\.in/,
  'sitemap.js uses correct www domain.',
  'sitemap.js is missing the www domain.'
);

// 3. Robots Domain
checkFile(
  path.join(__dirname, '../src/app/robots.js'),
  /https:\/\/www\.buildogram\.in\/sitemap\.xml/,
  'robots.js uses correct www sitemap URL.',
  'robots.js is missing the www sitemap URL.'
);

// 4. Check LLMs.txt
if (fs.existsSync(path.join(__dirname, '../public/llms.txt'))) {
  console.log('✅ llms.txt exists.');
} else {
  console.log('❌ llms.txt is missing.');
}

// 5. Check ai-sitemap.txt
if (fs.existsSync(path.join(__dirname, '../public/ai-sitemap.txt'))) {
  console.log('✅ ai-sitemap.txt exists.');
} else {
  console.log('❌ ai-sitemap.txt is missing.');
}

console.log('-----------------------------------------------');
console.log('Audit completed. Ready for production deployment.');
