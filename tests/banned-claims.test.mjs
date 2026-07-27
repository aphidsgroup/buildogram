import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { claimEvidenceRegistry } from '../src/lib/claims/evidenceRegistry.mjs';

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
  /\bauthori[sz]ed\s+distributor\b/,
  /\bauthori[sz]ed\s+dealer\b/,
  /\bbrand-authori[sz]ed\b/,
  /\bofficial\s+distributor\b/,
  /\bofficial\s+dealer\b/,
  /\bguaranteed\s+lowest\s+price\b/,
  /\blowest\s+price\s+guarantee/,
  /\bguaranteed\s+delivery\b/,
  /\bofficial\s+market\s+price\b/,
  /\bofficial\s+chennai\s+price\b/,
  /\bverified\s+(supplier|contractor|partner|builder|architect|professional|material|delivery|rate|outcome|property|rental|profile|lead)s?\b/,
  /\b(engineer[ -]verified|100%[ -]verified)\b/,
  /\b(source|find|compare|connect with|work with|join)\s+verified\b/,
  /\bbuildogram\s+verified\b/,
  /\bverified,\s*stress-free\b/,
  /\b(vetted|vetting|hand-?picked)\b/,
  /\bscreen(ed|ing)\s+(contractor|partner|supplier)s?\b/,
  /\bthe\s+best\s+(architect|builder|contractor)/,
  /\bbest\s+rates?\b/,
  /\blive\s+(price|rate)s?\b/,
  /\bmtc-verified\b/,
  /\bmtc\s+compliance\b/,
  /\bmost\s+homes\s+in\s+chennai\b/,
  /\bproof-backed\b/,
  /\bsource\s+genuine\s+materials\b/,
  /\bverifiable\s+photographic\s+proof\b/,
  /\bengineer-backed\s+(quality\s+sign-offs?|reports?)\b/,
  /\btrusted\s+professionals\b/,
  /\bpassed\s+by\s+er\.\b/,
  /\bofficial\s+certificate\b/,
  /\bregistered\s+is-code\s+compliant\s+guarantee\b/,
  /₹\s*\d+(?:\.\d+)?\s*cr\+/,
  /\b\d{1,3}(?:,\d{3})+\+\s+(project|boq|quote|build)s?\b/,
  /\b\d+\+\s+projects?\s+(monitored|analysed|analyzed)\b/,
  /\b\d+(?:\.\d+)?%\s+(typical|average|avg|clients?|savings?)/,
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

const ALLOWLIST = /cannot be guaranteed|not guaranteed|are market estimates|disputes are guaranteed|an EC is an official certificate/gi;
// partnerStore.js holds demo-* fixtures only. P0 blocks demo-* from the directory,
// both partner APIs, profile pages and the sitemap, so nothing in it is publishable.
// TODO: delete the fixture once partnerApi.js no longer falls back to it.
const INTERNAL = /^src[\\/](app[\\/](ops|admin|client|partner|supplier|project|api)[\\/]|lib[\\/](services|content|claims)[\\/]|lib[\\/]partnerStore\.js)/;

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
  assert.strictEqual(
    hits.length,
    claimEvidenceRegistry.length,
    'Only the four registry-backed PENDING_R1 fulfilment warnings may remain',
  );
});

test('claim evidence registry is narrow, complete and review-dated', () => {
  assert.strictEqual(
    claimEvidenceRegistry.length,
    4,
    'Only the four owner-approved PENDING_R1 fulfilment warnings may remain',
  );

  const requiredKeys = [
    'claimKey',
    'approvedWording',
    'status',
    'evidenceType',
    'sourceReference',
    'owner',
    'lastReviewed',
    'expiresAt',
    'allowedRoutes',
  ];

  for (const entry of claimEvidenceRegistry) {
    for (const key of requiredKeys) {
      assert.ok(entry[key], `${entry.claimKey || 'claim entry'} is missing ${key}`);
    }
    assert.strictEqual(entry.status, 'PENDING_R1');
    assert.match(entry.sourceReference, /^seo-growth\//);
    assert.ok(Array.isArray(entry.allowedRoutes));
    assert.ok(entry.allowedRoutes.length > 0);
    assert.ok(Number.isFinite(Date.parse(entry.lastReviewed)));
    assert.ok(Number.isFinite(Date.parse(entry.expiresAt)));
  }
});
