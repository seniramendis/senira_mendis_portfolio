import { SERVICES } from '@/lib/data';
import Reveal from '@/components/ui/Reveal';
import ServicesCarousel from './ServicesCarousel';
import { CodeMockup, ICONS } from './serviceIcons';
import styles from './Services.module.css';

export default function Services() {
  const featured = SERVICES.find((s) => s.featured)!;
  const rest = SERVICES.filter((s) => !s.featured);

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
        {/* Desktop / tablet: bento grid — hidden below 560px */}
        <div className={styles.desktopSet}>
          {/* Hero / featured service */}
          <Reveal>
            <article className={styles.hero}>
              <div className={styles.heroVisual}>
                <CodeMockup />
              </div>
              <div className={styles.heroBody}>
                <div className={styles.kicker}>{featured.kicker}</div>
                <h3 className={styles.heroHeadline}>
                  {featured.headline} <em>{featured.headlineEm}</em>
                </h3>
                <p className={styles.body}>{featured.body}</p>
                <ul className={styles.tags}>
                  {featured.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>

          {/* Supporting services grid */}
          <div className={styles.grid}>
            {rest.map((s, i) => {
              const Icon = ICONS[s.icon];
              return (
                <Reveal key={s.id} delay={100 + i * 80}>
                  <article className={styles.card}>
                    <Icon />
                    <div className={styles.kickerSmall}>{s.kicker}</div>
                    <h3 className={styles.cardHeadline}>
                      {s.headline} <em>{s.headlineEm}</em>
                    </h3>
                    <p className={styles.cardBody}>{s.body}</p>
                    <ul className={styles.tags}>
                      {s.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Mobile: autoplay slide carousel — shown only below 560px */}
        <Reveal>
          <ServicesCarousel />
        </Reveal>

        <Reveal delay={120}>
          <div className={styles.ctaRow}>
            <a href="/#contact" className="mbtn mbtn-dark">Start a project</a>
            <a href="/#book" className="mbtn mbtn-light">Book a call →</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
