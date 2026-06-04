'use client';
/**
 * CAD Floor Plan Canvas — Chennai / Tamil Nadu Drafter Style
 *
 * Renders (CAD plan view only):
 *   • Infinite dot-grid canvas (pan + zoom)
 *   • White plan sheet floating on grey background
 *   • Plot boundary (thick dashed)
 *   • Exterior walls (thick black) + Interior walls (thin black)
 *   • Door openings: white gap + MD / D / D1 / D2 label
 *   • Window openings: triple-line symbol + W / V / OP label
 *   • Staircase: parallel step lines + UP / DN label
 *   • Room name (bold uppercase) centered inside room
 *   • Room dimension ( 16' X 11' ) below name
 *   • External dimension chain with tick marks
 *   • North arrow
 *   • Title block (BUILDOGRAM | GROUND FLOOR PLAN …)
 *
 * Deliberately NOT rendered:
 *   • Furniture, beds, sofas, cars, dining tables
 *   • Kitchen counters, bathroom fixtures
 *   • Coloured fills, hatch patterns, icons
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from '../studio/studio.module.css';

// ─── Constants ────────────────────────────────────────────────────────────────
const PX      = 14;    // canvas pixels per foot
const MARGIN  = 90;    // gap around plan for dim-chain + labels
const TITLE_W = 160;   // right-side title block width

// ─── Formatting ───────────────────────────────────────────────────────────────
function fmtFt(val) {
  const v = Number(val) || 0;
  const ft = Math.floor(v);
  const inches = Math.round((v - ft) * 12);
  return inches === 0 ? `${ft}'` : `${ft}'${inches}"`;
}
function fmtDim(w, h) { return `${fmtFt(w)} X ${fmtFt(h)}`; }
function UP(s) { return (s || '').toUpperCase(); }

// ─── Konva lazy loader (SSR-safe) ─────────────────────────────────────────────
let K = null;
async function loadKonva() {
  if (K) return K;
  await import('konva/lib/Core');
  const rk = await import('react-konva');
  K = { Stage: rk.Stage, Layer: rk.Layer, Rect: rk.Rect, Line: rk.Line,
        Text: rk.Text, Path: rk.Path, Group: rk.Group, Arrow: rk.Arrow };
  return K;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function FloorPlanCanvas({ planData, selectedRoom, onSelectRoom }) {
  const containerRef = useRef(null);
  const toolbarRef   = useRef(null);
  const stageRef     = useRef(null);
  const [ready,      setReady]      = useState(false);
  const [stageSize,  setStageSize]  = useState({ width: 900, height: 650 });
  const [stagePos,   setStagePos]   = useState({ x: 0, y: 0 });
  const [stageScale, setStageScale] = useState(1);
  const [floorIdx,   setFloorIdx]   = useState(0);
  const [layers, setLayers] = useState({
    walls: true, openings: true, stairs: true, labels: true, dimensions: true,
  });

  useEffect(() => { loadKonva().then(() => setReady(true)); }, []);

  // Resize observer — container minus toolbar
  useEffect(() => {
    if (!containerRef.current) return;
    const measure = () => {
      const c = containerRef.current?.getBoundingClientRect();
      const t = toolbarRef.current?.getBoundingClientRect();
      if (!c) return;
      setStageSize({ width: Math.max(200, c.width), height: Math.max(100, c.height - (t?.height || 36)) });
    };
    const obs = new ResizeObserver(measure);
    obs.observe(containerRef.current);
    if (toolbarRef.current) obs.observe(toolbarRef.current);
    return () => obs.disconnect();
  }, []);

  // Wheel zoom centred on cursor
  const onWheel = useCallback(e => {
    e.evt.preventDefault();
    const stage = stageRef.current;
    if (!stage) return;
    const ptr = stage.getPointerPosition();
    const factor = e.evt.deltaY < 0 ? 1.12 : 1 / 1.12;
    const ns = Math.min(8, Math.max(0.1, stageScale * factor));
    setStagePos({ x: ptr.x - (ptr.x - stagePos.x) * (ns / stageScale), y: ptr.y - (ptr.y - stagePos.y) * (ns / stageScale) });
    setStageScale(ns);
  }, [stageScale, stagePos]);

  // ── Guard: no data / not loaded ────────────────────────────────────────────
  if (!planData?.floors?.length) {
    return (
      <div className={styles.emptyState}>
        <div style={{ fontSize: 52 }}>📐</div>
        <div style={{ fontSize: 14, marginTop: 8, color: '#555' }}>Generate a floor plan to begin</div>
      </div>
    );
  }
  if (!ready) return <div className={styles.emptyState}><span style={{ color: '#888', fontSize: 13 }}>Loading CAD canvas…</span></div>;

  const { Stage, Layer, Rect, Line, Text, Group, Arrow } = K;

  const floor  = planData.floors[floorIdx] || planData.floors[0];
  const plotW  = Number(floor.width  || planData.plotWidth  || 30);
  const plotH  = Number(floor.depth  || planData.plotDepth  || 40);
  const planW  = plotW * PX;
  const planH  = plotH * PX;
  const sheetLabel = floor.floorLabel || (floor.floorNumber === 1 ? 'GROUND FLOOR PLAN' : floor.floorNumber === 2 ? 'FIRST FLOOR PLAN' : 'TERRACE FLOOR PLAN');

  // Coordinate helpers
  const tx = ft => MARGIN + Number(ft) * PX;
  const ty = ft => MARGIN + Number(ft) * PX;
  const px = ft => Number(ft) * PX;

  const rooms   = (floor.rooms   || []).filter(r => px(r.width) > 4 && px(r.height) > 4);
  const walls   = floor.walls   || [];
  const doors   = floor.doors   || [];
  const windows = floor.windows || [];

  // ── CAD colour palette (strict B/W) ───────────────────────────────────────
  const BW = { wall: '#000', dim: '#222', grid: '#e0e0e0', gap: '#fff', label: '#000', title: '#000' };

  // ─── Layer renderers ───────────────────────────────────────────────────────

  /** White plan area fill + subtle reference grid */
  function renderBackground() {
    const els = [
      <Rect key="planbg" x={MARGIN} y={MARGIN} width={planW} height={planH} fill="#ffffff" shadow={false} listening={false} />,
    ];
    for (let f = 0; f <= plotW; f += 5)
      els.push(<Line key={`gx${f}`} points={[tx(f), MARGIN, tx(f), MARGIN + planH]} stroke={BW.grid} strokeWidth={0.5} listening={false} />);
    for (let f = 0; f <= plotH; f += 5)
      els.push(<Line key={`gy${f}`} points={[MARGIN, ty(f), MARGIN + planW, ty(f)]} stroke={BW.grid} strokeWidth={0.5} listening={false} />);
    return els;
  }

  /** Clickable room hit areas (transparent) */
  function renderRoomHits() {
    return rooms.map(r => (
      <Rect key={`hit-${r.id}`}
        x={tx(r.x)} y={ty(r.y)} width={px(r.width)} height={px(r.height)}
        fill={selectedRoom?.id === r.id ? 'rgba(0,0,0,0.05)' : 'transparent'}
        stroke={selectedRoom?.id === r.id ? '#333' : 'transparent'}
        strokeWidth={1} dash={selectedRoom?.id === r.id ? [4, 3] : []}
        onClick={() => onSelectRoom(selectedRoom?.id === r.id ? null : r)}
        onTap={() => onSelectRoom(selectedRoom?.id === r.id ? null : r)}
        style={{ cursor: 'pointer' }}
      />
    ));
  }

  /** Plot boundary dashed outline */
  function renderBoundary() {
    return (
      <Rect x={MARGIN} y={MARGIN} width={planW} height={planH}
        stroke="#000" strokeWidth={2} dash={[8, 5]} fill="transparent" listening={false} />
    );
  }

  /** Walls */
  function renderWalls() {
    if (!layers.walls) return null;
    return walls.map((w, i) => (
      <Line key={w.id || i}
        points={[tx(w.x1), ty(w.y1), tx(w.x2), ty(w.y2)]}
        stroke={BW.wall}
        strokeWidth={w.type === 'exterior' ? 7 : 2.5}
        lineCap="square" lineJoin="miter"
        listening={false}
      />
    ));
  }

  /** Doors — white gap + thin edge lines + label (MD / D / D1) */
  function renderDoors() {
    if (!layers.openings) return null;
    return doors.map((d, i) => {
      const x  = tx(d.x), y = ty(d.y);
      const w  = px(d.width || 3);
      const horiz = (d.side || 'south') === 'north' || d.side === 'south';
      const ex  = horiz ? x + w : x, ey = horiz ? y : y + w;
      const sym = d.symbol || 'D';
      const mx  = horiz ? x + w / 2 : x, my = horiz ? y : y + w / 2;

      return (
        <Group key={d.id || `d${i}`} listening={false}>
          {/* Clear gap */}
          <Line points={[x, y, ex, ey]} stroke={BW.gap} strokeWidth={9} lineCap="butt" />
          {/* Thin door line */}
          <Line points={[x, y, ex, ey]} stroke={BW.wall} strokeWidth={1.2} />
          {/* Symbol label */}
          <Text
            x={horiz ? mx - 12 : mx + 3}
            y={horiz ? my - 16 : my - 6}
            text={sym}
            fontSize={7}
            fontFamily="Arial"
            fontStyle="bold"
            fill="#000"
          />
        </Group>
      );
    });
  }

  /** Windows / Ventilators — white gap + triple-line mark + label */
  function renderWindows() {
    if (!layers.openings) return null;
    return windows.map((wn, i) => {
      const x    = tx(wn.x), y = ty(wn.y);
      const w    = px(wn.width || 4);
      const horiz = (wn.side || 'north') === 'north' || wn.side === 'south';
      const ex   = horiz ? x + w : x, ey = horiz ? y : y + w;
      const t    = 4; // sill depth
      const sym  = wn.symbol || 'W';
      const mx   = horiz ? x + w / 2 : x, my = horiz ? y : y + w / 2;

      return (
        <Group key={wn.id || `w${i}`} listening={false}>
          {/* Clear wall */}
          <Line points={[x, y, ex, ey]} stroke={BW.gap} strokeWidth={10} lineCap="butt" />
          {/* Centre line */}
          <Line points={[x, y, ex, ey]} stroke={BW.wall} strokeWidth={1} />
          {/* Sill lines */}
          <Line points={horiz ? [x, y - t, ex, ey - t] : [x - t, y, ex - t, ey]} stroke={BW.wall} strokeWidth={0.8} />
          <Line points={horiz ? [x, y + t, ex, ey + t] : [x + t, y, ex + t, ey]} stroke={BW.wall} strokeWidth={0.8} />
          {/* Symbol */}
          <Text
            x={horiz ? mx - 8 : mx + 5}
            y={horiz ? my - 18 : my - 5}
            text={sym}
            fontSize={7}
            fontFamily="Arial"
            fontStyle="bold"
            fill="#000"
          />
        </Group>
      );
    });
  }

  /** Staircase — parallel tread lines + UP / DN text + arrow */
  function renderStairs() {
    if (!layers.stairs) return null;
    return rooms
      .filter(r => r.type === 'stair')
      .map(r => {
        const rx = tx(r.x), ry = ty(r.y);
        const rw = px(r.width), rh = px(r.height);
        const treads = Math.max(6, Math.min(18, Math.round(rh / (PX * 0.85))));
        const th = rh / treads;
        const lines = [];
        for (let s = 0; s <= treads; s++) {
          lines.push(
            <Line key={s}
              points={[rx, ry + s * th, rx + rw, ry + s * th]}
              stroke="#000"
              strokeWidth={s === 0 || s === treads ? 2 : 0.8}
              listening={false}
            />
          );
        }
        // UP arrow from bottom going up
        lines.push(
          <Arrow key="arr"
            points={[rx + rw / 2, ry + rh - 6, rx + rw / 2, ry + 8]}
            stroke="#000" strokeWidth={1} fill="#000"
            pointerLength={7} pointerWidth={6} listening={false}
          />
        );
        // UP label
        lines.push(
          <Text key="uplbl"
            x={rx + rw / 2 - 8} y={ry + 2}
            text="UP" fontSize={7} fontFamily="Arial" fontStyle="bold" fill="#000"
            listening={false}
          />
        );
        return <Group key={r.id}>{lines}</Group>;
      });
  }

  /** Room labels: NAME (bold uppercase) + dimension string */
  function renderLabels() {
    if (!layers.labels) return null;
    return rooms
      .filter(r => r.type !== 'stair')
      .map(r => {
        const rx = tx(r.x), ry = ty(r.y);
        const rw = px(r.width), rh = px(r.height);
        if (rw < 22 || rh < 16) return null;

        const name = UP(r.name);
        const dim  = fmtDim(r.width, r.height);
        const cy   = ry + rh / 2;
        // Scale font so it fits the room width
        const nameFontSize = Math.max(6.5, Math.min(10.5, rw / 8.5));
        const dimFontSize  = Math.max(6,   Math.min(9,    rw / 10));

        return (
          <Group key={`lbl-${r.id}`} listening={false}>
            <Text
              x={rx + 4} y={cy - nameFontSize - 2}
              width={rw - 8}
              text={name}
              fontSize={nameFontSize}
              fontFamily="Arial"
              fontStyle="bold"
              fill={BW.label}
              align="center"
            />
            {layers.dimensions && rw > 34 && rh > 22 && (
              <Text
                x={rx + 4} y={cy + 3}
                width={rw - 8}
                text={dim}
                fontSize={dimFontSize}
                fontFamily="Arial"
                fill={BW.label}
                align="center"
              />
            )}
          </Group>
        );
      });
  }

  /** External dimension chain — overall + per-room ticks */
  function renderDimensions() {
    if (!layers.dimensions) return null;
    const els = [];
    const TICK = 7;

    function dimSeg(x1, y1, x2, y2, label, vert = false) {
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      const key = `ds-${x1}-${y1}-${x2}-${y2}`;
      els.push(
        <Group key={key} listening={false}>
          <Line points={[x1, y1, x2, y2]} stroke={BW.dim} strokeWidth={0.8} />
          <Line points={vert ? [x1 - TICK, y1, x1 + TICK, y1] : [x1, y1 - TICK, x1, y1 + TICK]} stroke={BW.dim} strokeWidth={0.8} />
          <Line points={vert ? [x2 - TICK, y2, x2 + TICK, y2] : [x2, y2 - TICK, x2, y2 + TICK]} stroke={BW.dim} strokeWidth={0.8} />
          <Text
            x={vert ? mx - 5 : mx - 16}
            y={vert ? my - 18 : my + 4}
            text={label}
            fontSize={8.5}
            fontFamily="Arial"
            fontStyle="bold"
            fill={BW.dim}
            rotation={vert ? -90 : 0}
          />
        </Group>
      );
    }

    // Overall width (top, two rows)
    const topY1 = MARGIN - 28, topY2 = MARGIN - 46;
    dimSeg(MARGIN, topY1, MARGIN + planW, topY1, fmtFt(plotW));
    // Overall height (left, two rows)
    const lftX1 = MARGIN - 30, lftX2 = MARGIN - 50;
    dimSeg(lftX1, MARGIN, lftX1, MARGIN + planH, fmtFt(plotH), true);

    // Per-room width ticks along top
    const topRooms = [...rooms].filter(r => Number(r.y) <= 2).sort((a, b) => Number(a.x) - Number(b.x));
    let curX = MARGIN;
    topRooms.forEach(r => {
      const rEnd = tx(r.x) + px(r.width);
      if (rEnd > curX + 6) {
        dimSeg(curX, topY2, rEnd, topY2, fmtFt(r.width));
        curX = rEnd;
      }
    });

    // Per-room height ticks along left
    const leftRooms = [...rooms].filter(r => Number(r.x) <= 2).sort((a, b) => Number(a.y) - Number(b.y));
    let curY = MARGIN;
    leftRooms.forEach(r => {
      const rEnd = ty(r.y) + px(r.height);
      if (rEnd > curY + 6) {
        dimSeg(lftX2, curY, lftX2, rEnd, fmtFt(r.height), true);
        curY = rEnd;
      }
    });

    // ROAD label at bottom
    els.push(
      <Text key="road"
        x={MARGIN + planW / 2 - 20} y={MARGIN + planH + 10}
        text={floor.roadLabel || 'ROAD'}
        fontSize={9} fontFamily="Arial" fontStyle="bold" fill="#555"
        listening={false}
      />
    );

    return els;
  }

  /** North arrow — simple compass with N */
  function renderNorth() {
    const nx = MARGIN + planW + TITLE_W / 2 + 12;
    const ny = MARGIN + 22;
    return (
      <Group key="north" listening={false}>
        {/* Circle */}
        <Line points={
          Array.from({ length: 37 }, (_, i) => {
            const a = (i / 36) * Math.PI * 2;
            return [nx + Math.cos(a) * 14, ny + 20 + Math.sin(a) * 14];
          }).flat()
        } stroke="#000" strokeWidth={1} closed tension={0} />
        {/* N arrow */}
        <Arrow points={[nx, ny + 34, nx, ny + 8]} stroke="#000" strokeWidth={1.5} fill="#000" pointerLength={7} pointerWidth={6} />
        <Text x={nx - 5} y={ny + 38} text="N" fontSize={11} fontFamily="Arial" fontStyle="bold" fill="#000" />
        <Text x={nx - 4} y={ny + 1}  text="S" fontSize={9} fontFamily="Arial" fill="#000" />
        <Text x={nx - 20} y={ny + 17} text="W" fontSize={9} fontFamily="Arial" fill="#000" />
        <Text x={nx + 13} y={ny + 17} text="E" fontSize={9} fontFamily="Arial" fill="#000" />
      </Group>
    );
  }

  /** Title block — right side panel */
  function renderTitleBlock() {
    const tbX = MARGIN + planW + 10;
    const tbY = MARGIN + 85;
    const tbW = TITLE_W - 16;
    const area = planData.summary?.builtUpArea || Math.round(plotW * plotH * 0.80);

    const row = (label, value, y) => (
      <Group key={`tb-${y}`} listening={false}>
        <Text x={tbX + 4} y={tbY + y}      text={label} fontSize={7}   fontFamily="Arial" fontStyle="bold" fill="#000" />
        <Text x={tbX + 4} y={tbY + y + 10} text={value} fontSize={7.5} fontFamily="Arial"                  fill="#000" />
      </Group>
    );

    return (
      <Group key="titleblock" listening={false}>
        {/* Outer box */}
        <Rect x={tbX} y={tbY} width={tbW} height={210} stroke="#000" strokeWidth={1} fill="#fff" />
        {/* Header */}
        <Rect x={tbX} y={tbY} width={tbW} height={24} fill="#000" />
        <Text x={tbX + 4} y={tbY + 7} text="BUILDOGRAM" fontSize={10.5} fontFamily="Arial" fontStyle="bold" fill="#fff" />
        {/* Floor label row */}
        <Rect x={tbX} y={tbY + 24} width={tbW} height={18} fill="#f5f5f5" />
        <Text x={tbX + 4} y={tbY + 29} text={sheetLabel} fontSize={8} fontFamily="Arial" fontStyle="bold" fill="#000" />
        <Line points={[tbX, tbY + 42, tbX + tbW, tbY + 42]} stroke="#000" strokeWidth={0.5} />
        {/* Data rows */}
        {row('Plot Size', `${fmtFt(plotW)} X ${fmtFt(plotH)}`, 48)}
        <Line points={[tbX, tbY + 72, tbX + tbW, tbY + 72]} stroke="#ccc" strokeWidth={0.5} />
        {row('Floor', `${floor.floorNumber || 1} of ${planData.floors.length}`, 76)}
        <Line points={[tbX, tbY + 100, tbX + tbW, tbY + 100]} stroke="#ccc" strokeWidth={0.5} />
        {row('Built-up Area', `${area} sqft`, 104)}
        <Line points={[tbX, tbY + 128, tbX + tbW, tbY + 128]} stroke="#ccc" strokeWidth={0.5} />
        {row('Option', planData.name || 'Layout', 132)}
        <Line points={[tbX, tbY + 156, tbX + tbW, tbY + 156]} stroke="#000" strokeWidth={0.5} />
        {/* Disclaimer */}
        <Text x={tbX + 4} y={tbY + 162} text="⚠ CONCEPT PLAN ONLY" fontSize={7} fontFamily="Arial" fontStyle="bold" fill="#c00" />
        <Text x={tbX + 4} y={tbY + 174} text="Not for construction or" fontSize={6.5} fontFamily="Arial" fill="#c00" />
        <Text x={tbX + 4} y={tbY + 184} text="municipality submission." fontSize={6.5} fontFamily="Arial" fill="#c00" />
        <Text x={tbX + 4} y={tbY + 198} text="Engineer review required." fontSize={6.5} fontFamily="Arial" fill="#c00" />
      </Group>
    );
  }

  // ── Toolbar data ──────────────────────────────────────────────────────────
  const FLOOR_LABELS = { 1: 'Ground', 2: 'First', 3: 'Terrace', 4: 'Basement' };
  const LAYER_BTNS = [
    { k: 'walls', l: 'Walls' }, { k: 'openings', l: 'Openings' },
    { k: 'stairs', l: 'Stairs' }, { k: 'labels', l: 'Labels' },
    { k: 'dimensions', l: 'Dims' },
  ];

  const btnBase = { border: 'none', borderRadius: 3, cursor: 'pointer', fontSize: 10, padding: '2px 9px' };
  const activeBtn = { ...btnBase, background: '#fff', color: '#000' };
  const inactiveBtn = { ...btnBase, background: '#3a3a3a', color: '#999' };
  const zoomBtn = { ...btnBase, background: '#2d2d2d', color: '#ddd', fontSize: 13 };

  return (
    <div className={styles.canvasContainer} ref={containerRef}>

      {/* ── Toolbar ──────────────────────────────────────────────────────── */}
      <div ref={toolbarRef} style={{
        display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6,
        padding: '5px 14px', background: '#1a1a1a', flexShrink: 0, userSelect: 'none',
      }}>
        {/* Floor tabs */}
        <span style={{ color: '#777', fontSize: 10, letterSpacing: 1 }}>FLOOR</span>
        {planData.floors.map((f, i) => (
          <button key={i} onClick={() => setFloorIdx(i)} style={{
            padding: '3px 11px', fontSize: 10.5,
            background: i === floorIdx ? '#ffffff' : '#2d2d2d',
            color: i === floorIdx ? '#000' : '#aaa',
            border: '1px solid #555', borderRadius: 3, cursor: 'pointer',
          }}>
            {FLOOR_LABELS[f.floorNumber] || `F${f.floorNumber}`}
          </button>
        ))}

        <div style={{ width: 1, height: 20, background: '#444', margin: '0 4px' }} />

        {/* Layer toggles */}
        <span style={{ color: '#777', fontSize: 10, letterSpacing: 1 }}>LAYERS</span>
        {LAYER_BTNS.map(b => (
          <button key={b.k} onClick={() => setLayers(l => ({ ...l, [b.k]: !l[b.k] }))}
            style={layers[b.k] ? activeBtn : inactiveBtn}
          >{b.l}</button>
        ))}

        <div style={{ width: 1, height: 20, background: '#444', margin: '0 4px' }} />

        {/* Zoom */}
        <button onClick={() => setStageScale(s => Math.min(s * 1.2, 8))} style={zoomBtn}>+</button>
        <span style={{ fontSize: 10, color: '#bbb', minWidth: 36, textAlign: 'center' }}>{Math.round(stageScale * 100)}%</span>
        <button onClick={() => setStageScale(s => Math.max(s / 1.2, 0.1))} style={zoomBtn}>−</button>
        <button onClick={() => { setStageScale(1); setStagePos({ x: 0, y: 0 }); }}
          style={{ ...zoomBtn, fontSize: 10 }}>Fit</button>
      </div>

      {/* ── Infinite canvas with dot-grid background ──────────────────── */}
      <div style={{
        flex: 1, overflow: 'hidden', cursor: 'grab',
        background: '#c0c0c0',
        backgroundImage: 'radial-gradient(circle, #8a8a8a 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}>
        <Stage
          ref={stageRef}
          width={stageSize.width}
          height={stageSize.height}
          scaleX={stageScale} scaleY={stageScale}
          x={stagePos.x}     y={stagePos.y}
          onWheel={onWheel}
          draggable
          onDragEnd={e => setStagePos({ x: e.target.x(), y: e.target.y() })}
        >
          {/* 1. White plan area + reference grid */}
          <Layer>{renderBackground()}</Layer>

          {/* 2. Transparent room hit areas */}
          <Layer>{renderRoomHits()}</Layer>

          {/* 3. Walls */}
          <Layer>{renderWalls()}{renderBoundary()}</Layer>

          {/* 4. Door + window openings */}
          <Layer>{renderDoors()}{renderWindows()}</Layer>

          {/* 5. Stair step lines */}
          <Layer>{renderStairs()}</Layer>

          {/* 6. Room labels + dimension strings */}
          <Layer>{renderLabels()}{renderDimensions()}</Layer>

          {/* 7. North arrow + title block */}
          <Layer>{renderNorth()}{renderTitleBlock()}</Layer>
        </Stage>
      </div>
    </div>
  );
}
