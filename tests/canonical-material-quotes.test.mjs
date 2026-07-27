import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');

async function source(relative) {
  return readFile(path.join(root, relative), 'utf8');
}

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await sourceFiles(full));
    else if (/\.(?:js|jsx|mjs)$/.test(entry.name)) files.push(full);
  }
  return files;
}

test('active runtime no longer references the legacy material_quotes table', async () => {
  const files = [
    ...await sourceFiles(path.join(root, 'src')),
    ...await sourceFiles(path.join(root, 'tests')),
  ];
  const offenders = [];
  for (const file of files) {
    if (file.endsWith('canonical-material-quotes.test.mjs')) continue;
    const contents = await readFile(file, 'utf8');
    if (/\bmaterial_quotes\b/.test(contents)) offenders.push(path.relative(root, file));
  }
  assert.deepEqual(offenders, []);
});

test('compatibility endpoint enforces supplier isolation and canonical relations', async () => {
  const route = await source('src/app/api/material-quotes/route.js');
  assert.match(route, /supplier_quote_responses/);
  assert.match(route, /material_quote_requests/);
  assert.match(route, /supplier_partner_id:\s*supplier\.id/);
  assert.match(route, /Quotation request is not assigned to this supplier/);
  assert.match(route, /IMMUTABLE_RESPONSE_STATUSES/);
  assert.match(route, /Quotation request has expired/);
  assert.match(route, /status:\s*existing\.status === 'submitted' \|\| existing\.status === 'revised'/);
});

test('pilot seed and readiness use canonical tables', async () => {
  const seed = await source('src/app/api/ops/seed-pilot/route.js');
  const status = await source('src/app/api/ops/pilot-launch-status/route.js');
  const readiness = await source('src/app/api/health/db/route.js');
  for (const contents of [seed, status, readiness]) {
    assert.match(contents, /material_quote_requests/);
    assert.match(contents, /supplier_quote_responses/);
  }
  assert.match(seed, /productionEnvironment\(\)/);
  assert.match(seed, /ENABLE_PILOT_SEED/);
});

test('mapping document records every lossy compatibility decision', async () => {
  const mapping = await source('docs/material-quotes-canonical-mapping.md');
  assert.match(mapping, /gst_included/);
  assert.match(mapping, /payment_terms/);
  assert.match(mapping, /total_amount/);
  assert.match(mapping, /material_delivery_records/);
  assert.match(mapping, /Data-loss risk/);
});
