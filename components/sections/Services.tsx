import Reveal from '@/components/ui/Reveal';
import WhatIDoCarousel from './WhatIDoCarousel';
import styles from './Services.module.css';

export default function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className="si">
        <Reveal><div className="sec-label">Services</div></Reveal>
        <Reveal>
          <h2 className={styles.heading}>
            What I can build <em>for you.</em>
          </h2>
        </Reveal>
        <Reveal delay={60}>
          <p className={styles.sub}>
            End-to-end software services for businesses that want more than a template —
            from the first line of code to the agent that runs while you sleep.
          </p>
        </Reveal>
      </div>

      <div className={styles.wrap}>
        <Reveal>
          <WhatIDoCarousel />
        </Reveal>

        <Reveal delay={120}>
          <div className={styles.ctaRow}>
            <a href="/contact" className="mbtn mbtn-dark">Start a project</a>
            <a href="/#book" className="mbtn mbtn-light">Book a call →</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
