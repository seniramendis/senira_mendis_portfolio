import { SKILLS } from '@/lib/data';
import Reveal from '@/components/ui/Reveal';
import styles from './Skills.module.css';

type Logo = { src: 'skillicons'; slug: string } | { src: 'simple'; slug: string };

// Maps skill labels to a real, verifiable brand logo. skillicons.dev covers most
// dev tools; simple-icons (cdn.simpleicons.org) fills in a few it doesn't have.
// Concepts/methodologies with no actual brand mark (OOP, RBAC, Scrum Master, etc.)
// are intentionally left out and render as plain text.
const LOGO_MAP: Record<string, Logo | Logo[]> = {
  'Java': { src: 'skillicons', slug: 'java' },
  'PHP': { src: 'skillicons', slug: 'php' },
  'JavaScript': { src: 'skillicons', slug: 'js' },
  'Kotlin': { src: 'skillicons', slug: 'kotlin' },
  'C#': { src: 'skillicons', slug: 'cs' },
  'C++': { src: 'skillicons', slug: 'cpp' },
  'R': { src: 'simple', slug: 'r' },
  'HTML / CSS': [
    { src: 'skillicons', slug: 'html' },
    { src: 'skillicons', slug: 'css' },
  ],
  'Laravel': { src: 'skillicons', slug: 'laravel' },
  'React Native': { src: 'skillicons', slug: 'react' },
  'Node.js': { src: 'skillicons', slug: 'nodejs' },
  '.NET': { src: 'skillicons', slug: 'dotnet' },
  'Bootstrap': { src: 'skillicons', slug: 'bootstrap' },
  'jQuery': { src: 'skillicons', slug: 'jquery' },
  'Android Studio': { src: 'skillicons', slug: 'androidstudio' },
  'PostgreSQL': { src: 'skillicons', slug: 'postgres' },
  'MySQL': { src: 'skillicons', slug: 'mysql' },
  'MongoDB': { src: 'skillicons', slug: 'mongodb' },
  'Firebase': { src: 'skillicons', slug: 'firebase' },
  'Supabase': { src: 'skillicons', slug: 'supabase' },
  'SQLite': { src: 'skillicons', slug: 'sqlite' },
  'MSSQL': { src: 'simple', slug: 'microsoftsqlserver' },
  'Docker': { src: 'skillicons', slug: 'docker' },
  'Git': { src: 'skillicons', slug: 'git' },
  'Postman': { src: 'skillicons', slug: 'postman' },
  'Figma': { src: 'skillicons', slug: 'figma' },
  'Jira': { src: 'simple', slug: 'jira' },
  'ClickUp': { src: 'skillicons', slug: 'clickup' },
};

function logoUrl(logo: Logo) {
  return logo.src === 'skillicons'
    ? `https://skillicons.dev/icons?i=${logo.slug}&theme=light`
    : `https://cdn.simpleicons.org/${logo.slug}`;
}

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <div className="si">
        <Reveal><div className="sec-label">Capabilities</div></Reveal>
        <Reveal>
          <h2 className={styles.heading}>
            A wide stack, applied with <em>precision</em><br />and purpose.
          </h2>
        </Reveal>

        <div className={styles.groups}>
          {SKILLS.map((col, i) => (
            <Reveal key={col.category} delay={i * 60}>
              <div className={styles.group}>
                <div className={styles.groupLabel}>{col.category}</div>
                <div className={styles.tileGrid}>
                  {col.items.map(item => {
                    const entry = LOGO_MAP[item];
                    const list = Array.isArray(entry) ? entry : entry ? [entry] : [];
                    return (
                      <div key={item} className={styles.tile}>
                        {list.length > 0 && (
                          <div className={styles.tileIconWrap}>
                            {list.map(logo => (
                              <img
                                key={logo.slug}
                                src={logoUrl(logo)}
                                alt=""
                                className={styles.tileIcon}
                                loading="lazy"
                              />
                            ))}
                          </div>
                        )}
                        <span className={styles.tileLabel}>{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
