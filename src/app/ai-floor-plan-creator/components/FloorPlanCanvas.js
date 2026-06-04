'use client';
/**
 * CAD Floor Plan Canvas — Clean Black-and-White Indian CAD Style
 * 
 * Renders ONLY:
 *   • Plot boundary
 *   • Walls (thick exterior, thin interior)
 *   • Wall openings (doors + windows as gaps)
 *   • Staircase as step lines
 *   • Room name + measurement labels inside each room
 *   • External dimension strings with tick marks
 *   • North arrow + title block
 * 
 * Deliberately excluded from render:
 *   • Furniture, beds, sofas, dining, cars
 *   • Bathroom/kitchen fixtures
 *   • Wet-area hatch fills
 *   • Colored fills
 *   • Icons / decorative elements
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from '../studio/studio.module.css';

// Pixels per foot
const PX = 14;
const MARGIN = 80;          // space around plan for dimension lines
const TITLE_W = 155;        // title block width on right

// ─── Formatting helpers ───────────────────────────────────────────────────────

/** Format feet as  16'×11'  or  6'5"×5'3" */
function fmtFt(val) {
  const ft = Math.floor(val);
  const inches = Math.round((val - ft) * 12);
  if (inches === 0) return `${ft}'`;
  return `${ft}'${inches}"`;
}

function fmtDim(w, h) {
  return `${fmtFt(w)} X ${fmtFt(h)}`;
}

/** Capitalise like traditional CAD labels */
function cadLabel(name) {
  return (name || '').toUpperCase();
}

// ─── react-konva lazy loader ─────────────────────────────────────────────────
let K = null; // { Stage, Layer, Rect, Line, Text, Path, Group, Arrow }

