import Reveal from '@/components/ui/Reveal';
import { FAQS } from '@/lib/data';
import { faqJsonLd } from '@/lib/seo';
import styles from './FAQ.module.css';

/**
 * Visible FAQ content targeting the exact long-tail phrasing clients and
 * recruiters search for ("best software engineer in Sri Lanka", "hire
 * remote developer Sri Lanka", etc.) — paired with FAQPage JSON-LD below.
 * Google requires the structured data to mirror on-page, visible text,
 * so this component and lib/seo.ts's faqJsonLd() must stay in sync (both
 * read from the same FAQS array in lib/data.ts).
 */
export default function FAQ() {
  const jsonLd = faqJsonLd(FAQS);

  return (
    <section id="faq" className={styles.section}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="si">
        <Reveal><div className="sec-label">FAQ</div></Reveal>

        <Reveal>
          <h2 className={styles.statement}>
            Questions clients <em>usually ask.</em>
          </h2>
        </Reveal>

        <div className={styles.list}>
          {FAQS.map((faq, i) => (
            <Reveal key={faq.question} delay={i * 40}>
              <details className={styles.item}>
                <summary>
                  {faq.question}
                  <span className={styles.icon} aria-hidden="true">+</span>
                </summary>
                <p className={styles.answer}>{faq.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
