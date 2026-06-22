/**
 * BOQ Calculation Engine
 * Pure functions — no DB, no React, no side effects.
 *
 * Entry point: computeBoq(inputs, rateMap, marginPct)
 * Returns: { items[], sectionTotals{}, buildingEstimate, grandTotal, ratePerSqft, marginVariants{} }
 *
 * inputs shape:
 * {
 *   floors:        [{ floorLabel, length, breadth, area }]   // area in sqft
 *   foundation:    [...rows]
 *   plinthBeam:    [...rows]
 *   basement:      { brickL, brickB, brickD, plasterL, plasterD }
 *   brickwork9:    [...rows per floor]
 *   brickwork4:    [...rows per floor]
 *   plastering:    { innerRows[], outerRows[], ceilingArea }
 *   sillLintel:    { sillLength, lintelLength, loftRows[], sunshadeRows[], counterSlabRows[], balconyRows[] }
 *   tileWork:      { flooringArea, bathroomFloorArea, parkingArea, kitchenWallArea, bathroomWallArea, skirtingLength, graniteArea }
 *   doorsWindows:  [...rows]
 *   slabConcrete:  [...rows per floor]
 *   staircase:     { width, tread, riser, noOfSteps, graniteArea, handrailLength, concreteL, concreteB, concreteD }
 *   others:        { totalBuiltupArea (auto), terraceArea }
 *   addlWorks:     [...rows]
 *   pileRows:      [...rows]
 *   premiumItems:  {
 *     compoundWallLength,   // RM
 *     elevationArea,        // m² (auto from outer plaster if blank)
 *     numBathrooms,         // for sanitaryware sets
 *     electricalPoints,     // Nos (auto from sqft if blank)
 *     numOHTanks,           // Nos
 *     borewellDepth,        // RFT
 *     kitchenPlatformRM,    // RM
 *     bbsSteelOverride,     // kg total — overrides empirical if > 0
 *     upvcWindowsSqft,      // manual UPVC sqft override
 *     contingencyPct,       // default 5
 *     prelimsPct,           // default 3
 *   }
 * }
 */

// ── helpers ────────────────────────────────────────────────────────────────
import { computeExcelBoq } from './excel-engine.js';
export const n = (v) => Number(v) || 0;
export const round2 = (v) => Math.round(v * 100) / 100;

function floorCount(floorConfig) {
  if (!floorConfig || floorConfig === 'G') return 1;
  const m = String(floorConfig).match(/G\+(\d)/);
  return m ? 1 + parseInt(m[1]) : 1;
}

// ── section calculators ────────────────────────────────────────────────────

export function calcEarthwork(foundation) {
  let vol = 0;
  for (const r of (foundation || [])) {
    vol += n(r.footingL) * n(r.footingB) * n(r.footingDepth) * n(r.nos);
  }
  return round2(vol);
}

export function calcPCC(foundation) {
  let vol = 0;
  for (const r of (foundation || [])) {
    vol += n(r.footingL) * n(r.footingB) * n(r.pccThickness) * n(r.nos);
  }
  return round2(vol);
}

export function calcFootingConcrete(foundation) {
  let vol = 0;
  for (const r of (foundation || [])) {
    vol += n(r.footingL) * n(r.footingB) * n(r.footingConcreteD) * n(r.nos);
  }
  return round2(vol);
}

export function calcColumnConcrete(foundation) {
  const perFloor = {};
  for (const r of (foundation || [])) {
    const floorKey = n(r.floorIdx);
    if (!perFloor[floorKey]) perFloor[floorKey] = 0;
    perFloor[floorKey] += n(r.colL) * n(r.colB) * n(r.colD) * n(r.nos);
  }
  return perFloor;
}

export function calcColumnConcreteTotal(foundation) {
  const pf = calcColumnConcrete(foundation);
  return round2(Object.values(pf).reduce((s, v) => s + v, 0));
}

export function calcPlinthBeam(plinthBeam) {
  let vol = 0;
  for (const r of (plinthBeam || [])) {
    vol += n(r.length) * n(r.breadth) * n(r.depth);
  }
  return round2(vol);
}

export function calcBackfilling(excavation, pccVol, footingConcreteVol) {
  return round2(Math.max(0, excavation - pccVol - footingConcreteVol));
}

export function calcBasementBrickwork(basement) {
  return round2(n(basement?.brickL) * n(basement?.brickB) * n(basement?.brickD));
}

