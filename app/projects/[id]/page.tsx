'use client';
import { PROJECTS } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/sections/Nav';
import Footer from '@/components/sections/Footer';
import styles from '../projects.module.css';

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const project = PROJECTS.find((p) => p.num === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <Nav />

      <main className={styles.detailMain}>
        <Link href="/projects" className={styles.backLink}>
            <span className={styles.arrowBack}>&larr;</span> Back to Archive
        </Link>

        <div className={styles.detailHeader}>
          <span className={styles.cardNum}>Project {project.num}</span>
          <h1 className={styles.detailTitle}>{project.title}</h1>
          {project.role && (
             <p className={styles.role}>
               Role: <span>{project.role}</span>
             </p>
          )}
        </div>

        <div className={styles.description}>
          {project.description.split('\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        <div className={styles.techSection}>
          <h3 className={styles.techTitle}>Technologies & Tools</h3>
          <div className={styles.techTags}>
             {project.tags.map(tag => (
                <span key={tag} className={styles.techTag}>{tag}</span>
             ))}
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {project.href && (
                <a href={project.href} target="_blank" rel="noopener noreferrer" className="mbtn mbtn-dark">
                  View Live / Source &nearr;
                </a>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}