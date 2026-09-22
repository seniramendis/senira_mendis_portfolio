import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import Nav from '@/components/sections/Nav';
import Footer from '@/components/sections/Footer';
import { getPostBySlug } from '@/lib/blog';
import styles from '../blog.module.css';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Rendered on-demand and cached for 5 minutes (ISR) rather than
// pre-built for a fixed list of slugs — so a brand-new Sanity post is
// reachable at /blog/<slug> immediately, without a redeploy.
export const revalidate = 300;

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) notFound();

  return (
    <div className={styles.container}>
      <Nav />

      <main className={styles.postMain}>
        <Link href="/blog" className={styles.backLink}>
          <span className={styles.arrowBack}>&larr;</span> Back to Blog
        </Link>

        <header className={styles.postHeader}>
          <span className={styles.postMeta}>
            <span>{formatDate(post.date)}</span>
            <span>{post.readTime} min read</span>
          </span>

          <h1 className={styles.postTitle}>{post.title}</h1>
          <p className={styles.postExcerpt}>{post.excerpt}</p>
        </header>

        <div className={styles.postBody}>
          {post.source === 'sanity' ? (
            // Sanity posts are rich text (Portable Text) written in the
            // Studio editor — rendered here with sensible defaults.
            <PortableText value={post.body as any} />
          ) : (
            // Local fallback posts (lib/data.ts) are plain paragraph
            // strings until a Sanity project is configured.
            (post.body as string[]).map((paragraph, i) => <p key={i}>{paragraph}</p>)
          )}
        </div>

        <footer className={styles.postFooter}>
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </footer>
      </main>

      <Footer />
    </div>
  );
}
