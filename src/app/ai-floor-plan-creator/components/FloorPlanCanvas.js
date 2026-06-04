'use client';
import { useState, useRef, useEffect } from 'react';
import styles from '../studio/studio.module.css';

export default function FloorPlanCanvas({ planData, selectedRoom, onSelectRoom }) {
  const containerRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  
  if (!planData || !planData.floors || planData.floors.length === 0) {
    return <div className={styles.emptyState}>No floor plan data available</div>;
  }

  const floor = planData.floors[0]; // Currently just rendering ground floor
  
  // Calculate viewbox and scaling
  // Assuming 1 foot = 10 units for SVG
  const scale = 10;
  const svgWidth = (floor.width || 30) * scale;
  const svgHeight = (floor.depth || 40) * scale;
  const padding = 20;

  const handleZoomIn = () => setZoom(z => Math.min(z + 0.2, 3));
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.2, 0.5));

  return (
    <div className={styles.canvasContainer} ref={containerRef}>
      <svg 
        width={svgWidth + padding * 2} 
        height={svgHeight + padding * 2}
        className={styles.svgCanvas}
        style={{ transform: \`scale(\${zoom})\` }}
      >
        <g transform={\`translate(\${padding}, \${padding})\`}>
          {/* Plot Boundary */}
          <rect 
            x={0} 
            y={0} 
            width={svgWidth} 
            height={svgHeight} 
            fill="none" 
            stroke="#94a3b8" 
            strokeWidth="2" 
            strokeDasharray="5,5" 
          />
          
          {/* Rooms */}
          {floor.rooms && floor.rooms.map((room) => {
            const rx = (room.x || 0) * scale;
            const ry = (room.y || 0) * scale;
            const rw = (room.width || 0) * scale;
            const rh = (room.height || 0) * scale;
            const isSelected = selectedRoom?.id === room.id;
            
            return (
              <g 
                key={room.id} 
                onClick={() => onSelectRoom(room)}
                className={\`\${styles.roomRect} \${isSelected ? styles.selected : ''}\`}
              >
                <rect 
                  x={rx} 
                  y={ry} 
                  width={rw} 
                  height={rh} 
                />
                <text 
                  x={rx + rw/2} 
                  y={ry + rh/2} 
                  className={styles.roomText}
                >
                  {room.label || room.name}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      
      <div className={styles.canvasToolbar}>
        <button className={styles.toolbarBtn} onClick={handleZoomOut} title="Zoom Out">-</button>
        <span style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>{Math.round(zoom * 100)}%</span>
        <button className={styles.toolbarBtn} onClick={handleZoomIn} title="Zoom In">+</button>
      </div>
    </div>
  );
}
