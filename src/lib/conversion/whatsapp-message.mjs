/**
 * src/lib/conversion/whatsapp-message.mjs
 * Builds the prefilled WhatsApp message for public conversion CTAs.
 *
 * Pure module (no '@/' imports, no window access) so the same text is
 * produced on the server and the client -- the message is derived only from
 * the pathname-based conversion context, never from window.location, which
 * keeps the SSR href identical to the hydrated href.
 */

// Used only when no route context is available (e.g. pathname is null).
export const GENERIC_WHATSAPP_MESSAGE =
  'Hi Buildogram, I have a construction project in Chennai. Could you help me review my options?';

const ACRONYMS = {
  ai: 'AI', boq: 'BOQ', peb: 'PEB', pmc: 'PMC', ndt: 'NDT', upv: 'UPV', dgps: 'DGPS',
  rmc: 'RMC', tmt: 'TMT', aac: 'AAC', nabl: 'NABL', pit: 'PIT', pda: 'PDA', dmc: 'DMC',
  cmda: 'CMDA', dtcp: 'DTCP', faq: 'FAQ', faqs: 'FAQs', msand: 'M-Sand', psand: 'P-Sand',
};

const MINOR_WORDS = new Set(['a', 'an', 'and', 'or', 'of', 'in', 'for', 'to', 'vs', 'the', 'is', 'on', 'per']);

/**
 * humanizeSlug('structural-audit-chennai') -> 'Structural Audit in Chennai'
 */
export function humanizeSlug(slug) {
  if (!slug) return '';
  const words = String(slug)
    .replace(/(?<!-in)-chennai$/, '-in-chennai')
    .split('-')
    .filter(Boolean);
  return words
    .map((w, i) => {
      const lower = w.toLowerCase();
      if (ACRONYMS[lower]) return ACRONYMS[lower];
      if (i > 0 && MINOR_WORDS.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
}

// Long service H1s like "X in Chennai — Coordinated by ..." -> "X in Chennai"
function shortenTitle(title) {
  if (!title) return '';
  return String(title).split(/\s+[—–|]\s+/)[0].trim();
}

function withChennai(label) {
  return /chennai/i.test(label) ? label : `${label} in Chennai`;
}

// Calculators / AI tools -- names the tool the visitor actually used.
const TOOL_LABELS = {
  '/boq-calculator': 'BOQ Calculator',
  '/cost-estimator': 'Construction Cost Estimator',
  '/ai-boq-checker': 'AI BOQ Checker',
  '/ai-construction-cost-estimator': 'AI Construction Cost Estimator',
  '/ai-contractor-quote-analyzer': 'AI Contractor Quote Analyzer',
  '/ai-material-estimator': 'AI Material Estimator',
  '/ai-floor-plan-creator': 'AI Floor Plan Creator',
};

// About / index pages where a full sentence reads better than "your X page".
const PAGE_SENTENCES = {
  '/about': 'I read about Buildogram and would like to discuss my construction project in Chennai.',
  '/how-it-works': "I read how Buildogram works and would like to discuss my construction project in Chennai.",
  '/quality-system': "I read about Buildogram's quality system and would like to discuss my project.",
  '/join-as-partner': "I'd like to join Buildogram as a partner.",
};

function pathLabel(pathname) {
  const segments = String(pathname).split('/').filter(Boolean);
  return segments.map(humanizeSlug).join(' – ');
}

/**
 * buildWhatsAppMessage(context, pathname)
 * @param {object} context  - ConversionContext ({ pageType, serviceName, locality, whatsappTopic })
 * @param {string} pathname - route the CTA is rendered on
 * @returns {string} plain (unencoded) message text
 */
export function buildWhatsAppMessage(context, pathname) {
  if (!pathname) return GENERIC_WHATSAPP_MESSAGE;

  const { pageType, serviceName, locality, whatsappTopic } = context || {};
  const topic = shortenTitle(whatsappTopic || serviceName || '');
  const lastSlug = pathname.split('/').filter(Boolean).pop() || '';
  let body;

  switch (pageType) {
    case 'home':
      body = "I'm planning a construction project in Chennai and would like to discuss it.";
      break;
    case 'service':
    case 'service-hub':
      body = `I'm enquiring about ${withChennai(topic || humanizeSlug(lastSlug))}. Could you help with my project?`;
      break;
    case 'material':
      body = `I need material quotation support for ${topic || humanizeSlug(lastSlug)}.`;
      break;
    case 'guide':
      body = `I read your guide "${topic || humanizeSlug(lastSlug)}" and have a question about my project.`;
      break;
    case 'glossary':
      body = `I have a question about ${topic || humanizeSlug(lastSlug)} for my project.`;
      break;
    case 'faq':
      body = `I have a question about ${topic || `${humanizeSlug(lastSlug)} FAQs`}.`;
      break;
    case 'compare':
      body = `I'm comparing ${topic || humanizeSlug(lastSlug)} and need help deciding.`;
      break;
    case 'location-area':
      body = `I need construction support in ${locality || humanizeSlug(lastSlug)}, Chennai.`;
      break;
    case 'location-service':
      body = `I need ${topic || humanizeSlug(lastSlug)} in ${locality || 'Chennai'}${locality ? ', Chennai' : ''}.`;
      break;
    case 'calculator':
      body = `I used your ${TOOL_LABELS[pathname] || humanizeSlug(lastSlug)} and would like to discuss my estimate.`;
      break;
    case 'partner-profile':
      body = `I'd like to enquire about ${topic || humanizeSlug(lastSlug)} listed on Buildogram.`;
      break;
    case 'partner-listing':
      body = `I'm looking for ${topic || humanizeSlug(lastSlug)} through Buildogram's partner network.`;
      break;
    case 'about':
      body = PAGE_SENTENCES[pathname]
        || `I was browsing your ${pathLabel(pathname)} page and would like to discuss my construction project.`;
      break;
    default:
      body = topic
        ? `I'm enquiring about ${withChennai(topic)}. Could you help with my project?`
        : `I'm on your ${pathLabel(pathname)} page and would like to discuss my construction project in Chennai.`;
  }

  return `Hi Buildogram, ${body} Page: ${pathname}`;
}
