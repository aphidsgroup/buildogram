'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DEFAULT_RATES } from '@/lib/boq-calc/rates';
import { numberToWords } from '@/lib/boq-calc/numberToWords';

// ── tiny helpers ───────────────────────────────────────────────────────────
const n  = v => Number(v) || 0;
const fc = v => v != null ? '₹' + Number(v).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : '—';
const fq = v => v != null ? Number(v).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—';

const FLOOR_LABELS = { G: ['Ground'], 'G+1': ['Ground','1st'], 'G+2': ['Ground','1st','2nd'], 'G+3': ['Ground','1st','2nd','3rd'] };
const SECTIONS = ['Info','Floors L×B','Foundation','Plinth Beam','Basement','9" Brick','4.5" Brick','Plastering','Sill/Lintel','Tile Work','Doors & Windows','Slab Concrete','Staircase','MEP / Others','Pile Foundation','Rate Sheet','BOQ Result'];

function rowBtn(onClick, label = '+') {
  return <button type="button" onClick={onClick} style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: 6, padding: '3px 10px', fontSize: 12, cursor: 'pointer', color: '#0F172A', fontWeight: 600 }}>{label}</button>;
}

function TH({ children, w }) { return <th style={{ padding: '8px 10px', background: '#0F172A', color: 'white', fontSize: 11, fontWeight: 700, textAlign: 'left', whiteSpace: 'nowrap', width: w }}>{children}</th>; }
function TD({ children, center }) { return <td style={{ padding: '7px 10px', fontSize: 13, borderBottom: '1px solid #F1F5F9', textAlign: center ? 'center' : 'left' }}>{children}</td>; }
function NumInput({ value, onChange, step, min = 0, small }) {
  return <input type="number" min={min} step={step || 0.01} value={value ?? ''} onChange={e => onChange(e.target.value)}
    style={{ width: small ? 70 : 90, padding: '5px 7px', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 13, textAlign: 'right', fontFamily: 'inherit' }} />;
}
function StrInput({ value, onChange, placeholder, w }) {
  return <input type="text" value={value ?? ''} onChange={e => onChange(e.target.value)} placeholder={placeholder}
    style={{ width: w || 160, padding: '5px 8px', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 13, fontFamily: 'inherit' }} />;
}
function DelBtn({ onClick }) {
  return <button type="button" onClick={onClick} title="Remove row" style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: 16, cursor: 'pointer', padding: '0 4px', lineHeight: 1 }}>✕</button>;
}

function addRow(setter, template) { setter(prev => [...prev, { ...template, _id: Date.now() + Math.random() }]); }
function removeRow(setter, idx)    { setter(prev => prev.filter((_, i) => i !== idx)); }
function updateRow(setter, idx, key, val) { setter(prev => prev.map((r, i) => i === idx ? { ...r, [key]: val } : r)); }

// ── SECTION COMPONENTS ────────────────────────────────────────────────────

function SectionFloorsLB({ floorConfig, floorsData, setFloorsData }) {
  const labels = FLOOR_LABELS[floorConfig] || ['Ground'];
  useEffect(() => {
    const needed = labels.length;
    if (floorsData.length !== needed) {
      setFloorsData(labels.map((l, i) => floorsData[i] || { floorLabel: l, length: '', breadth: '', area: '' }));
    }
  }, [floorConfig]);

  function calcArea(idx) {
    const r = floorsData[idx] || {};
    const a = n(r.length) * n(r.breadth) * 10.764;
    setFloorsData(prev => prev.map((row, i) => i === idx ? { ...row, area: a > 0 ? parseFloat(a.toFixed(2)) : '' } : row));
  }

  return (
    <div>
      <p style={{ color: '#64748B', fontSize: 13, marginBottom: 14 }}>Enter floor-wise dimensions (metres). Area is auto-calculated in sq.ft.</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 480 }}>
          <thead><tr><TH w={80}>Floor</TH><TH>Length (m)</TH><TH>Breadth (m)</TH><TH>Area (sqft)</TH></tr></thead>
          <tbody>
            {floorsData.map((row, i) => (
              <tr key={i}>
                <TD><strong>{row.floorLabel}</strong></TD>
                <TD><NumInput value={row.length} onChange={v => { updateRow(setFloorsData, i, 'length', v); setTimeout(() => calcArea(i), 0); }} /></TD>
                <TD><NumInput value={row.breadth} onChange={v => { updateRow(setFloorsData, i, 'breadth', v); setTimeout(() => calcArea(i), 0); }} /></TD>
                <TD><input readOnly value={row.area || ''} style={{ width: 100, padding: '5px 7px', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 13, background: '#F8FAFC', textAlign: 'right' }} /></TD>
              </tr>
            ))}
            <tr style={{ background: '#F8FAFC' }}>
              <td colSpan={3} style={{ padding: '8px 10px', fontSize: 13, fontWeight: 700, textAlign: 'right' }}>Total Built-up:</td>
              <td style={{ padding: '8px 10px', fontSize: 14, fontWeight: 900, color: '#0F172A' }}>{fq(floorsData.reduce((s, r) => s + n(r.area), 0))} sqft</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SectionFoundation({ rows, setRows }) {
  const tmpl = { nos: 1, footingL: '', footingB: '', footingDepth: '', pccThickness: 0.1, footingConcreteD: '', colL: '', colB: '', colD: '', floorIdx: 0 };
  return (
    <div>
      <p style={{ color: '#64748B', fontSize: 13, marginBottom: 14 }}>All dimensions in metres. Earth excavation, PCC, footing concrete, and column concrete volumes calculated automatically.</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 820 }}>
          <thead><tr><TH w={30}>#</TH><TH w={50}>Nos</TH><TH>Footing L</TH><TH>Footing B</TH><TH>Excav D</TH><TH>PCC t</TH><TH>Conc D</TH><TH>Col L</TH><TH>Col B</TH><TH>Col H</TH><TH w={60}>Flr</TH><TH w={30}></TH></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r._id || i}>
                <TD>{i + 1}</TD>
                <TD><NumInput value={r.nos} onChange={v => updateRow(setRows, i, 'nos', v)} min={1} /></TD>
                <TD><NumInput value={r.footingL} onChange={v => updateRow(setRows, i, 'footingL', v)} /></TD>
                <TD><NumInput value={r.footingB} onChange={v => updateRow(setRows, i, 'footingB', v)} /></TD>
                <TD><NumInput value={r.footingDepth} onChange={v => updateRow(setRows, i, 'footingDepth', v)} /></TD>
                <TD><NumInput value={r.pccThickness} onChange={v => updateRow(setRows, i, 'pccThickness', v)} /></TD>
                <TD><NumInput value={r.footingConcreteD} onChange={v => updateRow(setRows, i, 'footingConcreteD', v)} /></TD>
                <TD><NumInput value={r.colL} onChange={v => updateRow(setRows, i, 'colL', v)} /></TD>
                <TD><NumInput value={r.colB} onChange={v => updateRow(setRows, i, 'colB', v)} /></TD>
                <TD><NumInput value={r.colD} onChange={v => updateRow(setRows, i, 'colD', v)} /></TD>
                <TD><select value={r.floorIdx} onChange={e => updateRow(setRows, i, 'floorIdx', Number(e.target.value))} style={{ padding: '5px 4px', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 12 }}>
                  {[0,1,2,3].map(f => <option key={f} value={f}>{['G','1st','2nd','3rd'][f]}</option>)}</select></TD>
                <TD>{rowBtn(() => removeRow(setRows, i), '✕')}</TD>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 10 }}>{rowBtn(() => addRow(setRows, tmpl), '+ Add Footing Row')}</div>
    </div>
  );
}

