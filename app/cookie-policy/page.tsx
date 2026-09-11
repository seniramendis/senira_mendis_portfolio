import type { Metadata } from 'next';
import Link from 'next/link';
import LegalLayout from '@/components/legal/LegalLayout';
import { PERSONAL } from '@/lib/data';
import styles from '@/components/legal/LegalLayout.module.css';

export const metadata: Metadata = {
  title: 'Cookie Policy — Senira Mendis',
  description: 'How cookies and similar technologies are used on this portfolio website.',
};

const TOC = [
  { id: 'what-are-cookies', label: 'What Are Cookies?' },
  { id: 'how-this-site-uses-them', label: 'How This Site Uses Them' },
  { id: 'types-of-cookies', label: 'Types of Cookies' },
  { id: 'third-party-cookies', label: 'Third-Party Cookies' },
  { id: 'managing-cookies', label: 'Managing Cookies' },
  { id: 'changes', label: 'Changes' },
  { id: 'contact', label: 'Contact' },
];

export default function CookiePolicyPage() {
  return (
    <LegalLayout
      kicker="Legal"
      title="Cookie Policy"
      updated="September 12, 2026"
      toc={TOC}
    >
      <h2 id="what-are-cookies">What Are Cookies?</h2>
      <p>
        Cookies are small text files that a website can place on your device to remember
        information about your visit. They&apos;re a normal part of how most modern websites
        and embedded tools work — this page explains exactly which ones show up on this site,
        and why.
      </p>

      <h2 id="how-this-site-uses-them">How This Site Uses Them</h2>
      <p>
        This portfolio does not use advertising or tracking cookies. Traffic is measured
        using Cloudflare Web Analytics, which is entirely cookieless — it doesn&apos;t set
        anything on your device, so it isn&apos;t covered by the rest of this cookie policy.
        The only cookies you may actually encounter on this site come from a single
        embedded third-party tool — the booking calendar — and only if you interact with it.
      </p>

      <h2 id="types-of-cookies">Types of Cookies</h2>
      <ul>
        <li>
          <strong>Strictly necessary cookies —</strong> none are set by this site itself
          beyond what your browser needs to load the page normally.
        </li>
        <li>
          <strong>Functional cookies (third-party) —</strong> when you use the &ldquo;Book a
          call&rdquo; widget, Cal.com may set cookies needed to run the scheduling calendar
          embedded on the page (for example, to remember your timezone selection during that
          session).
        </li>
        <li>
          <strong>Advertising / analytics cookies —</strong> none are used on this site.
          Site traffic is measured with Cloudflare Web Analytics, a cookieless
          measurement tool that sets nothing on your device.
        </li>
      </ul>

      <h2 id="third-party-cookies">Third-Party Cookies</h2>
      <p>
        The embedded Cal.com booking calendar on the homepage is the only component on this
        site capable of setting cookies, and it does so under its own privacy and cookie
        policies rather than mine, since you&apos;re interacting directly with Cal.com&apos;s
        service inside that widget. If you don&apos;t use the booking calendar, no third-party
        cookies are set during your visit.
      </p>
      <p>
        Loading web fonts from Google Fonts involves a request to Google&apos;s servers for
        the font files, but this does not set a cookie on your device.
      </p>

      <h2 id="managing-cookies">Managing Cookies</h2>
      <p>
        You can control or clear cookies at any time through your browser&apos;s settings —
        most browsers let you block cookies entirely, delete existing ones, or get a warning
        before a cookie is set. Blocking cookies from the booking widget may prevent the
        embedded calendar from working correctly; you can always book a call by emailing me
        directly instead.
      </p>

      <h2 id="changes">Changes to This Policy</h2>
      <p>
        If the tools embedded on this site change, this policy will be updated to match. The
        &ldquo;Last updated&rdquo; date above always reflects the most recent revision.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Questions about cookies on this site? Reach me at{' '}
        <a href={`mailto:${PERSONAL.email}`}>{PERSONAL.email}</a>, or see the{' '}
        <Link href="/privacy-policy">Privacy Policy</Link> for how information is handled more broadly.
      </p>

      <div className={styles.note}>
        This policy is provided for transparency about how this personal portfolio site
        operates. It is not a substitute for formal legal advice.
      </div>
    </LegalLayout>
  );
}
