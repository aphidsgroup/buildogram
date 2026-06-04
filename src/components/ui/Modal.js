'use client';
import { useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useReducedMotion } from 'motion/react';
import styles from './Modal.module.css';

export default function Modal({ open, onClose, title, children, size = 'md', footer }) {
  const shouldReduce = useReducedMotion();

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, handleKey]);

  const backdropAnim = shouldReduce
    ? { animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { animate: { opacity: 1 }, exit: { opacity: 0 } };

  const dialogAnim = shouldReduce
    ? { animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        animate: { opacity: 1, scale: 1, y: 0 },
        exit:    { opacity: 0, scale: 0.96, y: 16 },
      };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          {...backdropAnim}
          transition={{ duration: 0.18 }}
          onClick={(e) => e.target === e.currentTarget && onClose?.()}
          aria-hidden="true"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            className={`${styles.dialog} ${styles[size]}`}
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
            {...dialogAnim}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {title && (
              <div className={styles.header}>
                <h2 id="modal-title" className={styles.title}>{title}</h2>
                <button
                  className={styles.closeBtn}
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            <div className={styles.body}>{children}</div>
            {footer && <div className={styles.footer}>{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