function SectionPlinthBeam({ rows, setRows }) {
  const tmpl = { label: '', length: '', breadth: 0.23, depth: 0.45 };
  return (
    <div>
      <p style={{ color: '#64748B', fontSize: 13, marginBottom: 14 }}>Plinth Beam, Retaining Slab Beam (RSB), and Sub-Beam (SB). All in metres.</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
          <thead><tr><TH>Label</TH><TH>Length (m)</TH><TH>Breadth (m)</TH><TH>Depth (m)</TH><TH w={30}></TH></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r._id || i}>
                <TD><StrInput value={r.label} onChange={v => updateRow(setRows, i, 'label', v)} placeholder="e.g. PB-1" w={120} /></TD>
                <TD><NumInput value={r.length} onChange={v => updateRow(setRows, i, 'length', v)} /></TD>
                <TD><NumInput value={r.breadth} onChange={v => updateRow(setRows, i, 'breadth', v)} /></TD>
                <TD><NumInput value={r.depth} onChange={v => updateRow(setRows, i, 'depth', v)} /></TD>
                <TD><DelBtn onClick={() => removeRow(setRows, i)} /></TD>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 10 }}>{rowBtn(() => addRow(setRows, tmpl), '+ Add Beam Row')}</div>
    </div>
  );
}

function SectionBasement({ data, setData }) {
  const f = (k, v) => setData(d => ({ ...d, [k]: v }));
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
      {[
        ['Brick Length (m)', 'brickL'],['Brick Breadth (m)', 'brickB'],['Brick Depth (m)', 'brickD'],
        ['Plaster Length (m)', 'plasterL'],['Plaster Depth (m)', 'plasterD'],
      ].map(([label, key]) => (
        <label key={key} style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'flex', flexDirection: 'column', gap: 5 }}>
          {label}
          <input type="number" min={0} step={0.01} value={data[key] ?? ''} onChange={e => f(key, e.target.value)}
            style={{ padding: '7px 10px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, textAlign: 'right' }} />
        </label>
      ))}
    </div>
  );
}

