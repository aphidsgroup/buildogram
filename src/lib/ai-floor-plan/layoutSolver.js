// src/lib/ai-floor-plan/layoutSolver.js
import { ftToMm, snap } from './cadModel';

function getAbsoluteZone(nx, ny, facing) {
  let col = nx < 0.33 ? 'W' : nx > 0.66 ? 'E' : 'C';
  let row = ny < 0.33 ? 'F' : ny > 0.66 ? 'R' : 'C'; // F = Front, R = Rear

  let geoRow, geoCol;
  if (facing === 'South') {
    geoRow = row === 'F' ? 'S' : row === 'R' ? 'N' : 'C';
    geoCol = col === 'W' ? 'E' : col === 'E' ? 'W' : 'C';
  } else if (facing === 'East') {
    geoRow = col === 'W' ? 'N' : col === 'E' ? 'S' : 'C';
    geoCol = row === 'F' ? 'E' : row === 'R' ? 'W' : 'C';
  } else if (facing === 'West') {
    geoRow = col === 'W' ? 'S' : col === 'E' ? 'N' : 'C';
    geoCol = row === 'F' ? 'W' : row === 'R' ? 'E' : 'C';
  } else { // North
    geoRow = row === 'F' ? 'N' : row === 'R' ? 'S' : 'C';
    geoCol = col;
  }

  if (geoRow === 'N' && geoCol === 'W') return 'NW';
  if (geoRow === 'N' && geoCol === 'E') return 'NE';
  if (geoRow === 'S' && geoCol === 'W') return 'SW';
  if (geoRow === 'S' && geoCol === 'E') return 'SE';
  if (geoRow === 'N') return 'N';
  if (geoRow === 'S') return 'S';
  if (geoCol === 'E') return 'E';
  if (geoCol === 'W') return 'W';
  return 'C';
}

function getZoneMatchScore(rect, room, envWidth, envDepth, envStartX, envStartY, facing, variant) {
  const cx = rect.x - envStartX + rect.w / 2;
  const cy = rect.y - envStartY + rect.h / 2;
  const nx = Math.max(0, Math.min(1, cx / envWidth));
  const ny = Math.max(0, Math.min(1, cy / envDepth));
  
  const absZone = getAbsoluteZone(nx, ny, facing);
  const relZone = ny < 0.4 ? 'FRONT' : ny > 0.6 ? 'REAR' : 'CENTER';

  if (!room.preferredZone || room.preferredZone.length === 0) return 1;

  if (room.preferredZone.includes(absZone) || room.preferredZone.includes(relZone)) {
    return 10;
  }
  
  if (variant === 'vastu') {
    const isAdjacent = (a, b) => a.includes(b) || b.includes(a);
    for (let pz of room.preferredZone) {
      if (isAdjacent(pz, absZone)) return 5;
    }
    return -5; // strict penalty
  }
  return 1; // loose
}

