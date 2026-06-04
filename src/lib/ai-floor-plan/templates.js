// src/lib/ai-floor-plan/templates.js

export function getMockTemplates(width, depth, floors = 1) {
  const plotWidth = Number(width) || 30;
  const plotDepth = Number(depth) || 40;
  const floorCount = Number(floors) || 1;
  const builtUpArea = Math.round(plotWidth * plotDepth * 0.8);

  const generateOption = (id, name, desc, variant) => {
    return {
      id,
      name,
      plotWidth,
      plotDepth,
      floors: Array.from({ length: floorCount }).map((_, i) => generateFloor(i + 1, plotWidth, plotDepth, variant)),
      summary: {
        builtUpArea: builtUpArea * floorCount,
        carpetArea: Math.round(builtUpArea * floorCount * 0.78),
        estimatedConstructionCostRange: `Rs ${Math.round(builtUpArea * floorCount * 1800 / 100000)}L - Rs ${Math.round(builtUpArea * floorCount * 2200 / 100000)}L`,
        designNotes: [
          desc,
          'Wall hierarchy, openings, fixtures, dimensions, and title block are shown for review-quality presentation.',
          'Wet areas are grouped to simplify plumbing lines and reduce construction complexity.'
        ],
        warnings: [
          'This is a conceptual AI-generated plan.',
          'Dimensions, structural columns, beams, footings, and setbacks require professional engineer review.',
          'Not for construction or municipality approval.'
        ]
      }
    };
  };

  return [
    generateOption('plan_opt_a', 'Balanced Layout', 'A practical layout balancing parking, family living, wet-area grouping, and comfortable room sizes.', 'balanced'),
    generateOption('plan_opt_b', 'Vastu Optimized', 'Kitchen and master-use zones are adjusted toward common Vastu preferences while keeping circulation compact.', 'vastu'),
    generateOption('plan_opt_c', 'Space Maximized', 'Service spaces are compressed and storage is absorbed into the core to increase usable room area.', 'compact')
  ];
}

function generateFloor(floorNum, plotWidth, plotDepth, variant) {
  if (floorNum > 1) {
    return scaleFloor(makeUpperFloor(variant), floorNum, plotWidth, plotDepth);
  }

  return scaleFloor(makeGroundFloor(variant), floorNum, plotWidth, plotDepth);
}

