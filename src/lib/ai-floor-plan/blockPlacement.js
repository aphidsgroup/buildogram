// src/lib/ai-floor-plan/blockPlacement.js
import { getBlockDefinition } from './blockLibrary';

/**
 * Validates a single block placement against its room boundaries.
 */
export function isBlockInsideRoom(bp, room) {
  const def = getBlockDefinition(bp.blockId);
  if (!def || !room) return false;

  const isRotated = bp.rotation === 90 || bp.rotation === 270;
  const bw = isRotated ? (bp.heightMm || def.heightMm) : (bp.widthMm || def.widthMm);
  const bh = isRotated ? (bp.widthMm || def.widthMm) : (bp.heightMm || def.heightMm);

  return (
    bp.x >= 0 &&
    bp.y >= 0 &&
    bp.x + bw <= room.width &&
    bp.y + bh <= room.height
  );
}

/**
 * Validates block placements and returns an array of warnings.
 * Can be called by the main rules engine.
 */
export function checkBlockPlacements(floor) {
  const warnings = [];
  if (!floor.blockPlacements || !floor.rooms) return warnings;

  floor.blockPlacements.forEach(bp => {
    const def = getBlockDefinition(bp.blockId);
    if (!def) return;

    const room = floor.rooms.find(r => r.id === bp.roomId);
    if (!room) {
      warnings.push({ type: 'warning', message: `Block ${def.name} placed in an unknown room.` });
      return;
    }

    if (!isBlockInsideRoom(bp, room)) {
      warnings.push({
        type: 'warning',
        message: `${def.name} overlaps the walls of ${room.name}.`
      });
    }

    if (def.allowedRooms && !def.allowedRooms.includes((room.name || '').toUpperCase())) {
      warnings.push({
        type: 'info',
        message: `${def.name} is conventionally not placed in ${room.name}.`
      });
    }

    if (bp.widthMm && def.minWidthMm && bp.widthMm < def.minWidthMm) {
      warnings.push({ type: 'warning', message: `${def.name} width (${bp.widthMm}mm) is below minimum allowed (${def.minWidthMm}mm).` });
    }
    if (bp.widthMm && def.maxWidthMm && bp.widthMm > def.maxWidthMm) {
      warnings.push({ type: 'warning', message: `${def.name} width (${bp.widthMm}mm) exceeds maximum allowed (${def.maxWidthMm}mm).` });
    }
    if (bp.heightMm && def.minHeightMm && bp.heightMm < def.minHeightMm) {
      warnings.push({ type: 'warning', message: `${def.name} height (${bp.heightMm}mm) is below minimum allowed (${def.minHeightMm}mm).` });
    }
    if (bp.heightMm && def.maxHeightMm && bp.heightMm > def.maxHeightMm) {
      warnings.push({ type: 'warning', message: `${def.name} height (${bp.heightMm}mm) exceeds maximum allowed (${def.maxHeightMm}mm).` });
    }
  });

  return warnings;
}
