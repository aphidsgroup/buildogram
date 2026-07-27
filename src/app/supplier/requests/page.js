'use client';

import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { useEffect, useMemo, useState } from 'react';
import { notifyEvent } from '@/lib/services/notificationService';
import { logActivity } from '@/lib/services/activityLogService';

const CLOSED = new Set(['Request closed', 'Request expired', 'Accepted', 'Rejected']);

function displayStatus(quote) {
  const requestStatus = String(quote.request?.status || '').toLowerCase();
  if (['accepted', 'closed', 'completed', 'cancelled'].includes(requestStatus)) return 'Request closed';
  if (quote.request?.requiredDate && new Date(quote.request.requiredDate) < new Date()) return 'Request expired';
  const responseStatus = String(quote.status || 'pending').toLowerCase();
  if (responseStatus === 'pending') return 'Draft response';
  if (responseStatus === 'submitted') return 'Response submitted';
  if (responseStatus === 'revised') return 'Response revised';
  if (responseStatus === 'accepted') return 'Accepted';
  if (responseStatus === 'rejected') return 'Rejected';
  return 'No response submitted';
}

function toRequest(quote) {
  return {
    id: quote.requestId,
    material: quote.material,
    qty: quote.qty,
    unit: quote.unit || 'unit',
    requiredDate: quote.request?.requiredDate,
    location: quote.request?.deliveryLocation || 'Not specified',
    projectArea: quote.request?.projectArea || 'Material quotation request',
    boqAvailable: quote.request?.boqAvailable,
    boqFileUrl: quote.request?.boqFileUrl,
    status: displayStatus(quote),
    quote,
  };
}

const emptyForm = {
  rate: '',
  gstIncluded: false,
  deliveryCharge: '',
  deliveryDays: '',
  validUntil: '',
  notes: '',
};