function makeGroundFloor(variant) {
  const baseRooms = [
    room('parking', 'Car Porch', 'parking', 1, 1, 13, 15),
    room('living', 'Living', 'living', 14, 1, 15, 15),
    room('bed1', 'Bedroom', 'bedroom', 1, 16, 13, 13),
    room('kitchen', 'Kitchen', 'kitchen', 14, 16, 9, 10),
    room('dining', 'Dining', 'dining', 23, 16, 6, 10),
    room('bath1', 'Common Bath', 'bathroom', 1, 29, 7, 8),
    room('stair', 'Stair', 'stair', 8, 29, 6, 8),
    room('utility', 'Utility', 'utility', 14, 26, 8, 11),
    room('toilet', 'Toilet', 'bathroom', 22, 26, 7, 6),
    room('puja', 'Puja/Store', 'store', 22, 32, 7, 5)
  ];

  if (variant === 'vastu') {
    updateRoom(baseRooms, 'puja', { name: 'Puja', width: 7, height: 5 });
    updateRoom(baseRooms, 'kitchen', { name: 'SE Kitchen' });
    updateRoom(baseRooms, 'bed1', { name: 'SW Bedroom' });
  }

  if (variant === 'compact') {
    updateRoom(baseRooms, 'living', { width: 15, height: 16 });
    updateRoom(baseRooms, 'bed1', { y: 17, height: 14 });
    updateRoom(baseRooms, 'kitchen', { y: 17, height: 9 });
    updateRoom(baseRooms, 'bath1', { y: 31, height: 6 });
  }

  return {
    floorNumber: 1,
    width: 30,
    depth: 40,
    rooms: baseRooms,
    walls: [
      wall('outer-n', 1, 1, 29, 1, 'exterior'),
      wall('outer-e', 29, 1, 29, 37, 'exterior'),
      wall('outer-s', 29, 37, 1, 37, 'exterior'),
      wall('outer-w', 1, 37, 1, 1, 'exterior'),
      wall('split-porch-living', 14, 1, 14, 37),
      wall('living-bed-zone', 1, 16, 29, 16),
      wall('bed-service-zone', 1, 29, 14, 29),
      wall('kitchen-service-zone', 14, 26, 29, 26),
      wall('kitchen-dining', 23, 16, 23, 26),
      wall('bath-stair', 8, 29, 8, 37),
      wall('stair-utility', 14, 29, 14, 37),
      wall('utility-toilet', 22, 26, 22, 37),
      wall('toilet-store', 22, 32, 29, 32)
    ],
    doors: [
      door('main-door', 16.5, 16, 3.5, 'south'),
      door('bed-door', 10.2, 16, 3, 'north'),
      door('kitchen-door', 16.2, 16, 3, 'south'),
      door('dining-door', 24.5, 26, 2.8, 'south'),
      door('bath-door', 3.2, 29, 2.5, 'south'),
      door('toilet-door', 24.2, 26, 2.5, 'south'),
      door('store-door', 24.2, 32, 2.4, 'south')
    ],
    windows: [
      opening('w-living-n', 18, 1, 5, 'north'),
      opening('w-living-e', 29, 6, 5, 'east'),
      opening('w-bed-w', 1, 20, 5, 'west'),
      opening('w-kitchen-e', 29, 18, 4, 'east'),
      opening('w-dining-e', 29, 22, 3, 'east'),
      opening('w-bath-w', 1, 32, 2.5, 'west'),
      opening('w-utility-s', 16, 37, 4, 'south')
    ],
    furniture: [
      fixture('car', 'parking', 'parking', 3, 4, 8, 7),
      fixture('sofa', 'living', 'living', 16, 4, 8, 4),
      fixture('tv', 'living', 'furniture', 25, 6, 3, 4),
      fixture('bed', 'bed1', 'bedroom', 3, 19, 7, 5),
      fixture('counter', 'kitchen', 'kitchen', 15, 18, 7, 3),
      fixture('dining-table', 'dining', 'dining', 24, 19, 4, 4),
      fixture('bath-fixture', 'bath1', 'bathroom', 2, 31, 4, 4),
      fixture('toilet-fixture', 'toilet', 'bathroom', 23, 28, 4, 3),
      fixture('stair-steps', 'stair', 'stair', 9, 30, 4, 6)
    ]
  };
}

