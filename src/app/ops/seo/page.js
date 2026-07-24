'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function SeoDashboard() {
  const [gscData, setGscData] = useState(null);
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/ops/seo/gsc').then(r => r.json()).catch(() => ({ success: false })),
      fetch('/api/ops/seo/rankings').then(r => r.json()).catch(() => ({ success: false }))
    ]).then(([gscRes, rankRes]) => {
      if (gscRes.success) setGscData(gscRes.data);
      if (rankRes.success) setRankings(rankRes.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading SEO Analytics...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 border-b pb-4 border-slate-200 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">SEO & Organic Rankings OS</h2>
          <p className="text-slate-500 mt-1">Real-time organic performance from Google Search Console and live SERP trackers.</p>
        </div>
      </div>

      {gscData && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl border border-orange-200 shadow-sm">
              <p className="text-sm font-semibold text-orange-600 uppercase">Total Clicks (30d)</p>
              <p className="text-4xl font-black text-orange-900 mt-2">{gscData.summary.totalClicks.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-sm font-semibold text-slate-500 uppercase">Total Impressions (30d)</p>
              <p className="text-3xl font-bold text-slate-800 mt-2">{gscData.summary.totalImpressions.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-sm font-semibold text-slate-500 uppercase">Average CTR</p>
              <p className="text-3xl font-bold text-slate-800 mt-2">{(gscData.summary.averageCtr * 100).toFixed(2)}%</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-sm font-semibold text-slate-500 uppercase">Avg. Position</p>
              <p className="text-3xl font-bold text-slate-800 mt-2">{gscData.summary.averagePosition.toFixed(1)}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-12">
            <h3 className="font-bold text-lg mb-6 text-slate-800">Organic Traffic Trend (Last 30 Days)</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={gscData.daily}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                    tick={{fontSize: 12}} 
                  />
                  <YAxis yAxisId="left" tick={{fontSize: 12}} />
                  <YAxis yAxisId="right" orientation="right" tick={{fontSize: 12}} />
                  <Tooltip 
                    labelFormatter={(val) => new Date(val).toLocaleDateString()}
                  />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="impressions" stroke="#94a3b8" name="Impressions" strokeWidth={2} dot={false} />
                  <Line yAxisId="right" type="monotone" dataKey="clicks" stroke="#fc6e20" name="Clicks" strokeWidth={3} activeDot={{r: 8}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Serper Live Rank Tracker */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <h3 className="font-bold text-lg text-slate-800">Live Rank Tracker</h3>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded font-bold">Serper.dev Live</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-200 bg-white">
                <tr>
                  <th className="p-4 font-semibold">Target Keyword (Chennai)</th>
                  <th className="p-4 font-semibold text-center">Google Position</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rankings.map((rank, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-4 font-medium text-slate-800">{rank.keyword}</td>
                    <td className="p-4 text-center">
                      {rank.position ? (
                        <div className="flex flex-col items-center">
                          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-white ${rank.position <= 3 ? 'bg-emerald-500' : rank.position <= 10 ? 'bg-orange-500' : 'bg-slate-400'}`}>
                            {rank.position}
                          </span>
                          <span className="text-[10px] text-slate-400 mt-1 truncate max-w-[150px]" title={rank.url}>
                            {rank.url ? new URL(rank.url).pathname : ''}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400">Not in top 100</span>
                      )}
                    </td>
                  </tr>
                ))}
                {rankings.length === 0 && (
                  <tr>
                    <td colSpan="2" className="p-8 text-center text-slate-500">No ranking data available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* GSC Top Queries */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <h3 className="font-bold text-lg text-slate-800">Top Organic Queries (30d)</h3>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-bold">Search Console</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-200 bg-white">
                <tr>
                  <th className="p-4 font-semibold">Query</th>
                  <th className="p-4 font-semibold text-right">Clicks</th>
                  <th className="p-4 font-semibold text-right">Impr.</th>
                  <th className="p-4 font-semibold text-right">Pos.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {gscData?.queries.map((q, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-4 font-medium text-slate-800">{q.query}</td>
                    <td className="p-4 text-right font-bold text-slate-700">{q.clicks}</td>
                    <td className="p-4 text-right text-slate-500">{q.impressions}</td>
                    <td className="p-4 text-right text-slate-500">{q.position.toFixed(1)}</td>
                  </tr>
                ))}
                {!gscData?.queries?.length && (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-slate-500">No query data available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
