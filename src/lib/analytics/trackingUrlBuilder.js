/**
 * Tracking URL Builder
 * Generates UTM tracking URLs for various social and content platforms.
 */

export function buildTrackingUrl(baseUrl, params = {}) {
  try {
    const url = new URL(baseUrl, process.env.NEXT_PUBLIC_SITE_URL || 'https://buildogram.com');
    
    if (params.source) url.searchParams.set('utm_source', params.source);
    if (params.medium) url.searchParams.set('utm_medium', params.medium);
    if (params.campaign) url.searchParams.set('utm_campaign', params.campaign);
    if (params.content) url.searchParams.set('utm_content', params.content);
    if (params.term) url.searchParams.set('utm_term', params.term);
    
    return url.toString();
  } catch (e) {
    console.error('Failed to build tracking URL', e);
    return baseUrl;
  }
}

export const TrackingPresets = {
  getGbpPost: (baseUrl, campaign) => buildTrackingUrl(baseUrl, {
    source: 'google_business_profile',
    medium: 'post',
    campaign: campaign
  }),
  getInstagramReel: (baseUrl, campaign) => buildTrackingUrl(baseUrl, {
    source: 'instagram',
    medium: 'reel',
    campaign: campaign
  }),
  getInstagramBio: (baseUrl, campaign) => buildTrackingUrl(baseUrl, {
    source: 'instagram',
    medium: 'bio',
    campaign: campaign
  }),
  getYoutubeShort: (baseUrl, campaign) => buildTrackingUrl(baseUrl, {
    source: 'youtube',
    medium: 'short',
    campaign: campaign
  }),
  getLinkedInPost: (baseUrl, campaign) => buildTrackingUrl(baseUrl, {
    source: 'linkedin',
    medium: 'post',
    campaign: campaign
  }),
  getWhatsAppShare: (baseUrl, campaign) => buildTrackingUrl(baseUrl, {
    source: 'whatsapp',
    medium: 'share',
    campaign: campaign
  }),
  getPartnerShare: (baseUrl, partnerId, campaign) => buildTrackingUrl(baseUrl, {
    source: 'partner',
    medium: 'referral',
    term: partnerId,
    campaign: campaign
  })
};
