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
 *   floors:    [{ floorLabel, length, breadth, area }]          // per-floor L×B in metres; area in sqft
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
  if (!floorConfig || floorConfig === 'G') return 1;
  const m = String(floorConfig).match(/G\+(\d)/);
  return m ? 1 + parseInt(m[1]) : 1;
}

// ── section calculators ────────────────────────────────────────────────────

function calcEarthwork(foundation) {
  let vol = 0;
  for (const r of (foundation || [])) {
    vol += n(r.footingL) * n(r.footingB) * n(r.footingDepth) * n(r.nos);
  }
  return round2(vol);
}

function calcPCC(foundation) {
  let vol = 0;
  for (const r of (foundation || [])) {
    vol += n(r.footingL) * n(r.footingB) * n(r.pccThickness) * n(r.nos);
  }
  return round2(vol);
}

function calcFootingConcrete(foundation) {
  let vol = 0;
  for (const r of (foundation || [])) {
    vol += n(r.footingL) * n(r.footingB) * n(r.footingConcreteD) * n(r.nos);
  }
  return round2(vol);
}

function calcColumnConcrete(foundation) {
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
  let vol = 0;
  for (const r of (plinthBeam || [])) {
    vol += n(r.length) * n(r.breadth) * n(r.depth);
  }
  return round2(vol);
}

function calcBackfilling(excavation, pccVol, footingConcreteVol) {
  return round2(Math.max(0, excavation - pccVol - footingConcreteVol));
}

function calcBasementBrickwork(basement) {
  return round2(n(basement?.brickL) * n(basement?.brickB) * n(basement?.brickD));
}

function calcBasementPlastering(basement) {
  return round2(n(basement?.plasterL) * n(basement?.plasterD) * 2);
}

function calcMSandLayer(floors) {
  // area stored as sqft → convert to m² → × 0.1m depth
  const totalAreaSqft = (floors || []).reduce((s, r) => s + n(r.area), 0);
  const areaM2 = totalAreaSqft * 0.0929;
  return round2(areaM2 * 0.1);
}

function calcAntiTermite(floors) {
  const totalAreaSqft = (floors || []).reduce((s, r) => s + n(r.area), 0);
  return round2(totalAreaSqft * 0.0929);
}

function calcFlooringPCC(floors) {
  const totalAreaSqft = (floors || []).reduce((s, r) => s + n(r.area), 0);
  return round2(totalAreaSqft * 0.0929);
}

function calcBasementFilling(basement, floors) {
  const totalAreaSqft = (floors || []).reduce((s, r) => s + n(r.area), 0);
  const plinthAreaM2 = totalAreaSqft * 0.0929;
  const baseVol = n(basement?.brickL) * n(basement?.brickB) * n(basement?.brickD);
  return round2(Math.max(0, plinthAreaM2 * 0.6 - baseVol));
}

function calcBrickwork9(brickwork9) {
  let area = 0;
  for (const r of (brickwork9 || [])) {
    let openArea = 0;
    for (const d of (r.doorOpens || [])) openArea += n(d.L) * n(d.H) * n(d.nos);
    for (const w of (r.windowOpens || [])) openArea += n(w.L) * n(w.H) * n(w.nos);
    area += Math.max(0, n(r.length) * n(r.height) - openArea);
  }
  return round2(area);
}

