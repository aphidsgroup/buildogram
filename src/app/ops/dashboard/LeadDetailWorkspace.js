import { useState } from 'react';
import OverviewTab from './tabs/OverviewTab';
import RequirementTab from './tabs/RequirementTab';
import BoqReviewTab from './tabs/BoqReviewTab';
import MaterialQuotesTab from './tabs/MaterialQuotesTab';
import PartnerMatchingTab from './tabs/PartnerMatchingTab';
import ProposalTab from './tabs/ProposalTab';
import DocumentsTab from './tabs/DocumentsTab';
import ActivityTab from './tabs/ActivityTab';

export default function LeadDetailWorkspace({ lead, onClose, onUpdate, onAddNote }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [note, setNote] = useState('');
  const [stage, setStage] = useState(lead.pipelineStage || 'New');
  const [followUp, setFollowUp] = useState(lead.nextFollowUpDate ? lead.nextFollowUpDate.split('T')[0] : '');

  const saveUpdates = () => {
    onUpdate(lead.id, { pipelineStage: stage, nextFollowUpDate: followUp || null });
  };

  const submitNote = () => {
    if (!note.trim()) return;
    onAddNote(lead.id, 'Note Added', note);
    setNote('');
  };

  const TABS = ['Overview', 'Requirement', 'BOQ Review', 'Material Quotes', 'Partner Matching', 'Proposal', 'Documents', 'Activity'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <OverviewTab lead={lead} stage={stage} followUp={followUp} setStage={setStage} setFollowUp={setFollowUp} saveUpdates={saveUpdates} />;
      case 'Requirement':
        return <RequirementTab lead={lead} />;
      case 'BOQ Review':
        return <BoqReviewTab lead={lead} />;
      case 'Material Quotes':
        return <MaterialQuotesTab lead={lead} />;
      case 'Partner Matching':
        return <PartnerMatchingTab lead={lead} />;
      case 'Proposal':
        return <ProposalTab lead={lead} />;
      case 'Documents':
        return <DocumentsTab lead={lead} />;
      case 'Activity':
        return <ActivityTab lead={lead} note={note} setNote={setNote} submitNote={submitNote} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{ width: '100%', maxWidth: '900px', background: '#F8FAFC', height: '100vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div style={{ padding: '24px 32px', background: 'white', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>{lead.name}</h2>
            <div style={{ fontSize: '13px', color: '#64748B', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span className={`badge ${lead.priority === 'High' ? 'badge-red' : 'badge-yellow'}`}>{lead.priority} Priority</span>
              <span>•</span>
              <span style={{ textTransform: 'capitalize' }}>{lead.leadType.replace('_', ' ')}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: '#F1F5F9', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px', color: '#475569' }}>✕</button>
        </div>

        {/* Tabs Navbar */}
        <div style={{ background: 'white', padding: '0 32px', borderBottom: '1px solid #E2E8F0', display: 'flex', gap: '24px', overflowX: 'auto' }}>
          {TABS.map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab ? '2px solid var(--primary)' : '2px solid transparent',
                padding: '16px 0',
                color: activeTab === tab ? 'var(--primary)' : '#64748B',
                fontWeight: activeTab === tab ? 700 : 500,
                fontSize: '13px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ padding: '32px', flex: 1 }}>
          {renderTabContent()}
          <div style={{ paddingBottom: '60px' }} />
        </div>
      </div>
    </div>
  );
}
