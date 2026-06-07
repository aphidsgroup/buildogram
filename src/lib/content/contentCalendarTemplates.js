/**
 * Content Calendar Templates
 * Generates structured content templates for various marketing channels.
 */

export function generateGbpPost(item, proofAsset) {
  // Max 700 characters
  // Area-based, privacy-safe, CTA link, no exact address, no owner names
  
  const categoryStr = item.category.replace(/_/g, ' ');
  const areaStr = item.target_area || proofAsset?.area || 'Chennai';
  const ctaLink = item.linked_service_url || proofAsset?.linked_service_url || 'https://buildogram.in';

  let text = `Recently completed a ${categoryStr} project in ${areaStr}.\n\n`;
  
  if (proofAsset) {
    text += `Observations:\n${proofAsset.before_after_notes || proofAsset.description || 'Ensuring highest quality standards on site.'}\n\n`;
  } else {
    text += `Our engineering team ensures top quality and durability for every structural requirement in ${areaStr}.\n\n`;
  }

  text += `Need reliable ${categoryStr} services? \nLearn more: ${ctaLink}`;

  return text.substring(0, 700);
}

export function generateReelScript(item, proofAsset) {
  const categoryStr = item.category.replace(/_/g, ' ');
  const areaStr = item.target_area || 'Chennai';
  
  return `
[HOOK - 0-3s]: 
(Visual: Fast zoom into the site or dramatic before/after in ${areaStr})
"Are you worried about the quality of your ${categoryStr}?"

[PROBLEM - 3-8s]: 
"Many homeowners miss critical structural defects until it's too late."

[PROOF/PROCESS - 8-18s]:
(Visual: Engineer inspecting, or testing equipment)
"At Buildogram, we don't guess. We verify. Here's a look at our recent ${categoryStr} work in ${areaStr}."
${proofAsset ? `Details: ${proofAsset.methods_used || 'Standardized structural testing.'}` : ''}

[BUILDOGRAM POSITIONING - 18-25s]:
"We bring engineer-led precision, eliminating guesswork and ensuring structural safety for your peace of mind."

[CTA - 25-30s]:
"Planning to build or renovate? Tap the link in our bio for a free consultation!"

[THANGLISH VERSION (Optional)]:
"Unga veedu kattrappo quality pathi kavalaya? Buildogram engineers precision-oda check pannuvanga. Link in bio!"
  `.trim();
}

export function generateCaseStudyOutline(item) {
  const categoryStr = item.category.replace(/_/g, ' ');
  const areaStr = item.target_area || 'Chennai';
  
  return `
# Case Study: ${categoryStr} in ${areaStr}

## The Problem
[Describe the initial challenge or requirement the client faced in ${areaStr}]

## Scope of Work
[List the exact services and requirements]

## The Buildogram Process
[Detail the engineer-led approach, methods, and tools used]

## Proof Records & Observations
[Insert details from structural audits, BOQ reviews, or material testing]

## Outcome
[What was the final result? Time saved, money saved, or safety ensured]

## Related Services
[Link to related service pages: ${item.linked_service_url || '/services'}]
  `.trim();
}

export function generateLearnArticleOutline(item) {
  const categoryStr = item.category.replace(/_/g, ' ');
  
  return `
# ${item.title || `Ultimate Guide to ${categoryStr}`}

## Direct Answer
[Provide a clear, 2-3 sentence answer to the main question about ${categoryStr}]

## Key Factors / Sections
1. Factor 1
2. Factor 2
3. Factor 3

## Buildogram's Engineer-Led Approach
[Explain how Buildogram handles this differently than typical contractors]

## FAQs
- FAQ 1?
- FAQ 2?
- FAQ 3?

## Internal Links
[Ensure links to: ${item.internal_links?.join(', ') || 'related services and proof assets'}]

## Call to Action
[CTA to book a consultation or view a case study]
  `.trim();
}

export function generateLinkedInPost(item, partner) {
  const categoryStr = item.category.replace(/_/g, ' ');
  
  let text = `Building trust through transparency in construction. \n\n`;
  text += `Our team recently focused on a complex ${categoryStr} requirement. `;
  
  if (partner) {
    text += `We partnered with ${partner.company_name} to deliver exceptional quality and reliability. `;
  }

  text += `\n\nBy prioritizing engineer-led processes over guesswork, we ensure that every structure meets the highest standards of safety and durability.\n\n`;
  
  text += `Read the full breakdown here: [Insert Link]\n\n`;
  text += `#ConstructionTech #Engineering #Buildogram #${categoryStr.replace(/\s+/g, '')} #ChennaiConstruction`;

  return text;
}
