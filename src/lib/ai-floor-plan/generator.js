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
    You are an expert architect specializing in Indian residential floor plans.
    Generate 3 conceptual 2D floor plan options for a residential building based on the requirements below.
    The output will be rendered as a clean black-and-white CAD drawing (no colors, no interior furniture icons).

    Requirements:
    Plot: ${input.plotWidth}x${input.plotDepth} ${input.unit} (${input.facing || 'Unknown'} facing)
    Building Type: ${input.buildingType || 'House'}
    Floors: ${input.floors || 1}
    Vastu: ${input.vastuPreference || 'Moderate'}
    Budget Range: ${input.budgetRange || 'Standard'}
    Family Size: ${input.familySize || 'Unknown'}
    Parking: ${input.parking || 'None'}
    Special Spaces: ${(input.specialSpaces || []).join(', ')}
    Style: ${input.style || 'Modern'}
    User Prompt: "${input.prompt || ''}"

    Use traditional Indian CAD plan room names such as:
    - FRONT HALL, BED ROOM, MASTER BED ROOM, KITCHEN CUM DINING, KITCHEN, TOILET,
      POOJA, PORTICO, STAIRCASE, ATTACHED TOILET, COMMON TOILET, UTILITY, TERRACE, OPEN TERRACE.

    Return the response STRICTLY as a JSON array of 3 plan objects. Do not include markdown code fences.
    Each object must match this schema exactly:
    {
      "id": "plan_opt_a",
      "name": "Balanced Layout",
      "plotWidth": ${input.plotWidth},
      "plotDepth": ${input.plotDepth},
      "floors": [
        {
          "floorNumber": 1,
          "width": ${input.plotWidth},
          "depth": ${input.plotDepth},
          "rooms": [
            { "id": "r1", "name": "Front Hall", "type": "living", "x": 1, "y": 1, "width": 14, "height": 16, "area": 224, "unit": "feet", "label": "Front Hall 14'x16'" }
          ],
          "walls": [
            { "id": "outer-n", "x1": 1, "y1": 1, "x2": 29, "y2": 1, "type": "exterior" },
            { "id": "partition-1", "x1": 15, "y1": 1, "x2": 15, "y2": 25, "type": "interior" }
          ],
          "doors": [
            { "id": "main-door", "x": 16, "y": 16, "width": 3.5, "side": "south", "swing": "in" }
          ],
          "windows": [
            { "id": "living-window", "x": 18, "y": 1, "width": 5, "side": "north" }
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

    Rules:
    1. All rooms, walls, doors, and windows must fit within the ${input.plotWidth}x${input.plotDepth} grid.
    2. Start all rooms at x=1, y=1 (1-foot setback from plot edge).
    3. Option A = Balanced, Option B = Vastu-optimized, Option C = Space-maximized.
    4. Use realistic Indian room sizes (Living 14-18ft wide, Bedrooms 11-14ft, Toilets 5-7ft, Kitchen 9-12ft).
    5. Mark outer envelope walls as type "exterior", partition walls as "interior".
    6. Include main entry door, room doors, and windows in bedrooms/living/kitchen.
    7. Leave furniture array empty — the renderer will not display furniture symbols.
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
