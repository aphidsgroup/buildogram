import prisma from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";

export const metadata = {
  title: "Finance OS | Buildogram Ops",
};

export const dynamic = "force-dynamic";

export default async function OpsFinanceDashboard() {
  const [
    invoices,
    payments,
    commissions,
    materialMargins
  ] = await Promise.all([
    prisma.project_invoices.findMany({ orderBy: { created_at: "desc" }, take: 50, include: { projects: true } }),
    prisma.project_payments.findMany({ orderBy: { payment_date: "desc" }, take: 50, include: { projects: true } }),
    prisma.partner_commissions.findMany({ orderBy: { created_at: "desc" }, take: 50, include: { projects: true, partners: true } }),
    prisma.material_order_finance.findMany({ orderBy: { created_at: "desc" }, take: 50, include: { partners: true } })
  ]);

  const totalPendingInvoices = invoices.filter(i => i.status === "sent" || i.status === "draft").reduce((sum, i) => sum + Number(i.total_amount || 0), 0);
  const totalOverdueInvoices = invoices.filter(i => i.status === "overdue").reduce((sum, i) => sum + Number(i.total_amount || 0), 0);
  const totalIncomingPayments = payments.filter(p => p.payment_direction === "incoming" && p.status === "confirmed").reduce((sum, p) => sum + Number(p.amount || 0), 0);
  const totalOutgoingPayments = payments.filter(p => p.payment_direction === "outgoing" && p.status === "confirmed").reduce((sum, p) => sum + Number(p.amount || 0), 0);
  
  const pendingCommissions = commissions.filter(c => c.status === "pending").reduce((sum, c) => sum + Number(c.commission_amount || 0), 0);
  const totalMaterialMargin = materialMargins.reduce((sum, m) => sum + Number(m.buildogram_margin || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Finance & Commission OS</h1>
        <p className="text-sm text-gray-500">Track business revenue, invoices, and payouts across the platform.</p>
      </div>

      {/* High-level metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
          <div className="p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">Pending Invoices</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">₹{totalPendingInvoices.toLocaleString()}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg border border-red-200">
          <div className="p-5">
            <dt className="text-sm font-medium text-red-500 truncate">Overdue Invoices</dt>
            <dd className="mt-1 text-3xl font-semibold text-red-600">₹{totalOverdueInvoices.toLocaleString()}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg border border-green-200">
          <div className="p-5">
            <dt className="text-sm font-medium text-green-600 truncate">Confirmed Income</dt>
            <dd className="mt-1 text-3xl font-semibold text-green-700">₹{totalIncomingPayments.toLocaleString()}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg border border-yellow-200">
          <div className="p-5">
            <dt className="text-sm font-medium text-yellow-600 truncate">Pending Commissions</dt>
            <dd className="mt-1 text-3xl font-semibold text-yellow-700">₹{pendingCommissions.toLocaleString()}</dd>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <div className="bg-white shadow sm:rounded-lg border border-gray-200">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Invoices</h3>
          </div>
          <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {invoices.slice(0, 10).map((inv) => (
              <li key={inv.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-blue-600">{inv.invoice_number}</p>
                    <p className="text-xs text-gray-500">{inv.projects?.name || "No Project"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">₹{Number(inv.total_amount).toLocaleString()}</p>
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium 
                      ${inv.status === 'paid' ? 'bg-green-100 text-green-800' : 
                        inv.status === 'overdue' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {inv.status?.toUpperCase()}
                    </span>
                  </div>
                </div>
              </li>
            ))}
            {invoices.length === 0 && <li className="p-4 text-sm text-gray-500">No invoices found.</li>}
          </ul>
        </div>

        {/* Recent Payments */}
        <div className="bg-white shadow sm:rounded-lg border border-gray-200">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Payments</h3>
          </div>
          <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {payments.slice(0, 10).map((pay) => (
              <li key={pay.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{pay.payment_mode}</p>
                    <p className="text-xs text-gray-500">Ref: {pay.transaction_reference || "N/A"}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${pay.payment_direction === 'incoming' ? 'text-green-600' : 'text-red-600'}`}>
                      {pay.payment_direction === 'incoming' ? '+' : '-'}₹{Number(pay.amount).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">{pay.payment_date ? format(new Date(pay.payment_date), 'MMM d, yyyy') : 'Unknown Date'}</p>
                  </div>
                </div>
              </li>
            ))}
            {payments.length === 0 && <li className="p-4 text-sm text-gray-500">No payments found.</li>}
          </ul>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Commissions */}
        <div className="bg-white shadow sm:rounded-lg border border-gray-200">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Partner Commissions</h3>
            <span className="text-sm text-gray-500">Action Required</span>
          </div>
          <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {commissions.filter(c => c.status === "pending").map((comm) => (
              <li key={comm.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{comm.partners?.company_name || "Unknown Partner"}</p>
                    <p className="text-xs text-gray-500">{comm.commission_type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">₹{Number(comm.commission_amount).toLocaleString()}</p>
                    <button className="mt-1 text-xs text-blue-600 hover:text-blue-800">Approve & Invoice</button>
                  </div>
                </div>
              </li>
            ))}
            {commissions.filter(c => c.status === "pending").length === 0 && <li className="p-4 text-sm text-gray-500">No pending commissions.</li>}
          </ul>
        </div>

        {/* Material Margins */}
        <div className="bg-white shadow sm:rounded-lg border border-gray-200">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Material Margins</h3>
            <span className="text-sm font-medium text-green-600">Total: ₹{totalMaterialMargin.toLocaleString()}</span>
          </div>
          <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {materialMargins.slice(0, 10).map((mat) => (
              <li key={mat.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{mat.partners?.company_name || "Unknown Supplier"}</p>
                    <p className="text-xs text-gray-500">Customer: ₹{Number(mat.customer_total).toLocaleString()} | Supplier: ₹{Number(mat.supplier_total).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-600">+₹{Number(mat.buildogram_margin).toLocaleString()}</p>
                    <span className="text-xs text-gray-500">{mat.payment_status}</span>
                  </div>
                </div>
              </li>
            ))}
            {materialMargins.length === 0 && <li className="p-4 text-sm text-gray-500">No material records found.</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
