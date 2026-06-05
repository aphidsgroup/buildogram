// scripts/local-seo-audit.js
// Post-build audit: scans area and service-area pages for quality issues.
// Run: node scripts/local-seo-audit.js

const path = require('path');

// Dynamically require the compiled JS data
const { areas } = require('../src/data/seo/areas');
const { localServices } = require('../src/data/seo/localServices');

const BASE_URL = 'https://www.buildogram.in';
const QUALITY_THRESHOLD_WORDS = 150;
const QUALITY_THRESHOLD_FAQS = 5;
const QUALITY_THRESHOLD_LINKS = 5;

function countWords(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

function substitute(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] !== undefined ? vars[key] : `{${key}}`);
}

const report = {
  totalAreaPages: 0,
  totalServiceAreaPages: 0,
  indexable: 0,
  noindex: 0,
  issues: [],
};

const seen = { titles: {}, descriptions: {}, h1s: {} };

function auditAreaPage(area) {
  report.totalAreaPages++;
  const vars = {
    area: area.name,
    region: area.region,
    approvalBody: area.approvalBody,
    approvalNote: area.approvalNotes,
    soilNote: area.soilNote,
    costMin: area.costRange.min.toLocaleString('en-IN'),
    costMax: area.costRange.max.toLocaleString('en-IN'),
    midCost: Math.round((area.costRange.min + area.costRange.max) / 2).toLocaleString('en-IN'),
  };

  const title = `Home Construction in ${area.name}, Chennai | Verified Builders | Buildogram`;
  const description = `Planning home construction in ${area.name}, Chennai? Buildogram provides BOQ reviews, verified local builders, site supervision, and material sourcing with engineer-led transparency.`;
  const h1 = `Home Construction in ${area.name}, Chennai`;
  const url = `${BASE_URL}/locations/chennai/${area.slug}`;

  const faqs = [
    { q: `What is the construction cost in ${area.name}?`, a: area.soilNote },
    { q: `Approval body in ${area.name}?`, a: area.approvalNotes },
    { q: `Soil conditions in ${area.name}?`, a: area.soilNote },
    { q: `Verified builders in ${area.name}?`, a: area.constructionTips },
    { q: `Challenges in ${area.name}?`, a: area.constructionTips },
    { q: `Nearby areas?`, a: area.nearbyAreas.join(', ') },
  ];

  const wordTotal = countWords([area.desc, area.soilNote, area.constructionTips, area.approvalNotes, ...faqs.map(f => f.q + ' ' + f.a)].join(' '));
  const internalLinks = 8; // baked into the template
  const isIndexable = wordTotal >= QUALITY_THRESHOLD_WORDS && faqs.length >= QUALITY_THRESHOLD_FAQS && internalLinks >= QUALITY_THRESHOLD_LINKS;

  const pageIssues = [];

  if (!isIndexable) {
    pageIssues.push(`NOINDEX — words: ${wordTotal}, faqs: ${faqs.length}, links: ${internalLinks}`);
    report.noindex++;
  } else {
    report.indexable++;
  }

  if (seen.titles[title]) pageIssues.push(`DUPLICATE TITLE: already seen in ${seen.titles[title]}`);
  seen.titles[title] = url;

  if (seen.descriptions[description]) pageIssues.push(`DUPLICATE DESC: already seen in ${seen.descriptions[description]}`);
  seen.descriptions[description] = url;

  if (seen.h1s[h1]) pageIssues.push(`DUPLICATE H1: already seen in ${seen.h1s[h1]}`);
  seen.h1s[h1] = url;

  if (pageIssues.length > 0) {
    report.issues.push({ url, issues: pageIssues });
  }
}

function auditServiceAreaPage(area, service) {
  report.totalServiceAreaPages++;
  const vars = {
    area: area.name,
    region: area.region,
    approvalBody: area.approvalBody,
    approvalNote: area.approvalNotes,
    soilNote: area.soilNote,
    costMin: area.costRange.min.toLocaleString('en-IN'),
    costMax: area.costRange.max.toLocaleString('en-IN'),
    midCost: Math.round((area.costRange.min + area.costRange.max) / 2).toLocaleString('en-IN'),
    costCompare: 'competitive pricing',
    commercialSuitability: 'suitable for this project type',
  };

  const title = `${service.name} in ${area.name}, Chennai | Buildogram`;
  const description = `Looking for ${service.name.toLowerCase()} in ${area.name}, Chennai? Buildogram provides engineer-verified ${service.name.toLowerCase()}.`;
  const h1 = substitute(service.h1Template, vars);
  const intro = substitute(service.introTemplate, vars);

  const faqs = service.faqs.map(f => ({ q: substitute(f.q, vars), a: substitute(f.a, vars) }));
  const processDescs = service.processSteps.map(s => substitute(s.desc, vars));

  const wordTotal = countWords([intro, area.desc, area.soilNote, area.constructionTips, ...faqs.map(f => f.q + ' ' + f.a), ...processDescs].join(' '));
  const internalLinks = (service.internalLinks?.length || 0) + 4; // extra links added in page template
  const isIndexable = wordTotal >= QUALITY_THRESHOLD_WORDS && faqs.length >= QUALITY_THRESHOLD_FAQS && internalLinks >= QUALITY_THRESHOLD_LINKS;

  const url = `${BASE_URL}/locations/chennai/${area.slug}/${service.slug}`;
  const pageIssues = [];

  if (!isIndexable) {
    pageIssues.push(`NOINDEX — words: ${wordTotal}, faqs: ${faqs.length}, links: ${internalLinks}`);
    report.noindex++;
  } else {
    report.indexable++;
  }

  if (seen.titles[title]) pageIssues.push(`DUPLICATE TITLE: ${seen.titles[title]}`);
  seen.titles[title] = url;

  if (pageIssues.length > 0) {
    report.issues.push({ url, issues: pageIssues });
  }
}

// Run audit
console.log('🔍 Running Buildogram Local SEO Quality Audit...\n');

for (const area of areas) {
  auditAreaPage(area);
  for (const service of localServices) {
    auditServiceAreaPage(area, service);
  }
}

// Output report
console.log('=== LOCAL SEO AUDIT REPORT ===\n');
console.log(`Total area pages:          ${report.totalAreaPages}`);
console.log(`Total service-area pages:  ${report.totalServiceAreaPages}`);
console.log(`Indexable pages:           ${report.indexable}`);
console.log(`Noindex pages:             ${report.noindex}`);
console.log(`Pages with issues:         ${report.issues.length}\n`);

if (report.issues.length > 0) {
  console.log('=== ISSUES ===');
  for (const item of report.issues) {
    console.log(`\n  URL: ${item.url}`);
    for (const issue of item.issues) {
      console.log(`    ⚠ ${issue}`);
    }
  }
} else {
  console.log('✅ No quality issues found!');
}

console.log('\n=== AUDIT COMPLETE ===');
