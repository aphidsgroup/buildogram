// src/lib/ai-floor-plan/componentPlanner.js

// This takes a fully resolved cadFloor (with walls and openings) and adds blockPlacements.
export function placeComponents(cadFloor) {
  const placements = [];
  let bpIdCounter = 1;

  cadFloor.rooms.forEach(room => {
    // 1. Bedroom
    if (room.type === 'bedroom') {
      placements.push({
        id: `bp_${bpIdCounter++}`,
        blockId: 'double-bed',
        roomId: room.id,
        x: 300,
        y: 300,
        rotation: 0
      });
      placements.push({
        id: `bp_${bpIdCounter++}`,
        blockId: 'wardrobe',
        roomId: room.id,
        x: 300,
        y: room.height - 600 - 100, // Top-left of block
        rotation: 0
      });
    }

    // 2. Living
    if (room.type === 'living') {
      placements.push({
        id: `bp_${bpIdCounter++}`,
        blockId: 'sofa-3',
        roomId: room.id,
        x: 300,
        y: 300,
        rotation: 0
      });
    }

    // 3. Toilet
    if (room.type === 'toilet') {
      placements.push({
        id: `bp_${bpIdCounter++}`,
        blockId: 'wc',
        roomId: room.id,
        x: 100,
        y: 100,
        rotation: 0
      });
    }

    // 4. Kitchen
    if (room.type === 'kitchen') {
      placements.push({
        id: `bp_${bpIdCounter++}`,
        blockId: 'kitchen-counter', // assuming it exists
        roomId: room.id,
        x: 0,
        y: 0,
        rotation: 0
      });
    }

    // 5. Parking
    if (room.type === 'parking') {
      const carW = 1800;
      const carH = 4500;
      if (room.width >= carW && room.height >= carH) {
        placements.push({
          id: `bp_${bpIdCounter++}`,
          blockId: 'car',
          roomId: room.id,
          x: Math.round((room.width - carW) / 2),
          y: Math.round((room.height - carH) / 2),
          rotation: 0
        });
      }
    }
  });

  return {
    ...cadFloor,
    blockPlacements: placements
  };
}
