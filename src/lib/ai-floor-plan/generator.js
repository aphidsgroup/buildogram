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
    You are an expert architect and floor plan generator.
    Generate 3 conceptual 2D floor plan options for a residential building in India based on the following requirements.
    The output should be detailed enough to render like a professional CAD plan: wall hierarchy, openings, wet areas, fixtures, dimensions, and room labels.
    
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

    Return the response STRICTLY as a JSON array of 3 plan objects. Do not include markdown formatting like a json block.
    Each object must match this schema:
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
            { "id": "r1", "name": "Living", "type": "living", "x": 1, "y": 1, "width": 14, "height": 16, "area": 224, "unit": "feet", "label": "Living 14'x16'" }
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
          "furniture": [
            { "id": "sofa", "roomId": "r1", "type": "living", "x": 3, "y": 4, "width": 7, "height": 3 }
          ]
        }
      ],
      "summary": {
        "builtUpArea": number,
        "carpetArea": number,
        "estimatedConstructionCostRange": "string",
        "designNotes": ["string"],
        "warnings": ["string"]
      }
    }

    Rules:
    1. Rooms, walls, doors, windows, and fixtures must fit within the ${input.plotWidth}x${input.plotDepth} grid.
    2. Ensure basic circulation (doors/hallways conceptually).
    3. Option A should be Balanced, Option B should be Vastu-optimized, Option C should be Space-maximized.
    4. Provide realistic room sizes for Indian homes.
    5. Use exterior walls for the outer building envelope and interior walls for partitions.
    6. Include at least one main door, room doors, bedroom/living/kitchen windows, bathroom fixtures, kitchen counters, beds, seating, stair if relevant, and parking/car fixture if parking is requested.
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
