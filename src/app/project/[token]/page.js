import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";

export const metadata = {
  title: "Project View | Buildogram",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function ClientProjectViewPage({ params }) {
  const { token } = await params;

  const project = await prisma.projects.findUnique({
    where: { share_token: token },
    include: {
      partners: true,
      project_milestones: { orderBy: { planned_date: "asc" } },
      project_documents_list: { 
        where: { visibility: "client_visible" },
        orderBy: { created_at: "desc" } 
      },
      property_passports: {
        where: { id: token }, // We'll just check if linked_passport_id exists and if so link to it using its id
      },
      project_finance: true,
      project_invoices: {
        where: {
          invoice_type: "customer_invoice",
          status: { not: "draft" }
        },
        orderBy: { created_at: "desc" }
      },
      project_payments: {
        where: { payment_direction: "incoming" },
        orderBy: { payment_date: "desc" }
      }
    },
  });

  if (!project) return notFound();

  // If there's a linked passport, we need its token to construct the link
  let passportToken = null;
  if (project.linked_passport_id) {
    const passport = await prisma.property_passports.findUnique({ where: { id: project.linked_passport_id } });
    if (passport) passportToken = passport.token;
  }

  const completedMilestones = project.project_milestones.filter(m => m.status === 'completed').length;
  const totalMilestones = project.project_milestones.length;
  const progressPercent = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
              <p className="text-sm text-gray-500 mt-1">Project ID: {project.project_code || "Processing"}</p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {project.status?.toUpperCase().replace("_", " ")}
              </span>
            </div>
          </div>
          
          <div className="mt-6 border-t border-gray-100 pt-6">
            <h3 className="text-sm font-medium text-gray-900">Overall Progress</h3>
            <div className="mt-2 relative pt-1">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div style={{ width: `${progressPercent}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{completedMilestones} of {totalMilestones} stages completed</span>
                <span>{progressPercent}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {passportToken ? (
             <Link href={`/property-passport/${passportToken}`} className="bg-white p-4 rounded-lg shadow border border-blue-100 flex items-center justify-between hover:bg-blue-50 transition">
               <div>
                 <p className="font-semibold text-gray-900">Property Passport</p>
                 <p className="text-sm text-gray-500">View quality & inspection records</p>
               </div>
               <span className="text-blue-600">&rarr;</span>
             </Link>
          ) : (
             <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 flex items-center justify-between">
               <div>
                 <p className="font-semibold text-gray-600">Property Passport</p>
                 <p className="text-sm text-gray-500">Will be linked upon handover</p>
               </div>
             </div>
          )}

          <div className="bg-white p-4 rounded-lg shadow border border-gray-100 flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Need Help?</p>
              <p className="text-sm text-gray-500">Contact Buildogram Support</p>
            </div>
            <Link href="tel:+918888888888" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-800 font-medium">Call Us</Link>
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Execution Tracker</h2>
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
                          {milestone.status === 'completed' && (
                            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className={`text-sm ${milestone.status === 'completed' ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                            {milestone.milestone_name}
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
                <p className="text-sm text-gray-500">Tracker is being set up.</p>
              )}
            </ul>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Finance & Payments</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-500 font-medium">Approved Budget</p>
                <p className="text-xl font-bold text-gray-900">
                  {project.project_finance?.approved_budget > 0 
                    ? `₹${Number(project.project_finance.approved_budget).toLocaleString()}` 
                    : "Pending Approval"}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-500 font-medium">Total Paid</p>
                <p className="text-xl font-bold text-gray-900">
                  ₹{project.project_payments.reduce((sum, p) => sum + Number(p.amount), 0).toLocaleString()}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Your Invoices</h3>
              {project.project_invoices.length > 0 ? (
                <ul className="divide-y divide-gray-200 border rounded shadow-sm">
                  {project.project_invoices.map((inv) => (
                    <li key={inv.id} className="p-3 flex justify-between items-center bg-white">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{inv.invoice_number}</p>
                        <p className="text-xs text-gray-500">Total: ₹{Number(inv.total_amount).toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium 
                          ${inv.status === 'paid' ? 'bg-green-100 text-green-800' : 
                            inv.status === 'overdue' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {inv.status?.toUpperCase()}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No invoices available.</p>
              )}
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Important Documents</h2>
          {project.project_documents_list.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {project.project_documents_list.map((doc) => (
                <li key={doc.id} className="py-3 flex justify-between items-center">
                  <span className="text-sm text-gray-800">{doc.title}</span>
                  {doc.file_url && (
                    <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800">
                      View
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No documents shared yet.</p>
          )}
        </div>

      </div>
    </div>
  );
}
