// src/lib/ai-floor-plan/openingPlanner.js
import { DOOR_RULES, WINDOW_RULES } from './thumbRules';

export function planOpenings(cadFloor) {
  const doors = [];
  const windows = [];
  let doorIdCounter = 1;
  let winIdCounter = 1;

  const getWallLength = (w) => Math.abs(w.y1 - w.y2) < 1 ? Math.abs(w.x2 - w.x1) : Math.abs(w.y2 - w.y1);
  const getWallSide = (w) => {
    const minX = Math.min(...cadFloor.rooms.map(r => r.x));
    const maxX = Math.max(...cadFloor.rooms.map(r => r.x + r.width));
    const minY = Math.min(...cadFloor.rooms.map(r => r.y));
    const maxY = Math.max(...cadFloor.rooms.map(r => r.y + r.height));
    if (Math.abs(w.y1 - minY) < 10) return 'N';
    if (Math.abs(w.y1 - maxY) < 10) return 'S';
    if (Math.abs(w.x1 - minX) < 10) return 'W';
    if (Math.abs(w.x1 - maxX) < 10) return 'E';
    return 'I';
  };
  const bySidePreference = (prefs) => (a, b) => {
    const ai = prefs.indexOf(getWallSide(a));
    const bi = prefs.indexOf(getWallSide(b));
    const as = ai === -1 ? 99 : ai;
    const bs = bi === -1 ? 99 : bi;
    if (as !== bs) return as - bs;
    return getWallLength(b) - getWallLength(a);
  };
  const openingCenter = (wall, width, clearance = 450) => {
    const length = getWallLength(wall);
    const safe = Math.max(width / 2 + clearance, Math.min(length / 2, length - width / 2 - clearance));
    return Math.round(safe);
  };

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
      const wWall = extWalls.sort(bySidePreference(['E', 'N', 'W', 'S']))[0];
      if (wWall) {
        windows.push({
          id: `w_${winIdCounter++}`,
          wallId: wWall.id,
          roomId: room.id,
          offsetMm: openingCenter(wWall, winRule.minWidth, 250),
          width: winRule.minWidth,
          symbol: 'V'
        });
      }
    } else if (extWalls.length > 0 && winRule.type === 'window') {
      // Place windows for habitable rooms
      // Larger openings are preferred on north/east walls for daylight and cooler exposure.
      const wallPrefs = room.type === 'kitchen' ? ['E', 'N', 'SE', 'NW', 'S', 'W'] : ['N', 'E', 'W', 'S'];
      const wWall = extWalls.sort(bySidePreference(wallPrefs))[0];
      const length = getWallLength(wWall);
      if (length > winRule.minWidth + 300) {
        windows.push({
          id: `w_${winIdCounter++}`,
          wallId: wWall.id,
          roomId: room.id,
          offsetMm: openingCenter(wWall, winRule.minWidth, 300),
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
            roomId: room.id,
            offsetMm: openingCenter(wWall2, winRule.minWidth, 300),
            width: winRule.minWidth,
            symbol: winRule.symbol
          });
        }
      }
    }

    // 2. Plan Doors
    // Main Door logic
    if (room.type === 'living') {
      const facing = cadFloor.facing || 'North';
      const frontSide = { North: 'N', South: 'S', East: 'E', West: 'W' }[facing] || 'N';
      const mdWall = extWalls.sort(bySidePreference([frontSide, 'E', 'N', 'W', 'S']))[0];
      if (mdWall) {
        const rule = DOOR_RULES.main;
        // Place MD near the corner
        doors.push({
          id: `d_${doorIdCounter++}`,
          wallId: mdWall.id,
          roomId: room.id,
          offsetMm: openingCenter(mdWall, rule.width, rule.clearanceFromCorner),
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
          roomId: room.id,
          offsetMm: openingCenter(dWall, rule.width, rule.clearanceFromCorner),
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
