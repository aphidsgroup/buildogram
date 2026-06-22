/**
 * BOQ Rate Master — COCENA Issue 35, Dec 2025
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  RATE STORAGE CONVENTION                                                │
 * │                                                                         │
 * │  rateGFloor / rate1st / rate2nd / rate3rd / rateAvg  are ALL stored    │
 * │  in the ENGINE'S CALCULATION UNIT (shown in the `unit` field).         │
 * │                                                                         │
 * │  srcRate  = original COCENA published rate (for audit / debug column)  │
 * │  srcUnit  = original COCENA unit (SFT, CFT, RFT, KG, NOS …)           │
 * │                                                                         │
 * │  Conversion factors applied when deriving the engine rates:            │
 * │    SFT  →  m²  :  × 10.7639                                           │
 * │    CFT  →  m³  :  × 35.3147                                           │
 * │    RFT  →  RM  :  ×  3.2808                                           │
 * │                                                                         │
 * │  Special: 9″ brickwork (COCENA in CFT/m³ of masonry, engine in m²)    │
 * │    1 m² of 9″ (0.23 m) wall = 0.23 × 35.3147 = 8.1224 CFT            │
 * │    rate/m² = COCENA_CFT_rate × 8.1224                                  │
 * └─────────────────────────────────────────────────────────────────────────┘
 */

