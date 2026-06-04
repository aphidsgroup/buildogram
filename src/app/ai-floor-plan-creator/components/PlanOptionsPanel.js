'use client';
import styles from '../studio/studio.module.css';

export default function PlanOptionsPanel({ versions, selectedVersionId, onSelectVersion }) {
  if (!versions || versions.length === 0) return null;

  return (
    <div className={styles.optionsList}>
      <h4>Generated Options</h4>
      {versions.map(v => (
        <div 
          key={v.id} 
          className={`${styles.optionCard} ${v.id === selectedVersionId ? styles.selected : ''}`}
          onClick={() => onSelectVersion(v.id)}
        >
          <h4>{v.version_name}</h4>
          {v.summary_json && (
            <p>Area: {v.summary_json.builtUpArea} sqft</p>
          )}
        </div>
      ))}
    </div>
  );
}