function SectionBrickwork({ rows, setRows, title }) {
  const tmpl = { floorLabel: 'Ground', length: '', height: '', doorOpens: [], windowOpens: [] };
  return (
    <div>
      <p style={{ color: '#64748B', fontSize: 13, marginBottom: 14 }}>{title}. Dimensions in metres. Add door/window openings to auto-deduct.</p>
      {rows.map((r, i) => (
        <div key={r._id || i} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: 16, marginBottom: 14 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
            <select value={r.floorLabel} onChange={e => updateRow(setRows, i, 'floorLabel', e.target.value)} style={{ padding: '6px 10px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 13 }}>
              {['Ground','1st','2nd','3rd'].map(f => <option key={f}>{f} Floor</option>)}
            </select>
            <label style={{ fontSize: 13, display: 'flex', gap: 6, alignItems: 'center' }}>Wall Length (m): <NumInput value={r.length} onChange={v => updateRow(setRows, i, 'length', v)} /></label>
            <label style={{ fontSize: 13, display: 'flex', gap: 6, alignItems: 'center' }}>Wall Height (m): <NumInput value={r.height} onChange={v => updateRow(setRows, i, 'height', v)} /></label>
            <DelBtn onClick={() => removeRow(setRows, i)} />
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#64748B', marginBottom: 6 }}>Door Openings</p>
              {(r.doorOpens || []).map((d, di) => (
                <div key={di} style={{ display: 'flex', gap: 6, marginBottom: 4, alignItems: 'center' }}>
                  <NumInput value={d.L} onChange={v => { const arr = [...r.doorOpens]; arr[di] = { ...arr[di], L: v }; updateRow(setRows, i, 'doorOpens', arr); }} small /><span style={{ fontSize: 11 }}>L</span>
                  <NumInput value={d.H} onChange={v => { const arr = [...r.doorOpens]; arr[di] = { ...arr[di], H: v }; updateRow(setRows, i, 'doorOpens', arr); }} small /><span style={{ fontSize: 11 }}>H</span>
                  <NumInput value={d.nos} onChange={v => { const arr = [...r.doorOpens]; arr[di] = { ...arr[di], nos: v }; updateRow(setRows, i, 'doorOpens', arr); }} small /><span style={{ fontSize: 11 }}>Nos</span>
                  <DelBtn onClick={() => { const arr = r.doorOpens.filter((_, j) => j !== di); updateRow(setRows, i, 'doorOpens', arr); }} />
                </div>
              ))}
              {rowBtn(() => updateRow(setRows, i, 'doorOpens', [...(r.doorOpens || []), { L: '', H: '', nos: 1 }]), '+ Door')}
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#64748B', marginBottom: 6 }}>Window Openings</p>
              {(r.windowOpens || []).map((w, wi) => (
                <div key={wi} style={{ display: 'flex', gap: 6, marginBottom: 4, alignItems: 'center' }}>
                  <NumInput value={w.L} onChange={v => { const arr = [...r.windowOpens]; arr[wi] = { ...arr[wi], L: v }; updateRow(setRows, i, 'windowOpens', arr); }} small /><span style={{ fontSize: 11 }}>L</span>
                  <NumInput value={w.H} onChange={v => { const arr = [...r.windowOpens]; arr[wi] = { ...arr[wi], H: v }; updateRow(setRows, i, 'windowOpens', arr); }} small /><span style={{ fontSize: 11 }}>H</span>
                  <NumInput value={w.nos} onChange={v => { const arr = [...r.windowOpens]; arr[wi] = { ...arr[wi], nos: v }; updateRow(setRows, i, 'windowOpens', arr); }} small /><span style={{ fontSize: 11 }}>Nos</span>
                  <DelBtn onClick={() => { const arr = r.windowOpens.filter((_, j) => j !== wi); updateRow(setRows, i, 'windowOpens', arr); }} />
                </div>
              ))}
              {rowBtn(() => updateRow(setRows, i, 'windowOpens', [...(r.windowOpens || []), { L: '', H: '', nos: 1 }]), '+ Window')}
            </div>
          </div>
        </div>
      ))}
      {rowBtn(() => addRow(setRows, tmpl), '+ Add Wall Row')}
    </div>
  );
}

function SectionPlastering({ data, setData }) {
  const tmpl = { floorLabel: 'Ground', length: '', height: '', doorOpens: [], windowOpens: [] };
  const { innerRows = [], ceilingArea = '' } = data;
  const setInner = fn => setData(d => ({ ...d, innerRows: typeof fn === 'function' ? fn(d.innerRows || []) : fn }));
  return (
    <div>
      <p style={{ color: '#64748B', fontSize: 13, marginBottom: 10 }}>Outer plastering is auto-derived from 9" brickwork. Enter inner wall rows and ceiling area separately.</p>
      <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Inner Wall Plastering Rows</h4>
      {innerRows.map((r, i) => (
        <div key={r._id || i} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: 12, marginBottom: 10 }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <select value={r.floorLabel} onChange={e => updateRow(setInner, i, 'floorLabel', e.target.value)} style={{ padding: '6px 10px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 13 }}>
              {['Ground','1st','2nd','3rd'].map(f => <option key={f}>{f} Floor</option>)}
            </select>
            <label style={{ fontSize: 13, display: 'flex', gap: 6, alignItems: 'center' }}>Length (m): <NumInput value={r.length} onChange={v => updateRow(setInner, i, 'length', v)} /></label>
            <label style={{ fontSize: 13, display: 'flex', gap: 6, alignItems: 'center' }}>Height (m): <NumInput value={r.height} onChange={v => updateRow(setInner, i, 'height', v)} /></label>
            <DelBtn onClick={() => removeRow(setInner, i)} />
          </div>
        </div>
      ))}
      {rowBtn(() => addRow(setInner, tmpl), '+ Add Inner Wall Row')}
      <div style={{ marginTop: 20 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'flex', flexDirection: 'column', gap: 5, maxWidth: 200 }}>
          Ceiling Area (m²) — total
          <input type="number" min={0} step={0.01} value={ceilingArea} onChange={e => setData(d => ({ ...d, ceilingArea: e.target.value }))}
            style={{ padding: '7px 10px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, textAlign: 'right' }} />
        </label>
      </div>
    </div>
  );
}

function SectionSillLintel({ data, setData }) {
  const f = (k, v) => setData(d => ({ ...d, [k]: v }));
  const tmplLoft = { label: '', L: '', B: '', D: 0.1 };
  const makeListSetter = key => fn => setData(d => ({ ...d, [key]: typeof fn === 'function' ? fn(d[key] || []) : fn }));

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 420 }}>
        {[['Sill Beam Total Length (RM)', 'sillLength'], ['Lintel Beam Total Length (RM)', 'lintelLength']].map(([lbl, key]) => (
          <label key={key} style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'flex', flexDirection: 'column', gap: 5 }}>
            {lbl}
            <input type="number" min={0} step={0.01} value={data[key] ?? ''} onChange={e => f(key, e.target.value)}
              style={{ padding: '7px 10px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, textAlign: 'right' }} />
          </label>
        ))}
      </div>
      {[['Loft Slabs', 'loftRows'], ['Sunshades', 'sunshadeRows'], ['Counter Slabs', 'counterSlabRows'], ['Balcony Downslabs', 'balconyRows']].map(([title, key]) => {
        const setter = makeListSetter(key);
        const rows = data[key] || [];
        return (
          <div key={key}>
            <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>{title}</h4>
            {rows.map((r, i) => (
              <div key={r._id || i} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                <StrInput value={r.label} onChange={v => updateRow(setter, i, 'label', v)} placeholder="Label" w={100} />
                <span style={{ fontSize: 12 }}>L</span><NumInput value={r.L} onChange={v => updateRow(setter, i, 'L', v)} />
                <span style={{ fontSize: 12 }}>B</span><NumInput value={r.B} onChange={v => updateRow(setter, i, 'B', v)} />
                <span style={{ fontSize: 12 }}>D</span><NumInput value={r.D} onChange={v => updateRow(setter, i, 'D', v)} />
                <DelBtn onClick={() => removeRow(setter, i)} />
              </div>
            ))}
            {rowBtn(() => addRow(setter, tmplLoft), `+ Add ${title}`)}
          </div>
        );
      })}
    </div>
  );
}

function SectionTileWork({ data, setData }) {
  const f = (k, v) => setData(d => ({ ...d, [k]: v }));
  const fields = [
    ['Main Floor Vitrified (m²)', 'flooringArea'],
    ['Bathroom Floor Ceramic (m²)', 'bathroomFloorArea'],
    ['Parking / Balcony Anti-Skid (m²)', 'parkingArea'],
    ['Kitchen Wall Tiles (m²)', 'kitchenWallArea'],
    ['Bathroom Wall Tiles (m²)', 'bathroomWallArea'],
    ['Skirting Length (RM)', 'skirtingLength'],
    ['Granite Countertop (m²)', 'graniteArea'],
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
      {fields.map(([label, key]) => (
        <label key={key} style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'flex', flexDirection: 'column', gap: 5 }}>
          {label}
          <input type="number" min={0} step={0.01} value={data[key] ?? ''} onChange={e => f(key, e.target.value)}
            style={{ padding: '7px 10px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, textAlign: 'right' }} />
        </label>
      ))}
    </div>
  );
}

function SectionDoorsWindows({ rows, setRows }) {
  const tmpl = { type: 'room_door', nos: 1 };
  const types = ['main_door','room_door','pvc_door','pooja_door'];
  return (
    <div>
      <p style={{ color: '#64748B', fontSize: 13, marginBottom: 14 }}>UPVC window area is auto-calculated from wall openings in the brickwork sections.</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 320 }}>
          <thead><tr><TH>Type</TH><TH>Nos</TH><TH w={30}></TH></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r._id || i}>
                <TD><select value={r.type} onChange={e => updateRow(setRows, i, 'type', e.target.value)} style={{ padding: '6px 8px', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 13 }}>
                  {types.map(t => <option key={t} value={t}>{t.replace(/_/g,' ').replace(/\b\w/g, c => c.toUpperCase())}</option>)}
                </select></TD>
                <TD><NumInput value={r.nos} onChange={v => updateRow(setRows, i, 'nos', v)} min={1} /></TD>
                <TD><DelBtn onClick={() => removeRow(setRows, i)} /></TD>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 10 }}>{rowBtn(() => addRow(setRows, tmpl), '+ Add Door/Window')}</div>
    </div>
  );
}

