'use client';
import styles from './SkeletonLoader.module.css';

export function SkeletonCard({ lines = 3 }) {
  return (
    <div className={styles.card}>
      <div className={`${styles.line} ${styles.header}`} />
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`${styles.line}`} style={{ width: i === lines - 1 ? '60%' : '100%' }} />
      ))}
    </div>
  );
}

export function SkeletonTableRow({ cols = 5 }) {
  return (
    <tr className={styles.tableRow}>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i}><div className={styles.cell} /></td>
      ))}
    </tr>
  );
}

export function SkeletonStatCard() {
  return (
    <div className={styles.statCard}>
      <div className={styles.statIcon} />
      <div className={`${styles.line} ${styles.statVal}`} />
      <div className={`${styles.line} ${styles.statLbl}`} />
    </div>
  );
}

export default function SkeletonLoader({ type = 'card', count = 3, cols = 5 }) {
  if (type === 'table') {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonTableRow key={i} cols={cols} />
        ))}
      </>
    );
  }
  if (type === 'stat') {
    return (
      <div className={styles.statGrid}>
        {Array.from({ length: count }).map((_, i) => <SkeletonStatCard key={i} />)}
      </div>
    );
  }
  return (
    <div className={styles.cardGrid}>
      {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );
}
