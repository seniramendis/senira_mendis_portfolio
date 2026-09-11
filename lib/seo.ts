import type { Metadata } from 'next';
import { PERSONAL } from './data';

// Update NEXT_PUBLIC_SITE_URL once a custom domain is attached — everything
// below (canonical URLs, sitemap, OG/Twitter image URLs, JSON-LD) reads
// from this single source of truth.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://senira-mendis-portfolio.vercel.app';

export const SITE_NAME = `${PERSONAL.name} — Software Engineer`;

interface BuildMetadataInput {
  title: string;
  description: string;
  path?: string;
  /** Set to false only for pages that should be kept out of search results. */
  index?: boolean;
  /** Absolute image URL — pass a real screenshot when you have one (e.g.
   *  project case studies). Omit to fall back to the route's own
   *  opengraph-image.tsx (App Router file convention). */
  image?: string;
}

/**
 * Shared helper so every route gets a consistent, correctly-populated
 * title, description, canonical URL, Open Graph block and Twitter card
 * instead of hand-rolling metadata per page.
 */
export function buildMetadata({
  title,
  description,
  path = '/',
  index = true,
  image,
}: BuildMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
      // Falls back to the route's own opengraph-image.tsx (App Router
      // convention) when no explicit image is passed.
      images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

/** schema.org Person + WebSite JSON-LD for the homepage. */
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSONAL.name,
    url: SITE_URL,
    jobTitle: 'Software Engineer',
    description: PERSONAL.sub,
    address: {
      '@type': 'PostalAddress',
      addressLocality: PERSONAL.location,
    },
    email: `mailto:${PERSONAL.email}`,
    sameAs: [PERSONAL.linkedin, PERSONAL.github, PERSONAL.instagram, PERSONAL.facebook],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  };
}

/** schema.org BreadcrumbList for nested pages like project case studies. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
