import type { Metadata } from 'next';
import { PROJECTS } from '@/lib/data';
import { buildMetadata, breadcrumbJsonLd, projectJsonLd } from '@/lib/seo';

// app/projects/[id]/page.tsx is a client component, so — same as the
// /projects archive — it can't export metadata itself. This layout does
// it instead, per-project, using generateMetadata (which does have access
// to the route's params even though it lives in a layout file).

function findProject(id: string) {
  return PROJECTS.find((p) => p.num === id);
}

// Pre-render metadata (and let Next statically generate) for every known
// project id instead of resolving it at request time.
export function generateStaticParams() {
  return PROJECTS.map((project) => ({ id: project.num }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const project = findProject(params.id);

  if (!project) {
    return buildMetadata({
      title: 'Project not found — Senira Mendis',
      description: 'This project could not be found.',
      path: `/projects/${params.id}`,
      index: false,
    });
  }

  // Trim the (often long) case-study description down to a search-result
  // friendly length rather than letting Google cut it off mid-sentence.
  const description =
    project.description.length > 155
      ? `${project.description.slice(0, 152).trimEnd()}...`
      : project.description;

  return buildMetadata({
    title: `${project.title} — Senira Mendis`,
    description,
    path: `/projects/${project.num}`,
    image: project.images?.[0],
  });
}

export default function ProjectDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const project = findProject(params.id);

  // Let the page component itself call notFound() for the client-rendered
  // 404 UI; here we only skip emitting structured data for a bad id.
  if (!project) {
    return children;
  }

  const jsonLd = [
    breadcrumbJsonLd([
      { name: 'Projects', path: '/projects' },
      { name: project.title, path: `/projects/${project.num}` },
    ]),
    projectJsonLd({
      title: project.title,
      description: project.description,
      path: `/projects/${project.num}`,
      tags: project.tags,
      image: project.images?.[0],
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
