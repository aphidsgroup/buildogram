/**
 * BOQ Unit Conversion Utilities
 *
 * COCENA Issue 35 rates are published in SFT / CFT / RFT.
 * The BOQ engine measures quantities in m² / m³ / RM.
 *
 * Apply these multipliers to convert a COCENA source rate to the
 * engine's calculation unit:
 *
 *   Per SFT  → per m²  :  × 10.7639
 *   Per CFT  → per m³  :  × 35.3147
 *   Per RFT  → per RM  :  ×  3.2808
 *
 * ── Special case — 9″ brickwork ──────────────────────────────────────────
 *   COCENA prices brickwork per CFT of masonry *volume*.
 *   Engine measures 9″ (0.23 m) walls in m² of *wall area*.
 *   1 m² of 9″ wall = 0.23 × 35.3147 CFT = 8.1224 CFT
 *   ∴  rate per m²  = COCENA_CFT_rate × 8.1224
 *
 * ── Special case — 4.5″ partition ────────────────────────────────────────
 *   COCENA prices 4.5″ partitions per SFT of *surface area* (same unit as
 *   the engine's m² of wall area), so only the SFT→m² factor is needed.
 */

/** 1 m² = 10.7639 sq ft */
export const SQFT_PER_M2 = 10.7639;

/** 1 m³ = 35.3147 cu ft */
export const CFT_PER_M3  = 35.3147;

/** 1 RM = 3.28084 running ft */
export const RFT_PER_RM  = 3.28084;

/** CFT of masonry per m² of 9″ (230 mm) brick wall */
export const BRICK9_CFT_PER_M2 = 0.23 * CFT_PER_M3;   // 8.1224

/** CFT of masonry per m² of 4.5″ (115 mm) brick wall */
export const BRICK4_5_CFT_PER_M2 = 0.115 * CFT_PER_M3; // 4.0612

/**
 * Convert a published COCENA rate from srcUnit to calcUnit.
 *
 * @param {number} rate      Published rate in srcUnit
 * @param {string} srcUnit   'SFT'|'SQFT'|'CFT'|'RFT'|'KG'|'NOS'|'M2'|'M3'|'RM'|'SET'|'PCT'
 * @param {string} calcUnit  Target unit used by the engine (same set)
 * @returns {number}         Rate in calcUnit
 */
export function convertRate(rate, srcUnit, calcUnit) {
  const s = (srcUnit  || '').toString().toUpperCase().replace(/[\s._-]/g, '');
  const c = (calcUnit || '').toString().toUpperCase().replace(/[\s._-]/g, '');
  if (!s || !c || s === c) return rate;

  // SFT ↔ m²
  if ((s === 'SFT' || s === 'SQFT') && (c === 'M2' || c === 'SQM')) return rate * SQFT_PER_M2;
  if ((s === 'M2'  || s === 'SQM')  && (c === 'SFT' || c === 'SQFT')) return rate / SQFT_PER_M2;

  // CFT ↔ m³
  if ((s === 'CFT' || s === 'CUFT') && (c === 'M3' || c === 'CUM'))  return rate * CFT_PER_M3;
  if ((s === 'M3'  || s === 'CUM')  && (c === 'CFT' || c === 'CUFT')) return rate / CFT_PER_M3;

  // RFT ↔ RM
  if (s === 'RFT' && (c === 'RM' || c === 'M')) return rate * RFT_PER_RM;
  if (c === 'RFT' && (s === 'RM' || s === 'M')) return rate / RFT_PER_RM;

  return rate; // same unit or unknown pair — return as-is
}
