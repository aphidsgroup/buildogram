import Link from 'next/link';

export default function Breadcrumbs({ crumbs = [], injectSchema = true }) {
  if (!crumbs || crumbs.length === 0) return null;

  // Build JSON-LD schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: `https://buildogram.in${crumb.href}`
    }))
  };

  return (
    <>
      {injectSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <nav aria-label="Breadcrumb" style={{ padding: '16px 0', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container">
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '13px' }}>
            {crumbs.map((crumb, index) => {
              const isLast = index === crumbs.length - 1;
              return (
                <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {isLast ? (
                    <span style={{ color: '#0F172A', fontWeight: 600 }} aria-current="page">
                      {crumb.label}
                    </span>
                  ) : (
                    <>
                      <Link href={crumb.href} style={{ color: '#64748B', textDecoration: 'none' }}>
                        {crumb.label}
                      </Link>
                      <span style={{ color: '#CBD5E1' }}>/</span>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
