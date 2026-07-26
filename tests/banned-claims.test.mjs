import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import { globSync } from 'glob';

/**
 * Banned claims regression test — public-facing files only.
 *
 * ALLOWLIST (confirmed accurate — do NOT add to banned list):
 *   C1 (credential): OV01 CONFIRMED 2026-07-26 — Buildogram employs structural engineers.
 *   C4 (seller):     OV02 CONFIRMED 2026-07-26 — Buildogram is a direct seller AND facilitator.
 *   C5 (free):       CONFIRMED 2026-07-26 — free consultation is an accurate pricing claim.
 *
 * BANNED (unconfirmed — must not appear in public-facing files):
 *   C2: verified leads, verified execution, Verified Execution Partner
 *   C3: Buildogram Verified Service, Buildogram Verified Tag, Buildogram verified construction
 *   C6: top-tier (superlative)
 *   C7: guaranteed strength, are guaranteed to withstand
 *   Prior: Turnkey construction, Direct from suppliers, Buy Materials (emoji label)
 */

const INTERNAL_PREFIXES = [
  'src/app/ops/',
  'src/app/admin/',
  'src/app/client/',
  'src/app/partner/',
  'src/app/supplier/',
  'src/app/api/',
  'src/lib/ai-tools/',
  'src/lib/notifications/',
  'src/lib/content/',
];

function isInternal(filePath) {
  const normalized = filePath.replace(/\\/g, '/');
  return INTERNAL_PREFIXES.some(prefix => normalized.includes(prefix));
}

const BANNED_EXACT = [
  'Turnkey construction',
  'Direct from suppliers',
  'Verified architects',
  'Verified suppliers',
  'verified leads',
  'Verified Execution Partner',
  'verified execution',
  'Buildogram Verified Service',
  'Buildogram Verified Tag',
  'Buildogram verified construction ecosystem',
  'top-tier',
  'guaranteed strength',
  'are guaranteed to withstand',
  'Guaranteed strength',
  '🧱 Buy Materials',
];

test('Banned claims (C2/C3/C6/C7) must not appear in public-facing source files', () => {
  const files = globSync('src/**/*.{js,jsx}').filter(f => !isInternal(f));
  const violations = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    for (const banned of BANNED_EXACT) {
      if (content.includes(banned)) {
        violations.push(`${file}: "${banned}"`);
      }
    }
  }

  assert.strictEqual(
    violations.length,
    0,
    `Found ${violations.length} banned claim(s):\n${violations.join('\n')}`
  );
});
