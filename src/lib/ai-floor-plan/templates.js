// src/lib/ai-floor-plan/templates.js
// Mock templates producing realistic Indian residential CAD floor plans
// Room names follow traditional Chennai/Tamil Nadu drafter conventions

export function getMockTemplates(width, depth, floors = 1) {
  const plotWidth = Number(width) || 30;
  const plotDepth = Number(depth) || 40;
  const floorCount = Number(floors) || 1;
  const builtUp = Math.round(plotWidth * plotDepth * 0.80);

  const makeOption = (id, name, desc, variant) => ({
    id,
    name,
    plotWidth,
    plotDepth,
    sheetType: 'FLOOR PLAN',
    floors: Array.from({ length: floorCount }, (_, i) =>
      generateFloor(i + 1, plotWidth, plotDepth, variant)
    ),
    summary: {
      builtUpArea: builtUp * floorCount,
      carpetArea: Math.round(builtUp * floorCount * 0.78),
      estimatedConstructionCostRange: `Rs ${Math.round(builtUp * floorCount * 1800 / 100000)}L – Rs ${Math.round(builtUp * floorCount * 2200 / 100000)}L`,
      designNotes: [desc,
        'External dimensions shown. Walls drawn to approximate scale.',
        'Wet areas grouped for plumbing economy.'],
      warnings: [
        'Concept plan only. Not for construction or municipality approval.',
        'Structural, MEP, and setback details require licensed professional review.'
      ]
    }
  });

  return [
    makeOption('plan_opt_a', 'Balanced Layout',
      'Practical layout: compact wet zone, good daylighting, east-facing entry.', 'balanced'),
    makeOption('plan_opt_b', 'Vastu Optimised',
      'SE kitchen, SW master bed, NE pooja — common Vastu placement.', 'vastu'),
    makeOption('plan_opt_c', 'Space Maximised',
      'Service areas compressed; habitable rooms enlarged for maximum usable area.', 'compact'),
  ];
}

function generateFloor(floorNum, plotWidth, plotDepth, variant) {
  const base = floorNum === 1 ? makeGF(variant) : floorNum === 2 ? makeFF(variant) : makeTerrace(variant);
  return scaleFloor(base, floorNum, plotWidth, plotDepth);
}

