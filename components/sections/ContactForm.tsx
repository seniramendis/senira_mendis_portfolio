'use client';
import { useEffect, useRef, useState, FormEvent } from 'react';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import styles from './ContactForm.module.css';

type Status = 'idle' | 'sending' | 'success' | 'error';
type WidgetState = 'loading' | 'ready' | 'failed';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string; // honeypot — must stay empty
}

const initialState: FormState = { name: '', email: '', subject: '', message: '', company: '' };

interface ContactFormProps {
  /** Cloudflare Turnstile site key, read from TURNSTILE_SITE_KEY on the server
   * and passed down as a prop (it's safe to expose — only the secret key is
   * confidential). If omitted, the widget is skipped entirely. */
  turnstileSiteKey?: string;
}

export default function ContactForm({ turnstileSiteKey }: ContactFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [widgetState, setWidgetState] = useState<WidgetState>('loading');
  const turnstileRef = useRef<TurnstileInstance>(null);

  // Loud in dev, silent in prod: without a site key the widget is skipped
  // entirely, which used to look identical to "the widget is broken".
  useEffect(() => {
    if (!turnstileSiteKey && process.env.NODE_ENV !== 'production') {
      console.warn(
        '[ContactForm] No Turnstile site key — the verification widget will not render. ' +
          'Set TURNSTILE_SITE_KEY (or NEXT_PUBLIC_TURNSTILE_SITE_KEY) and restart the dev server.'
      );
    }
  }, [turnstileSiteKey]);

  const update = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!form.email.trim()) next.email = 'Please enter your email.';
    else if (!EMAIL_RE.test(form.email.trim())) next.email = 'That email address doesn\u2019t look right.';
    if (!form.message.trim()) next.message = 'Tell me a little about your project.';
    else if (form.message.trim().length < 10) next.message = 'A bit more detail would help — a sentence or two.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;

    if (turnstileSiteKey && !turnstileToken) {
      setServerError('Please complete the verification checkbox above.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstileToken }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        setServerError(data?.error || 'Something went wrong. Please try again.');
        setStatus('error');
        // Tokens are single-use — reset the widget so a retry gets a fresh one.
        turnstileRef.current?.reset();
        setTurnstileToken('');
        return;
      }

      setStatus('success');
      setForm(initialState);
      setTurnstileToken('');
    } catch {
      setServerError('Network error — please check your connection and try again.');
      setStatus('error');
      turnstileRef.current?.reset();
      setTurnstileToken('');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.successBox} role="status">
        <div className={styles.successIcon}>&#10003;</div>
        <h3 className={styles.successTitle}>Message sent.</h3>
        <p className={styles.successBody}>
          Thanks for reaching out — I&apos;ll get back to you as soon as I can, usually within a day or two.
        </p>
        <button type="button" className={styles.secondaryBtn} onClick={() => setStatus('idle')}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Honeypot — hidden from real users, catches simple bots */}
      <input
        type="text"
        name="company"
        value={form.company}
        onChange={update('company')}
        className={styles.honeypot}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            value={form.name}
            onChange={update('name')}
            placeholder="Your name"
            autoComplete="name"
          />
          {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            value={form.email}
            onChange={update('email')}
            placeholder="you@example.com"
            autoComplete="email"
          />
          {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="subject">Subject <span className={styles.optional}>(optional)</span></label>
        <input
          id="subject"
          type="text"
          className={styles.input}
          value={form.subject}
          onChange={update('subject')}
          placeholder="What's this about?"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="message">Message</label>
        <textarea
          id="message"
          className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
          value={form.message}
          onChange={update('message')}
          placeholder="Tell me a bit about your project, timeline, and budget..."
          rows={6}
        />
        {errors.message && <span className={styles.errorMsg}>{errors.message}</span>}
      </div>

      {/* Cloudflare Turnstile — visible checkbox challenge. Only rendered when
          a site key is configured, so local dev without keys still works. */}
      {turnstileSiteKey && (
        <div className={styles.turnstileWrap} data-state={widgetState}>
          <Turnstile
            ref={turnstileRef}
            siteKey={turnstileSiteKey}
            // Deliberately no `size` here. The widget mode (Managed / Non-
            // interactive / Invisible) is set in the Cloudflare dashboard, and
            // forcing size: 'normal' on a widget the dashboard has configured
            // as Invisible makes Cloudflare reject the config and render
            // nothing at all — no checkbox, no error, just empty space.
            options={{ theme: 'auto', appearance: 'always' }}
            onWidgetLoad={() => setWidgetState('ready')}
            onSuccess={(t) => {
              setWidgetState('ready');
              setTurnstileToken(t);
              if (status === 'error') setStatus('idle');
            }}
            onError={() => {
              setWidgetState('failed');
              setTurnstileToken('');
            }}
            onExpire={() => {
              setTurnstileToken('');
              turnstileRef.current?.reset();
            }}
          />

          {widgetState === 'loading' && (
            <div className={styles.turnstilePlaceholder} aria-hidden="true">
              Loading verification…
            </div>
          )}

          {widgetState === 'failed' && (
            <p className={styles.turnstileFailed} role="alert">
              The verification widget couldn&apos;t load. Check that your browser isn&apos;t
              blocking <code>challenges.cloudflare.com</code>, then{' '}
              <button
                type="button"
                className={styles.linkBtn}
                onClick={() => {
                  setWidgetState('loading');
                  turnstileRef.current?.reset();
                }}
              >
                try again
              </button>
              .
            </p>
          )}
        </div>
      )}

      {status === 'error' && serverError && (
        <div className={styles.errorBox} role="alert">{serverError}</div>
      )}

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={status === 'sending' || (Boolean(turnstileSiteKey) && !turnstileToken)}
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>

      <p className={styles.privacyNote}>
        Your details are only used to reply to you — never shared or added to a mailing list.
      </p>
    </form>
  );
}
