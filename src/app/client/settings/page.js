import ChangePasswordForm from '@/components/ChangePasswordForm';

export const metadata = {
  title: 'Settings - Client Portal',
};

export default function ClientSettings() {
  return (
    <div className="pb-20">
      <div className="page-header mb-8">
        <h1 style={{ fontSize: '28px', fontWeight: '800' }}>Account Settings</h1>
        <p className="text-muted mt-2">Manage your account security and preferences.</p>
      </div>
      
      <ChangePasswordForm />
    </div>
  );
}
