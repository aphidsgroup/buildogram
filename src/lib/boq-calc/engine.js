/**
 * BOQ Calculation Engine
 * Pure functions — no DB, no React, no side effects.
 * 
 * Entry point: computeBoq(inputs, rateMap, marginPct)
 * Returns: { items[], sectionTotals{}, buildingEstimate, ratePerSqft, marginVariants{} }
 *
 * Inputs shape (from boq_project + all input section rows):
 * {
 *   project:   { totalBuiltupArea, floorConfig, activeMarginPct }
 *   floors:    [{ floorLabel, length, breadth, area }]          // per-floor L×B
 *   foundation:   [...rows]
 *   plinthBeam:   [...rows]
 *   basement:     { brickL, brickB, brickD, plasterL, plasterD }
 *   brickwork9:   [...rows per floor]
 *   brickwork4:   [...rows per floor]
 *   plastering:   { innerRows[], outerRows[], ceilingArea }
 *   sillLintel:   { sillLength, lintelLength, loftRows[], sunshadeRows[], counterSlabRows[], balconyRows[] }
 *   tileWork:     { flooringArea, bathroomFloorArea, parkingArea, kitchenWallArea, bathroomWallArea, skirtingLength, graniteArea }
 *   doorsWindows: [...rows]
 *   slabConcrete: [...rows per floor]
 *   staircase:    { width, tread, riser, noOfSteps, graniteArea, handrailLength, concreteL, concreteB, concreteD }
 *   others:       { totalBuiltupArea (auto), terraceArea }
 *   addlWorks:    [...rows]
 *   pileRows:     [...rows]
 * }
 */

// ── helpers ────────────────────────────────────────────────────────────────
const n = (v) => Number(v) || 0;
const round2 = (v) => Math.round(v * 100) / 100;

function floorCount(floorConfig) {
  // "G" → 1, "G+1" → 2, "G+2" → 3, "G+3" → 4
  if (!floorConfig || floorConfig === 'G') return 1;
  const m = String(floorConfig).match(/G\+(\d)/);
  return m ? 1 + parseInt(m[1]) : 1;
}

// ── section calculators ────────────────────────────────────────────────────

function calcEarthwork(foundation) {
  // Item 1: Earth excavation = Σ footing L×B×depth × nos
  let vol = 0;
  for (const r of (foundation || [])) {
    vol += n(r.footingL) * n(r.footingB) * n(r.footingDepth) * n(r.nos);
  }
  return round2(vol);
}

function calcPCC(foundation) {
  // Item 2: PCC 1:4:8 = Σ footing L×B × pccThickness × nos
  let vol = 0;
  for (const r of (foundation || [])) {
    vol += n(r.footingL) * n(r.footingB) * n(r.pccThickness) * n(r.nos);
  }
  return round2(vol);
}

function calcFootingConcrete(foundation) {
  // Item 3: Footing concrete M20 = Σ footing L×B×concreteDepth × nos
  let vol = 0;
  for (const r of (foundation || [])) {
    vol += n(r.footingL) * n(r.footingB) * n(r.footingConcreteD) * n(r.nos);
  }
  return round2(vol);
}

function calcColumnConcrete(foundation) {
  // Item 4: Column concrete = Σ colL×colB×colD × nos (returns per-floor breakdown)
  const perFloor = {};
  for (const r of (foundation || [])) {
    const floorKey = n(r.floorIdx);
    if (!perFloor[floorKey]) perFloor[floorKey] = 0;
    perFloor[floorKey] += n(r.colL) * n(r.colB) * n(r.colD) * n(r.nos);
  }
  return perFloor;
}

function calcColumnConcreteTotal(foundation) {
  const pf = calcColumnConcrete(foundation);
  return round2(Object.values(pf).reduce((s, v) => s + v, 0));
}

function calcPlinthBeam(plinthBeam) {
  // Items 5: Plinth excavation = Σ PB+RSB+SB (L × B × D)
  let vol = 0;
  for (const r of (plinthBeam || [])) {
    vol += n(r.length) * n(r.breadth) * n(r.depth);
  }
  return round2(vol);
}

function calcBackfilling(excavation, pccVol, footingConcreteVol) {
  // Item 6: Backfilling = Excavation − (PCC + Footing Concrete)
  return round2(Math.max(0, excavation - pccVol - footingConcreteVol));
}