export default function SupplierRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let active = true;
    fetch('/api/material-quotes')
      .then(async response => {
        const data = await response.json();
        if (!response.ok || !data.success) throw new Error();
        return data;
      })
      .then(data => {
        if (active) setRequests((data.quotes || []).map(toRequest));
      })
      .catch(() => {
        if (active) setLoadError('Material quotation requests are temporarily unavailable.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const filtered = useMemo(
    () => requests.filter(request => filter === 'All' || request.status === filter),
    [filter, requests],
  );
  const total = selected
    ? (Number(form.rate || 0) * Number(selected.qty || 0)) + Number(form.deliveryCharge || 0)
    : 0;

  function openForm(request) {
    const quote = request.quote;
    setSelected(request);
    setSaveError('');
    setForm({
      rate: quote.rate ?? '',
      gstIncluded: Boolean(quote.gstIncluded),
      deliveryCharge: quote.deliveryCharge ?? '',
      deliveryDays: quote.deliveryDays ?? '',
      validUntil: quote.validUntil ? String(quote.validUntil).slice(0, 10) : '',
      notes: quote.notes ?? '',
    });
  }

  async function submitQuote(event) {
    event.preventDefault();
    const rate = Number(form.rate);
    if (!Number.isFinite(rate) || rate <= 0) {
      setSaveError('Enter a valid positive unit rate.');
      return;
    }

    setSaving(true);
    setSaveError('');
    try {
      const response = await fetch('/api/material-quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rfqId: selected.id,
          material: selected.material,
          qty: selected.qty,
          unit: selected.unit,
          rate,
          gstIncluded: form.gstIncluded,
          deliveryCharge: Number(form.deliveryCharge || 0),
          deliveryDays: Number(form.deliveryDays || 0),
          validUntil: form.validUntil,
          notes: form.notes,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || 'Unable to save quotation');

      setRequests(current => current.map(request => (
        request.id === selected.id ? toRequest(data.quote) : request
      )));
      void notifyEvent('quote_submitted', { material: selected.material, rfqId: selected.id });
      void logActivity({
        type: 'quote',
        title: 'Quotation Submitted',
        detail: `${selected.material} quotation updated`,
        actor: 'Supplier',
      });
      setNotice(`Quotation saved for ${selected.material}.`);
      setSelected(null);
      setForm(emptyForm);
    } catch (error) {
      setSaveError(error.message || 'Unable to save quotation.');
    } finally {
      setSaving(false);
    }
  }

  const states = [
    'All',
    'Draft response',
    'Response submitted',
    'Response revised',
    'Request closed',
    'Request expired',
  ];

  return (
    <>
      <main>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A' }}>Material quotation requests</h1>
          <p style={{ color: '#64748B' }}>Review assigned requests and submit your supplier response.</p>
        </div>

        {notice && <div role="status" className="alert alert-success">{notice}</div>}

        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {states.map(state => (
            <button
              key={state}
              type="button"
              onClick={() => setFilter(state)}
              className={filter === state ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm'}
            >
              {state}
            </button>
          ))}
        </div>

        {loading && <p>Loading quotation requests…</p>}
        {loadError && <p role="alert" style={{ color: '#B91C1C' }}>{loadError}</p>}
        {!loading && !loadError && filtered.length === 0 && (
          <div className="card" style={{ padding: 32, textAlign: 'center', color: '#64748B' }}>
            No assigned quotation requests in this state.
          </div>
        )}

        <div style={{ display: 'grid', gap: 14 }}>
          {filtered.map(request => (
            <article key={request.id} className="card" style={{ padding: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <div>
                  <h2 style={{ fontSize: 17, marginBottom: 4 }}>{request.material}</h2>
                  <p style={{ color: '#64748B', fontSize: 13 }}>{request.projectArea}</p>
                </div>
                <span className="badge">{request.status}</span>
              </div>
              <dl style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, margin: '18px 0' }}>
                <div><dt>Quantity</dt><dd>{request.qty ?? 'Not specified'} {request.unit}</dd></div>
                <div><dt>Required by</dt><dd>{request.requiredDate ? new Date(request.requiredDate).toLocaleDateString('en-IN') : 'Not specified'}</dd></div>
                <div><dt>Delivery to</dt><dd>{request.location}</dd></div>
              </dl>
              {request.boqAvailable && request.boqFileUrl && (
                <a href={request.boqFileUrl} target="_blank" rel="noreferrer">View attached BOQ</a>
              )}
              {!CLOSED.has(request.status) && (
                <div style={{ textAlign: 'right', marginTop: 16 }}>
                  <button type="button" className="btn btn-primary" onClick={() => openForm(request)}>
                    {request.status === 'Draft response' ? 'Submit quotation' : 'Revise quotation'}
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>

        {selected && (
          <div role="dialog" aria-modal="true" aria-labelledby="quote-dialog-title" style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,.55)', display: 'grid', placeItems: 'center', padding: 20 }}>
            <form onSubmit={submitQuote} className="card" style={{ width: 'min(560px, 100%)', maxHeight: '90vh', overflow: 'auto', padding: 24 }}>
              <h2 id="quote-dialog-title">Supplier response: {selected.material}</h2>
              <label>Unit rate (₹)<input className="input" type="number" min="0.01" step="0.01" required value={form.rate} onChange={e => setForm(current => ({ ...current, rate: e.target.value }))} /></label>
              <label style={{ display: 'flex', gap: 8, margin: '14px 0' }}><input type="checkbox" checked={form.gstIncluded} onChange={e => setForm(current => ({ ...current, gstIncluded: e.target.checked }))} /> Unit rate includes GST</label>
              <label>Delivery charge (₹)<input className="input" type="number" min="0" step="0.01" value={form.deliveryCharge} onChange={e => setForm(current => ({ ...current, deliveryCharge: e.target.value }))} /></label>
              <label>Delivery days<input className="input" type="number" min="0" step="1" value={form.deliveryDays} onChange={e => setForm(current => ({ ...current, deliveryDays: e.target.value }))} /></label>
              <label>Valid until<input className="input" type="date" required value={form.validUntil} onChange={e => setForm(current => ({ ...current, validUntil: e.target.value }))} /></label>
              <label>Payment terms / notes<textarea className="input" rows="3" maxLength="1000" value={form.notes} onChange={e => setForm(current => ({ ...current, notes: e.target.value }))} /></label>
              <p>Quoted total: ₹{total.toLocaleString('en-IN')} (GST {form.gstIncluded ? 'included' : 'excluded'})</p>
              {saveError && <p role="alert" style={{ color: '#B91C1C' }}>{saveError}</p>}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button type="button" className="btn btn-outline" onClick={() => setSelected(null)} disabled={saving}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save response'}</button>
              </div>
            </form>
          </div>
        )}
      </main>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Supplier', path: '/supplier' }, { name: 'Quotation requests', path: '/supplier/requests' }]} />
    </>
  );
}
