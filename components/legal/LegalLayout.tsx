import Nav from '@/components/sections/Nav';
import Footer from '@/components/sections/Footer';
import styles from './LegalLayout.module.css';

interface TocItem {
  id: string;
  label: string;
}

interface LegalLayoutProps {
  kicker: string;
  title: string;
  updated: string;
  toc: TocItem[];
  children: React.ReactNode;
}

export default function LegalLayout({ kicker, title, updated, toc, children }: LegalLayoutProps) {
  return (
    <div className={styles.page}>
      <Nav />

      <header className={styles.hero}>
        <div className={styles.kicker}>{kicker}</div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.updated}>Last updated: {updated}</p>
      </header>

      <div className={styles.layout}>
        <nav className={styles.toc} aria-label="Table of contents">
          <div className={styles.tocLabel}>On this page</div>
          <ul>
            {toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <article className={styles.body}>{children}</article>
      </div>

      <Footer />
    </div>
  );
}
