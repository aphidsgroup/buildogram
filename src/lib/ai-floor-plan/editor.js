// src/lib/ai-floor-plan/editor.js
import { generateCompletion } from '../ai';

export async function parseConversationalEdit(prompt, currentPlanJson) {
  const provider = process.env.AI_PROVIDER;
  const apiKey = process.env.AI_API_KEY;

  if (!provider || provider === 'none' || !apiKey) {
    // Mock mode: Just do a simple heuristic or return a generic response
    return handleMockEdit(prompt, currentPlanJson);
  }

  const aiPrompt = \`
    You are an AI floor plan editor. 
    The user wants to edit their floor plan: "\${prompt}"
    
    Current Plan:
    \${JSON.stringify(currentPlanJson)}
    
    Return ONLY a JSON array of operations to apply.
    Supported actions: resize_room, move_room, add_room, remove_room, rename_room.
    
    Schema:
    [
      {
        "action": "resize_room",
        "target": "room_id_here",
        "params": { "widthDelta": 2, "heightDelta": 0 }
      }
    ]
  \`;

  try {
    const rawOutput = await generateCompletion("You output strictly JSON.", aiPrompt);
    let parsed = JSON.parse(rawOutput.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim());
    return applyOperations(currentPlanJson, parsed);
  } catch (error) {
    console.error("AI Edit Error:", error);
    return handleMockEdit(prompt, currentPlanJson);
  }
}

function handleMockEdit(prompt, currentPlan) {
  // Simple mock edit: increase the first bedroom's size slightly if "bigger" is mentioned
  const lowerPrompt = prompt.toLowerCase();
  let updatedPlan = JSON.parse(JSON.stringify(currentPlan));
  let modified = false;

  if (lowerPrompt.includes("bigger") || lowerPrompt.includes("increase") || lowerPrompt.includes("larger")) {
    // find a bedroom
    for (let floor of updatedPlan.floors) {
      let bed = floor.rooms.find(r => r.type === 'bedroom' || r.type === 'master_bedroom');
      if (bed) {
        bed.width += 2;
        bed.area = bed.width * bed.height;
        bed.label = \`\${bed.name} \${bed.width}'x\${bed.height}'\`;
        modified = true;
        break;
      }
    }
  } else if (lowerPrompt.includes("smaller") || lowerPrompt.includes("reduce")) {
    for (let floor of updatedPlan.floors) {
      let bed = floor.rooms.find(r => r.type === 'bedroom' || r.type === 'master_bedroom');
      if (bed && bed.width > 8) {
        bed.width -= 2;
        bed.area = bed.width * bed.height;
        bed.label = \`\${bed.name} \${bed.width}'x\${bed.height}'\`;
        modified = true;
        break;
      }
    }
  }

  if (!modified) {
    // If we don't understand, just add a note
    updatedPlan.summary.designNotes.push(\`Attempted to apply: "\${prompt}", but mock mode has limited understanding.\`);
  } else {
    updatedPlan.summary.designNotes.push(\`Applied edit: "\${prompt}"\`);
  }

  return updatedPlan;
}

function applyOperations(plan, operations) {
  let updatedPlan = JSON.parse(JSON.stringify(plan));
  
  // Basic operation applier
  for (const op of operations) {
    for (let floor of updatedPlan.floors) {
      if (op.action === 'resize_room') {
        const room = floor.rooms.find(r => r.id === op.target);
        if (room) {
          room.width += (op.params.widthDelta || 0);
          room.height += (op.params.heightDelta || 0);
          room.area = room.width * room.height;
          room.label = \`\${room.name} \${room.width}'x\${room.height}'\`;
        }
      }
      // Add other operations here as needed for MVP
    }
  }
  
  updatedPlan.summary.designNotes.push("Plan updated via AI command.");
  return updatedPlan;
}
