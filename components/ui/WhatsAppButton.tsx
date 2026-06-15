'use client';
import { useMagnetic } from '@/hooks/useMagnetic';
import { PERSONAL } from '@/lib/data';
import styles from './WhatsAppButton.module.css';

export default function WhatsAppButton() {
  const ref = useMagnetic();

  return (
    <a
      ref={ref}
      href={`${PERSONAL.whatsapp}?text=${encodeURIComponent('Hi Senira, I came across your portfolio and would like to get in touch!')}`}
      target="_blank"
      rel="noopener noreferrer"
      data-mag
      className={styles.wa}
      aria-label="Message Senira on WhatsApp"
    >
      <span className={styles.ping} aria-hidden="true" />
      <svg viewBox="0 0 32 32" className={styles.icon} aria-hidden="true">
        <path d="M16.001 2.667c-7.364 0-13.334 5.97-13.334 13.333 0 2.51.696 4.86 1.903 6.86L2.667 29.333l6.65-1.86a13.27 13.27 0 0 0 6.684 1.793c7.364 0 13.333-5.97 13.333-13.333S23.365 2.667 16.001 2.667zm0 24.286a11.4 11.4 0 0 1-5.81-1.59l-.417-.248-3.95 1.104 1.06-3.86-.272-.397a11.412 11.412 0 0 1-1.81-6.156c0-6.32 5.142-11.46 11.464-11.46 6.32 0 11.46 5.14 11.46 11.46 0 6.322-5.14 11.464-11.46 11.464z"/>
        <path d="M22.04 18.762c-.328-.164-1.94-.957-2.24-1.066-.3-.11-.519-.164-.737.164-.219.328-.846 1.066-1.038 1.285-.191.219-.382.246-.71.082-.328-.164-1.385-.51-2.638-1.628-.975-.868-1.633-1.94-1.825-2.268-.191-.328-.02-.506.164-.67.164-.146.366-.382.55-.574.183-.191.244-.328.366-.547.123-.219.061-.41-.03-.574-.092-.164-.81-1.95-1.111-2.668-.293-.7-.592-.605-.81-.617-.21-.01-.45-.012-.69-.012-.24 0-.628.09-.96.41-.328.328-1.25 1.222-1.25 2.98 0 1.757 1.278 3.453 1.456 3.694.178.24 2.444 3.737 5.92 5.09 3.476 1.351 3.476.901 4.103.844.628-.058 1.94-.793 2.213-1.56.273-.766.273-1.423.191-1.56-.082-.137-.3-.219-.628-.383z"/>
      </svg>
    </a>
  );
}
