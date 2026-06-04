'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './studio.module.css';
import ProjectSetupForm from '../components/ProjectSetupForm';
import FloorPlanCanvas from '../components/FloorPlanCanvas';
import PromptPanel from '../components/PromptPanel';
import PlanOptionsPanel from '../components/PlanOptionsPanel';
import RoomInspector from '../components/RoomInspector';
import EngineerReviewCTA from '../components/EngineerReviewCTA';
import CreditBadge from '../components/CreditBadge';

export default function AIFloorPlanStudio() {
  const router = useRouter();
  const [projectId, setProjectId] = useState(null);
  const [versions, setVersions] = useState([]);
  const [selectedVersionId, setSelectedVersionId] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const selectedPlan = versions.find(v => v.id === selectedVersionId)?.plan_json;

  // Initial Check Auth (Handled by middleware/api but good to have gracefully handle here)
  useEffect(() => {
    // We could fetch existing draft project here
  }, []);

  const handleGenerate = async (formData) => {
    setIsGenerating(true);
    setSelectedRoom(null);
    try {
      // 1. Create project
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

      // 2. Generate plans
      const gRes = await fetch('/api/ai-floor-plans/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: pId, prompt: formData.prompt })
      });
      const gData = await gRes.json();
      if (!gRes.ok) throw new Error(gData.error);

      setVersions(gData.versions);
      if (gData.versions.length > 0) {
        setSelectedVersionId(gData.versions[0].id);
      }
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
      {/* Sidebar Setup & Tools */}
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
              
              <EngineerReviewCTA projectId={projectId} selectedVersionId={selectedVersionId} disabled={isGenerating || isEditing} />
              
              <button 
                onClick={() => setVersions([])} 
                className="btn" 
                style={{ width: '100%', marginTop: '16px', background: '#f1f5f9' }}
              >
                Start New Project
              </button>
            </>
          )}
        </div>
      </aside>

      {/* Main Canvas Area */}
      <main className={styles.mainArea}>
        <div className={styles.topBar}>
          <div style={{ fontWeight: 600 }}>
            {selectedPlan?.name || 'Untitled Design'}
          </div>
          <div>
            {/* Download/Export Buttons could go here */}
          </div>
        </div>
        
        {isGenerating || isEditing ? (
          <div style={{ display: 'flex', flex: 1, alignItems: 'center', justify: 'center', background: '#e2e8f0', flexDirection: 'column' }}>
            <div style={{ fontSize: '24px', marginBottom: '16px' }}>🤖</div>
            <div>{isGenerating ? 'AI is drafting your floor plans...' : 'AI is refining your layout...'}</div>
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
