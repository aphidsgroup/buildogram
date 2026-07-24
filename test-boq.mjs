import { computeExcelBoq } from './src/lib/boq-calc/excel-engine.js';

const inputs = {
  floors: [
    { floorLabel: 'Ground', length: 12.75, breadth: 8.38, area: 1148.52 },
    { floorLabel: '1st',    length: 12.75, breadth: 8.38, area: 1148.52 },
  ],
  foundation: [
    { nos: 2, footingL: 1.07, footingB: 1.07, footingDepth: 1.5, pccThickness: 0.1, footingConcreteD: 0.45, colL: 0.23, colB: 0.23, colD: 3.0, floorIdx: 0 },
    { nos: 5, footingL: 1.22, footingB: 1.22, footingDepth: 1.5, pccThickness: 0.1, footingConcreteD: 0.45, colL: 0.23, colB: 0.38, colD: 3.0, floorIdx: 0 },
    { nos: 3, footingL: 1.37, footingB: 1.37, footingDepth: 1.5, pccThickness: 0.1, footingConcreteD: 0.45, colL: 0.23, colB: 0.38, colD: 3.0, floorIdx: 0 },
    { nos: 2, footingL: 1.52, footingB: 1.52, footingDepth: 1.5, pccThickness: 0.1, footingConcreteD: 0.45, colL: 0.30, colB: 0.45, colD: 3.0, floorIdx: 0 },
  ],
  plinthBeam: [
    { label: 'PB-1', length: 56, breadth: 0.23, depth: 0.45 },
  ],
  slabConcrete: [
    { floorLabel: 'Ground', beamL: 56, beamB: 0.23, beamD: 0.45, slabArea: 106.84, slabD: 0.125 },
    { floorLabel: '1st',    beamL: 56, beamB: 0.23, beamD: 0.45, slabArea: 106.84, slabD: 0.125 },
  ],
  brickwork9: [
    {
      floorLabel: 'Ground Floor', length: 42.26, height: 3.0,
      doorOpens:   [{ L: 1.0, H: 2.1, nos: 1 }, { L: 0.9, H: 2.1, nos: 1 }],
      windowOpens: [{ L: 1.5, H: 1.2, nos: 3 }, { L: 1.2, H: 1.2, nos: 2 }],
    },
    {
      floorLabel: '1st Floor', length: 42.26, height: 3.0,
      doorOpens:   [{ L: 0.9, H: 2.1, nos: 1 }],
      windowOpens: [{ L: 1.5, H: 1.2, nos: 4 }, { L: 1.2, H: 1.2, nos: 2 }],
    },
  ],
  brickwork4: [
    { floorLabel: 'Ground Floor', length: 28, height: 3.0, doorOpens: [{ L: 0.9, H: 2.1, nos: 3 }], windowOpens: [] },
    { floorLabel: '1st Floor',    length: 32, height: 3.0, doorOpens: [{ L: 0.9, H: 2.1, nos: 4 }], windowOpens: [] },
  ],
  tileWork: {
    flooringArea:     160,
    bathroomFloorArea: 18,
    parkingArea:       20,
    kitchenWallArea:   15,
    bathroomWallArea:  36,
    skirtingLength:   150,
    graniteArea:       10,
  },
  doorsWindows: [
    { type: 'main_door',  nos: 1 },
    { type: 'room_door',  nos: 4 },
    { type: 'pvc_door',   nos: 3 },
    { type: 'pooja_door', nos: 1 },
  ],
  staircase: {
    width: 1.2, tread: 0.28, riser: 0.17, noOfSteps: 18,
    graniteArea: 10, handrailLength: 10,
    concreteL: 4.0, concreteB: 1.2, concreteD: 0.15,
  },
  others: { terraceSurkhiArea: 1148 },
  premiumItems: {
    compoundWallLength: 48,
    numBathrooms:        3,
    electricalPoints:   55,
    numOHTanks:          1,
    borewellDepth:      180,
    kitchenPlatformRM:   4,
    bbsSteelOverride:  5068,
    upvcWindowsSqft:     0,
    externalDevArea:    22,
    contingencyPct:      5,
    prelimsPct:          3,
    architectFeePct:     3,
    gstPct:              5,
  },
  addlWorks: [
    { description: 'Underground Water Sump (5000L)',   unit: 'Nos', quantity: 1, rate: 45000 },
    { description: 'Septic Tank (2-chamber RCC)',      unit: 'Nos', quantity: 1, rate: 35000 },
  ],
  basement: {
    totalPlinthArea: 1148.52,
    netArea: 1148.52,
    brickL: 56, brickB: 0.23, brickD: 0.45,
    plasterL: 56, plasterD: 0.45
  },
  plastering: {
    outerPlasterArea: 0,
    innerPlasterArea: 0,
    ceilingArea: 0
  }
};

const res = computeExcelBoq(inputs, { mode: 'excel', rateMap: null, marginPct: 0 });
console.log('Building Estimate:', res.buildingEstimate);
console.log('Additional Total:', res.additionalTotal);
console.log('Grand Total:', res.grandTotal);