function calcBrickwork4(brickwork4) {
  let area = 0;
  for (const r of (brickwork4 || [])) {
    let openArea = 0;
    for (const d of (r.doorOpens || [])) openArea += n(d.L) * n(d.H) * n(d.nos);
    area += Math.max(0, n(r.length) * n(r.height) - openArea);
  }
  return round2(area);
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

function calcInnerPlastering(plastering, brickwork9, brickwork4) {
  // If explicit inner rows provided use them; otherwise auto-derive from both wall types
  if (plastering?.innerRows && plastering.innerRows.length > 0) {
    let area = 0;
    for (const r of plastering.innerRows) {
      let openArea = 0;
      for (const d of (r.doorOpens || [])) openArea += n(d.L) * n(d.H) * n(d.nos);
      for (const w of (r.windowOpens || [])) openArea += n(w.L) * n(w.H) * n(w.nos);
      area += Math.max(0, n(r.length) * n(r.height) - openArea);
    }
    return round2(area);
  }
  // Auto-derive: both faces of 9" walls + both faces of 4.5" partition walls
  // minus openings (already deducted in calcBrickwork9/4, so we replicate the same calc)
  const q9 = calcBrickwork9(brickwork9);   // m² net 9" wall area (one face)
  const q4 = calcBrickwork4(brickwork4);   // m² net 4.5" wall area
  // Inner face ≈ outer face (same length/height, small thickness difference ignored)
  // Add 20% for internal wall surface area not captured (bathroom, internal room walls sharing dimensions)
  return round2((q9 + q4) * 1.2);
}

function calcSillLintelMisc(sillLintel, brickwork9) {
  const { sillLength = 0, lintelLength = 0, loftRows = [], sunshadeRows = [], counterSlabRows = [], balconyRows = [] } = sillLintel || {};

  // Auto-derive sill/lintel from window openings in brickwork9 if not provided
  let autoSill = 0, autoLintel = 0;
  for (const r of (brickwork9 || [])) {
    for (const w of (r.windowOpens || [])) autoSill += n(w.L) * n(w.nos);
    for (const d of (r.doorOpens || [])) autoLintel += n(d.L) * n(d.nos);
    for (const w of (r.windowOpens || [])) autoLintel += n(w.L) * n(w.nos);
  }

  let loftVol = 0;
  for (const r of loftRows) loftVol += n(r.L) * n(r.B) * n(r.D || 0.1);
  for (const r of sunshadeRows) loftVol += n(r.L) * n(r.B) * n(r.D || 0.08);
  for (const r of counterSlabRows) loftVol += n(r.L) * n(r.B) * n(r.D || 0.1);
  for (const r of balconyRows) loftVol += n(r.L) * n(r.B) * n(r.D || 0.12);

  return {
    sillLength:  round2(n(sillLength)  || autoSill),
    lintelLength: round2(n(lintelLength) || autoLintel),
    loftVol: round2(loftVol),
  };
}

function calcSlabConcrete(slabConcrete) {
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
  // All inputs are in metres — volume in m³ directly (no ft³→m³ conversion needed)
  const brickVol = round2((n(tread) * n(riser) / 2) * n(width) * n(noOfSteps));
  const concreteVol = round2(n(concreteL) * n(concreteB) * n(concreteD));
  return {
    brickVol,
    graniteArea: round2(n(graniteArea)),
    handrailLength: round2(n(handrailLength)),
    concreteVol,
  };
}

function calcWindowArea(brickwork9) {
  // Returns total window area in sqft (for UPVC rate which is per sqft)
  let area = 0;
  for (const r of (brickwork9 || [])) {
    for (const w of (r.windowOpens || [])) area += n(w.L) * n(w.H) * n(w.nos);
  }
  return round2(area * 10.764); // m² → sqft
}

// ── REINFORCEMENT STEEL ─────────────────────────────────────────────────────
// Steel quantity estimation based on concrete volumes using empirical kg/m³ ratios
// Ratios per IS 456 typical residential construction:
//   Footings:      80 kg/m³
//   Plinth beams: 100 kg/m³
//   Columns:      120 kg/m³ (higher reinforcement ratio)
//   Slabs+beams:  100 kg/m³
// Add 5% for cutting wastage and binding wire
const STEEL_RATIO = {
  footing: 80,        // kg per m³ of footing concrete
  plinthBeam: 100,    // kg per m³
  column: 120,        // kg per m³
  slab: 100,          // kg per m³
  wastage: 0.05,      // 5%
};

function calcSteel(qFootingConc, qPlinthBeamConc, qColumnConc, totalSlabVol) {
  const footingSteel    = qFootingConc   * STEEL_RATIO.footing;
  const plinthSteel     = qPlinthBeamConc * STEEL_RATIO.plinthBeam;
  const columnSteel     = qColumnConc    * STEEL_RATIO.column;
  const slabSteel       = totalSlabVol   * STEEL_RATIO.slab;

  const rawFoundationSteel = footingSteel + plinthSteel;
  const rawColumnSteel     = columnSteel;
  const rawSlabSteel       = slabSteel;
  const rawTotal           = rawFoundationSteel + rawColumnSteel + rawSlabSteel;
  const bindingWire        = round2(rawTotal * 0.01); // 1% binding wire

  return {
    foundationSteel: round2(rawFoundationSteel * (1 + STEEL_RATIO.wastage)),
    columnSteel:     round2(rawColumnSteel     * (1 + STEEL_RATIO.wastage)),
    slabSteel:       round2(rawSlabSteel       * (1 + STEEL_RATIO.wastage)),
    bindingWire,
    totalSteel:      round2(rawTotal * (1 + STEEL_RATIO.wastage) + bindingWire),
  };
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
  const mf = 1 + marginPct / 100;

  // ── Quantities ──────────────────────────────────────────────────────
  const totalAreaSqft = floors.reduce((s, r) => s + n(r.area), 0);
  const totalAreaM2   = round2(totalAreaSqft * 0.0929);

  const qEarthExcav      = calcEarthwork(foundation);
  const qPCC             = calcPCC(foundation);
  const qFootingConc     = calcFootingConcrete(foundation);
  const qColumnConc      = calcColumnConcreteTotal(foundation);
  const qPlinthBeamVol   = calcPlinthBeam(plinthBeam);
  const qPlinthBeamConc  = qPlinthBeamVol;
  const qBackfill        = calcBackfilling(qEarthExcav, qPCC, qFootingConc);
  const qBasementBrick   = calcBasementBrickwork(basement);
  const qBasementPlaster = calcBasementPlastering(basement);
  const qBasementFill    = calcBasementFilling(basement, floors);
  const qMSand           = calcMSandLayer(floors);
  const qAntiTermite     = calcAntiTermite(floors);
  const qFlooringPCC     = calcFlooringPCC(floors);
  const qBrick9          = calcBrickwork9(brickwork9);
  const qBrick4          = calcBrickwork4(brickwork4);
  const qOuterPlaster    = calcOuterPlastering(brickwork9);
  const qInnerPlaster    = calcInnerPlastering(plastering, brickwork9, brickwork4);

  // Ceiling area: use explicit input if provided, otherwise auto-derive from floor area
  const qCeiling = n(plastering?.ceilingArea) > 0
    ? round2(n(plastering.ceilingArea))
    : totalAreaM2; // floor m² ≈ ceiling m²

  const { sillLength, lintelLength, loftVol } = calcSillLintelMisc(sillLintel, brickwork9);
  const slabData      = calcSlabConcrete(slabConcrete);
  const totalSlabVol  = round2(slabData.reduce((s, r) => s + r.total, 0));
  const stairData     = calcStaircase(staircase);
  const qWindowArea   = calcWindowArea(brickwork9);

  // Steel
  const steel = calcSteel(qFootingConc, qPlinthBeamConc, qColumnConc, totalSlabVol);

  // Tile Work
  const { flooringArea = 0, bathroomFloorArea = 0, parkingArea = 0, kitchenWallArea = 0, bathroomWallArea = 0, skirtingLength = 0, graniteArea = 0 } = tileWork;

  // Bathroom waterproofing: floor area + 300mm skirting (approx 30% more)
  const qBathroomWaterproof = round2(n(bathroomFloorArea) * 1.3);

  // MEP
  const totalBuiltupSqft = n(others.totalBuiltupArea || totalAreaSqft);
  const terraceAreaM2 = round2(n(others.terraceArea) * 0.0929); // sqft → m²

  // Doors & Windows
  const mainDoors  = (doorsWindows || []).filter(r => r.type === 'main_door');
  const roomDoors  = (doorsWindows || []).filter(r => r.type === 'room_door');
  const pvcDoors   = (doorsWindows || []).filter(r => r.type === 'pvc_door');
  const poojaDoors = (doorsWindows || []).filter(r => r.type === 'pooja_door');
  const sumNos     = (arr) => arr.reduce((s, r) => s + n(r.nos), 0);

  // Sill/lintel concrete volumes (cross-section 0.23×0.15m beam per RM)
  const sillVol   = round2(sillLength   * 0.23 * 0.15);
  const lintelVol = round2(lintelLength * 0.23 * 0.20);

  // ── Build line items ─────────────────────────────────────────────────
  const items = [
    // ── FOUNDATION SECTION (items 1–13) ──
    mkItem(1,  'Earthwork',    'Earth Excavation for Foundations',             'm³',   qEarthExcav,          R[1]?.rateGFloor  || 0, marginPct),
    mkItem(2,  'Earthwork',    'PCC M10 (1:4:8) below Footings',              'm³',   qPCC,                 R[3]?.rateGFloor  || 0, marginPct),
    mkItem(3,  'Concrete',     'Footing Concrete M20',                         'm³',   qFootingConc,         R[4]?.rateGFloor  || 0, marginPct),
    mkItem(4,  'Concrete',     'Column Concrete M20 (all floors avg)',          'm³',   qColumnConc,          R[5]?.rateAvg     || 0, marginPct),
    mkItem(5,  'Concrete',     'Plinth Beam Excavation',                       'm³',   qPlinthBeamVol,       R[1]?.rateGFloor  || 0, marginPct),
    mkItem(6,  'Earthwork',    'Back-filling',                                 'm³',   qBackfill,            R[2]?.rateGFloor  || 0, marginPct),
    mkItem(7,  'Concrete',     'Plinth Beam / RSB / SB Concrete M20',          'm³',   qPlinthBeamConc,      R[6]?.rateGFloor  || 0, marginPct),
    mkItem(8,  'Brickwork',    'Basement Brickwork',                           'm³',   qBasementBrick,       R[11]?.rateGFloor || 0, marginPct),
    mkItem(9,  'Plastering',   'Basement Plastering (both faces)',              'm²',   qBasementPlaster,     R[14]?.rateGFloor || 0, marginPct),
    mkItem(10, 'Ground Prep',  'Basement Filling (moorum / earth)',             'm³',   qBasementFill,        R[42]?.rateGFloor || 0, marginPct),
    mkItem(11, 'Ground Prep',  'M-Sand 4\" Layer below Floor Slab',            'm³',   qMSand,               R[39]?.rateGFloor || 0, marginPct),
    mkItem(12, 'Ground Prep',  'Anti-Termite Pre-Construction Treatment',      'm²',   qAntiTermite,         R[40]?.rateGFloor || 0, marginPct),
    mkItem(13, 'Ground Prep',  'Flooring PCC M7.5 below Tiles',               'm²',   qFlooringPCC,         R[41]?.rateGFloor || 0, marginPct),

    // ── STEEL & REINFORCEMENT ──
    mkItem(44, 'Steel',        'Reinforcement Fe500D — Footings & Plinth Beam (incl 5% wastage)', 'kg', steel.foundationSteel, R[45]?.rateAvg || 78, marginPct),
    mkItem(45, 'Steel',        'Reinforcement Fe500D — Columns (incl 5% wastage)',                'kg', steel.columnSteel,     R[46]?.rateAvg || 86.5, marginPct),
    mkItem(46, 'Steel',        'Reinforcement Fe500D — Roof Beams & Slabs (incl 5% wastage)',    'kg', steel.slabSteel,       R[47]?.rateAvg || 81, marginPct),
    mkItem(47, 'Steel',        'Binding Wire & Misc (1% of total steel)',                         'kg', steel.bindingWire,     R[48]?.rateAvg || 120, marginPct),

    // ── SUPERSTRUCTURE SECTION (items 14–43) ──
    mkItem(14, 'Brickwork',    '9\" Flyash Brick Wall',                        'm²',   qBrick9,              R[12]?.rateAvg    || 0, marginPct),
    mkItem(15, 'Brickwork',    '4.5\" Flyash Brick Partition Wall',            'm²',   qBrick4,              R[13]?.rateAvg    || 0, marginPct),
    mkItem(16, 'Plastering',   'Outer Wall Plastering 20mm',                   'm²',   qOuterPlaster,        R[15]?.rateAvg    || 0, marginPct),
    mkItem(17, 'Plastering',   'Inner Wall Plastering 12mm (both faces)',       'm²',   qInnerPlaster,        R[16]?.rateAvg    || 0, marginPct),
    mkItem(18, 'Plastering',   'Ceiling Plastering 6mm',                       'm²',   qCeiling,             R[17]?.rateAvg    || 0, marginPct),
    mkItem(19, 'Concrete',     'Sill Beam Concrete M20',                       'm³',   sillVol,              R[8]?.rateAvg     || 0, marginPct),
    mkItem(20, 'Concrete',     'Lintel Beam Concrete M20',                     'm³',   lintelVol,            R[8]?.rateAvg     || 0, marginPct),
    mkItem(21, 'Concrete',     'Loft / Sunshade / Counter Slab / Balcony',     'm³',   loftVol,              R[9]?.rateAvg     || 0, marginPct),
    mkItem(22, 'Concrete',     'Roof Beam & Slab Concrete M20',                'm³',   totalSlabVol,         R[7]?.rateAvg     || 0, marginPct),
    mkItem(23, 'Tile Work',    'Main Floor Vitrified Tiles',                   'm²',   n(flooringArea),      R[18]?.rateAvg    || 0, marginPct),
    mkItem(24, 'Tile Work',    'Bathroom Floor Ceramic Tiles',                 'm²',   n(bathroomFloorArea), R[19]?.rateAvg    || 0, marginPct),
    mkItem(25, 'Tile Work',    'Parking / Balcony Anti-Skid Tiles',            'm²',   n(parkingArea),       R[20]?.rateAvg    || 0, marginPct),
    mkItem(26, 'Tile Work',    'Kitchen Wall Ceramic Tiles',                   'm²',   n(kitchenWallArea),   R[21]?.rateAvg    || 0, marginPct),
    mkItem(27, 'Tile Work',    'Bathroom Wall Ceramic Tiles',                  'm²',   n(bathroomWallArea),  R[22]?.rateAvg    || 0, marginPct),
    mkItem(28, 'Tile Work',    'Skirting Tiles',                               'RM',   n(skirtingLength),    R[23]?.rateAvg    || 0, marginPct),
    mkItem(29, 'Tile Work',    'Granite Countertop 20mm Polished',             'm²',   n(graniteArea),       R[24]?.rateAvg    || 0, marginPct),
    mkItem(30, 'Doors & Windows', 'Main Door',                                 'Nos',  sumNos(mainDoors),    R[25]?.rateGFloor || 0, marginPct),
    mkItem(31, 'Doors & Windows', 'Room Door',                                 'Nos',  sumNos(roomDoors),    R[26]?.rateAvg    || 0, marginPct),
    mkItem(32, 'Doors & Windows', 'Bathroom PVC Door',                         'Nos',  sumNos(pvcDoors),     R[27]?.rateGFloor || 0, marginPct),
    mkItem(33, 'Doors & Windows', 'Pooja Room Door',                           'Nos',  sumNos(poojaDoors),   R[28]?.rateGFloor || 0, marginPct),
    mkItem(34, 'Doors & Windows', 'UPVC Windows',                              'Sqft', qWindowArea,          R[29]?.rateAvg    || 0, marginPct),
    mkItem(35, 'Painting',     'Inner Wall Painting (2 coats acrylic)',         'm²',   qInnerPlaster,        R[30]?.rateAvg    || 0, marginPct),
    mkItem(36, 'Painting',     'Ceiling Painting (2 coats acrylic)',            'm²',   qCeiling,             R[31]?.rateAvg    || 0, marginPct),
    mkItem(37, 'Painting',     'Outer Wall Weatherproof Exterior Emulsion',     'm²',   qOuterPlaster,        R[32]?.rateAvg    || 0, marginPct),
    mkItem(38, 'Staircase',    'Staircase Brickwork (risers)',                  'm³',   stairData.brickVol,   R[33]?.rateAvg    || 0, marginPct),
    mkItem(39, 'Staircase',    'Granite Tread & Landing',                      'm²',   stairData.graniteArea,R[34]?.rateAvg    || 0, marginPct),
    mkItem(40, 'Staircase',    'SS Handrail',                                  'RFT',  stairData.handrailLength, R[35]?.rateAvg || 0, marginPct),
    mkItem(41, 'Staircase',    'Staircase Concrete M20',                       'm³',   stairData.concreteVol,R[10]?.rateAvg    || 0, marginPct),
    // MEP — split into Electrical and Plumbing
    mkItem(42, 'MEP',          'Electrical Works (wiring, DB, points)',         'Sqft', totalBuiltupSqft,     R[36]?.rateAvg    || 135, marginPct),
    mkItem(43, 'MEP',          'Plumbing Works (CPVC supply, PVC waste)',       'Sqft', totalBuiltupSqft,     R[37]?.rateAvg    || 105, marginPct),
    mkItem(48, 'MEP',          'Terrace Surkhi / Waterproofing',                'm²',   terraceAreaM2,        R[38]?.rateAvg    || 0, marginPct),
    mkItem(49, 'Waterproofing','Bathroom Waterproofing (crystalline coating)',   'm²',   qBathroomWaterproof,  R[49]?.rateAvg    || 250, marginPct),
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
  const pileItems = (pileRows || []).flatMap((r, i) => [{
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
  }]);

  // ── Section totals ──────────────────────────────────────────────────
  const foundationItems = items.filter(i => i.sno <= 13);
  const steelItems      = items.filter(i => i.sno >= 44 && i.sno <= 47);
  const superItems      = items.filter(i => i.sno >= 14 && i.sno <= 43 || i.sno === 48 || i.sno === 49);

  const foundationTotal = round2(foundationItems.reduce((s, i) => s + i.amount, 0));
  const steelTotal      = round2(steelItems.reduce((s, i) => s + i.amount, 0));
  const superTotal      = round2(superItems.reduce((s, i) => s + i.amount, 0));
  const addlTotal       = round2(additionalItems.reduce((s, i) => s + i.amount, 0));
  const pileTotal       = round2(pileItems.reduce((s, i) => s + i.amount, 0));
  const buildingEstimate = round2(foundationTotal + steelTotal + superTotal);
  const ratePerSqft = totalAreaSqft > 0 ? round2(buildingEstimate / totalAreaSqft) : 0;

  // ── Margin variants ─────────────────────────────────────────────────
  const allMainItems = [...foundationItems, ...steelItems, ...superItems];
  const marginVariants = {};
  for (const mp of [5, 8, 10, 12, 15]) {
    const f = 1 + mp / 100;
    marginVariants[mp] = {
      buildingEstimate: round2(allMainItems.reduce((s, i) => s + round2(i.baseAmount * f), 0)),
      grandTotal: round2([...allMainItems, ...additionalItems, ...pileItems].reduce((s, i) => s + round2((i.baseAmount || 0) * f), 0)),
      ratePerSqft: totalAreaSqft > 0
        ? round2(allMainItems.reduce((s, i) => s + round2(i.baseAmount * f), 0) / totalAreaSqft)
        : 0,
    };
  }

  return {
    items: [...foundationItems, ...steelItems, ...superItems, ...additionalItems, ...pileItems],
    foundationItems,
    steelItems,
    superItems,
    additionalItems,
    pileItems,
    steel,  // expose steel breakdown for display
    sectionTotals: {
      foundation: foundationTotal,
      steel: steelTotal,
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
 */
export function recomputeItem(item, newRate, newMarginPct) {
  const rate = newRate !== undefined ? Number(newRate) : item.rate;
  const mp   = newMarginPct !== undefined ? Number(newMarginPct) : item.marginPct;
  const base = round2(item.quantity * rate);
  return { ...item, rate: round2(rate), baseAmount: base, amount: round2(base * (1 + mp / 100)), marginPct: mp };
}
