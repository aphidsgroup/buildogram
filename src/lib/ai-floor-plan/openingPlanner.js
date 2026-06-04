// src/lib/ai-floor-plan/openingPlanner.js
import { DOOR_RULES, WINDOW_RULES } from './thumbRules';

export function planOpenings(cadFloor) {
  const doors = [];
  const windows = [];
  let doorIdCounter = 1;
  let winIdCounter = 1;

  const getWallLength = (w) => w.isHorizontal ? Math.abs(w.x2 - w.x1) : Math.abs(w.y2 - w.y1);

  // Re-map rooms into rawWalls from cadFloor.rawWalls (populated by cadModel, but we need it beforehand?)
  // Actually, generator calls planOpenings *after* buildCADFloor. 
  // Let's verify: generator.js -> f = buildCADFloor(floor); f = planOpenings(f);
  // So cadFloor has `rawWalls` available.

  const rawWalls = cadFloor.rawWalls || [];
  
  // Find all walls belonging to a room (simplification based on bounding box)
  const getRoomWalls = (room) => {
    return rawWalls.filter(w => {
      const isHoriz = Math.abs(w.y1 - w.y2) < 1;
      if (isHoriz) {
        return (Math.abs(w.y1 - room.y) < 10 || Math.abs(w.y1 - (room.y + room.height)) < 10) &&
               Math.max(w.x1, room.x) < Math.min(w.x2, room.x + room.width);
      } else {
        return (Math.abs(w.x1 - room.x) < 10 || Math.abs(w.x1 - (room.x + room.width)) < 10) &&
               Math.max(w.y1, room.y) < Math.min(w.y2, room.y + room.height);
      }
    });
  };

  cadFloor.rooms.forEach(room => {
    const rWalls = getRoomWalls(room);
    const extWalls = rWalls.filter(w => w.type === 'exterior');
    const intWalls = rWalls.filter(w => w.type === 'interior');

    // 1. Plan Windows & Ventilators
    const winRule = WINDOW_RULES[room.type] || { symbol: 'W', minWidth: 1000, type: 'window' };
    
    // Toilets must have ventilators on exterior walls
    if (room.type === 'toilet') {
      const wWall = extWalls.sort((a,b) => getWallLength(b) - getWallLength(a))[0];
      if (wWall) {
        windows.push({
          id: `w_${winIdCounter++}`,
          wallId: wWall.id,
          offsetMm: Math.round(getWallLength(wWall) / 2 - winRule.minWidth / 2),
          width: winRule.minWidth,
          symbol: 'V'
        });
      }
    } else if (extWalls.length > 0 && winRule.type === 'window') {
      // Place windows for habitable rooms
      // One window on the longest exterior wall
      const wWall = extWalls.sort((a,b) => getWallLength(b) - getWallLength(a))[0];
      const length = getWallLength(wWall);
      if (length > winRule.minWidth + 300) {
        windows.push({
          id: `w_${winIdCounter++}`,
          wallId: wWall.id,
          offsetMm: Math.round(length / 2 - winRule.minWidth / 2),
          width: winRule.minWidth,
          symbol: winRule.symbol
        });
      }
      
      // If corner room, add second cross-ventilation window if it's a bedroom or living
      if (extWalls.length > 1 && (room.type === 'bedroom' || room.type === 'living')) {
        const wWall2 = extWalls.sort((a,b) => getWallLength(b) - getWallLength(a))[1];
        if (getWallLength(wWall2) > winRule.minWidth + 300) {
          windows.push({
            id: `w_${winIdCounter++}`,
            wallId: wWall2.id,
            offsetMm: Math.round(getWallLength(wWall2) / 2 - winRule.minWidth / 2),
            width: winRule.minWidth,
            symbol: winRule.symbol
          });
        }
      }
    }

    // 2. Plan Doors
    // Main Door logic
    if (room.type === 'living') {
      const mdWall = extWalls[0]; // simplistic MD placement for now
      if (mdWall) {
        const rule = DOOR_RULES.main;
        // Place MD near the corner
        doors.push({
          id: `d_${doorIdCounter++}`,
          wallId: mdWall.id,
          offsetMm: rule.clearanceFromCorner, // Indian standard: push to corner
          width: rule.width,
          symbol: rule.symbol
        });
      }
    } else {
      // Interior Door connecting to another room
      const rule = DOOR_RULES[room.type] || DOOR_RULES.bedroom;
      const dWall = intWalls.sort((a,b) => getWallLength(b) - getWallLength(a))[0];
      if (dWall) {
        doors.push({
          id: `d_${doorIdCounter++}`,
          wallId: dWall.id,
          offsetMm: rule.clearanceFromCorner, // Push door to corner (flush with adjoining wall)
          width: rule.width,
          symbol: rule.symbol
        });
      }
    }
  });

  return {
    ...cadFloor,
    doors,
    windows
  };
}
