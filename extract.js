const fs = require('fs');
const path = require('path');

const basePath = 'C:\\Users\\Kawinfinite PC 32\\Downloads\\Buildogram\\buildogram-app\\src\\app';

function parseFile(slug) {
  const filePath = path.join(basePath, slug, 'page.js');
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');

  const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
  const descMatch = content.match(/description:\s*['"]([^'"]+)['"]/);
  const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/) || content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  
  let h1 = '';
  if (h1Match) {
    h1 = h1Match[1].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
  }

  const hasHero = content.includes('<section style={{ background: \'var(--secondary)') || content.includes('<section style={{ background: "var(--secondary)');
  const heroTagMatch = content.match(/<span[^>]*>(?:<span[^>]*>)?(.*?)(?:<\/span>)?<\/span>/i);
  let heroTag = '';
  if (hasHero) {
    const match = content.match(/<span[^>]*textTransform:\s*['"]uppercase['"][^>]*>([^<]+)<\/span>/);
    if (match) heroTag = match[1].trim();
  }

  const answerQuestionMatch = content.match(/question:\s*['"]([^'"]+)['"]/); // Wait, this is FAQ block. 
  // Let's look for AnswerBlock component or similar.
  const answerQ = content.match(/<div className="tag"[^>]*>([^<]+)<\/div>\s*<h2[^>]*>([^<]+)<\/h2>/); // wait, answer text is usually a paragraph.

  const processMatch = content.match(/const PROCESS\s*=\s*(\[[\s\S]*?\]);/);
  let steps = [];
  if (processMatch) {
    try {
      steps = eval(processMatch[1]);
    } catch(e) {
      console.log('Failed to eval PROCESS in', slug);
    }
  }

  const faqsMatch = content.match(/const FAQS\s*=\s*(\[[\s\S]*?\]);/);
  let faqs = [];
  if (faqsMatch) {
    try {
      faqs = eval(faqsMatch[1]);
    } catch(e) {
      console.log('Failed to eval FAQS in', slug);
    }
  }

  const breadcrumbMatch = content.match(/<BreadcrumbSchema[^>]*items=\{\[.*?\{.*?name:\s*['"]([^'"]+)['"],\s*path:\s*['"]\/[^'"]+['"]\s*\}\]\}/);
  let breadcrumb = breadcrumbMatch ? breadcrumbMatch[1] : '';

  return {
    slug,
    title: titleMatch ? titleMatch[1] : '',
    metaDescription: descMatch ? descMatch[1] : '',
    h1: h1,
    hasHero: hasHero,
    heroTag: heroTag,
    steps: steps,
    faqs: faqs,
    breadcrumbLabel: breadcrumb
  };
}

const slugs = fs.readdirSync(basePath).filter(f => fs.statSync(path.join(basePath, f)).isDirectory() && !f.startsWith('[') && !f.startsWith('.'));
console.log(slugs);