function SectionSlabConcrete({ rows, setRows }) {
  const tmpl = { floorLabel: 'Ground', beamL: '', beamB: '', beamD: '', slabArea: '', slabD: 0.125 };
  return (
    <div>
      <p style={{ color: '#64748B', fontSize: 13, marginBottom: 14 }}>Roof beam volume + slab volume per floor. All in metres / m².</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
          <thead><tr><TH>Floor</TH><TH>Beam L</TH><TH>Beam B</TH><TH>Beam D</TH><TH>Slab Area (m²)</TH><TH>Slab D (m)</TH><TH>Total m³</TH><TH w={30}></TH></tr></thead>
          <tbody>
            {rows.map((r, i) => {
              const tot = (n(r.beamL) * n(r.beamB) * n(r.beamD)) + (n(r.slabArea) * n(r.slabD));
              return (
                <tr key={r._id || i}>
                  <TD><select value={r.floorLabel} onChange={e => updateRow(setRows, i, 'floorLabel', e.target.value)} style={{ padding: '5px 8px', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 13 }}>
                    {['Ground','1st','2nd','3rd'].map(f => <option key={f}>{f}</option>)}</select></TD>
                  <TD><NumInput value={r.beamL} onChange={v => updateRow(setRows, i, 'beamL', v)} /></TD>
                  <TD><NumInput value={r.beamB} onChange={v => updateRow(setRows, i, 'beamB', v)} /></TD>
                  <TD><NumInput value={r.beamD} onChange={v => updateRow(setRows, i, 'beamD', v)} /></TD>
                  <TD><NumInput value={r.slabArea} onChange={v => updateRow(setRows, i, 'slabArea', v)} /></TD>
                  <TD><NumInput value={r.slabD} onChange={v => updateRow(setRows, i, 'slabD', v)} /></TD>
                  <TD><strong>{fq(tot)}</strong></TD>
                  <TD><DelBtn onClick={() => removeRow(setRows, i)} /></TD>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 10 }}>{rowBtn(() => addRow(setRows, tmpl), '+ Add Floor')}</div>
    </div>
  );
}

function SectionStaircase({ data, setData }) {
  const f = (k, v) => setData(d => ({ ...d, [k]: v }));
  const fields = [
    ['Width (ft)', 'width'],['Tread (ft)', 'tread'],['Riser (ft)', 'riser'],['No. of Steps', 'noOfSteps'],
    ['Granite Area (m²)', 'graniteArea'],['Handrail Length (RFT)', 'handrailLength'],
    ['Concrete L (m)', 'concreteL'],['Concrete B (m)', 'concreteB'],['Concrete D (m)', 'concreteD'],
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14 }}>
      {fields.map(([label, key]) => (
        <label key={key} style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'flex', flexDirection: 'column', gap: 5 }}>
          {label}
          <input type="number" min={0} step={0.01} value={data[key] ?? ''} onChange={e => f(key, e.target.value)}
            style={{ padding: '7px 10px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, textAlign: 'right' }} />
        </label>
      ))}
    </div>
  );
}

function SectionMEP({ data, setData }) {
  const f = (k, v) => setData(d => ({ ...d, [k]: v }));
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'flex', flexDirection: 'column', gap: 5 }}>
        Total Built-up Area (sqft) <span style={{ fontSize: 11, color: '#94A3B8' }}>Leave blank to auto-sum floors</span>
        <input type="number" min={0} step={0.01} value={data.totalBuiltupArea ?? ''} onChange={e => f('totalBuiltupArea', e.target.value)}
          style={{ padding: '7px 10px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, textAlign: 'right' }} />
      </label>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'flex', flexDirection: 'column', gap: 5 }}>
        Terrace Area (sqft)
        <input type="number" min={0} step={0.01} value={data.terraceArea ?? ''} onChange={e => f('terraceArea', e.target.value)}
          style={{ padding: '7px 10px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, textAlign: 'right' }} />
      </label>
    </div>
  );
}

