import { BLOG_POSTS } from './data';
import { sanityClient, isSanityConfigured } from './sanity/client';
import { allPostsQuery, postBySlugQuery } from './sanity/queries';
import { portableTextToPlainText, type SanityPost } from './sanity/types';

// ─────────────────────────────────────────────
// UNIFIED BLOG DATA LAYER
// ─────────────────────────────────────────────
// Every page (blog index, post page, RSS feed, sitemap) reads posts
// through this file instead of talking to Sanity or lib/data.ts
// directly. That means:
//
//   • Sanity configured + reachable → posts come from the Studio,
//     automatically, with zero code changes.
//   • Sanity not configured yet, or a fetch fails → falls back to the
//     local BLOG_POSTS array in lib/data.ts, so the site never breaks.
//
// Once you set SANITY_PROJECT_ID (see .env.example) and
// publish a post at /studio, this file starts returning Sanity content
// without anyone touching it.

export type UnifiedPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  tags: string[];
  coverImage?: string;
  /** Sanity posts: Portable Text blocks, rendered with <PortableText>.
   *  Local posts: plain paragraph strings, rendered as <p> tags. */
  body: SanityPost['body'] | string[];
  source: 'sanity' | 'local';
};

function localPostsAsUnified(): UnifiedPost[] {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    readTime: post.readTime,
    tags: post.tags,
    coverImage: post.coverImage,
    body: post.content,
    source: 'local' as const,
  }));
}

function sanityPostAsUnified(post: SanityPost): UnifiedPost {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.publishedAt,
    readTime: post.readTime ?? 5,
    tags: post.tags ?? [],
    coverImage: post.coverImage,
    body: post.body,
    source: 'sanity',
  };
}

/** All posts, newest first. Tries Sanity first, falls back to local. */
export async function getAllPosts(): Promise<UnifiedPost[]> {
  if (isSanityConfigured && sanityClient) {
    try {
      const posts: SanityPost[] = await sanityClient.fetch(allPostsQuery);
      if (posts?.length) {
        return posts.map(sanityPostAsUnified);
      }
      // Sanity is configured but has zero published posts yet — show the
      // local starter posts instead of an empty blog.
    } catch (err) {
      console.error('[lib/blog] Sanity fetch failed, falling back to local posts:', err);
    }
  }

  return localPostsAsUnified().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** A single post by slug. Tries Sanity first, falls back to local. */
export async function getPostBySlug(slug: string): Promise<UnifiedPost | null> {
  if (isSanityConfigured && sanityClient) {
    try {
      const post: SanityPost | null = await sanityClient.fetch(postBySlugQuery, { slug });
      if (post) return sanityPostAsUnified(post);
    } catch (err) {
      console.error('[lib/blog] Sanity fetch failed, falling back to local posts:', err);
    }
  }

  const local = BLOG_POSTS.find((p) => p.slug === slug);
  return local ? localPostsAsUnified().find((p) => p.slug === slug) ?? null : null;
}

/** Body as plain paragraph strings — used by the RSS feed regardless of
 *  whether the post came from Sanity (Portable Text) or local (strings). */
export function bodyToPlainParagraphs(post: UnifiedPost): string[] {
  if (post.source === 'sanity') {
    return portableTextToPlainText(post.body as SanityPost['body']);
  }
  return post.body as string[];
}
