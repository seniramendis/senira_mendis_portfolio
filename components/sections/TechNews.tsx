import Reveal from '@/components/ui/Reveal';
import TechNewsWidget from './TechNewsWidget';
import styles from './TechNewsWidget.module.css';

/** Homepage "Latest in Tech" section — headlines are fetched live and
 *  cached hourly (see app/api/tech-news/route.ts + lib/techNews.ts).
 *  Nobody has to add or update anything here. */
export default function TechNews() {
  return (
    <section id="tech-news" className={styles.section}>
      <div className="si">
        <Reveal>
          <div className="sec-label">Tech News</div>
        </Reveal>

        <Reveal>
          <h2 className={styles.statement}>
            Latest in <em>tech.</em>
          </h2>
        </Reveal>

        <Reveal delay={60}>
          <p className={styles.sub}>
            Live headlines pulled automatically from Hacker News, each paired with the
            real photo from its own article — refreshed hourly, nothing curated by hand.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <TechNewsWidget limit={6} />
        </Reveal>
      </div>
    </section>
  );
}
