'use client';
import { useState, useRef, useEffect } from 'react';
import { SectionHeader } from '../_shared/components';

const QUICK_PROMPTS = [
  { label: '📋 Generate BOQ Draft', prompt: 'Generate BOQ draft' },
  { label: '📓 Summarize Site Update', prompt: 'Summarize daily site update' },
  { label: '⚠️ Detect Delay Risk', prompt: 'Detect delay risk' },
  { label: '🧱 Suggest Material Quantities', prompt: 'Suggest material quantities' },
  { label: '💬 Draft Client Update', prompt: 'Draft client update message' },
  { label: '📊 Generate Weekly Report', prompt: 'Generate weekly report' },
  { label: '💰 Explain Project P&L', prompt: 'Explain project P&L' },
  { label: '✅ Create Inspection Checklist', prompt: 'Create site inspection checklist' },
];

const AI_RESPONSES = {
  'generate boq draft': `Here is a sample BOQ draft for a standard G+2 residential project (~1,500 sqft built-up area):

**📋 BOQ Draft — Standard Residential G+2**

| Category | Item | Qty | Unit | Est. Cost |
|---|---|---|---|---|
| Foundation | PCC M10 Concrete | 45 | m³ | ₹2.25L |
| RCC | M25 Columns & Beams | 120 | m³ | ₹9.6L |
| Blockwork | AAC Block Masonry | 850 | m² | ₹4.25L |
| Plastering | 20mm Cement Plaster | 1,200 | m² | ₹3.6L |
| Flooring | Vitrified Tiles 800×800 | 600 | m² | ₹6.6L |
| Electrical | Full wiring + MCB | 1 | Lump | ₹3.5L |
| Plumbing | CPVC + sanitary | 1 | Lump | ₹2.8L |
| Painting | Interior + exterior | 1 | Lump | ₹2.2L |

**Grand Total (Standard Package): ₹34.8 L**
*Excludes approval charges, architect fees, and interior work.*

✅ Tip: Open BOQ Studio → Add Item to build your detailed BOQ with actual quantities.`,

  'summarize daily site update': `Here's a summarized site update based on today's logs:

**📓 Daily Site Summary — May 25, 2026**

**Project:** Rajesh Kumar Villa – Velachery
**Stage:** Structure (Ground Floor Columns)

✅ **Completed Today:**
Ground floor column casting completed. 8 columns poured using M25 grade concrete. Shuttering for first floor slab started in the evening.

👷 **Workforce:** 24 workers on site (18 skilled, 6 unskilled)
🧱 **Materials Used:** 12 bags OPC cement, 0.8MT Tata Tiscon steel

⚠️ **Issue Logged:**
Concrete pump arrived 2 hours late. Recommend booking 1 day in advance for next pour.

📋 **Tomorrow's Plan:**
Complete first floor slab shuttering. Target to pour slab by May 27.`,

  'detect delay risk': `🔍 **Delay Risk Analysis — Partner OS AI**

Based on your current project data:

**🚨 HIGH RISK: P001 – Rajesh Kumar Villa (Velachery)**
- Current Stage: Structure | Progress: 35%
- Planned completion: Dec 2026
- **Estimated delay: 12–18 days**
- Root cause: Concrete pump delay (2 hrs lost on May 24) + pending steel delivery
- **Recommendation:** Add 4 additional workers to structure team. Pre-book steel delivery for May 28. Schedule pump 24 hrs in advance.

**⚠️ MEDIUM RISK: P002 – Priya Interior (OMR)**
- Current Stage: Flooring | Progress: 60%
- **Estimated delay: 5–7 days**
- Root cause: Bathroom waterproofing material not yet received
- **Recommendation:** Follow up with vendor immediately. Alternative: Proceed with remaining bedroom flooring in parallel.

**✅ ON TRACK: P004 – Arun Renovation (Porur)**
- Progress: 80% | Stage: Painting
- No significant delay risk detected.`,

  'suggest material quantities': `📦 **Material Quantity Suggestions**

For a standard G+2 residential home (1,500 sqft built-up, Velachery, Chennai):

| Material | Qty | Unit | Est. Rate | Est. Cost |
|---|---|---|---|---|
| OPC 53 Cement (UltraTech) | 480 | Bags | ₹420 | ₹2.02L |
| TMT Steel 16mm (Tata Tiscon) | 8.5 | MT | ₹58,000 | ₹4.93L |
| River Sand (M-Sand) | 120 | Tons | ₹1,800 | ₹2.16L |
| 20mm Metal | 90 | Tons | ₹1,400 | ₹1.26L |
| Red Bricks / AAC Blocks | 850 | m² | ₹320 | ₹2.72L |
| Vitrified Tiles (800×800) | 220 | Boxes | ₹1,800 | ₹3.96L |
| CPVC Pipe (25mm) | 180 | RFT | ₹85 | ₹15,300 |

*Quantities include 5–8% wastage buffer. Prices as per May 2026 Chennai market rates.*`,

  'draft client update message': `Here's a WhatsApp-ready client update message:

---
🏗️ *Buildogram Project Update*
*Client:* Rajesh Kumar
*Project:* Velachery Villa – G+2

Hi Rajesh! 🙏 Here's your weekly project update:

✅ *Work Completed this week:*
Ground floor column casting (8 columns) is complete. Concrete quality test passed. First floor slab shuttering is in progress.

📊 *Overall Progress:* 35% ✅

🗓️ *Next milestone:*
First floor slab pour – Planned for May 27–28, 2026.

⚠️ *Note:*
Minor delay of 2 hours on May 24 due to pump scheduling. This has been accounted for in the plan.

📸 Site photos have been uploaded to your Client Room on Buildogram. You can view them here: buildogram.in/client/dashboard

Feel free to call or WhatsApp us anytime. 🙏
*Team Buildogram Partner*
---

✏️ *Customise this message with your name and project details before sending.*`,

  'generate weekly report': `📊 **Weekly Progress Report — Week of May 19–25, 2026**

**Projects Summary:**

| Project | Stage | Progress | This Week | Issues |
|---|---|---|---|---|
| Rajesh Kumar Villa | Structure | 35% | +8% | Pump delay (resolved) |
| Priya Interior – OMR | Flooring | 60% | +12% | Material pending |
| Arun Renovation – Porur | Painting | 80% | +15% | None |

**Material Highlights:**
- 200 cement bags approved, delivery pending (May 28)
- Steel ordered for P001 — on track

**Labour Summary:**
- P001: 24 workers avg/day
- P002: 10 workers avg/day
- P004: 8 workers avg/day

**Financial Snapshot:**
- Total BOQ Value: ₹4.2 Cr
- Approved Budget: ₹4.2 Cr
- Actual Cost to Date: ₹1.47 Cr (35%)
- Pending Payments: ₹12.5 L

**Next Week Priorities:**
1. First floor slab pour — P001 (May 27)
2. Bathroom waterproofing material delivery — P002
3. Final painting coat — P004`,

  'explain project p&l': `💰 **Project P&L Explanation**

Here's how to read your project P&L in Buildogram Partner OS:

**Revenue (Client Quote):** The total amount the client pays you (BOQ Grand Total including your margin + GST).

**Internal Cost:** Raw material + labour + equipment cost + wastage. Your actual spend.

**Gross Profit = Revenue − Internal Cost**

**Example — Rajesh Kumar Villa:**
- Client Quote (Revenue): ₹84L
- Internal Cost (BOQ): ₹73.9L (includes materials, labour, equipment, 5% wastage)
- Gross Profit: ₹10.1L
- Gross Margin: **~12%** ✅

⚠️ **Watch out for:**
- Material price hikes after BOQ approval
- Labour cost overruns on structural work
- Change orders not updated in BOQ

✅ **Best Practice:** Lock material rates in writing before starting any stage. Update actual costs in Finance Tracker weekly.`,

  'create site inspection checklist': `✅ **Site Inspection Checklist — RCC Structure Stage**

Use this checklist before and after each concrete pour:

**Pre-Pour Checklist:**
- [ ] Structural drawing approved by engineer
- [ ] Shuttering alignment checked (plumb & level)
- [ ] Reinforcement bars correct diameter and spacing
- [ ] Cover blocks placed (25mm clear cover for columns)
- [ ] Concrete grade confirmed (M25 for columns)
- [ ] Water-cement ratio checked
- [ ] Vibrator available on site
- [ ] Curing water arrangement ready

**During Pour:**
- [ ] Slump test conducted (target: 75–100mm)
- [ ] Concrete cube samples collected (6 cubes per pour)
- [ ] Pour done in layers ≤ 300mm
- [ ] Vibrator used every 600mm

**Post-Pour:**
- [ ] Curing started within 12 hours
- [ ] Wet burlap or curing compound applied
- [ ] Shuttering not removed before 24 hrs (columns), 14 days (slabs)
- [ ] Cube test report received at 7 days & 28 days

📋 Open Quality Vault → New Checklist to record this digitally with photo proof.`,
};