function makeUpperFloor(variant) {
  const rooms = [
    room('master', 'Master Bed', 'bedroom', 1, 1, 14, 14),
    room('dress', 'Dress', 'store', 15, 1, 5, 6),
    room('bath2', 'Attached Bath', 'bathroom', 20, 1, 9, 6),
    room('family', 'Family Lounge', 'living', 1, 15, 15, 12),
    room('bed2', 'Bedroom 2', 'bedroom', 16, 15, 13, 12),
    room('terrace', 'Open Terrace', 'balcony', 1, 27, 14, 10),
    room('stair', 'Stair', 'stair', 15, 27, 7, 10),
    room('bath3', 'Common Bath', 'bathroom', 22, 27, 7, 6)
  ];

  if (variant === 'compact') {
    updateRoom(rooms, 'family', { width: 16, height: 13 });
    updateRoom(rooms, 'terrace', { y: 28, height: 9 });
  }

  return {
    floorNumber: 2,
    width: 30,
    depth: 40,
    rooms,
    walls: [
      wall('outer-n', 1, 1, 29, 1, 'exterior'),
      wall('outer-e', 29, 1, 29, 37, 'exterior'),
      wall('outer-s', 29, 37, 1, 37, 'exterior'),
      wall('outer-w', 1, 37, 1, 1, 'exterior'),
      wall('master-service', 15, 1, 15, 15),
      wall('dress-bath', 20, 1, 20, 7),
      wall('upper-main-split', 1, 15, 29, 15),
      wall('family-bed', 16, 15, 16, 27),
      wall('terrace-core', 15, 27, 15, 37),
      wall('stair-bath', 22, 27, 22, 37),
      wall('bath-landing', 22, 33, 29, 33)
    ],
    doors: [
      door('master-door', 7, 15, 3, 'north'),
      door('dress-door', 16, 7, 2.5, 'south'),
      door('bath2-door', 21.5, 7, 2.5, 'south'),
      door('bed2-door', 17.5, 15, 3, 'south'),
      door('bath3-door', 23.5, 27, 2.5, 'south')
    ],
    windows: [
      opening('w-master-w', 1, 5, 5, 'west'),
      opening('w-master-n', 5, 1, 5, 'north'),
      opening('w-bed2-e', 29, 19, 5, 'east'),
      opening('w-family-w', 1, 19, 5, 'west'),
      opening('w-bath2-e', 29, 2, 3, 'east')
    ],
    furniture: [
      fixture('master-bed', 'master', 'bedroom', 3, 4, 8, 5),
      fixture('bed2-bed', 'bed2', 'bedroom', 18, 18, 7, 5),
      fixture('family-sofa', 'family', 'living', 4, 18, 7, 4),
      fixture('bath2-fixture', 'bath2', 'bathroom', 22, 2, 4, 3),
      fixture('bath3-fixture', 'bath3', 'bathroom', 23, 28, 4, 3),
      fixture('stair-steps', 'stair', 'stair', 16, 29, 5, 7)
    ]
  };
}

function scaleFloor(floor, floorNumber, targetWidth, targetDepth) {
  const sx = targetWidth / floor.width;
  const sy = targetDepth / floor.depth;
  const scaleX = (value) => round(value * sx);
  const scaleY = (value) => round(value * sy);

  return {
    ...floor,
    floorNumber,
    width: targetWidth,
    depth: targetDepth,
    rooms: floor.rooms.map(item => ({
      ...item,
      x: scaleX(item.x),
      y: scaleY(item.y),
      width: scaleX(item.width),
      height: scaleY(item.height),
      area: Math.round(scaleX(item.width) * scaleY(item.height)),
      label: `${item.name} ${Math.round(scaleX(item.width))}'x${Math.round(scaleY(item.height))}'`
    })),
    walls: floor.walls.map(item => ({
      ...item,
      x1: scaleX(item.x1),
      y1: scaleY(item.y1),
      x2: scaleX(item.x2),
      y2: scaleY(item.y2)
    })),
    doors: floor.doors.map(item => ({ ...item, x: scaleX(item.x), y: scaleY(item.y), width: scaleX(item.width) })),
    windows: floor.windows.map(item => ({ ...item, x: scaleX(item.x), y: scaleY(item.y), width: scaleX(item.width) })),
    furniture: floor.furniture.map(item => ({
      ...item,
      x: scaleX(item.x),
      y: scaleY(item.y),
      width: scaleX(item.width),
      height: scaleY(item.height)
    }))
  };
}

function room(id, name, type, x, y, width, height) {
  return {
    id,
    name,
    type,
    x,
    y,
    width,
    height,
    area: Math.round(width * height),
    unit: 'feet',
    label: `${name} ${Math.round(width)}'x${Math.round(height)}'`
  };
}

function wall(id, x1, y1, x2, y2, type = 'interior') {
  return { id, x1, y1, x2, y2, type };
}

function door(id, x, y, width, side, swing = 'in') {
  return { id, x, y, width, side, swing };
}

function opening(id, x, y, width, side) {
  return { id, x, y, width, side };
}

function fixture(id, roomId, type, x, y, width, height) {
  return { id, roomId, type, x, y, width, height };
}

function updateRoom(rooms, id, patch) {
  const target = rooms.find(roomItem => roomItem.id === id);
  if (!target) return;
  Object.assign(target, patch);
  target.area = Math.round(target.width * target.height);
  target.label = `${target.name} ${Math.round(target.width)}'x${Math.round(target.height)}'`;
}

function round(value) {
  return Math.round(value * 10) / 10;
}
