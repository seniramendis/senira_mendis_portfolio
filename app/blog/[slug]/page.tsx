'use client';
import { useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/data';
import Nav from '@/components/sections/Nav';
import Footer from '@/components/sections/Footer';
import styles from '../blog.module.css';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  useEffect(() => {
    if (!post) notFound();
  }, [post]);

  if (!post) return null;

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
          {post.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
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
