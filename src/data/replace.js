const fs = require('fs');
const path = require('path');

const files = [
  'seo/comparisons.js',
  'seo/glossary.js',
  'seo/localServices.js',
  'seo/services.js',
  'services.js'
];

const replacements = [
  { regex: /10-year warranty/gi, replacement: '10-Year Partner-Backed Structural Warranty' },
  { regex: /zero cost overrun/gi, replacement: 'Itemized Variation Tracking & Cost Protection' },
  { regex: /guaranteed cost/gi, replacement: 'Transparent Cost Estimation' },
  { regex: /Buildogram contractor/gi, replacement: 'Verified Execution Partner' },
  { regex: /one contract/gi, replacement: 'Coordinated Execution Contracts' },
  { regex: /turnkey execution/gi, replacement: 'End-to-End Coordination' },
  { regex: /complete responsibility/gi, replacement: 'End-to-End Coordination' },
  { regex: /guaranteed quality/gi, replacement: 'Stage-Wise Quality Monitoring' },
  { regex: /lifetime guarantee/gi, replacement: 'Partner-Backed Warranty' },
  { regex: /defect-free/gi, replacement: 'Quality-Monitored' },
  { regex: /full-time supervision/gi, replacement: 'Stage-Wise Observations' }
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    replacements.forEach(({ regex, replacement }) => {
      content = content.replace(regex, replacement);
    });

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file}`);
    } else {
      console.log(`No changes needed for ${file}`);
    }
  } else {
    console.error(`File not found: ${filePath}`);
  }
});
