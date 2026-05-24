import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { generateCostEstimate } from '@/lib/ai';

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name, phone, email, city, locality, plot_area_sqft, built_up_area_sqft, floors,
      construction_type, spec_level, parking_required, basement_required, lift_required,
      interior_scope, expected_start, message
    } = body;

    // 1. Attempt LLM AI Generation
    const aiRes = await generateCostEstimate(body);
    let outputJson;

    if (aiRes.success) {
      outputJson = aiRes.data;
      outputJson.provider_used = aiRes.provider_used;
      outputJson.model_used = aiRes.model_used;
      outputJson.fallback_used = false;
    } else {
      // 2. Deterministic Fallback Logic (Mocking AI since no key configured or failed)
      const area = Number(plot_area_sqft) || 1200;
      
      // Base rates
      let baseRate = 2200; // standard
      if (spec_level === 'basic') baseRate = 1750;
      if (spec_level === 'premium') baseRate = 2850;
      if (spec_level === 'luxury') baseRate = 3500;

      // Floor multipliers
      let floorMult = 1.0;
      if (floors === 'G+1') floorMult = 1.8;
      if (floors === 'G+2') floorMult = 2.6;
      if (floors === 'G+3') floorMult = 3.4;

      let totalBuiltUp = Number(built_up_area_sqft) || (area * floorMult);
      let baseCost = totalBuiltUp * baseRate;

      // Additions
      if (basement_required === 'yes') baseCost += (area * 1500); // Rough basement cost
      if (lift_required === 'yes') baseCost += 600000; // Rough lift cost
      if (parking_required === 'yes') baseCost += 150000; // Parking area prep

      const minCost = Math.round(baseCost * 0.90);
      const maxCost = Math.round(baseCost * 1.15);

      const assumptions = [
        `Assumed total built-up area: ${totalBuiltUp} sqft.`,
        `Specification level chosen: ${spec_level}.`,
        basement_required === 'yes' ? 'Included approximate cost for basement structure.' : 'No basement assumed.',
        lift_required === 'yes' ? 'Included estimated lift installation (₹6L).' : 'No lift provisions.',
        interior_scope === 'yes' ? 'Note: Interiors are generally excluded from pure structural base rates.' : ''
      ].filter(Boolean);

      const majorCostDrivers = ['Structural materials (Steel/Cement)', 'Finishes (Flooring/Plumbing)'];
      if (basement_required === 'yes') majorCostDrivers.push('Basement excavation & retaining walls');
      if (lift_required === 'yes') majorCostDrivers.push('Elevator equipment');

      outputJson = {
        estimated_min: minCost,
        estimated_max: maxCost,
        assumptions,
        missing_inputs: ['Soil condition report', 'Detailed architectural drawings', 'Local approval costs'],
        major_cost_drivers: majorCostDrivers,
        recommended_next_step: 'Book a BOQ Consultation',
        disclaimer: "This is an approximate educational estimate based on the information provided. It is not a final quotation. Final cost depends on drawings, soil condition, specifications, materials, labour, approvals and site conditions. A detailed BOQ is required for accurate pricing.",
        confidence_level: 'Medium',
        provider_used: 'deterministic_fallback',
        fallback_used: true,
        error_message: aiRes.error || 'No API Key'
      };
    }

    // 2. Insert into ai_requests
    const [aiReq] = await sql`
      INSERT INTO ai_requests (
        module_name, input_json, output_json, prompt_version, risk_level, status
      ) VALUES (
        'cost_estimator', ${JSON.stringify(body)}, ${JSON.stringify(outputJson)}, '1.0', 'medium', 'generated'
      )
      RETURNING id
    `;

    // 3. Create CRM Lead
    const metadata = {
      estimator_inputs: body,
      estimated_min: outputJson.estimated_min,
      estimated_max: outputJson.estimated_max,
      specification_level: spec_level,
      built_up_area: Number(built_up_area_sqft) || (Number(plot_area_sqft) * 1.0),
      ai_request_id: aiReq.id,
      estimate_status: 'generated'
    };

    const [lead] = await sql`
      INSERT INTO leads (
        name, phone, email, city, locality, plot_area_sqft, floors, spec_level, 
        lead_type, source_page, status, message, metadata
      ) VALUES (
        ${name}, ${phone}, ${email || null}, ${city || 'Chennai'}, ${locality || null}, 
        ${area}, ${floors}, ${spec_level}, 
        'construction', '/cost-estimator', 'new', ${message || null}, ${JSON.stringify(metadata)}
      )
      RETURNING id
    `;

    // Link lead back to ai_request
    await sql`
      UPDATE ai_requests SET related_lead_id = ${lead.id} WHERE id = ${aiReq.id}
    `;

    return NextResponse.json({ success: true, estimate: outputJson, lead_id: lead.id });
  } catch (err) {
    console.error('Cost estimator error:', err);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
