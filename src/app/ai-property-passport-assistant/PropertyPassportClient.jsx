"use client";

import React, { useState } from 'react';
import AIToolShell from '@/components/ai-tools/AIToolShell';
import AIToolResult from '@/components/ai-tools/AIToolResult';
import AIToolLeadCapture from '@/components/ai-tools/AIToolLeadCapture';

export default function PropertyPassportClient() {
  const [formData, setFormData] = useState({
    propertyStage: 'under_construction',
    propertyType: 'independent_house',
    handoverDate: ''
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
    let score = "Passport Initialized";
    
    // Core structural docs
    checklist.push("Final As-Built Architectural Drawings (not just the initial approval drawings)");
    checklist.push("Structural Engineering Drawings (Foundation, Column, Beam, Slab details)");
    checklist.push("Plumbing & Electrical Concealed Route Maps (Critical for future repairs)");

    if (formData.propertyStage === 'under_construction') {
      warnings.push("Since you are under construction, mandate the contractor to photograph all concealed plumbing/electrical lines before they are plastered over. These photos are a vital part of the Property Passport.");
      checklist.push("Soil Test Report & Pile Foundation Logs (if applicable)");
      checklist.push("Concrete Cube Test Certificates for every major slab pour");
      checklist.push("Steel (TMT) Manufacturer Test Certificates");
    }

    if (formData.propertyStage === 'completed' || formData.propertyStage === 'buying_completed') {
      warnings.push("For completed properties, it is very hard to verify what is inside the walls or under the ground without Non-Destructive Testing (NDT).");
      checklist.push("Request the CMDA/DTCP Completion Certificate");
      checklist.push("Waterproofing Guarantees (usually 5 to 10 years for terrace/bathrooms)");
      checklist.push("Anti-termite Treatment Warranty Certificate");
    }

    if (formData.propertyType === 'apartment') {
      checklist.push("NOCs from Fire Department & Lift Inspector");
      checklist.push("Association Handover Document & Corpus Fund Receipt");
    }

    setResult({
      score,
      riskLevel: "Checklist Ready",
      warnings,
      checklist,
      infoNote: "A Buildogram Property Passport is a complete digital twin of your physical asset's documentation, increasing its resale value and making maintenance foolproof."
    });
  };

  return (
    <>
      <AIToolShell 
        title="AI Property Passport Assistant" 
        description="Don't take handover of a house without these documents. Generate your custom Property Passport checklist."
      >
        {!result ? (
          <form onSubmit={handleAnalyze} className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Stage</label>
                <select 
                  name="propertyStage" 
                  value={formData.propertyStage} 
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="planning">Planning Phase</option>
                  <option value="under_construction">Currently Under Construction</option>
                  <option value="completed">Recently Completed (Self-built)</option>
                  <option value="buying_completed">Buying a Completed Property</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                <select 
                  name="propertyType" 
                  value={formData.propertyType} 
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="independent_house">Independent House / Villa</option>
                  <option value="apartment">Apartment Flat</option>
                  <option value="commercial">Commercial Building</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Handover Date (Approximate)</label>
                <input 
                  type="month" 
                  name="handoverDate" 
                  value={formData.handoverDate} 
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Generate Document Checklist
            </button>
          </form>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
               <button 
                 onClick={() => setResult(null)}
                 className="text-sm text-blue-600 hover:underline"
               >
                 &larr; Start over
               </button>
            </div>
            <AIToolResult 
              resultData={result} 
              actionLabel="Create Official Property Passport"
              onActionClick={() => setShowLeadCapture(true)}
            />
          </div>
        )}
      </AIToolShell>

      {showLeadCapture && (
        <AIToolLeadCapture 
          toolName="ai-property-passport-assistant"
          inputData={formData}
          outputData={result}
          onCancel={() => setShowLeadCapture(false)}
          onSuccess={() => {
            setShowLeadCapture(false);
            alert("Thanks! Your checklist has been saved. Our team will contact you to help setup your digital Property Passport.");
          }}
        />
      )}
    </>
  );
}
