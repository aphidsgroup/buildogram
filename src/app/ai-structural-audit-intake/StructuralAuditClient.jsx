"use client";

import React, { useState } from 'react';
import AIToolShell from '@/components/ai-tools/AIToolShell';
import AIToolResult from '@/components/ai-tools/AIToolResult';
import AIToolLeadCapture from '@/components/ai-tools/AIToolLeadCapture';
import { calculateStructuralAuditUrgency } from '@/lib/ai-tools/toolScoring';

export default function StructuralAuditClient() {
  const [formData, setFormData] = useState({
    buildingAge: '',
    crackTypes: 'none',
    waterLeakage: 'no',
    foundationType: 'unknown',
    previousRepairs: 'no',
    concernsText: ''
  });
  
  const [result, setResult] = useState(null);
  const [showLeadCapture, setShowLeadCapture] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAnalyze = (e) => {
    e.preventDefault();
    
    const { score, urgency } = calculateStructuralAuditUrgency(formData);
    
    const warnings = [];
    const checklist = [];

    if (formData.crackTypes === 'diagonal' || formData.crackTypes === 'horizontal') {
      warnings.push("Diagonal or horizontal cracks often indicate structural settlement or column stress. A physical audit is required urgently.");
    }
    
    if (formData.waterLeakage === 'active') {
      warnings.push("Active water leakage can rust the reinforcement steel (rebar), leading to concrete spalling and severe structural weakness over time.");
    }

    if (parseInt(formData.buildingAge) > 20) {
      warnings.push("Buildings over 20 years old in Chennai's coastal environment are highly susceptible to chloride-induced corrosion.");
    }

    checklist.push("Take clear, well-lit photos of all cracks, spalling concrete, and damp patches before the engineer arrives.");
    checklist.push("Gather any available structural drawings or previous repair invoices.");
    if (formData.waterLeakage !== 'no') {
      checklist.push("Track if the leakage increases during rains or is constant (plumbing issue).");
    }

    setResult({
      score: score,
      riskLevel: urgency,
      warnings,
      checklist,
      infoNote: "This initial assessment helps our structural engineers prepare the right diagnostic tools (e.g., rebound hammer, rebar locator) for your site visit."
    });
  };

  return (
    <>
      <AIToolShell 
        title="AI Structural Audit Intake" 
        description="Describe your building's condition. Our AI will assess the urgency and prepare a briefing for our structural engineers."
      >
        {!result ? (
          <form onSubmit={handleAnalyze} className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Building Age (Years)</label>
                <input 
                  type="number" 
                  name="buildingAge" 
                  value={formData.buildingAge} 
                  onChange={handleChange}
                  required
                  placeholder="e.g. 15"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type of Cracks Noticed</label>
                <select 
                  name="crackTypes" 
                  value={formData.crackTypes} 
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="none">No Cracks</option>
                  <option value="hairline">Fine Hairline Cracks</option>
                  <option value="vertical">Vertical Cracks</option>
                  <option value="horizontal">Horizontal Cracks (Risky)</option>
                  <option value="diagonal">Diagonal/Stair-step (High Risk)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Water Leakage / Dampness?</label>
                <select 
                  name="waterLeakage" 
                  value={formData.waterLeakage} 
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="no">No</option>
                  <option value="past">Past / Fixed</option>
                  <option value="active">Active Leakage / Peeling Paint</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Have you done structural repairs before?</label>
                <select 
                  name="previousRepairs" 
                  value={formData.previousRepairs} 
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Describe Your Main Concerns</label>
              <textarea 
                name="concernsText" 
                value={formData.concernsText} 
                onChange={handleChange}
                rows={4}
                required
                placeholder="e.g. Roof is leaking during monsoon, or column in the parking lot has exposed rusted steel..."
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Analyze Urgency
            </button>
          </form>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
               <button 
                 onClick={() => setResult(null)}
                 className="text-sm text-blue-600 hover:underline"
               >
                 &larr; Start new assessment
               </button>
            </div>
            <AIToolResult 
              resultData={result} 
              actionLabel="Schedule Site Audit with Engineer"
              onActionClick={() => setShowLeadCapture(true)}
            />
          </div>
        )}
      </AIToolShell>

      {showLeadCapture && (
        <AIToolLeadCapture 
          toolName="ai-structural-audit-intake"
          inputData={formData}
          outputData={result}
          onCancel={() => setShowLeadCapture(false)}
          onSuccess={() => {
            setShowLeadCapture(false);
            alert("Thanks! Your audit request has been logged. Our engineering team will contact you to schedule a site visit.");
          }}
        />
      )}
    </>
  );
}
