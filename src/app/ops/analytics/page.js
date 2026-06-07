'use client';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AnalyticsDashboard() {
  const [data, setData] = useState([]);
  const [aiData, setAiData] = useState([]);
  const [partnerData, setPartnerData] = useState([]);
  const [assignmentData, setAssignmentData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [materialData, setMaterialData] = useState([]);
  const [passportData, setPassportData] = useState([]);
  const [bqsData, setBqsData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [revenueData, setRevenueData] = useState({
    totalServiceRevenue: 0,
    totalCommissions: 0,
    totalMaterialMargin: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    Promise.all([
      fetch('/api/ops/attribution').then(r => r.json()),
      fetch('/api/ops/ai-tool-submissions').then(r => r.json()),
      fetch('/api/ops/partners').then(r => r.json()),
      fetch('/api/ops/partner-assignments').then(r => r.json()).catch(() => []),
      fetch('/api/ops/materials/quotes').then(r => r.json()).catch(() => ({ data: [] })),
      fetch('/api/ops/property-passports').then(r => r.json()).catch(() => ({ passports: [] })),
      fetch('/api/ops/bqs/inspections').then(r => r.json()).catch(() => ({ inspections: [] })),
      fetch('/api/ops/projects').then(r => r.json()).catch(() => ({ projects: [] })),
      fetch('/api/ops/revenue-metrics').then(r => r.json()).catch(() => ({ revenue: null }))
    ]).then(([attrRes, aiRes, partnerRes, assignRes, matRes, ppRes, bqsRes, prjRes, revRes]) => {
      if (attrRes.success) setData(attrRes.data);
      if (aiRes.data) setAiData(aiRes.data);
      if (partnerRes.success) setPartnerData(partnerRes.partners || []);
      if (Array.isArray(assignRes)) setAssignmentData(assignRes);
      if (matRes.success && matRes.data) setMaterialData(matRes.data.requests || []);
      if (ppRes.success && ppRes.passports) setPassportData(ppRes.passports);
      if (bqsRes.success && bqsRes.inspections) setBqsData(bqsRes.inspections);
      if (prjRes.success && prjRes.projects) setProjectData(prjRes.projects);
      if (revRes?.success && revRes.revenue) setRevenueData(revRes.revenue);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading Attribution Data...</div>;

  // Process data for charts
  const bySourcePage = {};
  const byUtmSource = {};
  const byDevice = {};
  const byLeadType = {};

  data.forEach(lead => {
    const sp = lead.source_page || 'Unknown / Direct';
    bySourcePage[sp] = (bySourcePage[sp] || 0) + 1;
    
    const src = lead.utm_source || 'organic/direct';
    byUtmSource[src] = (byUtmSource[src] || 0) + 1;
    
    const device = lead.device_type || 'Desktop';
    byDevice[device] = (byDevice[device] || 0) + 1;

    const type = lead.type || 'Unknown';
    byLeadType[type] = (byLeadType[type] || 0) + 1;
  });

  const pageData = Object.entries(bySourcePage).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 10);
  const sourceData = Object.entries(byUtmSource).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 10);
  const deviceData = Object.entries(byDevice).map(([name, value]) => ({ name, value }));
  const typeData = Object.entries(byLeadType).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 10);

  // Process AI Data
  const aiByTool = {};
  let aiHighRisk = 0;
  let aiSameDay = 0;
  const aiByStatus = {};

  aiData.forEach(lead => {
    const tool = lead.tool_name || 'Unknown';
    aiByTool[tool] = (aiByTool[tool] || 0) + 1;
    
    if (lead.risk_level === 'high' || lead.risk_level === 'urgent') aiHighRisk++;
    if (lead.follow_up_priority === 'same_day' || lead.follow_up_priority === 'urgent') aiSameDay++;

    const st = lead.lead_status || 'new';
    aiByStatus[st] = (aiByStatus[st] || 0) + 1;
  });

  const aiToolData = Object.entries(aiByTool).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  const aiStatusData = Object.entries(aiByStatus).map(([name, value]) => ({ name, value }));

  // Process Partner Data
  const activePartners = partnerData.filter(p => p.approvalStatus === 'verified' || p.verification_status === 'verified').length;
  const pendingPartners = partnerData.filter(p => p.approvalStatus === 'pending_review' || p.verification_status === 'pending').length;
  const totalAssignments = assignmentData.length;

  // Process Material Data
  const matByStatus = {};
  let totalQuotesReceived = 0;
  materialData.forEach(mat => {
    matByStatus[mat.status] = (matByStatus[mat.status] || 0) + 1;
    totalQuotesReceived += (mat.supplier_quote_responses?.length || 0);
  });
  const matStatusData = Object.entries(matByStatus).map(([name, value]) => ({ name, value }));

  // Process Passport Data
  const ppByStatus = {};
  let passportsWithRecords = 0;
  passportData.forEach(pp => {
    ppByStatus[pp.status] = (ppByStatus[pp.status] || 0) + 1;
    if (pp._count?.records > 0) passportsWithRecords++;
  });
  const ppStatusData = Object.entries(ppByStatus).map(([name, value]) => ({ name, value }));

  // Process BQS Data
  const bqsByStage = {};
  let openReworks = 0;
  let closedReworks = 0;
  bqsData.forEach(ins => {
    bqsByStage[ins.stage] = (bqsByStage[ins.stage] || 0) + 1;
    if (ins.status === 'rework_required') openReworks++;
    if (ins.status === 'completed' || ins.status === 'closed') closedReworks++;
  });
  const bqsStageData = Object.entries(bqsByStage).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);

  // Process Project Data
  const prjByType = {};
  const prjByStatus = {};
  let totalActiveProjects = 0;
  let missingPartner = 0;

  projectData.forEach(p => {
    prjByType[p.project_type || 'Unknown'] = (prjByType[p.project_type || 'Unknown'] || 0) + 1;
    prjByStatus[p.status || 'Unknown'] = (prjByStatus[p.status || 'Unknown'] || 0) + 1;
    
    if (p.status === 'active') totalActiveProjects++;
    if (!p.linked_partner_id) missingPartner++;
  });
  const prjTypeData = Object.entries(prjByType).map(([name, value]) => ({ name, value }));
  const prjStatusData = Object.entries(prjByStatus).map(([name, value]) => ({ name, value }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Finance OS Dashboard Component */}
      <div className="mb-8 border-b pb-4 border-slate-200 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Finance & Revenue OS</h2>
          <p className="text-slate-500 mt-1">Real-time revenue, service fees, partner commissions, and material margins.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl border border-blue-200 shadow-sm">
          <p className="text-sm font-semibold text-blue-600 uppercase">Total Platform Revenue</p>
          <p className="text-4xl font-black text-blue-900 mt-2">₹{revenueData.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-semibold text-slate-500 uppercase">Project Service Revenue</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">₹{revenueData.totalServiceRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-semibold text-slate-500 uppercase">Paid Commissions</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">₹{revenueData.totalCommissions.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-semibold text-slate-500 uppercase">Materials Margin</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">₹{revenueData.totalMaterialMargin.toLocaleString()}</p>
        </div>
      </div>

      <div className="mb-8 border-b pb-4 border-slate-200 flex justify-between items-end mt-12">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Lead Attribution OS</h1>
          <p className="text-slate-500 mt-2">Track source-to-conversion flow across all channels.</p>
        </div>
        <div className="text-right flex gap-6">
          <div>
            <div className="text-sm font-semibold text-slate-500 uppercase">Active Partners</div>
            <div className="text-4xl font-black text-slate-800">{activePartners}</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-500 uppercase">Leads Assigned</div>
            <div className="text-4xl font-black text-slate-800">{totalAssignments}</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-500 uppercase">Total Leads Tracked</div>
            <div className="text-4xl font-black text-slate-800">{data.length}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg mb-4 text-slate-800">Top Landing / Source Pages</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pageData} layout="vertical" margin={{ left: 50 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} tick={{fontSize: 11}} />
                <Tooltip />
                <Bar dataKey="value" fill="#f97316" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg mb-4 text-slate-800">Top Traffic Sources (UTM)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize: 11}} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg mb-4 text-slate-800">Lead Types</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={typeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {typeData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg mb-4 text-slate-800">Device Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={deviceData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} label>
                  <Cell fill="#10b981" />
                  <Cell fill="#6366f1" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mb-8 border-b pb-4 border-slate-200 mt-12 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">AI Tools Analytics</h2>
          <p className="text-slate-500 mt-1">Lead generation and conversion from AI engineering tools.</p>
        </div>
        <div className="text-right flex gap-6">
          <div>
            <div className="text-xs font-semibold text-red-500 uppercase">High/Urgent Risk</div>
            <div className="text-3xl font-black text-slate-800">{aiHighRisk}</div>
          </div>
          <div>
            <div className="text-xs font-semibold text-orange-500 uppercase">Same Day Action</div>
            <div className="text-3xl font-black text-slate-800">{aiSameDay}</div>
          </div>
          <div>
            <div className="text-xs font-semibold text-blue-500 uppercase">Total AI Leads</div>
            <div className="text-3xl font-black text-slate-800">{aiData.length}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg mb-4 text-slate-800">Leads by AI Tool</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aiToolData} layout="vertical" margin={{ left: 50 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} tick={{fontSize: 11}} />
                <Tooltip />
                <Bar dataKey="value" fill="#ec4899" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg mb-4 text-slate-800">AI Lead Status (Conversion Pipeline)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={aiStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} label>
                  {aiStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mb-8 border-b pb-4 border-slate-200 mt-12 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Materials Marketplace OS</h2>
          <p className="text-slate-500 mt-1">Material quote requests, supplier quotes, and conversion tracking.</p>
        </div>
        <div className="text-right flex gap-6">
          <div>
            <div className="text-xs font-semibold text-purple-500 uppercase">Quote Requests</div>
            <div className="text-3xl font-black text-slate-800">{materialData.length}</div>
          </div>
          <div>
            <div className="text-xs font-semibold text-emerald-500 uppercase">Quotes Received</div>
            <div className="text-3xl font-black text-slate-800">{totalQuotesReceived}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg mb-4 text-slate-800">Quote Request Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={matStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} label>
                  {matStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mb-8 border-b pb-4 border-slate-200 mt-12 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Property Passport OS</h2>
          <p className="text-slate-500 mt-1">Digital property records, documents, and handover tracking.</p>
        </div>
        <div className="text-right flex gap-6">
          <div>
            <div className="text-xs font-semibold text-blue-500 uppercase">With Digital Records</div>
            <div className="text-3xl font-black text-slate-800">{passportsWithRecords}</div>
          </div>
          <div>
            <div className="text-xs font-semibold text-orange-500 uppercase">Total Passports Generated</div>
            <div className="text-3xl font-black text-slate-800">{passportData.length}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg mb-4 text-slate-800">Passport Status (Lifecycle)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={ppStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} label>
                  {ppStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mb-8 border-b pb-4 border-slate-200 mt-12 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Buildogram Quality System (BQS)</h2>
          <p className="text-slate-500 mt-1">Stage-wise engineer inspections and rework tracking.</p>
        </div>
        <div className="text-right flex gap-6">
          <div>
            <div className="text-xs font-semibold text-red-500 uppercase">Open Reworks</div>
            <div className="text-3xl font-black text-slate-800">{openReworks}</div>
          </div>
          <div>
            <div className="text-xs font-semibold text-emerald-500 uppercase">Completed Stages</div>
            <div className="text-3xl font-black text-slate-800">{closedReworks}</div>
          </div>
          <div>
            <div className="text-xs font-semibold text-blue-500 uppercase">Total Inspections</div>
            <div className="text-3xl font-black text-slate-800">{bqsData.length}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg mb-4 text-slate-800">Inspections By Stage</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bqsStageData} layout="vertical" margin={{ left: 50 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 11}} />
                <Tooltip />
                <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="font-bold text-lg text-slate-800">Recent Leads & Attribution</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-800 border-b border-slate-200">
              <tr>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold">Source Page</th>
                <th className="p-4 font-semibold">UTM Source/Medium</th>
                <th className="p-4 font-semibold">Device</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.slice(0, 50).map((lead, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-4 whitespace-nowrap">{new Date(lead.created_at).toLocaleDateString()}</td>
                  <td className="p-4 font-medium text-slate-800">{lead.name || 'Anonymous'}</td>
                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-semibold">{lead.type}</span>
                  </td>
                  <td className="p-4 font-mono text-xs text-slate-500">{lead.source_page || '-'}</td>
                  <td className="p-4">
                    {(lead.utm_source || lead.utm_medium) ? 
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-md text-xs font-semibold">{lead.utm_source || 'organic'} / {lead.utm_medium || 'direct'}</span> 
                      : <span className="text-slate-400">organic / direct</span>}
                  </td>
                  <td className="p-4">{lead.device_type || 'Desktop'}</td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-500">No leads found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
