import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { walkDir, toCsv } from '../scripts/scan-technical-claims.mjs';

function makeFixture(files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'claims-scan-'));
  for (const [rel, content] of Object.entries(files)) {
    const full = path.join(root, rel);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, content);
  }
  return root;
}

test('scanner source has no machine-specific absolute paths', () => {
  const src = fs.readFileSync(new URL('../scripts/scan-technical-claims.mjs', import.meta.url), 'utf8');
  assert.doesNotMatch(src, /[A-Za-z]:[\\/]/);
  assert.doesNotMatch(src, /\/Users\//);
});

test('flags technical terms with app route or repo-relative path as URL', () => {
  const root = makeFixture({
    'src/app/page.js': "export const x = 'Follows IS code guidance';\n",
    'src/app/services/ndt/page.jsx': "const a = 'plain';\nconst b = 'NDT testing \"on site\"';\n",
    'src/app/clean/page.js': "export const x = 'no claims here';\n",
    'src/app/notes.md': 'NDT in markdown is ignored',
    'src/components/Cta.jsx': "const t = 'Book Structural Audit';\n",
  });
  try {
    const results = walkDir(path.join(root, 'src'));
    assert.deepEqual(
      results.map((r) => [r.URL, r.standard]),
      [['/', 'IS code'], ['/services/ndt', 'NDT'], ['src/components/Cta.jsx', 'structural audit']],
    );
    assert.equal(results[1].claim, '"const b = \'NDT testing ""on site""\';"');
    assert.equal(results[1].status, 'Unverified');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('toCsv emits the register header and one row per claim', () => {
  const csv = toCsv([
    {
      URL: '/about', claim: '"x"', standard: 'NDT', 'standard edition': 'Unknown', source: 'Codebase',
      reviewer: 'Pending Review', 'review date': '', status: 'Unverified', risk: 'High',
      'required action': 'Needs Engineering Sign-off',
    },
  ]);
  const lines = csv.split('\n');
  assert.equal(lines[0], 'URL,claim,standard,standard edition,source,reviewer,review date,status,risk,required action');
  assert.equal(lines[1], '/about,"x",NDT,Unknown,Codebase,Pending Review,,Unverified,High,Needs Engineering Sign-off');
  assert.equal(lines.length, 2);
});
