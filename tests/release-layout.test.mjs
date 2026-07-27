import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('homepage relies on the shared main landmark', () => {
  const homepage = fs.readFileSync('src/app/page.js', 'utf8');
  const shell = fs.readFileSync('src/app/SiteLayoutClient.js', 'utf8');

  assert.doesNotMatch(homepage, /<main(?:\s|>)/);
  assert.doesNotMatch(homepage, /<\/main>/);
  assert.match(shell, /<main>/);
  assert.match(shell, /<\/main>/);
});

test('floating controls preserve separation while back-to-top is hidden', () => {
  const stack = fs.readFileSync('src/components/conversion/FloatingActionStack.jsx', 'utf8');
  const backToTop = fs.readFileSync('src/components/BackToTop.js', 'utf8');

  assert.match(stack, /gap\s*:\s*'16px'/);
  assert.doesNotMatch(backToTop, /translateY\(16px\)\s+scale\(0\.85\)/);
  assert.match(backToTop, /translateY\(8px\)\s+scale\(0\.85\)/);
});

test('route scroll restoration timer is cancelled on cleanup', () => {
  const shell = fs.readFileSync('src/app/SiteLayoutClient.js', 'utf8');

  assert.match(shell, /const restoreTimer = window\.setTimeout/);
  assert.match(shell, /return \(\) => window\.clearTimeout\(restoreTimer\)/);
});