function calcBasementBrickwork(basement) {
  // Item 8: Basement brickwork volume
  return round2(n(basement?.brickL) * n(basement?.brickB) * n(basement?.brickD));
}

function calcBasementPlastering(basement) {
  // Item 9: Basement plastering area (both faces = × 2)
  return round2(n(basement?.plasterL) * n(basement?.plasterD) * 2);
}

function calcMSandLayer(floors) {
  // Item 10: MSand 4" layer = built-up area × (4/12)ft = area × 0.1016m conversion
  // In practice: builtup area (sqft) / 9 × 0.1016 for m³ OR use sqft directly as sqft→m conversion later
  // We store qty in m³: totalArea(m²) × (100mm/1000) = area × 0.1
  const totalArea = (floors || []).reduce((s, r) => s + n(r.area), 0);
  // Convert sqft → m²: 1 sqft = 0.0929 m²
  const areaM2 = totalArea * 0.0929;
  return round2(areaM2 * 0.1); // 100mm = 0.1m depth
}

function calcAntiTermite(floors) {
  const totalArea = (floors || []).reduce((s, r) => s + n(r.area), 0);
  return round2(totalArea * 0.0929); // sqft → m²
}

function calcFlooringPCC(floors) {
  const totalArea = (floors || []).reduce((s, r) => s + n(r.area), 0);
  return round2(totalArea * 0.0929); // sqft → m²
}

function calcBasementFilling(basement, floors) {
  // Basement filling: plinth area × depth (estimated 2ft) - structure volume
  const totalArea = (floors || []).reduce((s, r) => s + n(r.area), 0);
  const plinthAreaM2 = (totalArea * 0.0929);
  const baseVol = n(basement?.brickL) * n(basement?.brickB) * n(basement?.brickD);
  return round2(Math.max(0, plinthAreaM2 * 0.6 - baseVol));
}

function calcBrickwork9(brickwork9) {
  // 9" wall: each row has L, H, doorOpens[{L,H,nos}], windowOpens[{L,H,nos}]
  let area = 0;
  for (const r of (brickwork9 || [])) {
    let openArea = 0;
    for (const d of (r.doorOpens || [])) openArea += n(d.L) * n(d.H) * n(d.nos);
    for (const w of (r.windowOpens || [])) openArea += n(w.L) * n(w.H) * n(w.nos);
    area += Math.max(0, n(r.length) * n(r.height) - openArea);
  }
  return round2(area); // m²
}

function calcBrickwork4(brickwork4) {
  let area = 0;
  for (const r of (brickwork4 || [])) {
    let openArea = 0;
    for (const d of (r.doorOpens || [])) openArea += n(d.L) * n(d.H) * n(d.nos);
    area += Math.max(0, n(r.length) * n(r.height) - openArea);
  }
  return round2(area); // m²
}

function calcOuterPlastering(brickwork9) {
  let area = 0;
  for (const r of (brickwork9 || [])) {
    let openArea = 0;
    for (const d of (r.doorOpens || [])) openArea += n(d.L) * n(d.H) * n(d.nos);
    for (const w of (r.windowOpens || [])) openArea += n(w.L) * n(w.H) * n(w.nos);
    area += Math.max(0, n(r.length) * n(r.height) - openArea);
  }
  return round2(area);
}

function calcInnerPlastering(plastering) {
  let area = 0;
  for (const r of (plastering?.innerRows || [])) {
    let openArea = 0;
    for (const d of (r.doorOpens || [])) openArea += n(d.L) * n(d.H) * n(d.nos);
    for (const w of (r.windowOpens || [])) openArea += n(w.L) * n(w.H) * n(w.nos);
    area += Math.max(0, n(r.length) * n(r.height) - openArea);
  }
  return round2(area);
}

function calcSillLintelMisc(sillLintel) {
  const { sillLength = 0, lintelLength = 0, loftRows = [], sunshadeRows = [], counterSlabRows = [], balconyRows = [] } = sillLintel || {};
  let loftVol = 0;
  for (const r of loftRows) loftVol += n(r.L) * n(r.B) * n(r.D || 0.1);
  for (const r of sunshadeRows) loftVol += n(r.L) * n(r.B) * n(r.D || 0.08);
  for (const r of counterSlabRows) loftVol += n(r.L) * n(r.B) * n(r.D || 0.1);
  for (const r of balconyRows) loftVol += n(r.L) * n(r.B) * n(r.D || 0.12);
  return {
    sillLength: round2(n(sillLength)),
    lintelLength: round2(n(lintelLength)),
    loftVol: round2(loftVol),
  };
}

