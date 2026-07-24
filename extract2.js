const fs = require('fs');
const path = require('path');

const basePath = 'C:\\Users\\Kawinfinite PC 32\\Downloads\\Buildogram\\buildogram-app\\src\\app';
const outPath = 'C:\\Users\\Kawinfinite PC 32\\Downloads\\Buildogram\\buildogram-app\\scraped_services.json';

const slugsToRead = [
  'home-construction-chennai',
  'residential-construction-chennai',
  'turnkey-construction-chennai',
  'renovation-contractors-chennai',
  'site-supervision-chennai',
  'structural-audit-chennai',
  'land-survey-chennai',
  'drone-survey-chennai',
  'topographic-survey-chennai',
  'total-station-survey-chennai',
  'dynamic-pile-load-test-chennai',
  'plate-load-test-chennai',
  'micro-piling-contractors-chennai',
  'ndt-testing-chennai',
  'soil-testing-chennai',
  'soil-investigation-chennai',
  'upv-test-chennai',
  'why-vs-aggregators',
  'why-vs-mason',
  'pile-load-test-chennai',
  'pile-integrity-test-chennai',
  'rebound-hammer-test-chennai',
  'core-test-concrete-chennai',
  'rebar-scanning-chennai'
];

let results = {};

function parseFile(slug) {
  const filePath = path.join(basePath, slug, 'page.js');
  if (!fs.existsSync(filePath)) {
    console.log("Not found:", filePath);
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  
  const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
  const descMatch = content.match(/description:\s*['"]([^'"]+)['"]/);
  
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  let h1 = '';
  if (h1Match) h1 = h1Match[1].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();

  const hasHero = content.includes('<section style={{ background: \'var(--secondary)') || content.includes('<section style={{ background: "var(--secondary)');
  
  let heroTag = '';
  const heroTagMatch = content.match(/textTransform:\s*['"]uppercase['"][^>]*>([^<]+)<\/span>/);
  if (hasHero && heroTagMatch) {
    heroTag = heroTagMatch[1].trim();
  }

  let answerQuestion = '';
  let answerText = '';
  const aqMatch = content.match(/question:\s*['"]([^'"]+)['"]/); // simplistic, wait, actual AnswerBlock
  const tagH2Match = content.match(/<div className="tag"[^>]*>(?:AnswerBlock)?([^<]+)<\/div>\s*<h2[^>]*>([^<]+)<\/h2>/);
  const ansTextMatch = content.match(/<p[^>]*fontSize:\s*['"]18px['"][^>]*>([\s\S]*?)<\/p>/);
  // Actually, sometimes it's hardcoded. Let's just grab AnswerQuestion and Text if possible.
  const ansq = content.match(/<h2[^>]*>([^<]+\?)<\/h2>/);
  if (ansq) answerQuestion = ansq[1].trim();
  // Find the paragraph after the h2
  const pMatch = content.match(/<h2[^>]*>[^<]+\?<\/h2>\s*<p[^>]*>([\s\S]*?)<\/p>/);
  if (pMatch) {
    answerText = pMatch[1].replace(/<[^>]+>/g, '').trim();
  }

  const processTitleMatch = content.match(/<div className="tag"[^>]*>Our [^<]+ Process<\/div>\s*<h2[^>]*>([^<]+)<\/h2>/) || content.match(/<h2[^>]*>([^<]+)<\/h2>/g);
  let processTitle = "Our Process";
  
  let steps = [];
  const processMatch = content.match(/const PROCESS\s*=\s*(\[[\s\S]*?\]);/);
  if (processMatch) {
    try { steps = eval(processMatch[1]); } catch(e) {}
  }

  let faqs = [];
  const faqsMatch = content.match(/const FAQS\s*=\s*(\[[\s\S]*?\]);/);
  if (faqsMatch) {
    try { faqs = eval(faqsMatch[1]); } catch(e) {}
  }
  
  let relatedLinks = [];
  const linksMatch = content.match(/\.map\(\(\[label,\s*href\]\)\s*=>[\s\S]*?\{.*?\[(\[.*?\])\]/); // wait, it's mapped over an array.
  const arrMatch = content.match(/\{\[\s*(\[[^\]]+\](?:,\s*\[[^\]]+\])*)\s*\]\.map/);
  if (arrMatch) {
    try { relatedLinks = eval('[' + arrMatch[1] + ']'); } catch(e) {}
  }
  
  let stats = [];
  const statsMatch = content.match(/\{\[\s*(\[[^\]]+\](?:,\s*\[[^\]]+\])*)\s*\]\.map/); // same for stats?
  if (content.includes("Stats Bar")) {
    const sMatch = content.match(/\{\[\s*(\[[^\]]+\](?:,\s*\[[^\]]+\])*)\s*\]\.map/);
    if (sMatch) {
        try { stats = eval('[' + sMatch[1] + ']'); } catch(e) {}
    }
  }

  let ctaHref = '';
  let ctaLabel = '';
  const ctaMatch = content.match(/<Link href=['"]([^'"]+)['"] className=['"]btn btn-primary btn-lg['"]>([^<]+)<\/Link>/);
  if (ctaMatch) {
    ctaHref = ctaMatch[1];
    ctaLabel = ctaMatch[2];
  }
  
  let ctaSecondaryHref = '';
  let ctaSecondaryLabel = '';
  const secondaryMatch = content.match(/<Link href=['"]([^'"]+)['"] className=['"]btn btn-lg['"][^>]*>([^<]+)<\/Link>/);
  if (secondaryMatch) {
    ctaSecondaryHref = secondaryMatch[1];
    ctaSecondaryLabel = secondaryMatch[2];
  }

  let breadcrumbLabel = '';
  const bMatch = content.match(/name:\s*['"]([^'"]+)['"],\s*path:\s*['"]\/[a-z0-9-]+['"]/g);
  if (bMatch && bMatch.length > 0) {
    const lastB = bMatch[bMatch.length - 1];
    const nMatch = lastB.match(/name:\s*['"]([^'"]+)['"]/);
    if (nMatch) breadcrumbLabel = nMatch[1];
  }

  results[slug] = {
    title: titleMatch ? titleMatch[1] : '',
    metaDescription: descMatch ? descMatch[1] : '',
    h1,
    hasHero,
    heroTag,
    answerQuestion,
    answerText,
    processTitle,
    steps,
    faqs,
    stats,
    ctaHref,
    ctaLabel,
    ctaSecondaryHref,
    ctaSecondaryLabel,
    breadcrumbLabel,
    relatedLinks
  };
}

slugsToRead.forEach(parseFile);
fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
console.log("Done");