function SectionPile({ rows, setRows }) {
  const tmpl = { dia: "1'", nos: '', depth: '', rate: '' };
  return (
    <div>
      <p style={{ color: '#64748B', fontSize: 13, marginBottom: 14 }}>Pile foundation (bored cast-in-situ). Rate per RFT. Quantity = Nos × Depth.</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 460 }}>
          <thead><tr><TH>Dia</TH><TH>Nos</TH><TH>Depth (ft)</TH><TH>Rate/RFT</TH><TH>Amount</TH><TH w={30}></TH></tr></thead>
          <tbody>
            {rows.map((r, i) => {
              const amt = n(r.nos) * n(r.depth) * n(r.rate);
              return (
                <tr key={r._id || i}>
                  <TD><select value={r.dia} onChange={e => updateRow(setRows, i, 'dia', e.target.value)} style={{ padding: '5px 8px', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 13 }}>
                    {["1'", "1'3\"", "1'6\"", "1'9\"", "2'"].map(d => <option key={d}>{d}</option>)}
                  </select></TD>
                  <TD><NumInput value={r.nos} onChange={v => updateRow(setRows, i, 'nos', v)} /></TD>
                  <TD><NumInput value={r.depth} onChange={v => updateRow(setRows, i, 'depth', v)} /></TD>
                  <TD><NumInput value={r.rate} onChange={v => updateRow(setRows, i, 'rate', v)} /></TD>
                  <TD><strong>{fc(amt)}</strong></TD>
                  <TD><DelBtn onClick={() => removeRow(setRows, i)} /></TD>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 10 }}>{rowBtn(() => addRow(setRows, tmpl), '+ Add Pile Row')}</div>
    </div>
  );
}

function SectionAdditional({ rows, setRows }) {
  const tmpl = { description: '', unit: 'Nos', quantity: '', rate: '' };
  return (
    <div>
      <p style={{ color: '#64748B', fontSize: 13, marginBottom: 14 }}>Any additional items not covered by the 44 standard BOQ items.</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
          <thead><tr><TH>Description</TH><TH w={70}>Unit</TH><TH>Qty</TH><TH>Rate</TH><TH>Amount</TH><TH w={30}></TH></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r._id || i}>
                <TD><StrInput value={r.description} onChange={v => updateRow(setRows, i, 'description', v)} placeholder="Item description" w={200} /></TD>
                <TD><StrInput value={r.unit} onChange={v => updateRow(setRows, i, 'unit', v)} placeholder="Nos" w={60} /></TD>
                <TD><NumInput value={r.quantity} onChange={v => updateRow(setRows, i, 'quantity', v)} /></TD>
                <TD><NumInput value={r.rate} onChange={v => updateRow(setRows, i, 'rate', v)} /></TD>
                <TD><strong>{fc(n(r.quantity) * n(r.rate))}</strong></TD>
                <TD><DelBtn onClick={() => removeRow(setRows, i)} /></TD>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 10 }}>{rowBtn(() => addRow(setRows, tmpl), '+ Add Item')}</div>
    </div>
  );
}

