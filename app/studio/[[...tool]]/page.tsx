'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

export const dynamic = 'force-static';

export default function StudioPage() {
  if (!config.projectId) {
    return (
      <main style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h1>This page is unavailable.</h1>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
