import fs from 'fs';
import path from 'path';

const TERMS = ['IS code', 'Indian Standard', 'NBC', 'CMDA', 'DTCP', 'CAPWAP', 'pile-load testing', 'NDT', 'soil testing', 'structural audit', 'UPV', 'rebound hammer', 'core cutting', 'DGPS', 'plate-load testing'];

const DIRECTORY = 'C:/Users/Kawinfinite PC 32/Downloads/Buildogram/buildogram-app/src';

const results = [];

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      const content = fs.readFileSync(filePath, 'utf-8');
      for (const term of TERMS) {
        if (content.toLowerCase().includes(term.toLowerCase())) {
          // Find the line containing the term
          const lines = content.split('\n');
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].toLowerCase().includes(term.toLowerCase())) {
              let url = filePath.replace(/\\/g, '/').split('/src/app')[1] || filePath;
              url = url.replace('/page.js', '').replace('/layout.js', '') || '/';
              
              // Remove commas to not break CSV
              const claim = lines[i].replace(/"/g, '""').trim();
              
              results.push({
                URL: url,
                claim: `"${claim}"`,
                standard: term,
                'standard edition': 'Unknown',
                source: 'Codebase',
                reviewer: 'Pending Review',
                'review date': '',
                status: 'Unverified',
                risk: 'High',
                'required action': 'Needs Engineering Sign-off'
              });
              break; // Only capture first occurrence per file per term to avoid massive CSV
            }
          }
        }
      }
    }
  }
}

walkDir(DIRECTORY);

const csvHeader = 'URL,claim,standard,standard edition,source,reviewer,review date,status,risk,required action\n';
const csvRows = results.map(r => `${r.URL},${r.claim},${r.standard},${r['standard edition']},${r.source},${r.reviewer},${r['review date']},${r.status},${r.risk},${r['required action']}`).join('\n');

fs.writeFileSync('docs/seo-aeo-geo/technical-claims-register.csv', csvHeader + csvRows);
console.log('Technical claims register generated.');
