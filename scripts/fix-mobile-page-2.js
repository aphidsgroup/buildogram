const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, '../src/app/page.js');
let content = fs.readFileSync(pagePath, 'utf8');

// 1. Fix duplicate className in Ecosystem Strip
content = content.replace(
  /className="container" className="overflow-x-auto w-full"/g,
  `className="container overflow-x-auto w-full"`
);

// 2. Fix Hero Mini Stats gap (40px is too big on mobile)
content = content.replace(
  /<div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>/g,
  `<div className="flex flex-wrap gap-6 sm:gap-10">`
);

// 3. Fix Proof Pillars hardcoded 2-column grid
content = content.replace(
  /<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>/g,
  `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">`
);

// 4. Fix Partner Ecosystem hardcoded 3-column grid
content = content.replace(
  /<div style={{ display: 'grid', gridTemplateColumns: 'repeat\\(3, 1fr\\)', gap: '24px', marginBottom: '48px' }}>/g,
  `<div className="grid grid-cols-1 sm:grid-cols-3 gap-6" style={{ marginBottom: '48px' }}>`
);

// 5. Fix Materials Strip hardcoded padding
content = content.replace(
  /<div className="container" style={{ padding: '64px 24px' }}>/g,
  `<div className="container py-10 sm:py-16 px-4 sm:px-6">`
);

// 6. Fix Maintenance section hardcoded padding
content = content.replace(
  /<section style={{ background: 'var\\(--secondary\\)', padding: '80px 0' }}>/g,
  `<section className="py-10 sm:py-20" style={{ background: 'var(--secondary)' }}>`
);

// 7. Fix Final CTA section hardcoded padding
content = content.replace(
  /<section style={{ background: 'var\\(--secondary\\)', padding: '100px 0' }}>/g,
  `<section className="py-12 sm:py-24" style={{ background: 'var(--secondary)' }}>`
);

// 8. Fix Footer padding
content = content.replace(
  /<footer style={{ background: '#111111', color: 'white', padding: '64px 0 32px' }}>/g,
  `<footer className="py-10 sm:py-16 pb-8" style={{ background: '#111111', color: 'white' }}>`
);

// 9. Fix Comparison & Spec Card huge padding on mobile (reduce 40px to sm:p-10 p-6)
content = content.replace(
  /style={{ borderLeft: `6px solid \$\{COMPARISON\[activeComparison\]\.color\}`, padding: '40px',/g,
  `className="p-6 sm:p-10" style={{ borderLeft: \`6px solid \${COMPARISON[activeComparison].color}\`,`
);
content = content.replace(
  /style={{ padding: '36px', maxWidth: '700px', margin: '0 auto' }}/g,
  `className="p-6 sm:p-9" style={{ maxWidth: '700px', margin: '0 auto' }}`
);

// 10. Fix Property Passport button full width forced on desktop
content = content.replace(
  /style={{ marginTop: '28px', width: '100%', justifyContent: 'center', display: 'flex' }}/g,
  `style={{ marginTop: '28px' }}`
);

fs.writeFileSync(pagePath, content, 'utf8');
console.log('page.js updated for mobile responsiveness (Pass 2)');
