"use client";

import React from 'react';

export default function AIToolResult({ resultData, onActionClick, actionLabel }) {
  if (!resultData) return null;

  return (
    <div className="mt-8 border-t border-gray-200 pt-8 animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Preliminary Analysis</h2>
      
      {resultData.score !== undefined && (
        <div className="mb-6 bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-blue-600 font-medium">Analysis Score / Level</p>
            <p className="text-2xl font-bold text-blue-900">
              {resultData.riskLevel || resultData.urgencyLevel || resultData.status || `${resultData.score}/100`}
            </p>
          </div>
        </div>
      )}

      {resultData.warnings && resultData.warnings.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-red-800 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Flags & Warnings
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {resultData.warnings.map((warning, idx) => (
              <li key={idx}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      {resultData.checklist && resultData.checklist.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-green-800 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            Recommended Next Steps
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {resultData.checklist.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {resultData.infoNote && (
        <div className="mb-8 p-4 bg-gray-50 border-l-4 border-gray-400 text-gray-700">
          <p>{resultData.infoNote}</p>
        </div>
      )}

      {onActionClick && (
        <div className="mt-8 text-center bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Want a professional review?</h3>
          <p className="text-gray-600 mb-4">Share this analysis with a Buildogram engineer to get expert advice.</p>
          <button 
            onClick={onActionClick}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            {actionLabel || "Request Professional Review"}
          </button>
        </div>
      )}
    </div>
  );
}
