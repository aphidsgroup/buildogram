/**
 * fix-icons-semantic.js
 * Assigns semantic Lucide icon names based on card TITLE text.
 * Run after fix-icons.js has already cleaned up broken emoji.
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/seo/serviceHubs.js');
let content = fs.readFileSync(filePath, 'utf8');

// Map of title keywords → icon key
const TITLE_TO_ICON = {
  'Design Coordination': 'design',
  'BOQ': 'boq',
  'Quote Review': 'boq',
  'Material Sourcing': 'material',
  'Material Verification': 'material',
  'Material Certificate': 'material',
  'Site Supervision': 'supervision',
  'Structural Audit': 'audit',
  'Structural Inspection': 'audit',
  'Structural Health': 'audit',
  'Handover Documentation': 'handover',
  'Handover': 'handover',
  'Visual Inspection': 'search',
  'Crack Mapping': 'chart',
  'Crack Pattern': 'chart',
  'Crack Classification': 'chart',
  'Systematic Crack': 'search',
  'Root Cause': 'lightbulb',
  'Severity Assessment': 'alert',
  'Corrosion': 'thermometer',
  'Settlement': 'mountain',
  'Deflection': 'mountain',
  'NDT Coordination': 'scan',
  'NDT': 'scan',
  'Repair Pathway': 'wrench',
  'Photographic Documentation': 'camera',
  'Photographic': 'camera',
  'Progress Photo': 'camera',
  'PEB': 'factory',
  'Steel Frame': 'factory',
  'Industrial Shed': 'warehouse',
  'Fabrication': 'hammer',
  'Welding': 'hammer',
  'Workshop Assessment': 'settings',
  'MTC Verification': 'file',
  'Surface Treatment': 'layers',
  'Erection Supervision': 'eye',
  'Erection QA': 'eye',
  'Supplier Comparison': 'users',
  'Contractor Shortlisting': 'users',
  'Requirement Mapping': 'ruler',
  'Design Drawing Review': 'design',
  'Drawing Review': 'design',
  'Plan Review': 'design',
  'Soil': 'shovel',
  'Pile': 'drill',
  'Piling': 'drill',
  'Foundation': 'layers',
  'Topographic': 'map',
  'Survey': 'compass',
  'DGPS': 'navigation',
  'Drone': 'camera',
  'Geotechnical': 'shovel',
  'SPT': 'flask',
  'Test': 'flask',
  'Testing': 'flask',
  'Laboratory': 'flask',
  'Rebound Hammer': 'gauge',
  'UPV': 'waves',
  'Rebar Scanning': 'scan',
  'Core Test': 'drill',
  'Dynamic Pile': 'activity',
  'Pile Integrity': 'shield',
  'Pile Load': 'scale',
  'Plate Load': 'scale',
  'BOQ Review': 'boq',
  'Cost Estimation': 'receipt',
  'Cost': 'receipt',
  'Budget': 'receipt',
  'Payment': 'receipt',
  'Quality Check': 'check',
  'Quality System': 'check',
  'Inspection': 'eye',
  'Monitoring': 'activity',
  'Portal': 'dashboard',
  'Report': 'handover',
  'Documentation': 'handover',
  'Property Passport': 'landmark',
  'Property': 'home',
  'Warranty': 'shield',
  'Maintenance': 'wrench',
  'Construction': 'hard-hat',
  'Build': 'hard-hat',
  'Home': 'home',
  'Villa': 'home',
  'Residential': 'home',
  'Commercial': 'building',
  'Renovation': 'hammer',
  'Waterproofing': 'droplets',
  'Flooring': 'layers',
  'Painting': 'pen',
  'Electrical': 'zap',
  'Plumbing': 'waves',
  'Partner': 'users',
  'Contractor': 'hard-hat',
  'Architect': 'design',
  'Procurement': 'truck',
  'Delivery': 'truck',
  'Supply': 'package',
  'Supplier': 'truck',
};

// Replace each { icon: 'building', title: '...' } pattern with semantic icon
content = content.replace(
  /\{ icon: '([^']+)', title: '([^']+)'/g,
  (match, currentIcon, title) => {
    // Find matching keyword
    for (const [keyword, iconName] of Object.entries(TITLE_TO_ICON)) {
      if (title.includes(keyword)) {
        return `{ icon: '${iconName}', title: '${title}'`;
      }
    }
    return match; // keep current if no match
  }
);

fs.writeFileSync(filePath, content, 'utf8');

console.log('Done! Updated icon assignments:');
const iconLines = content.split('\n').filter(l => l.trim().startsWith('{ icon:'));
iconLines.slice(0, 30).forEach(l => {
  const m = l.trim().match(/icon: '([^']+)', title: '([^']+)'/);
  if (m) console.log(`  ${m[2].padEnd(35)} → ${m[1]}`);
});
