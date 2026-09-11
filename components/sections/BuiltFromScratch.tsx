import Reveal from '@/components/ui/Reveal';
import styles from './BuiltFromScratch.module.css';

export default function BuiltFromScratch() {
  return (
    <section id="built-from-scratch" className={styles.section}>
      <div className={styles.visualWrap}>
        <img
          className={styles.visual}
          src="https://res.cloudinary.com/dukv2otyn/image/upload/v1789159454/process_lap_liwrdf.png"
          alt="Laptop screen showing a project being built from the ground up"
          loading="lazy"
        />
      </div>

      <div className={styles.caption}>
        <Reveal><div className={styles.kicker}>Process</div></Reveal>
        <Reveal delay={60}>
          <h2 className={styles.heading}>Built from scratch.</h2>
        </Reveal>
        <Reveal delay={120}>
          <p className={styles.sub}>
            No page builders, no drag-and-drop templates — every project is hand-coded
            from a blank canvas and engineered around exactly what your business needs.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
