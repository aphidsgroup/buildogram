const fs = require('fs');
const path = require('path');

const globalsPath = path.join(__dirname, '../src/app/globals.css');
let globals = fs.readFileSync(globalsPath, 'utf8');

// Add responsive text alignment classes if they don't exist
if (!globals.includes('.md\\:text-left')) {
  globals = globals.replace(
    /(\/\* Tablet\/Desktop Breakpoint \(md: >= 768px\) \*\/[\s\S]*?{)/,
    `$1\n  .md\\:text-left { text-align: left; }\n  .md\\:text-center { text-align: center; }`
  );
  globals = globals.replace(
    /(\/\* Desktop Breakpoint \(sm: >= 640px\) \*\/[\s\S]*?{)/,
    `$1\n  .sm\\:text-left { text-align: left; }\n  .sm\\:text-center { text-align: center; }`
  );
  fs.writeFileSync(globalsPath, globals, 'utf8');
}

const pagePath = path.join(__dirname, '../src/app/page.js');
let content = fs.readFileSync(pagePath, 'utf8');

// Center hero content on mobile
content = content.replace(
  /<div style={{ maxWidth: '760px' }}>/g,
  `<div className="text-center md:text-left mx-auto md:mx-0" style={{ maxWidth: '760px' }}>`
);

// Center the pill badge in hero on mobile
content = content.replace(
  /<div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba\(255,218,1,0\.1\)', border: '1px solid rgba\(255,218,1,0\.25\)', borderRadius: '999px', padding: '8px 20px', marginBottom: '32px' }}>/g,
  `<div className="inline-flex mx-auto md:mx-0" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,218,1,0.1)', border: '1px solid rgba(255,218,1,0.25)', borderRadius: '999px', padding: '8px 20px', marginBottom: '32px' }}>`
);

// Fix stats centering in hero
content = content.replace(
  /<div className="flex flex-wrap gap-6 sm:gap-10">/g,
  `<div className="flex flex-wrap gap-6 sm:gap-10 justify-center md:justify-start">`
);

// Ensure the Ecosystem Strip doesn't cause overflow
// "container overflow-x-auto w-full"
content = content.replace(
  /className="container overflow-x-auto w-full"/g,
  `className="overflow-x-auto w-full"`
);
// We remove .container from the Ecosystem Strip on mobile so it goes edge-to-edge and doesn't conflict with paddings

// Fix Build With Proof button row alignment
content = content.replace(
  /<div className="flex flex-col sm:flex-row gap-3 w-full">/g,
  `<div className="flex flex-col sm:flex-row gap-3 w-full justify-center md:justify-start">`
);

// Fix Property Passport text alignment on mobile
content = content.replace(
  /<div>\s*<span className="tag">Property Passport/g,
  `<div className="text-center md:text-left">\n              <span className="tag">Property Passport`
);
content = content.replace(
  /style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}/g,
  `className="text-left" style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}`
);

// Fix Maintenance section text alignment on mobile
content = content.replace(
  /<div>\s*<span className="tag" style={{ background: 'rgba\(255,218,1,0\.12\)'/g,
  `<div className="text-center md:text-left">\n              <span className="tag" style={{ background: 'rgba(255,218,1,0.12)'`
);

// Fix Material Strip text alignment
content = content.replace(
  /<div>\s*<span className="tag">Material Marketplace/g,
  `<div className="text-center md:text-left">\n              <span className="tag">Material Marketplace`
);

fs.writeFileSync(pagePath, content, 'utf8');
console.log('page.js updated for extreme visual audit fixes');
