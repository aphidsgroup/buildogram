'use client';
import { useState, useEffect } from 'react';
import styles from '../studio/studio.module.css';

export default function ProjectSetupForm({ onSubmit, isGenerating }) {
  const [formData, setFormData] = useState({
    plotWidth: 30,
    plotDepth: 40,
    unit: 'feet',
    facing: 'North', // Road side
    floors: 1,
    locationPreset: 'Chennai / Tamil Nadu',
    roadWidthFt: 24,
    cornerPlot: false,
    setbackPreference: 'standard', // tight, standard, spacious
    vastuPreference: 'Moderate', // Strict, Moderate, Ignore
    familySize: 4,
    rentalUnit: false,
    elderlyFriendly: false,
    roomSizePreference: 'standard', // compact, standard, spacious
    layerPreference: 'cad_and_blocks', // clean_cad, cad_and_blocks, all_services
    prompt: '',
    
    roomRequirements: {
      parking: { enabled: true, count: 1 },
      sitout: { enabled: true },
      living: { enabled: true },
      dining: { enabled: false },
      kitchen: { enabled: true, type: 'kitchen_cum_dining' },
      utility: { enabled: true },
      pooja: { enabled: true },
      masterBedroom: { enabled: true, attachedToilet: true },
      bedrooms: { count: 1 },
      commonToilets: { count: 1 },
      store: { enabled: false },
      staircase: { enabled: true },
      balcony: { enabled: false },
      terrace: { enabled: true },
      oht: { enabled: true },
      washArea: { enabled: false },
      study: { enabled: false }
    }
  });

  const [totalEstimatedSpaces, setTotalEstimatedSpaces] = useState(0);

  useEffect(() => {
    // Calculate total spaces for UI feedback
    let count = 0;
    const req = formData.roomRequirements;
    if (req.parking.enabled) count += req.parking.count;
    if (req.sitout.enabled) count++;
    if (req.living.enabled) count++;
    if (req.dining.enabled) count++;
    if (req.kitchen.enabled) count++;
    if (req.utility.enabled) count++;
    if (req.pooja.enabled) count++;
    if (req.masterBedroom.enabled) {
      count++;
      if (req.masterBedroom.attachedToilet) count++;
    }
    count += req.bedrooms.count;
    count += req.commonToilets.count;
    if (req.store.enabled) count++;
    if (req.staircase.enabled) count++;
    if (req.balcony.enabled) count++;
    if (req.study.enabled) count++;
    
    setTotalEstimatedSpaces(count);
  }, [formData.roomRequirements]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRequirementToggle = (key, field = 'enabled') => (e) => {
    const { checked } = e.target;
    setFormData(prev => ({
      ...prev,
      roomRequirements: {
        ...prev.roomRequirements,
        [key]: {
          ...prev.roomRequirements[key],
          [field]: checked
        }
      }
    }));
  };

  const handleRequirementNumber = (key, field) => (e) => {
    const val = parseInt(e.target.value) || 0;
    setFormData(prev => ({
      ...prev,
      roomRequirements: {
        ...prev.roomRequirements,
        [key]: {
          ...prev.roomRequirements[key],
          [field]: Math.max(0, val)
        }
      }
    }));
  };

  const handleRequirementSelect = (key, field) => (e) => {
    setFormData(prev => ({
      ...prev,
      roomRequirements: {
        ...prev.roomRequirements,
        [key]: {
          ...prev.roomRequirements[key],
          [field]: e.target.value
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
        <h3 style={{ margin: '0 0 12px 0', fontSize: 14, color: '#334155' }}>Plot Details</h3>
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
          <div className={styles.formGroup} style={{ flex: 1.8 }}>
            <label>Location Rule Preset</label>
            <select name="locationPreset" value={formData.locationPreset} onChange={handleChange} className={styles.select}>
              <option value="Chennai / Tamil Nadu">Chennai / Tamil Nadu</option>
              <option value="General India">General India</option>
            </select>
          </div>
          <div className={styles.formGroup} style={{ flex: 1 }}>
            <label>Floors</label>
            <input type="number" name="floors" value={formData.floors} onChange={handleChange} className={styles.input} min="1" max="4" />
          </div>
        </div>
      </div>

      {/* 2. Preferences & Context */}
      <div style={{ background: '#f8fafc', padding: 16, borderRadius: 8, border: '1px solid #e2e8f0' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: 14, color: '#334155' }}>Design Preferences</h3>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Vastu Priority</label>
            <select name="vastuPreference" value={formData.vastuPreference} onChange={handleChange} className={styles.select}>
              <option value="Strict">Strict (Score &gt; 90)</option>
              <option value="Moderate">Moderate (Basic rules)</option>
              <option value="Ignore">Ignore</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Room Sizing</label>
            <select name="roomSizePreference" value={formData.roomSizePreference} onChange={handleChange} className={styles.select}>
              <option value="compact">Compact (Max space efficiency)</option>
              <option value="standard">Standard</option>
              <option value="spacious">Spacious (Premium feel)</option>
            </select>
          </div>
        </div>
        <div className={styles.row} style={{ marginTop: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
            <input type="checkbox" name="cornerPlot" checked={formData.cornerPlot} onChange={handleChange} /> Corner Plot
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
            <input type="checkbox" name="rentalUnit" checked={formData.rentalUnit} onChange={handleChange} /> Separate Rental Unit
          </label>
        </div>
      </div>

      {/* 3. Space Requirements */}
      <div style={{ background: '#f8fafc', padding: 16, borderRadius: 8, border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontSize: 14, color: '#334155' }}>Required Spaces</h3>
          <span style={{ fontSize: 12, color: '#64748b', background: '#e2e8f0', padding: '2px 8px', borderRadius: 12 }}>
            ~{totalEstimatedSpaces} spaces
          </span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 24px' }}>
          
          {/* Core Areas */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginBottom: 8 }}>
              <input type="checkbox" checked={formData.roomRequirements.living.enabled} onChange={handleRequirementToggle('living')} /> Front Hall / Living
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginBottom: 8 }}>
              <input type="checkbox" checked={formData.roomRequirements.kitchen.enabled} onChange={handleRequirementToggle('kitchen')} /> 
              <select value={formData.roomRequirements.kitchen.type} onChange={handleRequirementSelect('kitchen', 'type')} className={styles.select} style={{ padding: '2px 4px', fontSize: 12, height: 24, width: 'auto' }}>
                <option value="kitchen">Kitchen</option>
                <option value="kitchen_cum_dining">Kitchen Cum Dining</option>
              </select>
            </div>
            {formData.roomRequirements.kitchen.type === 'kitchen' && (
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginBottom: 8 }}>
                <input type="checkbox" checked={formData.roomRequirements.dining.enabled} onChange={handleRequirementToggle('dining')} /> Separate Dining
              </label>
            )}
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginBottom: 8 }}>
              <input type="checkbox" checked={formData.roomRequirements.pooja.enabled} onChange={handleRequirementToggle('pooja')} /> Pooja Room
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginBottom: 8 }}>
              <input type="checkbox" checked={formData.roomRequirements.utility.enabled} onChange={handleRequirementToggle('utility')} /> Utility / Wash Area
            </label>
          </div>

          {/* Bedrooms & Toilets */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginBottom: 8 }}>
              <input type="checkbox" checked={formData.roomRequirements.masterBedroom.enabled} onChange={handleRequirementToggle('masterBedroom')} /> Master Bedroom
            </label>
            {formData.roomRequirements.masterBedroom.enabled && (
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginBottom: 8, marginLeft: 24, color: '#64748b' }}>
                <input type="checkbox" checked={formData.roomRequirements.masterBedroom.attachedToilet} onChange={handleRequirementToggle('masterBedroom', 'attachedToilet')} /> + Attached Toilet
              </label>
            )}
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginBottom: 8 }}>
              <span>Extra Bedrooms:</span>
              <input type="number" min="0" max="5" value={formData.roomRequirements.bedrooms.count} onChange={handleRequirementNumber('bedrooms', 'count')} className={styles.input} style={{ width: 48, padding: '2px 6px', height: 24 }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginBottom: 8 }}>
              <span>Common Toilets:</span>
              <input type="number" min="0" max="4" value={formData.roomRequirements.commonToilets.count} onChange={handleRequirementNumber('commonToilets', 'count')} className={styles.input} style={{ width: 48, padding: '2px 6px', height: 24 }} />
            </div>
          </div>
          
          {/* Aux & Exterior */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginBottom: 8 }}>
              <input type="checkbox" checked={formData.roomRequirements.parking.enabled} onChange={handleRequirementToggle('parking')} /> Parking Bays: 
              <input type="number" min="1" max="4" value={formData.roomRequirements.parking.count} onChange={handleRequirementNumber('parking', 'count')} className={styles.input} style={{ width: 48, padding: '2px 6px', height: 24 }} disabled={!formData.roomRequirements.parking.enabled} />
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginBottom: 8 }}>
              <input type="checkbox" checked={formData.roomRequirements.sitout.enabled} onChange={handleRequirementToggle('sitout')} /> Sit Out / Verandah
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginBottom: 8 }}>
              <input type="checkbox" checked={formData.roomRequirements.staircase.enabled} onChange={handleRequirementToggle('staircase')} /> Staircase
            </label>
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginBottom: 8 }}>
              <input type="checkbox" checked={formData.roomRequirements.store.enabled} onChange={handleRequirementToggle('store')} /> Store Room
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginBottom: 8 }}>
              <input type="checkbox" checked={formData.roomRequirements.study.enabled} onChange={handleRequirementToggle('study')} /> Study / WFH Office
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginBottom: 8 }}>
              <input type="checkbox" checked={formData.roomRequirements.balcony.enabled} onChange={handleRequirementToggle('balcony')} /> Balcony (FF)
            </label>
          </div>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>AI Augmentation Prompt (Optional)</label>
        <textarea 
          name="prompt" 
          value={formData.prompt} 
          onChange={handleChange} 
          placeholder="Any custom instructions not covered above? (e.g., 'Prefer kitchen in North-West', 'Keep a large front setback for gardening')"
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
