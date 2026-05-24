'use client';
import { useState } from 'react';
import Navbar from '../Navbar';
import Link from 'next/link';

export default function PlanReviewPage() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', project_location: '',
    plot_size: '', built_up_area: '', floors: '',
    project_type: 'residential', intended_use: 'self_use',
    main_concern: 'space_usage', message: '', plan_file_url: ''
  });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const metadata = {
        project_location: form.project_location,
        plot_size: form.plot_size,
        built_up_area: form.built_up_area,
        floors: form.floors,
        project_type: form.project_type,
        intended_use: form.intended_use,
        main_concern: form.main_concern,
        plan_file_url: form.plan_file_url,
        plan_review_status: 'requested'
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_type: 'plan_review',
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.message,
          metadata
        })
      });
      
      const data = await res.json();
      if (data.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="card text-center max-w-md p-8">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-2xl font-bold mb-2 text-slate-800">Request Submitted</h1>
            <p className="text-slate-600 mb-6">Our experts will review your details and get back to you with the advisory plan review report soon.</p>
            <Link href="/" className="btn btn-primary">Return Home</Link>
          </div>
        </div>
        <footer style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '14px', borderTop: '1px solid #e2e8f0' }}>
          © 2025 Buildogram. All rights reserved.
        </footer>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <section className="bg-indigo-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="badge bg-indigo-800 text-indigo-100 mb-4 inline-block">AI-Assisted Expert Review</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Floor Plan Review Assistant</h1>
          <p className="text-lg text-indigo-200 max-w-2xl mx-auto mb-8">
            Get an expert advisory review of your architectural or floor plans. We analyze space usage, ventilation, cost impacts, and practicality before you build.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="card p-6 md:p-8">
            
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h4 className="font-bold text-amber-800 text-sm mb-1">Disclaimer</h4>
              <p className="text-xs text-amber-700">
                This plan review is strictly advisory and based on the information provided. It is not structural approval, architectural certification, legal approval, or government approval. Final decisions must be reviewed by qualified architects, structural engineers, and relevant approval authorities.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Full Name *</label>
                  <input required type="text" className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input required type="tel" className="input" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                </div>
              </div>

              <div className="grid-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                  <input type="email" className="input" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Project Location</label>
                  <input type="text" className="input" placeholder="City or Area" value={form.project_location} onChange={e => setForm({...form, project_location: e.target.value})} />
                </div>
              </div>

              <hr className="border-slate-100" />

              <h3 className="font-bold text-slate-800">Project Details</h3>
              
              <div className="grid-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Plot Size</label>
                  <input type="text" className="input" placeholder="e.g. 30x40" value={form.plot_size} onChange={e => setForm({...form, plot_size: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Built-up Area</label>
                  <input type="text" className="input" placeholder="e.g. 2400 sqft" value={form.built_up_area} onChange={e => setForm({...form, built_up_area: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Floors</label>
                  <input type="number" className="input" placeholder="e.g. 2" value={form.floors} onChange={e => setForm({...form, floors: e.target.value})} />
                </div>
              </div>

              <div className="grid-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Project Type</label>
                  <select className="input" value={form.project_type} onChange={e => setForm({...form, project_type: e.target.value})}>
                    <option value="residential">Residential</option>
                    <option value="villa">Villa</option>
                    <option value="commercial">Commercial</option>
                    <option value="renovation">Renovation</option>
                    <option value="rental">Rental Property</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Intended Use</label>
                  <select className="input" value={form.intended_use} onChange={e => setForm({...form, intended_use: e.target.value})}>
                    <option value="self_use">Self Use</option>
                    <option value="rental">Rental / Leasing</option>
                    <option value="resale">Resale / Flipping</option>
                    <option value="commercial">Commercial Operation</option>
                    <option value="mixed">Mixed Use</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Main Concern / Focus Area</label>
                <select className="input" value={form.main_concern} onChange={e => setForm({...form, main_concern: e.target.value})}>
                  <option value="space_usage">Space Optimization & Layout</option>
                  <option value="cost_impact">Cost Impact of Design</option>
                  <option value="ventilation">Ventilation & Natural Light</option>
                  <option value="parking">Parking & Access</option>
                  <option value="vastu">Vastu Compliance</option>
                  <option value="rental_suitability">Rental Yield Suitability</option>
                  <option value="construction_practicality">Construction Practicality</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Plan Document Link (Optional)</label>
                <input type="url" className="input" placeholder="Google Drive, Dropbox, or Image URL" value={form.plan_file_url} onChange={e => setForm({...form, plan_file_url: e.target.value})} />
                <p className="text-xs text-slate-500 mt-1">If you have the plan, provide a link so our AI can analyze it.</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Specific Questions</label>
                <textarea className="input" rows="3" placeholder="What specific feedback are you looking for?" value={form.message} onChange={e => setForm({...form, message: e.target.value})}></textarea>
              </div>

              {status === 'error' && <div className="text-red-500 text-sm font-bold">Failed to submit request. Please try again.</div>}

              <button type="submit" className="btn btn-primary w-full py-3 text-lg" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Submitting...' : 'Request Plan Review'}
              </button>
            </form>
          </div>
        </div>
      </section>
      
      <footer style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '14px', borderTop: '1px solid #e2e8f0' }}>
        © 2025 Buildogram. All rights reserved.
      </footer>
    </main>
  );
}
