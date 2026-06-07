export function compareQuotes(quotes) {
  if (!quotes || quotes.length === 0) return { recommendedQuoteId: null, analysis: [] };

  const analysis = quotes.map(quote => {
    let baseCost = 0;
    let transport = parseFloat(quote.transport_cost) || 0;
    let qty = parseFloat(quote.quantity) || 0;
    let rate = parseFloat(quote.unit_rate) || 0;

    baseCost = qty * rate;

    // Assuming if GST is not included, we add 18% for comparison.
    let gstAmount = quote.gst_included ? 0 : (baseCost + transport) * 0.18;
    
    let totalLandedCost = baseCost + transport + gstAmount;

    let missingWarnings = [];
    if (!quote.brand) missingWarnings.push("Brand not specified");
    if (!quote.delivery_timeline) missingWarnings.push("Delivery timeline missing");
    if (!quote.quantity) missingWarnings.push("Quantity not specified");

    return {
      quoteId: quote.id,
      supplierName: quote.partners?.company_name || 'Unknown Supplier',
      totalLandedCost,
      baseCost,
      transport,
      gstAmount,
      isGstIncluded: quote.gst_included,
      missingWarnings,
      brand: quote.brand,
      timeline: quote.delivery_timeline,
      rawQuote: quote
    };
  });

  // Sort by lowest landed cost
  analysis.sort((a, b) => a.totalLandedCost - b.totalLandedCost);

  // Best fit logic: cheapest that has no missing warnings.
  let bestFit = analysis.find(a => a.missingWarnings.length === 0);
  if (!bestFit && analysis.length > 0) bestFit = analysis[0]; // fallback to cheapest

  const recommendationNote = bestFit 
    ? `We recommend ${bestFit.supplierName} as the best fit based on price, specification, and delivery readiness.`
    : `Please review quotes carefully due to missing specifications.`;

  return {
    recommendedQuoteId: bestFit ? bestFit.quoteId : null,
    recommendationNote,
    analysis
  };
}
