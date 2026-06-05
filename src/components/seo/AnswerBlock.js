import React from 'react';

/**
 * AnswerBlock: Used immediately below the H1 to provide a direct, structured answer for AI/Snippets.
 */
export default function AnswerBlock({ question, answer }) {
  return (
    <div style={{ padding: '24px', background: '#F8FAFC', borderLeft: '4px solid #FC6E20', borderRadius: '8px', margin: '32px 0' }}>
      {question && <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px 0', color: '#0F172A' }}>{question}</h2>}
      <p style={{ margin: 0, fontSize: '16px', lineHeight: 1.6, color: '#334155' }}>
        {answer}
      </p>
    </div>
  );
}
