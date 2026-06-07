import { prisma } from '@/lib/storageProvider';
import { requirePermission } from '@/lib/auth/permissions';
import Link from 'next/link';

export const metadata = {
  title: 'Audit Logs | Ops Dashboard',
};

export const revalidate = 0; // Ensure fresh data on every load

export default async function AuditLogsPage({ searchParams }) {
  await requirePermission('ops_admin'); // Only super/ops admin can view audit logs

  const sp = await searchParams;
  const filterAction = sp?.action || '';
  const filterResource = sp?.resource || '';

  const whereClause = {};
  if (filterAction) whereClause.action = filterAction;
  if (filterResource) whereClause.resource_type = filterResource;

  const logs = await prisma.audit_logs.findMany({
    where: whereClause,
    orderBy: { created_at: 'desc' },
    take: 100,
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Security Audit Logs</h1>
          <p className="text-slate-500 text-sm mt-1">Review system mutations, financial changes, and access records.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex gap-4 bg-slate-50">
          <Link href="/ops/audit-logs" className={`px-4 py-2 text-sm font-semibold rounded-lg ${!filterAction && !filterResource ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>All Logs</Link>
          <Link href="/ops/audit-logs?action=UPDATE" className={`px-4 py-2 text-sm font-semibold rounded-lg ${filterAction === 'UPDATE' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>Updates</Link>
          <Link href="/ops/audit-logs?action=DELETE" className={`px-4 py-2 text-sm font-semibold rounded-lg ${filterAction === 'DELETE' ? 'bg-red-600 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>Deletions</Link>
          <Link href="/ops/audit-logs?resource=finance" className={`px-4 py-2 text-sm font-semibold rounded-lg ${filterResource === 'finance' ? 'bg-green-600 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>Finance</Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                <th className="py-4 px-6">Timestamp</th>
                <th className="py-4 px-6">Actor</th>
                <th className="py-4 px-6">Action</th>
                <th className="py-4 px-6">Resource</th>
                <th className="py-4 px-6 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-400">No logs found matching criteria.</td>
                </tr>
              ) : (
                logs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 text-slate-500">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-900">{log.actor_name || 'System'}</div>
                      <div className="text-xs text-slate-400 font-mono">{log.actor_role}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        log.action.includes('DELETE') ? 'bg-red-100 text-red-700' :
                        log.action.includes('FINANCE') ? 'bg-green-100 text-green-700' :
                        log.action.includes('UPDATE') ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-slate-700">{log.resource_type}</div>
                      <div className="text-xs text-slate-400 font-mono" title={log.resource_id}>
                        {log.resource_id?.slice(0, 8)}...
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <details className="cursor-pointer inline-block text-left group">
                        <summary className="text-blue-600 font-medium text-sm hover:text-blue-800">View JSON</summary>
                        <div className="absolute right-0 mt-2 w-96 max-h-96 overflow-auto bg-slate-900 text-green-400 p-4 rounded-xl shadow-xl z-50 hidden group-open:block text-xs font-mono border border-slate-700">
                          {log.before_json && <div><div className="text-slate-400 mb-1">Before:</div><pre className="mb-4">{JSON.stringify(log.before_json, null, 2)}</pre></div>}
                          {log.after_json && <div><div className="text-slate-400 mb-1">After:</div><pre>{JSON.stringify(log.after_json, null, 2)}</pre></div>}
                        </div>
                      </details>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
