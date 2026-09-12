import type { Metadata } from 'next';
import { PERSONAL, SEO_KEYWORDS, SKILLS, FAQItem } from './data';

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
  /** Page-specific target keywords, in addition to/overriding the sitewide
   *  defaults set in the root layout. */
  keywords?: string[];
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
  keywords,
}: BuildMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
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

/**
 * schema.org Person JSON-LD for the homepage — this is what powers a
 * Google knowledge-panel / rich result for searches like "Senira Mendis"
 * or "software engineer in Sri Lanka [name]". `knowsAbout` and `jobTitle`
 * are pulled straight from real, visible page content (lib/data.ts) so
 * the structured data never claims more than the page itself shows.
 */
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSONAL.name,
    url: SITE_URL,
    jobTitle: ['Software Engineer', 'Full-Stack Developer', 'Mobile App Developer', 'Backend Developer'],
    description: PERSONAL.sub,
    address: {
      '@type': 'PostalAddress',
      addressLocality: PERSONAL.location,
      addressCountry: 'LK',
    },
    // Signals to search engines that this person is discoverable both
    // locally (Sri Lanka) and for remote/worldwide engagements.
    homeLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressCountry: 'LK', addressLocality: PERSONAL.location },
    },
    workLocation: [
      { '@type': 'Place', name: 'Sri Lanka' },
      { '@type': 'Place', name: 'Remote / Worldwide' },
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Cardiff Metropolitan University',
    },
    knowsAbout: SKILLS.flatMap((group) => group.items),
    knowsLanguage: ['English', 'Sinhala'],
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
    // Enables Google's sitelinks search box for the site name.
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/projects?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * schema.org ProfessionalService JSON-LD — the "hire me" counterpart to
 * the Person schema above, aimed squarely at local ("software engineer
 * in Colombo/Sri Lanka") and remote ("hire remote developer") intent.
 */
export function professionalServiceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: PERSONAL.location,
      addressCountry: 'LK',
    },
    areaServed: [
      { '@type': 'Country', name: 'Sri Lanka' },
      { '@type': 'Place', name: 'Remote / Worldwide' },
    ],
    founder: { '@type': 'Person', name: PERSONAL.name },
    knowsAbout: SEO_KEYWORDS,
  };
}

/** schema.org FAQPage JSON-LD — must mirror the visible FAQ.tsx content. */
export function faqJsonLd(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
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

interface ProjectJsonLdInput {
  title: string;
  description: string;
  path: string;
  tags: string[];
  image?: string;
}

/** schema.org CreativeWork JSON-LD for an individual project case-study page. */
export function projectJsonLd({ title, description, path, tags, image }: ProjectJsonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description,
    url: `${SITE_URL}${path}`,
    image: image ? [image] : undefined,
    keywords: tags.join(', '),
    creator: {
      '@type': 'Person',
      name: PERSONAL.name,
      url: SITE_URL,
    },
  };
}
