import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Code2, Database, Rocket } from 'lucide-react';
import Nav from '@/components/sections/Nav';
import AboutSubNav from '@/components/sections/AboutSubNav';
import Footer from '@/components/sections/Footer';
import SocialIcons from '@/components/ui/SocialIcons';
import Reveal from '@/components/ui/Reveal';
import { PERSONAL, COMPANY, ABOUT_BIO } from '@/lib/data';
import { buildMetadata, personJsonLd, organizationJsonLd } from '@/lib/seo';
import styles from './about.module.css';

const PROFILE_STICKER_URL =
  'https://res.cloudinary.com/dukv2otyn/image/upload/v1787525935/Senira_Mendis_Sticker_pzv1cv.png';
const PRODUCT_MOCKUP_URL =
  'https://res.cloudinary.com/dukv2otyn/image/upload/v1789056548/mobile_ui_mockuo_serv_foo5bz.png';

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

// Chapter headings paired with the ABOUT_BIO narrative paragraphs
const CHAPTERS = [
  { num: '01', heading: 'A foundation in code and curiosity.' },
  { num: '02', heading: 'Building Dopmin Technologies.' },
  { num: '03', heading: 'Looking ahead.' },
];

// "What I Do" bento cards
const DISCIPLINES = [
  {
    icon: Code2,
    title: 'Software Engineering',
    desc: 'Full-stack web and mobile applications — from database design to deployed, production-ready ecosystems.',
  },
  {
    icon: Database,
    title: 'Data Engineering',
    desc: 'Turning complex market and operational data into scalable, high-performing digital solutions.',
  },
  {
    icon: Rocket,
    title: 'Entrepreneurship',
    desc: 'Founded Dopmin Technologies to deliver high-impact software that streamlines real business operations.',
  },
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
      <section className={styles.hero}>
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
            <span className={styles.specLabel}>Born</span>
            <span className={styles.specValue}>{birthDateDisplay}</span>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Based in</span>
            <span className={styles.specValue}>{PERSONAL.location}, Sri Lanka</span>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Founder of</span>
            <span className={styles.specValue}>{COMPANY.name}</span>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Status</span>
            <span className={styles.specValue}>{PERSONAL.available ? 'Available now' : 'Currently engaged'}</span>
          </div>
        </Reveal>
      </section>

      {/* ── WHAT I DO (bento) ──────────────── */}
      <section id="build" className={styles.bento}>
        <div className={styles.bentoInner}>
          <Reveal className={styles.bentoHead}>
            <span className={styles.eyebrow}>What I do</span>
            <h2 className={styles.bentoTitle}>Three disciplines, one goal.</h2>
          </Reveal>
          <div className={styles.bentoGrid}>
            {DISCIPLINES.map((d, i) => {
              const Icon = d.icon;
              return (
                <Reveal key={d.title} delay={i * 90} className={styles.bentoCard}>
                  <span className={styles.bentoIcon} aria-hidden="true">
                    <Icon size={22} strokeWidth={1.8} />
                  </span>
                  <h3 className={styles.bentoCardTitle}>{d.title}</h3>
                  <p className={styles.bentoCardDesc}>{d.desc}</p>
                </Reveal>
              );
            })}
          </div>
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
              <p className={styles.chapterText}>{paragraph}</p>
            </Reveal>
          </div>
        ))}
      </section>

      {/* ── PRODUCT SHOWCASE (mobile mockup) ─ */}
      <section id="products" className={styles.showcase}>
        <div className={styles.showcaseInner}>
          <Reveal className={styles.showcaseText}>
            <span className={styles.showcaseKicker}>What I build</span>
            <h2 className={styles.showcaseTitle}>Products people actually enjoy using.</h2>
            <p className={styles.showcaseDesc}>
              From native Android apps to full-stack web platforms — every interface is designed to feel
              fast, clear, and a little delightful.
            </p>
          </Reveal>
          <Reveal delay={120} className={styles.phoneStage}>
            <div className={styles.phoneGlow} aria-hidden="true" />
            <div className={styles.phoneFrame}>
              <Image
                src={PRODUCT_MOCKUP_URL}
                alt="Mobile app UI built by Senira Mendis"
                width={560}
                height={1120}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── COMPANY SPOTLIGHT ──────────────── */}
      <section id="dopmin" className={styles.spotlight}>
        <div className={styles.spotlightInner}>
          <Reveal>
            <span className={styles.spotlightKicker}>Founder &amp; {COMPANY.role}</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className={styles.spotlightTitle}>{COMPANY.name}</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className={styles.spotlightDesc}>{COMPANY.description}</p>
          </Reveal>
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
            <SocialIcons />
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
