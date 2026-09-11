'use client';
import { PROJECTS } from '@/lib/data';
import Link from 'next/link';
import Nav from '@/components/sections/Nav';
import Footer from '@/components/sections/Footer';
import Reveal from '@/components/ui/Reveal';
import ProjectsShowcase from '@/components/sections/ProjectsShowcase';
import styles from './projects.module.css';

export default function ProjectsArchive() {
  return (
    <div className={styles.container}>
      <Nav />

      <main className={styles.main}>
        <Link href="/" className={styles.backLink}>
          <span className={styles.arrowBack}>&larr;</span> Back to Home
        </Link>

        <Reveal>
          <span className={styles.heroKicker}>Work &middot; {PROJECTS.length} projects</span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className={styles.title}>
            Ideas, <em>engineered.</em>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className={styles.heroSub}>
            A collection of full-stack, mobile and backend builds — from production
            platforms shipped for agencies to solo experiments in geospatial systems
            and AI. Scroll through the highlights, or browse the full archive below.
          </p>
        </Reveal>
      </main>

      <ProjectsShowcase projects={PROJECTS} />

      <Footer />
    </div>
  );
}
