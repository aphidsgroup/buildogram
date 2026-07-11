/**
 * fix-icons.js
 * Replaces broken emoji icon strings in serviceHubs.js with Lucide icon key names.
 * Run: node fix-icons.js
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/seo/serviceHubs.js');
let content = fs.readFileSync(filePath, 'utf8');

// Map broken unicode sequences to Lucide icon key names
// These are the actual byte sequences that got double-encoded
const replacements = [
  // Design / Plan
  [/icon:\s*'[^']*?Design[^']*'/g, "icon: 'design'"],
  [/icon:\s*'[^']*?BOQ[^']*'/g, "icon: 'boq'"],
  [/icon:\s*'[^']*?Material[^']*'/g, "icon: 'material'"],
  [/icon:\s*'[^']*?Site[^']*'/g, "icon: 'supervision'"],
  [/icon:\s*'[^']*?Structural[^']*'/g, "icon: 'audit'"],
  [/icon:\s*'[^']*?Handover[^']*'/g, "icon: 'handover'"],
];

// Primary fix: match icon: 'ANYTHING_NOT_ASCII_LOWERCASE_DASH'
// and replace broken multibyte emoji sequences with building fallback
content = content.replace(/icon:\s*'([^']*)'/g, (match, iconVal) => {
  // If it's already a clean ASCII key name, keep it
  if (/^[a-z][a-z0-9-]*$/.test(iconVal)) return match;
  
  // Map broken emoji bytes to semantic icon names based on context
  // We use the hex codes of the broken multibyte sequences
  const code = Buffer.from(iconVal, 'utf8').toString('hex').substring(0, 8);
  
  // Common broken emoji patterns -> icon names
  const emojiMap = {
    // 📐 ruler/design
    'f09f9490': 'design',    // 📐
    // 📋 clipboard/boq  
    'f09f938b': 'boq',       // 📋
    // 🏗️ construction/material
    'f09f9797': 'material',  // 🏗️
    // 🔍 supervision/search
    'f09f948d': 'supervision', // 🔍
    // 🏠 home/audit
    'f09f9fa0': 'audit',     // 🏠
    // 📁 file/handover  
    'f09f9381': 'handover',  // 📁
    // 🔎 magnifying/search
    'f09f948e': 'search',    // 🔎
    // 📊 chart
    'f09f938a': 'chart',     // 📊
    // ⚙️ settings
    'e29990':   'settings',  // ⚙️
    // 🧪 flask/lab
    'f09fa7aa': 'flask',     // 🧪
    // ⚠️ alert/warning  
    'e29aa0':   'alert',     // ⚠️
    // 📸 camera
    'f09f9398': 'camera',    // 📸
    // 🏭 factory  
    'f09f9fad': 'factory',   // 🏭
    // 🔩 bolt/wrench
    'f09f94a9': 'wrench',    // 🔩
    // 🎨 palette/pen
    'f09f8ea8': 'pen',       // 🎨
    // 🧱 brick
    'f09fa7b1': 'brick',     // 🧱
    // 🏗 building/construction
    'f09f9797': 'material',  // 🏗
    // default
  };
  
  // Try to find matching pattern
  for (const [hex, name] of Object.entries(emojiMap)) {
    if (code.startsWith(hex)) return `icon: '${name}'`;
  }
  
  // Last resort: look at surrounding context already replaced, use building
  return "icon: 'building'";
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done! Checking results:');
const lines = content.split('\n').filter(l => l.includes("icon:") && l.includes("whatWeDo") === false);
const iconLines = content.split('\n').filter(l => l.trim().startsWith("{ icon:"));
iconLines.slice(0, 20).forEach(l => console.log(l.trim()));
