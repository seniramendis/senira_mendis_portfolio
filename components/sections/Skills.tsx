import Reveal from '@/components/ui/Reveal';
import SkillsCarousel from './SkillsCarousel';
import styles from './Skills.module.css';

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <div className="si">
        <Reveal><div className="sec-label">Capabilities</div></Reveal>
        <Reveal>
          <h2 className={styles.heading}>
            A wide stack, applied with <em>precision</em><br />and purpose.
          </h2>
        </Reveal>
      </div>

      <Reveal delay={80}>
        <SkillsCarousel />
      </Reveal>
    </section>
  );
}
