// src/lib/ai-floor-plan/generator.js
import { generateCompletion } from '../ai';
import { getMockTemplates } from './templates';

export async function generateFloorPlans(projectInput) {
  const provider = process.env.AI_PROVIDER;
  const apiKey = process.env.AI_API_KEY;

  // Use mock generation if no AI configured or if it's explicitly requested
  if (!provider || provider === 'none' || !apiKey) {
    console.log("Using mock floor plan generation (No API Key)");
    return getMockTemplates(projectInput.plotWidth || 30, projectInput.plotDepth || 40, projectInput.floors || 1);
  }

  const prompt = `
    You are an expert architect and floor plan generator.
    Generate 3 conceptual 2D floor plan options for a residential building in India based on the following requirements.
    
    Requirements:
    Plot: ${projectInput.plotWidth}x${projectInput.plotDepth} ${projectInput.unit} (${projectInput.facing || 'Unknown'} facing)
    Building Type: ${projectInput.buildingType || 'House'}
    Floors: ${projectInput.floors || 1}
    Vastu: ${projectInput.vastuPreference || 'Moderate'}
    Budget Range: ${projectInput.budgetRange || 'Standard'}
    Family Size: ${projectInput.familySize || 'Unknown'}
    Parking: ${projectInput.parking || 'None'}
    Special Spaces: ${(projectInput.specialSpaces || []).join(', ')}
    Style: ${projectInput.style || 'Modern'}
    User Prompt: "${projectInput.prompt || ''}"

    Return the response STRICTLY as a JSON array of 3 plan objects. Do not include markdown formatting like ```json.
    Each object must match this schema:
    {
      "id": "plan_opt_a",
      "name": "Balanced Layout",
      "floors": [
        {
          "floorNumber": 1,
          "width": ${projectInput.plotWidth},
          "depth": ${projectInput.plotDepth},
          "rooms": [
            { "id": "r1", "name": "Living", "type": "living", "x": 1, "y": 1, "width": 14, "height": 16, "area": 224, "unit": "feet", "label": "Living 14'x16'" }
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
    1. Rooms must fit within the ${projectInput.plotWidth}x${projectInput.plotDepth} grid.
    2. Ensure basic circulation (doors/hallways conceptually).
    3. Option A should be Balanced, Option B should be Vastu-optimized, Option C should be Space-maximized.
    4. Provide realistic room sizes for Indian homes.
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
    return getMockTemplates(projectInput.plotWidth || 30, projectInput.plotDepth || 40, projectInput.floors || 1);
  }
}