// ─── Ground Floor ────────────────────────────────────────────────────────────
function makeGF(variant) {
  const rooms = [
    room('portico',  'Portico',           'parking',  1,  1, 12, 14),
    room('hall',     'Front Hall',        'living',  13,  1, 16, 14),
    room('bed1',     'Bed Room',          'bedroom',  1, 15, 12, 13),
    room('kitchen',  'Kitchen Cum Dining','kitchen', 13, 15, 10, 10),
    room('pooja',    'Pooja',             'store',   23, 15,  6, 10),
    room('toilet1',  'Toilet',            'bathroom', 1, 28,  6,  8),
    room('stair',    'Staircase',         'stair',    7, 28,  6,  8),
    room('utility',  'Utility',           'utility', 13, 25,  7, 11),
    room('toilet2',  'Toilet',            'bathroom',20, 25,  9,  6),
    room('store',    'Store',             'store',   20, 31,  9,  5),
  ];

  if (variant === 'vastu') {
    update(rooms, 'kitchen',  { name: 'Kitchen', x: 22, y: 15, width: 7, height: 10 });
    update(rooms, 'pooja',    { name: 'Pooja',   x: 13, y: 15, width: 9, height: 5 });
    update(rooms, 'bed1',     { name: 'SW Bed Room' });
    update(rooms, 'hall',     { name: 'Front Hall', x: 13, y: 20, width: 16, height: 9 });
  }

  if (variant === 'compact') {
    update(rooms, 'hall',    { name: 'Living Room', width: 17, height: 15 });
    update(rooms, 'kitchen', { name: 'Kitchen Cum Dining', width: 16, height: 10 });
    update(rooms, 'pooja',   { x: 29, y: 15, width: 0, height: 0 }); // hide
    update(rooms, 'bed1',    { height: 14 });
    update(rooms, 'toilet1', { y: 29, height: 7 });
  }

  return {
    floorNumber: 1,
    floorLabel: 'GROUND FLOOR PLAN',
    width: 30,
    depth: 40,
    rooms,
    walls: [
      wall('ext-n', 1, 1, 29, 1, 'exterior'),
      wall('ext-e', 29, 1, 29, 37, 'exterior'),
      wall('ext-s', 29, 37, 1, 37, 'exterior'),
      wall('ext-w', 1, 37, 1, 1, 'exterior'),
      wall('p-hall',   13, 1, 13, 37, 'interior'),
      wall('gf-mid',    1, 15, 29, 15, 'interior'),
      wall('gf-lower',  1, 28, 13, 28, 'interior'),
      wall('kit-low',  13, 25, 29, 25, 'interior'),
      wall('kit-right',23, 15, 23, 25, 'interior'),
      wall('tlt-stair', 7, 28,  7, 37, 'interior'),
      wall('stair-ut', 13, 28, 13, 37, 'interior'),
      wall('ut-tlt2',  20, 25, 20, 37, 'interior'),
      wall('tlt2-store',20,31, 29, 31, 'interior'),
    ],
    doors: [
      door('MD',  'main-door',  16.5, 15, 3.5, 'north', 'MD'),
      door('D1',  'bed-door',    7.5, 15, 3.0, 'north', 'D'),
      door('D2',  'kit-door',   14.5, 15, 3.0, 'south', 'D'),
      door('D3',  'tlt1-door',   2.5, 28, 2.5, 'north', 'D1'),
      door('D4',  'stair-door',  8.5, 28, 2.5, 'north', 'D1'),
      door('D5',  'tlt2-door',  21.0, 25, 2.5, 'south', 'D1'),
      door('D6',  'store-door', 21.0, 31, 2.5, 'south', 'D1'),
    ],
    windows: [
      win('W1',  'hall-n',   15.5, 1,  5, 'north', 'W'),
      win('W2',  'hall-e',   29,   5,  5, 'east',  'W'),
      win('W3',  'bed1-w',    1,  19,  5, 'west',  'W'),
      win('W4',  'kit-e',    29,  18,  4, 'east',  'W'),
      win('W5',  'tlt1-w',    1,  31, 2.5,'west',  'V'),
      win('W6',  'util-s',   15,  37,  4, 'south', 'W'),
      win('W7',  'portico-n',2.5,  1,  6, 'north', 'OP'),
    ],
    setbacks: { front: 5, rear: 3, left: 0, right: 0 },
    roadLabel: 'ROAD',
    northDirection: 'north',
  };
}

// ─── First Floor ─────────────────────────────────────────────────────────────
function makeFF(variant) {
  const rooms = [
    room('master',   'Master Bed Room', 'bedroom',  1,  1, 14, 14),
    room('dress',    'Wardrobe',        'store',   15,  1,  5,  6),
    room('atlt',     'Attached Toilet', 'bathroom',20,  1,  9,  6),
    room('lounge',   'Family Lounge',   'living',   1, 15, 15, 12),
    room('bed2',     'Bed Room',        'bedroom', 16, 15, 13, 12),
    room('terr',     'Open Terrace',    'balcony',  1, 27, 14, 10),
    room('ff_stair', 'Staircase',       'stair',   15, 27,  7, 10),
    room('ctlt',     'Common Toilet',   'bathroom',22, 27,  7,  6),
  ];
  if (variant === 'compact') {
    update(rooms, 'lounge', { width: 16, height: 13 });
    update(rooms, 'terr',   { y: 28, height: 9 });
  }
  return {
    floorNumber: 2,
    floorLabel: 'FIRST FLOOR PLAN',
    width: 30,
    depth: 40,
    rooms,
    walls: [
      wall('ext-n', 1, 1, 29, 1, 'exterior'),
      wall('ext-e', 29, 1, 29, 37, 'exterior'),
      wall('ext-s', 29, 37, 1, 37, 'exterior'),
      wall('ext-w', 1, 37, 1, 1, 'exterior'),
      wall('master-split', 15, 1, 15, 15, 'interior'),
      wall('dress-atlt',   20, 1, 20, 7,  'interior'),
      wall('ff-mid',        1, 15, 29, 15, 'interior'),
      wall('lounge-bed2',  16, 15, 16, 27, 'interior'),
      wall('terr-stair',   15, 27, 15, 37, 'interior'),
      wall('stair-ctlt',   22, 27, 22, 37, 'interior'),
      wall('ctlt-landing', 22, 33, 29, 33, 'interior'),
    ],
    doors: [
      door('D1', 'master-door', 7,  15, 3.0, 'north', 'D'),
      door('D2', 'dress-door',  16,  7, 2.5, 'south', 'D1'),
      door('D3', 'atlt-door',  21.5, 7, 2.5, 'south', 'D1'),
      door('D4', 'bed2-door',  17.5,15, 3.0, 'south', 'D'),
      door('D5', 'ctlt-door',  23.5,27, 2.5, 'south', 'D1'),
    ],
    windows: [
      win('W1', 'master-w',  1, 5,  5, 'west', 'W'),
      win('W2', 'master-n',  5, 1,  5, 'north','W'),
      win('W3', 'bed2-e',   29,19,  5, 'east', 'W'),
      win('W4', 'lounge-w',  1,19,  5, 'west', 'W'),
      win('W5', 'atlt-e',   29, 2,  3, 'east', 'V'),
    ],
    setbacks: { front: 0, rear: 3, left: 0, right: 0 },
    northDirection: 'north',
  };
}

