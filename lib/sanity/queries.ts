import { groq } from 'next-sanity';

/** All posts, newest first — used by /blog and /feed.xml. */
export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    "slug": slug.current,
    title,
    excerpt,
    "coverImage": coverImage.asset->url,
    publishedAt,
    readTime,
    tags,
    body
  }
`;

/** A single post by slug — used by /blog/[slug]. */
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    excerpt,
    "coverImage": coverImage.asset->url,
    publishedAt,
    readTime,
    tags,
    body
  }
`;
