export const BOQ_RULES = {
  vagueTerms: [
    "standard", "premium", "as per site", "good quality", "branded", 
    "complete", "all inclusive", "basic", "local", "reputed brand", "etc"
  ],
  missingItemsChecklist: [
    "earthwork", "PCC", "reinforcement", "shuttering", "waterproofing", 
    "electrical", "plumbing", "painting", "doors", "windows", 
    "curing", "debris removal", "GST", "transport", "wastage", "escalation"
  ]
};

export const CONTRACTOR_QUOTE_RULES = {
  unclearScopeIndicators: [
    "approximate", "estimate", "subject to change", "TBD", "to be decided",
    "as required", "extra cost", "not included"
  ],
  paymentRiskIndicators: [
    "advance", "100%", "before starting", "cash only", "no retention"
  ]
};

export const analyzeBOQText = (text) => {
  if (!text) return { vagueFound: [], missingFound: BOQ_RULES.missingItemsChecklist };
  
  const lowerText = text.toLowerCase();
  
  const vagueFound = BOQ_RULES.vagueTerms.filter(term => lowerText.includes(term));
  const missingFound = BOQ_RULES.missingItemsChecklist.filter(item => !lowerText.includes(item.toLowerCase()));
  
  return { vagueFound, missingFound };
};

export const analyzeQuoteText = (text) => {
  if (!text) return { unclearFound: [], paymentRisksFound: [] };
  
  const lowerText = text.toLowerCase();
  
  const unclearFound = CONTRACTOR_QUOTE_RULES.unclearScopeIndicators.filter(term => lowerText.includes(term));
  const paymentRisksFound = CONTRACTOR_QUOTE_RULES.paymentRiskIndicators.filter(term => lowerText.includes(term));
  
  return { unclearFound, paymentRisksFound };
};
