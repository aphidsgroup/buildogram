/**
 * BOQ Rate Master — COCENA Issue 35, Dec 2025 approximation
 * Keyed by sno (1–44). These are the default seed values.
 * Admins can update via /ops/boq-calculator/rates at any time.
 * Per-project overrides are stored in boq_project_rate.
 *
 * Units: m³=cubic metre, m²=sq metre, Nos=numbers, RFT=running foot
 *        RM=running metre, Sqft=square feet, Bags=cement bags, MT=metric tonne
 */

export const DEFAULT_RATES = [
  // ── EARTHWORK ──────────────────────────────────────────────────────────
  { sno: 1,  category: 'Earthwork',     description: 'Earth excavation for foundations (incl. loading & disposal)', unit: 'm³',   rateGFloor: 350,   rate1st: 350,   rate2nd: 350,   rate3rd: 350,   rateAvg: 350 },
  { sno: 2,  category: 'Earthwork',     description: 'Back-filling with excavated earth (compacted in layers)',      unit: 'm³',   rateGFloor: 180,   rate1st: 180,   rate2nd: 180,   rate3rd: 180,   rateAvg: 180 },

  // ── CONCRETE (concrete + formwork only; reinforcement steel priced separately as SNO 45-48) ──
  { sno: 3,  category: 'Concrete',      description: 'PCC M10 (1:4:8) plain concrete below footings',                                   unit: 'm³',   rateGFloor: 4800,  rate1st: 4800,  rate2nd: 4800,  rate3rd: 4800,  rateAvg: 4800 },
  { sno: 4,  category: 'Concrete',      description: 'Isolated / Combined footing concrete M20 incl. formwork (no steel — see SNO 45)', unit: 'm³',   rateGFloor: 6800,  rate1st: 6800,  rate2nd: 6800,  rate3rd: 6800,  rateAvg: 6800 },
  { sno: 5,  category: 'Concrete',      description: 'Column concrete M20 incl. formwork only (steel in SNO 45-48)',                    unit: 'm³',   rateGFloor: 8500,  rate1st: 9500,  rate2nd: 10500, rate3rd: 11500, rateAvg: 10000 },
  { sno: 6,  category: 'Concrete',      description: 'Plinth beam / RSB / SB concrete M20 incl. formwork (no steel)',                   unit: 'm³',   rateGFloor: 8500,  rate1st: 8500,  rate2nd: 8500,  rate3rd: 8500,  rateAvg: 8500 },
  { sno: 7,  category: 'Concrete',      description: 'Roof beam & slab M20 incl. formwork only (steel in SNO 47)',                      unit: 'm³',   rateGFloor: 7800,  rate1st: 8800,  rate2nd: 9800,  rate3rd: 10800, rateAvg: 9300 },
  { sno: 8,  category: 'Concrete',      description: 'Sill beam / Lintel beam concrete M20 incl. formwork',                             unit: 'm³',   rateGFloor: 7500,  rate1st: 8300,  rate2nd: 9100,  rate3rd: 9900,  rateAvg: 8700 },
  { sno: 9,  category: 'Concrete',      description: 'Loft / Sunshade / Counter slab / Balcony downslab M20 incl. formwork',            unit: 'm³',   rateGFloor: 8500,  rate1st: 9800,  rate2nd: 11100, rate3rd: 12400, rateAvg: 10450 },
  { sno: 10, category: 'Concrete',      description: 'Staircase concrete M20 incl. formwork',                                           unit: 'm³',   rateGFloor: 9500,  rate1st: 10800, rate2nd: 12100, rate3rd: 13400, rateAvg: 11450 },

  // ── BRICKWORK ─────────────────────────────────────────────────────────
  { sno: 11, category: 'Brickwork',     description: 'Basement brickwork in CM 1:5 (below plinth)',                 unit: 'm³',   rateGFloor: 5200,  rate1st: 5200,  rate2nd: 5200,  rate3rd: 5200,  rateAvg: 5200 },
  { sno: 12, category: 'Brickwork',     description: '9" Flyash brick wall in CM 1:5',                              unit: 'm²',   rateGFloor: 480,   rate1st: 520,   rate2nd: 560,   rate3rd: 600,   rateAvg: 540 },
  { sno: 13, category: 'Brickwork',     description: '4.5" Flyash brick partition wall in CM 1:5',                  unit: 'm²',   rateGFloor: 300,   rate1st: 330,   rate2nd: 360,   rate3rd: 390,   rateAvg: 345 },

  // ── PLASTERING ────────────────────────────────────────────────────────
  { sno: 14, category: 'Plastering',    description: 'Basement plastering CM 1:4 (both faces)',                     unit: 'm²',   rateGFloor: 80,    rate1st: 80,    rate2nd: 80,    rate3rd: 80,    rateAvg: 80 },
  { sno: 15, category: 'Plastering',    description: 'Outer wall plastering 20mm CM 1:4 + weatherproof finish',     unit: 'm²',   rateGFloor: 110,   rate1st: 125,   rate2nd: 140,   rate3rd: 155,   rateAvg: 132.5 },
  { sno: 16, category: 'Plastering',    description: 'Inner wall plastering 12mm CM 1:5 + POP punning',             unit: 'm²',   rateGFloor: 95,    rate1st: 108,   rate2nd: 121,   rate3rd: 134,   rateAvg: 114.5 },
  { sno: 17, category: 'Plastering',    description: 'Ceiling plastering 6mm CM 1:3 + POP punning',                 unit: 'm²',   rateGFloor: 120,   rate1st: 138,   rate2nd: 156,   rate3rd: 174,   rateAvg: 147 },

  // ── FLOORING & TILES ─────────────────────────────────────────────────
  { sno: 18, category: 'Tile Work',     description: 'Main floor vitrified tiles (600×600mm, ₹60–80/sqft supply)',  unit: 'm²',   rateGFloor: 320,   rate1st: 360,   rate2nd: 400,   rate3rd: 440,   rateAvg: 380 },
  { sno: 19, category: 'Tile Work',     description: 'Bathroom floor ceramic tiles (300×300mm)',                    unit: 'm²',   rateGFloor: 280,   rate1st: 310,   rate2nd: 340,   rate3rd: 370,   rateAvg: 325 },
  { sno: 20, category: 'Tile Work',     description: 'Parking / balcony anti-skid tiles',                          unit: 'm²',   rateGFloor: 260,   rate1st: 290,   rate2nd: 320,   rate3rd: 350,   rateAvg: 305 },
  { sno: 21, category: 'Tile Work',     description: 'Kitchen wall ceramic tiles (300×450mm, up to 2.1m ht)',       unit: 'm²',   rateGFloor: 310,   rate1st: 345,   rate2nd: 380,   rate3rd: 415,   rateAvg: 362.5 },
  { sno: 22, category: 'Tile Work',     description: 'Bathroom wall ceramic tiles (300×450mm, full ht)',            unit: 'm²',   rateGFloor: 310,   rate1st: 345,   rate2nd: 380,   rate3rd: 415,   rateAvg: 362.5 },
  { sno: 23, category: 'Tile Work',     description: 'Skirting tiles (100mm ht, matching floor tile)',              unit: 'RM',   rateGFloor: 55,    rate1st: 62,    rate2nd: 69,    rate3rd: 76,    rateAvg: 65.5 },
  { sno: 24, category: 'Tile Work',     description: 'Granite countertop 20mm polished (kitchen / bathrooms)',      unit: 'm²',   rateGFloor: 950,   rate1st: 1050,  rate2nd: 1150,  rate3rd: 1250,  rateAvg: 1100 },

  // ── STRUCTURAL MEMBERS ────────────────────────────────────────────────
  // (already covered by sno 8 & 9 in concrete section, repeated here for reference clarity)

  // ── DOORS & WINDOWS ──────────────────────────────────────────────────
  { sno: 25, category: 'Doors & Windows', description: 'Main door — teak wood frame + flush/panel shutter',        unit: 'Nos',  rateGFloor: 35000, rate1st: 35000, rate2nd: 35000, rate3rd: 35000, rateAvg: 35000 },
  { sno: 26, category: 'Doors & Windows', description: 'Room door — hardwood frame + flush shutter',               unit: 'Nos',  rateGFloor: 12000, rate1st: 12500, rate2nd: 13000, rate3rd: 13500, rateAvg: 12750 },
  { sno: 27, category: 'Doors & Windows', description: 'Bathroom PVC door — frame + shutter',                      unit: 'Nos',  rateGFloor: 5500,  rate1st: 5500,  rate2nd: 5500,  rate3rd: 5500,  rateAvg: 5500 },
  { sno: 28, category: 'Doors & Windows', description: 'Pooja room door — hardwood frame + decorative shutter',    unit: 'Nos',  rateGFloor: 18000, rate1st: 18000, rate2nd: 18000, rate3rd: 18000, rateAvg: 18000 },
  { sno: 29, category: 'Doors & Windows', description: 'UPVC windows — sliding / casement per sq.ft of opening',  unit: 'Sqft', rateGFloor: 450,   rate1st: 480,   rate2nd: 510,   rate3rd: 540,   rateAvg: 495 },

  // ── PAINTING ─────────────────────────────────────────────────────────
  { sno: 30, category: 'Painting',     description: 'Inner wall painting — 2 coats acrylic emulsion',              unit: 'm²',   rateGFloor: 55,    rate1st: 60,    rate2nd: 65,    rate3rd: 70,    rateAvg: 62.5 },
  { sno: 31, category: 'Painting',     description: 'Ceiling painting — 2 coats acrylic emulsion',                 unit: 'm²',   rateGFloor: 60,    rate1st: 65,    rate2nd: 70,    rate3rd: 75,    rateAvg: 67.5 },
  { sno: 32, category: 'Painting',     description: 'Outer wall — 2 coats weatherproof exterior emulsion',         unit: 'm²',   rateGFloor: 80,    rate1st: 90,    rate2nd: 100,   rate3rd: 110,   rateAvg: 95 },

  // ── STAIRCASE ────────────────────────────────────────────────────────
  { sno: 33, category: 'Staircase',    description: 'Staircase brickwork (in riser)',                              unit: 'm³',   rateGFloor: 5200,  rate1st: 5600,  rate2nd: 6000,  rate3rd: 6400,  rateAvg: 5800 },
  { sno: 34, category: 'Staircase',    description: 'Granite tread & landing (20mm polished)',                     unit: 'm²',   rateGFloor: 950,   rate1st: 1050,  rate2nd: 1150,  rate3rd: 1250,  rateAvg: 1100 },
  { sno: 35, category: 'Staircase',    description: 'SS handrail with glass / MS balusters (per RFT)',             unit: 'RFT',  rateGFloor: 1200,  rate1st: 1300,  rate2nd: 1400,  rate3rd: 1500,  rateAvg: 1350 },

  // ── MEP (Electrical & Plumbing) ───────────────────────────────────────
  { sno: 36, category: 'MEP',          description: 'Electrical works (wiring, DB, points) — rate per built-up sqft', unit: 'Sqft', rateGFloor: 120, rate1st: 130,  rate2nd: 140,  rate3rd: 150,  rateAvg: 135 },
  { sno: 37, category: 'MEP',          description: 'Plumbing works (CPVC supply, PVC waste) — rate per built-up sqft', unit: 'Sqft', rateGFloor: 90,  rate1st: 100,  rate2nd: 110,  rate3rd: 120,  rateAvg: 105 },
  { sno: 38, category: 'MEP',          description: 'Terrace surkhi / waterproofing treatment',                    unit: 'm²',   rateGFloor: 280,   rate1st: 300,   rate2nd: 320,   rate3rd: 340,   rateAvg: 310 },

  // ── GROUND PREPARATION ───────────────────────────────────────────────
  { sno: 39, category: 'Ground Prep',  description: 'M-Sand 4" layer below floor slab',                           unit: 'm³',   rateGFloor: 900,   rate1st: 900,   rate2nd: 900,   rate3rd: 900,   rateAvg: 900 },
  { sno: 40, category: 'Ground Prep',  description: 'Anti-termite pre-construction treatment',                     unit: 'm²',   rateGFloor: 35,    rate1st: 35,    rate2nd: 35,    rate3rd: 35,    rateAvg: 35 },
  { sno: 41, category: 'Ground Prep',  description: 'Flooring PCC M7.5 (1:4:8) below tiles',                     unit: 'm²',   rateGFloor: 180,   rate1st: 180,   rate2nd: 180,   rate3rd: 180,   rateAvg: 180 },
  { sno: 42, category: 'Ground Prep',  description: 'Basement filling with moorum / earth (compacted)',            unit: 'm³',   rateGFloor: 650,   rate1st: 650,   rate2nd: 650,   rate3rd: 650,   rateAvg: 650 },

  // ── ADDITIONAL WORKS ─────────────────────────────────────────────────
  { sno: 43, category: 'Additional',   description: 'Underground water sump (brick / RCC, 5000 L)',                unit: 'Nos',  rateGFloor: 45000, rate1st: 45000, rate2nd: 45000, rate3rd: 45000, rateAvg: 45000 },
  { sno: 44, category: 'Additional',   description: 'Septic tank (2-chamber RCC, standard size)',                  unit: 'Nos',  rateGFloor: 35000, rate1st: 35000, rate2nd: 35000, rate3rd: 35000, rateAvg: 35000 },

  // ── REINFORCEMENT STEEL ───────────────────────────────────────────────
  // Rate per kg (supply + bending + binding + wastage already in rate)
  { sno: 45, category: 'Steel',        description: 'Reinforcement Fe500D — Footings & Plinth Beam',               unit: 'kg',   rateGFloor: 78,    rate1st: 78,    rate2nd: 78,    rate3rd: 78,    rateAvg: 78 },
  { sno: 46, category: 'Steel',        description: 'Reinforcement Fe500D — Columns (all floors)',                  unit: 'kg',   rateGFloor: 82,    rate1st: 85,    rate2nd: 88,    rate3rd: 91,    rateAvg: 86.5 },
  { sno: 47, category: 'Steel',        description: 'Reinforcement Fe500D — Roof Beams & Slabs',                   unit: 'kg',   rateGFloor: 78,    rate1st: 80,    rate2nd: 82,    rate3rd: 84,    rateAvg: 81 },
  { sno: 48, category: 'Steel',        description: 'Binding wire & misc (1% of total steel)',                      unit: 'kg',   rateGFloor: 120,   rate1st: 120,   rate2nd: 120,   rate3rd: 120,   rateAvg: 120 },

  // ── WATERPROOFING ─────────────────────────────────────────────────────
  { sno: 49, category: 'Waterproofing', description: 'Bathroom waterproofing (floor + 300mm skirting) — crystalline', unit: 'm²', rateGFloor: 220, rate1st: 240, rate2nd: 260, rate3rd: 280, rateAvg: 250 },

  // ── PREMIUM / SITE WORKS ──────────────────────────────────────────────────
  { sno: 50, category: 'Site Works',   description: 'Compound wall — 9" brick + CM plaster + RCC coping (per RM)',    unit: 'RM',   rateGFloor: 1800, rate1st: 1800, rate2nd: 1800, rate3rd: 1800, rateAvg: 1800 },
  { sno: 51, category: 'Elevation',    description: 'Elevation / façade — texture paint + stone / ACP accent (m²)',    unit: 'm²',   rateGFloor: 480,  rate1st: 520,  rate2nd: 560,  rate3rd: 600,  rateAvg: 540 },
  { sno: 52, category: 'Electrical',   description: 'Electrical fixtures — fans, lights, switches per point (supply+fix)', unit: 'Nos', rateGFloor: 1100, rate1st: 1100, rate2nd: 1100, rate3rd: 1100, rateAvg: 1100 },
  { sno: 53, category: 'Plumbing',     description: 'Sanitaryware set — EWC + wash-basin + CP fittings (per bathroom)', unit: 'Set',  rateGFloor: 42000,rate1st: 42000,rate2nd: 42000,rate3rd: 42000,rateAvg: 42000 },
  { sno: 54, category: 'Site Works',   description: 'Overhead water tank — PVC 1000 L installed on RCC ring beam',     unit: 'Nos',  rateGFloor: 24000,rate1st: 24000,rate2nd: 24000,rate3rd: 24000,rateAvg: 24000 },
  { sno: 55, category: 'Site Works',   description: 'Borewell + 3HP submersible pump + GI casing (per RFT)',            unit: 'RFT',  rateGFloor: 700,  rate1st: 700,  rate2nd: 700,  rate3rd: 700,  rateAvg: 700 },
  { sno: 56, category: 'Site Works',   description: 'Plan approval / building permit & DTCP/CMDA fees (per sqft BUA)',  unit: 'Sqft', rateGFloor: 38,   rate1st: 38,   rate2nd: 38,   rate3rd: 38,   rateAvg: 38 },
  { sno: 57, category: 'Finishes',     description: 'Kitchen platform — 20mm granite slab + SS sink + accessories (RM)', unit: 'RM', rateGFloor: 30000,rate1st: 30000,rate2nd: 30000,rate3rd: 30000,rateAvg: 30000 },
  { sno: 58, category: 'Finishes',     description: 'MS window safety grilles — fabricated + powder coated (m²)',       unit: 'm²',  rateGFloor: 980,  rate1st: 1010, rate2nd: 1040, rate3rd: 1070, rateAvg: 1015 },

  // ── EXTERNAL DEVELOPMENT & SOFT COSTS ────────────────────────────────────
  { sno: 59, category: 'External Dev',  description: 'External development — driveway, garden path, compound floor finish (m²)', unit: 'm²',  rateGFloor: 850,  rate1st: 850,  rate2nd: 850,  rate3rd: 850,  rateAvg: 850 },
  { sno: 60, category: 'Soft Costs',   description: 'Architect + structural engineer fees (% of pre-GST civil total)',         unit: 'LS',  rateGFloor: 3,    rate1st: 3,    rate2nd: 3,    rate3rd: 3,    rateAvg: 3 },
  { sno: 61, category: 'Taxes',        description: 'GST on construction services (5% applicable for residential < ₹45 L)',    unit: 'LS',  rateGFloor: 5,    rate1st: 5,    rate2nd: 5,    rate3rd: 5,    rateAvg: 5 },

  // ── PROVISIONALS ──────────────────────────────────────────────────────────
  // Rates stored as percentages; engine applies them against base building total
  { sno: 90, category: 'Provisionals', description: 'Contractor preliminaries — mobilisation, PPE, scaffolding, temp works', unit: 'LS', rateGFloor: 3, rate1st: 3, rate2nd: 3, rate3rd: 3, rateAvg: 3 },
  { sno: 91, category: 'Provisionals', description: 'Contingency & escalation provision',                                    unit: 'LS', rateGFloor: 5, rate1st: 5, rate2nd: 5, rate3rd: 5, rateAvg: 5 },
];

