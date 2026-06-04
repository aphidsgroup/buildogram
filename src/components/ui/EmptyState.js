'use client';
import Link from 'next/link';
import styles from './EmptyState.module.css';

export default function EmptyState({ icon, title, description, cta, ctaHref, ctaOnClick, secondaryCta, secondaryHref }) {
  return (
    <div className={styles.wrap}>
      {icon && <div className={styles.iconWrap}>{icon}</div>}
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.desc}>{description}</p>}
      <div className={styles.actions}>
        {cta && ctaHref && (
          <Link href={ctaHref} className="btn btn-primary">{cta}</Link>
        )}
        {cta && ctaOnClick && !ctaHref && (
          <button onClick={ctaOnClick} className="btn btn-primary">{cta}</button>
        )}
        {secondaryCta && secondaryHref && (
          <Link href={secondaryHref} className="btn btn-ghost">{secondaryCta}</Link>
        )}
      </div>
    </div>
  );
}
