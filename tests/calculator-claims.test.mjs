import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';

/**
 * Guard: unverified third-party rate-source claims must not appear in
 * indexable metadata or above-the-fold marketing copy.
 *
 * Policy (owner, 2026-07-26): a dated third-party schedule of rates may only be
 * named where the repository substantiates it — full source name, source
 * document, publication date, rate table, lawful citation basis, visible
 * page-level citation, and a methodology + limitation statement.
 *
 * Current position: the rate table (src/lib/boq-calc/rates.js) and the unit
 * conversions (src/lib/boq-calc/units.js) DO document COCENA Issue 35 (Dec 2025)
 * per line item, and the calculator carries a visible on-page citation with
 * limitations. The source document itself and the citation basis are NOT in the
 * repository. Therefore the claim is permitted in the engine's provenance
 * comments and in the visible, qualified on-page disclaimer — and prohibited in
 * <title>, <meta>, Open Graph, Twitter cards and hero badges, where it cannot
 * be qualified.
 */

const SOURCE_CLAIM = /\bcocena\b|\bdec(ember)?\s*2025\s+rates?\b|\b2025\s+schedule\s+of\s+rates\b/i;

const METADATA_FILES = [
  'src/app/boq-calculator/layout.js',
  'src/app/ai-tools/page.js',
];

const PROHIBITED_ABSOLUTE = /\bofficial\s+rates?\b|\bgovernment[- ]approved\s+rates?\b|\blive\s+rates?\b|\bcurrent\s+guaranteed\s+rates?\b/i;

test('calculator metadata carries no unverified rate-source claim', () => {
  const bad = [];
  for (const f of METADATA_FILES) {
    const text = fs.readFileSync(f, 'utf8');
    for (const m of text.matchAll(new RegExp(SOURCE_CLAIM.source, 'gi'))) {
      bad.push(`${f}:${text.slice(0, m.index).split('\n').length}  <<${m[0]}>>`);
    }
  }
  assert.strictEqual(
    bad.length, 0,
    `\nUnverified rate-source claim in metadata (${bad.length}):\n  ${bad.join('\n  ')}\n\n` +
      'Metadata cannot carry a qualification. Move the citation to the visible page,\n' +
      'or add the source document and citation basis to the repository first.\n'
  );
});

test('calculator does not claim official, government, live or guaranteed rates', () => {
  const bad = [];
  for (const f of [...METADATA_FILES, 'src/app/boq-calculator/page.js']) {
    const text = fs.readFileSync(f, 'utf8');
    for (const m of text.matchAll(new RegExp(PROHIBITED_ABSOLUTE.source, 'gi'))) {
      bad.push(`${f}:${text.slice(0, m.index).split('\n').length}  <<${m[0]}>>`);
    }
  }
  assert.strictEqual(bad.length, 0, `\nProhibited rate claim:\n  ${bad.join('\n  ')}\n`);
});

test('calculator page states the required limitations', () => {
  const text = fs.readFileSync('src/app/boq-calculator/page.js', 'utf8');
  for (const required of [
    /indicative estimate/i,
    /not an official schedule of rates/i,
    /does not replace a project-specific BOQ/i,
    /vary with specification, locality, supplier, labour, GST and transport/i,
  ]) {
    assert.ok(required.test(text), `missing required limitation statement: ${required}`);
  }
});