/**
 * Get a rate object keyed by sno for fast lookup.
 * @param {Array} overrides – array of {sno, rateGFloor, rate1st, rate2nd, rate3rd, rateAvg}
 */
export function buildRateMap(overrides = []) {
  const map = {};
  for (const r of DEFAULT_RATES) map[r.sno] = { ...r };
  for (const o of overrides) {
    if (!map[o.sno]) continue;
    if (o.rateGFloor != null) map[o.sno].rateGFloor = Number(o.rateGFloor);
    if (o.rate1st    != null) map[o.sno].rate1st    = Number(o.rate1st);
    if (o.rate2nd    != null) map[o.sno].rate2nd    = Number(o.rate2nd);
    if (o.rate3rd    != null) map[o.sno].rate3rd    = Number(o.rate3rd);
    if (o.rateAvg    != null) map[o.sno].rateAvg    = Number(o.rateAvg);
  }
  return map;
}

/**
 * Resolve rate for a given floor index.
 * floorIdx: 0 = Ground, 1 = 1st, 2 = 2nd, 3 = 3rd
 */
export function resolveRate(rateItem, floorIdx) {
  if (!rateItem) return 0;
  switch (floorIdx) {
    case 0:  return rateItem.rateGFloor;
    case 1:  return rateItem.rate1st;
    case 2:  return rateItem.rate2nd;
    case 3:  return rateItem.rate3rd;
    default: return rateItem.rateAvg;
  }
}
