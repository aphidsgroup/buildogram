const fs = require('fs');
const path = require('path');

function updatePage(filepath, updates) {
  const fullPath = path.join(__dirname, 'src', 'app', filepath);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');
  let updated = false;

  if (updates.metaTitle) {
    content = content.replace(/title:\s*'.*?',/, `title: '${updates.metaTitle}',`);
    updated = true;
  }
  if (updates.metaDesc) {
    content = content.replace(/description:\s*'.*?',/, `description: '${updates.metaDesc}',`);
    updated = true;
  }
  
  if (updates.replacements) {
    updates.replacements.forEach(([oldStr, newStr]) => {
      if (content.includes(oldStr)) {
        content = content.split(oldStr).join(newStr);
        updated = true;
      }
    });
  }

  if (updated) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Updated', filepath);
  }
}

// 1. /about
updatePage('about/page.js', {
  metaTitle: 'About Buildogram | Construction & Property Marketplace',
  replacements: [
    ['<h1 style={{ fontSize: \'44px\', color: \'var(--primary-dark)\' }}>We Are Buildogram</h1>', '<h1 style={{ color: \'white\', fontSize: \'clamp(28px, 4vw, 52px)\', lineHeight: 1.15, marginBottom: \'16px\', maxWidth: \'760px\' }}>About Buildogram</h1>'],
    ['Transforming unorganized residential construction into an engineer-led, tech-enabled, highly transparent CaaS aggregator platform.', 'Buildogram is building a marketplace for construction, properties, materials, partners, and project records. We connect property owners, construction professionals, material suppliers, property listings, and digital property records.'],
    ['We Are Buildogram — Build with Proof, Not Promises', 'About Buildogram — The Construction & Property Marketplace'],
    ['Buildogram is an engineer-led, tech-enabled Construction-as-a-Service (CaaS) platform', 'Buildogram is a construction and property marketplace that connects property owners, construction professionals, material suppliers, property listings, and digital property records.']
  ]
});

// 2. /build (Construction)
updatePage('build/page.js', {
  metaTitle: 'Construction Support and Contractor Marketplace | Buildogram',
  replacements: [
    ['Build Your Home or Villa in Chennai | Buildogram Construction', 'Construction Support and Contractor Marketplace | Buildogram'],
    ['<h1 style={{ fontSize: \'44px\', color: \'var(--primary-dark)\' }}>Build with Proof, Not Promises</h1>', '<h1 style={{ color: \'white\', fontSize: \'clamp(28px, 4vw, 52px)\', lineHeight: 1.15, marginBottom: \'16px\', maxWidth: \'760px\' }}>Construction Support inside the Buildogram Marketplace</h1>'],
    ['Build your home, villa, commercial property or renovation with cost clarity, BOQ transparency, BQS quality checks and Property Passport.', 'Find construction clarity, BOQ support, project tracking, partner coordination, and material support through Buildogram.']
  ]
});

// 3. /boq-audit
updatePage('boq-audit/page.js', {
  metaTitle: 'BOQ Review and Contractor Quote Audit | Buildogram',
  replacements: [
    ['BOQ Audit — Catch Hidden Charges in Your Contractor Quote | Buildogram', 'BOQ Review and Contractor Quote Audit | Buildogram'],
    ['Get your contractor quote audited by Buildogram engineers. We check every item, rate and quantity to expose inflated pricing, missing items and spec substitutions.', 'Before you finalize a contractor, understand what is included, what is unclear, and what questions to ask. BOQ clarity service inside the Buildogram marketplace.']
  ]
});

// 4. /plan-review
updatePage('plan-review/page.js', {
  replacements: [
    ['Architectural Plan Review — Validate Your Floor Plan | Buildogram', 'Architectural Plan Review | Buildogram'],
    ['Get your 2D floor plans reviewed by our senior architects for Vaastu, ventilation, space utilization, and structural feasibility before you start building.', 'Practical plan review for property owners inside the Buildogram marketplace. Not structural approval, not architectural certification, not government approval.']
  ]
});

// 5. /materials
updatePage('materials/page.js', {
  metaTitle: 'Construction Material Quote Marketplace | Buildogram',
  replacements: [
    ['Buy Construction Materials in Chennai | Buildogram', 'Construction Material Quote Marketplace | Buildogram'],
    ['Buy premium cement, steel, sand, and aggregates at wholesale rates with guaranteed delivery and verified test certificates in Chennai.', 'Request material quotes and connect with Buildogram’s material supplier network.']
  ]
});

// 6. /properties/buy
updatePage('properties/buy/page.js', {
  metaTitle: '360° Property Listings in Chennai | Buildogram Marketplace',
  replacements: [
    ['Buy Verified Properties in Chennai | Buildogram', '360° Property Listings in Chennai | Buildogram Marketplace'],
    ['Discover 100% verified properties with 360° virtual tours, structural audits, and clear documentation. Buy without surprises.', 'List, discover, and shortlist properties with better visibility through 360° tours and structured property details.']
  ]
});

// 7. /property-passport
updatePage('property-passport/page.js', {
  metaTitle: 'Property Passport for Property Records | Buildogram',
  replacements: [
    ['Property Passport™ | Permanent Digital Record for Your Home', 'Property Passport for Property Records | Buildogram'],
    ['A permanent, verified digital record of your property’s construction quality, materials, drawings, BOQ, and warranties.', 'Property Passport is the digital record layer for properties listed, built, maintained, or managed through Buildogram.']
  ]
});

// 8. /partners
updatePage('partners/page.js', {
  metaTitle: 'Join Buildogram Partner Marketplace | Builders, Contractors, Suppliers',
  replacements: [
    ['Partner with Buildogram | Builders, Contractors, Architects, Suppliers', 'Join Buildogram Partner Marketplace | Builders, Contractors, Suppliers'],
    ['Join Buildogram\'s partner ecosystem. Get leads, verified profile, reels, project showcase, material benefits and IT/promotion services.', 'Builders, contractors, architects, suppliers, real estate agents, and maintenance vendors can join Buildogram to showcase work and receive opportunities.']
  ]
});

// 9. /maintenance
updatePage('maintenance/page.js', {
  replacements: [
    ['Property Maintenance & AMC Services in Chennai | Buildogram', 'Property Maintenance & AMC Services | Buildogram'],
    ['Professional property maintenance, repairs, waterproofing, and AMC contracts. Expert engineers and verified vendors.', 'Maintain properties and record service history as part of the Buildogram property ecosystem.']
  ]
});

// 10. /cost-estimator
updatePage('cost-estimator/page.js', {
  replacements: [
    ['Construction Cost Estimator | Buildogram Chennai', 'Construction Cost Estimator | Buildogram Chennai'],
    ['Calculate exact house construction cost in Chennai based on specification, built-up area and structural needs. Free BOQ estimation.', 'Construction cost clarity tool, not a final quotation. Get clarity on construction estimates in Chennai.']
  ]
});

console.log('Done specific page updates.');
