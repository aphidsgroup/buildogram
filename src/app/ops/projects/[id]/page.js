import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";

export const metadata = {
  title: "Project Details | Buildogram Ops",
};

export const dynamic = "force-dynamic";

export default async function OpsProjectDetailsPage({ params, searchParams }) {
  const { id } = params;
  const tab = searchParams.tab || "overview";

  const project = await prisma.projects.findUnique({
    where: { id },
    include: {
      partners: true,
      users_projects_client_idTousers: true,
      project_milestones: { orderBy: { planned_date: "asc" } },
      project_activity_logs: { orderBy: { created_at: "desc" } },
      project_documents_list: { orderBy: { created_at: "desc" } },
      property_passports: {
        where: { id: id }, // Fallback logic or map properly
      },
      project_finance: true,
      project_invoices: { orderBy: { created_at: "desc" } },
      project_payments: { orderBy: { payment_date: "desc" } },
      partner_commissions: { orderBy: { created_at: "desc" } }
    },
  });

  if (!project) return notFound();

  const tabs = [
    { id: "overview", name: "Overview" },
    { id: "milestones", name: "Milestones" },
    { id: "activity", name: "Activity" },
    { id: "partners", name: "Partners" },
    { id: "materials", name: "Materials" },
    { id: "bqs", name: "BQS / Quality" },
    { id: "finance", name: "Finance" },
    { id: "documents", name: "Documents" },
    { id: "passport", name: "Property Passport" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 rounded-t-lg shadow">
        <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
          <div className="ml-4 mt-4">
            <div className="flex items-center gap-3">
              <h3 className="text-xl leading-6 font-semibold text-gray-900">
                {project.project_code || "Draft Project"} - {project.name}
              </h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {project.status?.toUpperCase() || "ENQUIRY"}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Client: {project.client_name} • {project.client_phone}
            </p>
          </div>
          <div className="ml-4 mt-4 flex-shrink-0 flex gap-2">
            <Link
              href={`/project/${project.share_token}`}
              target="_blank"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Client Share View
            </Link>
            <button
              type="button"
              className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Update Status
            </button>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
          {tabs.map((t) => (
            <Link
              key={t.id}
              href={`?tab=${t.id}`}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${tab === t.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {t.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        {tab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Project Details</h4>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Project Type</dt>
                  <dd className="mt-1 text-sm text-gray-900">{project.project_type}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Area</dt>
                  <dd className="mt-1 text-sm text-gray-900">{project.project_area || project.plot_area_sqft + " sqft"}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Budget Range</dt>
                  <dd className="mt-1 text-sm text-gray-900">{project.budget_range || "-"}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Handover Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">{project.target_handover_date ? format(new Date(project.target_handover_date), "PP") : "-"}</dd>
                </div>
              </dl>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Client Contacts</h4>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{project.client_name}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900">{project.client_phone}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{project.client_email}</dd>
                </div>
              </dl>
            </div>
            <div className="col-span-1 md:col-span-2 mt-4 pt-4 border-t border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-2">Notes</h4>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{project.notes || "No notes."}</p>
            </div>
          </div>
        )}

        {tab === "milestones" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-gray-900">Project Milestones</h4>
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">+ Add Milestone</button>
            </div>
            <div className="flow-root">
              <ul className="-mb-8">
                {project.project_milestones.map((milestone, idx) => (
                  <li key={milestone.id}>
                    <div className="relative pb-8">
                      {idx !== project.project_milestones.length - 1 ? (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white
                            ${milestone.status === 'completed' ? 'bg-green-500' : milestone.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-300'}
                          `}>
                            {/* Icon placeholder */}
                            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              {milestone.milestone_name} <span className="font-medium text-gray-900">({milestone.stage})</span>
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            {milestone.completed_date ? format(new Date(milestone.completed_date), "MMM d") : milestone.status}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
                {project.project_milestones.length === 0 && (
                  <p className="text-sm text-gray-500 py-4">No milestones defined. Generate from template.</p>
                )}
              </ul>
            </div>
          </div>
        )}

        {tab === "activity" && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Activity Log</h4>
            <div className="space-y-4">
              {project.project_activity_logs.map(log => (
                <div key={log.id} className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                  <div className="font-medium">{log.title}</div>
                  <div className="text-gray-500">{log.description}</div>
                  <div className="text-xs text-gray-400 mt-1">{format(new Date(log.created_at), "PP p")}</div>
                </div>
              ))}
              {project.project_activity_logs.length === 0 && (
                <p className="text-sm text-gray-500">No activity recorded yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Placeholders for other tabs to be linked to existing systems */}
        {tab === "partners" && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Assigned Partner</h4>
            {project.partners ? (
              <div className="p-4 border rounded shadow-sm">
                <p className="font-medium">{project.partners.company_name}</p>
                <Link href={`/ops/partners/${project.partners.id}`} className="text-sm text-blue-600 hover:underline">View Profile</Link>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No partner assigned.</p>
            )}
          </div>
        )}
        
        {tab === "bqs" && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">BQS Inspections</h4>
            <p className="text-sm text-gray-500 mb-4">Link BQS inspections to this project.</p>
            <Link href="/ops/bqs" className="text-sm text-blue-600 font-medium">Go to BQS Dashboard &rarr;</Link>
          </div>
        )}

        {tab === "documents" && (
          <div>
             <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-gray-900">Project Documents</h4>
              <button className="text-sm text-blue-600 font-medium">+ Upload</button>
            </div>
            <div className="space-y-2">
              {project.project_documents_list?.map(doc => (
                <div key={doc.id} className="flex justify-between items-center p-3 border rounded text-sm">
                  <span>{doc.title} ({doc.category})</span>
                  <span className="text-gray-500">{doc.visibility}</span>
                </div>
              ))}
              {(!project.project_documents_list || project.project_documents_list.length === 0) && (
                <p className="text-sm text-gray-500">No documents found.</p>
              )}
            </div>
          </div>
        )}
        
        {tab === "passport" && (
          <div>
             <h4 className="font-semibold text-gray-900 mb-4">Property Passport</h4>
             {project.linked_passport_id ? (
                <div className="p-4 border rounded shadow-sm">
                  <p className="font-medium text-green-600">Passport Linked</p>
                  <Link href={`/ops/property-passports/${project.linked_passport_id}`} className="text-sm text-blue-600 hover:underline">Manage Passport</Link>
                </div>
             ) : (
                <div>
                  <p className="text-sm text-gray-500 mb-4">No passport is linked to this project yet.</p>
                  <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded">Create Passport</button>
                </div>
             )}
          </div>
        )}

        {tab === "materials" && (
          <div>
             <h4 className="font-semibold text-gray-900 mb-4">Materials</h4>
             <p className="text-sm text-gray-500">Material quote requests and deliveries for this project.</p>
          </div>
        )}

        {tab === "finance" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-gray-900">Project Finance</h4>
              <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded shadow-sm hover:bg-blue-700">Manage Budget</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded border">
                <p className="text-sm text-gray-500 font-medium">Estimated Budget</p>
                <p className="text-2xl font-bold text-gray-900">₹{Number(project.project_finance?.estimated_budget || 0).toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded border">
                <p className="text-sm text-gray-500 font-medium">Current Spend</p>
                <p className="text-2xl font-bold text-gray-900">₹{Number(project.project_finance?.current_spend || 0).toLocaleString()}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded border border-blue-100">
                <p className="text-sm text-blue-600 font-medium">BG Est. Revenue</p>
                <p className="text-2xl font-bold text-blue-900">₹{Number(project.project_finance?.buildogram_revenue_estimate || 0).toLocaleString()}</p>
                <p className="text-xs text-blue-600 mt-1">Margin: {project.project_finance?.margin_type || 'service_fee'}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h5 className="font-medium text-gray-900">Invoices</h5>
                  <button className="text-xs text-blue-600 font-medium">+ Create Invoice</button>
                </div>
                <ul className="divide-y divide-gray-200 border rounded shadow-sm bg-white">
                  {project.project_invoices?.map(inv => (
                    <li key={inv.id} className="p-3 text-sm flex justify-between items-center hover:bg-gray-50">
                      <div>
                        <p className="font-medium text-blue-600">{inv.invoice_number}</p>
                        <p className="text-xs text-gray-500">{inv.invoice_type}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">₹{Number(inv.total_amount).toLocaleString()}</p>
                        <span className="text-xs text-gray-500 uppercase">{inv.status}</span>
                      </div>
                    </li>
                  ))}
                  {(!project.project_invoices || project.project_invoices.length === 0) && (
                    <li className="p-4 text-sm text-gray-500 text-center">No invoices created.</li>
                  )}
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h5 className="font-medium text-gray-900">Payments</h5>
                  <button className="text-xs text-blue-600 font-medium">+ Record Payment</button>
                </div>
                <ul className="divide-y divide-gray-200 border rounded shadow-sm bg-white">
                  {project.project_payments?.map(pay => (
                    <li key={pay.id} className="p-3 text-sm flex justify-between items-center hover:bg-gray-50">
                      <div>
                        <p className="font-medium text-gray-900">{pay.payment_mode}</p>
                        <p className="text-xs text-gray-500">{pay.payment_date ? format(new Date(pay.payment_date), 'MMM d, yyyy') : ''}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${pay.payment_direction === 'incoming' ? 'text-green-600' : 'text-red-600'}`}>
                          {pay.payment_direction === 'incoming' ? '+' : '-'}₹{Number(pay.amount).toLocaleString()}
                        </p>
                        <span className="text-xs text-gray-500 uppercase">{pay.status}</span>
                      </div>
                    </li>
                  ))}
                  {(!project.project_payments || project.project_payments.length === 0) && (
                    <li className="p-4 text-sm text-gray-500 text-center">No payments recorded.</li>
                  )}
                </ul>
              </div>
            </div>

            {project.partner_commissions && project.partner_commissions.length > 0 && (
              <div>
                <h5 className="font-medium text-gray-900 mb-4">Partner Commissions</h5>
                <ul className="divide-y divide-gray-200 border rounded shadow-sm bg-white">
                  {project.partner_commissions.map(comm => (
                    <li key={comm.id} className="p-3 text-sm flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">{comm.commission_type}</p>
                        <p className="text-xs text-gray-500">Rate: {Number(comm.commission_rate)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">₹{Number(comm.commission_amount).toLocaleString()}</p>
                        <span className="text-xs text-yellow-600 uppercase">{comm.status}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
