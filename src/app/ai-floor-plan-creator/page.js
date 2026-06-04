import Link from 'next/link';
import styles from './landing.module.css';

export const metadata = {
  title: 'Buildogram AI Floor Plan Creator',
  description: 'Instantly generate conceptual floor plans for your home using AI.',
};

export default function AIFloorPlanLanding() {
  return (
    <div className="page-wrapper">
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Design Your Dream Home with <span>Buildogram AI</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Describe your requirements and our AI instantly generates conceptual, editable floor plans. Perfect for visualizing your next residential project before engaging an engineer.
        </p>
        <div className={styles.ctaGroup}>
          <Link href="/auth/login?redirect=/ai-floor-plan-creator/studio" className="btn btn-primary btn-lg">
            Start Generating for Free
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <div className={styles.grid3}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>✍️</div>
            <h3 className={styles.cardTitle}>1. Prompt Your Vision</h3>
            <p className={styles.cardDesc}>
              Enter your plot dimensions, facing, budget, and special requirements (like "Vastu compliant" or "Extra large kitchen").
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🤖</div>
            <h3 className={styles.cardTitle}>2. AI Generation</h3>
            <p className={styles.cardDesc}>
              Our AI instantly generates multiple 2D conceptual layout options tailored to Indian residential standards.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🏗️</div>
            <h3 className={styles.cardTitle}>3. Engineer Review</h3>
            <p className={styles.cardDesc}>
              Love the concept? Instantly submit it to our structural engineers to convert it into a construction-ready blueprint.
            </p>
          </div>
        </div>

        <div className={styles.disclaimer}>
          <strong>Disclaimer:</strong> Buildogram AI-generated floor plans are conceptual and intended for visualization and ideation purposes only. 
          They are not substitute for professional architectural or structural engineering plans. All AI layouts must undergo professional review 
          for construction viability, structural integrity, load-bearing capacities, permit compliance, and local building codes.
        </div>
      </section>
    </div>
  );
}