async function loadKonva() {
  if (K) return K;
  await import('konva/lib/Core');
  const rk = await import('react-konva');
  K = {
    Stage: rk.Stage, Layer: rk.Layer,
    Rect: rk.Rect, Line: rk.Line, Text: rk.Text,
    Path: rk.Path, Group: rk.Group, Arrow: rk.Arrow,
    Circle: rk.Circle,
  };
  return K;
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function FloorPlanCanvas({ planData, selectedRoom, onSelectRoom }) {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const [konvaLoaded, setKonvaLoaded] = useState(false);
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [stageScale, setStageScale] = useState(1);
  const [floorIdx, setFloorIdx] = useState(0);
  const [layers, setLayers] = useState({
    walls: true, openings: true, labels: true, dimensions: true, stairs: true,
  });

  // Load Konva client-side only
  useEffect(() => { loadKonva().then(() => setKonvaLoaded(true)); }, []);

  // Track container size
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver(e => {
      const r = e[0].contentRect;
      setStageSize({ width: r.width || 800, height: r.height || 600 });
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // Mouse-wheel zoom centred on cursor
  const onWheel = useCallback(e => {
    e.evt.preventDefault();
    const stage = stageRef.current;
    if (!stage) return;
    const ptr = stage.getPointerPosition();
    const factor = e.evt.deltaY < 0 ? 1.1 : 1 / 1.1;
    const newScale = Math.min(8, Math.max(0.15, stageScale * factor));
    setStagePos({
      x: ptr.x - (ptr.x - stagePos.x) * (newScale / stageScale),
      y: ptr.y - (ptr.y - stagePos.y) * (newScale / stageScale),
    });
    setStageScale(newScale);
  }, [stageScale, stagePos]);

  // ── Empty / loading states ────────────────────────────────────────────────
  if (!planData || !planData.floors?.length) {
    return (
      <div className={styles.emptyState}>
        <div style={{ fontSize: 48 }}>📐</div>
        <div>Generate a floor plan to begin</div>
      </div>
    );
  }
  if (!konvaLoaded) {
    return <div className={styles.emptyState}><span style={{ fontSize: 13, color: '#888' }}>Loading CAD canvas…</span></div>;
  }

  const { Stage, Layer, Rect, Line, Text, Path, Group, Arrow, Circle } = K;

  const floor = planData.floors[floorIdx] || planData.floors[0];
  const plotW = Number(floor.width || planData.plotWidth || 30);
  const plotH = Number(floor.depth || planData.plotDepth || 40);
  const planW = plotW * PX;
  const planH = plotH * PX;

  // Coordinate helpers
  const tx = ft => MARGIN + Number(ft) * PX;
  const ty = ft => MARGIN + Number(ft) * PX;
  const px = ft => Number(ft) * PX;

  const rooms = floor.rooms || [];
  const walls = floor.walls || [];
  const doors = floor.doors || [];
  const windows = floor.windows || [];

  // ── CAD colours (strict BW) ───────────────────────────────────────────────
  const C = {
    bg: '#ffffff',
    paper: '#ffffff',
    plotBound: '#000000',
    setback: '#888888',
    extWall: '#000000',
    intWall: '#000000',
    opening: '#ffffff',   // gap colour
    door: '#000000',
    window: '#000000',
    stair: '#000000',
    roomFill: 'transparent',
    selectedFill: 'rgba(0,0,0,0.04)',
    label: '#000000',
    dim: '#000000',
    dimTick: '#000000',
    title: '#000000',
    grid: '#e8e8e8',
  };

  // ── Layer renderers ───────────────────────────────────────────────────────

  /** Light reference grid (5' squares) */
  function renderGrid() {
    const els = [];
    els.push(<Rect key="bg" x={0} y={0} width={MARGIN * 2 + planW + TITLE_W + 60} height={MARGIN * 2 + planH + 60} fill={C.bg} />);
    for (let f = 0; f <= plotW; f += 5)
      els.push(<Line key={`gx${f}`} points={[tx(f), MARGIN, tx(f), MARGIN + planH]} stroke={C.grid} strokeWidth={0.5} listening={false} />);
    for (let f = 0; f <= plotH; f += 5)
      els.push(<Line key={`gy${f}`} points={[MARGIN, ty(f), MARGIN + planW, ty(f)]} stroke={C.grid} strokeWidth={0.5} listening={false} />);
    return els;
  }

  /** Room fills — white, or very subtle tint when selected */
  function renderRooms() {
    return rooms.map(room => {
      const isSelected = selectedRoom?.id === room.id;
      return (
        <Rect
          key={room.id}
          x={tx(room.x)} y={ty(room.y)}
          width={px(room.width)} height={px(room.height)}
          fill={isSelected ? C.selectedFill : C.roomFill}
          stroke="transparent"
          onClick={() => onSelectRoom(isSelected ? null : room)}
          onTap={() => onSelectRoom(isSelected ? null : room)}
          style={{ cursor: 'pointer' }}
        />
      );
    });
  }

  /** Walls — thick exterior (6px), thin interior (2px) */
  function renderWalls() {
    if (!layers.walls) return null;
    return walls.map((w, i) => {
      const ext = w.type === 'exterior';
      return (
        <Line
          key={w.id || i}
          points={[tx(w.x1), ty(w.y1), tx(w.x2), ty(w.y2)]}
          stroke={C.extWall}
          strokeWidth={ext ? 6 : 2}
          lineCap="square" lineJoin="miter"
          listening={false}
        />
      );
    });
  }

  /** Plot boundary (dashed, outside walls) */
  function renderBoundary() {
    return (
      <Rect
        x={MARGIN} y={MARGIN}
        width={planW} height={planH}
        stroke={C.plotBound}
        strokeWidth={1.5}
        dash={[6, 4]}
        fill="transparent"
        listening={false}
      />
    );
  }

  /** Doors — white gap + simple leaf line, no swing arc decoration */
  function renderDoors() {
    if (!layers.openings) return null;
    return doors.map((door, i) => {
      const x = tx(door.x), y = ty(door.y);
      const w = px(door.width || 3);
      const side = door.side || 'south';
      const horiz = side === 'north' || side === 'south';
      const gapPts = horiz ? [x, y, x + w, y] : [x, y, x, y + w];
      return (
        <Group key={door.id || `d${i}`} listening={false}>
          {/* Clear the wall */}
          <Line points={gapPts} stroke={C.opening} strokeWidth={8} lineCap="butt" />
          {/* Door line (thin) */}
          <Line points={gapPts} stroke={C.door} strokeWidth={1} />
        </Group>
      );
    });
  }

  /** Windows — white gap + double tick marks (classic CAD window symbol) */
  function renderWindows() {
    if (!layers.openings) return null;
    return windows.map((win, i) => {
      const x = tx(win.x), y = ty(win.y);
      const w = px(win.width || 4);
      const side = win.side || 'north';
      const horiz = side === 'north' || side === 'south';
      const endX = horiz ? x + w : x;
      const endY = horiz ? y : y + w;
      const t = 4; // tick depth
      return (
        <Group key={win.id || `w${i}`} listening={false}>
          <Line points={[x, y, endX, endY]} stroke={C.opening} strokeWidth={9} lineCap="butt" />
          {/* Three lines = traditional window symbol */}
          <Line points={[x, y, endX, endY]} stroke={C.window} strokeWidth={0.8} />
          <Line
            points={horiz ? [x, y - t, endX, endY - t] : [x - t, y, endX - t, endY]}
            stroke={C.window} strokeWidth={0.8}
          />
          <Line
            points={horiz ? [x, y + t, endX, endY + t] : [x + t, y, endX + t, endY]}
            stroke={C.window} strokeWidth={0.8}
          />
        </Group>
      );
    });
  }

  /** Staircase — simple horizontal step lines with direction arrow */
  function renderStairs() {
    if (!layers.stairs) return null;
    return rooms
      .filter(r => r.type === 'stair')
      .map(r => {
        const rx = tx(r.x), ry = ty(r.y);
        const rw = px(r.width), rh = px(r.height);
        const steps = Math.max(6, Math.round(rh / (PX * 0.9)));
        const stepH = rh / steps;
        const lines = [];
        for (let s = 0; s <= steps; s++) {
          lines.push(
            <Line key={s} points={[rx, ry + s * stepH, rx + rw, ry + s * stepH]}
              stroke={C.stair} strokeWidth={s === 0 || s === steps ? 1.5 : 0.8} listening={false} />
          );
        }
        lines.push(
          <Arrow key="arr" points={[rx + rw / 2, ry + rh - 8, rx + rw / 2, ry + 8]}
            stroke={C.stair} strokeWidth={1} fill={C.stair}
            pointerLength={6} pointerWidth={5} listening={false} />
        );
        return <Group key={r.id}>{lines}</Group>;
      });
  }

  /** Room labels — CAD uppercase name + dimension string */
  function renderLabels() {
    if (!layers.labels) return null;
    return rooms
      .filter(r => r.type !== 'stair') // stair uses step lines instead
      .map(r => {
        const rx = tx(r.x), ry = ty(r.y);
        const rw = px(r.width), rh = px(r.height);
        if (rw < 24 || rh < 18) return null;

        const name = cadLabel(r.name);
        const dim = fmtDim(r.width, r.height);
        const cx = rx + rw / 2;
        const cy = ry + rh / 2;
        const fontSize = Math.max(7, Math.min(10, rw / 9));
        const subSize = Math.max(6, Math.min(9, rw / 11));

        return (
          <Group key={`lbl-${r.id}`} listening={false}>
            <Text
              x={rx + 3} y={cy - fontSize - 2}
              width={rw - 6}
              text={name}
              fontSize={fontSize}
              fontFamily="Arial, sans-serif"
              fontStyle="bold"
              fill={C.label}
              align="center"
            />
            {layers.dimensions && rw > 36 && rh > 24 && (
              <Text
                x={rx + 3} y={cy + 3}
                width={rw - 6}
                text={dim}
                fontSize={subSize}
                fontFamily="Arial, sans-serif"
                fill={C.label}
                align="center"
              />
            )}
          </Group>
        );
      });
  }

  /** External dimension strings with tick marks — around the plan */
  function renderDimensions() {
    if (!layers.dimensions) return null;
    const els = [];
    const OFF = 30; // offset from plan edge
    const TICK = 6;

    // Helper: draw a dimension line segment with label
    function dimLine(x1, y1, x2, y2, label, rotate = false) {
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      els.push(
        <Group key={`dm-${x1}-${y1}-${x2}-${y2}`} listening={false}>
          <Line points={[x1, y1, x2, y2]} stroke={C.dim} strokeWidth={0.8} />
          {/* Ticks at ends */}
          <Line points={rotate
            ? [x1 - TICK, y1, x1 + TICK, y1]
            : [x1, y1 - TICK, x1, y1 + TICK]}
            stroke={C.dimTick} strokeWidth={0.8} />
          <Line points={rotate
            ? [x2 - TICK, y2, x2 + TICK, y2]
            : [x2, y2 - TICK, x2, y2 + TICK]}
            stroke={C.dimTick} strokeWidth={0.8} />
          <Text
            x={rotate ? mx - 4 : mx - 14}
            y={rotate ? my - 16 : my + 4}
            text={label}
            fontSize={8}
            fontFamily="Arial, sans-serif"
            fontStyle="bold"
            fill={C.dim}
            rotation={rotate ? -90 : 0}
          />
        </Group>
      );
    }

    // Overall width (top)
    dimLine(MARGIN, MARGIN - OFF, MARGIN + planW, MARGIN - OFF, `${fmtFt(plotW)}`);
    // Overall depth (left)
    dimLine(MARGIN - OFF, MARGIN, MARGIN - OFF, MARGIN + planH, `${fmtFt(plotH)}`, true);

    // Per-room horizontal dimension ticks along top edge (rooms on y=0 boundary)
    const topRooms = rooms
      .filter(r => Number(r.y) <= 1)
      .sort((a, b) => Number(a.x) - Number(b.x));
    let curX = MARGIN;
    topRooms.forEach(r => {
      const rw = px(r.width);
      const endX = tx(r.x) + rw;
      if (endX > curX + 4) {
        dimLine(curX, MARGIN - 16, endX, MARGIN - 16, fmtFt(r.width));
        curX = endX;
      }
    });

    // Per-room vertical ticks along left edge
    const leftRooms = rooms
      .filter(r => Number(r.x) <= 1)
      .sort((a, b) => Number(a.y) - Number(b.y));
    let curY = MARGIN;
    leftRooms.forEach(r => {
      const rh = px(r.height);
      const endY = ty(r.y) + rh;
      if (endY > curY + 4) {
        dimLine(MARGIN - 16, curY, MARGIN - 16, endY, fmtFt(r.height), true);
        curY = endY;
      }
    });

    return els;
  }

  /** North arrow */
  function renderNorth() {
    const nx = MARGIN + planW + TITLE_W / 2 + 20;
    const ny = MARGIN + 18;
    return (
      <Group key="north" listening={false}>
        <Arrow points={[nx, ny + 36, nx, ny]} stroke="#000" strokeWidth={1.5} fill="#000" pointerLength={8} pointerWidth={7} />
        <Text x={nx - 5} y={ny + 44} text="N" fontSize={11} fontStyle="bold" fontFamily="Arial" fill="#000" />
      </Group>
    );
  }

  /** Title block — Buildogram CAD style */
  function renderTitleBlock() {
    const tbX = MARGIN + planW + 10;
    const tbY = MARGIN + 70;
    const tbW = TITLE_W - 15;
    const area = planData.summary?.builtUpArea || Math.round(plotW * plotH * 0.8);
    return (
      <Group key="title" listening={false}>
        <Rect x={tbX} y={tbY} width={tbW} height={170} stroke="#000" strokeWidth={1} fill="#fff" />
        {/* Header bar */}
        <Rect x={tbX} y={tbY} width={tbW} height={22} fill="#000" />
        <Text x={tbX + 4} y={tbY + 6} text="BUILDOGRAM" fontSize={10} fill="#fff" fontStyle="bold" fontFamily="Arial" />
        <Line points={[tbX, tbY + 22, tbX + tbW, tbY + 22]} stroke="#000" strokeWidth={0.5} />
        <Text x={tbX + 4} y={tbY + 28} text="CONCEPT FLOOR PLAN" fontSize={7.5} fill="#000" fontFamily="Arial" />
        <Line points={[tbX, tbY + 44, tbX + tbW, tbY + 44]} stroke="#000" strokeWidth={0.5} />
        <Text x={tbX + 4} y={tbY + 50} text={`Option: ${planData.name || 'Layout'}`} fontSize={8} fill="#000" fontFamily="Arial" />
        <Text x={tbX + 4} y={tbY + 66} text={`Plot: ${fmtFt(plotW)} X ${fmtFt(plotH)}`} fontSize={8} fill="#000" fontFamily="Arial" />
        <Text x={tbX + 4} y={tbY + 82} text={`Floor: ${floor.floorNumber || 1} of ${planData.floors.length}`} fontSize={8} fill="#000" fontFamily="Arial" />
        <Text x={tbX + 4} y={tbY + 98} text={`Built-up: ${area} sqft`} fontSize={8} fill="#000" fontFamily="Arial" />
        <Line points={[tbX, tbY + 114, tbX + tbW, tbY + 114]} stroke="#000" strokeWidth={0.5} />
        <Text x={tbX + 4} y={tbY + 120} text="⚠ Concept Only" fontSize={7} fill="#cc0000" fontFamily="Arial" />
        <Text x={tbX + 4} y={tbY + 132} text="Not for construction" fontSize={7} fill="#cc0000" fontFamily="Arial" />
        <Text x={tbX + 4} y={tbY + 144} text="or legal approval." fontSize={7} fill="#cc0000" fontFamily="Arial" />
      </Group>
    );
  }

  // ── Floor tabs ───────────────────────────────────────────────────────────
  const floorTabLabels = ['Ground', 'First', 'Second', 'Third', 'Fourth'];
  const floorTabs = planData.floors.map((f, i) => (
    <button key={i} onClick={() => setFloorIdx(i)} style={{
      padding: '3px 10px', fontSize: 11,
      background: i === floorIdx ? '#000' : '#f0f0f0',
      color: i === floorIdx ? '#fff' : '#333',
      border: '1px solid #ccc', borderRadius: 3,
      cursor: 'pointer', marginRight: 4,
    }}>
      {floorTabLabels[f.floorNumber - 1] || `Floor ${f.floorNumber}`}
    </button>
  ));

  // ── Layer toggle buttons ─────────────────────────────────────────────────
  const LAYER_BTNS = [
    { k: 'walls', lbl: 'Walls' }, { k: 'openings', lbl: 'Openings' },
    { k: 'stairs', lbl: 'Stairs' }, { k: 'labels', lbl: 'Labels' },
    { k: 'dimensions', lbl: 'Dims' },
  ];

  return (
    <div className={styles.canvasContainer} ref={containerRef}>

      {/* ── Toolbar ──────────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6,
        padding: '5px 12px', background: '#1a1a1a', flexShrink: 0,
      }}>
        <span style={{ color: '#aaa', fontSize: 10, marginRight: 4 }}>FLOOR</span>
        {floorTabs}
        <div style={{ width: 1, height: 18, background: '#444' }} />
        <span style={{ color: '#aaa', fontSize: 10, marginRight: 2 }}>LAYERS</span>
        {LAYER_BTNS.map(b => (
          <button key={b.k} onClick={() => setLayers(l => ({ ...l, [b.k]: !l[b.k] }))} style={{
            padding: '2px 8px', fontSize: 10,
            background: layers[b.k] ? '#fff' : '#444',
            color: layers[b.k] ? '#000' : '#aaa',
            border: '1px solid #555', borderRadius: 3, cursor: 'pointer',
          }}>{b.lbl}</button>
        ))}
        <div style={{ width: 1, height: 18, background: '#444' }} />
        <button onClick={() => setStageScale(s => Math.min(s * 1.2, 8))}
          style={{ padding: '2px 8px', background: '#333', color: '#fff', border: 'none', borderRadius: 3, cursor: 'pointer', fontSize: 13 }}>+</button>
        <span style={{ fontSize: 10, color: '#ccc', minWidth: 34, textAlign: 'center' }}>{Math.round(stageScale * 100)}%</span>
        <button onClick={() => setStageScale(s => Math.max(s / 1.2, 0.15))}
          style={{ padding: '2px 8px', background: '#333', color: '#fff', border: 'none', borderRadius: 3, cursor: 'pointer', fontSize: 13 }}>−</button>
        <button onClick={() => { setStageScale(1); setStagePos({ x: 0, y: 0 }); }}
          style={{ padding: '2px 8px', background: '#333', color: '#ccc', border: 'none', borderRadius: 3, cursor: 'pointer', fontSize: 10 }}>Fit</button>
      </div>

      {/* ── Konva Stage ─────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflow: 'hidden', background: '#d4d4d4' }}>
        <Stage
          ref={stageRef}
          width={stageSize.width}
          height={Math.max(100, stageSize.height - 36)}
          scaleX={stageScale} scaleY={stageScale}
          x={stagePos.x} y={stagePos.y}
          onWheel={onWheel}
          draggable
          onDragEnd={e => setStagePos({ x: e.target.x(), y: e.target.y() })}
        >
          {/* Layer 1: White background + grid */}
          <Layer>{renderGrid()}</Layer>

          {/* Layer 2: Room fills (white / subtle selection) */}
          <Layer>{renderRooms()}</Layer>

          {/* Layer 3: Walls */}
          <Layer>{renderWalls()}{renderBoundary()}</Layer>

          {/* Layer 4: Openings (doors, windows) */}
          <Layer>{renderDoors()}{renderWindows()}</Layer>

          {/* Layer 5: Stairs */}
          <Layer>{renderStairs()}</Layer>

          {/* Layer 6: Labels & dimensions */}
          <Layer>{renderLabels()}{renderDimensions()}</Layer>

          {/* Layer 7: Annotations — north arrow, title block */}
          <Layer>{renderNorth()}{renderTitleBlock()}</Layer>
        </Stage>
      </div>
    </div>
  );
}
