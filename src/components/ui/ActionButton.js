'use client';
import { motion, useReducedMotion } from 'motion/react';
import styles from './ActionButton.module.css';

export default function ActionButton({ children, variant = 'primary', size = 'md', loading = false, icon, iconPosition = 'right', className = '', onClick, type = 'button', disabled, href }) {
  const reduce = useReducedMotion();

  const motionProps = reduce ? {} : {
    whileHover: { y: -1 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 25 }
  };

  const cls = [
    styles.btn,
    styles[variant],
    styles[size],
    loading && styles.loading,
    className
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {icon && iconPosition === 'left' && !loading && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && !loading && (
        <motion.span
          className={styles.icon}
          initial={{ x: 0 }}
          whileHover={reduce ? {} : { x: 3 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          {icon}
        </motion.span>
      )}
    </>
  );

  if (href) {
    return (
      <motion.a href={href} className={cls} {...motionProps}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={cls}
      onClick={onClick}
      disabled={disabled || loading}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
