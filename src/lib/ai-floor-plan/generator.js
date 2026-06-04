// src/lib/ai-floor-plan/generator.js
import { generateCompletion } from '../ai';
import { getMockTemplates } from './templates';

export async function generateFloorPlans(projectInput) {
  const provider = process.env.AI_PROVIDER;
  const apiKey = process.env.AI_API_KEY;
  const input = normalizeProjectInput(projectInput);

  // Use mock generation if no AI configured or if it's explicitly requested
  if (!provider || provider === 'none' || !apiKey) {
    console.log("Using mock floor plan generation (No API Key)");
    return getMockTemplates(input.plotWidth, input.plotDepth, input.floors);
  }

  const prompt = `
    You are an expert architect producing Indian residential floor plans in Chennai / Tamil Nadu drafter style.
    Generate 3 conceptual 2D floor plan options rendered as clean black-and-white CAD drawings.
    No furniture, no fixture icons, no colours. Rooms contain only room name and room dimension.

    Requirements:
    Plot: ${input.plotWidth}x${input.plotDepth} ${input.unit} (${input.facing || 'Unknown'} facing)
    Building Type: ${input.buildingType || 'House'}
    Floors: ${input.floors || 1}
    Vastu: ${input.vastuPreference || 'Moderate'}
    Budget: ${input.budgetRange || 'Standard'}
    Family: ${input.familySize || 'Unknown'}
    Parking: ${input.parking || 'None'}
    Special: ${(input.specialSpaces || []).join(', ')}
    User note: "${input.prompt || ''}"

    ROOM NAMES — use these exact Indian CAD labels (UPPERCASE):
    PORTICO, FRONT HALL, LIVING ROOM, BED ROOM, MASTER BED ROOM, KITCHEN,
    KITCHEN CUM DINING, TOILET, ATTACHED TOILET, COMMON TOILET, POOJA,
    WARDROBE, SIT OUT, BALCONY, OPEN TERRACE, STAIRCASE, UTILITY, STORE.

    DOOR SYMBOLS — include a "symbol" field on each door:
    "MD" for main door, "D" for standard room door, "D1" / "D2" for smaller internal doors.

    WINDOW SYMBOLS — include a "symbol" field on each window:
    "W" for standard window, "V" for ventilator (small, usually toilets/utility),
    "OP" for open archway / portico opening.

    FLOOR LABELS:
    floorNumber 1 → floorLabel: "GROUND FLOOR PLAN"
    floorNumber 2 → floorLabel: "FIRST FLOOR PLAN"
    floorNumber 3 → floorLabel: "TERRACE FLOOR PLAN"

    Return STRICTLY a JSON array of 3 plan objects. No markdown fences. Schema:
    {
      "id": "plan_opt_a",
      "name": "Balanced Layout",
      "plotWidth": ${input.plotWidth},
      "plotDepth": ${input.plotDepth},
      "sheetType": "FLOOR PLAN",
      "floors": [
        {
          "floorNumber": 1,
          "floorLabel": "GROUND FLOOR PLAN",
          "width": ${input.plotWidth},
          "depth": ${input.plotDepth},
          "roadLabel": "ROAD",
          "setbacks": { "front": 5, "rear": 3, "left": 0, "right": 0 },
          "rooms": [
            { "id": "r1", "name": "Front Hall", "type": "living", "x": 1, "y": 1, "width": 14, "height": 16, "area": 224, "unit": "feet" }
          ],
          "walls": [
            { "id": "ext-n", "x1": 1, "y1": 1, "x2": ${input.plotWidth - 1}, "y2": 1, "type": "exterior" },
            { "id": "partition-1", "x1": 15, "y1": 1, "x2": 15, "y2": 25, "type": "interior" }
          ],
          "doors": [
            { "id": "main-door", "symbol": "MD", "x": 14, "y": 16, "width": 3.5, "side": "north" },
            { "id": "bed-door",  "symbol": "D",  "x": 5,  "y": 16, "width": 3,   "side": "north" },
            { "id": "tlt-door",  "symbol": "D1", "x": 2,  "y": 28, "width": 2.5, "side": "north" }
          ],
          "windows": [
            { "id": "hall-w",  "symbol": "W",  "x": 18, "y": 1, "width": 5,   "side": "north" },
            { "id": "tlt-vent","symbol": "V",  "x": 1,  "y": 31,"width": 2,   "side": "west" },
            { "id": "porch-op","symbol": "OP", "x": 2,  "y": 1, "width": 6,   "side": "north" }
          ],
          "furniture": []
        }
      ],
      "summary": {
        "builtUpArea": 960,
        "carpetArea": 749,
        "estimatedConstructionCostRange": "Rs 17L - Rs 21L",
        "designNotes": ["string"],
        "warnings": ["string"]
      }
    }

    Design rules:
    1. All geometry must fit within ${input.plotWidth}x${input.plotDepth} feet.
    2. Leave 1-ft margin at plot edge for wall thickness.
    3. Option A = Balanced, B = Vastu-optimised (SE kitchen, SW master, NE pooja), C = Space-maximised.
    4. Realistic Indian sizes: Living 14-18ft, Bedrooms 11-14ft, Toilets 5-7ft, Kitchen 9-13ft.
    5. Mark outer envelope walls type "exterior", partitions "interior".
    6. Every room with a door must have a door entry in the doors array with correct symbol.
    7. Bedrooms, kitchen, and living rooms must each have at least one window (symbol "W").
    8. Toilets/utility must have a ventilator (symbol "V").
    9. Portico/sit-out should use "OP" for open side.
    10. Leave furniture array empty — renderer ignores furniture for CAD view.
  `;

  try {
    const rawOutput = await generateCompletion(
      "You are a structural parser that only outputs valid JSON arrays.",
      prompt
    );
    
    let parsed = rawOutput;
    if (typeof rawOutput === 'string') {
      let clean = rawOutput.trim();
      if (clean.startsWith('```json')) clean = clean.substring(7);
      if (clean.startsWith('```')) clean = clean.substring(3);
      if (clean.endsWith('```')) clean = clean.substring(0, clean.length - 3);
      parsed = JSON.parse(clean);
    }
    
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (error) {
    console.error("AI Generation Error:", error);
    // Fallback to mock on error
    return getMockTemplates(input.plotWidth, input.plotDepth, input.floors);
  }
}

function normalizeProjectInput(projectInput = {}) {
  return {
    ...projectInput,
    plotWidth: Number(projectInput.plotWidth || projectInput.plot_width || 30),
    plotDepth: Number(projectInput.plotDepth || projectInput.plot_depth || 40),
    unit: projectInput.unit || 'feet',
    floors: Number(projectInput.floors || 1),
    facing: projectInput.facing,
    buildingType: projectInput.buildingType || projectInput.building_type,
    vastuPreference: projectInput.vastuPreference || projectInput.vastu_preference,
    budgetRange: projectInput.budgetRange || projectInput.budget_range,
    familySize: projectInput.familySize || projectInput.family_size,
    parking: projectInput.parking,
    specialSpaces: projectInput.specialSpaces || projectInput.special_spaces || [],
    style: projectInput.style,
    prompt: projectInput.prompt || ''
  };
}
