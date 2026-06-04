// src/lib/ai-floor-plan/templates.js

export function getMockTemplates(width, depth, floors = 1) {
  // A simple fallback template generator for typical Indian plot sizes.
  // In a full production system, this would be a larger DB of base templates.
  
  const totalArea = width * depth;
  const builtUpArea = totalArea * 0.8; // Assume 20% open space
  
  const generateOption = (id, name, desc) => {
    return {
      id,
      name,
      floors: Array.from({ length: floors }).map((_, i) => generateFloor(i + 1, width, depth, id)),
      summary: {
        builtUpArea: Math.round(builtUpArea * floors),
        carpetArea: Math.round(builtUpArea * floors * 0.8),
        estimatedConstructionCostRange: `₹${Math.round(builtUpArea * floors * 1800 / 100000)}L - ₹${Math.round(builtUpArea * floors * 2200 / 100000)}L`,
        designNotes: [desc, "Ground floor includes parking if requested", "Internal circulation kept minimal to maximize room size"],
        warnings: [
          "This is a conceptual AI-generated plan.",
          "Dimensions, structural columns, and setbacks require professional engineer review.",
          "Not for construction or municipality approval."
        ]
      }
    };
  };

  return [
    generateOption("plan_opt_a", "Balanced Layout", "A standard practical layout optimizing for natural light and comfortable room sizes."),
    generateOption("plan_opt_b", "Vastu Optimized", "Adjusted placement of kitchen (SE/NW) and master bedroom (SW) as per common Vastu principles."),
    generateOption("plan_opt_c", "Space Maximized", "Reduced circulation space to allow larger bedrooms and living areas.")
  ];
}

function generateFloor(floorNum, plotWidth, plotDepth, optionId) {
  // Simple deterministic room generator based on plot size
  // This is a mock representation
  const w = plotWidth;
  const d = plotDepth;
  
  let rooms = [];
  
  if (floorNum === 1) {
    rooms = [
      { id: "parking", name: "Parking", type: "parking", x: 1, y: 1, width: w/2 - 2, height: 16, area: Math.round((w/2 - 2)*16), unit: "feet", label: `Parking ${Math.round(w/2 - 2)}'x16'` },
      { id: "living", name: "Living Room", type: "living", x: w/2 + 1, y: 1, width: w/2 - 2, height: 16, area: Math.round((w/2 - 2)*16), unit: "feet", label: `Living ${Math.round(w/2 - 2)}'x16'` },
      { id: "kitchen", name: "Kitchen", type: "kitchen", x: w/2 + 1, y: 19, width: w/2 - 2, height: 10, area: Math.round((w/2 - 2)*10), unit: "feet", label: `Kitchen ${Math.round(w/2 - 2)}'x10'` },
      { id: "bed1", name: "Bedroom", type: "bedroom", x: 1, y: 19, width: w/2 - 2, height: 12, area: Math.round((w/2 - 2)*12), unit: "feet", label: `Bedroom ${Math.round(w/2 - 2)}'x12'` },
      { id: "bath1", name: "Common Bath", type: "bathroom", x: 1, y: 33, width: 8, height: 5, area: 40, unit: "feet", label: "Bath 8'x5'" }
    ];
    
    if (optionId === "plan_opt_b") {
      // Vastu - swap kitchen and bedroom conceptually
      const k = rooms.find(r => r.id === "kitchen");
      const b = rooms.find(r => r.id === "bed1");
      if (k && b) {
        const kx = k.x, ky = k.y;
        k.x = b.x; k.y = b.y;
        b.x = kx; b.y = ky;
      }
    }
  } else {
    // Upper floors
    rooms = [
      { id: "master_bed", name: "Master Bedroom", type: "bedroom", x: 1, y: 1, width: w/2 - 2, height: 14, area: Math.round((w/2 - 2)*14), unit: "feet", label: `Master Bed ${Math.round(w/2 - 2)}'x14'` },
      { id: "bath2", name: "Attached Bath", type: "bathroom", x: w/2 + 1, y: 1, width: 8, height: 6, area: 48, unit: "feet", label: "Bath 8'x6'" },
      { id: "bed2", name: "Bedroom 2", type: "bedroom", x: 1, y: 17, width: w/2 - 2, height: 12, area: Math.round((w/2 - 2)*12), unit: "feet", label: `Bedroom 2 ${Math.round(w/2 - 2)}'x12'` },
      { id: "balcony", name: "Balcony", type: "balcony", x: w/2 + 1, y: 17, width: w/2 - 2, height: 8, area: Math.round((w/2 - 2)*8), unit: "feet", label: `Balcony ${Math.round(w/2 - 2)}'x8'` },
    ];
  }
  
  return {
    floorNumber: floorNum,
    width: plotWidth,
    depth: plotDepth,
    rooms,
    walls: [],
    doors: [],
    windows: [],
    furniture: []
  };
}
