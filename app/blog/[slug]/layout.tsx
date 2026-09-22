import type { Metadata } from 'next';
import { getPostBySlug } from '@/lib/blog';
import { buildMetadata, breadcrumbJsonLd, blogPostingJsonLd } from '@/lib/seo';

// app/blog/[slug]/page.tsx fetches per-request (see its `revalidate`
// export) rather than being pre-built via generateStaticParams — that
// way a brand-new Sanity post is live at its URL immediately instead of
// waiting for the next full deploy. generateMetadata still runs per
// request too, so this stays in sync automatically.

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

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

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  // Let the page component itself call notFound() for the proper 404
  // UI; here we only skip emitting structured data for a bad slug.
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
