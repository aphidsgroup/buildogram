"use client";

import React, { useState } from 'react';
import AIToolShell from '@/components/ai-tools/AIToolShell';
import AIToolResult from '@/components/ai-tools/AIToolResult';
import AIToolLeadCapture from '@/components/ai-tools/AIToolLeadCapture';
import { analyzeBOQText } from '@/lib/ai-tools/toolRules';

export default function PileFoundationClient() {
  const [formData, setFormData] = useState({
    pileType: 'bored_cast_in_situ',
    pileDiameter: '',
    soilReportAvailable: 'no',
    boqText: ''
  });
  
  const [result, setResult] = useState(null);
  const [showLeadCapture, setShowLeadCapture] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAnalyze = (e) => {
    e.preventDefault();
    
    const { vagueFound, missingFound } = analyzeBOQText(formData.boqText);
    
    const warnings = [];
    const checklist = [];

    if (vagueFound.length > 0) {
      warnings.push(`Vague specifications detected: "${vagueFound.join('", "')}".`);
    }

    const textLower = formData.boqText.toLowerCase();
    
    if (!textLower.includes("mobilization") && !textLower.includes("mobilisation")) {
      warnings.push("No mobilization/demobilization charges found. Piling rigs cost a lot to move; contractors often add this as a massive 'extra' later.");
    }
    
    if (!textLower.includes("empty bore")) {
      warnings.push("Empty boring charges are not explicitly mentioned. You will be charged for drilling the top soil even where concrete isn't poured.");
    }

    if (!textLower.includes("chisel") && !textLower.includes("rock")) {
      warnings.push("No rock chiseling rate mentioned. If they hit hard rock early, they will stop work and demand a new (often exorbitant) rate per hour for chiseling.");
    }

    if (formData.soilReportAvailable === 'no') {
      warnings.push("A pile foundation BOQ without a soil test report is pure guesswork. Rates will change drastically on-site.");
      checklist.push("Get a soil test done before finalizing this piling contract.");
    }

    checklist.push("Ensure steel reinforcement (rebar) for the pile cage is clearly separated from concrete rates.");
    checklist.push("Check if pile load testing (Routine & Initial) costs are included.");

    let riskLevel = "Medium Risk";
    if (warnings.length > 2) riskLevel = "High Risk";

    setResult({
      score: riskLevel,
      riskLevel,
      warnings,
      checklist,
      infoNote: "Pile foundations are notorious for hidden costs because the work is underground. A rock-solid contract is essential."
    });
  };

  return (
    <>
      <AIToolShell 
        title="AI Pile Foundation BOQ Checker" 
        description="Piling quotes often hide massive 'extra charges'. Paste your piling BOQ below to spot missing line items."
      >
        {!result ? (
          <form onSubmit={handleAnalyze} className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type of Pile</label>
                <select 
                  name="pileType" 
                  value={formData.pileType} 
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="bored_cast_in_situ">Bored Cast-in-Situ (Standard)</option>
                  <option value="driven">Driven Piles</option>
                  <option value="dmc">DMC (Direct Mud Circulation)</option>
                  <option value="rotary">Rotary Rig Piling</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Proposed Diameter (mm)</label>
                <input 
                  type="number" 
                  name="pileDiameter" 
                  value={formData.pileDiameter} 
                  onChange={handleChange}
                  placeholder="e.g. 400"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Has a Geotechnical Soil Test been completed?</label>
                <select 
                  name="soilReportAvailable" 
                  value={formData.soilReportAvailable} 
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Paste Piling BOQ Text</label>
              <textarea 
                name="boqText" 
                value={formData.boqText} 
                onChange={handleChange}
                rows={5}
                required
                placeholder="Paste the line items from your piling contractor's quote..."
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Analyze Piling Quote
            </button>
          </form>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
               <button 
                 onClick={() => setResult(null)}
                 className="text-sm text-blue-600 hover:underline"
               >
                 &larr; Analyze another quote
               </button>
            </div>
            <AIToolResult 
              resultData={result} 
              actionLabel="Get Expert Piling Review"
              onActionClick={() => setShowLeadCapture(true)}
            />
          </div>
        )}
      </AIToolShell>

      {showLeadCapture && (
        <AIToolLeadCapture 
          toolName="ai-pile-foundation-boq-checker"
          inputData={formData}
          outputData={result}
          onCancel={() => setShowLeadCapture(false)}
          onSuccess={() => {
            setShowLeadCapture(false);
            alert("Thanks! Your piling quote has been logged. Our structural engineer will contact you.");
          }}
        />
      )}
    </>
  );
}
