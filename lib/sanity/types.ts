import type { PortableTextBlock } from '@portabletext/react';

export type SanityPost = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  publishedAt: string;
  readTime?: number;
  tags?: string[];
  body: PortableTextBlock[];
};

/** Flattens Portable Text blocks into plain paragraph strings — used by
 *  the RSS feed, which can't render Sanity's rich block content directly. */
export function portableTextToPlainText(blocks: PortableTextBlock[]): string[] {
  return blocks
    .filter((block) => block._type === 'block' && Array.isArray((block as any).children))
    .map((block) =>
      (block as any).children.map((child: { text?: string }) => child.text || '').join('')
    )
    .filter(Boolean);
}
