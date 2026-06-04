// src/lib/ai-floor-plan/generator.js
import { createRoomProgram } from './roomProgram';
import { solveLayout } from './layoutSolver';
import { buildCADFloor, ftToMm } from './cadModel';
import { planOpenings } from './openingPlanner';
import { placeComponents } from './componentPlanner';
import { generateCompletion } from '../ai';

export async function generateFloorPlans(projectInput) {
  const input = normalizeProjectInput(projectInput);

  // AI Augmentation (Optional text prompt parsing)
  if (input.prompt && process.env.AI_API_KEY && process.env.AI_PROVIDER !== 'none') {
    try {
      console.log("Parsing prompt with AI...");
      // In a full implementation, AI would return modifications to `input.roomRequirements`
      // For now, we trust the strict structured form input as the primary source of truth.
    } catch (e) {
      console.error("AI parsing failed, falling back to strict deterministic rules", e);
    }
  }

  // 1. Create Normalized Room Program
  const roomProgram = createRoomProgram(input);

  // 2. Solve Layouts deterministically (returns 3 base CAD floors with rooms)
  let plans = solveLayout(input, roomProgram);

  // 3. Run Pipeline for each option
  plans = plans.map(plan => {
    return {
      ...plan,
      floors: plan.floors.map(floor => {
        // Build Walls
        let f = buildCADFloor(floor);
        // Cut Doors & Windows
        f = planOpenings(f);
        // Place Database Components
        if (input.layerPreference !== 'clean_cad') {
          f = placeComponents(f);
        }
        return f;
      })
    };
  });

  return plans;
}

function normalizeProjectInput(projectInput = {}) {
  // Merge defaults
  return {
    ...projectInput,
    plotWidth: Number(projectInput.plotWidth || 30),
    plotDepth: Number(projectInput.plotDepth || 40),
    unit: projectInput.unit || 'feet',
    floors: Number(projectInput.floors || 1),
    facing: projectInput.facing || 'North',
    vastuPreference: projectInput.vastuPreference || 'Moderate',
    roomSizePreference: projectInput.roomSizePreference || 'standard',
    layerPreference: projectInput.layerPreference || 'cad_and_blocks',
    prompt: projectInput.prompt || '',
    roomRequirements: projectInput.roomRequirements || {}
  };
}