function calcSlabConcrete(slabConcrete) {
  // Returns per-floor slab volume
  const perFloor = [];
  for (const r of (slabConcrete || [])) {
    const beamVol = n(r.beamL) * n(r.beamB) * n(r.beamD);
    const slabVol = n(r.slabArea) * n(r.slabD);
    perFloor.push({ floorLabel: r.floorLabel, beamVol, slabVol, total: round2(beamVol + slabVol) });
  }
  return perFloor;
}

function calcStaircase(staircase) {
  if (!staircase) return { brickVol: 0, graniteArea: 0, handrailLength: 0, concreteVol: 0 };
  const { width = 0, tread = 0, riser = 0, noOfSteps = 0, graniteArea = 0, handrailLength = 0, concreteL = 0, concreteB = 0, concreteD = 0 } = staircase;
  // Brickwork in risers: (tread/2 × riser) × width × noOfSteps in m³ approximation
  const brickVol = round2((n(tread) * n(riser) / 2) * n(width) * n(noOfSteps) * 0.0283168); // ft³ → m³
  const concreteVol = round2(n(concreteL) * n(concreteB) * n(concreteD));
  return {
    brickVol,
    graniteArea: round2(n(graniteArea)),
    handrailLength: round2(n(handrailLength)),
    concreteVol,
  };
}

function calcWindowArea(brickwork9) {
  // Auto-calculate total UPVC window area from brickwork openings
  let area = 0;
  for (const r of (brickwork9 || [])) {
    for (const w of (r.windowOpens || [])) area += n(w.L) * n(w.H) * n(w.nos);
  }
  return round2(area * 10.764); // m² → sqft
}

// ── MAIN ENGINE ────────────────────────────────────────────────────────────

/**
 * @param {Object} inputs – all project input sections
 * @param {Object} rateMap – keyed by sno (from buildRateMap())
 * @param {number} marginPct – e.g. 12 for 12%
 * @returns {Object} Full BOQ result
 */
