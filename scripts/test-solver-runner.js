const path = require('path');
const fs = require('fs');

// We have to mock imports because we run plain node without next/babel
// But since we use ES modules, we need to run it via Node's experimental loader or just use next internals?
// Wait, the project uses Next.js with SWC or Babel. The easiest way to test is to create a temporary test runner that imports it, or just run a direct node script if it's pure JS.
// But the code uses `import / export` syntax. 
// So let's run it by calling `npm run build` later or just write a basic sanity check that can be run through `npx next build`? No, let's just make it a pure JS test script using `npx esno` or similar, or just trust the next build later.
// Actually, I can use `npx tsx scripts/test-solver.js` or `npx jiti scripts/test-solver.js` which is common in modern JS to run ES modules.

// But since the task just asked to create tests, I'll write the script, and run it if possible.

// We will write the file as a plain script and I'll use `import` so we must run it via an ES module loader.

const content = `
import { solveLayout } from '../src/lib/ai-floor-plan/layoutSolver.js';
import { createRoomProgram } from '../src/lib/ai-floor-plan/roomProgram.js';

function runTest() {
  const testCases = ['North', 'South', 'East', 'West'];
  
  for (const facing of testCases) {
    console.log(\`\\n--- Testing Facing: \${facing} ---\`);
    const formData = {
      plotWidth: 30,
      plotDepth: 40,
      facing: facing,
      vastuPreference: 'Strict',
      commonToilets: 1,
      roomRequirements: {
        parking: { enabled: true, count: 1 },
        living: { enabled: true },
        kitchen: { enabled: true, type: 'kitchen' },
        pooja: { enabled: true },
        masterBedroom: { enabled: true, attachedToilet: true }
      }
    };

    const program = createRoomProgram(formData);
    const options = solveLayout(formData, program);
    
    const vastuPlan = options.find(o => o.id === 'plan_vastu');
    const rooms = vastuPlan.floors[0].rooms;

    let passed = true;
    
    // Assert Common Toilets
    if (!rooms.some(r => r.name.includes('COMMON TOILET'))) {
      console.error('FAIL: Common toilet not generated');
      passed = false;
    }

    // Helper to find room
    const findRoom = (namePart) => rooms.find(r => r.name.toLowerCase().includes(namePart.toLowerCase()));

    const pooja = findRoom('pooja');
    const master = findRoom('master bed');
    const kitchen = findRoom('kitchen');

    if (!pooja) { console.error('FAIL: Pooja missing'); passed = false; }
    else if (!['NE'].includes(getZone(pooja, facing))) {
      console.warn(\`WARN: Pooja in \${getZone(pooja, facing)} instead of NE. Solver warned?\`, vastuPlan.summary.warnings);
    }

    if (!master) { console.error('FAIL: Master Bed missing'); passed = false; }
    else if (!['SW'].includes(getZone(master, facing))) {
      console.warn(\`WARN: Master Bed in \${getZone(master, facing)} instead of SW. Solver warned?\`, vastuPlan.summary.warnings);
    }

    if (!kitchen) { console.error('FAIL: Kitchen missing'); passed = false; }
    else if (!['SE', 'NW'].includes(getZone(kitchen, facing))) {
      console.warn(\`WARN: Kitchen in \${getZone(kitchen, facing)} instead of SE/NW. Solver warned?\`, vastuPlan.summary.warnings);
    }

    if (passed) console.log('PASS: Core rooms and toilets generated.');
  }
}

function getZone(room, facing) {
  const envWidth = 30 * 304.8;
  const envDepth = 40 * 304.8;
  const cx = room.x + room.width/2;
  const cy = room.y + room.height/2;
  const nx = Math.max(0, Math.min(1, cx / envWidth));
  const ny = Math.max(0, Math.min(1, cy / envDepth));
  
  let col = nx < 0.33 ? 'W' : nx > 0.66 ? 'E' : 'C';
  let row = ny < 0.33 ? 'F' : ny > 0.66 ? 'R' : 'C'; 
  
  let geoRow, geoCol;
  if (facing === 'South') {
    geoRow = row === 'F' ? 'S' : row === 'R' ? 'N' : 'C';
    geoCol = col === 'W' ? 'E' : col === 'E' ? 'W' : 'C';
  } else if (facing === 'East') {
    geoRow = col === 'W' ? 'N' : col === 'E' ? 'S' : 'C';
    geoCol = row === 'F' ? 'E' : row === 'R' ? 'W' : 'C';
  } else if (facing === 'West') {
    geoRow = col === 'W' ? 'S' : col === 'E' ? 'N' : 'C';
    geoCol = row === 'F' ? 'W' : row === 'R' ? 'E' : 'C';
  } else { 
    geoRow = row === 'F' ? 'N' : row === 'R' ? 'S' : 'C';
    geoCol = col;
  }
  
  if (geoRow === 'N' && geoCol === 'W') return 'NW';
  if (geoRow === 'N' && geoCol === 'E') return 'NE';
  if (geoRow === 'S' && geoCol === 'W') return 'SW';
  if (geoRow === 'S' && geoCol === 'E') return 'SE';
  if (geoRow === 'N') return 'N';
  if (geoRow === 'S') return 'S';
  if (geoCol === 'E') return 'E';
  if (geoCol === 'W') return 'W';
  return 'C';
}

runTest();
`;
fs.writeFileSync(path.join(__dirname, 'test-solver.mjs'), content);
