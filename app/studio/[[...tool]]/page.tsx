'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

// Renders the full Sanity writing dashboard at /studio on your own
// domain (e.g. senira-mendis-portfolio.vercel.app/studio). Log in with
// the Sanity account you used to create the project, and you'll see a
// "Blog Post" entry in the sidebar — write there, publish, and it shows
// up on /blog and in /feed.xml automatically within a few seconds.
export const dynamic = 'force-static';

export default function StudioPage() {
  if (!config.projectId) {
    return (
      <main style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h1>Sanity Studio is not configured</h1>
        <p>Set NEXT_PUBLIC_SANITY_PROJECT_ID and redeploy this site.</p>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
