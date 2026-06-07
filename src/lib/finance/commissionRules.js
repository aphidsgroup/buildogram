// commissionRules.js

/**
 * Calculate the suggested commission for a partner based on business rules.
 * This does not auto-pay. It generates a suggested amount for Ops approval.
 *
 * @param {Object} params
 * @param {string} params.type - 'percentage', 'fixed', 'referral', 'material_margin'
 * @param {number} params.base_amount - The base amount the commission is calculated on
 * @param {number} params.rate - The commission rate (e.g., 0.10 for 10%)
 * @param {number} params.fixed_amount - A fixed amount if applicable
 * @returns {number} The calculated commission amount
 */
export function calculateSuggestedCommission({
  type = "percentage",
  base_amount = 0,
  rate = 0,
  fixed_amount = 0,
}) {
  let commission = 0;

  switch (type) {
    case "percentage":
      commission = base_amount * rate;
      break;
    case "fixed":
    case "referral":
    case "subscription":
      commission = fixed_amount;
      break;
    case "material_margin":
      // For materials, base_amount might be customer price, and rate could be the percentage margin 
      // OR fixed_amount might be the exact difference between supplier quote and customer quote
      commission = fixed_amount > 0 ? fixed_amount : base_amount * rate;
      break;
    case "service_fee":
      // Buildogram's own service fee margin
      commission = base_amount * rate;
      break;
    default:
      commission = 0;
  }

  return Number(commission.toFixed(2));
}
