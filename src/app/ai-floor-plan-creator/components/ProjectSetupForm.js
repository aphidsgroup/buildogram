'use client';
import { useState, useEffect } from 'react';
import styles from '../studio/studio.module.css';

const ROOM_PRESETS = [
  { id: 'parking', label: 'Parking / Portico', icon: '🚗', defaultEnabled: true },
  { id: 'living', label: 'Living Room', icon: '🛋️', defaultEnabled: true },
  { id: 'kitchen', label: 'Kitchen', icon: '🍳', defaultEnabled: true },
  { id: 'dining', label: 'Dining', icon: '🍽️', defaultEnabled: false },
  { id: 'pooja', label: 'Pooja', icon: '🪔', defaultEnabled: true },
  { id: 'masterBedroom', label: 'Master Bedroom', icon: '🛏️', defaultEnabled: true },
  { id: 'bedrooms', label: 'Extra Bedroom', icon: '🛏️', defaultEnabled: false, isCounter: true },
  { id: 'utility', label: 'Wash / Utility', icon: '🧺', defaultEnabled: true },
  { id: 'store', label: 'Store Room', icon: '📦', defaultEnabled: false },
  { id: 'sitout', label: 'Sit-out', icon: '🪑', defaultEnabled: true },
  { id: 'study', label: 'Study / WFH', icon: '💻', defaultEnabled: false },
  { id: 'staircase', label: 'Staircase', icon: '🪜', defaultEnabled: true },
  { id: 'balcony', label: 'Balcony', icon: '🌅', defaultEnabled: false },
];

