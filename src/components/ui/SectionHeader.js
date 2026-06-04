'use client';
import styles from './SectionHeader.module.css';

export default function SectionHeader({ eyebrow, title, description, align = 'center', className = '' }) {
  return (
    <div className={`${styles.wrap} ${styles[align]} ${className}`}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      {title && <h2 className={styles.title}>{title}</h2>}
      {description && <p className={styles.desc}>{description}</p>}
    </div>
  );
}
