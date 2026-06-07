"use client";

import React from 'react';

export default function AIToolShell({ title, description, children }) {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-lg text-gray-600">{description}</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 sm:p-8">
          {children}
        </div>
        
        <div className="bg-gray-50 border-t border-gray-200 p-4 sm:p-6">
          <div className="flex items-start gap-3 text-sm text-gray-600">
            <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>
              <strong>Disclaimer:</strong> AI-engineered output is for preliminary planning only. Final construction, structural, material, and cost decisions should be reviewed by Buildogram engineers or qualified professionals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
