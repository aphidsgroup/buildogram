'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DEFAULT_RATES, buildRateMap } from '@/lib/boq-calc/rates';
import { computeBoq } from '@/lib/boq-calc/engine';
import { numberToWords } from '@/lib/boq-calc/numberToWords';

// ── helpers ────────────────────────────────────────────────────────────────
const n = v => Number(v) || 0;
const fc = v => v != null ? '₹' + Number(v).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : '—';
const fq = v => Number(v).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const STORAGE_KEY = 'buildogram_boq_draft';

const FLOOR_LABELS = { G: ['Ground'], 'G+1': ['Ground','1st'], 'G+2': ['Ground','1st','2nd'], 'G+3': ['Ground','1st','2nd','3rd'] };

function addRow(setter, tmpl) { setter(p => [...p, { ...tmpl, _id: Date.now() + Math.random() }]); }
function removeRow(setter, i) { setter(p => p.filter((_, j) => j !== i)); }
function updateRow(setter, i, k, v) { setter(p => p.map((r, j) => j === i ? { ...r, [k]: v } : r)); }

function Inp({ value, onChange, type = 'number', placeholder, w, readOnly, step, min = 0 }) {
  return <input type={type} min={type === 'number' ? min : undefined} step={step || (type === 'number' ? 0.01 : undefined)}
    readOnly={readOnly} value={value ?? ''} onChange={e => onChange?.(e.target.value)} placeholder={placeholder}
    style={{ width: w || 96, padding: '6px 9px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 13, textAlign: type === 'number' ? 'right' : 'left', fontFamily: 'inherit', background: readOnly ? '#F8FAFC' : 'white' }} />;
}
function Sel({ value, onChange, children }) {
  return <select value={value} onChange={e => onChange(e.target.value)} style={{ padding: '6px 10px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', background: 'white' }}>{children}</select>;
}
function AddBtn({ onClick, label }) {
  return <button type="button" onClick={onClick} style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 7, padding: '5px 12px', fontSize: 12, fontWeight: 700, color: '#2563EB', cursor: 'pointer' }}>{label || '+ Add Row'}</button>;
}
function DelBtn({ onClick }) {
  return <button type="button" onClick={onClick} style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: 16, cursor: 'pointer', padding: '0 4px', lineHeight: 1 }}>✕</button>;
}

// ── STEPS ──────────────────────────────────────────────────────────────────
const STEPS = [
  { key: 'info',      label: 'Project Info',     icon: '📋' },
  { key: 'floors',    label: 'Floor Sizes',       icon: '📐' },
  { key: 'structure', label: 'Structure',         icon: '🏗️' },
  { key: 'finishes',  label: 'Finishes',          icon: '🪟' },
  { key: 'result',    label: 'BOQ Result',        icon: '📊' },
];

// ── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function PublicBOQCalculator() {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);
  const [calculating, setCalculating] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState({ name: '', phone: '', email: '', rating: 5, comment: '' });
  const [loadingDemo, setLoadingDemo] = useState(false);
  const [demoLoaded, setDemoLoaded] = useState(false);

  // ── state ──
  const [info, setInfo] = useState({ title: '', clientName: '', phone: '', email: '', address: '', floorConfig: 'G', marginPct: 12 });
  const [floorsData, setFloorsData] = useState([{ floorLabel: 'Ground', length: '', breadth: '', area: '' }]);

  // Structure
  const [foundation, setFoundation] = useState([{ nos: 1, footingL: '', footingB: '', footingDepth: 1.5, pccThickness: 0.1, footingConcreteD: 0.5, colL: 0.3, colB: 0.3, colD: '', floorIdx: 0 }]);
  const [plinthBeam, setPlinthBeam] = useState([{ label: 'PB-1', length: '', breadth: 0.23, depth: 0.45 }]);
  const [slabConcrete, setSlabConcrete] = useState([{ floorLabel: 'Ground', beamL: '', beamB: 0.3, beamD: 0.4, slabArea: '', slabD: 0.125 }]);
  const [brickwork9, setBrickwork9] = useState([{ floorLabel: 'Ground Floor', length: '', height: 3, doorOpens: [], windowOpens: [] }]);
  const [brickwork4, setBrickwork4] = useState([]);
  const [staircase, setStaircase] = useState({ width: 4, tread: 1, riser: 0.67, noOfSteps: 14, graniteArea: 12, handrailLength: 20, concreteL: 4, concreteB: 1.2, concreteD: 0.2 });

  // Finishes
  const [tileWork, setTileWork] = useState({ flooringArea: '', bathroomFloorArea: '', parkingArea: '', kitchenWallArea: '', bathroomWallArea: '', skirtingLength: '', graniteArea: '' });
  const [doorsWindows, setDoorsWindows] = useState([{ type: 'main_door', nos: 1 }, { type: 'room_door', nos: 3 }, { type: 'pvc_door', nos: 2 }]);
  const [plastering, setPlastering] = useState({ innerRows: [], ceilingArea: '' });
  const [mepOthers, setMepOthers] = useState({ terraceArea: '' });
  const [addlWorks, setAddlWorks] = useState([{ description: 'Underground Water Sump (5000L)', unit: 'Nos', quantity: 1, rate: 45000, _id: 1 }, { description: 'Septic Tank (2-chamber RCC)', unit: 'Nos', quantity: 1, rate: 35000, _id: 2 }]);

  // ── load/save draft ──────────────────────────────────────────────────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const d = JSON.parse(saved);
        if (d.info) setInfo(d.info);
        if (d.floorsData) setFloorsData(d.floorsData);
        if (d.foundation) setFoundation(d.foundation);
        if (d.plinthBeam) setPlinthBeam(d.plinthBeam);
        if (d.slabConcrete) setSlabConcrete(d.slabConcrete);
        if (d.brickwork9) setBrickwork9(d.brickwork9);
        if (d.brickwork4) setBrickwork4(d.brickwork4);
        if (d.tileWork) setTileWork(d.tileWork);
        if (d.doorsWindows) setDoorsWindows(d.doorsWindows);
        if (d.plastering) setPlastering(d.plastering);
        if (d.addlWorks) setAddlWorks(d.addlWorks);
        if (d.staircase) setStaircase(d.staircase);
      }
    } catch {}
  }, []);

  function saveDraft() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ info, floorsData, foundation, plinthBeam, slabConcrete, brickwork9, brickwork4, tileWork, doorsWindows, plastering, addlWorks, staircase }));
    } catch {}
  }

  function resetAll() {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setInfo({ title: '', clientName: '', phone: '', email: '', address: '', floorConfig: 'G', marginPct: 12 });
    setFloorsData([{ floorLabel: 'Ground', length: '', breadth: '', area: '' }]);
    setFoundation([{ nos: 1, footingL: '', footingB: '', footingDepth: 1.5, pccThickness: 0.1, footingConcreteD: 0.5, colL: 0.3, colB: 0.3, colD: '', floorIdx: 0 }]);
    setPlinthBeam([{ label: 'PB-1', length: '', breadth: 0.23, depth: 0.45 }]);
    setSlabConcrete([{ floorLabel: 'Ground', beamL: '', beamB: 0.3, beamD: 0.4, slabArea: '', slabD: 0.125 }]);
    setBrickwork9([{ floorLabel: 'Ground Floor', length: '', height: 3, doorOpens: [], windowOpens: [] }]);
    setBrickwork4([]);
    setTileWork({ flooringArea: '', bathroomFloorArea: '', parkingArea: '', kitchenWallArea: '', bathroomWallArea: '', skirtingLength: '', graniteArea: '' });
    setDoorsWindows([{ type: 'main_door', nos: 1 }, { type: 'room_door', nos: 3 }, { type: 'pvc_door', nos: 2 }]);
    setPlastering({ innerRows: [], ceilingArea: '' });
    setMepOthers({ terraceArea: '' });
    setAddlWorks([{ description: 'Underground Water Sump (5000L)', unit: 'Nos', quantity: 1, rate: 45000, _id: 1 }, { description: 'Septic Tank (2-chamber RCC)', unit: 'Nos', quantity: 1, rate: 35000, _id: 2 }]);
    setStaircase({ width: 4, tread: 1, riser: 0.67, noOfSteps: 14, graniteArea: 12, handrailLength: 20, concreteL: 4, concreteB: 1.2, concreteD: 0.2 });
    setResult(null);
    setDemoLoaded(false);
    setShowFeedback(false);
    setFeedbackSent(false);
    setStep(0);
  }

  // ── floor sync ────────────────────────────────────────────────────────────
  useEffect(() => {
    const labels = FLOOR_LABELS[info.floorConfig] || ['Ground'];
    setFloorsData(prev => labels.map((l, i) => prev[i] ? { ...prev[i], floorLabel: l } : { floorLabel: l, length: '', breadth: '', area: '' }));
  }, [info.floorConfig]);

  // Area is computed inline on length/breadth change — no stale-closure bug

  // ── calculate ─────────────────────────────────────────────────────────────
  function handleCalculate() {
    setCalculating(true);
    saveDraft();
    try {
      const rateMap = buildRateMap([]);
      // Auto-derive ceiling area from total floor area if not manually entered
      const totalFloorM2 = floorsData.reduce((s, r) => s + (n(r.area) * 0.0929), 0);
      const ceilingArea = n(plastering?.ceilingArea) > 0 ? plastering.ceilingArea : parseFloat(totalFloorM2.toFixed(2));
      const inputs = {
        floors: floorsData, foundation, plinthBeam, basement: {}, brickwork9, brickwork4,
        plastering: { ...plastering, ceilingArea, innerRows: [] }, // inner plastering auto-derived in engine
        sillLintel: {}, tileWork, doorsWindows, slabConcrete,
        staircase, others: mepOthers, addlWorks, pileRows: [],
      };
      const res = computeBoq(inputs, rateMap, n(info.marginPct) || 12);
      setResult(res);
      setStep(4);
      setTimeout(() => setShowFeedback(true), 3000);
    } catch (e) {
      console.error('BOQ calc error:', e);
      alert('Calculation error: ' + e.message);
    }
    setCalculating(false);
  }

  async function handleFeedback(e) {
    e.preventDefault();
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...feedback, type: 'boq_feedback', source: 'public_boq_calculator', project: info.title }),
      });
    } catch {}
    setFeedbackSent(true);
  }

  // ── Load demo data from Ops DB and auto-calculate ─────────────────────────
  async function loadDemo() {
    setLoadingDemo(true);
    try {
      const res = await fetch('/api/boq-calculator/demo');
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        const titles = errJson.existingProjects?.map(p => p.title).join('\n• ') || 'none';
        alert(`Demo project not found.\n\nProjects in DB:\n• ${titles}\n\nSave your project in Ops BOQ workstation with "Kinathukadavu" in the title.`);
        setLoadingDemo(false); return;
      }
      const demo = await res.json();
      const sec = demo.sections || {};

      // Populate info
      setInfo({
        title: demo.projectName || 'BOQ Demo — Kinathukadavu',
        clientName: demo.clientName || 'Demo Client',
        phone: '', email: '', address: demo.address || 'Kinathukadavu',
        floorConfig: demo.floorConfig || 'G',
        marginPct: demo.marginPct || 12,
      });

      // Populate all section states
      if (sec.floors)       setFloorsData(sec.floors);
      if (sec.foundation)   setFoundation(sec.foundation);
      if (sec.plinthBeam)   setPlinthBeam(sec.plinthBeam);
      if (sec.brickwork9)   setBrickwork9(sec.brickwork9);
      if (sec.brickwork4)   setBrickwork4(sec.brickwork4);
      if (sec.tileWork)     setTileWork(sec.tileWork);
      if (sec.doorsWindows) setDoorsWindows(sec.doorsWindows);
      if (sec.plastering)   setPlastering(sec.plastering || { innerRows: [], ceilingArea: '' });
      if (sec.slabConcrete) setSlabConcrete(sec.slabConcrete);
      if (sec.staircase)    setStaircase(sec.staircase);
      if (sec.mepOthers)    setMepOthers(sec.mepOthers);
      if (sec.addlWorks)    setAddlWorks(sec.addlWorks);

      // Build rate map with any project overrides
      const rateMap = buildRateMap(demo.rateOverrides || []);

      // Run calculation immediately
      const floors = sec.floors || floorsData;
      const inputs = {
        floors, foundation: sec.foundation || foundation, plinthBeam: sec.plinthBeam || plinthBeam,
        basement: {}, brickwork9: sec.brickwork9 || brickwork9, brickwork4: sec.brickwork4 || brickwork4,
        plastering: sec.plastering || { innerRows: [], ceilingArea: '' },
        sillLintel: sec.sillLintel || {}, tileWork: sec.tileWork || tileWork,
        doorsWindows: sec.doorsWindows || doorsWindows, slabConcrete: sec.slabConcrete || slabConcrete,
        staircase: sec.staircase || staircase, others: sec.mepOthers || mepOthers,
        addlWorks: sec.addlWorks || addlWorks, pileRows: sec.pileRows || [],
      };
      const res2 = computeBoq(inputs, rateMap, Number(demo.marginPct) || 12);
      setResult(res2);
      setStep(4);
      setDemoLoaded(true);
      setTimeout(() => setShowFeedback(true), 5000);
    } catch (e) {
      console.error('Demo load error:', e);
      alert('Failed to load demo data: ' + e.message);
    }
    setLoadingDemo(false);
  }

  // ── Clean PDF export — opens a new window with formatted print HTML ────────
  function handlePrintPDF() {
    if (!result) return;
    const fc = v => v != null ? '\u20B9' + Number(v).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : '\u2014';
    const fq = v => Number(v).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const sections = [...new Set(result.items.map(i => i.section))];

    const itemRows = sections.map(sec => {
      const sItems = result.items.filter(i => i.section === sec && i.quantity > 0);
      if (!sItems.length) return '';
      const secTotal = sItems.reduce((s, i) => s + i.amount, 0);
      return `
        <tr class="sec-hdr"><td colspan="6">\u25B8 ${sec}</td></tr>
        ${sItems.map((item, idx) => `
          <tr class="${idx % 2 === 0 ? 'even' : 'odd'}">
            <td class="c" style="color:#94A3B8">${item.sno}</td>
            <td>${item.description}</td>
            <td class="c">${item.unit}</td>
            <td class="r">${fq(item.quantity)}</td>
            <td class="r" style="color:#64748B">${fq(item.rate)}</td>
            <td class="r b">${fc(item.amount)}</td>
          </tr>`).join('')}
        <tr class="sec-tot"><td colspan="5" class="r">Section Total \u2014 ${sec}</td><td class="r b">${fc(secTotal)}</td></tr>
      `;
    }).join('');

    const varRows = result.marginVariants ? `
      <tr>${[5,8,10,12,15].map(mp => `<th ${mp===result.marginPct?'style="background:#FC6E20;color:white"':''}>${mp}% Margin</th>`).join('')}</tr>
      <tr>${[5,8,10,12,15].map(mp => `<td class="c" ${mp===result.marginPct?'style="font-weight:900"':''}>${fc(result.marginVariants[mp]?.buildingEstimate)}</td>`).join('')}</tr>
      <tr>${[5,8,10,12,15].map(mp => `<td class="c" style="font-size:9px;color:#94A3B8">${fc(result.marginVariants[mp]?.ratePerSqft)}/sqft</td>`).join('')}</tr>
    ` : '';

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>BOQ \u2014 ${info.title || 'Project'}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',Arial,sans-serif;font-size:11px;color:#1a1a1a;background:white}
.hdr{padding:14px 20px 10px;border-bottom:3px solid #FC6E20;display:flex;justify-content:space-between;align-items:flex-start}
.logo{font-size:20px;font-weight:900;color:#0F172A}.logo span{color:#FC6E20}
.logo-sub{font-size:9px;color:#64748B;margin-top:2px}
.rpt{text-align:right}.rpt h1{font-size:13px;font-weight:800;color:#0F172A}.rpt p{font-size:9px;color:#64748B;margin-top:1px}
.proj{padding:8px 20px;background:#F8FAFC;border-bottom:1px solid #E2E8F0;display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.pi label{font-size:8px;font-weight:700;text-transform:uppercase;color:#94A3B8;letter-spacing:.5px;display:block}
.pi span{font-size:11px;font-weight:600;color:#0F172A}
.sum{padding:10px 20px;display:grid;grid-template-columns:repeat(4,1fr);gap:8px;border-bottom:1px solid #E2E8F0}
.sc{background:#F8FAFC;border-radius:5px;padding:8px 10px;border:1px solid #E2E8F0}
.sc.hl{background:#0F172A}.sc label{font-size:8px;font-weight:700;text-transform:uppercase;color:#94A3B8;letter-spacing:.5px;display:block;margin-bottom:3px}
.sc.hl label{color:#475569}.sc span{font-size:15px;font-weight:900;color:#0F172A}.sc.hl span{color:#FC6E20}
.msec{padding:8px 20px 10px;border-bottom:1px solid #E2E8F0}
.msec h3{font-size:9px;font-weight:800;color:#374151;margin-bottom:5px;text-transform:uppercase;letter-spacing:.5px}
.bsec{padding:10px 20px}
.bsec h3{font-size:11px;font-weight:800;margin-bottom:6px;color:#0F172A}
table{width:100%;border-collapse:collapse}
th{background:#0F172A;color:white;padding:6px 7px;font-size:9.5px;font-weight:700;text-align:left}
td{padding:4.5px 7px;border-bottom:1px solid #F1F5F9;font-size:10px;vertical-align:middle}
tr.even{background:white}tr.odd{background:#FAFAFA}
tr.sec-hdr td{background:#E2E8F0;font-weight:800;font-size:9.5px;color:#374151;text-transform:uppercase;letter-spacing:.3px;padding:4px 7px}
tr.sec-tot td{background:#F1F5F9;font-weight:700;font-size:10px}
tr.gtot td{background:#0F172A;color:white;font-weight:900;font-size:12px;padding:7px}
tr.gtot td.org{color:#FC6E20}
tr.wrd td{background:#1E293B;color:#94A3B8;font-style:italic;font-size:9px;padding:5px 7px}
.c{text-align:center}.r{text-align:right}.b{font-weight:700}
.mtbl th,.mtbl td{font-size:10px}
.ftr{padding:8px 20px;border-top:1px solid #E2E8F0;margin-top:6px}
.ftr p{font-size:8.5px;color:#94A3B8;line-height:1.6}
.ftr strong{color:#64748B}
.wm{text-align:center;padding:5px;font-size:8px;color:#CBD5E1}
@media print{
body{print-color-adjust:exact;-webkit-print-color-adjust:exact}
.bsec{page-break-inside:auto}
table{page-break-inside:auto}
tr{page-break-inside:avoid;page-break-after:auto}
thead{display:table-header-group}
}
</style>
</head>
<body>
<div class="hdr">
  <div><div class="logo">Build<span>ogram</span></div><div class="logo-sub">Construction Intelligence Platform · Chennai</div></div>
  <div class="rpt"><h1>BILL OF QUANTITIES</h1><p>COCENA Issue 35, Dec 2025 Schedule of Rates</p><p>Generated: ${new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})}</p></div>
</div>
<div class="proj">
  <div class="pi"><label>Project</label><span>${info.title||'\u2014'}</span></div>
  <div class="pi"><label>Client</label><span>${info.clientName||'\u2014'}</span></div>
  <div class="pi"><label>Address</label><span>${info.address||'\u2014'}</span></div>
  <div class="pi"><label>Floor Config</label><span>${info.floorConfig||'G'}</span></div>
  <div class="pi"><label>Total Built-up</label><span>${fq(result.totalAreaSqft)} sq.ft</span></div>
  <div class="pi"><label>Contractor Margin</label><span>${result.marginPct}%</span></div>
</div>
<div class="sum">
  <div class="sc hl"><label>Building Estimate</label><span>${fc(result.buildingEstimate)}</span></div>
  <div class="sc"><label>Rate per Sq.ft</label><span>${fc(result.ratePerSqft)}</span></div>
  <div class="sc"><label>Foundation</label><span>${fc(result.sectionTotals.foundation)}</span></div>
  <div class="sc"><label>Superstructure</label><span>${fc(result.sectionTotals.superstructure)}</span></div>
</div>
${result.marginVariants ? `<div class="msec"><h3>\uD83D\uDCC8 Margin Sensitivity</h3><table class="mtbl"><thead>${varRows}</thead></table></div>` : ''}
<div class="bsec">
  <h3>Detailed Bill of Quantities \u2014 ${result.items.filter(i=>i.quantity>0).length} Line Items</h3>
  <table>
    <thead><tr><th style="width:28px">#</th><th>Description</th><th style="width:46px;text-align:center">Unit</th><th style="width:66px;text-align:right">Qty</th><th style="width:75px;text-align:right">Rate (\u20B9)</th><th style="width:86px;text-align:right">Amount (\u20B9)</th></tr></thead>
    <tbody>${itemRows}</tbody>
    <tfoot>
      <tr class="gtot"><td colspan="5" class="r">GRAND TOTAL (incl. ${result.marginPct}% contractor margin)</td><td class="r org">${fc(result.buildingEstimate)}</td></tr>
      <tr class="wrd"><td colspan="6">${numberToWords(result.buildingEstimate)}</td></tr>
    </tfoot>
  </table>
</div>
<div class="ftr"><p><strong>Disclaimer:</strong> This estimate is based on COCENA Issue 35, December 2025 Schedule of Rates for Chennai. Actual costs may vary \u00B115% depending on site conditions, material grades, labour availability, and contractor. This BOQ is indicative only and not a binding quotation. For a professional verified estimate, contact Buildogram at <strong>+91 95661 11222</strong> or <strong>info@buildogram.in</strong>.</p></div>
<div class="wm">Generated by Buildogram BOQ Calculator \u00B7 www.buildogram.in \u00B7 Powered by COCENA Dec 2025 rates</div>
<script>window.onload=function(){window.print();window.addEventListener('afterprint',function(){window.close();});}<\/script>
</body></html>`;

    const w = window.open('', '_blank', 'width=900,height=700');
    if (!w) { alert('Please allow popups for this site to save the PDF.'); return; }
    w.document.write(html);
    w.document.close();
  }

  const progressPct = ((step + 1) / STEPS.length) * 100;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)', padding: '0 0 60px' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '48px 24px 32px', color: 'white' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(252,110,32,0.15)', border: '1px solid rgba(252,110,32,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#FC6E20', textTransform: 'uppercase', letterSpacing: 1 }}>🧮 Free Tool · COCENA Dec 2025 Rates</span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900, margin: '0 0 12px', lineHeight: 1.15 }}>
          BOQ Calculator
        </h1>
        <p style={{ fontSize: 16, color: '#94A3B8', maxWidth: 560, margin: '0 auto 8px', lineHeight: 1.7 }}>
          Generate a detailed Bill of Quantities for your residential construction project — 44 standard line items, per-floor rate breakdowns, and margin sensitivity analysis.
        </p>
        <p style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}>Your data auto-saves in browser. No login required.</p>

        {/* Demo Button */}
        <button
          onClick={loadDemo}
          disabled={loadingDemo}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: loadingDemo ? 'rgba(255,255,255,0.08)' : 'linear-gradient(135deg,rgba(252,110,32,0.22),rgba(255,179,71,0.22))',
            border: '1px solid rgba(252,110,32,0.45)', borderRadius: 12,
            padding: '13px 28px', cursor: loadingDemo ? 'not-allowed' : 'pointer',
            color: 'white', fontSize: 15, fontWeight: 700,
            boxShadow: '0 4px 20px rgba(252,110,32,0.25)',
            transition: 'all 0.2s',
          }}
        >
          {loadingDemo ? (
            <><span style={{ fontSize: 18 }}>⏳</span> Loading Demo…</>
          ) : demoLoaded ? (
            <><span style={{ fontSize: 18 }}>✅</span> Demo Loaded — View Result</>
          ) : (
            <><span style={{ fontSize: 18 }}>📊</span> View Demo BOQ — Kinathukadavu Project</>
          )}
        </button>
        <p style={{ fontSize: 11, color: '#475569', marginTop: 8 }}>See a real completed BOQ instantly — no input needed</p>

        {/* Show Start New button prominently after demo loads */}
        {demoLoaded && (
          <button
            onClick={resetAll}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 12,
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 10, padding: '11px 24px', cursor: 'pointer',
              color: 'white', fontSize: 14, fontWeight: 600,
              transition: 'all 0.2s',
            }}
          >
            ✏️ Start My Own BOQ Calculation
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 16px', marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
          {STEPS.map((s, i) => (
            <button key={i} onClick={() => step > i || result ? setStep(i) : null}
              style={{ flex: 1, padding: '8px 4px', background: step === i ? 'rgba(252,110,32,0.15)' : step > i ? 'rgba(22,163,74,0.1)' : 'rgba(255,255,255,0.04)', border: step === i ? '1px solid rgba(252,110,32,0.4)' : step > i ? '1px solid rgba(22,163,74,0.3)' : '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: step === i ? '#FC6E20' : step > i ? '#4ADE80' : '#64748B', fontSize: 11, fontWeight: 700, cursor: step > i || result ? 'pointer' : 'default', textAlign: 'center', transition: 'all 0.2s' }}>
              <div style={{ fontSize: 16, marginBottom: 2 }}>{s.icon}</div>
              <div style={{ display: 'none', '@media (min-width: 480px)': { display: 'block' } }}>{s.label}</div>
            </button>
          ))}
        </div>
        <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
          <div style={{ height: '100%', width: `${progressPct}%`, background: 'linear-gradient(90deg,#FFB347,#FC6E20)', borderRadius: 2, transition: 'width 0.4s ease' }} />
        </div>
      </div>

      {/* Card */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 16px' }}>
        <div style={{ background: 'white', borderRadius: 20, padding: 'clamp(20px,4vw,36px)', boxShadow: '0 25px 60px rgba(0,0,0,0.35)' }}>

          {/* ── STEP 0: Info ── */}
          {step === 0 && (
            <div>
              <h2 style={sh}>📋 Project Information</h2>
              <p style={sp}>Tell us about your project. This helps personalise your BOQ report.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14 }}>
                {[['Project Title', 'title', 'text', 'e.g. G+2 Residence — Adyar'],['Your Name', 'clientName', 'text', 'Mr. Rajan'],['Mobile', 'phone', 'tel', '+91 98765 43210'],['Email', 'email', 'email', 'you@email.com'],['Plot Address', 'address', 'text', 'No. 12, 2nd Street, Adyar']].map(([lbl, key, type, ph]) => (
                  <label key={key} style={lbl_s}>
                    {lbl}
                    <input type={type} value={info[key]} onChange={e => setInfo(p => ({ ...p, [key]: e.target.value }))} placeholder={ph}
                      style={{ padding: '9px 12px', border: '1px solid #E2E8F0', borderRadius: 9, fontSize: 14, fontFamily: 'inherit' }} />
                  </label>
                ))}
                <label style={lbl_s}>
                  Floor Configuration
                  <Sel value={info.floorConfig} onChange={v => setInfo(p => ({ ...p, floorConfig: v }))}>
                    {['G','G+1','G+2','G+3'].map(o => <option key={o} value={o}>{o === 'G' ? 'Ground Floor only' : o}</option>)}
                  </Sel>
                </label>
                <label style={lbl_s}>
                  Contractor Margin %
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Inp value={info.marginPct} onChange={v => setInfo(p => ({ ...p, marginPct: v }))} min={0} w={80} />
                    <span style={{ fontSize: 12, color: '#94A3B8' }}>(typically 10–15%)</span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* ── STEP 1: Floors ── */}
          {step === 1 && (
            <div>
              <h2 style={sh}>📐 Floor Dimensions</h2>
              <p style={sp}>Enter the built-up area of each floor. Area calculates automatically.</p>
              <div style={{ overflowX: 'auto', marginBottom: 24 }}>
                <table style={tbl}>
                  <thead><tr><Th>Floor</Th><Th>Length (m)</Th><Th>Breadth (m)</Th><Th>Area (sq.ft)</Th></tr></thead>
                  <tbody>
                    {floorsData.map((r, i) => (
                      <tr key={i}>
                        <Td><strong>{r.floorLabel} Floor</strong></Td>
                        <Td><Inp value={r.length} onChange={v => {
                          setFloorsData(prev => prev.map((row, idx) => {
                            if (idx !== i) return row;
                            const area = (Number(v) || 0) * (Number(row.breadth) || 0) * 10.764;
                            return { ...row, length: v, area: area > 0 ? parseFloat(area.toFixed(2)) : '' };
                          }));
                        }} /></Td>
                        <Td><Inp value={r.breadth} onChange={v => {
                          setFloorsData(prev => prev.map((row, idx) => {
                            if (idx !== i) return row;
                            const area = (Number(row.length) || 0) * (Number(v) || 0) * 10.764;
                            return { ...row, breadth: v, area: area > 0 ? parseFloat(area.toFixed(2)) : '' };
                          }));
                        }} /></Td>
                        <Td><Inp value={r.area} readOnly w={110} /></Td>
                      </tr>
                    ))}
                    <tr style={{ background: '#F8FAFC' }}>
                      <td colSpan={3} style={{ padding: '10px 12px', fontWeight: 700, textAlign: 'right', fontSize: 14 }}>Total Built-up</td>
                      <td style={{ padding: '10px 12px', fontWeight: 900, fontSize: 15, color: '#0F172A' }}>{fq(floorsData.reduce((s, r) => s + n(r.area), 0))} sq.ft</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', marginBottom: 10 }}>Foundation Footings</h3>
              <p style={sp}>Each row = one type of footing. Nos × dimensions = total volume.</p>
              <div style={{ overflowX: 'auto', marginBottom: 12 }}>
                <table style={tbl}>
                  <thead><tr><Th>Nos</Th><Th>Ftg L (m)</Th><Th>Ftg B (m)</Th><Th>Excav D (m)</Th><Th>PCC t (m)</Th><Th>Conc D (m)</Th><Th>Col L</Th><Th>Col B</Th><Th>Col H</Th><Th></Th></tr></thead>
                  <tbody>
                    {foundation.map((r, i) => (
                      <tr key={r._id || i}>
                        {['nos','footingL','footingB','footingDepth','pccThickness','footingConcreteD','colL','colB','colD'].map(k => (
                          <Td key={k}><Inp value={r[k]} onChange={v => updateRow(setFoundation, i, k, v)} w={74} /></Td>
                        ))}
                        <Td><DelBtn onClick={() => removeRow(setFoundation, i)} /></Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <AddBtn onClick={() => addRow(setFoundation, { nos: 1, footingL: '', footingB: '', footingDepth: 1.5, pccThickness: 0.1, footingConcreteD: 0.5, colL: 0.3, colB: 0.3, colD: '', floorIdx: 0 })} label="+ Add Footing Row" />

              <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', marginBottom: 10, marginTop: 24 }}>Plinth Beam / RSB / SB</h3>
              <div style={{ overflowX: 'auto', marginBottom: 12 }}>
                <table style={tbl}>
                  <thead><tr><Th>Label</Th><Th>Length (m)</Th><Th>Breadth (m)</Th><Th>Depth (m)</Th><Th></Th></tr></thead>
                  <tbody>
                    {plinthBeam.map((r, i) => (
                      <tr key={r._id || i}>
                        <Td><Inp type="text" value={r.label} onChange={v => updateRow(setPlinthBeam, i, 'label', v)} w={100} /></Td>
                        {['length','breadth','depth'].map(k => <Td key={k}><Inp value={r[k]} onChange={v => updateRow(setPlinthBeam, i, k, v)} /></Td>)}
                        <Td><DelBtn onClick={() => removeRow(setPlinthBeam, i)} /></Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <AddBtn onClick={() => addRow(setPlinthBeam, { label: '', length: '', breadth: 0.23, depth: 0.45 })} label="+ Add Beam Row" />
            </div>
          )}

          {/* ── STEP 2: Structure ── */}
          {step === 2 && (
            <div>
              <h2 style={sh}>🏗️ Structural Elements</h2>
              <p style={sp}>Enter your roof slab details and brickwork per floor. Door/window openings are auto-deducted.</p>

              <h3 style={sh3}>Roof Beam & Slab (per floor)</h3>
              <div style={{ overflowX: 'auto', marginBottom: 12 }}>
                <table style={tbl}>
                  <thead><tr><Th>Floor</Th><Th>Beam L (m)</Th><Th>Beam B (m)</Th><Th>Beam D (m)</Th><Th>Slab Area (m²)</Th><Th>Slab D (m)</Th><Th>Total m³</Th><Th></Th></tr></thead>
                  <tbody>
                    {slabConcrete.map((r, i) => (
                      <tr key={r._id || i}>
                        <Td><Sel value={r.floorLabel} onChange={v => updateRow(setSlabConcrete, i, 'floorLabel', v)}>
                          {['Ground','1st','2nd','3rd'].map(f => <option key={f}>{f}</option>)}</Sel></Td>
                        {['beamL','beamB','beamD','slabArea','slabD'].map(k => <Td key={k}><Inp value={r[k]} onChange={v => updateRow(setSlabConcrete, i, k, v)} /></Td>)}
                        <Td><strong style={{ fontSize: 13 }}>{fq((n(r.beamL)*n(r.beamB)*n(r.beamD)) + (n(r.slabArea)*n(r.slabD)))}</strong></Td>
                        <Td><DelBtn onClick={() => removeRow(setSlabConcrete, i)} /></Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <AddBtn onClick={() => addRow(setSlabConcrete, { floorLabel: 'Ground', beamL: '', beamB: 0.3, beamD: 0.4, slabArea: '', slabD: 0.125 })} label="+ Add Floor Slab" />

              <h3 style={{ ...sh3, marginTop: 28 }}>9-inch Brick Walls (outer)</h3>
              {brickwork9.map((r, i) => (
                <div key={r._id || i} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: 14, marginBottom: 12 }}>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 10 }}>
                    <Sel value={r.floorLabel} onChange={v => updateRow(setBrickwork9, i, 'floorLabel', v)}>
                      {['Ground Floor','1st Floor','2nd Floor','3rd Floor'].map(f => <option key={f}>{f}</option>)}</Sel>
                    <label style={{ fontSize: 13, display: 'flex', gap: 6, alignItems: 'center' }}>
                      Wall Length (m): <Inp value={r.length} onChange={v => updateRow(setBrickwork9, i, 'length', v)} />
                    </label>
                    <label style={{ fontSize: 13, display: 'flex', gap: 6, alignItems: 'center' }}>
                      Height (m): <Inp value={r.height} onChange={v => updateRow(setBrickwork9, i, 'height', v)} />
                    </label>
                    <DelBtn onClick={() => removeRow(setBrickwork9, i)} />
                  </div>
                  <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 700, color: '#64748B', margin: '0 0 6px' }}>Door Openings</p>
                      {(r.doorOpens||[]).map((d, di) => (
                        <div key={di} style={{ display: 'flex', gap: 5, marginBottom: 4, alignItems: 'center' }}>
                          <Inp value={d.L} onChange={v => { const a=[...r.doorOpens]; a[di]={...a[di],L:v}; updateRow(setBrickwork9,i,'doorOpens',a); }} w={60} /><span style={{fontSize:11}}>L</span>
                          <Inp value={d.H} onChange={v => { const a=[...r.doorOpens]; a[di]={...a[di],H:v}; updateRow(setBrickwork9,i,'doorOpens',a); }} w={60} /><span style={{fontSize:11}}>H</span>
                          <Inp value={d.nos} onChange={v => { const a=[...r.doorOpens]; a[di]={...a[di],nos:v}; updateRow(setBrickwork9,i,'doorOpens',a); }} w={50} /><span style={{fontSize:11}}>Nos</span>
                          <DelBtn onClick={() => { const a=r.doorOpens.filter((_,j)=>j!==di); updateRow(setBrickwork9,i,'doorOpens',a); }} />
                        </div>
                      ))}
                      <AddBtn onClick={() => updateRow(setBrickwork9, i, 'doorOpens', [...(r.doorOpens||[]), {L:'',H:'',nos:1}])} label="+ Door" />
                    </div>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 700, color: '#64748B', margin: '0 0 6px' }}>Window Openings</p>
                      {(r.windowOpens||[]).map((w, wi) => (
                        <div key={wi} style={{ display: 'flex', gap: 5, marginBottom: 4, alignItems: 'center' }}>
                          <Inp value={w.L} onChange={v => { const a=[...r.windowOpens]; a[wi]={...a[wi],L:v}; updateRow(setBrickwork9,i,'windowOpens',a); }} w={60} /><span style={{fontSize:11}}>L</span>
                          <Inp value={w.H} onChange={v => { const a=[...r.windowOpens]; a[wi]={...a[wi],H:v}; updateRow(setBrickwork9,i,'windowOpens',a); }} w={60} /><span style={{fontSize:11}}>H</span>
                          <Inp value={w.nos} onChange={v => { const a=[...r.windowOpens]; a[wi]={...a[wi],nos:v}; updateRow(setBrickwork9,i,'windowOpens',a); }} w={50} /><span style={{fontSize:11}}>Nos</span>
                          <DelBtn onClick={() => { const a=r.windowOpens.filter((_,j)=>j!==wi); updateRow(setBrickwork9,i,'windowOpens',a); }} />
                        </div>
                      ))}
                      <AddBtn onClick={() => updateRow(setBrickwork9, i, 'windowOpens', [...(r.windowOpens||[]), {L:'',H:'',nos:1}])} label="+ Window" />
                    </div>
                  </div>
                </div>
              ))}
              <AddBtn onClick={() => addRow(setBrickwork9, { floorLabel: 'Ground Floor', length: '', height: 3, doorOpens: [], windowOpens: [] })} label="+ Add Wall Row" />
            </div>
          )}

          {/* ── STEP 3: Finishes ── */}
          {step === 3 && (
            <div>
              <h2 style={sh}>🪟 Finishes & Fit-outs</h2>
              <p style={sp}>Enter the areas for tiles, painting, doors, and windows.</p>

              <h3 style={sh3}>Tile Work (m²)</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 24 }}>
                {[
                  ['Main Floor Vitrified', 'flooringArea'],['Bathroom Floor Ceramic', 'bathroomFloorArea'],
                  ['Parking / Balcony Anti-Skid', 'parkingArea'],['Kitchen Wall Tiles', 'kitchenWallArea'],
                  ['Bathroom Wall Tiles', 'bathroomWallArea'],['Skirting Length (RM)', 'skirtingLength'],
                  ['Granite Countertop (m²)', 'graniteArea'],
                ].map(([lbl, key]) => (
                  <label key={key} style={lbl_s}>{lbl}
                    <Inp value={tileWork[key]} onChange={v => setTileWork(p => ({ ...p, [key]: v }))} w="100%" />
                  </label>
                ))}
              </div>

              <h3 style={sh3}>Doors & Windows</h3>
              <div style={{ overflowX: 'auto', marginBottom: 12 }}>
                <table style={tbl}>
                  <thead><tr><Th>Type</Th><Th>Nos</Th><Th></Th></tr></thead>
                  <tbody>
                    {doorsWindows.map((r, i) => (
                      <tr key={r._id || i}>
                        <Td><Sel value={r.type} onChange={v => updateRow(setDoorsWindows, i, 'type', v)}>
                          {['main_door','room_door','pvc_door','pooja_door'].map(t => <option key={t} value={t}>{t.replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase())}</option>)}
                        </Sel></Td>
                        <Td><Inp value={r.nos} onChange={v => updateRow(setDoorsWindows, i, 'nos', v)} w={80} min={1} /></Td>
                        <Td><DelBtn onClick={() => removeRow(setDoorsWindows, i)} /></Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <AddBtn onClick={() => addRow(setDoorsWindows, { type: 'room_door', nos: 1 })} label="+ Add" />

              <h3 style={{ ...sh3, marginTop: 24 }}>Additional Items</h3>
              <div style={{ overflowX: 'auto', marginBottom: 12 }}>
                <table style={tbl}>
                  <thead><tr><Th>Description</Th><Th>Unit</Th><Th>Qty</Th><Th>Rate (₹)</Th><Th>Amount</Th><Th></Th></tr></thead>
                  <tbody>
                    {addlWorks.map((r, i) => (
                      <tr key={r._id || i}>
                        <Td><Inp type="text" value={r.description} onChange={v => updateRow(setAddlWorks, i, 'description', v)} w={200} /></Td>
                        <Td><Inp type="text" value={r.unit} onChange={v => updateRow(setAddlWorks, i, 'unit', v)} w={60} /></Td>
                        <Td><Inp value={r.quantity} onChange={v => updateRow(setAddlWorks, i, 'quantity', v)} w={70} /></Td>
                        <Td><Inp value={r.rate} onChange={v => updateRow(setAddlWorks, i, 'rate', v)} /></Td>
                        <Td><strong>{fc(n(r.quantity)*n(r.rate))}</strong></Td>
                        <Td><DelBtn onClick={() => removeRow(setAddlWorks, i)} /></Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <AddBtn onClick={() => addRow(setAddlWorks, { description: '', unit: 'Nos', quantity: 1, rate: '' })} label="+ Add Item" />

              <h3 style={{ ...sh3, marginTop: 24 }}>Other</h3>
              <label style={lbl_s}>Terrace / Stilt Area (sq.ft) — for waterproofing
                <Inp value={mepOthers.terraceArea} onChange={v => setMepOthers(p => ({ ...p, terraceArea: v }))} w={140} />
              </label>
            </div>
          )}

          {/* ── STEP 4: Result ── */}
          {step === 4 && result && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>🎉</div>
                <h2 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', margin: '0 0 6px' }}>Your BOQ is Ready!</h2>
                <p style={{ color: '#64748B', fontSize: 14 }}>{info.clientName && `${info.clientName} · `}{info.floorConfig} · {info.marginPct}% contractor margin</p>
              </div>

              {/* Summary cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 12, marginBottom: 28 }}>
                {[
                  ['Building Estimate', fc(result.buildingEstimate), 'linear-gradient(135deg,#FFB347,#FC6E20)', 'white'],
                  ['Rate / Sq.ft', fc(result.ratePerSqft), '#0F172A', 'white'],
                  ['Total Area', `${fq(result.totalAreaSqft)} sqft`, '#EFF6FF', '#1E40AF'],
                  ['Foundation', fc(result.sectionTotals.foundation), '#F0FDF4', '#166534'],
                  ['Steel', fc(result.sectionTotals.steel), '#FFF1F2', '#9F1239'],
                  ['Superstructure', fc(result.sectionTotals.superstructure), '#FAF5FF', '#7E22CE'],
                  ['Margin', `${result.marginPct}%`, '#FFF7ED', '#C2410C'],
                ].map(([lbl, val, bg, col]) => (
                  <div key={lbl} style={{ background: bg, borderRadius: 14, padding: '16px 14px', border: '1px solid rgba(0,0,0,0.06)' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: col, opacity: 0.7, marginBottom: 4 }}>{lbl}</div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: col }}>{val}</div>
                  </div>
                ))}
              </div>

              {/* Margin sensitivity */}
              {result.marginVariants && (
                <div style={{ background: '#F8FAFC', borderRadius: 14, padding: 18, marginBottom: 28, border: '1px solid #E2E8F0' }}>
                  <h4 style={{ fontSize: 13, fontWeight: 800, color: '#374151', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: 0.5 }}>📈 Margin Sensitivity — Same Project, Different Margins</h4>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 400 }}>
                      <thead>
                        <tr>{[5,8,10,12,15].map(mp => <th key={mp} style={{ padding: '8px 12px', background: mp === result.marginPct ? '#0F172A' : '#F1F5F9', color: mp === result.marginPct ? '#FC6E20' : '#64748B', fontSize: 13, fontWeight: 700, borderRadius: 6 }}>{mp}% margin</th>)}</tr>
                      </thead>
                      <tbody>
                        <tr>{[5,8,10,12,15].map(mp => <td key={mp} style={{ padding: '8px 12px', textAlign: 'center', fontSize: 14, fontWeight: 800, color: mp === result.marginPct ? '#0F172A' : '#374151' }}>{fc(result.marginVariants[mp]?.buildingEstimate)}</td>)}</tr>
                        <tr>{[5,8,10,12,15].map(mp => <td key={mp} style={{ padding: '4px 12px', textAlign: 'center', fontSize: 11, color: '#94A3B8' }}>{fc(result.marginVariants[mp]?.ratePerSqft)}/sqft</td>)}</tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Full BOQ table */}
              <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', marginBottom: 12 }}>Detailed BOQ — {result.items.filter(i => i.quantity > 0).length} Line Items</h3>
              <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #E2E8F0', marginBottom: 24 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
                  <thead>
                    <tr style={{ background: '#0F172A' }}>
                      {['#','Section','Description','Unit','Qty','Rate (₹)','Amount (₹)'].map(h => (
                        <th key={h} style={{ padding: '9px 10px', fontSize: 11, fontWeight: 700, textAlign: 'left', color: 'white', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.items.filter(i => i.quantity > 0).map((item, i) => (
                      <tr key={item.sno} style={{ background: i % 2 === 0 ? 'white' : '#FAFAFA' }}>
                        <td style={{ padding: '7px 10px', fontSize: 12, color: '#94A3B8' }}>{item.sno}</td>
                        <td style={{ padding: '7px 10px' }}><span style={{ background: '#EFF6FF', color: '#2563EB', padding: '2px 7px', borderRadius: 4, fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' }}>{item.section}</span></td>
                        <td style={{ padding: '7px 10px', fontSize: 12, color: '#374151', maxWidth: 220 }}>{item.description}</td>
                        <td style={{ padding: '7px 10px', fontSize: 12, textAlign: 'center', color: '#64748B' }}>{item.unit}</td>
                        <td style={{ padding: '7px 10px', fontSize: 12, textAlign: 'right' }}>{fq(item.quantity)}</td>
                        <td style={{ padding: '7px 10px', fontSize: 12, textAlign: 'right', color: '#64748B' }}>{fq(item.rate)}</td>
                        <td style={{ padding: '7px 10px', fontSize: 13, fontWeight: 700, textAlign: 'right', color: '#0F172A' }}>{fc(item.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{ background: '#0F172A' }}>
                      <td colSpan={6} style={{ padding: '12px 10px', fontSize: 14, fontWeight: 900, color: 'white', textAlign: 'right' }}>
                        GRAND TOTAL (incl. {result.marginPct}% margin)
                      </td>
                      <td style={{ padding: '12px 10px', fontSize: 17, fontWeight: 900, color: '#FC6E20', textAlign: 'right' }}>
                        {fc(result.buildingEstimate)}
                      </td>
                    </tr>
                    <tr style={{ background: '#1E293B' }}>
                      <td colSpan={7} style={{ padding: '10px', fontSize: 12, color: '#94A3B8', fontStyle: 'italic' }}>
                        {numberToWords(result.buildingEstimate)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Print + WA CTA */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
                <button
                  onClick={handlePrintPDF}
                  style={{ background: '#0F172A', color: 'white', border: 'none', borderRadius: 10, padding: '11px 22px', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                  🖨️ Save as PDF
                </button>
                <a href={`https://wa.me/919566111222?text=${encodeURIComponent(`Hi! I just generated a BOQ for my ${info.floorConfig} project using Buildogram's tool. Building estimate: ${fc(result.buildingEstimate)} (${result.marginPct}% margin). Can I get a professional review?`)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ background: '#25D366', color: 'white', border: 'none', borderRadius: 10, padding: '11px 22px', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                  💬 WhatsApp for Expert Review
                </a>
                <button onClick={resetAll} style={{ background: 'white', border: '2px solid #E2E8F0', borderRadius: 10, padding: '11px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer', color: '#374151', display: 'flex', alignItems: 'center', gap: 6 }}>
                  ✏️ Start New Project
                </button>
              </div>

              {/* Feedback */}
              {showFeedback && !feedbackSent && (
                <div style={{ background: 'linear-gradient(135deg,#FFF7ED,#FFFBF5)', border: '1px solid #FED7AA', borderRadius: 16, padding: '24px 20px' }}>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: '#C2410C', margin: '0 0 6px' }}>⭐ How was your experience?</h3>
                  <p style={{ fontSize: 13, color: '#9A3412', margin: '0 0 16px' }}>Your feedback helps us improve this tool for everyone.</p>
                  <form onSubmit={handleFeedback}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                      {[1,2,3,4,5].map(r => (
                        <button type="button" key={r} onClick={() => setFeedback(f => ({ ...f, rating: r }))}
                          style={{ fontSize: 28, background: 'none', border: 'none', cursor: 'pointer', opacity: feedback.rating >= r ? 1 : 0.3, transition: 'opacity 0.15s' }}>⭐</button>
                      ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                      <input type="text" placeholder="Your name" value={feedback.name} onChange={e => setFeedback(f => ({ ...f, name: e.target.value }))}
                        style={{ padding: '9px 12px', border: '1px solid #FED7AA', borderRadius: 8, fontSize: 14, fontFamily: 'inherit' }} />
                      <input type="tel" placeholder="Phone / WhatsApp" value={feedback.phone} onChange={e => setFeedback(f => ({ ...f, phone: e.target.value }))}
                        style={{ padding: '9px 12px', border: '1px solid #FED7AA', borderRadius: 8, fontSize: 14, fontFamily: 'inherit' }} />
                    </div>
                    <textarea rows={3} placeholder="Tell us what worked, what didn't, or what you'd like us to add…" value={feedback.comment} onChange={e => setFeedback(f => ({ ...f, comment: e.target.value }))}
                      style={{ width: '100%', padding: '9px 12px', border: '1px solid #FED7AA', borderRadius: 8, fontSize: 14, fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }} />
                    <button type="submit" style={{ marginTop: 10, background: 'linear-gradient(135deg,#FFB347,#FC6E20)', color: 'white', border: 'none', borderRadius: 10, padding: '10px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                      Send Feedback
                    </button>
                  </form>
                </div>
              )}
              {feedbackSent && (
                <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 14, padding: '20px', textAlign: 'center' }}>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>🙏</div>
                  <h4 style={{ color: '#166534', fontWeight: 800, margin: '0 0 4px' }}>Thank you for your feedback!</h4>
                  <p style={{ color: '#16A34A', fontSize: 14, margin: 0 }}>We'll use it to make this tool even better. Our team may reach out to you shortly.</p>
                </div>
              )}
            </div>
          )}

          {/* ── NAV BUTTONS ── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32, paddingTop: 24, borderTop: '1px solid #F1F5F9', flexWrap: 'wrap', gap: 10 }}>
            <div>
              {step > 0 && step < 4 && (
                <button onClick={() => setStep(s => s - 1)} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer', color: '#374151' }}>
                  ← Back
                </button>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {step < 3 && (
                <button onClick={() => { saveDraft(); setStep(s => s + 1); }}
                  style={{ background: 'linear-gradient(135deg,#FFB347,#FC6E20)', color: 'white', border: 'none', borderRadius: 10, padding: '11px 26px', fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 14px rgba(252,110,32,0.3)' }}>
                  Next →
                </button>
              )}
              {step === 3 && (
                <button onClick={handleCalculate} disabled={calculating}
                  style={{ background: calculating ? '#94A3B8' : 'linear-gradient(135deg,#10B981,#059669)', color: 'white', border: 'none', borderRadius: 10, padding: '12px 32px', fontSize: 15, fontWeight: 800, cursor: calculating ? 'not-allowed' : 'pointer', boxShadow: '0 4px 14px rgba(16,185,129,0.3)' }}>
                  {calculating ? '⏳ Calculating…' : '🧮 Generate BOQ →'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p style={{ textAlign: 'center', fontSize: 12, color: '#475569', marginTop: 24, lineHeight: 1.6 }}>
          ℹ️ Estimates based on COCENA Issue 35, Dec 2025 schedule of rates for Chennai. Actual costs may vary ±15% depending on site conditions, material grades, and contractor. 
          <Link href="/contact" style={{ color: '#FC6E20' }}> Get a professional review →</Link>
        </p>
      </div>

      <style>{`@media print { body { background: white !important; } }`}</style>
    </div>
  );
}

// ── styled helpers ─────────────────────────────────────────────────────────
const sh   = { fontSize: 20, fontWeight: 900, color: '#0F172A', margin: '0 0 6px' };
const sp   = { fontSize: 13, color: '#64748B', margin: '0 0 18px' };
const sh3  = { fontSize: 15, fontWeight: 800, color: '#0F172A', margin: '0 0 10px' };
const lbl_s = { fontSize: 13, fontWeight: 600, color: '#374151', display: 'flex', flexDirection: 'column', gap: 5 };
const tbl  = { width: '100%', borderCollapse: 'collapse', minWidth: 400 };
function Th({ children }) { return <th style={{ padding: '8px 10px', background: '#0F172A', color: 'white', fontSize: 11, fontWeight: 700, textAlign: 'left', whiteSpace: 'nowrap' }}>{children}</th>; }
function Td({ children }) { return <td style={{ padding: '7px 8px', fontSize: 13, borderBottom: '1px solid #F1F5F9' }}>{children}</td>; }
