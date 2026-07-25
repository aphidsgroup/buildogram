/**
 * src/lib/conversion/context.js
 * Central conversion context resolver.
 * Returns a typed ConversionContext for any pathname.
 * Resolution order: exact override -> service family -> page family -> generic fallback.
 * No widget/form on excluded routes (explicit allowlist keyed off pageType).
 */

import { BRAND } from '@/lib/brand/positioning';
import { getService } from '@/data/services';
import { areaMap } from '@/data/seo/areas';

// -- Excluded page types -- no widget, no form ----------------------------------
const EXCLUDED_PAGE_TYPES = new Set([
  'auth',              // /login /change-password /forgot-password /reset-password
  'client',            // /client/*
  'partner-os',        // /partner/*
  'ops',               // /ops/*
  'admin',             // /admin/*
  'supplier',          // /supplier/*
  'project-token',     // /project/[token]
  'passport-token',    // /property-passport/[token]
  'print',             // /*/print
  'material-quote-token', // /material-quote-summary/*
  'legal',             // /privacy-policy /terms /disclaimer
  'offline',
  'api',               // /api/*
  'error',
  'maintenance-request', // /maintenance/request -- has its own form
]);

// -- Generic fallback context --------------------------------------------------
const GENERIC_FALLBACK = {
  pageType: 'generic',
  serviceKey: null,
  serviceName: null,
  locality: null,
  primaryIntent: 'Discuss your construction project',
  whatsappPrompt: 'Have a question about your project?',
  tooltipMessage: 'Discuss your construction project with Buildogram.',
  formHeading: 'Discuss Your Project',
  formDescription: "Tell us about your project and we'll be in touch.",
  contextualQuestion: {
    key: 'project_stage',
    label: 'What stage is your project?',
    name: 'project_stage',
    type: 'select',
    options: ['Planning stage', 'Have land, need to build', 'Managing ongoing construction', 'Reviewing contractor quotes', 'Just researching'],
  },
  submitLabel: 'Request a callback',
  showWhatsApp: true,
  showInlineForm: false,
  preferredPlacements: ['page-end'],
};

