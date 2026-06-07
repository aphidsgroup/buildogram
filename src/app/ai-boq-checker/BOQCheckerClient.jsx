"use client";

import React, { useState } from 'react';
import AIToolShell from '@/components/ai-tools/AIToolShell';
import AIToolResult from '@/components/ai-tools/AIToolResult';
import AIToolLeadCapture from '@/components/ai-tools/AIToolLeadCapture';
import { analyzeBOQText, BOQ_RULES } from '@/lib/ai-tools/toolRules';
import { calculateBOQClarityScore } from '@/lib/ai-tools/toolScoring';

export default function BOQCheckerClient() {
  const [formData, setFormData] = useState({
    projectType: 'residential',
    builtUpArea: '',
    floors: '',
    contractorQuote: '',
    boqText: ''
  });
  
  const [result, setResult] = useState(null);
  const [showLeadCapture, setShowLeadCapture] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAnalyze = (e) => {
    e.preventDefault();
    
    // Run rule engine
    const { vagueFound, missingFound } = analyzeBOQText(formData.boqText);
    const { score, riskLevel } = calculateBOQClarityScore({ 
      missingFound, 
      vagueFound, 
      totalMissingPossible: BOQ_RULES.missingItemsChecklist.length 
    });

    const warnings = [];
    if (missingFound.length > 0) {
      warnings.push(`Missing common line items: ${missingFound.slice(0, 5).join(', ')}${missingFound.length > 5 ? ' and more.' : '.'}`);
    }
    if (vagueFound.length > 0) {
      warnings.push(`Vague specifications detected: "${vagueFound.join('", "')}". This can lead to hidden costs.`);
    }

    if (!formData.boqText || formData.boqText.length < 50) {
       warnings.push("The BOQ text provided is very short. An accurate analysis requires detailed line items.");
    }

    let infoNote = "";
    if (formData.contractorQuote && formData.builtUpArea) {
      const rate = parseInt(formData.contractorQuote) / parseInt(formData.builtUpArea);
      if (!isNaN(rate)) {
        infoNote = `Calculated approximate rate: ₹${Math.round(rate)}/sqft. We recommend comparing this against detailed specifications.`;
      }
    }

    const checklist = [
      "Demand brand names for all finishing materials (Tiles, Plumbing, Electrical).",
      "Ensure earthwork, curing, and debris removal are explicitly included.",
      "Check if GST is included or excluded in the bottom line."
    ];

    setResult({
      score,
      riskLevel,
      warnings,
      checklist,
      infoNote
    });
  };

  return (
    <>
      <AIToolShell 
        title="AI BOQ Checker & Contractor Quote Analyzer" 
        description="Paste your Bill of Quantities (BOQ) text below to instantly detect missing items, vague brand specifications, and hidden costs."
      >
        {!result ? (
          <form onSubmit={handleAnalyze} className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
                <select 
                  name="projectType" 
                  value={formData.projectType} 
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="residential">Residential Home</option>
                  <option value="commercial">Commercial Building</option>
                  <option value="industrial">Industrial / PEB</option>
                  <option value="renovation">Renovation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Built-up Area (sqft)</label>
                <input 
                  type="number" 
                  name="builtUpArea" 
                  value={formData.builtUpArea} 
                  onChange={handleChange}
                  placeholder="e.g. 2000"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Floors</label>
                <input 
                  type="number" 
                  name="floors" 
                  value={formData.floors} 
                  onChange={handleChange}
                  placeholder="e.g. 2"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Quote Amount (₹)</label>
                <input 
                  type="number" 
                  name="contractorQuote" 
                  value={formData.contractorQuote} 
                  onChange={handleChange}
                  placeholder="e.g. 4500000"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Paste BOQ Text</label>
              <textarea 
                name="boqText" 
                value={formData.boqText} 
                onChange={handleChange}
                rows={6}
                required
                placeholder="Paste the line items from your PDF or Excel quote here..."
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Run AI Analysis
            </button>
          </form>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
               <button 
                 onClick={() => setResult(null)}
                 className="text-sm text-blue-600 hover:underline"
               >
                 &larr; Analyze another BOQ
               </button>
            </div>
            <AIToolResult 
              resultData={result} 
              actionLabel="Request Engineer BOQ Review"
              onActionClick={() => setShowLeadCapture(true)}
            />
          </div>
        )}
      </AIToolShell>

      {showLeadCapture && (
        <AIToolLeadCapture 
          toolName="ai-boq-checker"
          inputData={formData}
          outputData={result}
          onCancel={() => setShowLeadCapture(false)}
          onSuccess={() => {
            setShowLeadCapture(false);
            alert("Thanks! Your request has been received. Our engineer will contact you shortly.");
          }}
        />
      )}
    </>
  );
}
