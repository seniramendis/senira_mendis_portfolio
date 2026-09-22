import Link from 'next/link';
import Nav from '@/components/sections/Nav';
import Footer from '@/components/sections/Footer';
import Reveal from '@/components/ui/Reveal';
import TechNewsWidget from '@/components/sections/TechNewsWidget';
import { getAllPosts } from '@/lib/blog';
import styles from './blog.module.css';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Refresh the post list periodically without requiring a full redeploy.
export const revalidate = 300;

export default async function BlogIndex() {
  const posts = await getAllPosts();

  return (
    <div className={styles.container}>
      <Nav />

      <main className={styles.main}>
        <Link href="/" className={styles.backLink}>
          <span className={styles.arrowBack}>&larr;</span> Back to Home
        </Link>

        <Reveal>
          <span className={styles.heroKicker}>Blog &middot; {posts.length} posts</span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className={styles.title}>
            Notes from <em>the build.</em>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className={styles.heroSub}>
            Write-ups on the real problems behind the projects — concurrency bugs,
            architecture decisions, and lessons from running Agile sprints on
            small teams.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <a href="/feed.xml" className={styles.feedLink}>
            📡 Subscribe via RSS
          </a>
        </Reveal>

        <div className={styles.grid}>
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={260 + i * 60}>
              <Link href={`/blog/${post.slug}`} className={styles.card}>
                <span className={styles.cardMeta}>
                  <span>{formatDate(post.date)}</span>
                  <span>{post.readTime} min read</span>
                </span>

                <h2 className={styles.cardTitle}>{post.title}</h2>
                <p className={styles.cardExcerpt}>{post.excerpt}</p>

                <div className={styles.tags}>
                  {post.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <span className={styles.detailsLink}>
                  Read post <span className={styles.arrow}>&rarr;</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Live tech news, aggregated automatically — see
            lib/techNews.ts + app/api/tech-news/route.ts. Requested by
            the user to sit on this page rather than a separate /news
            route. */}
        <Reveal>
          <h2 className={styles.title} style={{ fontSize: '2rem', marginTop: '32px' }}>
            Latest in <em>tech.</em>
          </h2>
        </Reveal>
        <Reveal delay={60}>
          <p className={styles.heroSub}>
            Live headlines from Hacker News — refreshed hourly, nothing added by hand.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <TechNewsWidget limit={8} />
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
