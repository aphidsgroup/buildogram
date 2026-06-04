'use client';
import { useState, useEffect } from 'react';
import styles from './studio.module.css';
import ProjectSetupForm from '../components/ProjectSetupForm';
import FloorPlanCanvas from '../components/FloorPlanCanvas';
import PromptPanel from '../components/PromptPanel';
import PlanOptionsPanel from '../components/PlanOptionsPanel';
import RoomInspector from '../components/RoomInspector';
import EngineerReviewCTA from '../components/EngineerReviewCTA';
import CreditBadge from '../components/CreditBadge';

export default function AIFloorPlanStudio() {
  const [projectId, setProjectId] = useState(null);
  const [versions, setVersions] = useState([]);
  const [selectedVersionId, setSelectedVersionId] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const selectedPlan = versions.find(v => v.id === selectedVersionId)?.plan_json;

  const handleGenerate = async (formData) => {
    setIsGenerating(true);
    setSelectedRoom(null);
    try {
      let pId = projectId;
      if (!pId) {
        const pRes = await fetch('/api/ai-floor-plans/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const pData = await pRes.json();
        if (!pRes.ok) throw new Error(pData.error);
        pId = pData.id;
        setProjectId(pId);
      }
      const gRes = await fetch('/api/ai-floor-plans/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: pId, prompt: formData.prompt })
      });
      const gData = await gRes.json();
      if (!gRes.ok) throw new Error(gData.error);
      setVersions(gData.versions);
      if (gData.versions.length > 0) setSelectedVersionId(gData.versions[0].id);
    } catch (err) {
      alert(err.message || 'Error generating floor plan');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEditPrompt = async (prompt) => {
    if (!selectedVersionId) return;
    setIsEditing(true);
    try {
      const res = await fetch('/api/ai-floor-plans/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ versionId: selectedVersionId, prompt })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setVersions(prev => [data.newVersion, ...prev]);
      setSelectedVersionId(data.newVersion.id);
    } catch (err) {
      alert(err.message || 'Error editing floor plan');
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className={styles.studioLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>AI Creator Studio</h2>
          <CreditBadge />
        </div>
        <div className={styles.sidebarContent}>
          {versions.length === 0 ? (
            <ProjectSetupForm onSubmit={handleGenerate} isGenerating={isGenerating} />
          ) : (
            <>
              <PlanOptionsPanel
                versions={versions}
                selectedVersionId={selectedVersionId}
                onSelectVersion={(id) => { setSelectedVersionId(id); setSelectedRoom(null); }}
              />
              <PromptPanel onSendPrompt={handleEditPrompt} isEditing={isEditing} />
              <RoomInspector room={selectedRoom} onClose={() => setSelectedRoom(null)} />
              {selectedPlan && <PlanWarnings plan={selectedPlan} />}
              <EngineerReviewCTA projectId={projectId} selectedVersionId={selectedVersionId} disabled={isGenerating || isEditing} />
              <button
                onClick={() => { setVersions([]); setProjectId(null); setSelectedRoom(null); }}
                className="btn"
                style={{ width: '100%', marginTop: '16px', background: '#f1f5f9' }}
              >
                Start New Project
              </button>
            </>
          )}
        </div>
      </aside>

      <main className={styles.mainArea}>
        <div className={styles.topBar}>
          <div style={{ fontWeight: 600, fontSize: 15 }}>
            {selectedPlan?.name || 'AI Floor Plan Creator'}
          </div>
          <div style={{ fontSize: 12, color: '#94a3b8' }}>
            Scroll to zoom · Drag to pan · Click room to inspect
          </div>
        </div>

        {isGenerating || isEditing ? (
          <div style={{
            display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center',
            background: '#e2e8f0', flexDirection: 'column', gap: 12
          }}>
            <div style={{ fontSize: 40 }}>🤖</div>
            <div style={{ fontWeight: 600, color: '#334155', fontSize: 16 }}>
              {isGenerating ? 'AI is drafting your floor plans…' : 'AI is refining your layout…'}
            </div>
            <div style={{ fontSize: 13, color: '#64748b' }}>This usually takes 5–15 seconds</div>
          </div>
        ) : (
          <FloorPlanCanvas
            planData={selectedPlan}
            selectedRoom={selectedRoom}
            onSelectRoom={setSelectedRoom}
          />
        )}
      </main>
    </div>
  );
}

// ─── Plan Warnings Panel ───────────────────────────────────────────────────────
function PlanWarnings({ plan }) {
  const [warnings, setWarnings] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    import('@/lib/ai-floor-plan/rules').then(mod => {
      const w = mod.validateFloorPlan(plan);
      setWarnings(w);
      if (w.some(x => x.type === 'error')) setOpen(true);
    });
  }, [plan]);

  if (warnings.length === 0) return null;

  const errors = warnings.filter(w => w.type === 'error');
  const warningItems = warnings.filter(w => w.type === 'warning');
  const info = warnings.filter(w => w.type === 'info');
  const badgeColor = errors.length > 0 ? '#ef4444' : warningItems.length > 0 ? '#f59e0b' : '#3b82f6';

  return (
    <div style={{ marginTop: 16, border: `1px solid ${badgeColor}50`, borderRadius: 8, overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 14px', background: `${badgeColor}12`, border: 'none', cursor: 'pointer',
          fontSize: 12, fontWeight: 600, color: badgeColor,
        }}
      >
        <span>
          {errors.length > 0 ? `✕ ${errors.length} Error${errors.length > 1 ? 's' : ''}` : ''}
          {warningItems.length > 0 ? ` ⚠ ${warningItems.length} Warning${warningItems.length > 1 ? 's' : ''}` : ''}
          {info.length > 0 && errors.length === 0 && warningItems.length === 0 ? `ℹ ${info.length} Advisory` : ''}
          {' '}— Plan Checks
        </span>
        <span style={{ fontSize: 10 }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div style={{ maxHeight: 220, overflowY: 'auto', padding: '8px 14px 12px', background: 'white' }}>
          {warnings.map((w, i) => {
            const color = w.type === 'error' ? '#ef4444' : w.type === 'warning' ? '#f59e0b' : '#3b82f6';
            const icon = w.type === 'error' ? '✕' : w.type === 'warning' ? '⚠' : 'ℹ';
            return (
              <div key={i} style={{
                display: 'flex', gap: 8, alignItems: 'flex-start',
                padding: '6px 0', borderBottom: i < warnings.length - 1 ? '1px solid #f1f5f9' : 'none',
              }}>
                <span style={{ color, fontSize: 11, marginTop: 1, flexShrink: 0 }}>{icon}</span>
                <span style={{ fontSize: 11, color: '#374151', lineHeight: 1.4 }}>{w.message}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
