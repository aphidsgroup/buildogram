const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Inline simple evaluation function for script (or could try to import but next/babel makes it tricky sometimes in pure node scripts)
function evaluateFollowUpRules(toolName, outputData) {
  let result = {
    risk_level: 'medium',
    score: 50,
    recommended_service_url: '/',
    recommended_ops_team: 'general_sales',
    follow_up_priority: 'within_24_hours',
    follow_up_reason: 'Standard AI Tool Submission',
    suggested_call_script: 'Hi, this is from Buildogram. We saw you used our AI tool and wanted to see if you need further assistance.',
    suggested_whatsapp_message: 'Hi! Thank you for using Buildogram\'s AI tools. Let us know if you need any expert assistance.',
    suggested_email_subject: 'Your Buildogram AI Report',
    suggested_email_body: 'Thank you for using our AI tool. Please find your results attached. Let us know if you want to speak with an expert.',
    next_best_action: 'Review submission and contact lead.',
    lead_status: 'new'
  };

  try {
    const data = typeof outputData === 'string' ? JSON.parse(outputData) : outputData;

    switch (toolName) {
      case 'BOQ Review':
      case 'BOQ Analyzer':
        result.recommended_service_url = '/boq-review-chennai';
        result.recommended_ops_team = 'cost_estimation';
        
        const hasHighHiddenCosts = data.hidden_costs_found?.length > 0 || data.risk_score > 70;
        
        if (hasHighHiddenCosts) {
          result.risk_level = 'high';
          result.follow_up_priority = 'same_day';
          result.follow_up_reason = 'High hidden-cost risk detected in BOQ.';
          result.suggested_call_script = 'Hi, we noticed your BOQ has some high-risk hidden costs missing. Our cost estimator can review it with you today to prevent budget overruns.';
          result.suggested_whatsapp_message = 'Hi! We spotted some critical missing items in your BOQ upload that could inflate your budget later. Let\'s get on a quick call today to review it?';
          result.next_best_action = 'Call lead immediately to discuss hidden costs and pitch BOQ review service.';
        } else {
          result.follow_up_reason = 'Standard BOQ review.';
          result.suggested_call_script = 'Hi, we saw you uploaded a BOQ. Do you need a second opinion from our engineering team?';
          result.suggested_whatsapp_message = 'Hi! Your BOQ looks decent, but if you want a detailed line-by-line review, let us know.';
        }
        break;

      case 'Quote Analyzer':
      case 'Contractor Quote Review':
        result.recommended_service_url = '/contractor-quote-review-chennai';
        result.recommended_ops_team = 'cost_estimation';

        const scopeRisk = data.scope_risk === 'High' || data.payment_terms_risk === 'High';
        
        if (scopeRisk) {
          result.risk_level = 'high';
          result.follow_up_priority = 'same_day';
          result.follow_up_reason = 'High payment/scope risk in contractor quote.';
          result.suggested_call_script = 'Hi, the contractor quote you uploaded has some risky payment terms. We strongly suggest holding off on signing until we review it.';
          result.suggested_whatsapp_message = 'Hi! We flagged some risky payment terms in your contractor quote. Please don\'t sign it yet—let\'s discuss it today.';
          result.next_best_action = 'Urgent call to prevent client from signing risky contract.';
        }
        break;

      case 'Structural Audit':
      case 'Structural Audit Intake':
        result.recommended_service_url = '/structural-audit-chennai';
        result.recommended_ops_team = 'structural_engineers';

        const hasCracks = data.issues?.some(i => i.toLowerCase().includes('crack') || i.toLowerCase().includes('corrosion'));
        const isOld = data.building_age && parseInt(data.building_age) > 20;

        if (hasCracks || isOld) {
          result.risk_level = 'urgent';
          result.follow_up_priority = 'urgent';
          result.follow_up_reason = 'Structural safety concern (cracks/corrosion or old building).';
          result.suggested_call_script = 'Hi, we received your structural audit request. Given the issues mentioned, we recommend scheduling an urgent site visit by our structural engineer.';
          result.suggested_whatsapp_message = 'Hi! Based on the photos/description you shared, we recommend a structural engineer visit your site immediately. Can we schedule this?';
          result.next_best_action = 'Schedule urgent site visit for structural safety check.';
        } else {
          result.follow_up_reason = 'General structural audit request.';
          result.suggested_call_script = 'Hi, we received your structural audit request. When would be a good time to schedule a visit?';
          result.suggested_whatsapp_message = 'Hi! We received your structural audit request. Let us know your availability for a site visit.';
        }
        break;

      case 'Survey Requirement':
      case 'Land Survey':
        result.recommended_service_url = '/land-survey-chennai';
        result.recommended_ops_team = 'surveyors';
        
        const isLayout = data.survey_purpose?.toLowerCase().includes('boundary') || 
                         data.survey_purpose?.toLowerCase().includes('layout') ||
                         data.survey_purpose?.toLowerCase().includes('pile marking');
                         
        if (isLayout) {
          result.risk_level = 'medium';
          result.follow_up_priority = 'within_24_hours';
          result.follow_up_reason = 'Boundary/Layout/Pile marking requested.';
          result.suggested_call_script = 'Hi, we see you need a land survey for boundary/layout marking. Our DGPS surveyors can be deployed tomorrow. Shall we schedule?';
          result.suggested_whatsapp_message = 'Hi! Need a land survey for boundary marking? Our expert surveyors are available in Chennai. Let us know your site location.';
          result.next_best_action = 'Confirm site location and dispatch surveyor.';
        }
        break;

      case 'Soil Test':
      case 'Soil Investigation':
        result.recommended_service_url = '/soil-investigation-chennai';
        result.recommended_ops_team = 'geotech';

        const needSoilTest = data.basement_planned || 
                             data.waterlogging_history || 
                             (data.floors_planned && parseInt(data.floors_planned) >= 3);

        if (needSoilTest) {
          result.risk_level = 'high';
          result.follow_up_priority = 'same_day';
          result.follow_up_reason = 'Basement/Waterlogging/G+2 or above planned.';
          result.suggested_call_script = 'Hi, given your plan for a basement/G+2 building, a proper soil test is critical before structural design. Can we schedule a rig deployment?';
          result.suggested_whatsapp_message = 'Hi! Planning a multi-story building or basement? A soil test is mandatory for safe structural design. Shall we schedule a bore test?';
          result.next_best_action = 'Pitch soil testing necessity for structural safety and quote price.';
        }
        break;

      case 'Pile BOQ':
      case 'Piling':
        result.recommended_service_url = '/pile-foundation-contractors-chennai';
        result.recommended_ops_team = 'piling';

        const missingSoil = data.has_soil_report === false;

        if (missingSoil) {
          result.risk_level = 'high';
          result.follow_up_priority = 'same_day';
          result.follow_up_reason = 'Missing soil report for piling design.';
          result.suggested_call_script = 'Hi, we noticed you requested a pile foundation estimate but don\'t have a soil report yet. We must do a soil test first to determine pile depth accurately.';
          result.suggested_whatsapp_message = 'Hi! For an accurate pile foundation estimate, we need a soil report. Since you don\'t have one, shall we arrange a soil test first?';
          result.next_best_action = 'Pitch soil testing before giving a final pile BOQ.';
        }
        break;

      case 'Property Passport':
        result.recommended_service_url = '/property-passport';
        result.recommended_ops_team = 'property_management';

        const nearingHandover = data.handover_status === 'nearing_completion' && data.missing_records?.length > 0;

        if (nearingHandover) {
          result.risk_level = 'medium';
          result.follow_up_priority = 'within_24_hours';
          result.follow_up_reason = 'Nearing handover with missing records.';
          result.suggested_call_script = 'Hi, your property is nearing handover but is missing crucial warranty/structural records. We can help you collect and digitize them before the builder leaves.';
          result.suggested_whatsapp_message = 'Hi! Don\'t accept handover without your complete property records! We noticed you have missing documents. Let us help you secure them.';
          result.next_best_action = 'Assist client in obtaining handover documents from builder.';
        }
        break;

      case 'Material Estimator':
        result.recommended_service_url = '/materials';
        result.recommended_ops_team = 'procurement';

        const unclearSpec = data.brand_preference === 'Unsure' || data.spec_unclear;

        if (unclearSpec) {
          result.risk_level = 'low';
          result.follow_up_priority = 'within_24_hours';
          result.follow_up_reason = 'Brand/Spec unclear.';
          result.suggested_call_script = 'Hi, we saw you generated a material estimate but weren\'t sure about the brands. Our procurement expert can guide you on the best brands for your budget.';
          result.suggested_whatsapp_message = 'Hi! Need help choosing the right material brands for your budget? Our procurement experts can guide you.';
          result.next_best_action = 'Provide material brand consulting and quote supply rates.';
        }
        break;

      default:
        break;
    }
  } catch (e) {
    console.error('Error evaluating follow-up rules:', e);
  }

  return result;
}

async function main() {
  console.log('Starting backfill for ai_tool_submissions...');
  
  const submissions = await prisma.ai_tool_submissions.findMany({
    where: {
      follow_up_reason: null
    }
  });

  console.log(`Found ${submissions.length} submissions to backfill.`);

  for (const sub of submissions) {
    const rules = evaluateFollowUpRules(sub.tool_name, sub.output_data);
    await prisma.ai_tool_submissions.update({
      where: { id: sub.id },
      data: rules
    });
  }

  console.log('Backfill complete!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
