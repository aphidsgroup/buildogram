export const calculateBOQClarityScore = ({ missingFound, vagueFound, totalMissingPossible }) => {
  const missingPenalty = missingFound.length * 5;
  const vaguePenalty = vagueFound.length * 3;
  
  let score = 100 - missingPenalty - vaguePenalty;
  if (score < 10) score = 10; // Floor
  if (score > 100) score = 100; // Ceiling
  
  let riskLevel = "Low";
  if (score < 50) riskLevel = "High";
  else if (score < 80) riskLevel = "Medium";
  
  return { score, riskLevel };
};

export const calculateStructuralAuditUrgency = ({ age, visibleCracks, leakage, corrosion, extraFloorPlanned }) => {
  let score = 0;
  
  const parsedAge = parseInt(age) || 0;
  if (parsedAge > 20) score += 3;
  else if (parsedAge > 10) score += 1;
  
  if (visibleCracks === 'yes') score += 5;
  if (leakage === 'yes') score += 2;
  if (corrosion === 'yes') score += 4;
  if (extraFloorPlanned === 'yes') score += 3;
  
  let urgencyLevel = "Low";
  if (score >= 8) urgencyLevel = "Critical";
  else if (score >= 4) urgencyLevel = "High";
  else if (score >= 2) urgencyLevel = "Medium";
  
  return { score, urgencyLevel };
};

export const calculatePassportReadiness = (documents) => {
  const { hasDrawings, hasBills, hasWarranties, hasPhotos } = documents;
  
  let score = 0;
  if (hasDrawings === 'yes') score += 40;
  if (hasBills === 'yes') score += 30;
  if (hasWarranties === 'yes') score += 20;
  if (hasPhotos === 'yes') score += 10;
  
  let status = "Incomplete";
  if (score >= 80) status = "Ready for Handover";
  else if (score >= 50) status = "Partially Complete";
  
  return { score, status };
};
