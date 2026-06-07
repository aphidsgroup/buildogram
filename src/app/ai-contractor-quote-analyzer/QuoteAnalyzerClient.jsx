"use client";

import React, { useState } from 'react';
import AIToolShell from '@/components/ai-tools/AIToolShell';
import AIToolResult from '@/components/ai-tools/AIToolResult';
import AIToolLeadCapture from '@/components/ai-tools/AIToolLeadCapture';
import { analyzeQuoteText } from '@/lib/ai-tools/toolRules';

export default function QuoteAnalyzerClient() {
  const [formData, setFormData] = useState({
    projectType: 'residential',
    builtUpArea: '',
    contractorQuote: '',
    quoteText: '',
    scopeClarity: 'vague',
    paymentSchedule: 'advance_heavy',
    warrantyMentioned: 'no'
  });
  
  const [result, setResult] = useState(null);
  const [showLeadCapture, setShowLeadCapture] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAnalyze = (e) => {
    e.preventDefault();
    
    const { unclearFound, paymentRisksFound } = analyzeQuoteText(formData.quoteText);
    
    const warnings = [];
    const checklist = [];
    let riskScore = 0;

    if (unclearFound.length > 0) {
      warnings.push(`Ambiguous terms detected: "${unclearFound.join('", "')}". This allows the contractor to charge extra later.`);
      riskScore += 30;
    }

    if (paymentRisksFound.length > 0 || formData.paymentSchedule === 'advance_heavy') {
      warnings.push(`High payment risk: You should never pay more than 10-15% as an advance. Payment must be linked strictly to milestone completion.`);
      riskScore += 40;
    }

    if (formData.warrantyMentioned === 'no') {
      warnings.push("No warranty mentioned. A standard construction contract should include a 1-year defect liability period (DLP).");
      riskScore += 20;
    }

    if (formData.scopeClarity === 'vague') {
      warnings.push("Lump-sum or vague quotes are extremely risky. Demand an itemized Bill of Quantities (BOQ).");
      riskScore += 30;
    }

    let infoNote = "";
    if (formData.contractorQuote && formData.builtUpArea) {
      const rate = parseInt(formData.contractorQuote) / parseInt(formData.builtUpArea);
      if (!isNaN(rate)) {
        if (rate < 1800) {
           warnings.push(`The quoted rate (approx ₹${Math.round(rate)}/sqft) is unusually low for current Chennai standards. This often indicates poor materials or hidden costs that will be sprung on you later.`);
           riskScore += 20;
        } else if (rate > 2800) {
           infoNote = `The quoted rate (approx ₹${Math.round(rate)}/sqft) is on the premium side. Ensure the material specifications justify this rate.`;
        } else {
           infoNote = `The quoted rate (approx ₹${Math.round(rate)}/sqft) is within the standard market range. The risk lies in the specific inclusions.`;
        }
      }
    }

    checklist.push("Ask for a detailed stage-wise payment schedule.");
    checklist.push("Add a penalty clause for project delays (Liquidated Damages).");
    checklist.push("Include a 5% retention amount to be paid 6 months after handover.");

    let riskLevel = "Low Risk";
    if (riskScore > 60) riskLevel = "Very High Risk";
    else if (riskScore > 30) riskLevel = "Medium Risk";

    setResult({
      score: riskLevel,
      riskLevel,
      warnings,
      checklist,
      infoNote
    });
  };

  return (
    <>
      <AIToolShell 
        title="AI Contractor Quote Analyzer" 
        description="Analyze your builder's quote for hidden risks, unbalanced payment schedules, and missing clauses."
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
                  required
                  placeholder="e.g. 2000"
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
                  required
                  placeholder="e.g. 4500000"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Schedule</label>
                <select 
                  name="paymentSchedule" 
                  value={formData.paymentSchedule} 
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="advance_heavy">Heavy Advance (&gt;20%)</option>
                  <option value="milestone">Milestone Based</option>
                  <option value="not_mentioned">Not Mentioned</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Scope Clarity</label>
                <select 
                  name="scopeClarity" 
                  value={formData.scopeClarity} 
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="vague">Lump-sum / Vague</option>
                  <option value="itemized">Fully Itemized</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Warranty Mentioned?</label>
                <select 
                  name="warrantyMentioned" 
                  value={formData.warrantyMentioned} 
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Paste Quote Highlights or Terms</label>
              <textarea 
                name="quoteText" 
                value={formData.quoteText} 
                onChange={handleChange}
                rows={4}
                placeholder="Paste the terms & conditions or scope of work section here..."
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Analyze Quote Risks
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
              actionLabel="Get Professional Contract Review"
              onActionClick={() => setShowLeadCapture(true)}
            />
          </div>
        )}
      </AIToolShell>

      {showLeadCapture && (
        <AIToolLeadCapture 
          toolName="ai-contractor-quote-analyzer"
          inputData={formData}
          outputData={result}
          onCancel={() => setShowLeadCapture(false)}
          onSuccess={() => {
            setShowLeadCapture(false);
            alert("Thanks! Your quote analysis has been logged. Our engineer will contact you.");
          }}
        />
      )}
    </>
  );
}
