const fs = require('fs');

let content = fs.readFileSync('src/app/layout.js', 'utf8');

content = content.replace(
  "title: 'Buildogram | Buildogram is a construction and property marketplace that connects property owners, construction professionals, material suppliers, property listings, and digital property records.',",
  "title: 'Buildogram | Construction & Property Marketplace',"
);

content = content.replace(
  "description: 'Build your dream home in Chennai with PhD-grade structural engineering, 100% transparent BOQ pricing, and a digital Property Passport. Construction with proof, not promises.',",
  "description: 'Buildogram is a construction and property marketplace for property owners, builders, contractors, material suppliers, 360° property listings, BOQ clarity, Property Passport records, and maintenance support.',"
);

content = content.replace(
  "keywords: ['home construction chennai', 'transparent builders', 'boq audit', 'structural engineering chennai', 'property passport', 'buildogram'],",
  "keywords: ['construction marketplace', 'property marketplace', 'buildogram', 'chennai', 'property passport'],"
);

content = content.replace(
  "title: 'Buildogram | Buildogram is a construction and property marketplace that connects property owners, construction professionals, material suppliers, property listings, and digital property records.',",
  "title: 'Buildogram | Construction & Property Marketplace',"
);

content = content.replace(
  "description: 'Build your dream home in Chennai with PhD-grade structural engineering and 100% transparent BOQ pricing.',",
  "description: 'Buildogram is a construction and property marketplace for property owners, builders, contractors, material suppliers, 360° property listings, BOQ clarity, Property Passport records, and maintenance support.',"
);

content = content.replace(
  "title: 'Buildogram | Buildogram is a construction and property marketplace that connects property owners, construction professionals, material suppliers, property listings, and digital property records.',",
  "title: 'Buildogram | Construction & Property Marketplace',"
);

content = content.replace(
  "description: 'Build your dream home in Chennai with PhD-grade structural engineering and 100% transparent BOQ pricing.',",
  "description: 'Buildogram is a construction and property marketplace for property owners, builders, contractors, material suppliers, 360° property listings, BOQ clarity, Property Passport records, and maintenance support.',"
);

fs.writeFileSync('src/app/layout.js', content, 'utf8');
