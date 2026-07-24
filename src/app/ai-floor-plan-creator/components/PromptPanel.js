'use client';
import { useState } from 'react';
import styles from '../studio/studio.module.css';

export default function PromptPanel({ onSendPrompt, isEditing }) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSendPrompt(prompt);
      setPrompt('');
    }
  };

  return (
    <div className={styles.promptPanel}>
      <h4>Edit Design</h4>
      <p className={styles.cardDesc} style={{fontSize: '13px', marginBottom: '10px'}}>
        Chat with AI to refine your layout.
      </p>
      <form onSubmit={handleSubmit} className={styles.chatInput}>
        <input 
          type="text" 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
          placeholder="e.g. Make the master bedroom bigger" 
          className={styles.input}
          disabled={isEditing}
        />
        <button type="submit" className="btn btn-secondary" disabled={isEditing || !prompt.trim()}>
          {isEditing ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
