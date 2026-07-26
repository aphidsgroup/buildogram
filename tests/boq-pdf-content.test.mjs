import test from 'node:test';
import assert from 'node:assert/strict';

import { BOQ_PDF_DISCLAIMER } from '../src/lib/boq-calc/disclaimer.mjs';

test('BOQ PDF disclaimer states the estimate limitations', () => {
  const disclaimer = BOQ_PDF_DISCLAIMER.toLowerCase();

  for (const requiredText of [
    'indicative estimate',
    'editable user inputs',
    'actual quantities and costs vary',
    'not an official schedule of rates',
    'not a tender-ready boq',
    'project-specific measurements',
    'design review',
    'professional boq preparation',
  ]) {
    assert.match(disclaimer, new RegExp(requiredText.replaceAll('-', '\\-')));
  }

  assert.doesNotMatch(disclaimer, /\bverified\b|\bguaranteed?\b|\baccurate\b|\bbinding quotation\b/);
});
