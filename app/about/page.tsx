import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/sections/Nav';
import AboutSubNav from '@/components/sections/AboutSubNav';
import Footer from '@/components/sections/Footer';
import SocialIcons from '@/components/ui/SocialIcons';
import Reveal from '@/components/ui/Reveal';
import WhatIDoCarousel from '@/components/sections/WhatIDoCarousel';
import { PERSONAL, COMPANY, ABOUT_BIO } from '@/lib/data';
import { buildMetadata, personJsonLd, organizationJsonLd } from '@/lib/seo';
import styles from './about.module.css';

const PROFILE_STICKER_URL =
  'https://res.cloudinary.com/dukv2otyn/image/upload/v1787525935/Senira_Mendis_Sticker_pzv1cv.png';
const PRODUCT_MOCKUP_URL =
  'https://res.cloudinary.com/dukv2otyn/image/upload/v1789303006/mobile_view_mockup_tech_un8tea.png';

export const metadata: Metadata = buildMetadata({
  title: 'About Senira Mendis — Founder of Dopmin Technologies',
  description:
    'Senira Mendis is a technology entrepreneur, software & data engineer in Sri Lanka, and founder of Dopmin Technologies — an IT services venture building web apps, mobile platforms and custom POS systems.',
  path: '/about',
  keywords: [
    'Senira Mendis',
    'Senira Mendis Dopmin',
    'Dopmin Technologies',
    'Dopmin Technologies founder',
    'Technology Entrepreneur Sri Lanka',
    'Data Engineer Sri Lanka',
    'Software Engineer in Sri Lanka',
  ],
});

const birthDateDisplay = new Date(`${PERSONAL.birthDate}T00:00:00Z`).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

// "What I Do" chapter headings paired with the ABOUT_BIO narrative paragraphs
const CHAPTERS = [
  { num: '01', heading: 'A foundation in code and curiosity.' },
  { num: '02', heading: 'Building Dopmin Technologies.' },
  { num: '03', heading: 'Looking ahead.' },
];

export default function AboutPage() {
  const jsonLd = [personJsonLd(), organizationJsonLd()];

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <AboutSubNav />

      <div className={styles.backBar}>
        <Link href="/" className={styles.backLink}>
          <span className={styles.arrowBack}>&larr;</span> Back to Home
        </Link>
      </div>

      {/* ── HERO ───────────────────────────── */}
      <section id="about-hero" className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroText}>
            <Reveal>
              <span className={styles.kicker}>{ABOUT_BIO.kicker}</span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className={styles.title}>{ABOUT_BIO.title}</h1>
            </Reveal>
            <Reveal delay={160}>
              <p className={styles.lede}>{ABOUT_BIO.lede}</p>
            </Reveal>
          </div>

          <Reveal delay={140} className={styles.portraitCol}>
            <div className={styles.portraitCard}>
              <div className={styles.portraitBg}>
                <div className={styles.portraitWaves} aria-hidden="true">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <span key={i} />
                  ))}
                </div>
              </div>
              <Image
                src={PROFILE_STICKER_URL}
                alt={PERSONAL.name}
                width={640}
                height={800}
                className={styles.portraitImg}
                priority
              />
              <div className={styles.chipsRow}>
                <span className={styles.chipIcon} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="1.6">
                    <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
                  </svg>
                </span>
                <span className={styles.chip}>Software Engineer</span>
                <span className={styles.chip}>{PERSONAL.available ? 'Available now' : 'Building Dopmin'}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SPEC STRIP ─────────────────────── */}
      <section className={styles.specStrip}>
        <Reveal className={styles.specInner}>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Based in</span>
            <span className={styles.specValue}>{PERSONAL.location}, Sri Lanka</span>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Founder of</span>
            <Link
              href="https://dopmin.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.specLogoLink}
              aria-label={COMPANY.name}
            >
              <span className={styles.specLogoBox}>
                <Image
                  src="https://res.cloudinary.com/dukv2otyn/image/upload/v1781826436/dopmin_new-removebg-preview_dxqaup.png"
                  alt={COMPANY.name}
                  fill
                  sizes="160px"
                  className={styles.specLogoImg}
                />
              </span>
            </Link>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Status</span>
            <span className={styles.specValue}>{PERSONAL.available ? 'Available now' : 'Currently engaged'}</span>
          </div>
        </Reveal>
      </section>

      {/* ── WHAT I DO (Apple-style card carousel) ── */}
      <section id="build" className={styles.bento}>
        <div className={styles.bentoInner}>
          <Reveal className={styles.bentoHead}>
            <span className={styles.eyebrow}>What I do</span>
            <h2 className={styles.bentoTitle}>Every discipline, one business outcome.</h2>
            <Link href="/#services" className={styles.bentoLink}>
              See all services <span aria-hidden="true">&rsaquo;</span>
            </Link>
          </Reveal>
          <WhatIDoCarousel />
        </div>
      </section>

      {/* ── STORY CHAPTERS ─────────────────── */}
      <section id="story" className={styles.story}>
        <Reveal className={styles.storyHead}>
          <span className={styles.eyebrow}>My story</span>
          <h2 className={styles.storyTitle}>How it all started.</h2>
        </Reveal>

        {ABOUT_BIO.paragraphs.map((paragraph, i) => (
          <div key={i} className={styles.chapter}>
            <Reveal className={styles.chapterInner}>
              <div className={styles.chapterMeta}>
                <span className={styles.chapterNum}>{CHAPTERS[i]?.num ?? `0${i + 1}`}</span>
                <h3 className={styles.chapterHeading}>{CHAPTERS[i]?.heading}</h3>
              </div>
              {i === 0 && <p className={styles.chapterBorn}>Born {birthDateDisplay}</p>}
              <p className={styles.chapterText}>{paragraph}</p>
            </Reveal>
          </div>
        ))}
      </section>

      {/* ── PRODUCT SHOWCASE (mobile mockup) ─ */}
      <section id="products" className={styles.showcase}>
        <div className={`${styles.tile} ${styles.tileRounded}`}>
          <div className={styles.tileContent}>
            <Reveal className={styles.copyWrapper}>
              <p className={styles.tileEyebrow}>What I build</p>
              <h2 className={styles.tileHeadline}>
                Products people
                <br />
                actually enjoy using.
              </h2>
              <div className={styles.tileCta}>
                <Link href="/projects" className={styles.iconWrapper} aria-label="See the work">
                  <span className={styles.iconCopy}>See the work</span>
                  <span className={`${styles.icon} ${styles.iconAfter}`} aria-hidden="true">
                    &rsaquo;
                  </span>
                </Link>
              </div>
            </Reveal>
            <Reveal delay={120} className={styles.pictureWrapper}>
              <Image
                className={styles.tileImage}
                src={PRODUCT_MOCKUP_URL}
                alt="Mobile app UI built by Senira Mendis"
                width={1200}
                height={1500}
                priority={false}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CONNECT ────────────────────────── */}
      <section id="connect" className={styles.connect}>
        <Reveal>
          <h2 className={styles.connectTitle}>Let&apos;s build something together.</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className={styles.connectSub}>
            Open to remote and full-time roles, freelance projects, and conversations about technology.
          </p>
        </Reveal>
        <Reveal delay={140} className={styles.connectActions}>
          <div>
            <Link href="/contact" className={styles.ctaBtn}>
              Get in touch &rsaquo;
            </Link>
          </div>
          <div className={styles.connectSocial}>
            <SocialIcons theme="dark" />
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