export function calcBasementPlastering(basement) {
  return round2(n(basement?.plasterL) * n(basement?.plasterD) * 2);
}

export function calcMSandLayer(floors) {
  const totalAreaSqft = (floors || []).reduce((s, r) => s + n(r.area), 0);
  const areaM2 = totalAreaSqft * 0.0929;
  return round2(areaM2 * 0.1);
}

export function calcAntiTermite(floors) {
  const totalAreaSqft = (floors || []).reduce((s, r) => s + n(r.area), 0);
  return round2(totalAreaSqft * 0.0929);
}

export function calcFlooringPCC(floors) {
  const totalAreaSqft = (floors || []).reduce((s, r) => s + n(r.area), 0);
  return round2(totalAreaSqft * 0.0929);
}

export function calcBasementFilling(basement, floors) {
  if (basement?.netArea > 0 && basement?.plasterD > 0) {
    return round2(n(basement.netArea) * n(basement.plasterD));
  }
  const totalAreaSqft = (floors || []).reduce((s, r) => s + n(r.area), 0);
  const plinthAreaM2 = totalAreaSqft * 0.0929;
  const baseVol = n(basement?.brickL) * n(basement?.brickB) * n(basement?.brickD);
  return round2(Math.max(0, plinthAreaM2 * 0.6 - baseVol));
}

export function calcBrickwork9(brickwork9) {
  let area = 0;
  for (const r of (brickwork9 || [])) {
    let openArea = 0;
    for (const d of (r.doorOpens || [])) openArea += n(d.L) * n(d.H) * n(d.nos);
    for (const w of (r.windowOpens || [])) openArea += n(w.L) * n(w.H) * n(w.nos);
    area += Math.max(0, n(r.length) * n(r.height) - openArea);
  }
  return round2(area);
}

export function calcBrickwork4(brickwork4) {
  let area = 0;
  for (const r of (brickwork4 || [])) {
    let openArea = 0;
    for (const d of (r.doorOpens || [])) openArea += n(d.L) * n(d.H) * n(d.nos);
    area += Math.max(0, n(r.length) * n(r.height) - openArea);
  }
  return round2(area);
}

export function calcOuterPlastering(brickwork9) {
  let area = 0;
  for (const r of (brickwork9 || [])) {
    let openArea = 0;
    for (const d of (r.doorOpens || [])) openArea += n(d.L) * n(d.H) * n(d.nos);
    for (const w of (r.windowOpens || [])) openArea += n(w.L) * n(w.H) * n(w.nos);
    area += Math.max(0, n(r.length) * n(r.height) - openArea);
  }
  return round2(area);
}

export function calcInnerPlastering(plastering, brickwork9, brickwork4) {
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
  const q9 = calcBrickwork9(brickwork9);
  const q4 = calcBrickwork4(brickwork4);
  return round2((q9 + q4) * 1.2);
}

export function calcSillLintelMisc(sillLintel, brickwork9) {
  const { sillLength = 0, lintelLength = 0, loftRows = [], sunshadeRows = [], counterSlabRows = [], balconyRows = [] } = sillLintel || {};

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
    sillLength:   round2(n(sillLength)   || autoSill),
    lintelLength: round2(n(lintelLength) || autoLintel),
    loftVol:      round2(loftVol),
  };
}

export function calcSlabConcrete(slabConcrete) {
  const perFloor = [];
  for (const r of (slabConcrete || [])) {
    const beamVol = n(r.beamL) * n(r.beamB) * n(r.beamD);
    const slabVol = n(r.slabArea) * n(r.slabD);
    perFloor.push({ floorLabel: r.floorLabel, beamVol, slabVol, total: round2(beamVol + slabVol), slabArea: n(r.slabArea) });
  }
  return perFloor;
}

export function calcStaircase(staircase) {
  if (!staircase) return { brickVol: 0, graniteArea: 0, handrailLength: 0, concreteVol: 0 };
  const { width = 0, tread = 0, riser = 0, noOfSteps = 0, graniteArea = 0, handrailLength = 0, concreteL = 0, concreteB = 0, concreteD = 0 } = staircase;
  const brickVol    = round2((n(tread) * n(riser) / 2) * n(width) * n(noOfSteps));
  const concreteVol = round2(n(concreteL) * n(concreteB) * n(concreteD));
  return {
    brickVol,
    graniteArea:    round2(n(graniteArea)),
    handrailLength: round2(n(handrailLength)),
    concreteVol,
  };
}