function combineRects(rects) {
  const x1 = Math.min(...rects.map(r => r.x));
  const y1 = Math.min(...rects.map(r => r.y));
  const x2 = Math.max(...rects.map(r => r.x + r.w));
  const y2 = Math.max(...rects.map(r => r.y + r.h));
  return { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
}

function makeGrid(startX, startY, envWidth, envDepth, facing) {
  const colW = [snap(envWidth * 0.36), snap(envWidth * 0.28)];
  colW.push(envWidth - colW[0] - colW[1]);
  const rowH = [snap(envDepth * 0.28), snap(envDepth * 0.34)];
  rowH.push(envDepth - rowH[0] - rowH[1]);

  const cells = {};
  let y = startY;
  for (let row = 0; row < 3; row++) {
    let x = startX;
    for (let col = 0; col < 3; col++) {
      const nx = (x - startX + colW[col] / 2) / envWidth;
      const ny = (y - startY + rowH[row] / 2) / envDepth;
      cells[getAbsoluteZone(nx, ny, facing)] = { x, y, w: colW[col], h: rowH[row] };
      x += colW[col];
    }
    y += rowH[row];
  }
  return cells;
}

function splitRect(rect, firstRatio = 0.5, direction = 'horizontal') {
  rect = {
    x: rect.x,
    y: rect.y,
    w: rect.w ?? rect.width,
    h: rect.h ?? rect.height,
  };
  if (direction === 'vertical') {
    const w1 = snap(rect.w * firstRatio);
    return [
      { x: rect.x, y: rect.y, w: w1, h: rect.h },
      { x: rect.x + w1, y: rect.y, w: rect.w - w1, h: rect.h },
    ];
  }
  const h1 = snap(rect.h * firstRatio);
  return [
    { x: rect.x, y: rect.y, w: rect.w, h: h1 },
    { x: rect.x, y: rect.y + h1, w: rect.w, h: rect.h - h1 },
  ];
}

function roomFrom(program, predicate) {
  return program.find(predicate);
}

function makeRoom(room, rect) {
  if (!room || !rect || rect.w < 900 || rect.h < 900) return null;
  return {
    id: room.id,
    name: room.name,
    type: room.type,
    vastuZone: room.vastuZone,
    x: snap(rect.x),
    y: snap(rect.y),
    width: snap(rect.w),
    height: snap(rect.h),
  };
}

function makeAdhocRoom(id, name, type) {
  return { id, name, type };
}

export function solveLayout(formData, roomProgram) {
  const plotWidth = ftToMm(formData.plotWidth || 30);
  const plotDepth = ftToMm(formData.plotDepth || 40);
  const facing = formData.facing || 'North';

  // Basic Setbacks based on preference
  let frontSetback = 1500, rearSetback = 1000, sideSetback = 1000;
  if (formData.setbackPreference === 'tight') {
    frontSetback = 1000; rearSetback = 500; sideSetback = 0;
  } else if (formData.setbackPreference === 'spacious') {
    frontSetback = 3000; rearSetback = 1500; sideSetback = 1500;
  }
  
  if (formData.cornerPlot) {
    sideSetback = Math.max(sideSetback, 1500);
  }

  // Calculate Buildable Envelope
  let startX = sideSetback;
  let startY = frontSetback; // front is Y=0
  let envWidth = plotWidth - (sideSetback * 2);
  let envDepth = plotDepth - (frontSetback + rearSetback);

  if (facing === 'South') {
    startY = rearSetback;
  } else if (facing === 'East') {
    startX = frontSetback;
    startY = sideSetback;
    envWidth = plotWidth - (frontSetback + rearSetback);
    envDepth = plotDepth - (sideSetback * 2);
  } else if (facing === 'West') {
    startX = rearSetback;
    startY = sideSetback;
    envWidth = plotWidth - (frontSetback + rearSetback);
    envDepth = plotDepth - (sideSetback * 2);
  }

  envWidth = snap(envWidth);
  envDepth = snap(envDepth);

  const generateOption = (variant) => {
    const cells = makeGrid(startX, startY, envWidth, envDepth, facing);
    const placedRooms = [];
    const warnings = [];
    const usedIds = new Set();

    const add = (room, rect) => {
      const placed = makeRoom(room, rect);
      if (placed) {
        placedRooms.push(placed);
        usedIds.add(room.id);
      }
    };

    const parking = roomFrom(roomProgram, r => r.type === 'parking');
    const hall = roomFrom(roomProgram, r => r.type === 'living');
    const pooja = roomFrom(roomProgram, r => r.type === 'pooja');
    const kitchen = roomFrom(roomProgram, r => r.type === 'kitchen');
    const master = roomFrom(roomProgram, r => r.id === 'master_bed' || r.name.includes('MASTER'));
    const masterToilet = roomFrom(roomProgram, r => r.id === 'master_toilet');
    const bedroom = roomFrom(roomProgram, r => r.type === 'bedroom' && r.id !== master?.id);
    const commonToilet = roomFrom(roomProgram, r => r.name.includes('COMMON TOILET'));
    const staircase = roomFrom(roomProgram, r => r.type === 'staircase');
    const utility = roomFrom(roomProgram, r => r.type === 'utility');
    const store = roomFrom(roomProgram, r => r.type === 'store');
    const study = roomFrom(roomProgram, r => r.type === 'study');

    const frontZonesByFacing = {
      North: ['NW', 'N'],
      South: ['S', 'SE'],
      East: ['NE', 'E'],
      West: ['W', 'SW'],
    };
    const frontZones = frontZonesByFacing[facing] || frontZonesByFacing.North;

    // Vastu-critical rooms are fixed first, then support rooms fill the remaining drafting bands.
    const masterZone = combineRects([cells.SW, cells.S].filter(Boolean));
    if (masterToilet && masterZone) {
      const toiletW = Math.min(1800, Math.max(1350, snap(masterZone.w * 0.22)));
      const toiletH = Math.min(2100, Math.max(1650, snap(masterZone.h * 0.36)));
      const dressH = Math.min(1450, Math.max(1100, snap(masterZone.h * 0.24)));
      const serviceH = toiletH + dressH;
      const serviceX = masterZone.x + masterZone.w - toiletW;
      const serviceY = masterZone.y + Math.max(450, snap((masterZone.h - serviceH) / 2));
      const bedRect = {
        x: masterZone.x,
        y: masterZone.y,
        w: masterZone.w,
        h: masterZone.h,
      };
      const toiletRect = {
        x: serviceX,
        y: serviceY,
        w: toiletW,
        h: toiletH,
      };
      const dressRect = {
        x: serviceX,
        y: serviceY + toiletH,
        w: toiletW,
        h: dressH,
      };
      add({ ...master, vastuZone: 'SW' }, bedRect);
      add(masterToilet, toiletRect);
      add(makeAdhocRoom('master_dress', 'DRESS', 'dress'), dressRect);
    } else {
      add(master, masterZone);
    }

    const [kitchenMain, kitchenService] = splitRect(cells.SE, utility ? 0.72 : 1, 'horizontal');
    add(kitchen, kitchenMain);
    if (utility) add(utility, kitchenService);

    const [poojaRect, stairRect] = splitRect(cells.NE, pooja && staircase ? 0.42 : 1, 'horizontal');
    add(pooja, poojaRect);
    if (staircase) add(staircase, pooja ? stairRect : cells.NE);

    const frontRect = combineRects(frontZones.map(z => cells[z]).filter(Boolean));
    add(parking, frontRect);

    const hallZones = ['W', 'C'].filter(z => cells[z]);
    add(hall, combineRects(hallZones.map(z => cells[z])));

    const eastMiddle = cells.E;
    if (eastMiddle) {
      if (bedroom && commonToilet) {
        const [bedRect, toiletRect] = splitRect(eastMiddle, 0.68, 'horizontal');
        add(bedroom, bedRect);
        add(commonToilet, toiletRect);
      } else if (bedroom) {
        add(bedroom, eastMiddle);
      } else if (commonToilet) {
        add(commonToilet, eastMiddle);
      } else if (store) {
        add(store, eastMiddle);
      } else if (study) {
        add(study, eastMiddle);
      }
    }

    roomProgram.forEach(room => {
      if (!usedIds.has(room.id)) {
        warnings.push(`Could not place ${room.name}; selected spaces exceed the deterministic 3x3 drafting grid.`);
      }
    });

    return {
      id: `plan_${variant}`,
      name: variant === 'balanced' ? 'Balanced Layout' : variant === 'vastu' ? 'Vastu Optimised' : 'Space Maximised',
      plotWidth,
      plotDepth,
      facing,
      vastuPreference: formData.vastuPreference || 'Strict',
      roomSizePreference: formData.roomSizePreference || 'standard',
      roomRequirements: formData.roomRequirements,
      sheetType: 'FLOOR PLAN',
      floors: [{
        floorNumber: 1,
        floorLabel: 'GROUND FLOOR PLAN',
        facing,
        width: plotWidth,
        depth: plotDepth,
        roadLabel: `${facing.toUpperCase()} ROAD`,
        setbacks: { front: frontSetback, rear: rearSetback, left: sideSetback, right: sideSetback },
        rooms: placedRooms,
        doors: [],
        windows: [],
        blockPlacements: []
      }],
      summary: {
        builtUpArea: Math.round((envWidth * envDepth) / (304.8 * 304.8)),
        carpetArea: Math.round((envWidth * envDepth * 0.8) / (304.8 * 304.8)),
        estimatedConstructionCostRange: "Rs 15L - Rs 25L",
        designNotes: ["Generated via Hybrid Zone Solver", "Room sizes mapped to thumb rules"],
        warnings: warnings
      }
    };
  };

  return [
    generateOption('balanced'),
    generateOption('vastu'),
    generateOption('compact')
  ];
}
