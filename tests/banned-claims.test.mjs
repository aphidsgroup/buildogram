import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import { globSync } from 'glob';
import path from 'node:path';

const BANNED_STRINGS = [
  'Turnkey construction',
  'Direct from suppliers',
  'Verified architects',
  'Verified suppliers',
  'Verified, stress-free'
];

test('Banned claims should not be present in the source code', () => {
  const files = globSync('src/**/*.{js,jsx}');
  const violations = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    for (const banned of BANNED_STRINGS) {
      if (content.toLowerCase().includes(banned.toLowerCase())) {
        violations.push("File " + file + " contains banned string: " + banned);
      }
    }
  }

  assert.strictEqual(violations.length, 0, 'Found banned claims:\n' + violations.join('\n'));
});