// ─── Terrace / Roof Floor ─────────────────────────────────────────────────────
function makeTerrace(variant) {
  const rooms = [
    room('roof',     'Open Terrace',  'balcony', 1, 1, 28, 36),
    room('ohwt',     'OHT',           'utility', 20, 1, 8, 8),
    room('tf_stair', 'Staircase',     'stair',   15, 27, 7, 10),
  ];
  return {
    floorNumber: 3,
    floorLabel: 'TERRACE FLOOR PLAN',
    width: 30,
    depth: 40,
    rooms,
    walls: [
      wall('ext-n', 1, 1, 29, 1, 'exterior'),
      wall('ext-e', 29, 1, 29, 37, 'exterior'),
      wall('ext-s', 29, 37, 1, 37, 'exterior'),
      wall('ext-w', 1, 37, 1, 1, 'exterior'),
      wall('ohwt-s', 20, 1, 20, 9, 'interior'),
      wall('ohwt-b', 1, 9, 29, 9, 'interior'),
    ],
    doors: [],
    windows: [],
    setbacks: {},
    northDirection: 'north',
  };
}

// ─── Scale floor to actual plot dimensions ───────────────────────────────────
function scaleFloor(floor, floorNumber, targetW, targetH) {
  const sx = targetW / floor.width;
  const sy = targetH / floor.depth;
  const sX = v => +(v * sx).toFixed(1);
  const sY = v => +(v * sy).toFixed(1);
  return {
    ...floor,
    floorNumber,
    width: targetW,
    depth: targetH,
    rooms: floor.rooms.map(r => ({
      ...r,
      x: sX(r.x), y: sY(r.y),
      width: sX(r.width), height: sY(r.height),
      area: Math.round(sX(r.width) * sY(r.height)),
      label: `${r.name} ${fmtFt(sX(r.width))} X ${fmtFt(sY(r.height))}`,
    })),
    walls: floor.walls.map(w => ({ ...w, x1: sX(w.x1), y1: sY(w.y1), x2: sX(w.x2), y2: sY(w.y2) })),
    doors: floor.doors.map(d => ({ ...d, x: sX(d.x), y: sY(d.y), width: sX(d.width) })),
    windows: floor.windows.map(w => ({ ...w, x: sX(w.x), y: sY(w.y), width: sX(w.width) })),
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function room(id, name, type, x, y, width, height) {
  return { id, name, type, x, y, width, height, area: Math.round(width * height), unit: 'feet' };
}
function wall(id, x1, y1, x2, y2, type = 'interior') {
  return { id, x1, y1, x2, y2, type };
}
function door(label, id, x, y, width, side, symbol = 'D') {
  return { label, id, x, y, width, side, symbol, swing: 'in' };
}
function win(label, id, x, y, width, side, symbol = 'W') {
  return { label, id, x, y, width, side, symbol };
}
function update(rooms, id, patch) {
  const r = rooms.find(r => r.id === id);
  if (r) { Object.assign(r, patch); r.area = Math.round(r.width * r.height); }
}
function fmtFt(val) {
  const ft = Math.floor(val);
  const inches = Math.round((val - ft) * 12);
  return inches === 0 ? `${ft}'` : `${ft}'${inches}"`;
}
