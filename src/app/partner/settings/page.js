import ChangePasswordForm from '@/components/ChangePasswordForm';

export const metadata = {
  title: 'Settings - Partner Portal',
};

export default function PartnerSettings() {
  return (
    <div className="pb-20">
      <div className="page-header mb-8">
        <h1 style={{ fontSize: '28px', fontWeight: '800' }}>Account Settings</h1>
        <p className="text-muted mt-2">Manage your partner account security.</p>
      </div>
      
      <ChangePasswordForm />
    </div>
  );
}
