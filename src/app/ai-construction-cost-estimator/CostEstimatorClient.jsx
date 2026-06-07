"use client";

import React, { useState } from 'react';
import AIToolShell from '@/components/ai-tools/AIToolShell';
import AIToolResult from '@/components/ai-tools/AIToolResult';
import AIToolLeadCapture from '@/components/ai-tools/AIToolLeadCapture';

export default function CostEstimatorClient() {
  const [formData, setFormData] = useState({
    cityArea: 'Chennai',
    projectType: 'residential',
    builtUpArea: '',
    floors: '1',
    finishLevel: 'standard',
    structureType: 'rcc',
    basement: 'no',
    soilUncertainty: 'no'
  });
  
  const [result, setResult] = useState(null);
  const [showLeadCapture, setShowLeadCapture] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAnalyze = (e) => {
    e.preventDefault();
    
    const area = parseInt(formData.builtUpArea) || 0;
    
    // Basic rate logic per sqft
    let baseRate = 2000;
    if (formData.finishLevel === 'basic') baseRate -= 300;
    if (formData.finishLevel === 'premium') baseRate += 600;
    
    if (formData.structureType === 'steel') baseRate += 400;
    if (formData.structureType === 'peb') baseRate -= 200;

    const minCost = area * (baseRate - 150);
    const maxCost = area * (baseRate + 250);
    
    let basementAddon = 0;
    if (formData.basement === 'yes') {
      basementAddon = area * 0.3 * 2500; // assuming basement is 30% footprint at 2500/sqft
    }

    const totalMin = minCost + basementAddon;
    const totalMax = maxCost + basementAddon;

    const formatINR = (num) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);

    const score = `₹${formatINR(totalMin)} - ₹${formatINR(totalMax)}`;

    const warnings = [];
    if (formData.soilUncertainty === 'yes') {
      warnings.push("High soil uncertainty: Poor soil (clay/marsh) can increase foundation costs by 15-20%. A soil test is highly recommended.");
    }
    if (formData.basement === 'yes') {
      warnings.push("Basement construction carries a high risk of waterproofing issues. Ensure strict quality control.");
    }

    const checklist = [
      "Get a detailed Architectural Plan before finalizing any budget.",
      "Get 3 itemized quotes from contractors (not lump-sum).",
      "Verify local material prices for cement and steel as they fluctuate."
    ];

    const infoNote = `This is an indicative range based on current Chennai rates for ${formData.finishLevel} finishes. Actual cost depends on structural drawings, soil conditions, and specific material brands.`;

    setResult({
      score,
      riskLevel: "Estimated Range",
      warnings,
      checklist,
      infoNote
    });
  };

  return (
    <>
      <AIToolShell 
        title="AI Construction Cost Estimator" 
        description="Get a preliminary, data-driven cost range for your construction project before engaging contractors."
      >
        {!result ? (
          <form onSubmit={handleAnalyze} className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City / Area</label>
                <input 
                  type="text" 
                  name="cityArea" 
                  value={formData.cityArea} 
                  onChange={handleChange}
                  placeholder="e.g. OMR, Chennai"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
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
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Built-up Area (sqft)</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Floors</label>
                <input 
                  type="number" 
                  name="floors" 
                  value={formData.floors} 
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Finish Level</label>
                <select 
                  name="finishLevel" 
                  value={formData.finishLevel} 
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="basic">Basic (Economy Materials)</option>
                  <option value="standard">Standard (Reputed Brands)</option>
                  <option value="premium">Premium (Luxury Finishes)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Structure Type</label>
                <select 
                  name="structureType" 
                  value={formData.structureType} 
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="rcc">RCC Frame (Standard)</option>
                  <option value="steel">Steel Frame</option>
                  <option value="peb">PEB (Pre-Engineered)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Basement Planned?</label>
                <select 
                  name="basement" 
                  value={formData.basement} 
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Is Soil Condition Unknown/Poor?</label>
                <select 
                  name="soilUncertainty" 
                  value={formData.soilUncertainty} 
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="no">No (Good hard soil known)</option>
                  <option value="yes">Yes (Unknown or near water bodies)</option>
                </select>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Generate Estimate
            </button>
          </form>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
               <button 
                 onClick={() => setResult(null)}
                 className="text-sm text-blue-600 hover:underline"
               >
                 &larr; Calculate another estimate
               </button>
            </div>
            <AIToolResult 
              resultData={result} 
              actionLabel="Get Detailed Estimate from Engineer"
              onActionClick={() => setShowLeadCapture(true)}
            />
          </div>
        )}
      </AIToolShell>

      {showLeadCapture && (
        <AIToolLeadCapture 
          toolName="ai-construction-cost-estimator"
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