export function calcWindowArea(brickwork9) {
  let area = 0;
  for (const r of (brickwork9 || [])) {
    for (const w of (r.windowOpens || [])) area += n(w.L) * n(w.H) * n(w.nos);
  }
  return round2(area * 10.764); // m² → sqft
}

// ── REINFORCEMENT STEEL ─────────────────────────────────────────────────────
// Calibrated ratios — validated against Kinathukadavu BBS (5,068 kg actual vs ~5,015 estimate)
// IS 456 residential construction, normal soil, G+1 typical:
const STEEL_RATIO = {
  footing:    70,   // kg/m³ footing concrete
  plinthBeam: 90,   // kg/m³ plinth beam concrete
  column:     110,  // kg/m³ column concrete
  slab:       85,   // kg/m³ slab+beam concrete
  wastage:    0.05, // 5% cutting & bending wastage
};

function calcSteel(qFootingConc, qPlinthBeamConc, qColumnConc, totalSlabVol) {
  const footingSteel = qFootingConc    * STEEL_RATIO.footing;
  const plinthSteel  = qPlinthBeamConc * STEEL_RATIO.plinthBeam;
  const columnSteel  = qColumnConc     * STEEL_RATIO.column;
  const slabSteel    = totalSlabVol    * STEEL_RATIO.slab;

  const rawFoundation = footingSteel + plinthSteel;
  const rawColumn     = columnSteel;
  const rawSlab       = slabSteel;
  const rawTotal      = rawFoundation + rawColumn + rawSlab;
  const bindingWire   = round2(rawTotal * 0.01);

  return {
    foundationSteel: round2(rawFoundation * (1 + STEEL_RATIO.wastage)),
    columnSteel:     round2(rawColumn     * (1 + STEEL_RATIO.wastage)),
    slabSteel:       round2(rawSlab       * (1 + STEEL_RATIO.wastage)),
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
    premiumItems = {},
  } = inputs;

  const {
    compoundWallLength = 0,
    elevationArea      = 0,  // m² — auto from outer plaster if 0
    numBathrooms       = 0,
    electricalPoints   = 0,  // Nos — auto (1 point per 12 sqft) if 0
    numOHTanks         = 0,
    borewellDepth      = 0,  // RFT
    kitchenPlatformRM  = 0,  // RM
    bbsSteelOverride   = 0,  // kg — overrides empirical when > 0
    upvcWindowsSqft    = 0,  // manual UPVC sqft override
    externalDevArea    = 0,  // m² of external development (driveway + paths)
    contingencyPct     = 5,
    prelimsPct         = 3,
    architectFeePct    = 3,  // % of pre-GST civil total
    gstPct             = 5,  // GST rate for residential construction
  } = premiumItems;

  const R  = rateMap;
  const mf = 1 + marginPct / 100;

  // ── Quantities ──────────────────────────────────────────────────────
  const rawData = computeExcelBoq(inputs, { mode: 'raw' });
  const q = rawData.quantities;

  const totalAreaSqft = q.totalAreaSqft;
  const totalAreaM2   = q.totalAreaM2;

  const cftToM3 = 35.3147;
  const sqftToM2 = 10.7639;
  const rftToRm = 3.2808;

  const qEarthExcav      = round2(q.qEarthExcav / cftToM3);
  const qPCC             = round2(q.qPCC / cftToM3);
  const qFootingConc     = round2(q.qFootingConc / cftToM3);
  const qColumnConc      = round2(q.qColumnConc / cftToM3);
  const qPlinthBeamVol   = round2(q.qPlinthBeamVol / cftToM3);
  const qPlinthBeamConc  = qPlinthBeamVol;
  const qBackfill        = round2(q.qBackfill / cftToM3);
  const qBasementBrick   = round2(q.qBasementBrick / cftToM3);
  const qBasementPlaster = round2(q.qBasementPlaster / sqftToM2);
  const qBasementFill    = round2(q.qBasementFill / cftToM3);
  const qMSand           = round2(q.qMSand / cftToM3);
  const qAntiTermite     = round2(q.qAntiTermite / sqftToM2);
  const qFlooringPCC     = round2(q.qFlooringPCC / sqftToM2);
  const qBrick9          = round2((q.qBrick9 / 0.75) / sqftToM2);
  const qBrick4          = round2(q.qBrick4 / sqftToM2);
  const qOuterPlaster    = round2(q.qOuterPlaster / sqftToM2);
  const qInnerPlaster    = round2(q.qInnerPlaster / sqftToM2);

  const qCeiling         = round2(q.qCeiling / sqftToM2);

  const { loftVol }  = calcSillLintelMisc(sillLintel, brickwork9);
  const slabData     = calcSlabConcrete(slabConcrete);
  const totalSlabVol = round2(slabData.reduce((s, r) => s + r.total, 0));
  const stairData    = {
    brickVol: round2(q.stairBrickVol / cftToM3),
    graniteArea: round2(q.stairGraniteArea / sqftToM2),
    handrailLength: round2(q.qSSHandrail / rftToRm),
    concreteVol: round2(q.stairConcreteVol / cftToM3)
  };

  // UPVC: take max of auto-derived (from brickwork openings) and manual override
  const qWindowAutoSqft = calcWindowArea(brickwork9);
  const qUPVC           = Math.max(qWindowAutoSqft, n(upvcWindowsSqft));

  // Steel — empirical or BBS override
  const steelEmpirical = calcSteel(qFootingConc, qPlinthBeamConc, qColumnConc, totalSlabVol);
  let steel = steelEmpirical;
  if (n(bbsSteelOverride) > 0) {
    const empiricalMainSteel = steelEmpirical.foundationSteel + steelEmpirical.columnSteel + steelEmpirical.slabSteel;
    const scale = empiricalMainSteel > 0 ? n(bbsSteelOverride) / empiricalMainSteel : 1;
    const bw = round2(steelEmpirical.bindingWire * scale);
    steel = {
      foundationSteel: round2(steelEmpirical.foundationSteel * scale),
      columnSteel:     round2(steelEmpirical.columnSteel * scale),
      slabSteel:       round2(steelEmpirical.slabSteel * scale),
      bindingWire:     bw,
      totalSteel:      round2(n(bbsSteelOverride) + bw),
      bssOverrideUsed: true,
    };
  }

  // Tile work
  const flooringArea = round2(q.flooringArea / sqftToM2);
  const bathroomFloorArea = round2(q.bathroomFloorArea / sqftToM2);
  const parkingArea = round2(q.parkingArea / sqftToM2);
  const kitchenWallArea = round2(q.kitchenWallArea / sqftToM2);
  const bathroomWallArea = round2(q.bathroomWallArea / sqftToM2);
  const skirtingLength = round2(q.skirtingLength / rftToRm);
  const graniteArea = round2(q.graniteArea / sqftToM2);

  // Bathroom waterproofing
  const qBathroomWaterproof = round2(bathroomFloorArea * 1.3);

  // MEP
  const totalBuiltupSqft = n(others.totalBuiltupArea || totalAreaSqft);
  const terraceAreaM2    = round2(q.qTerraceSurkhi / sqftToM2);

  // Sill/lintel volumes
  const sillVol   = round2((q.qSillLength / rftToRm) * 0.23 * 0.15);
  const lintelVol = round2((q.qLintelLength / rftToRm) * 0.23 * 0.20);

  // Doors & Windows
  const mainDoors  = (doorsWindows || []).filter(r => r.type === 'main_door');
  const roomDoors  = (doorsWindows || []).filter(r => r.type === 'room_door');
  const pvcDoors   = (doorsWindows || []).filter(r => r.type === 'pvc_door');
  const poojaDoors = (doorsWindows || []).filter(r => r.type === 'pooja_door');
  const sumNos     = (arr) => arr.reduce((s, r) => s + n(r.nos), 0);

  // ── PREMIUM quantities ────────────────────────────────────────────────
  // Elevation auto: use outer plaster area (m²) if not explicitly entered
  const qElevation = n(elevationArea) > 0 ? n(elevationArea) : qOuterPlaster;

  // Electrical fixtures: auto-estimate 1 point per 12 sqft of BUA if not entered
  const qElecPoints = n(electricalPoints) > 0 ? n(electricalPoints) : Math.round(totalBuiltupSqft / 12);

  // MS grilles: auto from window area in m²
  const qMSGrilles = round2(qUPVC / 10.764); // sqft → m²

  // Plan approval: based on total built-up sqft
  const qApprovals = totalBuiltupSqft;

  // ── Build line items ─────────────────────────────────────────────────
  const items = [
    // ── FOUNDATION SECTION ──
    mkItem(1,  'Earthwork',    'Earth Excavation for Foundations',                          'm³',   qEarthExcav,          R[1]?.rateGFloor  || 0,     marginPct, R[1]),
    mkItem(2,  'Earthwork',    'PCC M10 (1:4:8) below Footings',                           'm³',   qPCC,                 R[3]?.rateGFloor  || 0,     marginPct, R[3]),
    mkItem(3,  'Concrete',     'Footing Concrete M20',                                     'm³',   qFootingConc,         R[4]?.rateGFloor  || 0,     marginPct, R[4]),
    mkItem(4,  'Concrete',     'Column Concrete M20 (all floors avg)',                     'm³',   qColumnConc,          R[5]?.rateAvg     || 0,     marginPct, R[5]),
    mkItem(5,  'Concrete',     'Plinth Beam Excavation',                                   'm³',   qPlinthBeamVol,       R[1]?.rateGFloor  || 0,     marginPct, R[1]),
    mkItem(6,  'Earthwork',    'Back-filling',                                             'm³',   qBackfill,            R[2]?.rateGFloor  || 0,     marginPct, R[2]),
    mkItem(7,  'Concrete',     'Plinth Beam / RSB / SB Concrete M20',                     'm³',   qPlinthBeamConc,      R[6]?.rateGFloor  || 0,     marginPct, R[6]),
    mkItem(8,  'Brickwork',    'Basement Brickwork',                                       'm³',   qBasementBrick,       R[11]?.rateGFloor || 0,     marginPct, R[11]),
    mkItem(9,  'Plastering',   'Basement Plastering (both faces)',                         'm²',   qBasementPlaster,     R[14]?.rateGFloor || 0,     marginPct, R[14]),
    mkItem(10, 'Ground Prep',  'Basement Filling (moorum / earth)',                        'm³',   qBasementFill,        R[42]?.rateGFloor || 0,     marginPct, R[42]),
    mkItem(11, 'Ground Prep',  'M-Sand 4\" Layer below Floor Slab',                       'm³',   qMSand,               R[39]?.rateGFloor || 0,     marginPct, R[39]),
    mkItem(12, 'Ground Prep',  'Anti-Termite Pre-Construction Treatment',                  'm²',   qAntiTermite,         R[40]?.rateGFloor || 0,     marginPct, R[40]),
    mkItem(13, 'Ground Prep',  'Flooring PCC M7.5 below Tiles',                           'm²',   qFlooringPCC,         R[41]?.rateGFloor || 0,     marginPct, R[41]),

    // ── STEEL & REINFORCEMENT ──
    mkItem(44, 'Steel',        'Reinforcement Fe500D — Footings & Plinth Beam (incl 5% wastage)', 'kg', steel.foundationSteel, R[45]?.rateAvg || 78,   marginPct, R[45]),
    mkItem(45, 'Steel',        'Reinforcement Fe500D — Columns (incl 5% wastage)',                'kg', steel.columnSteel,     R[46]?.rateAvg || 86.5, marginPct, R[46]),
    mkItem(46, 'Steel',        'Reinforcement Fe500D — Roof Beams & Slabs (incl 5% wastage)',    'kg', steel.slabSteel,       R[47]?.rateAvg || 81,   marginPct, R[47]),
    mkItem(47, 'Steel',        'Binding Wire & Misc (1% of total steel)',                        'kg', steel.bindingWire,     R[48]?.rateAvg || 120,  marginPct, R[48]),

    // ── SUPERSTRUCTURE ──
    mkItem(14, 'Brickwork',    '9\" Flyash Brick Wall',                                    'm²',   qBrick9,              R[12]?.rateAvg    || 0,    marginPct, R[12]),
    mkItem(15, 'Brickwork',    '4.5\" Flyash Brick Partition Wall',                        'm²',   qBrick4,              R[13]?.rateAvg    || 0,    marginPct, R[13]),
    mkItem(16, 'Plastering',   'Outer Wall Plastering 20mm',                               'm²',   qOuterPlaster,        R[15]?.rateAvg    || 0,    marginPct, R[15]),
    mkItem(17, 'Plastering',   'Inner Wall Plastering 12mm (both faces)',                  'm²',   qInnerPlaster,        R[16]?.rateAvg    || 0,    marginPct, R[16]),
    mkItem(18, 'Plastering',   'Ceiling Plastering 6mm',                                   'm²',   qCeiling,             R[17]?.rateAvg    || 0,    marginPct, R[17]),
    mkItem(19, 'Concrete',     'Sill Beam Concrete M20',                                   'm³',   sillVol,              R[8]?.rateAvg     || 0,    marginPct, R[8]),
    mkItem(20, 'Concrete',     'Lintel Beam Concrete M20',                                 'm³',   lintelVol,            R[8]?.rateAvg     || 0,    marginPct, R[8]),
    mkItem(21, 'Concrete',     'Loft / Sunshade / Counter Slab / Balcony',                'm³',   loftVol,              R[9]?.rateAvg     || 0,    marginPct, R[9]),
    mkItem(22, 'Concrete',     'Roof Beam & Slab Concrete M20',                           'm³',   totalSlabVol,         R[7]?.rateAvg     || 0,    marginPct, R[7]),
    mkItem(23, 'Tile Work',    'Main Floor Vitrified Tiles',                               'm²',   n(flooringArea),      R[18]?.rateAvg    || 0,    marginPct, R[18]),
    mkItem(24, 'Tile Work',    'Bathroom Floor Ceramic Tiles',                             'm²',   n(bathroomFloorArea), R[19]?.rateAvg    || 0,    marginPct, R[19]),
    mkItem(25, 'Tile Work',    'Parking / Balcony Anti-Skid Tiles',                        'm²',   n(parkingArea),       R[20]?.rateAvg    || 0,    marginPct, R[20]),
    mkItem(26, 'Tile Work',    'Kitchen Wall Ceramic Tiles',                               'm²',   n(kitchenWallArea),   R[21]?.rateAvg    || 0,    marginPct, R[21]),
    mkItem(27, 'Tile Work',    'Bathroom Wall Ceramic Tiles',                              'm²',   n(bathroomWallArea),  R[22]?.rateAvg    || 0,    marginPct, R[22]),
    mkItem(28, 'Tile Work',    'Skirting Tiles',                                           'RM',   n(skirtingLength),    R[23]?.rateAvg    || 0,    marginPct, R[23]),
    mkItem(29, 'Tile Work',    'Granite Countertop 20mm Polished',                         'm²',   n(graniteArea),       R[24]?.rateAvg    || 0,    marginPct, R[24]),
    mkItem(30, 'Doors & Windows', 'Main Door',                                            'Nos',  sumNos(mainDoors),    R[25]?.rateGFloor || 0,    marginPct, R[25]),
    mkItem(31, 'Doors & Windows', 'Room Door',                                            'Nos',  sumNos(roomDoors),    R[26]?.rateAvg    || 0,    marginPct, R[26]),
    mkItem(32, 'Doors & Windows', 'Bathroom PVC Door',                                    'Nos',  sumNos(pvcDoors),     R[27]?.rateGFloor || 0,    marginPct, R[27]),
    mkItem(33, 'Doors & Windows', 'Pooja Room Door',                                      'Nos',  sumNos(poojaDoors),   R[28]?.rateGFloor || 0,    marginPct, R[28]),
    mkItem(34, 'Doors & Windows', 'UPVC Windows',                                         'Sqft', qUPVC,                R[29]?.rateAvg    || 0,    marginPct, R[29]),
    mkItem(35, 'Painting',     'Inner Wall Painting (primer + putty + 2 coats acrylic)', 'm²',   qInnerPlaster,        R[30]?.rateAvg    || 0,    marginPct, R[30]),
    mkItem(36, 'Painting',     'Ceiling Painting (primer + 2 coats acrylic)',            'm²',   qCeiling,             R[31]?.rateAvg    || 0,    marginPct, R[31]),
    mkItem(37, 'Painting',     'Outer Wall Weatherproof Exterior Emulsion',               'm²',   qOuterPlaster,        R[32]?.rateAvg    || 0,    marginPct, R[32]),
    mkItem(38, 'Staircase',    'Staircase Brickwork (risers)',                            'm³',   stairData.brickVol,   R[33]?.rateAvg    || 0,    marginPct, R[33]),
    mkItem(39, 'Staircase',    'Granite Tread & Landing',                                 'm²',   stairData.graniteArea,R[34]?.rateAvg    || 0,    marginPct, R[34]),
    mkItem(40, 'Staircase',    'SS Handrail',                                             'RFT',  stairData.handrailLength, R[35]?.rateAvg || 0,   marginPct, R[35]),
    mkItem(41, 'Staircase',    'Staircase Concrete M20',                                  'm³',   stairData.concreteVol,R[10]?.rateAvg    || 0,    marginPct, R[10]),
    mkItem(42, 'MEP',          'Electrical Works (wiring, DB, conduit, points)',          'Sqft', totalBuiltupSqft,     R[36]?.rateAvg    || 135,  marginPct, R[36]),
    mkItem(43, 'MEP',          'Plumbing Works (CPVC supply, PVC waste)',                 'Sqft', totalBuiltupSqft,     R[37]?.rateAvg    || 105,  marginPct, R[37]),
    mkItem(48, 'MEP',          'Terrace Surkhi / Waterproofing',                          'm²',   terraceAreaM2,        R[38]?.rateAvg    || 0,    marginPct, R[38]),
    mkItem(49, 'Waterproofing','Bathroom Waterproofing (crystalline coating)',             'm²',   qBathroomWaterproof,  R[49]?.rateAvg    || 250,  marginPct, R[49]),

    // ── PREMIUM & SITE WORKS ──
    mkItem(50, 'Site Works',   'Compound Wall (9\" brick + plaster + RCC coping)',        'RM',   n(compoundWallLength),R[50]?.rateAvg    || 1800, marginPct, R[50]),
    mkItem(51, 'Elevation',    'Elevation / Façade — texture + stone / ACP accent',       'm²',   qElevation,           R[51]?.rateAvg    || 540,  marginPct, R[51]),
    mkItem(52, 'Electrical',   'Electrical Fixtures — fans, lights, switches (supply+fix)','Nos', qElecPoints,          R[52]?.rateAvg    || 1100, marginPct, R[52]),
    mkItem(53, 'Plumbing',     'Sanitaryware Set — EWC + wash-basin + CP fittings',       'Set',  n(numBathrooms),      R[53]?.rateAvg    || 42000,marginPct, R[53]),
    mkItem(54, 'Site Works',   'Overhead Water Tank (PVC 1000 L installed)',               'Nos',  n(numOHTanks),        R[54]?.rateAvg    || 24000,marginPct, R[54]),
    mkItem(55, 'Site Works',   'Borewell + Submersible Pump + GI Casing',                 'RFT',  n(borewellDepth),     R[55]?.rateAvg    || 700,  marginPct, R[55]),
    mkItem(56, 'Site Works',   'Plan Approval / Building Permit & DTCP/CMDA Fees',        'Sqft', qApprovals,           R[56]?.rateAvg    || 38,   marginPct, R[56]),
    mkItem(57, 'Finishes',     'Kitchen Platform — granite + SS sink + accessories',      'RM',   n(kitchenPlatformRM), R[57]?.rateAvg    || 30000,marginPct, R[57]),
    mkItem(58, 'Finishes',     'MS Window Safety Grilles (fabricated + powder coated)',   'm²',   qMSGrilles,           R[58]?.rateAvg    || 1015, marginPct, R[58]),
    // External development — use entered area; auto-estimate 20% of ground floor footprint if blank
    mkItem(59, 'External Dev', 'External Development — driveway, path, compound floor',  'm²',   n(externalDevArea) > 0 ? n(externalDevArea) : round2(totalAreaM2 / floors.length * 0.2), R[59]?.rateAvg || 850, marginPct, R[59]),
  ];

  // Additional works (pass-through with custom rates)
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
  const pileItems = (pileRows || []).map((r, i) => ({
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
  }));

  // ── Section totals ──────────────────────────────────────────────────
  const foundationItems = items.filter(i => i.sno <= 13);
  const steelItems      = items.filter(i => i.sno >= 44 && i.sno <= 47);
  const superItems      = items.filter(i => (i.sno >= 14 && i.sno <= 43) || i.sno === 48 || i.sno === 49);
  const premiumLineItems= items.filter(i => i.sno >= 50 && i.sno <= 59);

  const foundationTotal = round2(foundationItems.reduce((s, i) => s + i.amount, 0));
  const steelTotal      = round2(steelItems.reduce((s, i) => s + i.amount, 0));
  const superTotal      = round2(superItems.reduce((s, i) => s + i.amount, 0));
  const premiumTotal    = round2(premiumLineItems.reduce((s, i) => s + i.amount, 0));
  const addlTotal       = round2(additionalItems.reduce((s, i) => s + i.amount, 0));
  const pileTotal       = round2(pileItems.reduce((s, i) => s + i.amount, 0));

  // Building estimate = civil + steel + finishes + premium (before provisionals)
  const buildingEstimate = round2(foundationTotal + steelTotal + superTotal + premiumTotal);

  // ── Provisionals — applied to base civil+premium total ──────────────
  const baseForPrelims  = round2(
    [...foundationItems, ...steelItems, ...superItems, ...premiumLineItems].reduce((s, i) => s + i.baseAmount, 0)
  );
  const qPrelims      = round2(baseForPrelims * n(prelimsPct)     / 100);
  const qContingency  = round2(baseForPrelims * n(contingencyPct) / 100);
  const qArchFees     = round2(baseForPrelims * n(architectFeePct) / 100);
  const prelimsItem     = mkProvItem(90, 'Provisionals', `Contractor Preliminaries (${n(prelimsPct)}% of base)`,          'LS', qPrelims,     mf);
  const contingencyItem = mkProvItem(91, 'Provisionals', `Contingency & Escalation (${n(contingencyPct)}% of base)`,      'LS', qContingency, mf);
  const archFeesItem    = mkProvItem(60, 'Soft Costs',   `Architect + Structural Engineer Fees (${n(architectFeePct)}%)`, 'LS', qArchFees,    mf);

  // GST: 5% on pre-tax subtotal (building estimate + all provisionals + addl works)
  const preTaxSubtotal  = round2(buildingEstimate + (qPrelims + qContingency + qArchFees) * mf + addlTotal + pileTotal);
  const qGST = round2(preTaxSubtotal * n(gstPct) / 100);
  const gstItem = {
    sno: 61, section: 'Taxes', description: `GST ${n(gstPct)}% on construction services`,
    unit: 'LS', quantity: 1, rate: round2(qGST), baseAmount: round2(qGST),
    amount: round2(qGST), marginPct: 0, isGST: true,
  };

  const provisionalItems = [prelimsItem, contingencyItem, archFeesItem, gstItem];
  const provTotal   = round2(provisionalItems.reduce((s, i) => s + i.amount, 0));

  const grandTotal  = round2(buildingEstimate + provTotal + addlTotal + pileTotal);
  const ratePerSqft = totalAreaSqft > 0 ? round2(grandTotal / totalAreaSqft) : 0;

  // ── Margin variants ─────────────────────────────────────────────────
  const allMainItems = [...foundationItems, ...steelItems, ...superItems, ...premiumLineItems];
  const marginVariants = {};
  for (const mp of [5, 8, 10, 12, 15]) {
    const f = 1 + mp / 100;
    const base = allMainItems.reduce((s, i) => s + round2(i.baseAmount * f), 0);
    const provBase = baseForPrelims; // unchanged
    const prov = round2(provBase * (n(prelimsPct) + n(contingencyPct)) / 100 * f);
    marginVariants[mp] = {
      buildingEstimate: round2(base),
      grandTotal:       round2(base + prov + addlTotal),
      ratePerSqft:      totalAreaSqft > 0 ? round2((base + prov) / totalAreaSqft) : 0,
    };
  }

  return {
    items: [...foundationItems, ...steelItems, ...superItems, ...premiumLineItems, ...provisionalItems, ...additionalItems, ...pileItems],
    foundationItems,
    steelItems,
    superItems,
    premiumLineItems,
    provisionalItems,
    additionalItems,
    pileItems,
    steel,
    sectionTotals: {
      foundation:      foundationTotal,
      steel:           steelTotal,
      superstructure:  superTotal,
      premium:         premiumTotal,
      provisionals:    round2(provisionalItems.filter(i => !i.isGST).reduce((s, i) => s + i.amount, 0)),
      gst:             round2(qGST),
      additionalWorks: addlTotal,
      pileFoundation:  pileTotal,
    },
    buildingEstimate,
    grandTotal,
    ratePerSqft,
    totalAreaSqft: round2(totalAreaSqft),
    totalAreaM2,
    marginPct,
    marginVariants,
  };
}

/**
 * Helper to make a standard line item.
 */
function mkItem(sno, section, description, unit, quantity, rate, marginPct, rateObj) {
  const mf = 1 + marginPct / 100;
  const baseAmount = round2(quantity * rate);
  return {
    sno,
    section,
    description,
    unit,
    quantity:    round2(quantity),
    rate:        round2(rate),
    baseAmount,
    amount:      round2(baseAmount * mf),
    marginPct,
    // Audit trail — populated when a rateObj from the rate map is passed
    srcRate:     rateObj?.srcRate  ?? null,
    srcUnit:     rateObj?.srcUnit  ?? null,
  };
}

/**
 * Helper to make a provisional item (amount is the gross amount already).
 */
function mkProvItem(sno, section, description, unit, grossAmount, mf) {
  return {
    sno,
    section,
    description,
    unit,
    quantity: 1,
    rate: round2(grossAmount),
    baseAmount: round2(grossAmount),
    amount: round2(grossAmount * mf),
    marginPct: 0,
    isProvisional: true,
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