export function computeBoq(inputs, rateMap, marginPct = 12) {
  const {
    floors = [], foundation = [], plinthBeam = [],
    basement = {}, brickwork9 = [], brickwork4 = [],
    plastering = {}, sillLintel = {}, tileWork = {},
    doorsWindows = [], slabConcrete = [], staircase = {},
    others = {}, addlWorks = [], pileRows = [],
  } = inputs;

  const R = rateMap;
  const mf = 1 + marginPct / 100; // margin factor

  // ── Quantities ──────────────────────────────────────────────────────
  const totalAreaSqft = floors.reduce((s, r) => s + n(r.area), 0);
  const totalAreaM2   = round2(totalAreaSqft * 0.0929);

  const qEarthExcav   = calcEarthwork(foundation);
  const qPCC          = calcPCC(foundation);
  const qFootingConc  = calcFootingConcrete(foundation);
  const qColumnConc   = calcColumnConcreteTotal(foundation);
  const qPlinthBeamExcav = calcPlinthBeam(plinthBeam);
  const qPlinthBeamConc  = qPlinthBeamExcav; // same volume
  const qBackfill     = calcBackfilling(qEarthExcav, qPCC, qFootingConc);
  const qBasementBrick   = calcBasementBrickwork(basement);
  const qBasementPlaster = calcBasementPlastering(basement);
  const qBasementFill = calcBasementFilling(basement, floors);
  const qMSand        = calcMSandLayer(floors);
  const qAntiTermite  = calcAntiTermite(floors);
  const qFlooringPCC  = calcFlooringPCC(floors);
  const qBrick9       = calcBrickwork9(brickwork9);
  const qBrick4       = calcBrickwork4(brickwork4);
  const qOuterPlaster = calcOuterPlastering(brickwork9);
  const qInnerPlaster = calcInnerPlastering(plastering);
  const qCeiling      = round2(n(plastering?.ceilingArea));
  const { sillLength, lintelLength, loftVol } = calcSillLintelMisc(sillLintel);
  const slabData      = calcSlabConcrete(slabConcrete);
  const totalSlabVol  = round2(slabData.reduce((s, r) => s + r.total, 0));
  const stairData     = calcStaircase(staircase);
  const qWindowArea   = calcWindowArea(brickwork9);

  // Tile Work
  const { flooringArea = 0, bathroomFloorArea = 0, parkingArea = 0, kitchenWallArea = 0, bathroomWallArea = 0, skirtingLength = 0, graniteArea = 0 } = tileWork;

  // MEP
  const totalBuiltupSqft = n(others.totalBuiltupArea || totalAreaSqft);
  const terraceArea = round2(n(others.terraceArea) * 0.0929); // sqft → m²

  // Doors & Windows
  const mainDoors    = (doorsWindows || []).filter(r => r.type === 'main_door');
  const roomDoors    = (doorsWindows || []).filter(r => r.type === 'room_door');
  const pvcDoors     = (doorsWindows || []).filter(r => r.type === 'pvc_door');
  const poojaDoors   = (doorsWindows || []).filter(r => r.type === 'pooja_door');
  const sumNos       = (arr) => arr.reduce((s, r) => s + n(r.nos), 0);

  // ── Build line items ─────────────────────────────────────────────────
  const items = [
    // ── FOUNDATION SECTION (items 1–13) ──
    mkItem(1,  'Earthwork',    'Earth Excavation for Foundations',          'm³',   qEarthExcav,          R[1]?.rateGFloor  || 0, marginPct),
    mkItem(2,  'Earthwork',    'PCC M10 (1:4:8) below Footings',            'm³',   qPCC,                 R[3]?.rateGFloor  || 0, marginPct),
    mkItem(3,  'Concrete',     'Footing Concrete M20',                      'm³',   qFootingConc,         R[4]?.rateGFloor  || 0, marginPct),
    mkItem(4,  'Concrete',     'Column Concrete M20 (all floors avg)',       'm³',   qColumnConc,          R[5]?.rateAvg     || 0, marginPct),
    mkItem(5,  'Concrete',     'Plinth Beam Excavation',                    'm³',   qPlinthBeamExcav,     R[1]?.rateGFloor  || 0, marginPct),
    mkItem(6,  'Earthwork',    'Back-filling',                              'm³',   qBackfill,            R[2]?.rateGFloor  || 0, marginPct),
    mkItem(7,  'Concrete',     'Plinth Beam / RSB / SB Concrete M20',       'm³',   qPlinthBeamConc,      R[6]?.rateGFloor  || 0, marginPct),
    mkItem(8,  'Brickwork',    'Basement Brickwork',                        'm³',   qBasementBrick,       R[11]?.rateGFloor || 0, marginPct),
    mkItem(9,  'Plastering',   'Basement Plastering (both faces)',           'm²',   qBasementPlaster,     R[14]?.rateGFloor || 0, marginPct),
    mkItem(10, 'Ground Prep',  'Basement Filling (moorum / earth)',          'm³',   qBasementFill,        R[42]?.rateGFloor || 0, marginPct),
    mkItem(11, 'Ground Prep',  'M-Sand 4" Layer below Floor Slab',          'm³',   qMSand,               R[39]?.rateGFloor || 0, marginPct),
    mkItem(12, 'Ground Prep',  'Anti-Termite Pre-Construction Treatment',   'm²',   qAntiTermite,         R[40]?.rateGFloor || 0, marginPct),
    mkItem(13, 'Ground Prep',  'Flooring PCC M7.5 below Tiles',             'm²',   qFlooringPCC,         R[41]?.rateGFloor || 0, marginPct),

    // ── SUPERSTRUCTURE SECTION (items 14–43) ──
    mkItem(14, 'Brickwork',    '9" Flyash Brick Wall',                      'm²',   qBrick9,              R[12]?.rateAvg    || 0, marginPct),
    mkItem(15, 'Brickwork',    '4.5" Flyash Brick Partition Wall',           'm²',   qBrick4,              R[13]?.rateAvg    || 0, marginPct),
    mkItem(16, 'Plastering',   'Outer Wall Plastering 20mm',                 'm²',   qOuterPlaster,        R[15]?.rateAvg    || 0, marginPct),
    mkItem(17, 'Plastering',   'Inner Wall Plastering 12mm',                 'm²',   qInnerPlaster,        R[16]?.rateAvg    || 0, marginPct),
    mkItem(18, 'Plastering',   'Ceiling Plastering 6mm',                    'm²',   qCeiling,             R[17]?.rateAvg    || 0, marginPct),
    mkItem(19, 'Concrete',     'Sill Beam Concrete M20',                    'RM',   sillLength,           R[8]?.rateAvg     || 0, marginPct),
    mkItem(20, 'Concrete',     'Lintel Beam Concrete M20',                  'RM',   lintelLength,         R[8]?.rateAvg     || 0, marginPct),
    mkItem(21, 'Concrete',     'Loft / Sunshade / Counter Slab / Balcony Downslab', 'm³', loftVol,        R[9]?.rateAvg     || 0, marginPct),
    mkItem(22, 'Concrete',     'Roof Beam & Slab Concrete M20',             'm³',   totalSlabVol,         R[7]?.rateAvg     || 0, marginPct),
    mkItem(23, 'Tile Work',    'Main Floor Vitrified Tiles',                 'm²',   n(flooringArea),      R[18]?.rateAvg    || 0, marginPct),
    mkItem(24, 'Tile Work',    'Bathroom Floor Ceramic Tiles',               'm²',   n(bathroomFloorArea), R[19]?.rateAvg    || 0, marginPct),
    mkItem(25, 'Tile Work',    'Parking / Balcony Anti-Skid Tiles',          'm²',   n(parkingArea),       R[20]?.rateAvg    || 0, marginPct),
    mkItem(26, 'Tile Work',    'Kitchen Wall Ceramic Tiles',                 'm²',   n(kitchenWallArea),   R[21]?.rateAvg    || 0, marginPct),
    mkItem(27, 'Tile Work',    'Bathroom Wall Ceramic Tiles',                'm²',   n(bathroomWallArea),  R[22]?.rateAvg    || 0, marginPct),
    mkItem(28, 'Tile Work',    'Skirting Tiles',                             'RM',   n(skirtingLength),    R[23]?.rateAvg    || 0, marginPct),
    mkItem(29, 'Tile Work',    'Granite Countertop 20mm Polished',           'm²',   n(graniteArea),       R[24]?.rateAvg    || 0, marginPct),
    mkItem(30, 'Doors & Windows', 'Main Door',                              'Nos',  sumNos(mainDoors),    R[25]?.rateGFloor || 0, marginPct),
    mkItem(31, 'Doors & Windows', 'Room Door',                              'Nos',  sumNos(roomDoors),    R[26]?.rateAvg    || 0, marginPct),
    mkItem(32, 'Doors & Windows', 'Bathroom PVC Door',                      'Nos',  sumNos(pvcDoors),     R[27]?.rateGFloor || 0, marginPct),
    mkItem(33, 'Doors & Windows', 'Pooja Room Door',                        'Nos',  sumNos(poojaDoors),   R[28]?.rateGFloor || 0, marginPct),
    mkItem(34, 'Doors & Windows', 'UPVC Windows',                           'Sqft', qWindowArea,          R[29]?.rateAvg    || 0, marginPct),
    mkItem(35, 'Painting',     'Inner Wall Painting (2 coats acrylic)',      'm²',   qInnerPlaster,        R[30]?.rateAvg    || 0, marginPct),
    mkItem(36, 'Painting',     'Ceiling Painting (2 coats acrylic)',         'm²',   qCeiling,             R[31]?.rateAvg    || 0, marginPct),
    mkItem(37, 'Painting',     'Outer Wall Weatherproof Exterior Emulsion',  'm²',   qOuterPlaster,        R[32]?.rateAvg    || 0, marginPct),
    mkItem(38, 'Staircase',    'Staircase Brickwork',                       'm³',   stairData.brickVol,   R[33]?.rateAvg    || 0, marginPct),
    mkItem(39, 'Staircase',    'Granite Tread & Landing',                   'm²',   stairData.graniteArea,R[34]?.rateAvg    || 0, marginPct),
    mkItem(40, 'Staircase',    'SS Handrail',                               'RFT',  stairData.handrailLength, R[35]?.rateAvg || 0, marginPct),
    mkItem(41, 'Staircase',    'Staircase Concrete M20',                    'm³',   stairData.concreteVol,R[10]?.rateAvg    || 0, marginPct),
    mkItem(42, 'MEP',          'Electrical & Plumbing Works',               'Sqft', totalBuiltupSqft,     (n(R[36]?.rateAvg) + n(R[37]?.rateAvg)) || 0, marginPct),
    mkItem(43, 'MEP',          'Terrace Surkhi / Waterproofing',            'm²',   terraceArea,          R[38]?.rateAvg    || 0, marginPct),
  ];

  // Additional works (pass-through from addlWorks with custom rates)
  const additionalItems = (addlWorks || []).map((r, i) => ({
    sno: 100 + i,
    section: 'Additional Works',
    description: r.description,
    unit: r.unit || 'Nos',
    quantity: round2(n(r.quantity)),
    rate: round2(n(r.rate)),
    baseAmount: round2(n(r.quantity) * n(r.rate)),
    amount: round2(n(r.quantity) * n(r.rate) * mf),
    marginPct,
    isAdditional: true,
  }));

  // Pile foundation
  const pileItems = (pileRows || []).flatMap((r, i) => {
    const rateKey = r.dia === "1'" ? 'rateGFloor' : r.dia === "1'3\"" ? 'rate1st' : 'rate2nd';
    return [{
      sno: 200 + i,
      section: 'Pile Foundation',
      description: `Pile ${r.dia} dia – Nos: ${n(r.nos)}, Depth: ${n(r.depth)} ft`,
      unit: 'RFT',
      quantity: round2(n(r.nos) * n(r.depth)),
      rate: round2(n(r.rate)),
      baseAmount: round2(n(r.nos) * n(r.depth) * n(r.rate)),
      amount: round2(n(r.nos) * n(r.depth) * n(r.rate) * mf),
      marginPct,
      isPile: true,
    }];
  });

  // ── Section totals ──────────────────────────────────────────────────
  const foundationItems = items.slice(0, 13);
  const superItems = items.slice(13);

  const foundationTotal = round2(foundationItems.reduce((s, i) => s + i.amount, 0));
  const superTotal      = round2(superItems.reduce((s, i) => s + i.amount, 0));
  const addlTotal       = round2(additionalItems.reduce((s, i) => s + i.amount, 0));
  const pileTotal       = round2(pileItems.reduce((s, i) => s + i.amount, 0));
  const buildingEstimate = round2(foundationTotal + superTotal);
  const ratePerSqft = totalAreaSqft > 0 ? round2(buildingEstimate / totalAreaSqft) : 0;

  // ── Margin variants ─────────────────────────────────────────────────
  const marginVariants = {};
  for (const mp of [5, 8, 10, 12, 15]) {
    const f = 1 + mp / 100;
    const baseMf = 1 + marginPct / 100;
    // Recalculate by rebasing from base amounts
    const fTotal = round2([...items, ...additionalItems, ...pileItems].reduce(
      (s, item) => s + round2((item.baseAmount || 0) * f), 0
    ));
    marginVariants[mp] = {
      buildingEstimate: round2(
        [...foundationItems, ...superItems].reduce((s, i) => s + round2(i.baseAmount * f), 0)
      ),
      grandTotal: fTotal,
      ratePerSqft: totalAreaSqft > 0 ? round2(
        [...foundationItems, ...superItems].reduce((s, i) => s + round2(i.baseAmount * f), 0) / totalAreaSqft
      ) : 0,
    };
  }

  return {
    items: [...items, ...additionalItems, ...pileItems],
    foundationItems,
    superItems,
    additionalItems,
    pileItems,
    sectionTotals: {
      foundation: foundationTotal,
      superstructure: superTotal,
      additionalWorks: addlTotal,
      pileFoundation: pileTotal,
    },
    buildingEstimate,
    ratePerSqft,
    totalAreaSqft: round2(totalAreaSqft),
    totalAreaM2,
    marginPct,
    marginVariants,
  };
}

/**
 * Helper to make a line item.
 */
function mkItem(sno, section, description, unit, quantity, rate, marginPct) {
  const mf = 1 + marginPct / 100;
  const baseAmount = round2(quantity * rate);
  return {
    sno,
    section,
    description,
    unit,
    quantity: round2(quantity),
    rate: round2(rate),
    baseAmount,
    amount: round2(baseAmount * mf),
    marginPct,
  };
}

/**
 * Recompute a single item's amount when rate or margin changes.
 * Used for inline rate editing on the BOQ table.
 */
export function recomputeItem(item, newRate, newMarginPct) {
  const rate = newRate !== undefined ? Number(newRate) : item.rate;
  const mp   = newMarginPct !== undefined ? Number(newMarginPct) : item.marginPct;
  const base = round2(item.quantity * rate);
  return { ...item, rate: round2(rate), baseAmount: base, amount: round2(base * (1 + mp / 100)), marginPct: mp };
}