function SectionRateSheet({ localRates, setLocalRates }) {
  return (
    <div>
      <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 10, padding: '10px 14px', marginBottom: 14, fontSize: 13, color: '#C2410C' }}>
        ⚠️ Editing rates here changes them for <strong>this project only</strong>. Changes are saved when you click "Save &amp; Calculate".
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
          <thead>
            <tr>
              <TH w={30}>S.No</TH><TH w={100}>Category</TH><TH>Description</TH><TH w={60}>Unit</TH>
              <TH w={90}>G.Flr ₹</TH><TH w={90}>1st ₹</TH><TH w={90}>2nd ₹</TH><TH w={90}>3rd ₹</TH><TH w={90}>Avg ₹</TH>
            </tr>
          </thead>
          <tbody>
            {localRates.map((r, i) => (
              <tr key={r.sno} style={{ background: i % 2 === 0 ? 'white' : '#FAFAFA' }}>
                <TD center>{r.sno}</TD>
                <TD><span style={{ fontSize: 11, background: '#EFF6FF', color: '#2563EB', padding: '2px 6px', borderRadius: 4 }}>{r.category}</span></TD>
                <TD><span style={{ fontSize: 12 }}>{r.description}</span></TD>
                <TD center><span style={{ fontSize: 11 }}>{r.unit}</span></TD>
                {['rateGFloor','rate1st','rate2nd','rate3rd','rateAvg'].map(k => (
                  <td key={k} style={{ padding: '4px 6px', borderBottom: '1px solid #F1F5F9' }}>
                    <input type="number" min={0} step={1} value={r[k] ?? ''}
                      onChange={e => setLocalRates(prev => prev.map((row, j) => j === i ? { ...row, [k]: Number(e.target.value) } : row))}
                      style={{ width: 82, padding: '4px 6px', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 12, textAlign: 'right', fontFamily: 'inherit' }} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SectionBOQResult({ result, project }) {
  if (!result) return (
    <div style={{ textAlign: 'center', padding: '60px 0', color: '#94A3B8' }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>📊</div>
      <p style={{ fontSize: 15 }}>Click <strong>Save &amp; Calculate</strong> to generate the BOQ.</p>
    </div>
  );

  const sections = [...new Set(result.items.map(i => i.section))];
  const total = result.buildingEstimate + (result.sectionTotals.additionalWorks || 0) + (result.sectionTotals.pileFoundation || 0);

  return (
    <div>
      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14, marginBottom: 24 }}>
        {[
          ['Building Estimate', fc(result.buildingEstimate), '#0F172A'],
          ['Rate / Sqft', fc(result.ratePerSqft), '#1E40AF'],
          ['Foundation', fc(result.sectionTotals.foundation), '#047857'],
          ['Superstructure', fc(result.sectionTotals.superstructure), '#7C3AED'],
          ['Margin %', `${result.marginPct}%`, '#C2410C'],
          ['Total Area', `${fq(result.totalAreaSqft)} sqft`, '#374151'],
        ].map(([label, value, color]) => (
          <div key={label} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 12, padding: '14px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</div>
            <div style={{ fontSize: 18, fontWeight: 900, color, marginTop: 4 }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Margin comparison */}
      {result.marginVariants && (
        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: 16, marginBottom: 20 }}>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 10 }}>Margin Sensitivity</h4>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', minWidth: 400, width: '100%' }}>
              <thead><tr>{[5,8,10,12,15].map(mp => <th key={mp} style={{ padding: '6px 12px', background: mp === result.marginPct ? '#0F172A' : '#F1F5F9', color: mp === result.marginPct ? 'white' : '#374151', fontSize: 12, fontWeight: 700, borderRadius: 4 }}>{mp}%</th>)}</tr></thead>
              <tbody>
                <tr>{[5,8,10,12,15].map(mp => <td key={mp} style={{ padding: '8px 12px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: mp === result.marginPct ? '#FC6E20' : '#0F172A' }}>{fc(result.marginVariants[mp]?.buildingEstimate)}</td>)}</tr>
                <tr>{[5,8,10,12,15].map(mp => <td key={mp} style={{ padding: '4px 12px', textAlign: 'center', fontSize: 11, color: '#94A3B8' }}>{fc(result.marginVariants[mp]?.ratePerSqft)}/sqft</td>)}</tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Full BOQ table */}
      <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #E2E8F0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
          <thead>
            <tr style={{ background: '#0F172A', color: 'white' }}>
              {['S.No','Section','Description','Unit','Qty','Rate (₹)','Base Amt','Margin','Amount (₹)'].map(h => (
                <th key={h} style={{ padding: '10px 10px', fontSize: 11, fontWeight: 700, textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sections.map(sec => {
              const sItems = result.items.filter(i => i.section === sec);
              const secTotal = sItems.reduce((s, i) => s + i.amount, 0);
              return [
                <tr key={`hdr-${sec}`}>
                  <td colSpan={9} style={{ background: '#F1F5F9', padding: '7px 10px', fontSize: 12, fontWeight: 800, color: '#374151', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    ▸ {sec}
                  </td>
                </tr>,
                ...sItems.map((item, i) => (
                  <tr key={item.sno} style={{ background: i % 2 === 0 ? 'white' : '#FAFBFC' }}>
                    <td style={{ padding: '7px 10px', fontSize: 12, color: '#94A3B8' }}>{item.sno}</td>
                    <td style={{ padding: '7px 10px', fontSize: 12 }}><span style={{ background: '#EFF6FF', color: '#2563EB', padding: '2px 6px', borderRadius: 4, fontSize: 11 }}>{item.section}</span></td>
                    <td style={{ padding: '7px 10px', fontSize: 12, maxWidth: 220 }}>{item.description}</td>
                    <td style={{ padding: '7px 10px', fontSize: 12, textAlign: 'center' }}>{item.unit}</td>
                    <td style={{ padding: '7px 10px', fontSize: 12, textAlign: 'right' }}>{fq(item.quantity)}</td>
                    <td style={{ padding: '7px 10px', fontSize: 12, textAlign: 'right' }}>{fq(item.rate)}</td>
                    <td style={{ padding: '7px 10px', fontSize: 12, textAlign: 'right', color: '#64748B' }}>{fc(item.baseAmount)}</td>
                    <td style={{ padding: '7px 10px', fontSize: 12, textAlign: 'center', color: '#C2410C' }}>{item.marginPct}%</td>
                    <td style={{ padding: '7px 10px', fontSize: 13, fontWeight: 700, textAlign: 'right', color: '#0F172A' }}>{fc(item.amount)}</td>
                  </tr>
                )),
                <tr key={`tot-${sec}`} style={{ background: '#F8FAFC' }}>
                  <td colSpan={8} style={{ padding: '7px 10px', fontSize: 12, fontWeight: 700, textAlign: 'right', color: '#374151' }}>Section Total — {sec}</td>
                  <td style={{ padding: '7px 10px', fontSize: 13, fontWeight: 900, textAlign: 'right', color: '#0F172A' }}>{fc(secTotal)}</td>
                </tr>,
              ];
            })}
          </tbody>
          <tfoot>
            <tr style={{ background: '#0F172A' }}>
              <td colSpan={8} style={{ padding: '12px 10px', fontSize: 14, fontWeight: 900, color: 'white', textAlign: 'right' }}>GRAND TOTAL (incl. {result.marginPct}% margin)</td>
              <td style={{ padding: '12px 10px', fontSize: 16, fontWeight: 900, color: '#FC6E20', textAlign: 'right' }}>{fc(total)}</td>
            </tr>
            <tr style={{ background: '#1E293B' }}>
              <td colSpan={9} style={{ padding: '10px 10px', fontSize: 12, color: '#CBD5E1', fontStyle: 'italic' }}>
                {numberToWords(total)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

// ── MAIN WORKSTATION PAGE ─────────────────────────────────────────────────

export default function BOQWorkstationPage({ params }) {
  const { id } = params;
  const [project, setProject]     = useState(null);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [calcResult, setCalcResult] = useState(null);
  const [activeTab, setActiveTab]  = useState(0);
  const [saveMsg, setSaveMsg]      = useState('');
  const [localRates, setLocalRates] = useState(DEFAULT_RATES.map(r => ({ ...r })));

  // Section states
  const [floorsData, setFloorsData]     = useState([]);
  const [foundation, setFoundation]     = useState([]);
  const [plinthBeam, setPlinthBeam]     = useState([]);
  const [basement, setBasement]         = useState({});
  const [brickwork9, setBrickwork9]     = useState([]);
  const [brickwork4, setBrickwork4]     = useState([]);
  const [plastering, setPlastering]     = useState({ innerRows: [], ceilingArea: '' });
  const [sillLintel, setSillLintel]     = useState({});
  const [tileWork, setTileWork]         = useState({});
  const [doorsWindows, setDoorsWindows] = useState([]);
  const [slabConcrete, setSlabConcrete] = useState([]);
  const [staircase, setStaircase]       = useState({});
  const [mepOthers, setMepOthers]       = useState({});
  const [pileRows, setPileRows]         = useState([]);
  const [addlWorks, setAddlWorks]       = useState([]);

  // Project header edits
  const [header, setHeader] = useState({ title:'', client_name:'', client_phone:'', client_email:'', plot_address:'', floor_config:'G', margin_pct:'12', status:'draft', notes:'' });

  useEffect(() => { loadProject(); }, [id]);

  async function loadProject() {
    setLoading(true);
    try {
      const r = await fetch(`/api/boq-calculator/projects/${id}`);
      if (!r.ok) { setLoading(false); return; }
      const { project: p } = await r.json();
      setProject(p);
      setHeader({ title: p.title, client_name: p.client_name || '', client_phone: p.client_phone || '', client_email: p.client_email || '', plot_address: p.plot_address || '', floor_config: p.floor_config || 'G', margin_pct: String(p.margin_pct || 12), status: p.status || 'draft', notes: p.notes || '' });

      // Restore section data from DB
      const secMap = {};
      for (const s of (p.sections || [])) secMap[s.section_key] = s.data_json;
      if (secMap.floors)       setFloorsData(secMap.floors);
      if (secMap.foundation)   setFoundation(secMap.foundation);
      if (secMap.plinthBeam)   setPlinthBeam(secMap.plinthBeam);
      if (secMap.basement)     setBasement(secMap.basement);
      if (secMap.brickwork9)   setBrickwork9(secMap.brickwork9);
      if (secMap.brickwork4)   setBrickwork4(secMap.brickwork4);
      if (secMap.plastering)   setPlastering(secMap.plastering);
      if (secMap.sillLintel)   setSillLintel(secMap.sillLintel);
      if (secMap.tileWork)     setTileWork(secMap.tileWork);
      if (secMap.doorsWindows) setDoorsWindows(secMap.doorsWindows);
      if (secMap.slabConcrete) setSlabConcrete(secMap.slabConcrete);
      if (secMap.staircase)    setStaircase(secMap.staircase);
      if (secMap.mepOthers)    setMepOthers(secMap.mepOthers);
      if (secMap.pileRows)     setPileRows(secMap.pileRows);
      if (secMap.addlWorks)    setAddlWorks(secMap.addlWorks);

      // Merge DB rate overrides into local rates
      if (p.rates && p.rates.length > 0) {
        setLocalRates(prev => prev.map(r => {
          const dbR = p.rates.find(dr => dr.sno === r.sno);
          if (!dbR) return r;
          return { ...r, rateGFloor: Number(dbR.rate_g), rate1st: Number(dbR.rate_1st), rate2nd: Number(dbR.rate_2nd), rate3rd: Number(dbR.rate_3rd), rateAvg: Number(dbR.rate_avg) };
        }));
      }
    } catch (err) { console.error(err); }
    setLoading(false);
  }

  async function handleSaveAndCalculate() {
    setSaving(true); setSaveMsg('');
    try {
      // 1. Save project header
      await fetch(`/api/boq-calculator/projects/${id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...header, margin_pct: header.margin_pct }),
      });

      // 2. Save all sections in parallel
      const sectionMap = { floors: floorsData, foundation, plinthBeam, basement, brickwork9, brickwork4, plastering, sillLintel, tileWork, doorsWindows, slabConcrete, staircase, mepOthers: mepOthers, pileRows, addlWorks };
      await Promise.all(Object.entries(sectionMap).map(([section_key, data_json]) =>
        fetch(`/api/boq-calculator/projects/${id}/sections`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ section_key, data_json }),
        })
      ));

      // 3. Save rate overrides (only those different from defaults)
      const ratePayload = localRates.map(r => ({ sno: r.sno, category: r.category, description: r.description, unit: r.unit, rate_g: r.rateGFloor, rate_1st: r.rate1st, rate_2nd: r.rate2nd, rate_3rd: r.rate3rd, rate_avg: r.rateAvg }));
      await fetch(`/api/boq-calculator/projects/${id}/rates`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rates: ratePayload }),
      });

      // 4. Run calculation
      const inputs = { floors: floorsData, foundation, plinthBeam, basement, brickwork9, brickwork4, plastering, sillLintel, tileWork, doorsWindows, slabConcrete, staircase, others: mepOthers, addlWorks, pileRows };
      const calcR = await fetch(`/api/boq-calculator/projects/${id}/calculate`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs, marginPct: Number(header.margin_pct) }),
      });
      const calcData = await calcR.json();
      if (calcR.ok) {
        setCalcResult(calcData.result);
        setActiveTab(SECTIONS.length - 1); // jump to BOQ Result tab
        setSaveMsg('✅ Saved & calculated!');
      } else {
        setSaveMsg('⚠️ ' + (calcData.error || 'Calculation failed'));
      }
    } catch (err) { setSaveMsg('⚠️ Network error'); }
    setSaving(false);
    setTimeout(() => setSaveMsg(''), 4000);
  }

  async function handlePrintPDF() {
    // Log export
    await fetch(`/api/boq-calculator/projects/${id}/export`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ format: 'print', snapshot: calcResult }),
    });
    window.print();
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '80px 0', color: '#94A3B8' }}>Loading workstation…</div>;
  if (!project) return <div style={{ textAlign: 'center', padding: '80px 0', color: '#EF4444' }}>Project not found.</div>;

  const sectionComponents = [
    // 0: Info (header form inline)
    <div key="info" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14 }}>
      {[
        ['Project Title', 'title', 'text'],['Client Name', 'client_name', 'text'],['Client Phone', 'client_phone', 'tel'],
        ['Client Email', 'client_email', 'email'],['Plot Address', 'plot_address', 'text'],
      ].map(([lbl, key, type]) => (
        <label key={key} style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'flex', flexDirection: 'column', gap: 5 }}>
          {lbl}
          <input type={type} value={header[key]} onChange={e => setHeader(h => ({ ...h, [key]: e.target.value }))}
            style={{ padding: '8px 10px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14 }} />
        </label>
      ))}
      <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'flex', flexDirection: 'column', gap: 5 }}>
        Floor Config
        <select value={header.floor_config} onChange={e => setHeader(h => ({ ...h, floor_config: e.target.value }))}
          style={{ padding: '8px 10px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14 }}>
          {['G','G+1','G+2','G+3'].map(o => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'flex', flexDirection: 'column', gap: 5 }}>
        Margin %
        <input type="number" min={0} max={50} step={0.5} value={header.margin_pct} onChange={e => setHeader(h => ({ ...h, margin_pct: e.target.value }))}
          style={{ padding: '8px 10px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, textAlign: 'right' }} />
      </label>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'flex', flexDirection: 'column', gap: 5 }}>
        Status
        <select value={header.status} onChange={e => setHeader(h => ({ ...h, status: e.target.value }))}
          style={{ padding: '8px 10px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14 }}>
          {['draft','final','shared'].map(o => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'flex', flexDirection: 'column', gap: 5, gridColumn: '1 / -1' }}>
        Internal Notes
        <textarea rows={3} value={header.notes} onChange={e => setHeader(h => ({ ...h, notes: e.target.value }))}
          style={{ padding: '8px 10px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, resize: 'vertical', fontFamily: 'inherit' }} />
      </label>
    </div>,

    // 1: Floors L×B
    <SectionFloorsLB key="floors" floorConfig={header.floor_config} floorsData={floorsData} setFloorsData={setFloorsData} />,

    // 2: Foundation
    <SectionFoundation key="foundation" rows={foundation} setRows={setFoundation} />,

    // 3: Plinth Beam
    <SectionPlinthBeam key="plinth" rows={plinthBeam} setRows={setPlinthBeam} />,

    // 4: Basement
    <SectionBasement key="basement" data={basement} setData={setBasement} />,

    // 5: 9" Brickwork
    <SectionBrickwork key="bw9" rows={brickwork9} setRows={setBrickwork9} title="9-inch Flyash Brick Wall — wall length and height. Add door/window openings to deduct." />,

    // 6: 4.5" Brickwork
    <SectionBrickwork key="bw4" rows={brickwork4} setRows={setBrickwork4} title="4.5-inch Flyash Brick Partition Wall — wall length and height. Add door openings to deduct." />,

    // 7: Plastering
    <SectionPlastering key="plaster" data={plastering} setData={setPlastering} />,

    // 8: Sill / Lintel / Loft
    <SectionSillLintel key="sill" data={sillLintel} setData={setSillLintel} />,

    // 9: Tile Work
    <SectionTileWork key="tile" data={tileWork} setData={setTileWork} />,

    // 10: Doors & Windows
    <SectionDoorsWindows key="doors" rows={doorsWindows} setRows={setDoorsWindows} />,

    // 11: Slab Concrete
    <SectionSlabConcrete key="slab" rows={slabConcrete} setRows={setSlabConcrete} />,

    // 12: Staircase
    <SectionStaircase key="stair" data={staircase} setData={setStaircase} />,

    // 13: MEP / Others (Electrical, Plumbing, Terrace WP, Sump, Septic)
    <div key="mep">
      <SectionMEP data={mepOthers} setData={setMepOthers} />
      <div style={{ marginTop: 28 }}>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Additional Items (Sump, Septic, etc.)</h4>
        <SectionAdditional rows={addlWorks} setRows={setAddlWorks} />
      </div>
    </div>,

    // 14: Pile Foundation
    <SectionPile key="pile" rows={pileRows} setRows={setPileRows} />,

    // 15: Rate Sheet
    <SectionRateSheet key="rates" localRates={localRates} setLocalRates={setLocalRates} />,

    // 16: BOQ Result
    <SectionBOQResult key="result" result={calcResult} project={project} />,
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Top bar */}
      <div style={{ background: 'white', borderBottom: '1px solid #E2E8F0', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <Link href="/ops/boq-calculator" style={{ color: '#94A3B8', fontSize: 13, textDecoration: 'none' }}>← Projects</Link>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0F172A' }}>{header.title}</h2>
          <p style={{ margin: 0, fontSize: 12, color: '#94A3B8' }}>{header.client_name}{header.floor_config ? ` · ${header.floor_config}` : ''}{header.margin_pct ? ` · ${header.margin_pct}% margin` : ''}</p>
        </div>
        {saveMsg && <span style={{ fontSize: 13, color: saveMsg.startsWith('✅') ? '#16A34A' : '#C2410C', fontWeight: 600 }}>{saveMsg}</span>}
        {calcResult && (
          <button onClick={handlePrintPDF} style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: 10, padding: '8px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer', color: '#374151' }}>
            🖨 Print / PDF
          </button>
        )}
        <button
          onClick={handleSaveAndCalculate}
          disabled={saving}
          style={{ background: saving ? '#94A3B8' : 'linear-gradient(135deg,#FFB347,#FC6E20)', color: 'white', border: 'none', borderRadius: 10, padding: '10px 22px', fontSize: 14, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', boxShadow: '0 4px 14px rgba(252,110,32,0.3)' }}
        >
          {saving ? '⏳ Saving…' : '💾 Save & Calculate'}
        </button>
      </div>

      {/* Tab bar */}
      <div style={{ background: 'white', borderBottom: '1px solid #E2E8F0', padding: '0 16px', overflowX: 'auto', display: 'flex', gap: 0 }}>
        {SECTIONS.map((sec, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            style={{
              padding: '10px 14px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
              color: activeTab === i ? '#FC6E20' : '#64748B',
              borderBottom: activeTab === i ? '2px solid #FC6E20' : '2px solid transparent',
              transition: 'all 0.15s',
            }}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* Section content */}
      <div style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ background: 'white', borderRadius: 16, border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginTop: 0, marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
            {SECTIONS[activeTab]}
          </h3>
          {sectionComponents[activeTab]}
        </div>
      </div>
    </div>
  );
}
