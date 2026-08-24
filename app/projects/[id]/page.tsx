'use client';
import { useState } from 'react';
import { PROJECTS } from '@/lib/data';
import { getTechIconUrl } from '@/lib/techIcons';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/sections/Nav';
import Footer from '@/components/sections/Footer';
import styles from '../projects.module.css';

/* Same cover gradients used on the archive page, so projects without
   screenshots still get a designed, on-brand hero instead of empty space. */
const GRADIENTS = [
  'linear-gradient(140deg,#ff5f6d 0%,#ffc371 100%)',
  'linear-gradient(140deg,#667eea 0%,#764ba2 100%)',
  'linear-gradient(140deg,#0ba360 0%,#3cba92 100%)',
  'linear-gradient(140deg,#fc466b 0%,#3f5efb 100%)',
  'linear-gradient(140deg,#f7971e 0%,#ffd200 100%)',
  'linear-gradient(140deg,#00c6ff 0%,#0072ff 100%)',
  'linear-gradient(140deg,#a18cd1 0%,#fbc2eb 100%)',
  'linear-gradient(140deg,#ff9a9e 0%,#f45d5d 100%)',
  'linear-gradient(140deg,#4facfe 0%,#00f2fe 100%)',
  'linear-gradient(140deg,#43e97b 0%,#2ecc9c 100%)',
];

function gradientFor(index: number) {
  return GRADIENTS[index % GRADIENTS.length];
}

/* Single tech-stack row item: real brand logo (Simple Icons API) + plain
   text label — no border, no chip, no background. If the icon 404s we
   just quietly fall back to text-only rather than showing a broken image. */
function TechItem({ tag }: { tag: string }) {
  const iconUrl = getTechIconUrl(tag);
  const [failed, setFailed] = useState(false);

  return (
    <div className={styles.techItem}>
      {iconUrl && !failed && (
        <img
          src={iconUrl}
          alt=""
          aria-hidden="true"
          className={styles.techIcon}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
      <span className={styles.techLabel}>{tag}</span>
    </div>
  );
}

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const project = PROJECTS.find((p) => p.num === params.id);

  if (!project) {
    notFound();
  }

  const currentIndex = PROJECTS.findIndex((p) => p.num === params.id);
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null;
  const nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null;
  const hasImages = !!(project.images && project.images.length > 0);

  return (
    <div className={styles.container}>
      <Nav />

      <main className={styles.detailMain}>
        <Link href="/projects" className={styles.backLink}>
          <span className={styles.arrowBack}>&larr;</span> All Projects
        </Link>

        <div className={styles.splitLayout}>

          {/* LEFT: STICKY TEXT */}
          <div className={styles.textContent}>
            <div className={styles.detailHeader}>
              <span className={styles.cardNum}>Case Study &middot; {project.num}</span>
              <h1 className={styles.detailTitle}>{project.title}</h1>
              {project.role && (
                <p className={styles.role}>
                  Role: <span>{project.role}</span>
                </p>
              )}
            </div>

            <div className={styles.techSection}>
              <span className={styles.techTitle}>Built with</span>
              <div className={styles.techGrid}>
                {project.tags.map((tag) => (
                  <TechItem key={tag} tag={tag} />
                ))}
              </div>
            </div>

            <div className={styles.description}>
              <span className={styles.overviewTitle}>Overview</span>
              {project.description.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {project.href && project.href !== '#' && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mbtn mbtn-dark inline-block px-8 py-3"
              >
                View Project ↗
              </a>
            )}
          </div>

          {/* RIGHT: IMAGES (or a designed gradient cover when none exist) */}
          <div className={styles.imageContent}>
            {hasImages ? (
              project.images!.map((imgUrl, index) => (
                <div key={index} className={styles.imageWrapper}>
                  <img
                    src={imgUrl}
                    alt={`${project.title} — screenshot ${index + 1}`}
                    className={styles.projectImage}
                    loading="lazy"
                  />
                </div>
              ))
            ) : (
              <div className={styles.imageWrapper}>
                <div
                  className={styles.coverPlaceholder}
                  style={{ background: gradientFor(currentIndex) }}
                >
                  <span>{project.num}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PREV / NEXT */}
        <div className={styles.projectNav}>
          {prevProject ? (
            <Link href={`/projects/${prevProject.num}`} className={styles.projectNavLink}>
              <div className={styles.projectNavThumb}>
                {prevProject.images && prevProject.images.length > 0 ? (
                  <img
                    src={prevProject.images[0]}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className={styles.projectNavThumbImg}
                  />
                ) : (
                  <div
                    className={styles.projectNavThumbCover}
                    style={{ background: gradientFor(currentIndex - 1) }}
                  >
                    <span>{prevProject.num}</span>
                  </div>
                )}
              </div>
              <div className={styles.projectNavText}>
                <span className={styles.projectNavLabel}>&larr; Previous &middot; {prevProject.num}</span>
                <span className={styles.projectNavTitle}>{prevProject.title}</span>
                {prevProject.role && (
                  <span className={styles.projectNavRole}>{prevProject.role}</span>
                )}
              </div>
            </Link>
          ) : <span />}

          {nextProject ? (
            <Link href={`/projects/${nextProject.num}`} className={`${styles.projectNavLink} ${styles.projectNavRight}`}>
              <div className={styles.projectNavText}>
                <span className={styles.projectNavLabel}>Next &middot; {nextProject.num} &rarr;</span>
                <span className={styles.projectNavTitle}>{nextProject.title}</span>
                {nextProject.role && (
                  <span className={styles.projectNavRole}>{nextProject.role}</span>
                )}
              </div>
              <div className={styles.projectNavThumb}>
                {nextProject.images && nextProject.images.length > 0 ? (
                  <img
                    src={nextProject.images[0]}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className={styles.projectNavThumbImg}
                  />
                ) : (
                  <div
                    className={styles.projectNavThumbCover}
                    style={{ background: gradientFor(currentIndex + 1) }}
                  >
                    <span>{nextProject.num}</span>
                  </div>
                )}
              </div>
            </Link>
          ) : <span />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
