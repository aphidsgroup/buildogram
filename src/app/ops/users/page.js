'use client';
import { useState, useEffect } from 'react';

export default function OpsUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit'
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [tempPassword, setTempPassword] = useState('');
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'client',
    partner_id: ''
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ops/users');
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users || []);
      } else {
        setError(data.error);
      }
    } catch (e) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openCreateModal = () => {
    setModalMode('create');
    setForm({ name: '', email: '', phone: '', role: 'client', partner_id: '' });
    setTempPassword('');
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setModalMode('edit');
    setSelectedUserId(user.id);
    setForm({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      role: user.role || 'client',
      partner_id: user.partner_id || ''
    });
    setTempPassword('');
    setShowModal(true);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setError('');
    setTempPassword('');

    try {
      if (modalMode === 'create') {
        const res = await fetch('/api/ops/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        const data = await res.json();
        if (res.ok) {
          setTempPassword(data.tempPassword);
          fetchUsers();
          // Don't close modal yet, so admin can copy the password
        } else {
          setError(data.error || 'Failed to create user');
        }
      } else {
        const res = await fetch(`/api/ops/users/${selectedUserId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        const data = await res.json();
        if (res.ok) {
          setShowModal(false);
          fetchUsers();
        } else {
          setError(data.error || 'Failed to update user');
        }
      }
    } catch (e) {
      setError('Network error');
    }
  };

  const resetPassword = async (id) => {
    if (!confirm('Are you sure you want to reset this user\'s password?')) return;
    try {
      const res = await fetch(`/api/ops/users/${id}/reset-password`, {
        method: 'POST'
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Password reset successfully.\n\nNew Temporary Password: ${data.tempPassword}\n\nPlease copy and send this to the user.`);
      } else {
        alert(data.error || 'Failed to reset password');
      }
    } catch (e) {
      alert('Network error');
    }
  };

  const deactivateUser = async (id, currentStatus) => {
    if (!confirm(`Are you sure you want to ${currentStatus ? 'deactivate' : 'activate'} this user?`)) return;
    try {
      const res = await fetch(`/api/ops/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !currentStatus })
      });
      if (res.ok) {
        fetchUsers();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to update user status');
      }
    } catch (e) {
      alert('Network error');
    }
  };

  const deleteUser = async (id) => {
    if (!confirm('Are you ABSOLUTELY sure you want to delete this user? This may fail if they have associated records.')) return;
    try {
      const res = await fetch(`/api/ops/users/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchUsers();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete user');
      }
    } catch (e) {
      alert('Network error');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500">Manage ops, partner, and client access.</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
        >
          + Create User
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md border border-gray-200">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading users...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name / Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => openEditModal(user)} className="text-indigo-600 hover:text-indigo-900 mx-2">Edit</button>
                      <button onClick={() => resetPassword(user.id)} className="text-yellow-600 hover:text-yellow-900 mx-2">Reset Pwd</button>
                      <button onClick={() => deactivateUser(user.id, user.is_active)} className="text-orange-600 hover:text-orange-900 mx-2">
                        {user.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button onClick={() => deleteUser(user.id)} className="text-red-600 hover:text-red-900 mx-2">Delete</button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">{modalMode === 'create' ? 'Create New User' : 'Edit User'}</h2>
            
            {tempPassword ? (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                <h3 className="text-sm font-medium text-green-800 mb-2">User Created Successfully!</h3>
                <p className="text-sm text-green-700 mb-4">Please securely copy this temporary password. It will not be shown again.</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 block p-2 bg-white border border-green-300 rounded font-mono text-center text-lg">{tempPassword}</code>
                  <button onClick={() => copyToClipboard(tempPassword)} className="px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700">Copy</button>
                </div>
                <div className="mt-4 flex justify-end">
                  <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded text-sm hover:bg-gray-300">Close</button>
                </div>
              </div>
            ) : (
              <form onSubmit={submitForm} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required disabled={modalMode === 'edit'} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                    <option value="client">Client</option>
                    <option value="partner_contractor">Partner (Contractor)</option>
                    <option value="partner_supplier">Partner (Supplier)</option>
                    <option value="partner_professional">Partner (Professional)</option>
                    <option value="ops_pm">Ops PM</option>
                    <option value="ops_engineer">Ops Engineer</option>
                    <option value="ops_admin">Ops Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>
                
                {form.role.startsWith('partner_') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Partner ID (UUID)</label>
                    <input type="text" value={form.partner_id} onChange={e => setForm({...form, partner_id: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Leave empty if not linked yet" />
                  </div>
                )}
                
                {error && <div className="text-red-600 text-sm">{error}</div>}
                
                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700">
                    {modalMode === 'create' ? 'Create User' : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
