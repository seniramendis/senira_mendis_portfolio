import type { Metadata } from 'next';
import Link from 'next/link';
import LegalLayout from '@/components/legal/LegalLayout';
import { PERSONAL } from '@/lib/data';
import styles from '@/components/legal/LegalLayout.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy — Senira Mendis',
  description: 'How Senira Mendis collects, uses and protects information on this portfolio website.',
};

const TOC = [
  { id: 'overview', label: 'Overview' },
  { id: 'information-i-collect', label: 'Information I Collect' },
  { id: 'how-i-use-it', label: 'How I Use It' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'third-party-services', label: 'Third-Party Services' },
  { id: 'data-retention', label: 'Data Retention' },
  { id: 'your-rights', label: 'Your Rights' },
  { id: 'childrens-privacy', label: "Children's Privacy" },
  { id: 'changes', label: 'Changes' },
  { id: 'contact', label: 'Contact' },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      kicker="Legal"
      title="Privacy Policy"
      updated="September 12, 2026"
      toc={TOC}
    >
      <h2 id="overview">Overview</h2>
      <p>
        This is the personal portfolio website of {PERSONAL.name} (&ldquo;I&rdquo;, &ldquo;me&rdquo;).
        This policy explains what information is collected when you visit this site,
        why it&apos;s collected, and the choices you have. I built this site myself and
        keep it deliberately simple — I don&apos;t run ad networks, I don&apos;t sell data,
        and I collect no more than what&apos;s needed to reply to you and keep the site working.
      </p>

      <h2 id="information-i-collect">Information I Collect</h2>
      <p>I only collect information in two situations:</p>
      <ul>
        <li>
          <strong>When you contact me.</strong> If you use the contact form, I receive the
          name, email address, subject and message you submit, so I can reply to you.
        </li>
        <li>
          <strong>When you book a call.</strong> If you use the scheduling widget on the
          Booking section, the booking details (name, email, and the time you select) are
          handled directly by Cal.com, the scheduling provider — see &ldquo;Third-Party
          Services&rdquo; below.
        </li>
      </ul>
      <p>
        I use Cloudflare Web Analytics to see basic, aggregated traffic trends for this
        site — things like page views and which pages are popular. It&apos;s a
        privacy-first, cookieless analytics tool: it doesn&apos;t use cookies or any
        persistent identifier, and it doesn&apos;t track you individually or across other
        websites. See &ldquo;Third-Party Services&rdquo; below for details. I don&apos;t
        run any advertising trackers, and I don&apos;t ask for or store any information
        beyond what&apos;s listed on this page. Standard web server logs (such as IP
        address and browser type) may be recorded briefly by my hosting provider for
        security and abuse prevention, as is standard for any website.
      </p>

      <h2 id="how-i-use-it">How I Use It</h2>
      <p>Any information you share is used only to:</p>
      <ul>
        <li>Reply to messages sent through the contact form</li>
        <li>Confirm and manage calls booked through the scheduling widget</li>
        <li>Prevent spam and abuse of the contact form (see Cookies, below)</li>
      </ul>
      <p>
        I never use your contact details for marketing, and I never share, rent or sell
        them to third parties.
      </p>

      <h2 id="cookies">Cookies</h2>
      <p>
        This site itself does not set advertising or analytics cookies. The embedded
        booking widget (Cal.com) may set its own functional cookies when you interact
        with it, in order to run the scheduling calendar. See the{' '}
        <Link href="/cookie-policy">Cookie Policy</Link> for full details.
      </p>

      <h2 id="third-party-services">Third-Party Services</h2>
      <p>This site relies on a small number of trusted third-party services:</p>
      <ul>
        <li>
          <strong>Resend</strong> — delivers the emails sent through the contact form to my
          inbox. Your name, email and message pass through Resend&apos;s servers solely to
          deliver that email.
        </li>
        <li>
          <strong>Cal.com</strong> — powers the embedded &ldquo;Book a call&rdquo; calendar.
          When you use it, you&apos;re interacting directly with Cal.com&apos;s service under
          its own privacy policy.
        </li>
        <li>
          <strong>Cloudinary</strong> — hosts and serves the images on this site (project
          screenshots, mockups). No personal data is transmitted through this service.
        </li>
        <li>
          <strong>Google Fonts</strong> — loads the typefaces used on this site, which
          involves a request to Google&apos;s servers for the font files.
        </li>
        <li>
          <strong>Cloudflare Web Analytics</strong> — measures aggregate site traffic
          (page views, referrers, rough visitor counts) without cookies and without
          collecting any personally identifiable information.
        </li>
      </ul>
      <p>
        Each of these providers may process standard technical data (like IP address) as
        part of delivering their service, under their own respective privacy policies.
      </p>

      <h2 id="data-retention">Data Retention</h2>
      <p>
        Contact form messages are kept in my email inbox only as long as needed to respond
        to you and for reasonable record-keeping afterward. I don&apos;t maintain a separate
        marketing database or CRM of visitor information.
      </p>

      <h2 id="your-rights">Your Rights</h2>
      <p>
        Depending on where you live, you may have the right to request access to, correction
        of, or deletion of any personal information I hold about you (for example, a past
        contact-form message). To make a request, just email me directly — see
        &ldquo;Contact&rdquo; below.
      </p>

      <h2 id="childrens-privacy">Children&apos;s Privacy</h2>
      <p>
        This site is not directed at children, and I do not knowingly collect information
        from anyone under the age of 16.
      </p>

      <h2 id="changes">Changes to This Policy</h2>
      <p>
        I may update this policy occasionally as the site evolves. The &ldquo;Last
        updated&rdquo; date at the top of this page will always reflect the most recent
        revision. Continued use of the site after a change means you accept the updated policy.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Questions about this policy or your information? Reach me at{' '}
        <a href={`mailto:${PERSONAL.email}`}>{PERSONAL.email}</a>, or use the{' '}
        <Link href="/contact">contact page</Link>.
      </p>

      <div className={styles.note}>
        This policy is provided for transparency about how this personal portfolio site
        operates. It is not a substitute for formal legal advice.
      </div>
    </LegalLayout>
  );
}