function getAIResponse(userMsg) {
  const key = userMsg.toLowerCase().trim();
  for (const [k, v] of Object.entries(AI_RESPONSES)) {
    if (key.includes(k) || k.includes(key.slice(0, 15))) return v;
  }
  return `Great question! 🤖

I'm the **Buildogram AI Site Assistant**. I can help you with:
- BOQ drafts and material quantities
- Delay risk detection
- Client update messages
- Site inspection checklists
- Weekly reports and P&L explanations

Full AI responses with your actual project data will be available when you connect your Gemini API key in ⚙️ **Settings → AI Configuration**.

Try one of the quick prompts above to see demo responses!`;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `👋 Hello! I'm your **Buildogram AI Site Assistant**.\n\nI can help you generate BOQ drafts, detect delay risks, draft client messages, create inspection checklists, and more.\n\nTry a quick prompt below or type your question!`, ts: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim() || loading) return;
    const userMsg = { role: 'user', content: text.trim(), ts: new Date() };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      setMessages(m => [...m, { role: 'assistant', content: getAIResponse(text), ts: new Date() }]);
      setLoading(false);
    }, 800);
  };

  const formatContent = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <div key={i} style={{ fontWeight: 700, margin: '8px 0 4px' }}>{line.replace(/\*\*/g, '')}</div>;
      }
      if (line.startsWith('- [ ]')) {
        return <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}><span>⬜</span><span>{line.slice(5)}</span></div>;
      }
      if (line.startsWith('- ')) {
        return <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}><span style={{ color: '#FC6E20' }}>•</span><span>{line.slice(2)}</span></div>;
      }
      if (line.match(/^\|.+\|$/)) {
        const cells = line.split('|').filter(c => c.trim());
        const isHeader = cells.every(c => !c.includes('---'));
        if (line.includes('---')) return null;
        return (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: `repeat(${cells.length}, 1fr)`, gap: '4px', marginBottom: '2px' }}>
            {cells.map((cell, ci) => (
              <div key={ci} style={{ padding: '4px 6px', background: isHeader ? 'rgba(252,110,32,0.08)' : '#F8FAFC', borderRadius: '4px', fontSize: '12px', fontWeight: isHeader ? 700 : 400 }}>
                {cell.trim().replace(/\*\*/g, '')}
              </div>
            ))}
          </div>
        );
      }
      if (line.trim() === '---') return <hr key={i} style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '10px 0' }} />;
      if (!line.trim()) return <div key={i} style={{ height: '6px' }} />;
      return <div key={i} style={{ marginBottom: '2px' }}>{line.replace(/\*\*/g, '')}</div>;
    }).filter(Boolean);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 160px)', minHeight: '500px' }}>
      <SectionHeader icon="🤖" title="Buildogram AI Site Assistant" desc="Ask AI to analyze data, generate BOQs, draft messages, and create checklists" />

      {/* QUICK PROMPTS */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {QUICK_PROMPTS.map(qp => (
          <button key={qp.prompt} onClick={() => sendMessage(qp.prompt)} style={{
            padding: '7px 14px', borderRadius: '999px', border: '1px solid rgba(252,110,32,0.3)',
            background: 'rgba(252,110,32,0.05)', color: '#FC6E20', fontSize: '13px', fontWeight: 600,
            cursor: 'pointer', transition: 'all 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(252,110,32,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(252,110,32,0.05)'; }}>
            {qp.label}
          </button>
        ))}
        <button onClick={() => setMessages([{ role: 'assistant', content: '👋 Chat cleared. Ask me anything!', ts: new Date() }])}
          style={{ padding: '7px 14px', borderRadius: '999px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', fontSize: '13px', cursor: 'pointer' }}>
          🗑️ Clear
        </button>
      </div>

      {/* CHAT WINDOW */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', background: '#F8FAFC', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            {msg.role === 'assistant' && (
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,#FFB347,#FC6E20)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0, marginRight: '10px', alignSelf: 'flex-start', marginTop: '4px' }}>🤖</div>
            )}
            <div style={{
              maxWidth: '80%', padding: '12px 16px', borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
              background: msg.role === 'user' ? 'linear-gradient(135deg,#FFB347,#FC6E20)' : 'white',
              color: msg.role === 'user' ? 'white' : 'var(--text)',
              fontSize: '14px', lineHeight: 1.6, boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              border: msg.role === 'assistant' ? '1px solid var(--border)' : 'none',
            }}>
              {msg.role === 'assistant' ? formatContent(msg.content) : msg.content}
              <div style={{ fontSize: '11px', marginTop: '6px', opacity: 0.6 }}>
                {msg.ts?.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            {msg.role === 'user' && (
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0, marginLeft: '10px', alignSelf: 'flex-start', marginTop: '4px' }}>👤</div>
            )}
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,#FFB347,#FC6E20)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🤖</div>
            <div style={{ padding: '12px 18px', background: 'white', borderRadius: '4px 18px 18px 18px', border: '1px solid var(--border)', display: 'flex', gap: '4px', alignItems: 'center' }}>
              {[0, 1, 2].map(j => <div key={j} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#FC6E20', animation: `bounce 1s ${j * 0.2}s infinite`, opacity: 0.7 }} />)}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <input
          className="input"
          style={{ flex: 1, borderRadius: '12px' }}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask AI about your projects, BOQ, delays, materials..."
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
        />
        <button className="btn btn-primary" onClick={() => sendMessage(input)} disabled={loading || !input.trim()} style={{ borderRadius: '12px', minWidth: '80px' }}>
          {loading ? '...' : 'Send ↑'}
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html:`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}`}} />
    </div>
  );
}
