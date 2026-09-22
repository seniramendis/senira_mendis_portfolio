import type { Metadata } from 'next';
import { BLOG_POSTS } from '@/lib/data';
import { buildMetadata, breadcrumbJsonLd, blogPostingJsonLd } from '@/lib/seo';

// app/blog/[slug]/page.tsx is a client component, so — same as the
// project detail pages — it can't export metadata itself. This layout
// does it instead, per-post, via generateMetadata.

function findPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

// Pre-render metadata (and let Next statically generate) for every known
// post slug instead of resolving it at request time.
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = findPost(params.slug);

  if (!post) {
    return buildMetadata({
      title: 'Post not found — Senira Mendis',
      description: 'This blog post could not be found.',
      path: `/blog/${params.slug}`,
      index: false,
    });
  }

  return buildMetadata({
    title: `${post.title} — Senira Mendis`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverImage,
  });
}

export default function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const post = findPost(params.slug);

  // Let the page component itself call notFound() for the client-rendered
  // 404 UI; here we only skip emitting structured data for a bad slug.
  if (!post) {
    return children;
  }

  const jsonLd = [
    breadcrumbJsonLd([
      { name: 'Blog', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
    blogPostingJsonLd({
      title: post.title,
      description: post.excerpt,
      path: `/blog/${post.slug}`,
      datePublished: post.date,
      tags: post.tags,
      image: post.coverImage,
    }),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
