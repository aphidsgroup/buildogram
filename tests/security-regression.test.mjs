import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

test('JWT sessions are signature-verified and have no fallback secret', () => {
  const source = read('src/lib/auth.js');
  assert.match(source, /jwt\.verify\(/);
  assert.match(source, /algorithms:\s*\['HS256'\]/);
  assert.doesNotMatch(source, /process\.env\.JWT_SECRET\s*\|\|/);
  assert.doesNotMatch(source, /base64UrlDecode/);
});

test('production environment verification fails closed', () => {
  const result = spawnSync(process.execPath, [path.join(root, 'scripts/verify-env.js')], {
    cwd: os.tmpdir(),
    env: { NODE_ENV: 'production', PATH: process.env.PATH || '' },
    encoding: 'utf8',
  });
  assert.notEqual(result.status, 0);
  assert.match(`${result.stdout}${result.stderr}`, /Environment verification failed/);
});

test('dangerous web-exposed diagnostics and migration routes are absent', () => {
  const removed = [
    'src/app/api/test/route.js',
    'src/app/api/test/schema/route.js',
    'src/app/api/test/migrate/route.js',
    'src/app/api/ops/run-migration/route.js',
    'src/app/api/ops/seed-partners/route.js',
    'src/app/api/ops/seed-pilot/route.js',
  ];
  for (const relativePath of removed) {
    assert.equal(fs.existsSync(path.join(root, relativePath)), false, relativePath);
  }
});

test('known production credentials and demo passwords are absent from runtime code', () => {
  const targets = ['src', 'prisma', 'schema.sql'];
  const banned = [/npg_[A-Za-z0-9]+/, /password123/, /Admin@1234/, /BuildogramAdmin\$Secure/];

  function filesIn(target) {
    const absolute = path.join(root, target);
    if (fs.statSync(absolute).isFile()) return [absolute];
    return fs.readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
      const child = path.join(absolute, entry.name);
      return entry.isDirectory() ? filesIn(path.relative(root, child)) : [child];
    });
  }

  for (const filePath of targets.flatMap(filesIn)) {
    if (!/\.(js|jsx|mjs|sql|prisma)$/.test(filePath)) continue;
    const source = fs.readFileSync(filePath, 'utf8');
    for (const pattern of banned) assert.doesNotMatch(source, pattern, filePath);
  }
});

test('Next.js dynamic route handlers await params', () => {
  const apiRoot = path.join(root, 'src/app/api');
  function walk(directory) {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
      const child = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(child) : [child];
    });
  }
  for (const filePath of walk(apiRoot).filter(file => file.endsWith('route.js') && file.includes('['))) {
    const source = fs.readFileSync(filePath, 'utf8');
    if (/\bparams\b/.test(source)) assert.match(source, /await\s+params/, filePath);
  }
});
