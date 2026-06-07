"use client";

import React, { useState } from 'react';
import AIToolShell from '@/components/ai-tools/AIToolShell';
import AIToolResult from '@/components/ai-tools/AIToolResult';
import AIToolLeadCapture from '@/components/ai-tools/AIToolLeadCapture';

export default function MaterialEstimatorClient() {
  const [formData, setFormData] = useState({
    materialType: 'cement',
    quantityOrArea: '',
    projectStage: 'foundation',
    preferredBrands: '',
    deliveryArea: '',
    boqAvailable: 'no'
  });
  
  const [result, setResult] = useState(null);
  const [showLeadCapture, setShowLeadCapture] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAnalyze = (e) => {
    e.preventDefault();

    const checklist = [];
    const warnings = [];

    if (formData.materialType === 'cement') {
      checklist.push("Check OPC vs PPC grades (OPC 53 is typically for slabs/columns, PPC for plastering).");
      checklist.push("Ensure bags are not older than 90 days from the date of manufacturing.");
    } else if (formData.materialType === 'steel') {
      checklist.push("Verify Fe500D or Fe550D grading on the rods.");
      checklist.push("Ensure test certificates are provided with delivery.");
    } else {
      checklist.push(`Request a physical sample of ${formData.materialType} before bulk order.`);
    }

    if (formData.boqAvailable === 'no') {
      warnings.push("Without a BOQ, material wastage can exceed 10-15%. Get a detailed estimate first.");
    }

    checklist.push("Compare minimum 3 distributor quotes including unloading charges.");
    
    if (formData.projectStage === 'finishing' && formData.materialType === 'cement') {
      warnings.push("For finishing, ensure you order PPC cement for better workability and fewer shrinkage cracks.");
    }

    setResult({
      score: "Ready for Procurement",
      riskLevel: formData.boqAvailable === 'no' ? "Medium Risk (No BOQ)" : "Low Risk",
      warnings,
      checklist,
      infoNote: `Material rates for ${formData.materialType} fluctuate weekly. Use this checklist to lock in the best terms.`
    });
  };

  return (
    <>
      <AIToolShell 
        title="AI Material Estimator & Procurement Guide" 
        description="Plan your material purchases. Get requirements, brand checks, and delivery verification lists."
      >
        {!result ? (
          <form onSubmit={handleAnalyze} className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Material</label>
                <select 
                  name="materialType" 
                  value={formData.materialType} 
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="cement">Cement</option>
                  <option value="steel">TMT Steel Rebar</option>
                  <option value="sand">M-Sand / P-Sand</option>
                  <option value="bricks">Bricks / Blocks</option>
                  <option value="tiles">Tiles / Granite</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Built-up Area / Quantity</label>
                <input 
                  type="text" 
                  name="quantityOrArea" 
                  value={formData.quantityOrArea} 
                  onChange={handleChange}
                  placeholder="e.g. 2000 sqft or 500 bags"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Stage</label>
                <select 
                  name="projectStage" 
                  value={formData.projectStage} 
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="foundation">Foundation / Piling</option>
                  <option value="superstructure">Superstructure (Columns/Slabs)</option>
                  <option value="brickwork">Brickwork & Plastering</option>
                  <option value="finishing">Finishing (Flooring/Painting)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Brands</label>
                <input 
                  type="text" 
                  name="preferredBrands" 
                  value={formData.preferredBrands} 
                  onChange={handleChange}
                  placeholder="e.g. Ramco, Tata Tiscon"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Area (City/Pincode)</label>
                <input 
                  type="text" 
                  name="deliveryArea" 
                  value={formData.deliveryArea} 
                  onChange={handleChange}
                  placeholder="e.g. Adyar, Chennai"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Do you have a detailed BOQ?</label>
                <select 
                  name="boqAvailable" 
                  value={formData.boqAvailable} 
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
              Generate Procurement Checklist
            </button>
          </form>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
               <button 
                 onClick={() => setResult(null)}
                 className="text-sm text-blue-600 hover:underline"
               >
                 &larr; Plan another material
               </button>
            </div>
            <AIToolResult 
              resultData={result} 
              actionLabel="Request Wholesale Material Quote"
              onActionClick={() => setShowLeadCapture(true)}
            />
          </div>
        )}
      </AIToolShell>

      {showLeadCapture && (
        <AIToolLeadCapture 
          toolName="ai-material-estimator"
          inputData={formData}
          outputData={result}
          onCancel={() => setShowLeadCapture(false)}
          onSuccess={() => {
            setShowLeadCapture(false);
            alert("Thanks! Your material requirement has been logged. Our vendor team will contact you.");
          }}
        />
      )}
    </>
  );
}
