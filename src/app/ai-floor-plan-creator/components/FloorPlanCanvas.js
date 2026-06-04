'use client';
/**
 * CAD-Style Floor Plan Canvas powered by react-konva
 * 
 * Layers (bottom to top):
 * 1. GridLayer       - Background grid, plot boundary, setback lines
 * 2. RoomsLayer      - Room fills (monochrome) with wet-area hatch
 * 3. WallsLayer      - Exterior (thick) and interior (thin) walls
 * 4. OpeningsLayer   - Doors (leaf + swing arc) and windows (triple-line symbol)
 * 5. FurnitureLayer  - Fixtures and furniture CAD symbols
 * 6. AnnotationLayer - Room labels, dimension strings, north arrow, title block
 * 7. UILayer         - Selection highlight, hover state
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from '../studio/studio.module.css';

// Pixel scale: how many canvas pixels per foot
const PX_PER_FT = 14;
const MARGIN = 80;
const TITLE_WIDTH = 160;

// CAD Color palette - restrained monochrome with accent for selection
const CAD = {
  background: '#f5f5f0',       // Off-white drafting paper
  grid: '#ddd8cc',             // Light grid lines
  plotBoundary: '#2d3748',     // Dark plot boundary
  setback: '#718096',          // Dashed setback line
  exteriorWall: '#1a202c',     // Very dark exterior walls
  interiorWall: '#4a5568',     // Medium interior partitions
  roomFill: '#ffffff',         // White room fill
  wetFill: '#e8f4fd',          // Light blue wet areas
  parkingFill: '#f0fdf4',      // Light green parking
  selectedFill: '#eff6ff',     // Light blue selection
  selectedStroke: '#3b82f6',   // Blue selection border
  doorSwing: '#94a3b8',        // Light gray door arcs
  doorLeaf: '#334155',         // Dark door leaf
  windowLine: '#60a5fa',       // Blue window markers
  fixture: '#64748b',          // Gray fixture symbols
  dimensionLine: '#4b5563',    // Dimension strings
  labelText: '#1f2937',        // Room name text
  labelSub: '#6b7280',         // Dimension text
  gridLabel: '#9ca3af',        // Axis labels
  titleText: '#1a202c',        // Title block text
  northArrow: '#1a202c',       // North arrow
  annotation: '#374151',       // General annotation
};

// Konva is only loaded client-side
let Konva = null;
let KonvaStage = null;
let KonvaLayer = null;
let KonvaRect = null;
let KonvaLine = null;
let KonvaText = null;
let KonvaPath = null;
let KonvaCircle = null;
let KonvaArc = null;
let KonvaGroup = null;
let KonvaArrow = null;

export default function FloorPlanCanvas({ planData, selectedRoom, onSelectRoom }) {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const [konvaLoaded, setKonvaLoaded] = useState(false);
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [stageScale, setStageScale] = useState(1);
  const [currentFloorIdx, setCurrentFloorIdx] = useState(0);
  const [hoveredRoomId, setHoveredRoomId] = useState(null);
  const [layerVisibility, setLayerVisibility] = useState({
    grid: true,
    rooms: true,
    walls: true,
    openings: true,
    furniture: true,
    annotations: true,
    dimensions: true,
  });

  // Load Konva dynamically (SSR safe)
  useEffect(() => {
    import('konva/lib/Core').then(() => {
      import('react-konva').then(mod => {
        KonvaStage = mod.Stage;
        KonvaLayer = mod.Layer;
        KonvaRect = mod.Rect;
        KonvaLine = mod.Line;
        KonvaText = mod.Text;
        KonvaPath = mod.Path;
        KonvaCircle = mod.Circle;
        KonvaArc = mod.Arc;
        KonvaGroup = mod.Group;
        KonvaArrow = mod.Arrow;
        setKonvaLoaded(true);
      });
    });
  }, []);

  // Observe container size
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver(entries => {
      for (const entry of entries) {
        setStageSize({
          width: entry.contentRect.width || 800,
          height: entry.contentRect.height || 600,
        });
      }
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const handleWheel = useCallback((e) => {
    e.evt.preventDefault();
    const stage = stageRef.current;
    if (!stage) return;
    const oldScale = stageScale;
    const pointer = stage.getPointerPosition();
    const scaleBy = 1.08;
    const direction = e.evt.deltaY < 0 ? 1 : -1;
    const newScale = direction > 0
      ? Math.min(oldScale * scaleBy, 6)
      : Math.max(oldScale / scaleBy, 0.2);

    const mousePointTo = {
      x: (pointer.x - stagePos.x) / oldScale,
      y: (pointer.y - stagePos.y) / oldScale,
    };
    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    setStageScale(newScale);
    setStagePos(newPos);
  }, [stageScale, stagePos]);

  const handleReset = () => {
    setStageScale(1);
    setStagePos({ x: 0, y: 0 });
  };

  const toggleLayer = (key) => {
    setLayerVisibility(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!planData || !planData.floors || planData.floors.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📐</div>
        <div>Generate a floor plan to begin</div>
      </div>
    );
  }

  if (!konvaLoaded) {
    return (
      <div className={styles.emptyState}>
        <div style={{ fontSize: 14, color: '#6b7280' }}>Loading CAD canvas…</div>
      </div>
    );
  }

  const floor = planData.floors[currentFloorIdx] || planData.floors[0];
  const plotWidth = Number(floor.width || planData.plotWidth || 30);
  const plotDepth = Number(floor.depth || planData.plotDepth || 40);
  const planW = plotWidth * PX_PER_FT;
  const planH = plotDepth * PX_PER_FT;
  const sheetW = planW + MARGIN * 2 + TITLE_WIDTH;
  const sheetH = planH + MARGIN * 2 + 60;

  const toX = (ft) => MARGIN + Number(ft) * PX_PER_FT;
  const toY = (ft) => MARGIN + Number(ft) * PX_PER_FT;
  const toPx = (ft) => Number(ft) * PX_PER_FT;

  const rooms = floor.rooms || [];
  const walls = floor.walls || [];
  const doors = floor.doors || [];
  const windows = floor.windows || [];
  const furniture = floor.furniture || [];
  const roomById = (id) => rooms.find(r => r.id === id);

  // Render functions using react-konva components
  const renderGrid = () => {
    if (!layerVisibility.grid) return null;
    const gridEls = [];
    const gridStep = PX_PER_FT * 5;

    // Background
    gridEls.push(
      <KonvaRect key="bg" x={0} y={0} width={sheetW} height={sheetH} fill={CAD.background} />
    );
    gridEls.push(
      <KonvaRect key="planbg" x={MARGIN} y={MARGIN} width={planW} height={planH} fill="#fefefe" />
    );

    // Grid lines
    for (let x = 0; x <= planW; x += gridStep) {
      gridEls.push(<KonvaLine key={`gx${x}`} points={[MARGIN + x, MARGIN, MARGIN + x, MARGIN + planH]} stroke={CAD.grid} strokeWidth={0.5} />);
    }
    for (let y = 0; y <= planH; y += gridStep) {
      gridEls.push(<KonvaLine key={`gy${y}`} points={[MARGIN, MARGIN + y, MARGIN + planW, MARGIN + y]} stroke={CAD.grid} strokeWidth={0.5} />);
    }

    // Axis labels
    for (let ft = 0; ft <= plotWidth; ft += 5) {
      gridEls.push(<KonvaText key={`lx${ft}`} x={toX(ft) - 12} y={MARGIN - 22} text={`${ft}'`} fontSize={9} fill={CAD.gridLabel} fontFamily="monospace" />);
    }
    for (let ft = 0; ft <= plotDepth; ft += 5) {
      gridEls.push(<KonvaText key={`ly${ft}`} x={MARGIN - 30} y={toY(ft) - 5} text={`${ft}'`} fontSize={9} fill={CAD.gridLabel} fontFamily="monospace" />);
    }

    // Plot boundary (thick)
    gridEls.push(
      <KonvaRect key="plotbnd" x={MARGIN} y={MARGIN} width={planW} height={planH}
        stroke={CAD.plotBoundary} strokeWidth={2.5} fill="transparent" listening={false} />
    );

    // Setback (dashed, 1.5m = ~5ft)
    const sb = 5 * PX_PER_FT;
    gridEls.push(
      <KonvaRect key="setback" x={MARGIN + sb} y={MARGIN + sb}
        width={planW - sb * 2} height={planH - sb * 2}
        stroke={CAD.setback} strokeWidth={0.8} dash={[6, 4]} fill="transparent" listening={false} />
    );

    return gridEls;
  };

  const renderRooms = () => {
    if (!layerVisibility.rooms) return null;
    return rooms.map(room => {
      const rx = toX(room.x || 0);
      const ry = toY(room.y || 0);
      const rw = toPx(room.width || 0);
      const rh = toPx(room.height || 0);
      const isSelected = selectedRoom?.id === room.id;
      const isHovered = hoveredRoomId === room.id;
      const isWet = ['bathroom', 'kitchen', 'utility'].includes(room.type);
      const isParking = room.type === 'parking';

      let fill = CAD.roomFill;
      if (isSelected) fill = CAD.selectedFill;
      else if (isWet) fill = CAD.wetFill;
      else if (isParking) fill = CAD.parkingFill;

      return (
        <KonvaGroup key={room.id}
          onClick={() => onSelectRoom(isSelected ? null : room)}
          onMouseEnter={() => setHoveredRoomId(room.id)}
          onMouseLeave={() => setHoveredRoomId(null)}
        >
          <KonvaRect
            x={rx} y={ry} width={rw} height={rh}
            fill={fill}
            stroke={isSelected ? CAD.selectedStroke : (isHovered ? '#94a3b8' : 'transparent')}
            strokeWidth={isSelected ? 2 : 1}
          />
          {/* Wet area hatch lines */}
          {isWet && Array.from({ length: Math.ceil((rw + rh) / 8) }, (_, i) => {
            const offset = i * 8 - rh;
            const x1 = rx + Math.max(0, offset);
            const y1 = ry + Math.max(0, -offset);
            const x2 = rx + Math.min(rw, rw + offset);
            const y2 = ry + Math.min(rh, rh - offset);
            if (x1 > rx + rw || y1 > ry + rh) return null;
            return <KonvaLine key={i} points={[x1, y1, x2, y2]} stroke="#bfdbfe" strokeWidth={0.6} listening={false} />;
          })}
        </KonvaGroup>
      );
    });
  };

  const renderWalls = () => {
    if (!layerVisibility.walls) return null;
    return walls.map((wall, i) => {
      const isExterior = wall.type === 'exterior';
      return (
        <KonvaLine
          key={wall.id || i}
          points={[toX(wall.x1), toY(wall.y1), toX(wall.x2), toY(wall.y2)]}
          stroke={isExterior ? CAD.exteriorWall : CAD.interiorWall}
          strokeWidth={isExterior ? 5 : 1.5}
          lineCap="square"
          lineJoin="miter"
          listening={false}
        />
      );
    });
  };

  const renderDoors = () => {
    if (!layerVisibility.openings) return null;
    return doors.map((door, i) => {
      const x = toX(door.x || 0);
      const y = toY(door.y || 0);
      const w = toPx(door.width || 3);
      const side = door.side || 'south';
      const isHoriz = side === 'north' || side === 'south';
      const dir = side === 'north' || side === 'west' ? -1 : 1;

      // Gap (wall opening)
      const gapPoints = isHoriz
        ? [x, y, x + w, y]
        : [x, y, x, y + w];
      
      // Door leaf
      const leafPoints = isHoriz
        ? [x, y, x, y + dir * w]
        : [x, y, x + dir * w, y];

      // Swing arc using path
      const arcR = w;
      const sweepFlag = (isHoriz && dir === 1) || (!isHoriz && dir === -1) ? 0 : 1;
      const arcEndX = isHoriz ? x + w : x + dir * w;
      const arcEndY = isHoriz ? y + dir * w : y + w;
      const arcPath = `M ${leafPoints[2]} ${leafPoints[3]} A ${arcR} ${arcR} 0 0 ${sweepFlag} ${arcEndX} ${arcEndY}`;

      return (
        <KonvaGroup key={door.id || i} listening={false}>
          {/* Opening gap - white over wall */}
          <KonvaLine points={gapPoints} stroke="white" strokeWidth={7} lineCap="butt" />
          {/* Door leaf */}
          <KonvaLine points={leafPoints} stroke={CAD.doorLeaf} strokeWidth={1.5} />
          {/* Swing arc */}
          <KonvaPath data={arcPath} stroke={CAD.doorSwing} strokeWidth={1} fill="transparent" dash={[4, 2]} />
        </KonvaGroup>
      );
    });
  };

  const renderWindows = () => {
    if (!layerVisibility.openings) return null;
    return windows.map((win, i) => {
      const x = toX(win.x || 0);
      const y = toY(win.y || 0);
      const w = toPx(win.width || 4);
      const side = win.side || 'north';
      const isHoriz = side === 'north' || side === 'south';
      const offset = 4; // thickness indicator

      const endX = isHoriz ? x + w : x;
      const endY = isHoriz ? y : y + w;

      return (
        <KonvaGroup key={win.id || i} listening={false}>
          {/* Gap */}
          <KonvaLine points={[x, y, endX, endY]} stroke="white" strokeWidth={8} lineCap="butt" />
          {/* Triple-line window symbol */}
          <KonvaLine points={[x, y, endX, endY]} stroke={CAD.windowLine} strokeWidth={1.2} />
          <KonvaLine
            points={isHoriz ? [x, y - offset, endX, endY - offset] : [x - offset, y, endX - offset, endY]}
            stroke={CAD.windowLine} strokeWidth={0.8}
          />
          <KonvaLine
            points={isHoriz ? [x, y + offset, endX, endY + offset] : [x + offset, y, endX + offset, endY]}
            stroke={CAD.windowLine} strokeWidth={0.8}
          />
        </KonvaGroup>
      );
    });
  };

  const renderFurniture = () => {
    if (!layerVisibility.furniture) return null;
    return furniture.map((item, i) => {
      const x = toX(item.x || 0);
      const y = toY(item.y || 0);
      const w = toPx(item.width || 4);
      const h = toPx(item.height || 3);
      const type = item.type || roomById(item.roomId)?.type;

      const baseProps = { stroke: CAD.fixture, strokeWidth: 0.8, fill: '#f8fafc', listening: false };

      if (type === 'parking') return (
        <KonvaGroup key={i} listening={false}>
          <KonvaRect x={x} y={y} width={w} height={h} cornerRadius={6} {...baseProps} />
          <KonvaLine points={[x + w * 0.15, y + h * 0.4, x + w * 0.85, y + h * 0.4]} {...baseProps} />
          <KonvaCircle x={x + w * 0.22} y={y + h + 5} radius={4} {...baseProps} />
          <KonvaCircle x={x + w * 0.78} y={y + h + 5} radius={4} {...baseProps} />
        </KonvaGroup>
      );

      if (type === 'bedroom') return (
        <KonvaGroup key={i} listening={false}>
          <KonvaRect x={x} y={y} width={w} height={h} {...baseProps} />
          {/* Headboard */}
          <KonvaRect x={x + 2} y={y + 2} width={w * 0.45} height={h * 0.28} {...baseProps} />
          <KonvaRect x={x + w * 0.53} y={y + 2} width={w * 0.44} height={h * 0.28} {...baseProps} />
          {/* Bed divider */}
          <KonvaLine points={[x, y + h * 0.34, x + w, y + h * 0.34]} {...baseProps} />
        </KonvaGroup>
      );

      if (type === 'kitchen' || type === 'utility') return (
        <KonvaGroup key={i} listening={false}>
          <KonvaRect x={x} y={y} width={w} height={Math.min(h, 20)} {...baseProps} />
          {/* Sink */}
          <KonvaRect x={x + 2} y={y + 2} width={Math.min(16, w - 4)} height={Math.min(h - 4, 16)} cornerRadius={3} {...baseProps} />
          {/* Hob circles */}
          <KonvaCircle x={x + w * 0.65} y={y + 7} radius={5} {...baseProps} />
          <KonvaCircle x={x + w * 0.82} y={y + 7} radius={4} {...baseProps} />
        </KonvaGroup>
      );

      if (type === 'bathroom') return (
        <KonvaGroup key={i} listening={false}>
          {/* Bathtub / basin */}
          <KonvaRect x={x} y={y} width={w * 0.48} height={h * 0.55} cornerRadius={6} {...baseProps} />
          {/* Toilet */}
          <KonvaGroup listening={false}>
            <KonvaRect x={x + w * 0.55} y={y + h * 0.5} width={w * 0.38} height={h * 0.42} cornerRadius={4} {...baseProps} />
            <KonvaRect x={x + w * 0.58} y={y + h * 0.5} width={w * 0.32} height={h * 0.14} {...baseProps} />
          </KonvaGroup>
          {/* Washbasin */}
          <KonvaCircle x={x + w * 0.74} y={y + h * 0.22} radius={Math.min(w, h) * 0.14} {...baseProps} />
        </KonvaGroup>
      );

      if (type === 'stair') return (
        <KonvaGroup key={i} listening={false}>
          {Array.from({ length: 8 }, (_, step) => (
            <KonvaLine key={step} points={[x, y + step * (h / 8), x + w, y + step * (h / 8)]} {...baseProps} />
          ))}
          {/* Direction arrow */}
          <KonvaArrow points={[x + 6, y + h - 10, x + w - 6, y + 10]} stroke={CAD.fixture} strokeWidth={1} fill={CAD.fixture} pointerLength={6} pointerWidth={5} />
        </KonvaGroup>
      );

      if (type === 'living') return (
        <KonvaGroup key={i} listening={false}>
          {/* Sofa L-shape */}
          <KonvaRect x={x} y={y} width={w} height={h * 0.4} cornerRadius={4} {...baseProps} />
          <KonvaRect x={x} y={y} width={w * 0.25} height={h} cornerRadius={4} {...baseProps} />
        </KonvaGroup>
      );

      if (type === 'dining') return (
        <KonvaGroup key={i} listening={false}>
          <KonvaRect x={x + w * 0.1} y={y + h * 0.1} width={w * 0.8} height={h * 0.8} cornerRadius={2} {...baseProps} />
          {/* Chair marks */}
          <KonvaLine points={[x + w * 0.3, y, x + w * 0.3, y - 6]} {...baseProps} />
          <KonvaLine points={[x + w * 0.7, y, x + w * 0.7, y - 6]} {...baseProps} />
          <KonvaLine points={[x + w * 0.3, y + h, x + w * 0.3, y + h + 6]} {...baseProps} />
          <KonvaLine points={[x + w * 0.7, y + h, x + w * 0.7, y + h + 6]} {...baseProps} />
        </KonvaGroup>
      );

      // Fallback: simple box
      return (
        <KonvaGroup key={i} listening={false}>
          <KonvaRect x={x} y={y} width={w} height={h} cornerRadius={4} {...baseProps} />
          <KonvaLine points={[x + 4, y + h / 2, x + w - 4, y + h / 2]} {...baseProps} />
        </KonvaGroup>
      );
    });
  };

  const renderAnnotations = () => {
    if (!layerVisibility.annotations) return null;
    const els = [];

    // Room labels
    rooms.forEach(room => {
      const rx = toX(room.x || 0);
      const ry = toY(room.y || 0);
      const rw = toPx(room.width || 0);
      const rh = toPx(room.height || 0);
      if (rw < 20 || rh < 20) return;

      const cx = rx + rw / 2;
      const cy = ry + rh / 2;

      els.push(
        <KonvaText key={`rlbl-${room.id}`}
          x={rx + 4} y={cy - 14} width={rw - 8}
          text={room.name}
          fontSize={Math.max(8, Math.min(11, rw / 8))}
          fill={CAD.labelText}
          fontFamily="'Arial', sans-serif"
          fontStyle="bold"
          align="center"
          listening={false}
        />
      );

      // Dimension sub-label
      if (layerVisibility.dimensions && rw > 40 && rh > 30) {
        const dimLabel = `${Math.round(room.width || 0)}'×${Math.round(room.height || 0)}'`;
        els.push(
          <KonvaText key={`rdim-${room.id}`}
            x={rx + 4} y={cy + 2} width={rw - 8}
            text={dimLabel}
            fontSize={Math.max(7, Math.min(9, rw / 10))}
            fill={CAD.labelSub}
            fontFamily="monospace"
            align="center"
            listening={false}
          />
        );
      }
    });

    // Overall dimension strings
    if (layerVisibility.dimensions) {
      // Horizontal dimension
      const hy = MARGIN - 32;
      els.push(<KonvaLine key="dim-h" points={[MARGIN, hy, MARGIN + planW, hy]} stroke={CAD.dimensionLine} strokeWidth={0.8} listening={false} />);
      els.push(<KonvaLine key="dim-h-l" points={[MARGIN, hy - 5, MARGIN, hy + 5]} stroke={CAD.dimensionLine} strokeWidth={0.8} listening={false} />);
      els.push(<KonvaLine key="dim-h-r" points={[MARGIN + planW, hy - 5, MARGIN + planW, hy + 5]} stroke={CAD.dimensionLine} strokeWidth={0.8} listening={false} />);
      els.push(<KonvaText key="dim-h-txt" x={MARGIN + planW / 2 - 24} y={hy - 16} text={`${plotWidth}'`} fontSize={10} fill={CAD.dimensionLine} fontFamily="monospace" fontStyle="bold" listening={false} />);

      // Vertical dimension
      const vx = MARGIN - 44;
      els.push(<KonvaLine key="dim-v" points={[vx, MARGIN, vx, MARGIN + planH]} stroke={CAD.dimensionLine} strokeWidth={0.8} listening={false} />);
      els.push(<KonvaLine key="dim-v-t" points={[vx - 5, MARGIN, vx + 5, MARGIN]} stroke={CAD.dimensionLine} strokeWidth={0.8} listening={false} />);
      els.push(<KonvaLine key="dim-v-b" points={[vx - 5, MARGIN + planH, vx + 5, MARGIN + planH]} stroke={CAD.dimensionLine} strokeWidth={0.8} listening={false} />);
      els.push(
        <KonvaText key="dim-v-txt"
          x={vx - 14} y={MARGIN + planH / 2 + 18}
          text={`${plotDepth}'`}
          fontSize={10} fill={CAD.dimensionLine}
          fontFamily="monospace" fontStyle="bold"
          rotation={-90}
          listening={false}
        />
      );
    }

    // North Arrow
    const nx = MARGIN + planW + TITLE_WIDTH / 2 + 12;
    const ny = MARGIN + 20;
    els.push(
      <KonvaGroup key="north-arrow" listening={false}>
        <KonvaArrow
          points={[nx, ny + 36, nx, ny]}
          stroke={CAD.northArrow} strokeWidth={1.5}
          fill={CAD.northArrow}
          pointerLength={8} pointerWidth={7}
        />
        <KonvaLine points={[nx, ny + 36, nx, ny]} stroke="#ffffff" strokeWidth={1} dash={[4, 4]} listening={false} />
        <KonvaText x={nx - 6} y={ny + 40} text="N" fontSize={11} fill={CAD.northArrow} fontFamily="Arial" fontStyle="bold" listening={false} />
      </KonvaGroup>
    );

    // Title Block
    const tbX = MARGIN + planW + 10;
    const tbY = MARGIN + 70;
    const tbW = TITLE_WIDTH - 20;
    const area = planData.summary?.builtUpArea || Math.round(plotWidth * plotDepth * 0.8);

    els.push(
      <KonvaGroup key="title-block" listening={false}>
        <KonvaRect x={tbX} y={tbY} width={tbW} height={160} stroke={CAD.titleText} strokeWidth={1} fill="#fefefe" />
        <KonvaRect x={tbX} y={tbY} width={tbW} height={24} fill="#1a202c" />
        <KonvaText x={tbX + 4} y={tbY + 7} text="BUILDOGRAM" fontSize={10} fill="white" fontFamily="Arial" fontStyle="bold" />
        <KonvaLine points={[tbX, tbY + 24, tbX + tbW, tbY + 24]} stroke={CAD.titleText} strokeWidth={0.5} />
        <KonvaText x={tbX + 4} y={tbY + 32} text="AI Concept Plan" fontSize={8} fill={CAD.titleText} fontFamily="Arial" />
        <KonvaLine points={[tbX, tbY + 48, tbX + tbW, tbY + 48]} stroke={CAD.titleText} strokeWidth={0.5} />
        <KonvaText x={tbX + 4} y={tbY + 54} text={`Option: ${planData.name || 'Layout'}`} fontSize={8} fill={CAD.titleText} fontFamily="Arial" />
        <KonvaText x={tbX + 4} y={tbY + 70} text={`Plot: ${plotWidth}'×${plotDepth}'`} fontSize={8} fill={CAD.titleText} fontFamily="Arial" />
        <KonvaText x={tbX + 4} y={tbY + 86} text={`Floor: ${floor.floorNumber || 1} of ${planData.floors.length}`} fontSize={8} fill={CAD.titleText} fontFamily="Arial" />
        <KonvaText x={tbX + 4} y={tbY + 102} text={`Built-up: ${area} sqft`} fontSize={8} fill={CAD.titleText} fontFamily="Arial" />
        <KonvaLine points={[tbX, tbY + 116, tbX + tbW, tbY + 116]} stroke={CAD.titleText} strokeWidth={0.5} />
        <KonvaText x={tbX + 4} y={tbY + 122} text="⚠ Concept Only" fontSize={7} fill="#dc2626" fontFamily="Arial" />
        <KonvaText x={tbX + 4} y={tbY + 135} text="Not for construction" fontSize={7} fill="#dc2626" fontFamily="Arial" />
        <KonvaText x={tbX + 4} y={tbY + 147} text="or legal approval." fontSize={7} fill="#dc2626" fontFamily="Arial" />
      </KonvaGroup>
    );

    return els;
  };

  const floorTabs = planData.floors.map((f, i) => (
    <button
      key={i}
      onClick={() => setCurrentFloorIdx(i)}
      style={{
        padding: '4px 12px',
        fontSize: 11,
        background: i === currentFloorIdx ? '#1e293b' : '#f1f5f9',
        color: i === currentFloorIdx ? 'white' : '#475569',
        border: '1px solid #cbd5e1',
        borderRadius: 4,
        cursor: 'pointer',
        marginRight: 4,
      }}
    >
      {f.floorNumber === 1 ? 'Ground' : f.floorNumber === 2 ? 'First' : `Floor ${f.floorNumber}`}
    </button>
  ));

  const LAYER_BTNS = [
    { key: 'grid', label: 'Grid' },
    { key: 'rooms', label: 'Rooms' },
    { key: 'walls', label: 'Walls' },
    { key: 'openings', label: 'Openings' },
    { key: 'furniture', label: 'Furniture' },
    { key: 'annotations', label: 'Labels' },
    { key: 'dimensions', label: 'Dims' },
  ];

  return (
    <div className={styles.canvasContainer} ref={containerRef} style={{ background: '#e2e8f0', flexDirection: 'column' }}>
      {/* Top toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px',
        background: '#1e293b', color: 'white', fontSize: 11, flexShrink: 0, flexWrap: 'wrap',
      }}>
        {/* Floor tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginRight: 8 }}>
          {floorTabs}
        </div>

        <div style={{ width: 1, height: 20, background: '#475569' }} />

        {/* Layer toggles */}
        {LAYER_BTNS.map(b => (
          <button key={b.key}
            onClick={() => toggleLayer(b.key)}
            style={{
              padding: '2px 8px', fontSize: 10,
              background: layerVisibility[b.key] ? '#3b82f6' : '#374151',
              color: 'white', border: 'none', borderRadius: 3, cursor: 'pointer',
            }}
          >
            {b.label}
          </button>
        ))}

        <div style={{ width: 1, height: 20, background: '#475569' }} />

        {/* Zoom controls */}
        <button onClick={() => setStageScale(s => Math.min(s * 1.2, 6))}
          style={{ padding: '2px 8px', background: '#374151', color: 'white', border: 'none', borderRadius: 3, cursor: 'pointer', fontSize: 14 }}>+</button>
        <span style={{ fontSize: 10, minWidth: 36, textAlign: 'center' }}>{Math.round(stageScale * 100)}%</span>
        <button onClick={() => setStageScale(s => Math.max(s / 1.2, 0.2))}
          style={{ padding: '2px 8px', background: '#374151', color: 'white', border: 'none', borderRadius: 3, cursor: 'pointer', fontSize: 14 }}>−</button>
        <button onClick={handleReset}
          style={{ padding: '2px 8px', background: '#374151', color: 'white', border: 'none', borderRadius: 3, cursor: 'pointer', fontSize: 10 }}>Fit</button>
      </div>

      {/* Canvas */}
      <div style={{ flex: 1, overflow: 'hidden', cursor: 'grab' }}>
        <KonvaStage
          ref={stageRef}
          width={stageSize.width}
          height={stageSize.height - 36}
          scaleX={stageScale}
          scaleY={stageScale}
          x={stagePos.x}
          y={stagePos.y}
          onWheel={handleWheel}
          draggable
          onDragEnd={e => setStagePos({ x: e.target.x(), y: e.target.y() })}
        >
          <KonvaLayer>
            {renderGrid()}
          </KonvaLayer>
          <KonvaLayer>
            {renderRooms()}
          </KonvaLayer>
          <KonvaLayer>
            {renderWalls()}
            {renderDoors()}
            {renderWindows()}
          </KonvaLayer>
          <KonvaLayer>
            {renderFurniture()}
          </KonvaLayer>
          <KonvaLayer>
            {renderAnnotations()}
          </KonvaLayer>
        </KonvaStage>
      </div>
    </div>
  );
}
