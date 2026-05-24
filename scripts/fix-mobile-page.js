const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, '../src/app/page.js');
let content = fs.readFileSync(pagePath, 'utf8');

// Fix Hero Section Padding
content = content.replace(
  /padding: '110px 0 90px'/g,
  `paddingTop: '140px', paddingBottom: '60px'`
);

// Fix CTA row in Hero
content = content.replace(
  /<div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '60px' }}>/g,
  `<div className="flex flex-col sm:flex-row gap-3 w-full" style={{ marginBottom: '60px' }}>`
);

// Make CTA buttons full width on mobile
content = content.replace(
  /<Link href="([^"]+)" className="btn ([^"]+)"/g,
  `<Link href="$1" className="btn $2 w-full sm:w-auto flex-center"`
);

// Fix "Build with Proof" button row
content = content.replace(
  /<div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>/g,
  `<div className="flex flex-col sm:flex-row gap-3 w-full">`
);

// Fix "Maintenance" button row
// same as above because it uses the exact same div style, so the regex above caught it.

// Fix "Start Your Property Journey" button row
content = content.replace(
  /<div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>/g,
  `<div className="flex flex-col sm:flex-row gap-3 w-full justify-center">`
);

// Fix Ecosystem Strip Horizontal overflow
content = content.replace(
  /style={{ display: 'flex', gap: '0', overflowX: 'auto' }}/g,
  `className="overflow-x-auto w-full" style={{ display: 'flex', gap: '0' }}`
);

// Fix headings using clamp to use standard tailwind classes
// Headline: <h1 style={{ color: 'white', fontSize: 'clamp(38px, 5.5vw, 72px)'
content = content.replace(
  /<h1 style={{ color: 'white', fontSize: 'clamp\(38px, 5\.5vw, 72px\)', lineHeight: 1\.05, marginBottom: '28px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800 }}>/g,
  `<h1 className="text-3xl sm:text-4xl lg:text-6xl leading-tight" style={{ color: 'white', marginBottom: '28px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800 }}>`
);

// Other headings
content = content.replace(
  /fontSize: 'clamp\([^)]+\)'/g,
  `fontSize: 'inherit'`
);
content = content.replace(
  /<h2 style={{ fontSize: 'inherit', marginTop: '16px', marginBottom: '20px', color: '#292929' }}>/g,
  `<h2 className="text-3xl sm:text-4xl leading-tight" style={{ marginTop: '16px', marginBottom: '20px', color: '#292929' }}>`
);
content = content.replace(
  /<h2 style={{ color: 'white', fontSize: 'inherit', marginTop: '16px', marginBottom: '24px' }}>/g,
  `<h2 className="text-3xl sm:text-4xl leading-tight" style={{ color: 'white', marginTop: '16px', marginBottom: '24px' }}>`
);
content = content.replace(
  /<h2 style={{ fontSize: 'inherit', marginTop: '16px', color: '#292929' }}>/g,
  `<h2 className="text-3xl sm:text-4xl leading-tight" style={{ marginTop: '16px', color: '#292929' }}>`
);
content = content.replace(
  /<h2 style={{ color: 'white', fontSize: 'inherit', marginTop: '16px', marginBottom: '20px' }}>/g,
  `<h2 className="text-3xl sm:text-4xl leading-tight" style={{ color: 'white', marginTop: '16px', marginBottom: '20px' }}>`
);
content = content.replace(
  /<h2 style={{ color: 'white', fontSize: 'inherit', lineHeight: 1\.1, marginBottom: '20px' }}>/g,
  `<h2 className="text-3xl sm:text-4xl lg:text-6xl leading-tight" style={{ color: 'white', marginBottom: '20px' }}>`
);
content = content.replace(
  /<h2 style={{ fontSize: 'inherit', marginTop: '16px', marginBottom: '16px', color: '#292929' }}>/g,
  `<h2 className="text-3xl sm:text-4xl leading-tight" style={{ marginTop: '16px', marginBottom: '16px', color: '#292929' }}>`
);

// Choose Wisely / Spec Packages Buttons (stack/wrap on mobile)
content = content.replace(
  /<div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '28px' }}>/g,
  `<div className="flex flex-col sm:flex-row gap-3 w-full justify-center" style={{ marginBottom: '28px' }}>`
);
content = content.replace(
  /<div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '28px' }}>/g,
  `<div className="flex flex-col sm:flex-row gap-3 w-full justify-center" style={{ marginBottom: '28px' }}>`
);

// Two column grid that wasn't responsive in "Build with Proof" and "Property Passport" and "Materials" and "Maintenance"
content = content.replace(
  /<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>/g,
  `<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">`
);
content = content.replace(
  /<div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '64px', alignItems: 'center' }}>/g,
  `<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">`
);
content = content.replace(
  /<div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '64px', alignItems: 'center' }}>/g,
  `<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">`
);

// Footer columns
content = content.replace(
  /<div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1fr', gap: '40px', marginBottom: '48px' }}>/g,
  `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10" style={{ marginBottom: '48px' }}>`
);

fs.writeFileSync(pagePath, content, 'utf8');
console.log('page.js updated for mobile responsiveness');