// -- Page-family defaults ------------------------------------------------------
const PAGE_FAMILY_DEFAULTS = {
  home: {
    pageType: 'home',
    primaryIntent: 'Understand what Buildogram does',
    whatsappPrompt: 'Planning a construction project in Chennai?',
    tooltipMessage: 'Discuss your project with Buildogram -- no commitment required.',
    formHeading: 'Discuss Your Project',
    formDescription: "Tell us about your project and we'll be in touch.",
    contextualQuestion: {
      key: 'project_stage',
      label: 'What stage is your project?',
      name: 'project_stage',
      type: 'select',
      options: ['Planning a new build', 'Reviewing contractor quotes', 'Managing ongoing construction', 'Just researching'],
    },
    submitLabel: 'Request a callback',
    showWhatsApp: true,
    showInlineForm: false,
    preferredPlacements: ['page-end'],
  },

  service: {
    pageType: 'service',
    primaryIntent: 'Engage this service',
    whatsappPrompt: 'Questions about this service?',
    tooltipMessage: 'Discuss this service with Buildogram.',
    formHeading: 'Request a Callback',
    formDescription: "Tell us about your project and we'll be in touch.",
    contextualQuestion: {
      key: 'project_stage',
      label: 'What stage is your project?',
      name: 'project_stage',
      type: 'select',
      options: ['Planning stage', 'Have land, need to build', 'Already started', 'Looking for cost review'],
    },
    submitLabel: 'Request a callback',
    showWhatsApp: true,
    showInlineForm: true,
    preferredPlacements: ['after-scope', 'page-end'],
  },

  'service-hub': {
    pageType: 'service-hub',
    primaryIntent: 'Enquire about this service in Chennai',
    whatsappPrompt: 'Get owner-side support for your project.',
    tooltipMessage: 'Buildogram can help you review options and coordinate.',
    formHeading: 'Request a Callback',
    formDescription: 'Tell us about your project in Chennai.',
    contextualQuestion: {
      key: 'what_do_you_need',
      label: 'What do you need help with?',
      name: 'what_do_you_need',
      type: 'select',
      options: ['Reviewing contractor quotes', 'Understanding costs', 'Coordinating professionals', 'Getting a second opinion', 'Other'],
    },
    submitLabel: 'Request a callback',
    showWhatsApp: true,
    showInlineForm: true,
    preferredPlacements: ['after-scope', 'page-end'],
  },

  'boq-review': {
    pageType: 'service',
    serviceKey: 'boq-review',
    serviceName: 'BOQ Review',
    primaryIntent: 'Get their BOQ or quote reviewed',
    whatsappPrompt: 'Share your BOQ for a review.',
    tooltipMessage: 'Buildogram can review your BOQ or contractor quote.',
    formHeading: 'Request a BOQ Review',
    formDescription: "Tell us about the quote or BOQ you'd like reviewed.",
    contextualQuestion: {
      key: 'reviewing_what',
      label: 'What are you reviewing?',
      name: 'reviewing_what',
      type: 'select',
      options: ['Contractor quote', 'BOQ document', 'Both', 'Not sure yet'],
    },
    submitLabel: 'Request BOQ review',
    showWhatsApp: true,
    showInlineForm: true,
    preferredPlacements: ['after-scope', 'page-end'],
  },

  material: {
    pageType: 'material',
    primaryIntent: 'Get material quotation support',
    whatsappPrompt: 'Need material sourcing support?',
    tooltipMessage: 'Buildogram can help coordinate material quotations.',
    formHeading: 'Get Material Sourcing Support',
    formDescription: "Tell us which materials you need and we'll coordinate quotation support.",
    contextualQuestion: {
      key: 'materials_needed',
      label: 'Which materials do you need?',
      name: 'materials_needed',
      type: 'select',
      options: ['Cement', 'Steel / TMT bars', 'Sand', 'Bricks / AAC blocks', 'Multiple materials', 'Other'],
    },
    submitLabel: 'Get material sourcing support',
    showWhatsApp: true,
    showInlineForm: true,
    preferredPlacements: ['after-scope', 'page-end'],
  },

  guide: {
    pageType: 'guide',
    primaryIntent: 'Understand the topic, then act',
    whatsappPrompt: 'Have a question after reading this guide?',
    tooltipMessage: 'Discuss this topic with Buildogram.',
    formHeading: 'Discuss Your Project',
    formDescription: 'Read something useful? We can help you apply it.',
    contextualQuestion: {
      key: 'construction_situation',
      label: 'What is your construction situation?',
      name: 'construction_situation',
      type: 'select',
      options: ['Planning a new build', 'Reviewing contractor quotes', 'Managing ongoing construction', 'Just researching'],
    },
    submitLabel: 'Request a callback',
    showWhatsApp: true,
    showInlineForm: true,
    preferredPlacements: ['after-first-answer', 'page-end'],
  },

  glossary: {
    pageType: 'glossary',
    primaryIntent: 'Understand a term, then act',
    whatsappPrompt: 'Have a question about your project?',
    tooltipMessage: 'Discuss your construction project with Buildogram.',
    formHeading: 'Discuss Your Project',
    formDescription: 'We can help you apply this knowledge to your project.',
    contextualQuestion: {
      key: 'construction_situation',
      label: 'What is your construction situation?',
      name: 'construction_situation',
      type: 'select',
      options: ['Planning a new build', 'Reviewing contractor quotes', 'Managing ongoing construction', 'Just researching'],
    },
    submitLabel: 'Request a callback',
    showWhatsApp: true,
    showInlineForm: false,
    preferredPlacements: ['after-first-answer', 'page-end'],
  },

  faq: {
    pageType: 'faq',
    primaryIntent: 'Get an answer, then act',
    whatsappPrompt: 'Still have questions? Ask Buildogram.',
    tooltipMessage: 'We can discuss your specific project.',
    formHeading: 'Discuss Your Project',
    formDescription: 'Get personalised guidance for your construction project.',
    contextualQuestion: {
      key: 'construction_situation',
      label: 'What is your construction situation?',
      name: 'construction_situation',
      type: 'select',
      options: ['Planning a new build', 'Reviewing contractor quotes', 'Managing ongoing construction', 'Just researching'],
    },
    submitLabel: 'Request a callback',
    showWhatsApp: true,
    showInlineForm: false,
    preferredPlacements: ['page-end'],
  },

  compare: {
    pageType: 'compare',
    primaryIntent: 'Make a decision after comparing',
    whatsappPrompt: 'Not sure which option suits you?',
    tooltipMessage: 'Discuss the comparison with Buildogram.',
    formHeading: 'Discuss Your Options',
    formDescription: "We can help you decide what's right for your project.",
    contextualQuestion: {
      key: 'decision_stage',
      label: 'Where are you in your decision?',
      name: 'decision_stage',
      type: 'select',
      options: ['Still comparing options', 'Almost decided', 'Need a second opinion', 'Just researching'],
    },
    submitLabel: 'Discuss my project',
    showWhatsApp: true,
    showInlineForm: true,
    preferredPlacements: ['after-scope', 'page-end'],
  },

  'location-area': {
    pageType: 'location-area',
    primaryIntent: 'Find construction services in this area',
    whatsappPrompt: 'Need construction support in this area?',
    tooltipMessage: 'Buildogram can help coordinate construction in your locality.',
    formHeading: 'Discuss Your Project',
    formDescription: 'Tell us about your project in this area.',
    contextualQuestion: {
      key: 'service_needed',
      label: 'What service do you need?',
      name: 'service_needed',
      type: 'select',
      options: ['Home construction', 'BOQ review', 'Structural audit', 'Land survey', 'Other'],
    },
    submitLabel: 'Discuss my project',
    showWhatsApp: true,
    showInlineForm: true,
    preferredPlacements: ['after-scope', 'page-end'],
  },

  'location-service': {
    pageType: 'location-service',
    primaryIntent: 'Engage a specific service in this locality',
    whatsappPrompt: 'Interested in this service in your area?',
    tooltipMessage: 'Buildogram can help coordinate this service.',
    formHeading: 'Request a Callback',
    formDescription: 'Tell us about your project and location.',
    contextualQuestion: {
      key: 'project_stage',
      label: 'What stage is your project?',
      name: 'project_stage',
      type: 'select',
      options: ['Planning stage', 'Have land, need to build', 'Already started', 'Looking for cost review'],
    },
    submitLabel: 'Request a callback',
    showWhatsApp: true,
    showInlineForm: true,
    preferredPlacements: ['after-scope', 'page-end'],
  },

  calculator: {
    pageType: 'calculator',
    primaryIntent: 'Get a cost estimate, then act',
    whatsappPrompt: 'Want to discuss your estimate?',
    tooltipMessage: 'Buildogram can review your estimate and contractor quotes.',
    formHeading: 'Discuss Your Estimate',
    formDescription: 'We can help you review these numbers against real contractor quotes.',
    contextualQuestion: {
      key: 'calculator_purpose',
      label: 'What did you use the calculator for?',
      name: 'calculator_purpose',
      type: 'select',
      options: ['Estimating new construction cost', 'Checking a contractor quote', 'Planning a renovation', 'Other'],
    },
    submitLabel: 'Discuss my project',
    showWhatsApp: true,
    showInlineForm: true,
    preferredPlacements: ['after-result'],
  },

  'partner-listing': {
    pageType: 'partner-listing',
    primaryIntent: 'Find listed professionals',
    whatsappPrompt: 'Looking for construction professionals?',
    tooltipMessage: 'Buildogram can help connect you with listed professionals.',
    formHeading: 'Connect With Listed Professionals',
    formDescription: "Tell us what you need and we'll help identify suitable professionals in our network.",
    contextualQuestion: {
      key: 'professional_type',
      label: 'What type of professional do you need?',
      name: 'professional_type',
      type: 'select',
      options: ['Builder / contractor', 'Architect', 'Interior designer', 'Structural engineer', 'Material supplier', 'Other'],
    },
    submitLabel: 'Request a callback',
    showWhatsApp: true,
    showInlineForm: false,
    preferredPlacements: ['page-end'],
  },

  'partner-profile': {
    pageType: 'partner-profile',
    primaryIntent: 'Learn about this listed professional',
    whatsappPrompt: 'Interested in this professional?',
    tooltipMessage: "Buildogram can help you discuss this professional\'s suitability for your project.",
    formHeading: 'Enquire via Buildogram',
    formDescription: 'Your enquiry goes to Buildogram, who will help coordinate.',
    contextualQuestion: {
      key: 'project_type',
      label: 'What is your project?',
      name: 'project_type',
      type: 'select',
      options: ['New home construction', 'Renovation', 'Structural audit', 'Commercial project', 'Other'],
    },
    submitLabel: 'Request a callback',
    showWhatsApp: true,
    showInlineForm: false,
    preferredPlacements: ['page-end'],
  },

  about: {
    pageType: 'about',
    primaryIntent: 'Understand Buildogram, then engage',
    whatsappPrompt: 'Want to discuss your project?',
    tooltipMessage: 'Chat with Buildogram about your construction project.',
    formHeading: 'Discuss Your Project',
    formDescription: 'Tell us about your construction project.',
    contextualQuestion: {
      key: 'project_stage',
      label: 'What stage is your project?',
      name: 'project_stage',
      type: 'select',
      options: ['Planning a new build', 'Reviewing contractor quotes', 'Managing ongoing construction', 'Just researching'],
    },
    submitLabel: 'Request a callback',
    showWhatsApp: true,
    showInlineForm: false,
    preferredPlacements: ['page-end'],
  },
};

