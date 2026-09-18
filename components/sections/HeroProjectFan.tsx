'use client';
import Link from 'next/link';
import { SERVICES } from '@/lib/data';
import styles from './HeroProjectFan.module.css';

const FEATURED = SERVICES.filter((service) => service.featured || service.id === 'custom-software' || service.id === 'web-development' || service.id === 'data-analysis' || service.id === 'web-scraping' || service.id === 'ai-agents').slice(0, 5);

function shortTitle(title: string) {
  return title.split('—')[0].trim();
}

export default function HeroProjectFan() {
  const center = Math.floor((FEATURED.length - 1) / 2);

  return (
    <div className={styles.stage}>
      <div className={styles.fan}>
        {FEATURED.map((service, i) => {
          const offset = i - center;
          const cardStyle = {
            '--rot': `${offset * 9}deg`,
            '--tx': `${offset * 60}px`,
            '--ty': `${Math.abs(offset) * 26}px`,
            '--scale': `${1 - Math.abs(offset) * 0.045}`,
            zIndex: 10 - Math.abs(offset),
          } as React.CSSProperties;

          return (
            <Link
              key={service.id}
              href="#services"
              className={styles.card}
              style={cardStyle}
              aria-label={`View ${shortTitle(service.kicker)} service`}
            >
              <div className={styles.chrome}>
                <span className={styles.dots}>
                  <i /><i /><i />
                </span>
                <span className={styles.chromeLabel}>{service.tags[0]}</span>
              </div>
              <div className={styles.shot}>
                <img src={service.image} alt="" loading="lazy" />
              </div>
              <div className={styles.cardFoot}>
                <span className={styles.cardNum}>0{i + 1}</span>
                <span className={styles.cardTitle}>{shortTitle(service.kicker)}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
