'use client';
import { useState } from 'react';
import styles from '../studio/studio.module.css';

export default function ProjectSetupForm({ onSubmit, isGenerating }) {
  const [formData, setFormData] = useState({
    plotWidth: 30,
    plotDepth: 40,
    unit: 'feet',
    facing: 'North',
    buildingType: 'House',
    floors: 1,
    prompt: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label>Plot Width (ft)</label>
          <input type="number" name="plotWidth" value={formData.plotWidth} onChange={handleChange} className={styles.input} required min="10" />
        </div>
        <div className={styles.formGroup}>
          <label>Plot Depth (ft)</label>
          <input type="number" name="plotDepth" value={formData.plotDepth} onChange={handleChange} className={styles.input} required min="10" />
        </div>
      </div>
      
      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label>Facing</label>
          <select name="facing" value={formData.facing} onChange={handleChange} className={styles.select}>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Floors</label>
          <input type="number" name="floors" value={formData.floors} onChange={handleChange} className={styles.input} min="1" max="4" />
        </div>
      </div>
      
      <div className={styles.formGroup}>
        <label>Design Prompt (Optional)</label>
        <textarea 
          name="prompt" 
          value={formData.prompt} 
          onChange={handleChange} 
          placeholder="e.g. Modern style with a large kitchen, open living area, and Vastu compliance."
          className={styles.textarea}
        />
      </div>
      
      <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isGenerating}>
        {isGenerating ? 'Generating Options...' : 'Generate Options (1 Credit)'}
      </button>
    </form>
  );
}
