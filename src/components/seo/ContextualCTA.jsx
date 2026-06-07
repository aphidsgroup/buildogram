import Link from 'next/link';

export default function ContextualCTA({ pageType, currentPath }) {
  let ctaText = "Get Free Engineering Consultation";
  let ctaLink = "/contact";
  let subtitle = "Buildogram protects property owners with transparent, engineer-led execution.";

  switch (pageType) {
    case 'material':
      ctaText = "Request Material Quote";
      ctaLink = "/materials";
      subtitle = "Source genuine, adulteration-free materials direct to your site in Chennai.";
      break;
    case 'audit':
      ctaText = "Book Structural Audit";
      ctaLink = "/structural-audit-chennai";
      subtitle = "Get a detailed health assessment from senior structural engineers.";
      break;
    case 'survey':
      ctaText = "Request Survey Support";
      ctaLink = "/land-survey-chennai";
      subtitle = "Accurate layouts, boundary marking, and contour mapping by certified surveyors.";
      break;
    case 'proof':
    case 'case_study':
      ctaText = "Start Your Project";
      ctaLink = "/contact";
      subtitle = "Want similar results? Let our engineering team manage your next requirement.";
      break;
    case 'service':
    case 'location':
      ctaText = "Discuss Your Requirement";
      ctaLink = "/contact";
      subtitle = "Talk to a Buildogram engineer today for verified, stress-free execution.";
      break;
  }

  return (
    <section style={{ padding: '60px 0', background: 'var(--gradient-dark)' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'white', marginBottom: '16px' }}>
          Ready to build with confidence?
        </h2>
        <p style={{ fontSize: '18px', color: '#CBD5E1', marginBottom: '32px', lineHeight: 1.6 }}>
          {subtitle}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link href={ctaLink} className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
