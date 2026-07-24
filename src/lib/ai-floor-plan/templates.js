// src/lib/ai-floor-plan/templates.js
import { buildCADFloor, ftToMm, CAD_CONSTANTS } from './cadModel';
import { THUMB_RULES, getRoomSize } from './thumbRules';

export function getMockTemplates(projectInput) {
  const plotWidthFt = Number(projectInput.plotWidth) || 30;
  const plotDepthFt = Number(projectInput.plotDepth) || 40;
  const floors = Number(projectInput.floors) || 1;
  const facing = projectInput.facing || 'North';
  const reqs = projectInput.roomRequirements || {};
  
  const plotWidth = ftToMm(plotWidthFt);
  const plotDepth = ftToMm(plotDepthFt);
  
  const floorCount = floors;
  const builtUp = Math.round(plotWidthFt * plotDepthFt * 0.80);

  const makeOption = (id, name, desc, variant) => ({
    id,
    name,
    plotWidth,
    plotDepth,
    facing,
    vastuPreference: projectInput.vastuPreference || 'Strict',
    sheetType: 'FLOOR PLAN',
    floors: Array.from({ length: floorCount }, (_, i) =>
      generateFloor(i + 1, plotWidth, plotDepth, variant, facing, reqs)
    ),
    summary: {
      builtUpArea: builtUp * floorCount,
      carpetArea: Math.round(builtUp * floorCount * 0.78),
      estimatedConstructionCostRange: \`Rs \${Math.round(builtUp * floorCount * 1800 / 100000)}L – Rs \${Math.round(builtUp * floorCount * 2200 / 100000)}L\`,
      designNotes: [desc,
        'External dimensions shown. Walls drawn to scale.',
        'Wet areas grouped for plumbing economy.'],
      warnings: [
        'Concept plan only. Not for construction or municipality approval.',
        'Structural, MEP, and setback details require licensed professional review.'
      ]
    }
  });

  return [
    makeOption('plan_opt_a', 'Balanced Layout', 'Practical layout: compact wet zone, good daylighting.', 'balanced'),
    makeOption('plan_opt_b', 'Vastu Optimised', 'SE kitchen, SW master bed, NE pooja — common Vastu placement.', 'vastu'),
    makeOption('plan_opt_c', 'Space Maximised', 'Service areas compressed; habitable rooms enlarged.', 'compact'),
  ];
}

function generateFloor(floorNum, plotWidth, plotDepth, variant, facing, reqs) {
  const plotWidthFt = Math.round(plotWidth / 304.8);
  const plotDepthFt = Math.round(plotDepth / 304.8);
  const scaleX = plotWidthFt / 30;
  const scaleY = plotDepthFt / 40;

  const base = floorNum === 1 ? makeGF(variant, facing, reqs) : makeFF(variant, reqs);
  
  if (base.rooms) {
    base.rooms.forEach(r => {
      r.x = Math.round(r.x * scaleX);
      r.y = Math.round(r.y * scaleY);
      r.width = Math.round(r.width * scaleX);
      r.height = Math.round(r.height * scaleY);
    });
  }
  if (base.doors) {
    base.doors.forEach(d => {
      d.x = Math.round(d.x * scaleX);
      d.y = Math.round(d.y * scaleY);
    });
  }
  if (base.windows) {
    base.windows.forEach(w => {
      w.x = Math.round(w.x * scaleX);
      w.y = Math.round(w.y * scaleY);
    });
  }

  base.width = plotWidth;
  base.depth = plotDepth;
  base.floorNumber = floorNum;
  return buildCADFloor(base);
}

function room(id, name, type, xFt, yFt, wFt, hFt) {
  return {
    id, name, type,
    x: ftToMm(xFt), y: ftToMm(yFt),
    width: ftToMm(wFt), height: ftToMm(hFt)
  };
}

function door(id, wallId, xFt, yFt, symbol) {
  const wFt = THUMB_RULES.doors[symbol]?.widthFt || 3.0;
  return { id, wallId: null, x: ftToMm(xFt), y: ftToMm(yFt), width: ftToMm(wFt), symbol };
}

function win(id, wallId, xFt, yFt, symbol) {
  const wFt = THUMB_RULES.windows[symbol]?.widthFt || 4.0;
  return { id, wallId: null, x: ftToMm(xFt), y: ftToMm(yFt), width: ftToMm(wFt), symbol };
}

function block(id, blockId, roomId, xFt, yFt, rotation) {
  return { id, blockId, roomId, x: ftToMm(xFt), y: ftToMm(yFt), rotation };
}

function makeGF(variant, facing, reqs) {
  const rooms = [];
  const blocks = [];
  
  // Base rooms depending on Vastu
  if (variant === 'vastu') {
    rooms.push(room('portico', 'Portico', 'parking', 1, 1, 12, 14));
    rooms.push(room('hall', 'Front Hall', 'living', 13, 1, 16, 14));
    rooms.push(room('bed1', 'SW Master Bed', 'bedroom', 1, 15, 12, 13)); // SW
    rooms.push(room('kitchen', 'Kitchen (SE)', 'kitchen', 19, 15, 10, 10)); // SE
    rooms.push(room('pooja', 'NE Pooja', 'store', 23, 1, 6, 6)); // NE
    rooms.push(room('stair', 'Staircase', 'stair', 7, 28, 6, 8));
    rooms.push(room('toilet1', 'Attached Toilet', 'bathroom', 1, 28, 6, 8));
    blocks.push(block('bp3', 'double-bed', 'bed1', 2, 3, 0));
    blocks.push(block('bp4', 'kitchen-sink', 'kitchen', 5, 1, 0));
  } else {
    rooms.push(room('portico', 'Portico', 'parking', 1, 1, 12, 14));
    rooms.push(room('hall', 'Front Hall', 'living', 13, 1, 16, 14));
    rooms.push(room('bed1', 'Bed Room', 'bedroom', 1, 15, 12, 13));
    rooms.push(room('kitchen', 'Kitchen Cum Dining', 'kitchen', 13, 15, 10, 10));
    rooms.push(room('pooja', 'Pooja', 'store', 23, 15, 6, 10));
    rooms.push(room('toilet1', 'Toilet', 'bathroom', 1, 28, 6, 8));
    rooms.push(room('stair', 'Staircase', 'stair', 7, 28, 6, 8));
    rooms.push(room('utility', 'Utility', 'utility', 13, 25, 7, 11));
    rooms.push(room('toilet2', 'Toilet', 'bathroom', 20, 25, 9, 6));
    rooms.push(room('store', 'Store', 'store', 20, 31, 9, 5));
    blocks.push(block('bp3', 'double-bed', 'bed1', 2, 3, 0));
    blocks.push(block('bp4', 'kitchen-sink', 'kitchen', 5, 1, 0));
  }

  const doors = [
    door('d1', 'w5', 16.5, 15, 'MD'),
    door('d2', 'w6', 7.5, 15, 'D'),
    door('d3', 'w8', 14.5, 25, 'D'),
    door('d4', 'w7', 2.5, 28, 'D1'),
  ];

  const windows = [
    win('w1', 'w1', 15.5, 1, 'W'),
    win('w2', 'w2', 29, 5, 'W'),
    win('w3', 'w4', 1, 19, 'W1'),
    win('w4', 'w2', 29, 18, 'W1'),
    win('w5', 'w4', 1, 31, 'V'),
  ];

  blocks.push(block('bp1', 'car', 'portico', 2, 1, 0));
  blocks.push(block('bp2', 'sofa-3', 'hall', 2, 5, 0));
  blocks.push(block('bp5', 'wc-western', 'toilet1', 2, 1, 0));
  blocks.push(block('bp6', 'db-box', 'hall', 1, 1, 0));

  return {
    floorLabel: 'GROUND FLOOR PLAN',
    roadLabel: facing.toUpperCase() + ' ROAD',
    rooms,
    doors,
    windows,
    blockPlacements: blocks,
    setbacks: { front: ftToMm(5), rear: ftToMm(3), left: 0, right: 0 }
  };
}

function makeFF(variant, reqs) {
  const rooms = [
    room('master', 'Master Bed Room', 'bedroom', 1, 1, 14, 14),
    room('dress', 'Wardrobe', 'store', 15, 1, 5, 6),
    room('atlt', 'Attached Toilet', 'bathroom', 20, 1, 9, 6),
    room('lounge', 'Family Lounge', 'living', 1, 15, 15, 12),
    room('bed2', 'Bed Room', 'bedroom', 16, 15, 13, 12),
    room('terr', 'Open Terrace', 'balcony', 1, 27, 14, 10),
    room('stair', 'Staircase', 'stair', 15, 27, 7, 10),
    room('ctlt', 'Common Toilet', 'bathroom', 22, 27, 7, 6),
  ];

  const doors = [
    door('d1', 'w5', 7, 15, 'D')
  ];

  const windows = [
    win('w1', 'w1', 5, 1, 'W')
  ];

  const blockPlacements = [
    block('bp1', 'double-bed', 'master', 2, 2, 0),
    block('bp2', 'sofa-3', 'lounge', 3, 3, 0)
  ];

  return {
    floorLabel: 'FIRST FLOOR PLAN',
    rooms,
    doors,
    windows,
    blockPlacements,
    setbacks: { front: ftToMm(5), rear: ftToMm(3), left: 0, right: 0 }
  };
}
