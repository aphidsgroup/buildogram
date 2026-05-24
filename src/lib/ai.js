export async function generateCostEstimate(input) {
  const provider = process.env.AI_PROVIDER;
  const apiKey = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL || 'gpt-4o';
  
  if (!provider || provider === 'none' || !apiKey) {
    return { success: false, error: 'No AI provider configured' };
  }

  const prompt = `
    You are an expert construction cost estimator for Buildogram in India (Chennai focus).
    You are providing an ADVISORY ONLY educational estimate. No final engineering/legal certification.
    You must output strictly in valid JSON format matching this schema:
    {
      "estimated_min": number (in INR),
      "estimated_max": number (in INR),
      "assumptions": [string],
      "missing_inputs": [string],
      "major_cost_drivers": [string],
      "recommended_next_step": string,
      "disclaimer": string (must state it is an educational estimate, not final),
      "confidence_level": string (e.g. "Low", "Medium", "High")
    }

    Do not invent project details. Mark missing information clearly.

    Client Input:
    ${JSON.stringify(input)}
  `;

  try {
    const rawOutput = await callLLM(provider, apiKey, model, prompt);
    const parsed = parseJsonStrict(rawOutput);
    
    if (!parsed || !parsed.estimated_min || !parsed.estimated_max) {
      throw new Error('Invalid JSON structure returned by LLM');
    }

    return { 
      success: true, 
      data: parsed, 
      provider_used: provider, 
      model_used: model,
      fallback_used: false 
    };
  } catch (error) {
    console.error('LLM generation error:', error);
    return { success: false, error: error.message };
  }
}

export async function generateBOQDraft(input) {
  const provider = process.env.AI_PROVIDER;
  const apiKey = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL || 'gpt-4o';
  
  if (!provider || provider === 'none' || !apiKey) {
    return { success: false, error: 'No AI provider configured' };
  }

  const prompt = `
    You are an expert civil engineer and quantity surveyor reviewing a contractor's quote or BOQ for Buildogram.
    You are providing an INTERNAL ADVISORY review for Ops to look at before talking to the client.
    You must output strictly in valid JSON format matching this schema:
    {
      "summary": string,
      "items_clearly_included": [string],
      "missing_or_unclear_items": [string],
      "specification_gaps": [string],
      "cost_escalation_risks": [string],
      "payment_milestone_concerns": [string],
      "material_quality_concerns": [string],
      "questions_to_ask_contractor": [string],
      "buildogram_recommendation": string,
      "next_step": string,
      "disclaimer": string (must state this is an advisory internal draft requiring human professional review),
      "confidence_level": string (e.g. "Low", "Medium", "High")
    }

    Do not invent details not present in the BOQ text. If the text is short, point out all the missing standard items (like soil testing, EB line, specific steel grades).

    Input BOQ/Quote Text:
    ${input.boq_text}

    Lead Metadata Context:
    ${JSON.stringify(input.lead_metadata)}
  `;

  try {
    const rawOutput = await callLLM(provider, apiKey, model, prompt);
    const parsed = parseJsonStrict(rawOutput);
    
    if (!parsed || !parsed.summary) {
      throw new Error('Invalid JSON structure returned by LLM');
    }

    return { 
      success: true, 
      data: parsed, 
      provider_used: provider, 
      model_used: model,
      fallback_used: false 
    };
  } catch (error) {
    console.error('LLM generation error:', error);
    return { success: false, error: error.message };
  }
}

export async function generateCompletion(systemPrompt, userPrompt) {
  const provider = process.env.AI_PROVIDER;
  const apiKey = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL || 'gpt-4o';
  
  if (!provider || provider === 'none' || !apiKey) {
    throw new Error('No AI provider configured');
  }
  
  const combinedPrompt = `${systemPrompt}\n\n${userPrompt}`;
  const rawOutput = await callLLM(provider, apiKey, model, combinedPrompt);
  
  // Clean up markdown code blocks if LLM adds them
  let clean = rawOutput.trim();
  if (clean.startsWith('```json')) {
    clean = clean.substring(7);
    if (clean.endsWith('```')) clean = clean.substring(0, clean.length - 3);
  } else if (clean.startsWith('```')) {
    clean = clean.substring(3);
    if (clean.endsWith('```')) clean = clean.substring(0, clean.length - 3);
  }
  return clean;
}

// -------------------------------------------------------------
// Helpers
// -------------------------------------------------------------

async function callLLM(provider, apiKey, model, prompt) {
  // Simple fetch wrappers for OpenAI and Gemini APIs
  if (provider === 'openai') {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      })
    });
    if (!res.ok) throw new Error(`OpenAI API error: ${res.statusText}`);
    const data = await res.json();
    return data.choices[0].message.content;
  }
  
  if (provider === 'gemini') {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });
    if (!res.ok) throw new Error(`Gemini API error: ${res.statusText}`);
    const data = await res.json();
    return data.candidates[0].content.parts[0].text;
  }

  throw new Error(`Unsupported provider: ${provider}`);
}

function parseJsonStrict(str) {
  try {
    // Sometimes LLMs wrap json in markdown blocks
    let clean = str.trim();
    if (clean.startsWith('```json')) {
      clean = clean.substring(7);
      if (clean.endsWith('```')) clean = clean.substring(0, clean.length - 3);
    } else if (clean.startsWith('```')) {
      clean = clean.substring(3);
      if (clean.endsWith('```')) clean = clean.substring(0, clean.length - 3);
    }
    return JSON.parse(clean);
  } catch (e) {
    return null;
  }
}
