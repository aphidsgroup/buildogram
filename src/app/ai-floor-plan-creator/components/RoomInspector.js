'use client';
import styles from '../studio/studio.module.css';

export default function RoomInspector({ room, onClose }) {
  if (!room) return null;

  return (
    <div style={{ padding: '16px', borderTop: '1px solid var(--border)', marginTop: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0 }}>Room Details</h4>
        <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>✕</button>
      </div>
      
      <div style={{ marginTop: '12px', fontSize: '14px' }}>
        <p><strong>Name:</strong> {room.name}</p>
        <p><strong>Type:</strong> {room.type}</p>
        <p><strong>Dimensions:</strong> {room.width}&apos; x {room.height}&apos;</p>
        <p><strong>Area:</strong> {room.area} sqft</p>
      </div>
    </div>
  );
}