export default function ProjectSetupForm({ onSubmit, isGenerating }) {
  const [formData, setFormData] = useState({
    plotWidth: 30,
    plotDepth: 40,
    unit: 'feet',
    facing: 'North',
    floors: 1,
    locationPreset: 'Chennai / Tamil Nadu',
    cornerPlot: false,
    vastuPreference: 'Strict',
    roomRequirements: {
      parking: { enabled: true, count: 1 },
      sitout: { enabled: true },
      living: { enabled: true },
      dining: { enabled: false },
      kitchen: { enabled: true, type: 'kitchen' },
      utility: { enabled: true },
      pooja: { enabled: true },
      masterBedroom: { enabled: true, attachedToilet: true },
      bedrooms: { enabled: false, count: 1 },
      store: { enabled: false },
      staircase: { enabled: true },
      balcony: { enabled: false },
      study: { enabled: false }
    },
    commonToilets: 1,
    prompt: ''
  });

  const [totalEstimatedSpaces, setTotalEstimatedSpaces] = useState(0);

  useEffect(() => {
    let count = 0;
    const req = formData.roomRequirements;
    Object.keys(req).forEach(k => {
      if (req[k].enabled) {
        count += req[k].count || 1;
        if (k === 'masterBedroom' && req[k].attachedToilet) count++;
      }
    });
    count += formData.commonToilets;
    setTotalEstimatedSpaces(count);
  }, [formData.roomRequirements, formData.commonToilets]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleRoom = (id) => {
    setFormData(prev => ({
      ...prev,
      roomRequirements: {
        ...prev.roomRequirements,
        [id]: {
          ...prev.roomRequirements[id],
          enabled: !prev.roomRequirements[id].enabled
        }
      }
    }));
  };

  const setRoomCount = (id, count) => {
    setFormData(prev => ({
      ...prev,
      roomRequirements: {
        ...prev.roomRequirements,
        [id]: {
          ...prev.roomRequirements[id],
          enabled: count > 0,
          count: Math.max(0, count)
        }
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 1. Plot Context */}
      <div style={{ background: '#f8fafc', padding: 16, borderRadius: 8, border: '1px solid #e2e8f0' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: 14, color: '#334155' }}>Plot & Orientation</h3>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Width (ft)</label>
            <input type="number" name="plotWidth" value={formData.plotWidth} onChange={handleChange} className={styles.input} required min="10" />
          </div>
          <div className={styles.formGroup}>
            <label>Depth (ft)</label>
            <input type="number" name="plotDepth" value={formData.plotDepth} onChange={handleChange} className={styles.input} required min="10" />
          </div>
          <div className={styles.formGroup}>
            <label>Road Facing</label>
            <select name="facing" value={formData.facing} onChange={handleChange} className={styles.select}>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="East">East</option>
              <option value="West">West</option>
            </select>
          </div>
        </div>
        <div className={styles.row} style={{ marginTop: 12 }}>
          <div className={styles.formGroup} style={{ flex: 1 }}>
            <label>Floors</label>
            <input type="number" name="floors" value={formData.floors} onChange={handleChange} className={styles.input} min="1" max="4" />
          </div>
          <div className={styles.formGroup} style={{ flex: 1 }}>
            <label>Vastu Priority</label>
            <select name="vastuPreference" value={formData.vastuPreference} onChange={handleChange} className={styles.select}>
              <option value="Strict">Strict (Score &gt; 90)</option>
              <option value="Moderate">Moderate (Basic rules)</option>
              <option value="Ignore">Ignore</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Visual Room Selection */}
      <div style={{ background: '#f8fafc', padding: 16, borderRadius: 8, border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontSize: 14, color: '#334155' }}>Select Rooms</h3>
          <span style={{ fontSize: 12, color: '#64748b', background: '#e2e8f0', padding: '2px 8px', borderRadius: 12 }}>
            ~{totalEstimatedSpaces} spaces
          </span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {ROOM_PRESETS.map(room => {
            const req = formData.roomRequirements[room.id];
            const isActive = req?.enabled;

            return (
              <div 
                key={room.id}
                onClick={() => !room.isCounter && toggleRoom(room.id)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  padding: '12px 4px', borderRadius: 6, border: isActive ? '1px solid #3b82f6' : '1px solid #cbd5e1',
                  background: isActive ? '#eff6ff' : '#ffffff', cursor: room.isCounter ? 'default' : 'pointer',
                  transition: 'all 0.2s', textAlign: 'center', position: 'relative'
                }}
              >
                <span style={{ fontSize: 20, marginBottom: 4 }}>{room.icon}</span>
                <span style={{ fontSize: 11, fontWeight: isActive ? 600 : 400, color: isActive ? '#1e3a8a' : '#475569' }}>
                  {room.label}
                </span>

                {room.isCounter && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                    <button type="button" onClick={() => setRoomCount(room.id, (req.count || 0) - 1)} style={{ padding: '0 6px', border: '1px solid #cbd5e1', borderRadius: 4, background: '#fff' }}>-</button>
                    <span style={{ fontSize: 12, fontWeight: 'bold' }}>{req.count || 0}</span>
                    <button type="button" onClick={() => setRoomCount(room.id, (req.count || 0) + 1)} style={{ padding: '0 6px', border: '1px solid #cbd5e1', borderRadius: 4, background: '#fff' }}>+</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Extra Toilet Input */}
        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>🚽</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#334155' }}>Common Toilets</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button type="button" onClick={() => setFormData(p => ({...p, commonToilets: Math.max(0, p.commonToilets - 1)}))} style={{ padding: '2px 8px', border: '1px solid #cbd5e1', borderRadius: 4, background: '#f8fafc' }}>-</button>
            <span style={{ fontSize: 13, fontWeight: 'bold', width: 20, textAlign: 'center' }}>{formData.commonToilets}</span>
            <button type="button" onClick={() => setFormData(p => ({...p, commonToilets: p.commonToilets + 1}))} style={{ padding: '2px 8px', border: '1px solid #cbd5e1', borderRadius: 4, background: '#f8fafc' }}>+</button>
          </div>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>AI Augmentation Prompt (Optional)</label>
        <textarea 
          name="prompt" 
          value={formData.prompt} 
          onChange={handleChange} 
          placeholder="Any custom instructions not covered above? (e.g., 'Prefer kitchen in North-West')"
          className={styles.textarea}
          style={{ height: 60 }}
        />
      </div>
      
      <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: 15 }} disabled={isGenerating}>
        {isGenerating ? 'Drafting Plans...' : 'Draft Floor Plans'}
      </button>
    </form>
  );
}

