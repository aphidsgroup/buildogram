"use client";

import React, { useState } from 'react';
import AIToolShell from '@/components/ai-tools/AIToolShell';
import AIToolResult from '@/components/ai-tools/AIToolResult';
import AIToolLeadCapture from '@/components/ai-tools/AIToolLeadCapture';

export default function SurveyRequirementClient() {
  const [formData, setFormData] = useState({
    plotArea: '',
    topography: 'flat',
    purpose: 'boundary_fixing',
    treesPresent: 'no',
    waterBodiesNearby: 'no'
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
    let requiredSurvey = "Standard Total Station Survey";
    
    if (formData.purpose === 'cmda_approval') {
      checklist.push("FMB (Field Measurement Book) sketch mapping is mandatory.");
      checklist.push("Ensure road width and setback measurements are accurately marked.");
    }

    if (formData.topography === 'sloped' || formData.topography === 'hilly') {
      requiredSurvey = "Topographical Survey with Contour Mapping";
      warnings.push("Sloped terrain requires detailed contour mapping (usually at 0.5m intervals) to plan retaining walls and foundation depths accurately.");
      checklist.push("Request a 3D surface model from the surveyor.");
    }

    if (parseInt(formData.plotArea) > 43560) { // > 1 Acre
      requiredSurvey = "DGPS + Total Station Survey";
      warnings.push("For large parcels (>1 Acre), DGPS (Differential Global Positioning System) is required to establish accurate global coordinates before using a Total Station.");
    }

    if (formData.treesPresent === 'yes') {
      checklist.push("Instruct the surveyor to mark the exact girth and species of all trees, as this impacts building footprint planning.");
    }

    if (formData.waterBodiesNearby === 'yes') {
      warnings.push("Proximity to water bodies means you must establish the High Flood Level (HFL) and check buffer zone regulations.");
      checklist.push("Get the surveyor to mark the distance to the water body boundary.");
    }

    setResult({
      score: "Scope Defined",
      riskLevel: requiredSurvey,
      warnings,
      checklist,
      infoNote: "Hand this exact scope to your surveyor. Make sure they provide deliverables in AutoCAD (.dwg) and PDF formats."
    });
  };

  return (
    <>
      <AIToolShell 
        title="AI Survey Requirement Builder" 
        description="Not sure what kind of land survey you need? Define your project and get a professional surveyor brief."
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Topography</label>
                <select 
                  name="topography" 
                  value={formData.topography} 
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="flat">Flat / Level</option>
                  <option value="sloped">Sloped</option>
                  <option value="hilly">Highly Uneven / Hilly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Purpose</label>
                <select 
                  name="purpose" 
                  value={formData.purpose} 
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="boundary_fixing">Fixing Boundaries (Fencing)</option>
                  <option value="cmda_approval">CMDA / DTCP Building Approval</option>
                  <option value="architectural">Architectural Design / Planning</option>
                  <option value="subdivision">Land Subdivision</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Are there large trees on site?</label>
                <select 
                  name="treesPresent" 
                  value={formData.treesPresent} 
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Are there water bodies (lakes/canals) nearby?</label>
                <select 
                  name="waterBodiesNearby" 
                  value={formData.waterBodiesNearby} 
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Generate Survey Scope
            </button>
          </form>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
               <button 
                 onClick={() => setResult(null)}
                 className="text-sm text-blue-600 hover:underline"
               >
                 &larr; Start new scope builder
               </button>
            </div>
            <AIToolResult 
              resultData={result} 
              actionLabel="Book a Verified Land Surveyor"
              onActionClick={() => setShowLeadCapture(true)}
            />
          </div>
        )}
      </AIToolShell>

      {showLeadCapture && (
        <AIToolLeadCapture 
          toolName="ai-survey-requirement-builder"
          inputData={formData}
          outputData={result}
          onCancel={() => setShowLeadCapture(false)}
          onSuccess={() => {
            setShowLeadCapture(false);
            alert("Thanks! Your survey requirement has been logged. Our surveying partner will contact you shortly.");
          }}
        />
      )}
    </>
  );
}