export const DEFAULT_RATES = [

  // ── EARTHWORK ──────────────────────────────────────────────────────────────
  // COCENA: excavation ₹9.90/CFT → 9.90 × 35.3147 = ₹349.6/m³
  {
    sno: 1, category: 'Earthwork',
    description: 'Earth excavation for foundations (incl. loading & disposal)',
    unit: 'm³', srcRate: 9.90, srcUnit: 'CFT',
    rateGFloor: 350, rate1st: 350, rate2nd: 350, rate3rd: 350, rateAvg: 350,
  },
  // COCENA: backfill ₹5.09/CFT → 5.09 × 35.3147 = ₹179.7/m³
  {
    sno: 2, category: 'Earthwork',
    description: 'Back-filling with excavated earth (compacted in layers)',
    unit: 'm³', srcRate: 5.09, srcUnit: 'CFT',
    rateGFloor: 180, rate1st: 180, rate2nd: 180, rate3rd: 180, rateAvg: 180,
  },

  // ── CONCRETE — formwork + placing only; rebar priced separately (SNO 45–48) ──
  // COCENA all-in RCC rates; subtract estimated rebar cost to get formwork-only.
  // COCENA PCC M10: ₹136/CFT → ₹4,803/m³
  {
    sno: 3, category: 'Concrete',
    description: 'PCC M10 (1:3:6) plain concrete below footings',
    unit: 'm³', srcRate: 136, srcUnit: 'CFT',
    rateGFloor: 4803, rate1st: 4803, rate2nd: 4803, rate3rd: 4803, rateAvg: 4803,
  },
  // COCENA footing M20 concrete + formwork: ₹193/CFT → ₹6,816/m³
  {
    sno: 4, category: 'Concrete',
    description: 'Isolated / Combined footing concrete M20 incl. formwork (rebar → SNO 45)',
    unit: 'm³', srcRate: 193, srcUnit: 'CFT',
    rateGFloor: 6816, rate1st: 6816, rate2nd: 6816, rate3rd: 6816, rateAvg: 6816,
  },
  // COCENA column concrete + formwork (no steel): ₹241/CFT → ₹8,511/m³
  {
    sno: 5, category: 'Concrete',
    description: 'Column concrete M20 incl. formwork only (rebar → SNO 45–48)',
    unit: 'm³', srcRate: 241, srcUnit: 'CFT',
    rateGFloor: 8511, rate1st: 9500, rate2nd: 10500, rate3rd: 11500, rateAvg: 10003,
  },
  // Plinth beam concrete + formwork: same rate as column at G floor
  {
    sno: 6, category: 'Concrete',
    description: 'Plinth beam / RSB / SB concrete M20 incl. formwork (rebar → SNO 45)',
    unit: 'm³', srcRate: 241, srcUnit: 'CFT',
    rateGFloor: 8511, rate1st: 8511, rate2nd: 8511, rate3rd: 8511, rateAvg: 8511,
  },
  // COCENA roof slab + beam formwork: ₹221/CFT → ₹7,805/m³
  {
    sno: 7, category: 'Concrete',
    description: 'Roof beam & slab M20 incl. formwork only (rebar → SNO 47)',
    unit: 'm³', srcRate: 221, srcUnit: 'CFT',
    rateGFloor: 7805, rate1st: 8800, rate2nd: 9800, rate3rd: 10800, rateAvg: 9301,
  },
  // COCENA sill/lintel: ₹213/CFT → ₹7,522/m³
  {
    sno: 8, category: 'Concrete',
    description: 'Sill beam / Lintel beam M20 incl. formwork',
    unit: 'm³', srcRate: 213, srcUnit: 'CFT',
    rateGFloor: 7522, rate1st: 8300, rate2nd: 9100, rate3rd: 9900, rateAvg: 8706,
  },
  // COCENA loft/sunshade: ₹241/CFT → ₹8,511/m³
  {
    sno: 9, category: 'Concrete',
    description: 'Loft / Sunshade / Counter slab / Balcony downslab M20',
    unit: 'm³', srcRate: 241, srcUnit: 'CFT',
    rateGFloor: 8511, rate1st: 9800, rate2nd: 11100, rate3rd: 12400, rateAvg: 10453,
  },
  // COCENA staircase slab: ₹269/CFT → ₹9,500/m³
  {
    sno: 10, category: 'Concrete',
    description: 'Staircase concrete M20 incl. formwork',
    unit: 'm³', srcRate: 269, srcUnit: 'CFT',
    rateGFloor: 9499, rate1st: 10800, rate2nd: 12100, rate3rd: 13400, rateAvg: 11450,
  },

  // ── BRICKWORK ──────────────────────────────────────────────────────────────
  // Basement brickwork priced by volume (m³)
  {
    sno: 11, category: 'Brickwork',
    description: 'Basement brickwork in CM 1:5 (below plinth)',
    unit: 'm³', srcRate: 5200, srcUnit: 'M3',
    rateGFloor: 5200, rate1st: 5200, rate2nd: 5200, rate3rd: 5200, rateAvg: 5200,
  },
  // 9″ FLYASH WALL — MAJOR FIX
  // COCENA: ₹216.5/CFT of masonry volume.
  // 1 m² of 9″ (0.23m) wall = 0.23 × 35.3147 = 8.1224 CFT
  // ∴ rate/m² = 216.5 × 8.1224 = ₹1,758 at G floor.
  // Upper floors +8% premium per floor (height/scaffolding).
  {
    sno: 12, category: 'Brickwork',
    description: '9″ Flyash brick wall in CM 1:5 (COCENA 216.5/CFT×8.1224 CFT/m²)',
    unit: 'm²', srcRate: 216.5, srcUnit: 'CFT/m³',
    rateGFloor: 1758, rate1st: 1899, rate2nd: 2050, rate3rd: 2214, rateAvg: 1980,
  },
  // 4.5″ PARTITION — MAJOR FIX
  // COCENA: ₹105.5/Sft (surface area, same dimension as engine m²)
  // ∴ rate/m² = 105.5 × 10.7639 = ₹1,136
  {
    sno: 13, category: 'Brickwork',
    description: '4.5″ Flyash brick partition wall in CM 1:5 (COCENA 105.5/Sft × 10.7639)',
    unit: 'm²', srcRate: 105.5, srcUnit: 'SFT',
    rateGFloor: 1136, rate1st: 1227, rate2nd: 1325, rate3rd: 1431, rateAvg: 1280,
  },

  // ── PLASTERING ─────────────────────────────────────────────────────────────
  // COCENA: outer 20mm ₹47.5/Sft; inner 12mm ₹38.5/Sft; ceiling 6mm ₹42/Sft
  {
    sno: 14, category: 'Plastering',
    description: 'Basement plastering CM 1:4 (both faces)',
    unit: 'm²', srcRate: 7.44, srcUnit: 'SFT',
    rateGFloor: 80, rate1st: 80, rate2nd: 80, rate3rd: 80, rateAvg: 80,
  },
  // OUTER PLASTER — MAJOR FIX: 47.5 × 10.7639 = 511.3
  {
    sno: 15, category: 'Plastering',
    description: 'Outer wall plastering 20mm CM 1:4 + weatherproof finish (COCENA 47.5/Sft × 10.7639)',
    unit: 'm²', srcRate: 47.5, srcUnit: 'SFT',
    rateGFloor: 480, rate1st: 511, rate2nd: 552, rate3rd: 596, rateAvg: 535,
  },
  // INNER PLASTER — MAJOR FIX: 38.5 × 10.7639 = 414.4
  {
    sno: 16, category: 'Plastering',
    description: 'Inner wall plastering 12mm CM 1:5 + POP punning (COCENA 38.5/Sft × 10.7639)',
    unit: 'm²', srcRate: 38.5, srcUnit: 'SFT',
    rateGFloor: 390, rate1st: 414, rate2nd: 447, rate3rd: 483, rateAvg: 434,
  },
  // CEILING PLASTER — MAJOR FIX: 42.0 × 10.7639 = 452.1
  {
    sno: 17, category: 'Plastering',
    description: 'Ceiling plastering 6mm CM 1:3 + POP punning (COCENA 42/Sft × 10.7639)',
    unit: 'm²', srcRate: 42.0, srcUnit: 'SFT',
    rateGFloor: 430, rate1st: 452, rate2nd: 488, rate3rd: 527, rateAvg: 474,
  },

  // ── FLOORING & TILES ───────────────────────────────────────────────────────
  // FLOOR VITRIFIED — MAJOR FIX: 121.5 × 10.7639 = 1,307.8
  {
    sno: 18, category: 'Tile Work',
    description: 'Main floor vitrified tiles 600×600mm (COCENA 121.5/Sft × 10.7639)',
    unit: 'm²', srcRate: 121.5, srcUnit: 'SFT',
    rateGFloor: 1200, rate1st: 1308, rate2nd: 1416, rate3rd: 1529, rateAvg: 1363,
  },
  // BATHROOM FLOOR — MAJOR FIX: 137.0 × 10.7639 = 1,474.7
  {
    sno: 19, category: 'Tile Work',
    description: 'Bathroom floor ceramic tiles 300×300mm (COCENA 137/Sft × 10.7639)',
    unit: 'm²', srcRate: 137.0, srcUnit: 'SFT',
    rateGFloor: 1350, rate1st: 1475, rate2nd: 1598, rate3rd: 1726, rateAvg: 1537,
  },
  // PARKING ANTI-SKID — MAJOR FIX: 135.0 × 10.7639 = 1,453.1
  {
    sno: 20, category: 'Tile Work',
    description: 'Parking / balcony anti-skid tiles (COCENA 135/Sft × 10.7639)',
    unit: 'm²', srcRate: 135.0, srcUnit: 'SFT',
    rateGFloor: 1320, rate1st: 1453, rate2nd: 1583, rate3rd: 1720, rateAvg: 1519,
  },
  // KITCHEN WALL TILES — MAJOR FIX: 112.5 × 10.7639 = 1,211.0
  {
    sno: 21, category: 'Tile Work',
    description: 'Kitchen wall ceramic tiles 300×450mm up to 2.1m ht (COCENA 112.5/Sft × 10.7639)',
    unit: 'm²', srcRate: 112.5, srcUnit: 'SFT',
    rateGFloor: 1100, rate1st: 1211, rate2nd: 1321, rate3rd: 1431, rateAvg: 1266,
  },
  // BATHROOM WALL TILES — MAJOR FIX: same rate as kitchen
  {
    sno: 22, category: 'Tile Work',
    description: 'Bathroom wall ceramic tiles 300×450mm full ht (COCENA 112.5/Sft × 10.7639)',
    unit: 'm²', srcRate: 112.5, srcUnit: 'SFT',
    rateGFloor: 1100, rate1st: 1211, rate2nd: 1321, rate3rd: 1431, rateAvg: 1266,
  },
  // SKIRTING — FIX: COCENA ₹35/Rft → 35 × 3.2808 = ₹114.8/RM
  {
    sno: 23, category: 'Tile Work',
    description: 'Skirting tiles 100mm ht — matching floor (COCENA 35/Rft × 3.2808)',
    unit: 'RM', srcRate: 35, srcUnit: 'RFT',
    rateGFloor: 115, rate1st: 115, rate2nd: 115, rate3rd: 115, rateAvg: 115,
  },
  // GRANITE COUNTERTOP — MAJOR FIX: 338.5 × 10.7639 = 3,643.7
  {
    sno: 24, category: 'Tile Work',
    description: 'Granite countertop 20mm polished — kitchen & bathrooms (COCENA 338.5/Sft × 10.7639)',
    unit: 'm²', srcRate: 338.5, srcUnit: 'SFT',
    rateGFloor: 3500, rate1st: 3644, rate2nd: 3891, rate3rd: 4142, rateAvg: 3794,
  },

  // ── DOORS & WINDOWS ────────────────────────────────────────────────────────
  {
    sno: 25, category: 'Doors & Windows',
    description: 'Main door — teak wood frame + flush/panel shutter (supply + fix)',
    unit: 'Nos', srcRate: 35000, srcUnit: 'NOS',
    rateGFloor: 35000, rate1st: 35000, rate2nd: 35000, rate3rd: 35000, rateAvg: 35000,
  },
  {
    sno: 26, category: 'Doors & Windows',
    description: 'Room door — hardwood frame + flush shutter (supply + fix)',
    unit: 'Nos', srcRate: 12000, srcUnit: 'NOS',
    rateGFloor: 12000, rate1st: 12500, rate2nd: 13000, rate3rd: 13500, rateAvg: 12750,
  },
  {
    sno: 27, category: 'Doors & Windows',
    description: 'Bathroom PVC door — frame + shutter (supply + fix)',
    unit: 'Nos', srcRate: 5500, srcUnit: 'NOS',
    rateGFloor: 5500, rate1st: 5500, rate2nd: 5500, rate3rd: 5500, rateAvg: 5500,
  },
  {
    sno: 28, category: 'Doors & Windows',
    description: 'Pooja room door — hardwood frame + decorative shutter (supply + fix)',
    unit: 'Nos', srcRate: 18000, srcUnit: 'NOS',
    rateGFloor: 18000, rate1st: 18000, rate2nd: 18000, rate3rd: 18000, rateAvg: 18000,
  },
  // UPVC WINDOWS — MAJOR FIX: COCENA ₹1,050/Sft (engine already uses Sqft — no conversion needed)
  {
    sno: 29, category: 'Doors & Windows',
    description: 'UPVC windows — sliding / casement per sq.ft of opening (COCENA 1050/Sft)',
    unit: 'Sqft', srcRate: 1050, srcUnit: 'SFT',
    rateGFloor: 1050, rate1st: 1050, rate2nd: 1100, rate3rd: 1150, rateAvg: 1088,
  },

  // ── PAINTING ───────────────────────────────────────────────────────────────
  // Full system: COCENA emulsion ₹15 + putty ₹8 + primer ₹5 = ₹28/Sft interior
  // INNER PAINTING — MAJOR FIX: 28 × 10.7639 = 301.4
  {
    sno: 30, category: 'Painting',
    description: 'Inner wall — putty + primer + 2 coats acrylic emulsion (COCENA 28/Sft × 10.7639)',
    unit: 'm²', srcRate: 28.0, srcUnit: 'SFT',
    rateGFloor: 280, rate1st: 301, rate2nd: 325, rate3rd: 351, rateAvg: 314,
  },
  // CEILING PAINTING — MAJOR FIX: 25 × 10.7639 = 269.1
  {
    sno: 31, category: 'Painting',
    description: 'Ceiling — primer + 2 coats acrylic emulsion (COCENA 25/Sft × 10.7639)',
    unit: 'm²', srcRate: 25.0, srcUnit: 'SFT',
    rateGFloor: 250, rate1st: 269, rate2nd: 291, rate3rd: 314, rateAvg: 281,
  },
  // EXTERIOR PAINTING — MAJOR FIX: 25 × 10.7639 = 269.1
  {
    sno: 32, category: 'Painting',
    description: 'Outer wall — primer + 2 coats exterior weatherproof emulsion (COCENA 25/Sft × 10.7639)',
    unit: 'm²', srcRate: 25.0, srcUnit: 'SFT',
    rateGFloor: 250, rate1st: 269, rate2nd: 291, rate3rd: 314, rateAvg: 281,
  },

  // ── STAIRCASE ─────────────────────────────────────────────────────────────
  {
    sno: 33, category: 'Staircase',
    description: 'Staircase brickwork (in risers)',
    unit: 'm³', srcRate: 5200, srcUnit: 'M3',
    rateGFloor: 5200, rate1st: 5600, rate2nd: 6000, rate3rd: 6400, rateAvg: 5800,
  },
  // STAIR GRANITE — FIX: same as countertop granite 338.5/Sft → ₹3,644/m²
  {
    sno: 34, category: 'Staircase',
    description: 'Granite tread & landing 20mm polished (COCENA 338.5/Sft × 10.7639)',
    unit: 'm²', srcRate: 338.5, srcUnit: 'SFT',
    rateGFloor: 3500, rate1st: 3644, rate2nd: 3891, rate3rd: 4142, rateAvg: 3794,
  },
  {
    sno: 35, category: 'Staircase',
    description: 'SS handrail with glass / MS balusters (per RFT)',
    unit: 'RFT', srcRate: 1200, srcUnit: 'RFT',
    rateGFloor: 1200, rate1st: 1300, rate2nd: 1400, rate3rd: 1500, rateAvg: 1350,
  },

  // ── MEP ───────────────────────────────────────────────────────────────────
  {
    sno: 36, category: 'MEP',
    description: 'Electrical works (wiring, DB, conduit, points) — per built-up sqft',
    unit: 'Sqft', srcRate: 135, srcUnit: 'SFT',
    rateGFloor: 120, rate1st: 130, rate2nd: 140, rate3rd: 150, rateAvg: 135,
  },
  {
    sno: 37, category: 'MEP',
    description: 'Plumbing works (CPVC supply + PVC waste) — per built-up sqft',
    unit: 'Sqft', srcRate: 105, srcUnit: 'SFT',
    rateGFloor: 90, rate1st: 100, rate2nd: 110, rate3rd: 120, rateAvg: 105,
  },
  // TERRACE WATERPROOFING: COCENA ₹25/Sft → 25 × 10.7639 = 269.1
  {
    sno: 38, category: 'MEP',
    description: 'Terrace surkhi / waterproofing treatment (COCENA 25/Sft × 10.7639)',
    unit: 'm²', srcRate: 25.0, srcUnit: 'SFT',
    rateGFloor: 269, rate1st: 290, rate2nd: 313, rate3rd: 338, rateAvg: 303,
  },

  // ── GROUND PREPARATION ────────────────────────────────────────────────────
  {
    sno: 39, category: 'Ground Prep',
    description: 'M-Sand 4″ compacted layer below floor slab',
    unit: 'm³', srcRate: 900, srcUnit: 'M3',
    rateGFloor: 900, rate1st: 900, rate2nd: 900, rate3rd: 900, rateAvg: 900,
  },
  {
    sno: 40, category: 'Ground Prep',
    description: 'Anti-termite pre-construction chemical treatment',
    unit: 'm²', srcRate: 35, srcUnit: 'M2',
    rateGFloor: 35, rate1st: 35, rate2nd: 35, rate3rd: 35, rateAvg: 35,
  },
  {
    sno: 41, category: 'Ground Prep',
    description: 'Flooring PCC M7.5 (1:4:8) below tiles — per m²',
    unit: 'm²', srcRate: 180, srcUnit: 'M2',
    rateGFloor: 180, rate1st: 180, rate2nd: 180, rate3rd: 180, rateAvg: 180,
  },
  {
    sno: 42, category: 'Ground Prep',
    description: 'Basement filling with moorum / earth (compacted)',
    unit: 'm³', srcRate: 650, srcUnit: 'M3',
    rateGFloor: 650, rate1st: 650, rate2nd: 650, rate3rd: 650, rateAvg: 650,
  },

  // ── ADDITIONAL WORKS ──────────────────────────────────────────────────────
  {
    sno: 43, category: 'Additional',
    description: 'Underground water sump (brick / RCC, 5000 L)',
    unit: 'Nos', srcRate: 45000, srcUnit: 'NOS',
    rateGFloor: 45000, rate1st: 45000, rate2nd: 45000, rate3rd: 45000, rateAvg: 45000,
  },
  {
    sno: 44, category: 'Additional',
    description: 'Septic tank (2-chamber RCC, standard size)',
    unit: 'Nos', srcRate: 35000, srcUnit: 'NOS',
    rateGFloor: 35000, rate1st: 35000, rate2nd: 35000, rate3rd: 35000, rateAvg: 35000,
  },

  // ── REINFORCEMENT STEEL ───────────────────────────────────────────────────
  // Rates per kg: supply + bending + binding + 5% wastage included in rate
  {
    sno: 45, category: 'Steel',
    description: 'Reinforcement Fe500D — Footings & Plinth Beam',
    unit: 'kg', srcRate: 78, srcUnit: 'KG',
    rateGFloor: 78, rate1st: 78, rate2nd: 78, rate3rd: 78, rateAvg: 78,
  },
  {
    sno: 46, category: 'Steel',
    description: 'Reinforcement Fe500D — Columns (all floors)',
    unit: 'kg', srcRate: 82, srcUnit: 'KG',
    rateGFloor: 82, rate1st: 85, rate2nd: 88, rate3rd: 91, rateAvg: 86.5,
  },
  {
    sno: 47, category: 'Steel',
    description: 'Reinforcement Fe500D — Roof Beams & Slabs',
    unit: 'kg', srcRate: 78, srcUnit: 'KG',
    rateGFloor: 78, rate1st: 80, rate2nd: 82, rate3rd: 84, rateAvg: 81,
  },
  {
    sno: 48, category: 'Steel',
    description: 'Binding wire & misc (1% of total steel)',
    unit: 'kg', srcRate: 120, srcUnit: 'KG',
    rateGFloor: 120, rate1st: 120, rate2nd: 120, rate3rd: 120, rateAvg: 120,
  },

  // ── WATERPROOFING ─────────────────────────────────────────────────────────
  // COCENA crystalline coating: ₹24/Sft → 24 × 10.7639 = ₹258.3/m²
  {
    sno: 49, category: 'Waterproofing',
    description: 'Bathroom waterproofing (floor + 300mm skirting) — crystalline (COCENA 24/Sft × 10.7639)',
    unit: 'm²', srcRate: 24.0, srcUnit: 'SFT',
    rateGFloor: 258, rate1st: 279, rate2nd: 301, rate3rd: 325, rateAvg: 291,
  },

  // ── PREMIUM / SITE WORKS ──────────────────────────────────────────────────
  {
    sno: 50, category: 'Site Works',
    description: 'Compound wall — 9″ brick + CM plaster + RCC coping (per RM)',
    unit: 'RM', srcRate: 1800, srcUnit: 'RM',
    rateGFloor: 1800, rate1st: 1800, rate2nd: 1800, rate3rd: 1800, rateAvg: 1800,
  },
  {
    sno: 51, category: 'Elevation',
    description: 'Elevation / façade — texture paint + stone / ACP accent (m²)',
    unit: 'm²', srcRate: 540, srcUnit: 'M2',
    rateGFloor: 480, rate1st: 520, rate2nd: 560, rate3rd: 600, rateAvg: 540,
  },
  {
    sno: 52, category: 'Electrical',
    description: 'Electrical fixtures — fans, lights, switches per point (supply + fix)',
    unit: 'Nos', srcRate: 1100, srcUnit: 'NOS',
    rateGFloor: 1100, rate1st: 1100, rate2nd: 1100, rate3rd: 1100, rateAvg: 1100,
  },
  {
    sno: 53, category: 'Plumbing',
    description: 'Sanitaryware set — EWC + wash-basin + CP fittings (per bathroom)',
    unit: 'Set', srcRate: 42000, srcUnit: 'SET',
    rateGFloor: 42000, rate1st: 42000, rate2nd: 42000, rate3rd: 42000, rateAvg: 42000,
  },
  {
    sno: 54, category: 'Site Works',
    description: 'Overhead water tank — PVC 1000 L installed on RCC ring beam',
    unit: 'Nos', srcRate: 24000, srcUnit: 'NOS',
    rateGFloor: 24000, rate1st: 24000, rate2nd: 24000, rate3rd: 24000, rateAvg: 24000,
  },
  {
    sno: 55, category: 'Site Works',
    description: 'Borewell + 3HP submersible pump + GI casing (per RFT)',
    unit: 'RFT', srcRate: 700, srcUnit: 'RFT',
    rateGFloor: 700, rate1st: 700, rate2nd: 700, rate3rd: 700, rateAvg: 700,
  },
  {
    sno: 56, category: 'Site Works',
    description: 'Plan approval / building permit & DTCP/CMDA fees (per sqft BUA)',
    unit: 'Sqft', srcRate: 38, srcUnit: 'SFT',
    rateGFloor: 38, rate1st: 38, rate2nd: 38, rate3rd: 38, rateAvg: 38,
  },
  {
    sno: 57, category: 'Finishes',
    description: 'Kitchen platform — 20mm granite slab + SS sink + accessories (per RM)',
    unit: 'RM', srcRate: 30000, srcUnit: 'RM',
    rateGFloor: 30000, rate1st: 30000, rate2nd: 30000, rate3rd: 30000, rateAvg: 30000,
  },
  {
    sno: 58, category: 'Finishes',
    description: 'MS window safety grilles — fabricated + powder coated (m²)',
    unit: 'm²', srcRate: 980, srcUnit: 'M2',
    rateGFloor: 980, rate1st: 1010, rate2nd: 1040, rate3rd: 1070, rateAvg: 1015,
  },

  // ── EXTERNAL DEVELOPMENT & SOFT COSTS ─────────────────────────────────────
  {
    sno: 59, category: 'External Dev',
    description: 'External development — driveway, garden path, compound floor finish (m²)',
    unit: 'm²', srcRate: 850, srcUnit: 'M2',
    rateGFloor: 850, rate1st: 850, rate2nd: 850, rate3rd: 850, rateAvg: 850,
  },
  {
    sno: 60, category: 'Soft Costs',
    description: 'Architect + structural engineer fees (% of pre-GST civil total)',
    unit: 'LS', srcRate: 3, srcUnit: 'PCT',
    rateGFloor: 3, rate1st: 3, rate2nd: 3, rate3rd: 3, rateAvg: 3,
  },
  {
    sno: 61, category: 'Taxes',
    description: 'GST on construction services (5% for residential < ₹45 L)',
    unit: 'LS', srcRate: 5, srcUnit: 'PCT',
    rateGFloor: 5, rate1st: 5, rate2nd: 5, rate3rd: 5, rateAvg: 5,
  },

  // ── PROVISIONALS ──────────────────────────────────────────────────────────
  // Rates stored as percentages; engine applies them against base building total
  {
    sno: 90, category: 'Provisionals',
    description: 'Contractor preliminaries — mobilisation, PPE, scaffolding, temp works',
    unit: 'LS', srcRate: 3, srcUnit: 'PCT',
    rateGFloor: 3, rate1st: 3, rate2nd: 3, rate3rd: 3, rateAvg: 3,
  },
  {
    sno: 91, category: 'Provisionals',
    description: 'Contingency & escalation provision',
    unit: 'LS', srcRate: 5, srcUnit: 'PCT',
    rateGFloor: 5, rate1st: 5, rate2nd: 5, rate3rd: 5, rateAvg: 5,
  },
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
    // Preserve srcRate / srcUnit from override if provided
    if (o.srcRate    != null) map[o.sno].srcRate    = Number(o.srcRate);
    if (o.srcUnit    != null) map[o.sno].srcUnit    = o.srcUnit;
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

export const EXCEL_RATES = {
  earthExcavation:       { rate: 15.5,  unit: 'cft',  section: 'foundation' },
  pcc148:                { rate: 129,   unit: 'cft',  section: 'foundation' },
  footingConcrete:       { rate: 312.5, unit: 'cft',  section: 'foundation' },
  columnConcrete:        { rate: 948.5, unit: 'cft',  section: 'foundation' },
  plinthBeamExcavation:  { rate: 15.5,  unit: 'cft',  section: 'foundation' },
  backFilling:           { rate: 8.5,   unit: 'cft',  section: 'foundation' },
  plinthBeamConcrete:    { rate: 651.7, unit: 'cft',  section: 'foundation' },
  basementBrickwork:     { rate: 216.5, unit: 'cft',  section: 'foundation' },
  basementPlastering:    { rate: 39,    unit: 'sqft', section: 'foundation' },
  basementFilling:       { rate: 41.5,  unit: 'cft',  section: 'foundation' },
  msand4Layer:           { rate: 87,    unit: 'cft',  section: 'foundation' },
  antiTermite:           { rate: 12.5,  unit: 'sqft', section: 'foundation' },
  flooringPCC:           { rate: 61,    unit: 'sqft', section: 'foundation' },
  brickwork9:            { rate: 219.5, unit: 'cft',  section: 'superstructure' },
  brickwork4:            { rate: 108.5, unit: 'sqft', section: 'superstructure' },
  outerPlastering:       { rate: 49,    unit: 'sqft', section: 'superstructure' },
  innerPlastering:       { rate: 40,    unit: 'sqft', section: 'superstructure' },
  ceilingPlastering:     { rate: 42,    unit: 'sqft', section: 'superstructure' },
  roofBeamSlab:          { rate: 287.800366189324, unit: 'sqft',  section: 'superstructure' },
  sillBeam:              { rate: 75.9,  unit: 'rft',  section: 'superstructure' },
  lintelBeam:            { rate: 237.1, unit: 'rft',  section: 'superstructure' },
  lumpSumConcrete:       { rate: 44798.30, unit: '-', section: 'superstructure' },
  flooringTile:          { rate: 122,   unit: 'sqft', section: 'superstructure' },
  skirting:              { rate: 61,    unit: 'rft',  section: 'superstructure' },
  bathroomFloorTile:     { rate: 138,   unit: 'sqft', section: 'superstructure' },
  bathroomWallTile:      { rate: 113,   unit: 'sqft', section: 'superstructure' },
  kitchenWallTile:       { rate: 113,   unit: 'sqft', section: 'superstructure' },
  parkingTile:           { rate: 120,   unit: 'sqft', section: 'superstructure' },
  graniteCountertop:     { rate: 339,   unit: 'sqft', section: 'superstructure' },
  mainDoor:              { rate: 3000,  unit: 'sqft', section: 'superstructure' },
  roomDoor:              { rate: 850,   unit: 'sqft', section: 'superstructure' },
  poojaDoor:             { rate: 2000,  unit: 'sqft', section: 'superstructure' },
  bathroomPvcDoor:       { rate: 150,   unit: 'sqft', section: 'superstructure' },
  upvcWindows:           { rate: 1050,  unit: 'sqft', section: 'superstructure' },
  innerWallPainting:     { rate: 34,    unit: 'sqft', section: 'superstructure' },
  innerCeilingPainting:  { rate: 25,    unit: 'sqft', section: 'superstructure' },
  outerWallPainting:     { rate: 28,    unit: 'sqft', section: 'superstructure' },
  staircaseBrickwork:    { rate: 250,   unit: 'cft',  section: 'superstructure' },
  staircaseGranite:      { rate: 320,   unit: 'sqft', section: 'superstructure' },
  staircaseConcrete:     { rate: 518.6, unit: 'cft',  section: 'superstructure' },
  ssHandrail:            { rate: 1000,  unit: 'rft',  section: 'superstructure' },
  electricalPlumbing:    { rate: 200,   unit: 'sqft', section: 'superstructure' },
  terraceSurkhi:         { rate: 69,    unit: 'sqft', section: 'superstructure' },
};
