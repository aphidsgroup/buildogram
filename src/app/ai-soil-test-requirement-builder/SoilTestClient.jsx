"use client";

import React, { useState } from 'react';
import AIToolShell from '@/components/ai-tools/AIToolShell';
import AIToolResult from '@/components/ai-tools/AIToolResult';
import AIToolLeadCapture from '@/components/ai-tools/AIToolLeadCapture';

export default function SoilTestClient() {
  const [formData, setFormData] = useState({
    plotArea: '',
    floors: '',
    soilType: 'unknown',
    waterTable: 'unknown',
    nearbyStructures: 'far'
  });
  
  const [result, setResult] = useState(null);
  const [showLeadCapture, setShowLeadCapture] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAnalyze = (e) => {
    e.preventDefault();

    const warnings = [];
    const checklist = [];
    
    let boreholes = 2;
    let depth = "10 to 15 meters";
    let riskLevel = "Standard Protocol";

    const plotSqft = parseInt(formData.plotArea) || 0;
    const numFloors = parseInt(formData.floors) || 1;

    if (plotSqft > 2400) boreholes = 3;
    if (plotSqft > 4800) boreholes = 4;

    if (numFloors > 3) {
      depth = "15 to 25 meters (or until hard rock is hit)";
    }
    if (numFloors > 5) {
      warnings.push("For high-rise structures (G+5 and above), deep boreholes and advanced SPT (Standard Penetration Tests) are absolutely mandatory.");
      riskLevel = "High-Rise Protocol";
    }

    if (formData.soilType === 'clay' || formData.soilType === 'marshy') {
      warnings.push("Clay or marshy soil (like in OMR/ECR areas) has low bearing capacity. Undisturbed sampling (UDS) must be taken to test for consolidation and swelling.");
      depth = "Until hard strata is reached (potentially > 20m)";
      riskLevel = "Poor Soil Protocol";
    }

    if (formData.waterTable === 'high') {
      warnings.push("High water table detected. The lab must test for chlorides and sulphates in the groundwater to determine the right cement type (e.g., SRC cement) to prevent foundation rot.");
    }

    if (formData.nearbyStructures === 'close') {
      checklist.push("Inform the testing agency about adjacent compound walls/buildings to ensure drilling vibrations do not cause damage.");
    }

    checklist.push(`Request exactly ${boreholes} boreholes at opposite corners of the plot.`);
    checklist.push(`Instruct drilling up to ${depth}.`);
    checklist.push("Ensure the final report includes the Safe Bearing Capacity (SBC) recommendation for both isolated and pile foundations.");

    setResult({
      score: "Geotechnical Scope Ready",
      riskLevel,
      warnings,
      checklist,
      infoNote: "Give this exact scope to your geotechnical lab. Do not let them arbitrarily decide borehole depth or numbers on-site."
    });
  };

  return (
    <>
      <AIToolShell 
        title="AI Soil Test Requirement Builder" 
        description="Determine exactly how many boreholes and what depth your soil test requires based on your specific building plan."
      >
        {!result ? (
          <form onSubmit={handleAnalyze} className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plot Area (sqft)</label>
                <input 
                  type="number" 
                  name="plotArea" 
                  value={formData.plotArea} 
                  onChange={handleChange}
                  required
                  placeholder="e.g. 2400"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Proposed Number of Floors (e.g., G+2 = 3)</label>
                <input 
                  type="number" 
                  name="floors" 
                  value={formData.floors} 
                  onChange={handleChange}
                  required
                  placeholder="e.g. 3"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Known Soil Type (if any)</label>
                <select 
                  name="soilType" 
                  value={formData.soilType} 
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="unknown">Unknown</option>
                  <option value="hard">Hard / Rocky</option>
                  <option value="sandy">Sandy (Coastal)</option>
                  <option value="clay">Clay / Marshy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Groundwater Table</label>
                <select 
                  name="waterTable" 
                  value={formData.waterTable} 
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="unknown">Unknown</option>
                  <option value="high">High (Strikes water &lt; 10ft)</option>
                  <option value="low">Deep (Dry)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Proximity to Neighboring Buildings</label>
                <select 
                  name="nearbyStructures" 
                  value={formData.nearbyStructures} 
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="far">Plenty of clearance</option>
                  <option value="close">Walls touching or very close (&lt; 2ft)</option>
                </select>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Generate Soil Test Scope
            </button>
          </form>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
               <button 
                 onClick={() => setResult(null)}
                 className="text-sm text-blue-600 hover:underline"
               >
                 &larr; Calculate for another plot
               </button>
            </div>
            <AIToolResult 
              resultData={result} 
              actionLabel="Book a Verified Soil Test"
              onActionClick={() => setShowLeadCapture(true)}
            />
          </div>
        )}
      </AIToolShell>

      {showLeadCapture && (
        <AIToolLeadCapture 
          toolName="ai-soil-test-requirement-builder"
          inputData={formData}
          outputData={result}
          onCancel={() => setShowLeadCapture(false)}
          onSuccess={() => {
            setShowLeadCapture(false);
            alert("Thanks! Your soil test requirement has been logged. Our geotechnical partner will contact you shortly.");
          }}
        />
      )}
    </>
  );
}
