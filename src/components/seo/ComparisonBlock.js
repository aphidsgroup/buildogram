import React from 'react';

/**
 * ComparisonBlock: Semantic table for comparison data (e.g. materials, builders vs aggregators)
 */
export default function ComparisonBlock({ title, headers, rows }) {
  return (
    <section style={{ margin: '48px 0' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '24px', color: '#0F172A' }}>{title}</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <thead style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
            <tr>
              {headers.map((h, i) => (
                <th key={i} style={{ padding: '16px', fontWeight: 700, color: '#475569', fontSize: '15px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #E2E8F0' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '16px', color: j === 0 ? '#0F172A' : '#475569', fontWeight: j === 0 ? 600 : 400, fontSize: '15px' }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
