/**
 * Unit tests for the BOQ calculation engine (pure functions).
 * Run: npm test  (node --test tests/)
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  n,
  round2,
  calcEarthwork,
  calcPCC,
  calcFootingConcrete,
  calcColumnConcreteTotal,
  calcPlinthBeam,
  calcBackfilling,
  calcBasementBrickwork,
  calcBasementPlastering,
} from '../src/lib/boq-calc/engine.js';
import { SQFT_PER_M2, CFT_PER_M3, RFT_PER_RM, convertRate } from '../src/lib/boq-calc/units.js';
import { numberToWords, formatIndianNumber } from '../src/lib/boq-calc/numberToWords.js';

// ── helpers ────────────────────────────────────────────────────────────────

test('n() coerces safely', () => {
  assert.equal(n('2.5'), 2.5);
  assert.equal(n(undefined), 0);
  assert.equal(n('abc'), 0);
  assert.equal(n(null), 0);
});

test('round2() rounds to 2 decimals', () => {
  assert.equal(round2(1.005 * 100), 100.5);
  assert.equal(round2(3.14159), 3.14);
  assert.equal(round2(2.675), 2.68); // 2.675*100 = 267.5 → rounds up
});

// ── section calculators ────────────────────────────────────────────────────

const FOUNDATION = [
  // 4 footings of 1.2 × 1.2 × 1.5 m, PCC 0.1 m, footing concrete 0.45 m
  { footingL: 1.2, footingB: 1.2, footingDepth: 1.5, pccThickness: 0.1, footingConcreteD: 0.45, nos: 4, colL: 0.23, colB: 0.3, colD: 3, floorIdx: 0 },
  { footingL: 1.0, footingB: 1.0, footingDepth: 1.2, pccThickness: 0.1, footingConcreteD: 0.4, nos: 2, colL: 0.23, colB: 0.23, colD: 3, floorIdx: 0 },
];

test('calcEarthwork sums footing excavation volumes', () => {
  // 1.2*1.2*1.5*4 + 1.0*1.0*1.2*2 = 8.64 + 2.4 = 11.04
  assert.equal(calcEarthwork(FOUNDATION), 11.04);
});

test('calcPCC sums PCC bed volumes', () => {
  // 1.2*1.2*0.1*4 + 1.0*1.0*0.1*2 = 0.576 + 0.2 = 0.78 (rounded)
  assert.equal(calcPCC(FOUNDATION), 0.78);
});

test('calcFootingConcrete sums footing concrete volumes', () => {
  // 1.2*1.2*0.45*4 + 1.0*1.0*0.4*2 = 2.592 + 0.8 = 3.39 (rounded)
  assert.equal(calcFootingConcrete(FOUNDATION), 3.39);
});

test('calcColumnConcreteTotal sums column volumes across rows', () => {
  // 0.23*0.3*3*4 + 0.23*0.23*3*2 = 0.828 + 0.3174 = 1.15 (rounded)
  assert.equal(calcColumnConcreteTotal(FOUNDATION), 1.15);
});

test('calcPlinthBeam sums L×B×D per row', () => {
  const rows = [
    { length: 10, breadth: 0.23, depth: 0.3 },
    { length: 8, breadth: 0.23, depth: 0.3 },
  ];
  // 0.69 + 0.552 = 1.24 (rounded)
  assert.equal(calcPlinthBeam(rows), 1.24);
});

test('calcBackfilling never goes negative', () => {
  assert.equal(calcBackfilling(10, 3, 4), 3);
  assert.equal(calcBackfilling(5, 3, 4), 0); // clamped at 0
});

test('calcBasementBrickwork and plastering handle empty input', () => {
  assert.equal(calcBasementBrickwork({}), 0);
  assert.equal(calcBasementBrickwork(undefined), 0);
  assert.equal(calcBasementPlastering({ plasterL: 40, plasterD: 0.6 }), 48); // both faces
});

test('calcEarthwork/calcPCC handle empty and missing rows', () => {
  assert.equal(calcEarthwork([]), 0);
  assert.equal(calcEarthwork(undefined), 0);
  assert.equal(calcPCC([{}]), 0);
});

// ── unit conversions ───────────────────────────────────────────────────────

test('unit constants are consistent', () => {
  assert.ok(Math.abs(SQFT_PER_M2 - 10.7639) < 1e-6);
  assert.ok(Math.abs(CFT_PER_M3 - 35.3147) < 1e-6);
  assert.ok(Math.abs(RFT_PER_RM - 3.28084) < 1e-6);
});

test('convertRate round-trips between m³ and cft', () => {
  const ratePerM3 = 5000;
  const ratePerCft = convertRate(ratePerM3, 'm3', 'cft');
  const back = convertRate(ratePerCft, 'cft', 'm3');
  assert.ok(Math.abs(back - ratePerM3) < 0.5, `expected ~${ratePerM3}, got ${back}`);
});

// ── Indian currency formatting ─────────────────────────────────────────────

test('numberToWords produces Indian-system words', () => {
  const words = numberToWords(1_50_000); // 1.5 lakh
  assert.match(words.toLowerCase(), /lakh/);
  const croreWords = numberToWords(2_00_00_000); // 2 crore
  assert.match(croreWords.toLowerCase(), /crore/);
});

test('formatIndianNumber uses lakh/crore grouping', () => {
  const s = String(formatIndianNumber(12345678));
  // Indian grouping: 1,23,45,678
  assert.match(s.replace(/[^0-9,]/g, ''), /1,23,45,678/);
});
