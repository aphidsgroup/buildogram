import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Buildogram claim guard — three tiers, per owner policy (2026-07-26).
 *
 *   HARD_FAIL  Prohibited unless documentary proof is on file. Fails the build.
 *   WARN       Permitted in principle, but the fulfilment workflow is not yet
 *              documented (OV02-R1). Printed; does not fail.
 *   (allowed)  Owner-confirmed. Not checked.
 *
 * Scope: public source only. Internal ops/admin/client/partner/supplier/api are
 * excluded — not indexable, different vocabulary ("LOWEST PRICE" is a sort label
 * in admin/quotations).
 *
 * Allowlist: legal disclaimers are not claims. "cannot be guaranteed" in
 * terms/page.js must never be flagged.
 *
 * Confirmed decisions encoded here — do NOT re-add these as banned:
 *   OV01    2026-07-26  engineers employed in-house  -> "our engineers" allowed
 *   OV02-R1 2026-07-26  Buildogram sells materials   -> "we supply" allowed
 *   C5      2026-07-26  free consultation accurate   -> allowed
 */

const HARD_FAIL = [
  /\bauthoris?zed\s+distributor\b/,
  /\bauthoris?zed\s+dealer\b/,
  /\bofficial\s+distributor\b/,
  /\bofficial\s+dealer\b/,
  /\bguaranteed\s+lowest\s+price\b/,
  /\blowest\s+price\s+guarantee/,
  /\bguaranteed\s+delivery\b/,
  /\bofficial\s+market\s+price\b/,
  /\bofficial\s+chennai\s+price\b/,
  /\bverified\s+(supplier|contractor|partner|builder|architect|professional)s?\b/,
  /\bbuildogram\s+verified\b/,
  /\bverified,\s*stress-free\b/,
  /\b(vetted|hand-?picked)\b/,
  /\bthe\s+best\s+(architect|builder|contractor)/,
  /\blive\s+(price|rate)s?\b/,
];

const WARN = [
  /\bwe\s+deliver\b/,
  /\bsame-?day\s+delivery\b/,
  /\bdirect\s+delivery\b/,
  /\bstock\s+available\b/,
  /\binventory\s+available\b/,
  /\bwholesale\s+supply\b/,
  /\bbulk\s+supply\b/,
];

const ALLOWLIST = /cannot be guaranteed|not guaranteed|are market estimates|disputes are guaranteed/gi;
// partnerStore.js holds demo-* fixtures only. P0 blocks demo-* from the directory,
// both partner APIs, profile pages and the sitemap, so nothing in it is publishable.
// TODO: delete the fixture once partnerApi.js no longer falls back to it.
const INTERNAL = /^src[\\/](app[\\/](ops|admin|client|partner|supplier|project|api)[\\/]|lib[\\/](services|content)[\\/]|lib[\\/]partnerStore\.js)/;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(js|jsx|mjs)$/.test(e.name)) out.push(p);
  }
  return out;
}

function scan(patterns) {
  const hits = [];
  for (const file of walk('src')) {
    if (INTERNAL.test(file)) continue;
    const rel = file.replace(/\\/g, '/');
    const text = fs.readFileSync(file, 'utf8');
    const safe = [...text.matchAll(ALLOWLIST)].map((m) => m.index);
    for (const re of patterns) {
      for (const m of text.matchAll(new RegExp(re.source, 'gi'))) {
        if (safe.some((s) => Math.abs(s - m.index) < 50)) continue;
        hits.push(`${rel}:${text.slice(0, m.index).split('\n').length}  <<${m[0].trim()}>>`);
      }
    }
  }
  return hits;
}

test('HARD FAIL - prohibited claims must not appear in public source', () => {
  const hits = scan(HARD_FAIL);
  assert.strictEqual(
    hits.length,
    0,
    `\nProhibited claims found (${hits.length}):\n  ${hits.join('\n  ')}\n\n` +
      'These need documentary proof on file. Remove them, or record the evidence in\n' +
      'seo-growth/market-domination/OV02-R1-materials-model-revision.md first.\n'
  );
});

test('WARN - fulfilment claims pending OV02-R1 workflow documentation', () => {
  const hits = scan(WARN);
  if (hits.length) {
    console.warn(
      `\n  PENDING_R1 - ${hits.length} fulfilment claim(s) live without a documented workflow:\n    ` +
        hits.join('\n    ') +
        '\n  Permitted by the owner; confirm delivery responsibility in OV02-R1 (R1.4).\n'
    );
  }
  assert.ok(true);
});
