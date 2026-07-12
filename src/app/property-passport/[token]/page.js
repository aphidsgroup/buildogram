import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";

export const metadata = {
  title: "Property Passport | Buildogram",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PropertyPassportOwnerView({ params }) {
  const { token } = await params;

  const passport = await prisma.property_passports.findUnique({
    where: { share_token: token },
    include: {
      records: {
        where: { visibility: { in: ['owner_visible', 'public_summary'] } },
        orderBy: { record_date: "desc" },
      },
      checklists: {
        orderBy: { created_at: "asc" },
      },
      bqs_inspections: {
        where: { status: { in: ['completed', 'closed'] } }, // Only show completed inspections to owner
        include: {
          results: {
            include: { checklist_item: true }
          }
        },
        orderBy: { created_at: "asc" }
      }
    },
  });

  if (!passport) {
    notFound();
  }

  const completionCount = passport.checklists.filter(c => c.status === 'completed').length;
  const totalTasks = passport.checklists.length;
  const progressPercent = totalTasks > 0 ? Math.round((completionCount / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Property Passport</h1>
            <p className="text-slate-500 font-medium">Verified by Buildogram</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm text-center">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Passport Number</div>
            <div className="text-xl font-black text-orange-500">{passport.passport_number}</div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Property Details</h2>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-slate-500">Name</div>
                <div className="font-bold text-slate-900 text-lg">{passport.property_name || 'Untitled Property'}</div>
              </div>
              <div className="flex gap-8">
                <div>
                  <div className="text-sm text-slate-500">Type</div>
                  <div className="font-semibold text-slate-700">{passport.property_type || '—'}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Area</div>
                  <div className="font-semibold text-slate-700">{passport.property_area || '—'}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Owner Info</h2>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-slate-500">Name</div>
                <div className="font-bold text-slate-900 text-lg">{passport.owner_name}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500">Status</div>
                <div className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold capitalize bg-emerald-100 text-emerald-800">
                  {passport.status.replace(/_/g, ' ')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Construction Progress</h2>
              <p className="text-sm text-slate-500">{completionCount} of {totalTasks} stages completed</p>
            </div>
            <div className="text-2xl font-black text-orange-500">{progressPercent}%</div>
          </div>
          <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-500 rounded-full transition-all duration-1000" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Checklist Tasks */}
          <div className="mt-6 space-y-2">
            {passport.checklists.length === 0 ? (
              <div className="text-slate-500 text-sm italic">No stages tracked yet.</div>
            ) : passport.checklists.map(c => (
              <div key={c.id} className={`flex items-center p-3 rounded-lg border ${c.status === 'completed' ? 'bg-slate-50 border-slate-100' : 'bg-white border-slate-200'}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${c.status === 'completed' ? 'bg-emerald-500 text-white' : 'border-2 border-slate-300'}`}>
                  {c.status === 'completed' && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-bold ${c.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                    {c.checklist_item}
                  </div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">{c.stage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Records */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Verified Digital Records</h2>
          <div className="space-y-3">
            {passport.records.length === 0 ? (
              <div className="text-slate-500 text-sm italic">No verified records available yet.</div>
            ) : passport.records.map(r => (
              <div key={r.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-orange-200 transition-colors bg-slate-50/50">
                <div className="mb-3 sm:mb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-200 text-slate-600">
                      {r.category.replace(/_/g, ' ')}
                    </span>
                    <h3 className="font-bold text-slate-900">{r.title}</h3>
                  </div>
                  {r.description && <p className="text-sm text-slate-500">{r.description}</p>}
                  <div className="text-xs text-slate-400 mt-1 font-medium">{new Date(r.created_at).toLocaleDateString()}</div>
                </div>
                {r.file_url ? (
                  <a href={r.file_url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-4 py-2 bg-white border border-slate-200 shadow-sm rounded-lg text-sm font-bold text-slate-700 hover:text-orange-600 hover:border-orange-200 transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    View Record
                  </a>
                ) : (
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg">Verified Offline</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* BQS Inspections (Owner Visible) */}
        {passport.bqs_inspections?.length > 0 && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mt-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Buildogram Quality System (BQS)</h2>
                <p className="text-sm text-slate-500 mt-1">Stage-wise quality and structural integrity inspections.</p>
              </div>
              <div className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">
                {passport.bqs_inspections.length} Stages Verified
              </div>
            </div>
            
            <div className="space-y-4">
              {passport.bqs_inspections.map(ins => {
                const totalChecks = ins.results.length;
                const passedChecks = ins.results.filter(r => r.status === 'pass' || r.status === 'observation').length;
                const score = totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 100;
                
                return (
                  <div key={ins.id} className="border border-slate-200 rounded-xl overflow-hidden">
                    <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-slate-800 uppercase tracking-wide text-sm">{ins.stage.replace('_', ' ')} Stage</h3>
                        <div className="text-xs text-slate-500 mt-1">{new Date(ins.created_at).toLocaleDateString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-slate-400 uppercase">Quality Score</div>
                        <div className={`text-lg font-black ${score === 100 ? 'text-emerald-600' : 'text-blue-600'}`}>{score}%</div>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <div className="flex gap-4 text-sm text-slate-600 mb-3">
                        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> {passedChecks} Passed</div>
                        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-300"></span> {totalChecks - passedChecks} N/A or Reworked</div>
                      </div>
                      <p className="text-sm text-slate-500 italic">
                        {ins.status === 'completed' || ins.status === 'closed' ? "All checkpoints cleared and necessary reworks verified by engineers." : "Inspection ongoing."}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