// -- Pathname -> page type resolver ---------------------------------------------
function resolvePageType(pathname) {
  if (!pathname) return 'generic';

  // Auth
  if (['/login', '/signup', '/change-password', '/forgot-password', '/reset-password'].includes(pathname)) return 'auth';

  // App portals
  if (pathname.startsWith('/client/')) return 'client';
  if (pathname.startsWith('/partner/')) return 'partner-os';
  if (pathname.startsWith('/ops/')) return 'ops';
  if (pathname.startsWith('/admin/')) return 'admin';
  if (pathname.startsWith('/supplier/')) return 'supplier';
  if (pathname.startsWith('/api/')) return 'api';

  // Token pages
  if (pathname.startsWith('/project/')) return 'project-token';
  if (pathname.startsWith('/property-passport/')) return 'passport-token';
  if (pathname.startsWith('/material-quote-summary/')) return 'material-quote-token';

  // Print routes
  if (pathname.endsWith('/print')) return 'print';

  // Legal
  if (['/privacy-policy', '/terms', '/disclaimer'].includes(pathname)) return 'legal';
  if (pathname === '/offline') return 'offline';

  // Maintenance request (has its own form)
  if (pathname === '/maintenance/request') return 'maintenance-request';

  // Service pages with specific overrides
  if (pathname === '/boq-review-chennai' || pathname === '/structural-plan-review-chennai') return 'service-hub';
  if (['/construction-in-chennai', '/steel-construction-chennai', '/peb-building-contractors-chennai',
       '/industrial-shed-construction-chennai', '/end-to-end-construction-support-chennai'].includes(pathname)) return 'service-hub';

  // Dynamic families
  if (pathname.startsWith('/services/')) return 'service';
  if (pathname.startsWith('/materials/')) return 'material';
  if (pathname.startsWith('/guides/')) return 'guide';
  if (pathname.startsWith('/glossary/')) return 'glossary';
  if (pathname.startsWith('/faqs/')) return 'faq';
  if (pathname.startsWith('/compare/')) return 'compare';

  // Location pages
  if (pathname.match(/^\/locations\/chennai\/[^/]+\/[^/]+/)) return 'location-service';
  if (pathname.match(/^\/locations\/chennai\/[^/]+/)) return 'location-area';

  // Calculators
  if (['/boq-calculator', '/cost-estimator', '/ai-boq-checker',
       '/ai-construction-cost-estimator', '/ai-contractor-quote-analyzer',
       '/ai-material-estimator', '/ai-floor-plan-creator'].includes(pathname)) return 'calculator';

  // Partners
  if (pathname.match(/^\/partners\/[^/]+$/) && pathname !== '/partners/register') return 'partner-profile';
  if (pathname.startsWith('/partners/')) return 'partner-listing';

  // About / quality
  if (['/about', '/how-it-works', '/quality-system', '/join-as-partner'].includes(pathname)) return 'about';

  // Index pages (resources, etc.)
  if (['/guides', '/glossary', '/faqs', '/compare', '/materials', '/services',
       '/resources', '/resources/chennai', '/resources/construction-guide',
       '/resources/faqs', '/resources/glossary', '/resources/guides',
       '/resources/compare', '/locations', '/locations/chennai'].includes(pathname)) return 'about';

  if (pathname === '/') return 'home';

  return 'generic';
}

