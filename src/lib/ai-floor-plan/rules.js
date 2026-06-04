// src/lib/ai-floor-plan/rules.js
// Advisory rules engine for floor plan validation
// NOT for legal certification - advisory warnings only

const NBC_RULES = {
  minRoomArea: {
    bedroom: 9.5,     // sqm minimum (NBC 2016)
    living: 9.5,
    kitchen: 5.0,
    bathroom: 1.2,
    stair: 4.0,
  },
  minRoomWidth: {
    bedroom: 2.5,     // meters
    living: 2.5,
    kitchen: 1.8,
    bathroom: 0.9,
  },
  minDoorWidth: 0.9,  // meters (3 feet)
  minWindowArea: 0.1, // fraction of floor area
  minSetback: {
    front: 1.5,       // meters
    side: 0.9,
    rear: 1.5,
  }
};

const SQM_PER_SQFT = 0.0929;
const M_PER_FT = 0.3048;

/**
 * Run all advisory checks on a floor plan
 * @param {Object} plan - The full plan JSON with floors, rooms, doors, windows
 * @returns {Array<{type: 'error'|'warning'|'info', code: string, message: string, roomId?: string}>}
 */
export function validateFloorPlan(plan) {
  const warnings = [];
  if (!plan || !plan.floors) return warnings;

  for (const floor of plan.floors) {
    const rooms = floor.rooms || [];
    const doors = floor.doors || [];
    const windows = floor.windows || [];
    const walls = floor.walls || [];

    // --- Room size checks ---
    for (const room of rooms) {
      const areaSqft = Number(room.width || 0) * Number(room.height || 0);
      const areaSqm = areaSqft * SQM_PER_SQFT;
      const widthM = Math.min(Number(room.width || 0), Number(room.height || 0)) * M_PER_FT;

      const minArea = NBC_RULES.minRoomArea[room.type];
      const minWidth = NBC_RULES.minRoomWidth[room.type];

      if (minArea && areaSqm < minArea) {
        warnings.push({
          type: 'warning',
          code: 'NBC_MIN_ROOM_AREA',
          message: `${room.name}: Area is ${areaSqm.toFixed(1)} sqm, below NBC minimum of ${minArea} sqm`,
          roomId: room.id,
        });
      }

      if (minWidth && widthM < minWidth) {
        warnings.push({
          type: 'warning',
          code: 'NBC_MIN_ROOM_WIDTH',
          message: `${room.name}: Minimum dimension is ${widthM.toFixed(1)}m, below NBC minimum of ${minWidth}m`,
          roomId: room.id,
        });
      }

      // Very small rooms advisory
      if (areaSqft < 20 && room.type !== 'bathroom' && room.type !== 'stair') {
        warnings.push({
          type: 'info',
          code: 'SMALL_ROOM_ADVISORY',
          message: `${room.name}: Room is very small (${areaSqft.toFixed(0)} sqft). Consider increasing.`,
          roomId: room.id,
        });
      }
    }

    // --- Wet area grouping check ---
    const wetRooms = rooms.filter(r => r.type === 'bathroom' || r.type === 'kitchen' || r.type === 'utility');
    if (wetRooms.length >= 2) {
      const positions = wetRooms.map(r => ({ x: Number(r.x || 0), y: Number(r.y || 0) }));
      const minX = Math.min(...positions.map(p => p.x));
      const maxX = Math.max(...positions.map(p => p.x));
      const minY = Math.min(...positions.map(p => p.y));
      const maxY = Math.max(...positions.map(p => p.y));
      const spread = Math.max(maxX - minX, maxY - minY);
      const plotDim = Math.max(Number(floor.width || 30), Number(floor.depth || 40));
      if (spread > plotDim * 0.65) {
        warnings.push({
          type: 'warning',
          code: 'WET_AREA_DISPERSAL',
          message: 'Wet areas (kitchen, bathrooms, utility) are widely spread. Grouping them reduces plumbing costs.',
        });
      }
    }

    // --- Door width checks ---
    for (const door of doors) {
      const widthM = Number(door.width || 3) * M_PER_FT;
      if (widthM < NBC_RULES.minDoorWidth) {
        warnings.push({
          type: 'warning',
          code: 'NBC_MIN_DOOR_WIDTH',
          message: `Door '${door.id}': Width is ${widthM.toFixed(2)}m, below NBC minimum of ${NBC_RULES.minDoorWidth}m`,
        });
      }
    }

    // --- Ventilation check (rough) ---
    const bedroomCount = rooms.filter(r => r.type === 'bedroom').length;
    const windowCount = windows.length;
    if (bedroomCount > 0 && windowCount < bedroomCount) {
      warnings.push({
        type: 'warning',
        code: 'VENTILATION_ADVISORY',
        message: `${bedroomCount} bedroom(s) but only ${windowCount} window openings shown. Ensure each habitable room has adequate cross-ventilation.`,
      });
    }

    // --- Setback check (rough boundary) ---
    for (const room of rooms) {
      const x = Number(room.x || 0);
      const y = Number(room.y || 0);
      const plotWidth = Number(floor.width || 30);
      const plotDepth = Number(floor.depth || 40);
      const minSetbackFt = NBC_RULES.minSetback.front / M_PER_FT;

      if (x < minSetbackFt || y < minSetbackFt) {
        warnings.push({
          type: 'warning',
          code: 'SETBACK_ADVISORY',
          message: `${room.name}: Appears close to plot boundary. Verify minimum ${NBC_RULES.minSetback.front}m front/side setbacks are maintained.`,
          roomId: room.id,
        });
        break; // Only warn once
      }
    }

    // --- Staircase check ---
    const stairs = rooms.filter(r => r.type === 'stair');
    for (const stair of stairs) {
      const widthFt = Math.min(Number(stair.width || 0), Number(stair.height || 0));
      if (widthFt < 3) {
        warnings.push({
          type: 'error',
          code: 'NBC_STAIR_WIDTH',
          message: `Staircase width appears to be ${widthFt.toFixed(1)}ft. NBC 2016 requires minimum 1m (3.28ft) clear width for residential stairs.`,
          roomId: stair.id,
        });
      }
    }

    // --- Parking fit check ---
    const parking = rooms.filter(r => r.type === 'parking');
    for (const p of parking) {
      const areaSqft = Number(p.width || 0) * Number(p.height || 0);
      if (areaSqft < 120) {
        warnings.push({
          type: 'warning',
          code: 'PARKING_SIZE_ADVISORY',
          message: `Car porch area is ${areaSqft.toFixed(0)} sqft. Standard car parking requires min ~180 sqft (2.5m x 5m).`,
          roomId: p.id,
        });
      }
    }

    // --- Habitable room check ---
    const habitableRooms = rooms.filter(r =>
      ['bedroom', 'living', 'dining', 'family'].includes(r.type)
    );
    if (habitableRooms.length === 0) {
      warnings.push({
        type: 'error',
        code: 'NO_HABITABLE_ROOMS',
        message: 'No habitable rooms (bedroom, living, dining) found in this floor plan.',
      });
    }

    // --- Circulation check ---
    const dooredRooms = new Set(doors.map(d => d.roomId).filter(Boolean));
    for (const room of rooms) {
      if (room.type === 'bedroom' || room.type === 'bathroom' || room.type === 'kitchen') {
        if (!dooredRooms.has(room.id)) {
          warnings.push({
            type: 'info',
            code: 'ROOM_NO_DOOR',
            message: `${room.name}: No door explicitly assigned to this room in the plan data.`,
            roomId: room.id,
          });
        }
      }
    }
  }

  return warnings;
}

export function getSeverityColor(type) {
  switch (type) {
    case 'error': return '#ef4444';
    case 'warning': return '#f59e0b';
    case 'info': return '#3b82f6';
    default: return '#6b7280';
  }
}

export function getSeverityIcon(type) {
  switch (type) {
    case 'error': return '✕';
    case 'warning': return '⚠';
    case 'info': return 'ℹ';
    default: return '•';
  }
}
