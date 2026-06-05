import { generateSEOMetadata } from '@/lib/seo/metadata';
import ChangePasswordForm from '@/components/ChangePasswordForm';

export const metadata = generateSEOMetadata({
title: 'Settings - Partner Portal',,
  path: '/partner/settings',
});

export default function PartnerSettings() {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', color: 'var(--primary-dark)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>⚙️</span> Account Settings
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage your partner account security and preferences.</p>
      </div>
      
      <div className="card" style={{ padding: '32px', borderRadius: '16px', maxWidth: '600px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '24px' }}>Security</h2>
        <ChangePasswordForm />
      </div>
    </div>
  );
}
