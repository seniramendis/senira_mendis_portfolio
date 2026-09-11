import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Where the message should land. Falls back to the portfolio owner's email
// if CONTACT_TO_EMAIL isn't set in the environment.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'seniramendis41@gmail.com';

// The "from" address Resend sends as. Must be on a domain you've verified
// in Resend, OR left as their shared test address to start out.
// See .env.local.example for details.
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Extremely small in-memory rate limiter (per server instance) so the
// endpoint can't be trivially spammed. Resets whenever the server restarts —
// good enough for a personal portfolio, not meant as production-grade
// protection.
const submissions = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (submissions.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissions.set(ip, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: 'Too many messages sent recently. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
    }

    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const subject = String(body.subject || '').trim();
    const message = String(body.message || '').trim();
    // Honeypot field — real users never fill this in; bots often do.
    const company = String(body.company || '').trim();

    if (company) {
      // Silently pretend success so bots don't learn the honeypot worked.
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: 'Name, email and message are required.' },
        { status: 400 }
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (message.length > 5000) {
      return NextResponse.json({ ok: false, error: 'Message is too long.' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('Contact form: RESEND_API_KEY is not set. See .env.local.example.');
      return NextResponse.json(
        {
          ok: false,
          error:
            'The contact form is not fully configured yet (missing Resend API key on the server). Please email directly instead.',
        },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const safe = (s: string) =>
      s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`,
      text: `From: ${name} <${email}>\nSubject: ${subject || '(none)'}\n\n${message}`,
      html: `
        <div style="font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#111">
          <p><strong>Name:</strong> ${safe(name)}</p>
          <p><strong>Email:</strong> ${safe(email)}</p>
          ${subject ? `<p><strong>Subject:</strong> ${safe(subject)}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap">${safe(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { ok: false, error: 'Something went wrong sending your message. Please try again or email directly.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      { ok: false, error: 'Something went wrong sending your message. Please try again or email directly.' },
      { status: 500 }
    );
  }
}
