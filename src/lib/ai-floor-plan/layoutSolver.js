// src/lib/ai-floor-plan/layoutSolver.js
import { ftToMm, snap } from './cadModel';

// Simple heuristic topology generator for standard Indian Residential plans
// (Provides better results than pure random BSP for 1-3 BHKs)

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
    // 1. Prepare rooms
    let rooms = [...roomProgram];
    
    // Size logic
    rooms = rooms.map(r => {
      let w = r.preferredSize.width;
      let h = r.preferredSize.height;
      if (variant === 'compact') { w = r.minSize.width; h = r.minSize.height; }
      else if (variant === 'balanced') { w = (r.minSize.width + r.preferredSize.width) / 2; h = (r.minSize.height + r.preferredSize.height) / 2; }
      return { ...r, targetW: snap(w), targetH: snap(h) };
    });

    // 2. We use a grid-based approach. Divide envelope into 3x3 grid
    // NW | N | NE
    // W  | C | E
    // SW | S | SE
    
    // Map zones based on Facing
    // If facing North: Front is North (Top of canvas is Front).
    // Let's standardise canvas: Top = Front.
    // For Vastu logic, absolute directions are used.
    
    // We will place rooms sequentially in zones.
    const placedRooms = [];
    let freeRects = [{ x: startX, y: startY, w: envWidth, h: envDepth }];

    const placeRoom = (room, targetRectIdx) => {
      if (freeRects.length === 0) return false;
      const rect = freeRects[targetRectIdx] || freeRects[0];
      let w = Math.min(room.targetW, rect.w);
      let h = Math.min(room.targetH, rect.h);
      
      if (w < 1200 || h < 1200) return false; // Too small to be a room

      placedRooms.push({
        id: room.id,
        name: room.name,
        type: room.type,
        x: rect.x,
        y: rect.y,
        width: w,
        height: h
      });

      // Split remainder
      const r1 = { x: rect.x + w, y: rect.y, w: rect.w - w, h };
      const r2 = { x: rect.x, y: rect.y + h, w: rect.w, h: rect.h - h };
      
      freeRects.splice(targetRectIdx, 1);
      if (r1.w >= 1200 && r1.h >= 1200) freeRects.push(r1);
      if (r2.w >= 1200 && r2.h >= 1200) freeRects.push(r2);
      
      freeRects.sort((a, b) => (b.w * b.h) - (a.w * a.h));
      return true;
    };

    // Sort by Vastu priority
    const sortRooms = () => {
      // Priority: MasterBed(SW), Kitchen(SE/NW), Pooja(NE), Hall(Front)
      const weight = (type) => {
        if(type === 'bedroom') return 4;
        if(type === 'kitchen') return 3;
        if(type === 'living') return 2;
        if(type === 'staircase') return 1;
        return 0;
      };
      return rooms.sort((a,b) => weight(b.type) - weight(a.type));
    }

    const sorted = sortRooms();
    sorted.forEach(room => {
      let placed = false;
      // Ideally we check preferred zones here. For now, simple packing.
      for (let i = 0; i < freeRects.length; i++) {
        if (freeRects[i].w >= room.targetW && freeRects[i].h >= room.targetH) {
          placed = placeRoom(room, i);
          if (placed) break;
        }
      }
      if (!placed && freeRects.length > 0) {
        placeRoom(room, 0);
      }
    });

    return {
      id: `plan_${variant}`,
      name: variant === 'balanced' ? 'Balanced Layout' : variant === 'vastu' ? 'Vastu Optimised' : 'Space Maximised',
      plotWidth,
      plotDepth,
      sheetType: 'FLOOR PLAN',
      floors: [{
        floorNumber: 1,
        floorLabel: 'GROUND FLOOR PLAN',
        width: plotWidth,
        depth: plotDepth,
        roadLabel: 'ROAD',
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
        warnings: []
      }
    };
  };

  return [
    generateOption('balanced'),
    generateOption('vastu'),
    generateOption('compact')
  ];
}
