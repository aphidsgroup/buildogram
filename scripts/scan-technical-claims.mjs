import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const TERMS = ['IS code', 'Indian Standard', 'NBC', 'CMDA', 'DTCP', 'CAPWAP', 'pile-load testing', 'NDT', 'soil testing', 'structural audit', 'UPV', 'rebound hammer', 'core cutting', 'DGPS', 'plate-load testing'];

// Resolve paths from the repo root so the scanner runs on any machine/OS and from any cwd.
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIRECTORY = path.join(ROOT, 'src');
const OUTPUT = path.join(ROOT, 'docs/seo-aeo-geo/technical-claims-register.csv');

// App Router files map to their route; anything else is reported by repo-relative path
// (never an absolute, machine-specific path).
export function toLocation(filePath, root) {
  const rel = path.relative(path.dirname(root), filePath).replace(/\\/g, '/');
  if (!rel.startsWith('src/app/')) return rel;
  return rel.slice('src/app'.length).replace(/\/(page|layout)\.jsx?$/, '') || '/';
}

export function walkDir(dir, results = [], root = dir) {
  const files = fs.readdirSync(dir).sort();
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath, results, root);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      const content = fs.readFileSync(filePath, 'utf-8');
      for (const term of TERMS) {
        if (content.toLowerCase().includes(term.toLowerCase())) {
          // Find the line containing the term
          const lines = content.split('\n');
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].toLowerCase().includes(term.toLowerCase())) {
              const url = toLocation(filePath, root);
              
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
  return results;
}

export function toCsv(results) {
  const csvHeader = 'URL,claim,standard,standard edition,source,reviewer,review date,status,risk,required action\n';
  const csvRows = results.map(r => `${r.URL},${r.claim},${r.standard},${r['standard edition']},${r.source},${r.reviewer},${r['review date']},${r.status},${r.risk},${r['required action']}`).join('\n');

  return csvHeader + csvRows;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const results = walkDir(DIRECTORY);
  fs.writeFileSync(OUTPUT, toCsv(results));
  console.log(`Technical claims register generated: ${results.length} claims from ${path.relative(ROOT, DIRECTORY)}/`);
}