// -- Main export ---------------------------------------------------------------
/**
 * getConversionContext(pathname)
 * @param {string} pathname - e.g. '/services/boq-review'
 * @returns {object} ConversionContext
 */
export function getConversionContext(pathname) {
  const pageType = resolvePageType(pathname);

  // Excluded -- return a no-show context
  if (EXCLUDED_PAGE_TYPES.has(pageType)) {
    return {
      ...GENERIC_FALLBACK,
      pageType,
      showWhatsApp: false,
      showInlineForm: false,
    };
  }

  // Exact overrides for specific high-intent slugs
  if (pathname === '/boq-review-chennai' || pathname === '/services/boq-review') {
    return buildContext(pathname, pageType, PAGE_FAMILY_DEFAULTS['boq-review']);
  }

  // Service family -- enrich with service data
  if (pageType === 'service') {
    const slug = pathname.replace('/services/', '');
    const svc = getService(slug);
    const base = { ...PAGE_FAMILY_DEFAULTS.service };
    if (svc) {
      base.serviceKey = slug;
      base.serviceName = svc.h1 || svc.title || slug;
      base.whatsappPrompt = `Questions about ${base.serviceName}?`;
      base.tooltipMessage = `Discuss ${base.serviceName} with Buildogram.`;
      base.formHeading = `Request a Callback -- ${base.serviceName}`;
    }
    return buildContext(pathname, pageType, base);
  }

  // Location-service -- enrich with area + service
  if (pageType === 'location-service') {
    const parts = pathname.split('/').filter(Boolean); // ['locations','chennai','area','service']
    const areaSlug = parts[2];
    const serviceSlug = parts[3];
    const area = areaMap[areaSlug];
    const base = { ...PAGE_FAMILY_DEFAULTS['location-service'] };
    if (area) {
      base.locality = area.name;
      base.whatsappPrompt = `Need ${serviceSlug?.replace(/-/g, ' ')} in ${area.name}?`;
      base.tooltipMessage = `Buildogram can help coordinate services in ${area.name}.`;
      base.formHeading = `Request a Callback -- ${area.name}`;
      base.contextualQuestion = {
        ...base.contextualQuestion,
        label: `What stage is your project in ${area.name}?`,
      };
    }
    return buildContext(pathname, pageType, base);
  }

  // Location-area -- enrich with area
  if (pageType === 'location-area') {
    const areaSlug = pathname.split('/')[3];
    const area = areaMap?.[areaSlug];
    const base = { ...PAGE_FAMILY_DEFAULTS['location-area'] };
    if (area) {
      base.locality = area.name;
      base.whatsappPrompt = `Need construction support in ${area.name}?`;
      base.tooltipMessage = `Buildogram can help coordinate construction in ${area.name}.`;
      base.formHeading = `Discuss Your Project in ${area.name}`;
    }
    return buildContext(pathname, pageType, base);
  }

  // Page-family default
  const familyDefault = PAGE_FAMILY_DEFAULTS[pageType];
  if (familyDefault) {
    return buildContext(pathname, pageType, familyDefault);
  }

  // Safe generic fallback
  return buildContext(pathname, 'generic', GENERIC_FALLBACK);
}

function buildContext(pathname, pageType, overrides) {
  return {
    ...GENERIC_FALLBACK,
    ...overrides,
    pageType,
    // Ensure phone is always from brand source of truth
    _phone: BRAND.phone,
  };
}

// Re-export for convenience
export { EXCLUDED_PAGE_TYPES };
