import React from 'react';
import styles from './PremiumCard.module.css';
import { motion } from 'motion/react';

export default function PremiumCard({ 
  children, 
  className = '', 
  hoverEffect = false,
  animated = false,
  delay = 0,
  onClick,
  ...props 
}) {
  const Component = animated ? motion.div : 'div';
  const animationProps = animated ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.5, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }
  } : {};

  return (
    <Component 
      className={`${styles.premiumCard} ${hoverEffect ? styles.hoverEffect : ''} ${className}`}
      onClick={onClick}
      {...animationProps}
      {...props}
    >
      <div className={styles.premiumCardInner}>
        {children}
      </div>
    </Component>
  );
}
