export const milestoneTemplates = {
  home_construction: [
    { name: "Requirement Review", stage: "enquiry" },
    { name: "Site Visit", stage: "planning" },
    { name: "Drawing / BOQ Review", stage: "boq" },
    { name: "Partner Shortlisting", stage: "planning" },
    { name: "Agreement / Scope Finalization", stage: "planning" },
    { name: "Foundation", stage: "foundation" },
    { name: "Structure", stage: "structure" },
    { name: "Masonry", stage: "masonry" },
    { name: "MEP", stage: "mep" },
    { name: "Waterproofing", stage: "waterproofing" },
    { name: "Finishing", stage: "finishing" },
    { name: "BQS Final Review", stage: "handover" },
    { name: "Property Passport Handover", stage: "maintenance" },
  ],
  structural_audit: [
    { name: "Intake Review", stage: "enquiry" },
    { name: "Site Inspection", stage: "planning" },
    { name: "NDT Planning", stage: "planning" },
    { name: "Testing", stage: "structure" },
    { name: "Report Preparation", stage: "finishing" },
    { name: "Recommendation Review", stage: "handover" },
    { name: "Passport Record Upload", stage: "maintenance" },
  ],
  land_survey: [
    { name: "Document Collection", stage: "enquiry" },
    { name: "Site Visit", stage: "planning" },
    { name: "Measurement", stage: "structure" },
    { name: "Marking / Drawing", stage: "finishing" },
    { name: "Report Delivery", stage: "handover" },
    { name: "Passport Record Upload", stage: "maintenance" },
  ],
  soil_testing: [
    { name: "Requirement Review", stage: "enquiry" },
    { name: "Borehole Planning", stage: "planning" },
    { name: "Field Testing", stage: "structure" },
    { name: "Lab Coordination", stage: "structure" },
    { name: "Report Delivery", stage: "finishing" },
    { name: "Foundation Recommendation Upload", stage: "handover" },
  ],
  piling: [
    { name: "Soil Report Review", stage: "enquiry" },
    { name: "Pile BOQ Review", stage: "boq" },
    { name: "Contractor Assignment", stage: "planning" },
    { name: "Execution Tracking", stage: "foundation" },
    { name: "Pile Testing", stage: "structure" },
    { name: "Report Upload", stage: "handover" },
  ],
  materials: [
    { name: "Requirement Review", stage: "enquiry" },
    { name: "Supplier Quotes", stage: "boq" },
    { name: "Quote Comparison", stage: "boq" },
    { name: "Customer Approval", stage: "planning" },
    { name: "Delivery Tracking", stage: "structure" },
    { name: "Invoice / Proof Upload", stage: "finishing" },
    { name: "Passport Record Upload", stage: "handover" },
  ],
};

export function getMilestonesForType(type) {
  return milestoneTemplates[type] || [];
}
