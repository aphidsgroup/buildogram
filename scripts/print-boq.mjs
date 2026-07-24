import { computeExcelBoq } from './src/lib/boq-calc/excel-engine.js';
import fs from 'fs';
const src = fs.readFileSync('./test-boq.mjs', 'utf8');
const inputsMatch = src.match(/const inputs = (\{[\s\S]*?\});/);
const inputs = eval('(' + inputsMatch[1] + ')');
const res = computeExcelBoq(inputs, { mode: 'excel', rateMap: null, marginPct: 0 });
res.items.forEach(i => console.log(i.description.padEnd(40), i.quantity.toFixed(2), i.rate.toFixed(2), i.amount.toFixed(2)));
console.log('Grand Total:', res.grandTotal);
