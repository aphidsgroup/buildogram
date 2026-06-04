// src/lib/ai-floor-plan/cadModel.js

export const UNITS = {
  FT_TO_MM: 304.8,
  IN_TO_MM: 25.4,
  M_TO_MM: 1000,
  SQM_TO_SQFT: 10.7639
};

export const CAD_CONSTANTS = {
  WALL_EXT_MM: 230, // 9 inches
  WALL_INT_MM: 115, // 4.5 inches
  GRID_SNAP_MM: 50,
};

export function snap(mm) {
  return Math.round(mm / CAD_CONSTANTS.GRID_SNAP_MM) * CAD_CONSTANTS.GRID_SNAP_MM;
}

export function ftToMm(ft) {
  return snap(Number(ft) * UNITS.FT_TO_MM);
}

export function mmToFt(mm) {
  return Number(mm) / UNITS.FT_TO_MM;
}

export function fmtFt(mm) {
  const v = mmToFt(mm);
  const ft = Math.floor(v);
  const inches = Math.round((v - ft) * 12);
  return inches === 0 ? `${ft}'` : `${ft}'${inches}"`;
}

/**
 * Deterministic engine to build walls from rooms and cut openings.
 */
export function buildCADFloor(inputFloor) {
  const plotWidth = Number(inputFloor.width) || ftToMm(30);
  const plotDepth = Number(inputFloor.depth) || ftToMm(40);

  const rooms = (inputFloor.rooms || []).map(r => ({
    ...r,
    x: snap(r.x),
    y: snap(r.y),
    width: snap(r.width),
    height: snap(r.height),
  }));

  // Generate walls from rooms
  // For each room, 4 edges
  let rawWalls = [];
  
  // A naive approach for a grid layout: just extract all horizontal and vertical line segments
  // and merge them.
  let hLines = {}; // y -> [ {x1, x2} ]
  let vLines = {}; // x -> [ {y1, y2} ]

  const addLine = (dict, pos, start, end) => {
    if (!dict[pos]) dict[pos] = [];
    dict[pos].push({ min: Math.min(start, end), max: Math.max(start, end) });
  };

  rooms.forEach(r => {
    addLine(hLines, r.y, r.x, r.x + r.width);
    addLine(hLines, r.y + r.height, r.x, r.x + r.width);
    addLine(vLines, r.x, r.y, r.y + r.height);
    addLine(vLines, r.x + r.width, r.y, r.y + r.height);
  });

  // Merge overlapping segments
  const mergeSegments = (linesDict) => {
    const merged = {};
    Object.keys(linesDict).forEach(pos => {
      const segs = linesDict[pos].sort((a, b) => a.min - b.min);
      const m = [];
      segs.forEach(s => {
        if (!m.length) m.push({ ...s });
        else {
          const last = m[m.length - 1];
          if (s.min <= last.max) last.max = Math.max(last.max, s.max);
          else m.push({ ...s });
        }
      });
      merged[pos] = m;
    });
    return merged;
  };

  const hMerged = mergeSegments(hLines);
  const vMerged = mergeSegments(vLines);

  let wallId = 1;
  const walls = [];

  // Identify exterior vs interior by checking if they lie on the bounding box of all rooms
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  rooms.forEach(r => {
    if (r.x < minX) minX = r.x;
    if (r.x + r.width > maxX) maxX = r.x + r.width;
    if (r.y < minY) minY = r.y;
    if (r.y + r.height > maxY) maxY = r.y + r.height;
  });

  Object.keys(hMerged).forEach(yStr => {
    const y = Number(yStr);
    hMerged[yStr].forEach(seg => {
      const isExt = Math.abs(y - minY) < 10 || Math.abs(y - maxY) < 10;
      walls.push({
        id: `w${wallId++}`,
        x1: seg.min, y1: y,
        x2: seg.max, y2: y,
        type: isExt ? 'exterior' : 'interior',
        thickness: isExt ? CAD_CONSTANTS.WALL_EXT_MM : CAD_CONSTANTS.WALL_INT_MM
      });
    });
  });

  Object.keys(vMerged).forEach(xStr => {
    const x = Number(xStr);
    vMerged[xStr].forEach(seg => {
      const isExt = Math.abs(x - minX) < 10 || Math.abs(x - maxX) < 10;
      walls.push({
        id: `w${wallId++}`,
        x1: x, y1: seg.min,
        x2: x, y2: seg.max,
        type: isExt ? 'exterior' : 'interior',
        thickness: isExt ? CAD_CONSTANTS.WALL_EXT_MM : CAD_CONSTANTS.WALL_INT_MM
      });
    });
  });

  // Cut gaps for openings
  const doors = (inputFloor.doors || []).map(d => ({ ...d, width: snap(d.width || ftToMm(3)) }));
  const windows = (inputFloor.windows || []).map(w => ({ ...w, width: snap(w.width || ftToMm(4)) }));
  const openings = [...doors, ...windows];

  const renderSegments = [];
  walls.forEach(wall => {
    let splits = [];
    const isHoriz = Math.abs(wall.y1 - wall.y2) < 1;

    openings.forEach(o => {
      let intersects = false;
      let center = 0;

      if (o.wallId && o.wallId === wall.id) {
        intersects = true;
        if (o.offsetMm !== undefined) {
           center = isHoriz ? Math.min(wall.x1, wall.x2) + o.offsetMm : Math.min(wall.y1, wall.y2) + o.offsetMm;
           // update actual x/y for the renderer if it uses them
           if (isHoriz) {
             o.x = center - o.width / 2;
             o.y = wall.y1;
           } else {
             o.x = wall.x1;
             o.y = center - o.width / 2;
           }
        } else {
           center = isHoriz ? o.x + o.width / 2 : o.y + o.width / 2;
        }
      } else if (!o.wallId) {
        // Very basic snap-to-wall logic: if opening overlaps the line bounding box
        if (isHoriz && Math.abs(o.y - wall.y1) < 100) { // close to wall line
          if (o.x + o.width > wall.x1 && o.x < wall.x2) {
            intersects = true;
            center = o.x + o.width / 2;
          }
        } else if (!isHoriz && Math.abs(o.x - wall.x1) < 100) {
          if (o.y + o.width > wall.y1 && o.y < wall.y2) {
            intersects = true;
            center = o.y + o.width / 2;
          }
        }
      }

      if (intersects) {
        splits.push({ min: center - o.width / 2, max: center + o.width / 2 });
        o.derivedSide = isHoriz ? 'north' : 'east'; // store inferred orientation
      }
    });

    splits.sort((a, b) => a.min - b.min);
    const mergedSplits = [];
    splits.forEach(s => {
      if (!mergedSplits.length) mergedSplits.push(s);
      else {
        const last = mergedSplits[mergedSplits.length - 1];
        if (s.min <= last.max) last.max = Math.max(last.max, s.max);
        else mergedSplits.push(s);
      }
    });

    let current = isHoriz ? Math.min(wall.x1, wall.x2) : Math.min(wall.y1, wall.y2);
    const end = isHoriz ? Math.max(wall.x1, wall.x2) : Math.max(wall.y1, wall.y2);

    mergedSplits.forEach(s => {
      if (s.min > current) {
        renderSegments.push({
          id: `${wall.id}-${current}`,
          x1: isHoriz ? current : wall.x1,
          y1: isHoriz ? wall.y1 : current,
          x2: isHoriz ? s.min : wall.x2,
          y2: isHoriz ? wall.y2 : s.min,
          thickness: wall.thickness,
          type: wall.type
        });
      }
      current = Math.max(current, s.max);
    });

    if (current < end) {
      renderSegments.push({
        id: `${wall.id}-${current}`,
        x1: isHoriz ? current : wall.x1,
        y1: isHoriz ? wall.y1 : current,
        x2: isHoriz ? end : wall.x2,
        y2: isHoriz ? wall.y2 : end,
        thickness: wall.thickness,
        type: wall.type
      });
    }
  });

  return {
    ...inputFloor,
    width: plotWidth,
    depth: plotDepth,
    rooms,
    doors,
    windows,
    walls: renderSegments,
    rawWalls: walls // keep unbroken walls for reference if needed
  };
}
