import Link from 'next/link';
import Nav from '@/components/sections/Nav';
import Footer from '@/components/sections/Footer';
import Reveal from '@/components/ui/Reveal';
import TechNewsWidget from '@/components/sections/TechNewsWidget';
import BlogPostsCarousel from '@/components/sections/BlogPostsCarousel';
import { getAllPosts } from '@/lib/blog';
import styles from './blog.module.css';

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

        <Reveal delay={260}>
          <BlogPostsCarousel posts={posts} />
        </Reveal>

        {/* Live tech news, aggregated automatically — see
            lib/techNews.ts + app/api/tech-news/route.ts. Requested by
            the user to sit on this page rather than a separate /news
            route. Renders as a self-advancing photo carousel with each
            story's own lead image pulled straight from its source feed. */}
        <Reveal>
          <h2 className={`${styles.title} ${styles.techTitle}`}>
            Latest in <em>tech.</em>
          </h2>
        </Reveal>
        <Reveal delay={60}>
          <p className={styles.heroSub}>
            Live headlines from Hacker News, each paired with the real photo from its
            own article — refreshed hourly, nothing added by hand.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <TechNewsWidget limit={9} />
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
