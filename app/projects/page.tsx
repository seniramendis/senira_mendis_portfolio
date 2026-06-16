'use client';
import { PROJECTS } from '@/lib/data';
import Link from 'next/link';
import Nav from '@/components/sections/Nav';
import Footer from '@/components/sections/Footer';
import styles from './projects.module.css';

export default function ProjectsArchive() {
  return (
    <div className={styles.container}>
      <Nav />

      <main className={styles.main}>
        <Link href="/" className={styles.backLink}>
          <span className={styles.arrowBack}>&larr;</span> Back to Home
        </Link>

        <h1 className={styles.title}>
          All <em>Projects.</em>
        </h1>

        <div className={styles.grid}>
          {PROJECTS.map((project) => (
            <Link key={project.num} href={`/projects/${project.num}`} className={styles.card}>
              <span className={styles.cardNum}>Project {project.num}</span>
              <h3 className={styles.cardTitle}>{project.title}</h3>
              {project.role && (
                <p className={styles.cardRole}>{project.role}</p>
              )}
              <div className={styles.tags}>
                {project.tags.slice(0, 3).map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
                {project.tags.length > 3 && (
                  <span className={styles.moreTags}>+{project.tags.length - 3}</span>
                )}
              </div>
              <div className={styles.detailsLink}>
                View Details <span className={styles.arrow}>&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
