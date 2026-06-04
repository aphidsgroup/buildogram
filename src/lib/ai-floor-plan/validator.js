// src/lib/ai-floor-plan/validator.js

export function validateFloorPlan(planJson) {
  // Simple validation: check if rooms overlap, check if rooms fit inside plot boundary.
  const errors = [];
  
  for (const floor of planJson.floors) {
    const { width: plotWidth, depth: plotDepth } = floor;
    
    // Check boundary
    for (const room of floor.rooms) {
      if (room.x < 0 || room.y < 0) {
        errors.push(`Room ${room.name} has negative coordinates.`);
      }
      if (room.x + room.width > plotWidth) {
        errors.push(`Room ${room.name} exceeds plot width.`);
      }
      if (room.y + room.height > plotDepth) {
        errors.push(`Room ${room.name} exceeds plot depth.`);
      }
      if (room.width <= 0 || room.height <= 0) {
        errors.push(`Room ${room.name} has invalid dimensions.`);
      }
    }
    
    // Check overlap conceptually
    for (let i = 0; i < floor.rooms.length; i++) {
      for (let j = i + 1; j < floor.rooms.length; j++) {
        const r1 = floor.rooms[i];
        const r2 = floor.rooms[j];
        
        if (
          r1.x < r2.x + r2.width &&
          r1.x + r1.width > r2.x &&
          r1.y < r2.y + r2.height &&
          r1.y + r1.height > r2.y
        ) {
          // It's a conceptual tool, so overlaps might happen during AI generation.
          // We just log it as a warning.
          if (!planJson.summary.warnings.includes("Some rooms may overlap conceptually.")) {
            planJson.summary.warnings.push("Some rooms may overlap conceptually.");
          }
        }
      }
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
